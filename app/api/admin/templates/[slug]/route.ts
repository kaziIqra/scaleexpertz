import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isAuthorized, unauthorized } from "@/lib/adminAuth";
import { loadTemplate, isCodeTemplate, rowToTemplate, toDoc, type TemplateRow } from "@/lib/audits/templateStore";
import type { AuditPage, DerivedRule, PlaceholderDef } from "@/lib/audits/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

/** GET /api/admin/templates/:slug — full template incl. pages (code or custom). */
export async function GET(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  const { slug } = await params;
  const t = await loadTemplate(slug);
  if (!t) return NextResponse.json({ error: "Template not found" }, { status: 404 });
  return NextResponse.json({ success: true, template: toDoc(t) });
}

/** PATCH /api/admin/templates/:slug — update a custom template. */
export async function PATCH(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { slug } = await params;
  if (isCodeTemplate(slug)) {
    return NextResponse.json({ error: "Built-in templates are read-only. Clone it to make changes." }, { status: 400 });
  }

  let body: {
    name?: string;
    description?: string;
    docTitle?: string;
    placeholders?: PlaceholderDef[];
    derived?: DerivedRule[];
    pages?: AuditPage[];
    is_active?: boolean;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.name === "string" && body.name.trim()) patch.name = body.name.trim();
  if (typeof body.description === "string") patch.description = body.description.trim();
  if (typeof body.docTitle === "string" && body.docTitle.trim()) patch.doc_title = body.docTitle.trim();
  if (Array.isArray(body.placeholders)) {
    const keys = new Set<string>();
    for (const p of body.placeholders) {
      if (!p.key || !/^[a-z][a-z0-9_]*$/.test(p.key)) {
        return NextResponse.json({ error: `Invalid placeholder key "${p.key}". Use lowercase letters, numbers, underscores.` }, { status: 400 });
      }
      if (keys.has(p.key)) return NextResponse.json({ error: `Duplicate placeholder key "${p.key}"` }, { status: 400 });
      keys.add(p.key);
    }
    patch.placeholders = body.placeholders;
  }
  if (Array.isArray(body.derived)) patch.derived = body.derived;
  if (Array.isArray(body.pages)) patch.pages = body.pages;
  if (typeof body.is_active === "boolean") patch.is_active = body.is_active;

  const { data, error } = await supabase.from("audit_templates").update(patch).eq("slug", slug).select("*").maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Template not found" }, { status: 404 });
  const row = data as TemplateRow;
  return NextResponse.json({ success: true, template: toDoc(rowToTemplate(row), row.updated_at) });
}

/** DELETE /api/admin/templates/:slug — delete a custom template not used by any audit. */
export async function DELETE(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { slug } = await params;
  if (isCodeTemplate(slug)) return NextResponse.json({ error: "Built-in templates cannot be deleted" }, { status: 400 });

  const { count } = await supabase.from("client_audits").select("id", { count: "exact", head: true }).eq("template_slug", slug);
  if (count && count > 0) {
    return NextResponse.json(
      { error: `${count} audit${count === 1 ? "" : "s"} still use this template. Delete those audits first, or keep the template.` },
      { status: 409 }
    );
  }

  const { error } = await supabase.from("audit_templates").delete().eq("slug", slug);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, slug });
}
