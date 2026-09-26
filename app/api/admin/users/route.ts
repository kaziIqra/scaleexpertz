import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import {
  getSession,
  unauthorized,
  forbidden,
  hashPassword,
  USERNAME_RE,
  MIN_PASSWORD_LENGTH,
  type AdminUserRow,
} from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

const PUBLIC_COLUMNS = "id, username, display_name, role, is_active, created_by, created_at, last_login_at";

function notConfigured() {
  return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
}

/** GET /api/admin/users — list admin users (no hashes). Any signed-in admin. */
export async function GET(request: Request) {
  const session = getSession(request);
  if (!session) return unauthorized();
  if (!isSupabaseConfigured()) return notConfigured();

  const { data, error } = await supabase.from("admin_users").select(PUBLIC_COLUMNS).order("created_at", { ascending: true });
  if (error) {
    return NextResponse.json(
      { error: `${error.message}. Run the admin_users SQL from supabase/schema.sql.` },
      { status: 500 }
    );
  }

  const envOwner = process.env.ADMIN_USERNAME
    ? {
        id: "env-owner",
        username: process.env.ADMIN_USERNAME.trim().toLowerCase(),
        display_name: process.env.ADMIN_USERNAME.trim(),
        role: "owner",
        is_active: true,
        created_by: null,
        created_at: null,
        last_login_at: null,
        builtin: true,
      }
    : null;

  return NextResponse.json({ success: true, users: [...(envOwner ? [envOwner] : []), ...(data ?? [])], me: session });
}

/** POST /api/admin/users — create a user. Owners only. */
export async function POST(request: Request) {
  const session = getSession(request);
  if (!session) return unauthorized();
  if (session.role !== "owner") return forbidden();
  if (!isSupabaseConfigured()) return notConfigured();

  let body: { username?: string; display_name?: string; password?: string; role?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const username = (body.username ?? "").trim().toLowerCase();
  const displayName = (body.display_name ?? "").trim() || username;
  const password = body.password ?? "";
  const role = body.role === "owner" ? "owner" : "admin";

  if (!USERNAME_RE.test(username)) {
    return NextResponse.json({ error: "Username: 2–32 chars, lowercase letters, numbers, dots, dashes or underscores." }, { status: 400 });
  }
  if (username === (process.env.ADMIN_USERNAME ?? "").trim().toLowerCase()) {
    return NextResponse.json({ error: "That username is reserved for the built-in owner." }, { status: 400 });
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return NextResponse.json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.` }, { status: 400 });
  }

  const password_hash = await hashPassword(password);
  const { data, error } = await supabase
    .from("admin_users")
    .insert([{ username, display_name: displayName, password_hash, role, created_by: session.username }])
    .select(PUBLIC_COLUMNS)
    .single();

  if (error) {
    const msg = error.code === "23505" ? "Username already exists." : error.message;
    return NextResponse.json({ error: msg }, { status: error.code === "23505" ? 409 : 500 });
  }
  return NextResponse.json({ success: true, user: data as Partial<AdminUserRow> }, { status: 201 });
}
