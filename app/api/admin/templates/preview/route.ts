import { NextResponse } from "next/server";
import { isAuthorized, unauthorized } from "@/lib/adminAuth";
import { renderAuditPdf } from "@/lib/audits/pdf/render";
import type { AuditPage, DerivedRule, PlaceholderDef, PlaceholderValues } from "@/lib/audits/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 26;

/**
 * POST /api/admin/templates/preview — render an (unsaved) template with sample
 * values so admins can see it while editing. Body: { docTitle, placeholders,
 * derived, pages, values? }. Returns application/pdf.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  let body: {
    docTitle?: string;
    placeholders?: PlaceholderDef[];
    derived?: DerivedRule[];
    pages?: AuditPage[];
    values?: PlaceholderValues;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!Array.isArray(body.pages) || !body.pages.length) {
    return NextResponse.json({ error: "Template has no pages" }, { status: 400 });
  }

  const placeholders = Array.isArray(body.placeholders) ? body.placeholders : [];
  // Sample values: explicit → default → "[label]"
  const values: PlaceholderValues = { ...(body.values ?? {}) };
  for (const p of placeholders) {
    if (!values[p.key]?.trim()) values[p.key] = p.default ?? `[${p.label}]`;
  }
  if (!values.company) values.company = "Sample Client Pvt Ltd";
  if (!values.client_name) values.client_name = "Sample Founder";
  if (!values.industry) values.industry = "Sample Industry";

  try {
    const { buffer } = await renderAuditPdf({
      template: { placeholders, derived: body.derived ?? [], docTitle: body.docTitle || "{{industry}} Growth Blueprint" },
      placeholderValues: values,
      sections: body.pages,
    });
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: { "Content-Type": "application/pdf", "Content-Disposition": "inline; filename=template-preview.pdf", "Cache-Control": "no-store" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "PDF render failed";
    console.error("Template preview error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
