import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      work_email,
      email,
      company_name,
      website,
      monthly_revenue_range,
      team_size,
      biggest_challenge,
      whatsapp_number,
    } = body;

    const finalEmail = (work_email || email || "").trim();

    if (
      !name ||
      !company_name ||
      !monthly_revenue_range ||
      !team_size ||
      !biggest_challenge ||
      !whatsapp_number
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const payload: Record<string, any> = {
      name: name.trim(),
      company_name: company_name.trim(),
      website: typeof website === "string" && website.trim() ? website.trim() : null,
      monthly_revenue_range: monthly_revenue_range.trim(),
      team_size: team_size.trim(),
      biggest_challenge: biggest_challenge.trim(),
      whatsapp_number: whatsapp_number.trim(),
    };

    if (finalEmail) {
      payload.work_email = finalEmail;
    }

    const { data, error } = await supabase
      .from("founder_growth_leads")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, lead: data }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.error("Diagnosis API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
