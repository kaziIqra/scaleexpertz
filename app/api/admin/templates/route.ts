import { NextResponse } from "next/server";
import { isAuthorized, unauthorized } from "@/lib/adminAuth";
import { listTemplateSummaries } from "@/lib/audits/templates";

export const dynamic = "force-dynamic";

/** GET /api/admin/templates — audit templates available to admins (metadata only). */
export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();
  return NextResponse.json({ success: true, templates: listTemplateSummaries() });
}
