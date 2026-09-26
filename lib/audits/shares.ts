import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import type { ClientAudit } from "./types";

/**
 * Client-facing share links. One active link per audit; older ones are revoked
 * when a new one is created. The PDF is proxied through /api/share/:token/pdf
 * so the storage bucket stays private.
 */

export interface ShareRow {
  id: string;
  audit_id: string;
  token: string;
  expires_at: string | null;
  passcode_hash: string | null;
  revoked: boolean;
  view_count: number;
  last_viewed_at: string | null;
  created_by: string | null;
  created_at: string;
}

export const SHARE_COLUMNS =
  "id, audit_id, token, expires_at, passcode_hash, revoked, view_count, last_viewed_at, created_by, created_at";

export function newShareToken(): string {
  return randomBytes(24).toString("base64url"); // 32 chars, URL-safe
}

export function isExpired(share: Pick<ShareRow, "expires_at">): boolean {
  return Boolean(share.expires_at && new Date(share.expires_at).getTime() < Date.now());
}

export type ShareState = "active" | "revoked" | "expired";

export function shareState(share: ShareRow): ShareState {
  if (share.revoked) return "revoked";
  if (isExpired(share)) return "expired";
  return "active";
}

/** Public-safe projection (no hash). */
export function publicShare(share: ShareRow) {
  return {
    token: share.token,
    expires_at: share.expires_at,
    requires_passcode: Boolean(share.passcode_hash),
    revoked: share.revoked,
    view_count: share.view_count,
    last_viewed_at: share.last_viewed_at,
    created_at: share.created_at,
    state: shareState(share),
  };
}

export async function hashPasscode(passcode: string): Promise<string> {
  return bcrypt.hash(passcode, 10);
}

export async function checkPasscode(passcode: string, hash: string): Promise<boolean> {
  return bcrypt.compare(passcode, hash);
}

/** Load a share + its audit by token. */
export async function loadShare(token: string): Promise<{ share: ShareRow; audit: ClientAudit } | null> {
  if (!/^[A-Za-z0-9_-]{20,64}$/.test(token)) return null;
  const { data: share } = await supabase.from("audit_shares").select(SHARE_COLUMNS).eq("token", token).maybeSingle();
  if (!share) return null;
  const { data: audit } = await supabase.from("client_audits").select("*").eq("id", (share as ShareRow).audit_id).maybeSingle();
  if (!audit) return null;
  return { share: share as ShareRow, audit: audit as ClientAudit };
}

// ------------------------------------------------ passcode unlock cookie

function unlockSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "share";
}

export function unlockCookieName(token: string): string {
  return `sx_share_${token.slice(0, 12)}`;
}

/** Value proves the visitor entered the passcode for this share (bound to the hash). */
export function unlockCookieValue(share: ShareRow): string {
  return createHmac("sha256", unlockSecret()).update(`${share.token}:${share.passcode_hash ?? ""}`).digest("base64url");
}

export function isUnlocked(request: Request, share: ShareRow): boolean {
  if (!share.passcode_hash) return true;
  const cookies = request.headers.get("cookie") || "";
  const name = unlockCookieName(share.token);
  const match = cookies.split(/;\s*/).find((c) => c.startsWith(`${name}=`));
  if (!match) return false;
  const value = match.slice(name.length + 1);
  const expected = unlockCookieValue(share);
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
