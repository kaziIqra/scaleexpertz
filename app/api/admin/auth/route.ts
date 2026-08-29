import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const expectedUsername = (process.env.ADMIN_USERNAME || "Ansh Sharma").trim().toLowerCase();
    const expectedPassword = process.env.ADMIN_PASSWORD || "Ansh@scalexpertz";

    const inputUser = (username || "").trim().toLowerCase();
    const inputPass = password || "";

    if (inputUser === expectedUsername && inputPass === expectedPassword) {
      const token = Buffer.from(
        `admin:${process.env.ADMIN_USERNAME || "Ansh Sharma"}:${expectedPassword}:${Date.now()}`
      ).toString("base64");

      return NextResponse.json({
        success: true,
        user: { name: "Ansh Sharma" },
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
