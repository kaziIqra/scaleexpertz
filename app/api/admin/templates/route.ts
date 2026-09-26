import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isAuthorized, unauthorized } from "@/lib/adminAuth";
import { listTemplates, loadTemplate, uniqueSlug, rowToTemplate, toDoc, type TemplateRow } from "@/lib/audits/templateStore";
import { BASE_PLACEHOLDERS, blankPage, blankBlock } from "@/lib/audits/blank";
import type { AuditPage, ClientAudit, DerivedRule, PlaceholderDef } from "@/lib/audits/types";

export const dynamic = "force-dynamic";

/** GET /api/admin/templates — code + custom templates (metadata only). */
export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  const { summaries, error } = await listTemplates();
  return NextResponse.json({ success: true, templates: summaries, warning: error });
}

/**
 * POST /api/admin/templates — create a custom template.
 *   { name, description?, base?: "blank" | <slug>, from_audit?: <audit id> }
 * `base` clones an existing template's placeholders/derived/pages.
 * `from_audit` uses that audit's edited pages + its template's placeholders.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  let body: { name?: string; description?: string; base?: string; from_audit?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  if (!name) return NextResponse.json({ error: "Template name is required" }, { status: 400 });

  let placeholders: PlaceholderDef[] = BASE_PLACEHOLDERS;
  let derived: DerivedRule[] = [
    { key: "milestone_1_amount", source: "investment_total", pct: 50 },
    { key: "milestone_2_amount", source: "investment_total", pct: 30 },
    { key: "milestone_3_amount", source: "investment_total", pct: 20 },
  ];
  let pages: AuditPage[] = [{ id: "cover", label: "Cover", blocks: [blankBlock("cover")] }, blankPage(1)];
  let docTitle = "{{industry}} Growth Blueprint";
  let description = (body.description ?? "").trim();

  if (body.from_audit) {
    const { data } = await supabase.from("client_audits").select("*").eq("id", body.from_audit).maybeSingle();
    const audit = data as ClientAudit | null;
    if (!audit) return NextResponse.json({ error: "Source audit not found" }, { status: 404 });
    const src = await loadTemplate(audit.template_slug);
    if (src) {
      placeholders = src.placeholders;
      derived = src.derived ?? [];
      docTitle = src.docTitle;
      description = description || `Based on the ${audit.company} audit (${src.name}).`;
    }
    pages = audit.sections;
  } else if (body.base && body.base !== "blank") {
    const src = await loadTemplate(body.base);
    if (!src) return NextResponse.json({ error: "Base template not found" }, { status: 404 });
    placeholders = src.placeholders;
    derived = src.derived ?? [];
    pages = src.pages;
    docTitle = src.docTitle;
    description = description || src.description;
  }

  const slug = await uniqueSlug(name);
  const { data, error } = await supabase
    .from("audit_templates")
    .insert([{ slug, name, description, doc_title: docTitle, placeholders, derived, pages }])
    .select("*")
    .single();

  if (error) {
    console.error("Create template error:", error);
    return NextResponse.json(
      { error: `${error.message}. Make sure the audit_templates table exists (see supabase/schema.sql).` },
      { status: 500 }
    );
  }
  const row = data as TemplateRow;
  return NextResponse.json({ success: true, template: toDoc(rowToTemplate(row), row.updated_at) }, { status: 201 });
}
