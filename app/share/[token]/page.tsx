"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuDownload, LuExternalLink, LuLock, LuRefreshCw, LuFileText, LuArrowRight } from "react-icons/lu";

interface ShareInfo {
  company: string;
  client_name: string;
  industry: string | null;
  version: number;
  updated_at: string;
  has_pdf: boolean;
  requires_passcode: boolean;
  unlocked: boolean;
  expires_at: string | null;
}

export default function SharePage() {
  const { token } = useParams<{ token: string }>();
  const [info, setInfo] = useState<ShareInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [passcode, setPasscode] = useState("");
  const [unlocking, setUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const load = useCallback(async () => {
    try {
      const res = await fetch(`/api/share/${token}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "This link is not valid.");
        return;
      }
      setInfo(data);
    } catch {
      setError("Could not load this document. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const t = setTimeout(() => {
      load();
    }, 0);
    return () => clearTimeout(t);
  }, [load]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setIsMobile(mq.matches);
    const id = setTimeout(apply, 0);
    mq.addEventListener("change", apply);
    return () => {
      clearTimeout(id);
      mq.removeEventListener("change", apply);
    };
  }, []);

  const unlock = async (e: React.FormEvent) => {
    e.preventDefault();
    setUnlocking(true);
    setUnlockError(null);
    try {
      const res = await fetch(`/api/share/${token}/unlock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = await res.json();
      if (res.ok) {
        setInfo((i) => (i ? { ...i, unlocked: true } : i));
      } else setUnlockError(data.error || "Incorrect passcode.");
    } catch {
      setUnlockError("Network error. Please try again.");
    } finally {
      setUnlocking(false);
    }
  };

  const pdfUrl = `/api/share/${token}/pdf`;
  const ready = info && info.has_pdf && (!info.requires_passcode || info.unlocked);

  return (
    <div className="min-h-dvh bg-[#0c0c0e] text-white font-sans">
      {/* header */}
      <header className="border-b border-white/10 px-5 sm:px-10 py-4 flex items-center justify-between">
        <span className="font-display text-base font-extrabold tracking-tight">
          ScaleXpertz<span className="text-accent">.</span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber">Growth Audit</span>
      </header>

      <main className="mx-auto max-w-5xl px-5 sm:px-10 py-8 sm:py-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3 text-slate-400">
            <LuRefreshCw className="animate-spin text-accent" size={28} />
            <p className="text-xs font-mono tracking-wider">Loading your document…</p>
          </div>
        ) : error ? (
          <div className="mx-auto max-w-md text-center py-24">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-400">
              <LuFileText size={26} />
            </div>
            <h1 className="mt-6 font-display text-2xl font-bold">{error}</h1>
            <p className="mt-2 text-sm text-slate-400">Ask your ScaleXpertz contact for a fresh link.</p>
            <Link href="/" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-amber hover:underline">
              Visit ScaleXpertz <LuArrowRight size={14} />
            </Link>
          </div>
        ) : info ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-amber">Prepared for</p>
                <h1 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">{info.company}</h1>
                <p className="mt-2 text-sm text-slate-400">
                  Growth Audit &amp; Execution Blueprint
                  {info.industry ? <span> · {info.industry}</span> : null}
                </p>
              </div>
              {ready ? (
                <div className="flex items-center gap-2">
                  <a
                    href={`${pdfUrl}?download=1`}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent via-amber to-pink-500 px-4 py-2.5 text-xs font-extrabold text-ink shadow-lg shadow-accent/20 transition-all hover:scale-[1.02] active:scale-95"
                  >
                    <LuDownload size={14} /> Download PDF
                  </a>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                  >
                    <LuExternalLink size={14} /> Open
                  </a>
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              {!info.has_pdf ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center text-slate-400 text-sm">
                  The document is still being prepared. Please check back shortly.
                </div>
              ) : info.requires_passcode && !info.unlocked ? (
                <form onSubmit={unlock} className="mx-auto max-w-sm rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/15 text-accent">
                    <LuLock size={22} />
                  </div>
                  <h2 className="mt-5 font-display text-lg font-bold">This document is protected</h2>
                  <p className="mt-1 text-xs text-slate-400">Enter the passcode shared with you.</p>
                  <input
                    type="password"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Passcode"
                    autoFocus
                    className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm tracking-widest text-white placeholder:text-white/30 focus:border-amber focus:ring-1 focus:ring-amber outline-none"
                  />
                  {unlockError ? <p className="mt-3 text-xs font-semibold text-rose-400">{unlockError}</p> : null}
                  <button
                    type="submit"
                    disabled={unlocking || !passcode}
                    className="mt-4 w-full rounded-xl bg-gradient-to-r from-accent via-amber to-pink-500 py-3 text-sm font-extrabold text-ink disabled:opacity-50"
                  >
                    {unlocking ? "Checking…" : "View document"}
                  </button>
                </form>
              ) : isMobile ? (
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
                  <LuFileText className="mx-auto text-accent" size={36} />
                  <p className="mt-4 text-sm text-slate-300">Your blueprint is ready.</p>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent via-amber to-pink-500 py-3 text-sm font-extrabold text-ink"
                  >
                    <LuExternalLink size={16} /> Open PDF
                  </a>
                  <a href={`${pdfUrl}?download=1`} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 py-3 text-sm font-semibold">
                    <LuDownload size={16} /> Download
                  </a>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl">
                  <iframe title="Growth Audit" src={`${pdfUrl}#toolbar=1&navpanes=0`} className="h-[80vh] w-full border-0" />
                </div>
              )}
            </div>

            <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-display text-lg font-bold">Ready to execute?</p>
                <p className="mt-1 text-sm text-slate-400">Book a call and we&apos;ll walk through the blueprint together.</p>
              </div>
              <Link
                href="/diagnosis"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/40 bg-accent/15 px-5 py-3 text-sm font-bold text-amber hover:bg-accent/25 transition-all"
              >
                Book a diagnosis call <LuArrowRight size={14} />
              </Link>
            </div>

            <p className="mt-8 text-center text-[11px] text-slate-500">
              Confidential. Prepared by ScaleXpertz for {info.company}.
              {info.expires_at ? <> Link valid until {new Date(info.expires_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.</> : null}
            </p>
          </>
        ) : null}
      </main>
    </div>
  );
}
