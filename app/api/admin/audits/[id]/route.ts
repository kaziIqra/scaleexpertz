import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { isAuthorized, unauthorized } from "@/lib/adminAuth";
import type { AuditPage, AuditStatus, PlaceholderValues } from "@/lib/audits/types";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function badId() {
  return NextResponse.json({ error: "Invalid audit id" }, { status: 400 });
}

/** GET /api/admin/audits/:id — full audit (values + sections). */
export async function GET(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return badId();

  const { data, error } = await supabase.from("client_audits").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  return NextResponse.json({ success: true, audit: data });
}

/** PATCH /api/admin/audits/:id — partial update of values, sections, status, client fields. */
export async function PATCH(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return badId();

  let body: {
    client_name?: string;
    company?: string;
    industry?: string | null;
    placeholder_values?: PlaceholderValues;
    sections?: AuditPage[];
    status?: AuditStatus;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.client_name === "string" && body.client_name.trim()) patch.client_name = body.client_name.trim();
  if (typeof body.company === "string" && body.company.trim()) patch.company = body.company.trim();
  if (body.industry !== undefined) patch.industry = body.industry ? String(body.industry).trim() : null;
  if (body.placeholder_values && typeof body.placeholder_values === "object") {
    patch.placeholder_values = body.placeholder_values;
    // keep list columns in sync with the values the PDF actually uses
    if (body.placeholder_values.company?.trim()) patch.company = body.placeholder_values.company.trim();
    if (body.placeholder_values.client_name?.trim()) patch.client_name = body.placeholder_values.client_name.trim();
    if (body.placeholder_values.industry !== undefined) patch.industry = body.placeholder_values.industry.trim() || null;
  }
  if (Array.isArray(body.sections)) patch.sections = body.sections;
  if (body.status === "draft" || body.status === "final") patch.status = body.status;

  const { data, error } = await supabase
    .from("client_audits")
    .update(patch)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  return NextResponse.json({ success: true, audit: data });
}

/** DELETE /api/admin/audits/:id — remove audit row and its stored PDF. */
export async function DELETE(request: Request, { params }: Ctx) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return badId();

  const { data: existing } = await supabase.from("client_audits").select("id, pdf_path").eq("id", id).maybeSingle();
  if (!existing) return NextResponse.json({ error: "Audit not found" }, { status: 404 });

  // Remove every stored version under audits/<id>/
  const { data: files } = await supabase.storage.from("audits").list(id);
  if (files?.length) {
    await supabase.storage.from("audits").remove(files.map((f) => `${id}/${f.name}`));
  }

  const { error } = await supabase.from("client_audits").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, id });
}
