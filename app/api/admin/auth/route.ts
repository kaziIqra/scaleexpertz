import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !expectedPassword) {
      return NextResponse.json(
        { error: "Admin login is not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD." },
        { status: 500 }
      );
    }

    const expectedUsername = adminUsername.trim().toLowerCase();

    const inputUser = (username || "").trim().toLowerCase();
    const inputPass = password || "";

    if (inputUser === expectedUsername && inputPass === expectedPassword) {
      const token = Buffer.from(
        `admin:${adminUsername}:${expectedPassword}:${Date.now()}`
      ).toString("base64");

      return NextResponse.json({
        success: true,
        user: { name: adminUsername },
        token,
      });
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Authentication error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
