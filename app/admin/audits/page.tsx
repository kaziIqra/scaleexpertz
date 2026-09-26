"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LuPlus,
  LuRefreshCw,
  LuDownload,
  LuPencil,
  LuTrash2,
  LuX,
  LuFileText,
  LuSearch,
} from "react-icons/lu";
import AdminHeader, { adminBtnClass, adminAccentBtnClass } from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import PlaceholderForm from "@/components/admin/audits/PlaceholderForm";
import { cardClass, chipClass, inputClass, primaryBtnClass, secondaryBtnClass, dangerBtnClass, labelClass } from "@/components/admin/ui";
import type { AuditTemplateSummary, ClientAuditListItem, PlaceholderValues } from "@/lib/audits/types";

export default function AuditsListPage() {
  const router = useRouter();
  const { authFetch } = useAdminAuth();

  const [audits, setAudits] = useState<ClientAuditListItem[]>([]);
  const [templates, setTemplates] = useState<AuditTemplateSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  // new-audit modal
  const [creating, setCreating] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [templateSlug, setTemplateSlug] = useState<string>("");
  const [values, setValues] = useState<PlaceholderValues>({});
  const [submitting, setSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  const load = useCallback(
    async (silent = false) => {
      if (!silent) setRefreshing(true);
      setError(null);
      try {
        const [a, t] = await Promise.all([authFetch("/api/admin/audits"), authFetch("/api/admin/templates")]);
        if (a.status === 401 || t.status === 401) return;
        const aj = await a.json();
        const tj = await t.json();
        if (aj.success) setAudits(aj.audits);
        else if (aj.error) setError(aj.error);
        if (tj.success) setTemplates(tj.templates);
      } catch (err) {
        console.error(err);
        setError("Unable to load audits. Check network and Supabase configuration.");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [authFetch]
  );

  useEffect(() => {
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  const selectedTemplate = useMemo(() => templates.find((t) => t.slug === templateSlug), [templates, templateSlug]);

  const openCreate = () => {
    setCreating(true);
    setStep(1);
    setCreateError(null);
    const first = templates[0];
    if (first) chooseTemplate(first);
  };

  const chooseTemplate = (t: AuditTemplateSummary) => {
    setTemplateSlug(t.slug);
    const defaults: PlaceholderValues = {};
    for (const p of t.placeholders) if (p.default !== undefined) defaults[p.key] = p.default;
    setValues(defaults);
  };

  const submitCreate = async () => {
    if (!selectedTemplate) return;
    setSubmitting(true);
    setCreateError(null);
    try {
      const res = await authFetch("/api/admin/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template_slug: selectedTemplate.slug, placeholder_values: values }),
      });
      const data = await res.json();
      if (res.ok && data.audit?.id) {
        router.push(`/admin/audits/${data.audit.id}`);
      } else {
        setCreateError(data.error || "Could not create audit.");
      }
    } catch {
      setCreateError("Network error while creating audit.");
    } finally {
      setSubmitting(false);
    }
  };

  const download = async (id: string) => {
    const res = await authFetch(`/api/admin/audits/${id}/pdf`);
    const data = await res.json();
    if (res.ok && data.url) window.open(data.url, "_blank", "noopener");
    else alert(data.error || "No PDF available yet. Open the audit and click Generate PDF.");
  };

  const remove = async (a: ClientAuditListItem) => {
    if (!confirm(`Delete the audit for "${a.company}"? This also removes its stored PDF.`)) return;
    const res = await authFetch(`/api/admin/audits/${a.id}`, { method: "DELETE" });
    if (res.ok) setAudits((prev) => prev.filter((x) => x.id !== a.id));
    else alert("Failed to delete audit");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return audits;
    return audits.filter(
      (a) =>
        a.company.toLowerCase().includes(q) ||
        a.client_name.toLowerCase().includes(q) ||
        (a.industry ?? "").toLowerCase().includes(q)
    );
  }, [audits, query]);

  const templateName = (slug: string) => templates.find((t) => t.slug === slug)?.name ?? slug;

  return (
    <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <AdminHeader
        actions={
          <>
            <button onClick={() => load()} disabled={refreshing} title="Refresh" className={adminBtnClass}>
              <LuRefreshCw className={refreshing ? "animate-spin text-amber" : ""} size={13} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button onClick={openCreate} disabled={!templates.length} className={adminAccentBtnClass}>
              <LuPlus size={13} />
              <span>New audit</span>
            </button>
          </>
        }
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-500 dark:text-rose-400 font-medium flex items-center justify-between gap-3">
            <span>{error}</span>
            <button onClick={() => load()} className="px-3 py-1 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg text-xs font-bold cursor-pointer shrink-0">
              Retry
            </button>
          </div>
        )}

        <div className={`${cardClass} flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-3 sm:p-4`}>
          <div className="relative flex-1">
            <LuSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by company, client or industry…"
              className={`${inputClass} pl-10`}
            />
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 sm:pr-2">
            {templates.length} template{templates.length === 1 ? "" : "s"} available
          </div>
        </div>

        <div className={`${cardClass} overflow-hidden`}>
          <div className="border-b border-black/10 dark:border-white/10 px-5 py-3.5 flex items-center justify-between">
            <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Client Audits</span>
              <span className="rounded-full bg-black/5 dark:bg-white/10 px-2 py-0.5 text-xs text-amber font-mono font-bold">{filtered.length}</span>
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 gap-3">
              <LuRefreshCw className="animate-spin text-accent" size={28} />
              <p className="text-xs font-mono tracking-wider">Loading audits…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-400 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] mb-3">
                <LuFileText size={24} />
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">No audits yet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Click <b>New audit</b>, pick a template, fill in the client details and generate a branded PDF.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300">
                <thead className="border-b border-black/10 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Company / Client</th>
                    <th className="px-4 py-3">Template</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 font-medium">
                  {filtered.map((a) => (
                    <tr key={a.id} className="group hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors">
                      <td className="px-4 py-3.5">
                        <Link href={`/admin/audits/${a.id}`} className="font-bold text-slate-900 dark:text-white text-sm hover:text-amber transition-colors">
                          {a.company}
                        </Link>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {a.client_name}
                          {a.industry ? <span className="text-slate-400"> · {a.industry}</span> : null}
                        </div>
                      </td>
                      <td className="px-4 py-3.5 max-w-xs">
                        <span className="line-clamp-2">{templateName(a.template_slug)}</span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={chipClass(a.status === "final" ? "green" : "grey")}>
                          {a.status === "final" ? `Final · v${a.version}` : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 dark:text-slate-400 text-[11px] font-mono">
                        {new Date(a.updated_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/admin/audits/${a.id}`} title="Edit" className={`${dangerBtnClass} hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10`}>
                            <LuPencil size={14} />
                          </Link>
                          <button
                            onClick={() => download(a.id)}
                            disabled={!a.pdf_path}
                            title={a.pdf_path ? "Download PDF" : "Generate a PDF first"}
                            className={`${dangerBtnClass} hover:text-amber hover:bg-accent/10 disabled:opacity-30 disabled:hover:bg-transparent`}
                          >
                            <LuDownload size={14} />
                          </button>
                          <button onClick={() => remove(a)} title="Delete" className={dangerBtnClass}>
                            <LuTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={() => !submitting && setCreating(false)}>
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-black/10 dark:border-white/15 bg-white dark:bg-[#14141a] p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div>
                <span className={labelClass}>New client audit · step {step} of 2</span>
                <h3 className="mt-0.5 font-display text-xl sm:text-2xl font-bold">{step === 1 ? "Choose an audit type" : "Client details"}</h3>
              </div>
              <button onClick={() => setCreating(false)} className="rounded-full p-2 text-slate-400 hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer">
                <LuX size={18} />
              </button>
            </div>

            {step === 1 ? (
              <div className="mt-5 grid gap-3">
                {templates.map((t) => (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => chooseTemplate(t)}
                    className={`text-left rounded-2xl border p-4 transition-all cursor-pointer ${
                      templateSlug === t.slug
                        ? "border-amber bg-accent/10 shadow-[0_0_0_1px_rgba(245,158,11,0.5)]"
                        : "border-black/10 dark:border-white/10 hover:border-amber/50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-sm">{t.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {t.pageCount} pages · v{t.version}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.description}</p>
                  </button>
                ))}
                <div className="mt-2 flex justify-end">
                  <button type="button" disabled={!selectedTemplate} onClick={() => setStep(2)} className={primaryBtnClass}>
                    Continue &rarr;
                  </button>
                </div>
              </div>
            ) : selectedTemplate ? (
              <div className="mt-5 grid gap-5">
                <PlaceholderForm placeholders={selectedTemplate.placeholders} values={values} onChange={setValues} />
                {createError && (
                  <p className="text-xs font-semibold text-rose-500 bg-rose-500/10 border border-rose-500/30 rounded-lg p-2.5">{createError}</p>
                )}
                <div className="flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setStep(1)} className={secondaryBtnClass}>
                    &larr; Back
                  </button>
                  <button type="button" onClick={submitCreate} disabled={submitting} className={primaryBtnClass}>
                    {submitting ? <LuRefreshCw className="animate-spin" size={14} /> : <span>Create audit &rarr;</span>}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
