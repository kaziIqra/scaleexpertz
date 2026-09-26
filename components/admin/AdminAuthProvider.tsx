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
const USER_KEY = "scalexpertz_admin_user";

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: "owner" | "admin";
}

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

function getUserSnapshot(): string | null {
  try {
    return localStorage.getItem(USER_KEY);
  } catch {
    return null;
  }
}

function setStoredSession(token: string | null, user: AdminUser | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(USER_KEY);
  } catch {}
  listeners.forEach((l) => l());
}

interface AdminAuthContextValue {
  token: string;
  user: AdminUser;
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

function parseUser(raw: string | null): AdminUser | null {
  if (!raw) return null;
  try {
    const u = JSON.parse(raw);
    if (u && typeof u.username === "string" && (u.role === "owner" || u.role === "admin")) return u as AdminUser;
  } catch {}
  return null;
}

export default function AdminAuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const token = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const rawUser = useSyncExternalStore(subscribe, getUserSnapshot, () => null);
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);

  useEffect(() => {
    router.prefetch("/");
  }, [router]);

  const clearSession = useCallback((message?: string) => {
    setStoredSession(null, null);
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

  const user = useMemo(() => parseUser(rawUser), [rawUser]);

  const value = useMemo<AdminAuthContextValue | null>(
    () => (token && user ? { token, user, authFetch, logout } : null),
    [token, user, authFetch, logout]
  );

  if (token === undefined) {
    return <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b]" />;
  }

  if (!value) {
    return (
      <AdminLogin
        initialError={sessionMessage}
        onSuccess={(t, u) => {
          setSessionMessage(null);
          setStoredSession(t, u);
        }}
      />
    );
  }

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
