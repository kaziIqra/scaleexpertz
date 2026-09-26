import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured, friendlyDbError } from "@/lib/supabase";
import { isAuthorized, unauthorized, getSession } from "@/lib/adminAuth";
import { loadTemplate } from "@/lib/audits/templateStore";
import type { PlaceholderValues } from "@/lib/audits/types";

export const dynamic = "force-dynamic";

const LIST_COLUMNS =
  "id, template_slug, client_name, company, industry, status, pdf_path, version, created_at, updated_at";

function notConfigured() {
  return NextResponse.json(
    { error: "Supabase is not configured. Set SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL." },
    { status: 500 }
  );
}

/** GET /api/admin/audits — list audits, newest first. */
export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return notConfigured();

  const { data, error } = await supabase
    .from("client_audits")
    .select(LIST_COLUMNS)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("List audits error:", error);
    return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });
  }
  return NextResponse.json({ success: true, audits: data ?? [] });
}

/** POST /api/admin/audits — create an audit from a template. */
export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  if (!isSupabaseConfigured()) return notConfigured();

  let body: {
    template_slug?: string;
    client_name?: string;
    company?: string;
    industry?: string;
    placeholder_values?: PlaceholderValues;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const template = body.template_slug ? await loadTemplate(body.template_slug) : null;
  if (!template) {
    return NextResponse.json({ error: "Unknown template" }, { status: 400 });
  }

  const values: PlaceholderValues = { ...(body.placeholder_values ?? {}) };
  const clientName = (body.client_name ?? values.client_name ?? "").trim();
  const company = (body.company ?? values.company ?? "").trim();
  if (!clientName || !company) {
    return NextResponse.json({ error: "client_name and company are required" }, { status: 400 });
  }
  values.client_name = clientName;
  values.company = company;

  const missing = template.placeholders
    .filter((p) => p.required && !(values[p.key] ?? p.default ?? "").toString().trim())
    .map((p) => p.label);
  if (missing.length) {
    return NextResponse.json({ error: `Missing required fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("client_audits")
    .insert([
      {
        template_slug: template.slug,
        template_version: template.version,
        client_name: clientName,
        company,
        industry: (body.industry ?? values.industry ?? "").trim() || null,
        placeholder_values: values,
        sections: template.pages, // snapshot; {{tokens}} stay intact until render
        status: "draft",
        created_by: getSession(request)?.username ?? null,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("Create audit error:", error);
    return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });
  }
  return NextResponse.json({ success: true, audit: data }, { status: 201 });
}
