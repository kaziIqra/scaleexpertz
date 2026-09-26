"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LuArrowLeft, LuRefreshCw, LuSave, LuEye, LuLock, LuTrash2, LuPlus } from "react-icons/lu";
import AdminHeader, { adminBtnClass, adminAccentBtnClass } from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import SectionEditor from "@/components/admin/audits/SectionEditor";
import PdfPreview from "@/components/admin/audits/PdfPreview";
import { cardClass, chipClass, labelClass, inputClass, smallInputClass, textareaClass, mutedLabelClass, dangerBtnClass } from "@/components/admin/ui";
import { PLACEHOLDER_TYPES } from "@/lib/audits/blank";
import type { AuditPage, AuditTemplateDoc, DerivedRule, PlaceholderDef } from "@/lib/audits/types";

type Tab = "settings" | "placeholders" | "pages";

export default function TemplateEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const { authFetch } = useAdminAuth();

  const [doc, setDoc] = useState<AuditTemplateDoc | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [docTitle, setDocTitle] = useState("");
  const [placeholders, setPlaceholders] = useState<PlaceholderDef[]>([]);
  const [derived, setDerived] = useState<DerivedRule[]>([]);
  const [pages, setPages] = useState<AuditPage[]>([]);
  const [tab, setTab] = useState<Tab>("pages");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState("");
  const [previewSnapshot, setPreviewSnapshot] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const readOnly = doc?.source === "code";
  const current = useMemo(
    () => JSON.stringify({ name, description, docTitle, placeholders, derived, pages }),
    [name, description, docTitle, placeholders, derived, pages]
  );
  const dirty = !readOnly && current !== savedSnapshot;
  const previewStale = Boolean(previewUrl) && current !== previewSnapshot;

  const showToast = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(null), 2600);
  };

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await authFetch(`/api/admin/templates/${slug}`);
      if (res.status === 401) return;
      const data = await res.json();
      if (!res.ok || !data.template) {
        setError(data.error || "Template not found");
        return;
      }
      const t: AuditTemplateDoc = data.template;
      setDoc(t);
      setName(t.name);
      setDescription(t.description);
      setDocTitle(t.docTitle);
      setPlaceholders(t.placeholders);
      setDerived(t.derived ?? []);
      setPages(t.pages);
      setSavedSnapshot(
        JSON.stringify({ name: t.name, description: t.description, docTitle: t.docTitle, placeholders: t.placeholders, derived: t.derived ?? [], pages: t.pages })
      );
    } catch {
      setError("Unable to load template.");
    } finally {
      setLoading(false);
    }
  }, [authFetch, slug]);

  useEffect(() => {
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  const save = async () => {
    if (readOnly) return;
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch(`/api/admin/templates/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, docTitle, placeholders, derived, pages }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Save failed");
        return;
      }
      setDoc(data.template);
      setSavedSnapshot(current);
      showToast("Template saved");
    } catch {
      setError("Network error while saving.");
    } finally {
      setSaving(false);
    }
  };

  const preview = async () => {
    setPreviewing(true);
    setError(null);
    try {
      const res = await authFetch("/api/admin/templates/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docTitle, placeholders, derived, pages }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Preview failed (${res.status})`);
        return;
      }
      const url = URL.createObjectURL(await res.blob());
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return url;
      });
      setPreviewSnapshot(current);
    } catch {
      setError("Network error while rendering preview.");
    } finally {
      setPreviewing(false);
    }
  };

  const updatePlaceholder = (i: number, patch: Partial<PlaceholderDef>) =>
    setPlaceholders((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  const tokenHints = useMemo(() => {
    const keys = placeholders.map((p) => p.key);
    const extra: string[] = [];
    for (const p of placeholders) {
      if (p.type === "currency") extra.push(`${p.key}_fmt`);
      if (p.type === "textarea") extra.push(`${p.key}_joined`);
    }
    for (const d of derived) if (d.key) extra.push(d.key);
    if (keys.includes("timeline_days")) extra.push("phase_1_range", "phase_2_range", "phase_3_range", "phase_1_short", "phase_2_short", "phase_3_short");
    extra.push("date", "doc_title");
    return [...keys, ...extra];
  }, [placeholders, derived]);

  return (
    <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <AdminHeader
        actions={
          <>
            <button onClick={preview} disabled={previewing || loading} className={adminBtnClass}>
              {previewing ? <LuRefreshCw className="animate-spin text-amber" size={13} /> : <LuEye size={13} />}
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button onClick={save} disabled={saving || loading || !dirty || readOnly} className={adminAccentBtnClass}>
              {saving ? <LuRefreshCw className="animate-spin" size={13} /> : <LuSave size={13} />}
              <span className="hidden sm:inline">{readOnly ? "Read-only" : dirty ? "Save template" : "Saved"}</span>
            </button>
          </>
        }
      />

      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-5 sm:py-6 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/templates" className={adminBtnClass}>
            <LuArrowLeft size={13} />
            <span>All templates</span>
          </Link>
          {doc ? (
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-bold text-slate-900 dark:text-white truncate">{name}</h1>
                <span className={chipClass(readOnly ? "grey" : "gold")}>
                  {readOnly ? (
                    <span className="inline-flex items-center gap-1">
                      <LuLock size={9} /> Built-in
                    </span>
                  ) : (
                    "Custom"
                  )}
                </span>
                {dirty ? <span className={chipClass("gold")}>Unsaved</span> : null}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                slug <code className="font-mono">{slug}</code> · {pages.length} pages · {placeholders.length} placeholders
                {readOnly ? " · clone from the Templates list to edit" : ""}
              </p>
            </div>
          ) : null}
        </div>

        {error && <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-500 font-medium">{error}</div>}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
            <LuRefreshCw className="animate-spin text-accent" size={28} />
          </div>
        ) : doc ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div className={`space-y-4 lg:max-h-[calc(100dvh-170px)] lg:overflow-y-auto lg:pr-1 ${readOnly ? "opacity-90 pointer-events-none select-text" : ""}`}>
              <div className={`${cardClass} p-1 flex gap-1 pointer-events-auto`}>
                {(["pages", "placeholders", "settings"] as Tab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      tab === t ? "bg-accent/15 text-amber" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {t === "pages" ? `Pages (${pages.length})` : t === "placeholders" ? `Placeholders (${placeholders.length})` : "Settings"}
                  </button>
                ))}
              </div>

              {tab === "settings" ? (
                <div className={`${cardClass} p-5 grid gap-4`}>
                  <label className="grid gap-1.5">
                    <span className={labelClass}>Template name</span>
                    <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                  </label>
                  <label className="grid gap-1.5">
                    <span className={labelClass}>Description (shown in New audit picker)</span>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className={`${textareaClass} text-sm px-3.5 py-2.5`} />
                  </label>
                  <label className="grid gap-1.5">
                    <span className={labelClass}>Footer document title</span>
                    <input value={docTitle} onChange={(e) => setDocTitle(e.target.value)} className={inputClass} />
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Rendered as &quot;ScaleXpertz | {"{title}"}&quot; on every page. May use tokens, e.g. <code className="font-mono text-amber">{"{{industry}} Growth Blueprint"}</code>.
                    </span>
                  </label>
                </div>
              ) : tab === "placeholders" ? (
                <div className="grid gap-4">
                  <div className={`${cardClass} p-5`}>
                    <div className="flex items-center justify-between">
                      <span className={labelClass}>Placeholders</span>
                      <button
                        type="button"
                        onClick={() => setPlaceholders((p) => [...p, { key: `field_${p.length + 1}`, label: "New field", type: "text" }])}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber hover:underline cursor-pointer"
                      >
                        <LuPlus size={12} /> Add placeholder
                      </button>
                    </div>
                    <p className="mt-1 mb-4 text-xs text-slate-500 dark:text-slate-400">
                      Fields the admin fills for each client. Use them in page text as <code className="font-mono text-amber">{"{{key}}"}</code>.
                    </p>
                    <div className="grid gap-2">
                      {placeholders.map((p, i) => (
                        <div key={i} className="rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-3 grid gap-2 sm:grid-cols-[1fr_1fr_120px_auto]">
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">Key</span>
                            <input value={p.key} onChange={(e) => updatePlaceholder(i, { key: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })} className={`${smallInputClass} font-mono`} />
                          </label>
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">Label</span>
                            <input value={p.label} onChange={(e) => updatePlaceholder(i, { label: e.target.value })} className={smallInputClass} />
                          </label>
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">Type</span>
                            <select value={p.type} onChange={(e) => updatePlaceholder(i, { type: e.target.value as PlaceholderDef["type"] })} className={smallInputClass}>
                              {PLACEHOLDER_TYPES.map((t) => (
                                <option key={t} value={t}>
                                  {t}
                                </option>
                              ))}
                            </select>
                          </label>
                          <button type="button" onClick={() => setPlaceholders((prev) => prev.filter((_, idx) => idx !== i))} className={`${dangerBtnClass} self-end`} title="Remove">
                            <LuTrash2 size={13} />
                          </button>
                          <label className="grid gap-0.5 sm:col-span-2">
                            <span className="text-[10px] text-slate-400">Default value</span>
                            {p.type === "textarea" ? (
                              <textarea value={p.default ?? ""} onChange={(e) => updatePlaceholder(i, { default: e.target.value })} className={`${textareaClass} min-h-[48px]`} />
                            ) : (
                              <input value={p.default ?? ""} onChange={(e) => updatePlaceholder(i, { default: e.target.value })} className={smallInputClass} />
                            )}
                          </label>
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">Help text</span>
                            <input value={p.help ?? ""} onChange={(e) => updatePlaceholder(i, { help: e.target.value })} className={smallInputClass} />
                          </label>
                          <label className="flex items-center gap-2 self-end pb-1.5 text-xs text-slate-600 dark:text-slate-300">
                            <input type="checkbox" checked={Boolean(p.required)} onChange={(e) => updatePlaceholder(i, { required: e.target.checked })} className="accent-amber" />
                            Required
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} p-5`}>
                    <div className="flex items-center justify-between">
                      <span className={labelClass}>Derived amounts</span>
                      <button
                        type="button"
                        onClick={() => setDerived((d) => [...d, { key: `amount_${d.length + 1}`, source: "investment_total", pct: 50 }])}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber hover:underline cursor-pointer"
                      >
                        <LuPlus size={12} /> Add rule
                      </button>
                    </div>
                    <p className="mt-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
                      Percentage of a currency field, formatted as ₹. E.g. milestone_1_amount = investment_total × 50%.
                    </p>
                    <div className="grid gap-2">
                      {derived.map((d, i) => (
                        <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_90px_auto] items-end rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-3">
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">Token key</span>
                            <input value={d.key} onChange={(e) => setDerived((prev) => prev.map((x, idx) => (idx === i ? { ...x, key: e.target.value } : x)))} className={`${smallInputClass} font-mono`} />
                          </label>
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">Source (currency key)</span>
                            <select value={d.source} onChange={(e) => setDerived((prev) => prev.map((x, idx) => (idx === i ? { ...x, source: e.target.value } : x)))} className={smallInputClass}>
                              {placeholders.filter((p) => p.type === "currency").map((p) => (
                                <option key={p.key} value={p.key}>
                                  {p.key}
                                </option>
                              ))}
                            </select>
                          </label>
                          <label className="grid gap-0.5">
                            <span className="text-[10px] text-slate-400">%</span>
                            <input type="number" value={d.pct} onChange={(e) => setDerived((prev) => prev.map((x, idx) => (idx === i ? { ...x, pct: Number(e.target.value) } : x)))} className={smallInputClass} />
                          </label>
                          <button type="button" onClick={() => setDerived((prev) => prev.filter((_, idx) => idx !== i))} className={dangerBtnClass} title="Remove">
                            <LuTrash2 size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={`${cardClass} p-5`}>
                    <span className={mutedLabelClass}>Available tokens</span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {tokenHints.map((k) => (
                        <code key={k} className="rounded-md bg-black/5 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[11px] text-amber">
                          {`{{${k}}}`}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <SectionEditor pages={pages} onChange={setPages} structural />
              )}
            </div>

            <div className="lg:sticky lg:top-[72px] lg:h-[calc(100dvh-170px)]">
              <PdfPreview url={previewUrl} loading={previewing} stale={previewStale} onRefresh={preview} />
            </div>
          </div>
        ) : null}
      </main>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2.5 text-xs font-semibold text-white dark:text-slate-900 shadow-xl">{toast}</div>
      ) : null}
    </div>
  );
}
