import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { loadShare, shareState, isUnlocked } from "@/lib/audits/shares";
import { auditFileName } from "@/lib/audits/pdf/render";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ token: string }> };

/**
 * GET /api/share/:token/pdf[?download=1] — streams the stored PDF for a valid,
 * unlocked share. Counts a view per request.
 */
export async function GET(request: Request, { params }: Ctx) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Not available" }, { status: 503 });
  const { token } = await params;

  const found = await loadShare(token);
  if (!found) return NextResponse.json({ error: "This link is not valid." }, { status: 404 });
  const { share, audit } = found;
  if (shareState(share) !== "active") return NextResponse.json({ error: "This link is no longer active." }, { status: 410 });
  if (!isUnlocked(request, share)) return NextResponse.json({ error: "Passcode required." }, { status: 401 });
  if (!audit.pdf_path) return NextResponse.json({ error: "The document is not ready yet." }, { status: 404 });

  const { data, error } = await supabase.storage.from("audits").download(audit.pdf_path);
  if (error || !data) return NextResponse.json({ error: "Could not load the document." }, { status: 500 });

  await supabase
    .from("audit_shares")
    .update({ view_count: share.view_count + 1, last_viewed_at: new Date().toISOString() })
    .eq("id", share.id);

  const download = new URL(request.url).searchParams.get("download") === "1";
  const filename = auditFileName(audit.company);
  return new Response(await data.arrayBuffer(), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
