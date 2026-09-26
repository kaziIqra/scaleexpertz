import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import { loadShare, shareState, checkPasscode, unlockCookieName, unlockCookieValue } from "@/lib/audits/shares";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

/** POST /api/share/:token/unlock — { passcode } → sets an httpOnly cookie on success. */
export async function POST(request: Request, { params }: Ctx) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Not available" }, { status: 503 });
  const { token } = await params;

  let passcode = "";
  try {
    passcode = String((await request.json()).passcode ?? "");
  } catch {}

  const found = await loadShare(token);
  if (!found || shareState(found.share) !== "active") return NextResponse.json({ error: "This link is not valid." }, { status: 404 });
  const { share } = found;
  if (!share.passcode_hash) return NextResponse.json({ success: true });

  // Small delay blunts brute forcing without hurting real users.
  await new Promise((r) => setTimeout(r, 400));
  if (!passcode || !(await checkPasscode(passcode, share.passcode_hash))) {
    return NextResponse.json({ error: "Incorrect passcode." }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: unlockCookieName(share.token),
    value: unlockCookieValue(share),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: `/`,
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
