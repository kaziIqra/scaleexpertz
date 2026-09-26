import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase";
import { loadShare, shareState, isUnlocked } from "@/lib/audits/shares";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

/** GET /api/share/:token — public metadata for the share page (no PDF). */
export async function GET(request: Request, { params }: Ctx) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Not available" }, { status: 503 });
  const { token } = await params;

  const found = await loadShare(token);
  if (!found) return NextResponse.json({ error: "This link is not valid." }, { status: 404 });
  const { share, audit } = found;

  const state = shareState(share);
  if (state !== "active") {
    return NextResponse.json(
      { error: state === "expired" ? "This link has expired." : "This link has been turned off.", state },
      { status: 410 }
    );
  }

  return NextResponse.json({
    success: true,
    company: audit.company,
    client_name: audit.client_name,
    industry: audit.industry,
    version: audit.version,
    updated_at: audit.updated_at,
    has_pdf: Boolean(audit.pdf_path),
    requires_passcode: Boolean(share.passcode_hash),
    unlocked: isUnlocked(request, share),
    expires_at: share.expires_at,
  });
}
