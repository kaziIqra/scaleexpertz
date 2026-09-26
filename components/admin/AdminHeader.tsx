"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { LuLogOut, LuUsers, LuFileText } from "react-icons/lu";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useAdminAuth } from "./AdminAuthProvider";

const TABS = [
  { href: "/admin", label: "Leads", icon: LuUsers, exact: true },
  { href: "/admin/audits", label: "Audits", icon: LuFileText, exact: false },
];

export const adminBtnClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-white hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export const adminAccentBtnClass =
  "inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/15 px-3 py-1.5 text-xs font-bold text-amber hover:bg-accent/25 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

export default function AdminHeader({ actions }: { actions?: ReactNode }) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#111115]/90 backdrop-blur-xl px-4 sm:px-8 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <Link
            href="/"
            className="font-display text-lg font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-amber transition-colors shrink-0"
          >
            ScaleXpertz<span className="text-accent">.</span>
          </Link>

          <nav className="flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] p-1">
            {TABS.map((tab) => {
              const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    active
                      ? "bg-white dark:bg-[#1d1d24] text-amber shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Icon size={13} />
                  <span>{tab.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {actions}
          <button
            onClick={logout}
            title="Log out"
            className="inline-flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:border-rose-500/30 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LuLogOut size={13} />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>
    </header>
  );
}
