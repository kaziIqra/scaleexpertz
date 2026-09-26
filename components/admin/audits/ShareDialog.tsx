"use client";

import { useCallback, useEffect, useState } from "react";
import { LuX, LuCopy, LuCheck, LuExternalLink, LuRefreshCw, LuLink, LuBan, LuMessageSquare } from "react-icons/lu";
import { useAdminAuth } from "../AdminAuthProvider";
import { inputClass, labelClass, primaryBtnClass, secondaryBtnClass, chipClass } from "../ui";

interface Share {
  token: string;
  url: string;
  expires_at: string | null;
  requires_passcode: boolean;
  view_count: number;
  last_viewed_at: string | null;
  created_at: string;
  state: "active" | "revoked" | "expired";
}

interface Props {
  auditId: string;
  company: string;
  hasPdf: boolean;
  onClose: () => void;
}

export default function ShareDialog({ auditId, company, hasPdf, onClose }: Props) {
  const { authFetch } = useAdminAuth();
  const [active, setActive] = useState<Share | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresDays, setExpiresDays] = useState<string>("30");
  const [passcode, setPasscode] = useState("");
  const [copied, setCopied] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await authFetch(`/api/admin/audits/${auditId}/share`);
      const data = await res.json();
      if (res.ok) setActive(data.active);
      else setError(data.error || "Could not load share links.");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [authFetch, auditId]);

  useEffect(() => {
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  const create = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await authFetch(`/api/admin/audits/${auditId}/share`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expires_days: expiresDays === "never" ? null : Number(expiresDays), passcode: passcode || undefined }),
      });
      const data = await res.json();
      if (res.ok) {
        setActive(data.share);
        setPasscode("");
      } else setError(data.error || "Could not create link.");
    } catch {
      setError("Network error.");
    } finally {
      setBusy(false);
    }
  };

  const revoke = async () => {
    if (!confirm("Turn off this link? Anyone who has it will no longer be able to open the document.")) return;
    setBusy(true);
    try {
      const res = await authFetch(`/api/admin/audits/${auditId}/share`, { method: "DELETE" });
      if (res.ok) setActive(null);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!active) return;
    try {
      await navigator.clipboard.writeText(active.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const waText = active
    ? encodeURIComponent(`Hi, here is your Growth Audit & Execution Blueprint from ScaleXpertz for ${company}:\n${active.url}${active.requires_passcode ? "\n(Passcode shared separately)" : ""}`)
    : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => !busy && onClose()}>
      <div
        className="relative w-full max-w-lg rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#14141a] p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-4">
          <div>
            <span className={labelClass}>Share with client</span>
            <h3 className="mt-0.5 font-display text-xl font-bold">{company}</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-2 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
            <LuX size={18} />
          </button>
        </div>

        {error ? <p className="mt-4 text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5">{error}</p> : null}

        {loading ? (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <LuRefreshCw className="animate-spin text-accent" size={24} />
          </div>
        ) : !hasPdf ? (
          <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">Generate the PDF first, then come back here to create a share link.</p>
        ) : active ? (
          <div className="mt-5 grid gap-4">
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className={chipClass("green")}>Link active</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  {active.view_count} view{active.view_count === 1 ? "" : "s"}
                  {active.last_viewed_at ? ` · last ${new Date(active.last_viewed_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}` : ""}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input readOnly value={active.url} onFocus={(e) => e.target.select()} className={`${inputClass} font-mono text-xs`} />
                <button onClick={copy} title="Copy link" className={`${secondaryBtnClass} shrink-0 px-3`}>
                  {copied ? <LuCheck size={14} className="text-emerald-500" /> : <LuCopy size={14} />}
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                <span>{active.expires_at ? `Expires ${new Date(active.expires_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}` : "Never expires"}</span>
                <span>{active.requires_passcode ? "Passcode required" : "No passcode"}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a href={`https://wa.me/?text=${waText}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition-all">
                <LuMessageSquare size={14} /> Send on WhatsApp
              </a>
              <a href={active.url} target="_blank" rel="noopener noreferrer" className={secondaryBtnClass}>
                <LuExternalLink size={14} /> Preview as client
              </a>
              <button onClick={revoke} disabled={busy} className={`${secondaryBtnClass} text-rose-500 hover:bg-rose-500/10`}>
                <LuBan size={14} /> Turn off link
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Regenerating the PDF updates what this link shows. Creating a new link below turns this one off.
            </p>
          </div>
        ) : (
          <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">No active link. Create one below.</p>
        )}

        {hasPdf && !loading ? (
          <div className="mt-5 grid gap-3 rounded-2xl border border-black/10 dark:border-white/10 p-4">
            <span className={labelClass}>{active ? "Create a new link" : "New link"}</span>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Expires after</span>
                <select value={expiresDays} onChange={(e) => setExpiresDays(e.target.value)} className={inputClass}>
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="never">Never</option>
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Passcode (optional)</span>
                <input value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="e.g. 4821" className={inputClass} />
              </label>
            </div>
            <button onClick={create} disabled={busy} className={primaryBtnClass}>
              {busy ? <LuRefreshCw className="animate-spin" size={14} /> : (
                <>
                  <LuLink size={14} /> {active ? "Replace link" : "Create share link"}
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
