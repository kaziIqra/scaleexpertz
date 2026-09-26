import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured, friendlyDbError } from "@/lib/supabase";
import { getSession, unauthorized } from "@/lib/adminAuth";
import { SHARE_COLUMNS, hashPasscode, newShareToken, publicShare, type ShareRow } from "@/lib/audits/shares";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function shareUrl(request: Request, token: string): string {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || new URL(request.url).origin;
  return `${origin.replace(/\/$/, "")}/share/${token}`;
}

/** GET /api/admin/audits/:id/share — the audit's share links, newest first. */
export async function GET(request: Request, { params }: Ctx) {
  if (!getSession(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid audit id" }, { status: 400 });

  const { data, error } = await supabase
    .from("audit_shares")
    .select(SHARE_COLUMNS)
    .eq("audit_id", id)
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });

  const shares = ((data ?? []) as ShareRow[]).map((s) => ({ ...publicShare(s), url: shareUrl(request, s.token) }));
  return NextResponse.json({ success: true, shares, active: shares.find((s) => s.state === "active") ?? null });
}

/**
 * POST /api/admin/audits/:id/share — create a new link (revokes older active ones).
 *   { expires_days?: number | null, passcode?: string }
 */
export async function POST(request: Request, { params }: Ctx) {
  const session = getSession(request);
  if (!session) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid audit id" }, { status: 400 });

  let body: { expires_days?: number | null; passcode?: string } = {};
  try {
    body = await request.json();
  } catch {}

  const { data: audit } = await supabase.from("client_audits").select("id, pdf_path").eq("id", id).maybeSingle();
  if (!audit) return NextResponse.json({ error: "Audit not found" }, { status: 404 });
  if (!audit.pdf_path) return NextResponse.json({ error: "Generate the PDF before sharing." }, { status: 400 });

  const days = body.expires_days == null ? null : Number(body.expires_days);
  const expires_at = days && days > 0 ? new Date(Date.now() + days * 86400_000).toISOString() : null;
  const passcode = (body.passcode ?? "").trim();
  if (passcode && passcode.length < 4) return NextResponse.json({ error: "Passcode must be at least 4 characters." }, { status: 400 });
  const passcode_hash = passcode ? await hashPasscode(passcode) : null;

  await supabase.from("audit_shares").update({ revoked: true }).eq("audit_id", id).eq("revoked", false);

  const { data, error } = await supabase
    .from("audit_shares")
    .insert([{ audit_id: id, token: newShareToken(), expires_at, passcode_hash, created_by: session.username }])
    .select(SHARE_COLUMNS)
    .single();
  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });

  const share = data as ShareRow;
  return NextResponse.json({ success: true, share: { ...publicShare(share), url: shareUrl(request, share.token) } }, { status: 201 });
}

/** DELETE /api/admin/audits/:id/share — revoke all active links for this audit. */
export async function DELETE(request: Request, { params }: Ctx) {
  if (!getSession(request)) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid audit id" }, { status: 400 });

  const { error } = await supabase.from("audit_shares").update({ revoked: true }).eq("audit_id", id).eq("revoked", false);
  if (error) return NextResponse.json({ error: friendlyDbError(error) }, { status: 500 });
  return NextResponse.json({ success: true });
}
