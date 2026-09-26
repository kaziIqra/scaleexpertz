"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { LuArrowLeft, LuRefreshCw, LuSave, LuDownload, LuEye, LuSparkles, LuLayoutTemplate } from "react-icons/lu";
import AdminHeader, { adminBtnClass, adminAccentBtnClass } from "@/components/admin/AdminHeader";
import { useAdminAuth } from "@/components/admin/AdminAuthProvider";
import PlaceholderForm from "@/components/admin/audits/PlaceholderForm";
import SectionEditor from "@/components/admin/audits/SectionEditor";
import PdfPreview from "@/components/admin/audits/PdfPreview";
import { cardClass, chipClass, labelClass } from "@/components/admin/ui";
import type { AuditPage, AuditTemplateSummary, ClientAudit, PlaceholderValues } from "@/lib/audits/types";

export default function AuditEditorPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { authFetch } = useAdminAuth();

  const [audit, setAudit] = useState<ClientAudit | null>(null);
  const [template, setTemplate] = useState<AuditTemplateSummary | null>(null);
  const [values, setValues] = useState<PlaceholderValues>({});
  const [sections, setSections] = useState<AuditPage[]>([]);
  const [tab, setTab] = useState<"details" | "content">("details");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Snapshots of what was last saved / last previewed, so "dirty" and "stale"
  // are derived during render instead of tracked with effects.
  const [savedSnapshot, setSavedSnapshot] = useState<string>("");
  const [previewSnapshot, setPreviewSnapshot] = useState<string>("");
  const current = useMemo(() => JSON.stringify({ values, sections }), [values, sections]);
  const dirty = current !== savedSnapshot;
  const previewStale = Boolean(previewUrl) && current !== previewSnapshot;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  // ---- load
  const load = useCallback(async () => {
    setError(null);
    try {
      const [a, t] = await Promise.all([authFetch(`/api/admin/audits/${id}`), authFetch("/api/admin/templates")]);
      if (a.status === 401) return;
      const aj = await a.json();
      const tj = await t.json();
      if (!a.ok || !aj.audit) {
        setError(aj.error || "Audit not found");
        return;
      }
      const loaded: ClientAudit = aj.audit;
      setAudit(loaded);
      setValues(loaded.placeholder_values ?? {});
      setSections(loaded.sections ?? []);
      setSavedSnapshot(JSON.stringify({ values: loaded.placeholder_values ?? {}, sections: loaded.sections ?? [] }));
      if (tj.success) {
        setTemplate((tj.templates as AuditTemplateSummary[]).find((x) => x.slug === loaded.template_slug) ?? null);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load audit.");
    } finally {
      setLoading(false);
    }
  }, [authFetch, id]);

  useEffect(() => {
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
  }, [load]);

  // revoke blob URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // ---- actions
  const save = useCallback(
    async (status?: "draft" | "final") => {
      setSaving(true);
      setError(null);
      try {
        const res = await authFetch(`/api/admin/audits/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ placeholder_values: values, sections, ...(status ? { status } : {}) }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Save failed");
          return false;
        }
        setAudit(data.audit);
        setSavedSnapshot(current);
        return true;
      } catch {
        setError("Network error while saving.");
        return false;
      } finally {
        setSaving(false);
      }
    },
    [authFetch, id, values, sections, current]
  );

  const preview = useCallback(async () => {
    setPreviewing(true);
    setError(null);
    try {
      const res = await authFetch(`/api/admin/audits/${id}/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "preview", draft: { placeholder_values: values, sections } }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || `Preview failed (${res.status})`);
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
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
  }, [authFetch, id, values, sections, current]);

  const generate = async () => {
    setGenerating(true);
    setError(null);
    try {
      const ok = await save();
      if (!ok) return;
      const res = await authFetch(`/api/admin/audits/${id}/pdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "store" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "PDF generation failed");
        return;
      }
      setAudit(data.audit);
      showToast(`PDF v${data.audit.version} generated (${Math.round(data.size / 1024)} KB)`);
      await download();
    } finally {
      setGenerating(false);
    }
  };

  const saveAsTemplate = async () => {
    const name = prompt("Template name:", `${values.industry || audit?.industry || "New"} Growth Audit`);
    if (!name?.trim()) return;
    if (dirty) {
      const ok = await save();
      if (!ok) return;
    }
    const res = await authFetch("/api/admin/templates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), from_audit: id }),
    });
    const data = await res.json();
    if (res.ok && data.template?.slug) {
      showToast("Template created");
      router.push(`/admin/templates/${data.template.slug}`);
    } else {
      setError(data.error || "Could not create template.");
    }
  };

  const download = async () => {
    const res = await authFetch(`/api/admin/audits/${id}/pdf`);
    const data = await res.json();
    if (res.ok && data.url) window.open(data.url, "_blank", "noopener");
    else setError(data.error || "No stored PDF yet.");
  };

  // warn on unload with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  return (
    <div className="min-h-dvh bg-[#f8f9fc] dark:bg-[#09090b] text-slate-800 dark:text-slate-200 font-sans transition-colors duration-300">
      <AdminHeader
        actions={
          <>
            <button onClick={preview} disabled={previewing || loading} title="Render preview" className={adminBtnClass}>
              {previewing ? <LuRefreshCw className="animate-spin text-amber" size={13} /> : <LuEye size={13} />}
              <span className="hidden sm:inline">Preview</span>
            </button>
            <button onClick={() => save()} disabled={saving || loading || !dirty} title="Save draft" className={adminBtnClass}>
              {saving ? <LuRefreshCw className="animate-spin text-amber" size={13} /> : <LuSave size={13} />}
              <span className="hidden sm:inline">{dirty ? "Save draft" : "Saved"}</span>
            </button>
            <button onClick={generate} disabled={generating || loading} title="Save, generate and download PDF" className={adminAccentBtnClass}>
              {generating ? <LuRefreshCw className="animate-spin" size={13} /> : <LuSparkles size={13} />}
              <span>Generate PDF</span>
            </button>
          </>
        }
      />

      <main className="mx-auto max-w-[1400px] px-4 sm:px-6 py-5 sm:py-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/admin/audits" className={`${adminBtnClass} shrink-0`}>
              <LuArrowLeft size={13} />
              <span>All audits</span>
            </Link>
            {audit ? (
              <div className="min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <h1 className="font-display text-lg font-bold text-slate-900 dark:text-white truncate">{values.company || audit.company}</h1>
                  <span className={chipClass(audit.status === "final" ? "green" : "grey")}>
                    {audit.status === "final" ? `Final · v${audit.version}` : "Draft"}
                  </span>
                  {dirty ? <span className={chipClass("gold")}>Unsaved changes</span> : null}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {template?.name ?? audit.template_slug} · created {new Date(audit.created_at).toLocaleDateString("en-IN")}
                </p>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {audit ? (
              <button onClick={saveAsTemplate} title="Turn this audit's pages into a reusable template" className={adminBtnClass}>
                <LuLayoutTemplate size={13} />
                <span>Save as template</span>
              </button>
            ) : null}
            {audit?.pdf_path ? (
              <button onClick={download} className={adminBtnClass}>
                <LuDownload size={13} />
                <span>Download v{audit.version}</span>
              </button>
            ) : null}
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs sm:text-sm text-rose-500 dark:text-rose-400 font-medium">{error}</div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400 gap-3">
            <LuRefreshCw className="animate-spin text-accent" size={28} />
            <p className="text-xs font-mono tracking-wider">Loading audit…</p>
          </div>
        ) : audit ? (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            {/* Left: editor */}
            <div className="space-y-4 lg:max-h-[calc(100dvh-170px)] lg:overflow-y-auto lg:pr-1">
              <div className={`${cardClass} p-1 flex gap-1`}>
                {(["details", "content"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      tab === t ? "bg-accent/15 text-amber" : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {t === "details" ? "Client details & placeholders" : `Page content (${sections.length} pages)`}
                  </button>
                ))}
              </div>

              {tab === "details" ? (
                <div className={`${cardClass} p-5`}>
                  <span className={labelClass}>Placeholders</span>
                  <p className="mt-1 mb-4 text-xs text-slate-500 dark:text-slate-400">
                    These values replace <code className="font-mono text-amber">{"{{tokens}}"}</code> everywhere in the document. Amounts split automatically into 50 / 30 / 20 milestones.
                  </p>
                  {template ? (
                    <PlaceholderForm placeholders={template.placeholders} values={values} onChange={setValues} />
                  ) : (
                    <p className="text-xs text-rose-500">Template &quot;{audit.template_slug}&quot; is no longer available in this build.</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                    Edit any page. Text may keep <code className="font-mono text-amber">{"{{tokens}}"}</code>; they are filled from the placeholders at render time.
                  </p>
                  <SectionEditor pages={sections} onChange={setSections} />
                </div>
              )}
            </div>

            {/* Right: preview */}
            <div className="lg:sticky lg:top-[72px] lg:h-[calc(100dvh-170px)]">
              <PdfPreview url={previewUrl} loading={previewing} stale={previewStale} onRefresh={preview} />
            </div>
          </div>
        ) : null}
      </main>

      {toast ? (
        <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 dark:bg-white px-4 py-2.5 text-xs font-semibold text-white dark:text-slate-900 shadow-xl">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
