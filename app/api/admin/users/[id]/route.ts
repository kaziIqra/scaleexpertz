import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { getSession, unauthorized, forbidden, hashPassword, MIN_PASSWORD_LENGTH } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PUBLIC_COLUMNS = "id, username, display_name, role, is_active, created_by, created_at, last_login_at";

/**
 * PATCH /api/admin/users/:id — { display_name?, role?, is_active?, password? }
 * Owners can edit anyone. Any admin can change their own display_name / password.
 */
export async function PATCH(request: Request, { params }: Ctx) {
  const session = getSession(request);
  if (!session) return unauthorized();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid user id" }, { status: 400 });

  const isSelf = session.id === id;
  if (!isSelf && session.role !== "owner") return forbidden();

  let body: { display_name?: string; role?: string; is_active?: boolean; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {};
  if (typeof body.display_name === "string" && body.display_name.trim()) patch.display_name = body.display_name.trim();
  if (typeof body.password === "string" && body.password) {
    if (body.password.length < MIN_PASSWORD_LENGTH) {
      return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, { status: 400 });
    }
    patch.password_hash = await hashPassword(body.password);
  }
  if (session.role === "owner") {
    if (body.role === "owner" || body.role === "admin") patch.role = body.role;
    if (typeof body.is_active === "boolean") patch.is_active = body.is_active;
    if (isSelf && (patch.is_active === false || patch.role === "admin")) {
      return NextResponse.json({ error: "You cannot deactivate or demote yourself." }, { status: 400 });
    }
  }
  if (!Object.keys(patch).length) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

  const { data, error } = await supabase.from("admin_users").update(patch).eq("id", id).select(PUBLIC_COLUMNS).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ success: true, user: data });
}

/** DELETE /api/admin/users/:id — owners only, not yourself. */
export async function DELETE(request: Request, { params }: Ctx) {
  const session = getSession(request);
  if (!session) return unauthorized();
  if (session.role !== "owner") return forbidden();
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  const { id } = await params;
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "Invalid user id" }, { status: 400 });
  if (session.id === id) return NextResponse.json({ error: "You cannot delete yourself." }, { status: 400 });

  const { error, count } = await supabase.from("admin_users").delete({ count: "exact" }).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!count) return NextResponse.json({ error: "User not found" }, { status: 404 });
  return NextResponse.json({ success: true, id });
}
