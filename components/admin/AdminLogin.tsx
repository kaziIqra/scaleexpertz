"use client";

import { useState } from "react";
import Link from "next/link";
import { LuLock, LuRefreshCw } from "react-icons/lu";
import ThemeToggle from "@/components/ui/ThemeToggle";

import type { AdminUser } from "./AdminAuthProvider";

interface Props {
  initialError?: string | null;
  onSuccess: (token: string, user: AdminUser) => void;
}

const inputClass =
  "w-full rounded-xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.04] px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber outline-none transition-all";

export default function AdminLogin({ initialError, onSuccess }: Props) {
  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem("scalexpertz_saved_username") ?? "";
    } catch {
      return "";
    }
  });
  const [password, setPassword] = useState("");
  const [rememberUser, setRememberUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError ?? null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok && data.token && data.user) {
        try {
          // Never persist passwords; only the username as a convenience.
          localStorage.removeItem("scalexpertz_saved_password");
          localStorage.removeItem("scalexpertz_remember_creds");
          if (rememberUser) localStorage.setItem("scalexpertz_saved_username", username.trim());
          else localStorage.removeItem("scalexpertz_saved_username");
        } catch {}
        onSuccess(data.token, data.user);
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch {
      setError("Unable to authenticate. Check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center bg-[#f8f9fc] dark:bg-[#0a0a0d] p-4 text-slate-900 dark:text-white transition-colors duration-300 relative">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md overflow-hidden rounded-3xl p-[1.5px] bg-gradient-to-b from-accent/50 via-amber/40 to-pink-500/40 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
        <div className="relative rounded-[22.5px] bg-white/95 dark:bg-[#121217]/95 p-8 sm:p-10 backdrop-blur-2xl text-center shadow-xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/15 text-accent shadow-inner">
            <LuLock size={26} />
          </div>

          <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            ScaleXpertz Admin
          </h1>
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
            Sign in with your admin account.
          </p>

          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4 text-left">
            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber font-bold">
                Username
              </span>
              <input
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username..."
                className={inputClass}
              />
            </label>

            <label className="grid gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-widest text-amber font-bold">
                Password
              </span>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={inputClass}
              />
            </label>

            <label className="flex items-center gap-2.5 cursor-pointer select-none text-xs text-slate-600 dark:text-slate-400">
              <input
                type="checkbox"
                checked={rememberUser}
                onChange={(e) => setRememberUser(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-amber focus:ring-amber accent-amber cursor-pointer"
              />
              <span>Remember my username on this device</span>
            </label>

            {error && (
              <p className="text-xs font-semibold text-rose-500 dark:text-rose-400 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent via-amber to-pink-500 py-3 text-sm font-extrabold text-ink shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <LuRefreshCw className="animate-spin" size={16} />
              ) : (
                <span>Access Dashboard &rarr;</span>
              )}
            </button>

            <div className="mt-2 text-center">
              <Link
                href="/"
                className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                &larr; Back to Website
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
