import { NextResponse } from "next/server";
import { login, getSession } from "@/lib/adminAuth";

export const dynamic = "force-dynamic";

/** POST /api/admin/auth — { username, password } → { token, user } */
export async function POST(request: Request) {
  try {
    if (!process.env.ADMIN_PASSWORD && !process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { error: "Admin login is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD (and optionally ADMIN_SESSION_SECRET)." },
        { status: 500 }
      );
    }

    const { username, password } = await request.json();
    const result = await login(String(username ?? ""), String(password ?? ""));
    if (!result) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }
    return NextResponse.json({ success: true, ...result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** GET /api/admin/auth — validate the current token, return its user. */
export async function GET(request: Request) {
  const session = getSession(request);
  if (!session) return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  return NextResponse.json({
    success: true,
    user: { id: session.id, username: session.username, name: session.name, role: session.role },
    exp: session.exp,
  });
}
