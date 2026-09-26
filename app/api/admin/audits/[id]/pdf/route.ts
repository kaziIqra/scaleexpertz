import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isAuthorized, unauthorized } from "@/lib/adminAuth";
import { getTemplate } from "@/lib/audits/templates";
import { renderAuditPdf, auditFileName } from "@/lib/audits/pdf/render";
import type { AuditPage, ClientAudit, PlaceholderValues } from "@/lib/audits/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 26;

type Ctx = { params: Promise<{ id: string }> };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function loadAudit(id: string): Promise<ClientAudit | null> {
  const { data } = await supabase.from("client_audits").select("*").eq("id", id).maybeSingle();
  return (data as ClientAudit | null) ?? null;
}

/**
 * POST /api/admin/audits/:id/pdf
 *   { mode: "preview", draft?: { placeholder_values, sections } } → application/pdf (inline, not stored)
 *   { mode: "store" }                                             → renders from DB, uploads, marks final
 */
export async function POST(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid audit id" }, { status: 400 });

  let body: {
    mode?: "preview" | "store";
    draft?: { placeholder_values?: PlaceholderValues; sections?: AuditPage[] };
  } = {};
  try {
    body = await request.json();
  } catch {
    /* empty body is fine → preview from DB */
  }
  const mode = body.mode === "store" ? "store" : "preview";

  const audit = await loadAudit(id);
  if (!audit) return NextResponse.json({ error: "Audit not found" }, { status: 404 });

  const template = getTemplate(audit.template_slug);
  if (!template) return NextResponse.json({ error: `Template "${audit.template_slug}" no longer exists` }, { status: 500 });

  const placeholderValues = (mode === "preview" && body.draft?.placeholder_values) || audit.placeholder_values;
  const sections = (mode === "preview" && body.draft?.sections) || audit.sections;

  let pdf: { buffer: Buffer; docTitle: string };
  try {
    pdf = await renderAuditPdf({ template, placeholderValues, sections });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PDF render failed";
    console.error("PDF render error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (mode === "preview") {
    return new Response(new Uint8Array(pdf.buffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${auditFileName(audit.company)}"`,
        "Cache-Control": "no-store",
      },
    });
  }

  const version = (audit.version ?? 0) + 1;
  const path = `${id}/v${version}.pdf`;
  const { error: uploadError } = await supabase.storage.from("audits").upload(path, pdf.buffer, {
    contentType: "application/pdf",
    upsert: true,
  });
  if (uploadError) {
    console.error("PDF upload error:", uploadError);
    return NextResponse.json(
      { error: `Upload failed: ${uploadError.message}. Make sure the "audits" storage bucket exists (see supabase/schema.sql).` },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("client_audits")
    .update({ pdf_path: path, version, status: "final", updated_at: new Date().toISOString() })
    .eq("id", id)
    .select("*")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, audit: data, size: pdf.buffer.length });
}

/** GET /api/admin/audits/:id/pdf — short-lived signed download URL for the stored PDF. */
export async function GET(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid audit id" }, { status: 400 });

  const audit = await loadAudit(id);
  if (!audit) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  if (!audit.pdf_path) return NextResponse.json({ error: "No PDF generated yet" }, { status: 404 });

  const { data, error } = await supabase.storage
    .from("audits")
    .createSignedUrl(audit.pdf_path, 600, { download: auditFileName(audit.company, audit.version) });
  if (error || !data) return NextResponse.json({ error: error?.message ?? "Could not sign URL" }, { status: 500 });

  return NextResponse.json({ success: true, url: data.signedUrl, filename: auditFileName(audit.company, audit.version) });
}
