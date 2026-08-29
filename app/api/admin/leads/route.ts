import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function isAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();
  const correctPassword = process.env.ADMIN_PASSWORD || "Ansh@scalexpertz";

  if (!token) return false;

  // Direct password match or encoded token match
  if (token === correctPassword) return true;

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    return parts[0] === "admin" && (parts[2] === correctPassword || parts[1] === correctPassword);
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from("founder_growth_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch leads error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leads: data || [] }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Lead ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("founder_growth_leads")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete lead error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
