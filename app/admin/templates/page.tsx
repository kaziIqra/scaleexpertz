"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuPlus, LuRefreshCw, LuPencil, LuTrash2, LuX, LuCopy, LuLayoutTemplate, LuLock } from "react-icons/lu";
import AdminHeader, { adminBtnClass, adminAccentBtnClass } from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import { cardClass, chipClass, inputClass, labelClass, primaryBtnClass, dangerBtnClass, textareaClass } from "@/components/admin/ui";
import type { AuditTemplateSummary } from "@/lib/audits/types";

export default function TemplatesPage() {
  const router = useRouter();
  const { authFetch } = useAdminAuth();

  const [templates, setTemplates] = useState<AuditTemplateSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [base, setBase] = useState<string>("blank");
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const res = await authFetch("/api/admin/templates");
      if (res.status === 401) return;
      const data = await res.json();
      if (data.success) {
        setTemplates(data.templates);
        setWarning(data.warning ?? null);
      } else setError(data.error || "Could not load templates");
    } catch {
      setError("Unable to load templates.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [authFetch]);

  useEffect(() => {
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  const openCreate = (baseSlug = "blank") => {
    setBase(baseSlug);
    setName(baseSlug === "blank" ? "" : `${templates.find((t) => t.slug === baseSlug)?.name ?? ""} (copy)`);
    setDescription("");
    setCreateError(null);
    setCreating(true);
  };

  const submit = async () => {
    setSubmitting(true);
    setCreateError(null);
    try {
      const res = await authFetch("/api/admin/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, base }),
      });
      const data = await res.json();
      if (res.ok && data.template?.slug) router.push(`/admin/templates/${data.template.slug}`);
      else setCreateError(data.error || "Could not create template.");
    } catch {
      setCreateError("Network error.");
    } finally {
      setSubmitting(false);
    }
  };

  const remove = async (t: AuditTemplateSummary) => {
    if (!confirm(`Delete template "${t.name}"?`)) return;
    const res = await authFetch(`/api/admin/templates/${t.slug}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) setTemplates((prev) => prev.filter((x) => x.slug !== t.slug));
    else alert(data.error || "Failed to delete");
  };

  return (
    <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <AdminHeader
        actions={
          <>
            <button onClick={load} disabled={refreshing} className={adminBtnClass}>
              <LuRefreshCw className={refreshing ? "animate-spin text-amber" : ""} size={13} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={() => openCreate()} className={adminAccentBtnClass}>
              <LuPlus size={13} />
              <span className="hidden sm:inline">New template</span>
            </button>
          </>
        }
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {error && <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-500 font-medium">{error}</div>}
        {warning && (
          <div className="rounded-2xl border border-amber/40 bg-accent/10 p-4 text-xs text-amber font-medium">
            Custom templates unavailable: {warning}. Run the <code className="font-mono">audit_templates</code> SQL from supabase/schema.sql.
          </div>
        )}

        <div className={`${cardClass} overflow-hidden`}>
          <div className="border-b border-black/10 dark:border-white/10 px-5 py-3.5 flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Audit Templates</span>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs text-amber font-mono font-bold">{templates.length}</span>
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Built-in templates are read-only. Clone one, or build from scratch.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <LuRefreshCw className="animate-spin text-accent" size={28} />
            </div>
          ) : (
            <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((t) => (
                <div key={t.slug} className="flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50/60 dark:bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link href={`/admin/templates/${t.slug}`} className="font-semibold text-sm text-slate-900 dark:text-white hover:text-amber transition-colors line-clamp-2">
                        {t.name}
                      </Link>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        <span className={chipClass(t.source === "code" ? "grey" : "gold")}>
                          {t.source === "code" ? (
                            <span className="inline-flex items-center gap-1">
                              <LuLock size={9} /> Built-in
                            </span>
                          ) : (
                            "Custom"
                          )}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {t.pageCount} pages · {t.placeholders.length} fields
                        </span>
                      </div>
                    </div>
                    <LuLayoutTemplate className="text-slate-300 dark:text-slate-600 shrink-0" size={20} />
                  </div>
                  <p className="mt-2 flex-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">{t.description || "No description."}</p>
                  <div className="mt-3 flex items-center justify-end gap-1 border-t border-black/5 dark:border-white/5 pt-2">
                    <button onClick={() => openCreate(t.slug)} title="Clone" className={`${dangerBtnClass} hover:text-amber hover:bg-accent/10`}>
                      <LuCopy size={14} />
                    </button>
                    <Link href={`/admin/templates/${t.slug}`} title={t.source === "code" ? "View" : "Edit"} className={`${dangerBtnClass} hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10`}>
                      <LuPencil size={14} />
                    </Link>
                    {t.source === "custom" ? (
                      <button onClick={() => remove(t)} title="Delete" className={dangerBtnClass}>
                        <LuTrash2 size={14} />
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => !submitting && setCreating(false)}>
          <div className="relative w-full max-w-lg rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#14141a] p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className={labelClass}>New template</span>
                <h3 className="mt-0.5 font-display text-xl font-bold">Create audit template</h3>
              </div>
              <button onClick={() => setCreating(false)} className="rounded-full p-2 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                <LuX size={18} />
              </button>
            </div>
            <div className="mt-5 grid gap-4">
              <label className="grid gap-1.5">
                <span className={labelClass}>Name *</span>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Skincare D2C Growth Audit" className={inputClass} />
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Start from</span>
                <select value={base} onChange={(e) => setBase(e.target.value)} className={inputClass}>
                  <option value="blank">Blank (cover + one page)</option>
                  {templates.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      Clone: {t.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className={labelClass}>Description</span>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${textareaClass} text-sm px-3.5 py-2.5`} placeholder="Shown in the New audit picker" />
              </label>
              {createError && <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5">{createError}</p>}
              <button onClick={submit} disabled={submitting || !name.trim()} className={primaryBtnClass}>
                {submitting ? <LuRefreshCw className="animate-spin" size={14} /> : <span>Create &rarr;</span>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
