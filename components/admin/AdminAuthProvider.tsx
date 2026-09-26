"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import AdminLogin from "./AdminLogin";

const TOKEN_KEY = "scalexpertz_admin_token";

// --- tiny external store around localStorage so React can subscribe to it ---
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getSnapshot(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

// `undefined` = not yet hydrated on the client; render nothing instead of a login flash.
function getServerSnapshot(): string | null | undefined {
  return undefined;
}

function setStoredToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {}
  listeners.forEach((l) => l());
}

interface AdminAuthContextValue {
  token: string;
  /** fetch() with the admin Bearer token attached. Clears session on 401. */
  authFetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}

export default function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const clearSession = useCallback((message?: string) => {
    setStoredToken(null);
    if (message) setSessionMessage(message);
  }, []);

  const authFetch = useCallback(
    async (input: RequestInfo | URL, init: RequestInit = {}) => {
      const headers = new Headers(init.headers || {});
      if (token) headers.set("Authorization", `Bearer ${token}`);
      const res = await fetch(input, { ...init, headers });
      if (res.status === 401) clearSession("Session expired. Please log in again.");
      return res;
    },
    [token, clearSession]
  );

  const logout = useCallback(() => {
    clearSession();
    router.push("/");
  }, [clearSession, router]);

  const value = useMemo<AdminAuthContextValue | null>(
    () => (token ? { token, authFetch, logout } : null),
    [token, authFetch, logout]
  );

  if (token === undefined) {
    return <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b]" />;
  }

  if (!value) {
    return (
      <AdminLogin
        initialError={sessionMessage}
        onSuccess={(t) => {
          setSessionMessage(null);
          setStoredToken(t);
        }}
      />
    );
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
