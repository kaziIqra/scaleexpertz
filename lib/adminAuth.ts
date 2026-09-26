import { createHmac, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

/**
 * Admin sessions.
 *
 * Two kinds of admin can log in:
 *  1. The env "owner" (ADMIN_USERNAME / ADMIN_PASSWORD) — always works, no DB needed.
 *  2. Rows in admin_users (bcrypt password_hash), managed from /admin/users by owners.
 *
 * Successful login returns a signed token: base64url(payload).base64url(hmac).
 * Signing secret = ADMIN_SESSION_SECRET, falling back to ADMIN_PASSWORD.
 */

export type AdminRole = "owner" | "admin";

export interface AdminSession {
  id: string; // "env-owner" or admin_users.id
  username: string;
  name: string;
  role: AdminRole;
  exp: number; // unix seconds
}

export interface AdminUserRow {
  id: string;
  username: string;
  display_name: string;
  password_hash: string;
  role: AdminRole;
  is_active: boolean;
  created_by: string | null;
  created_at: string;
  last_login_at: string | null;
}

export const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60;
export const ENV_OWNER_ID = "env-owner";

function secret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

const b64u = (buf: Buffer | string) => Buffer.from(buf).toString("base64url");

function sign(payload: string): string {
  const s = secret();
  if (!s) throw new Error("ADMIN_SESSION_SECRET / ADMIN_PASSWORD not configured");
  return createHmac("sha256", s).update(payload).digest("base64url");
}

export function issueToken(session: Omit<AdminSession, "exp">): { token: string; session: AdminSession } {
  const full: AdminSession = { ...session, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const payload = b64u(JSON.stringify(full));
  return { token: `${payload}.${sign(payload)}`, session: full };
}

export function verifyToken(token: string): AdminSession | null {
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const payload = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return null;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8")) as AdminSession;
    if (!session?.id || !session.username || (session.role !== "owner" && session.role !== "admin")) return null;
    if (typeof session.exp !== "number" || session.exp < Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

/** Session from the request's Bearer token, or null. */
export function getSession(request: Request): AdminSession | null {
  const header = request.headers.get("authorization") || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  return verifyToken(token);
}

export function isAuthorized(request: Request): boolean {
  return getSession(request) !== null;
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized access" }, { status: 401 });
}

export function forbidden(message = "Only owners can do this") {
  return Response.json({ error: message }, { status: 403 });
}

// ------------------------------------------------------------------ login

export interface LoginResult {
  token: string;
  user: { id: string; username: string; name: string; role: AdminRole };
}

export async function login(usernameInput: string, password: string): Promise<LoginResult | null> {
  const username = (usernameInput || "").trim().toLowerCase();
  if (!username || !password) return null;

  // 1. Env owner
  const envUser = (process.env.ADMIN_USERNAME || "").trim().toLowerCase();
  const envPass = process.env.ADMIN_PASSWORD || "";
  if (envUser && envPass && username === envUser) {
    const a = Buffer.from(password);
    const b = Buffer.from(envPass);
    if (a.length === b.length && timingSafeEqual(a, b)) {
      const { token } = issueToken({ id: ENV_OWNER_ID, username, name: process.env.ADMIN_USERNAME!.trim(), role: "owner" });
      return { token, user: { id: ENV_OWNER_ID, username, name: process.env.ADMIN_USERNAME!.trim(), role: "owner" } };
    }
    return null; // wrong password for the env owner; do not fall through
  }

  // 2. DB users
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase.from("admin_users").select("*").eq("username", username).maybeSingle();
  const row = data as AdminUserRow | null;
  if (!row || !row.is_active) return null;
  const ok = await bcrypt.compare(password, row.password_hash);
  if (!ok) return null;

  // Query builders only run when awaited.
  await supabase.from("admin_users").update({ last_login_at: new Date().toISOString() }).eq("id", row.id);

  const { token } = issueToken({ id: row.id, username: row.username, name: row.display_name, role: row.role });
  return { token, user: { id: row.id, username: row.username, name: row.display_name, role: row.role } };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 11);
}

export const USERNAME_RE = /^[a-z0-9][a-z0-9._-]{1,31}$/;
export const MIN_PASSWORD_LENGTH = 8;
