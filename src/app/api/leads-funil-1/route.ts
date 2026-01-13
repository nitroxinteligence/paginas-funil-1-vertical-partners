import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

type LeadPayload = {
  leadId?: string;
  lead_name?: string;
  whatsapp?: string;
};

export async function POST(request: Request) {
  let body: LeadPayload | null = null;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const { leadId, lead_name, whatsapp } = body ?? {};

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Supabase credentials not configured." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const payload: Record<string, unknown> = {};
  if (lead_name) {
    payload.lead_name = lead_name;
  }
  if (whatsapp) {
    payload.whatsapp = whatsapp;
  }

  if (!Object.keys(payload).length) {
    return NextResponse.json({ skipped: true });
  }

  try {
    if (leadId) {
      const { data, error } = await supabase
        .from("leads_funil_1")
        .update(payload)
        .eq("id", leadId)
        .select("id")
        .maybeSingle();

      if (error) {
        console.error("[API /leads-funil-1] Supabase update error:", error);
        return NextResponse.json(
          { error: "Failed to update lead." },
          { status: 500 }
        );
      }

      return NextResponse.json({ id: data?.id ?? leadId });
    }

    if (whatsapp) {
      const { data: existing, error: findError } = await supabase
        .from("leads_funil_1")
        .select("id")
        .eq("whatsapp", whatsapp)
        .limit(1);

      if (findError) {
        console.error("[API /leads-funil-1] Supabase lookup error:", findError);
      } else if (existing && existing[0]?.id) {
        const { data, error } = await supabase
          .from("leads_funil_1")
          .update(payload)
          .eq("id", existing[0].id)
          .select("id")
          .maybeSingle();

        if (error) {
          console.error("[API /leads-funil-1] Supabase update error:", error);
          return NextResponse.json(
            { error: "Failed to update lead." },
            { status: 500 }
          );
        }

        return NextResponse.json({ id: data?.id ?? existing[0].id });
      }
    }

    const { data, error } = await supabase
      .from("leads_funil_1")
      .insert([payload])
      .select("id")
      .single();

    if (error) {
      console.error("[API /leads-funil-1] Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to create lead." },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data?.id ?? null });
  } catch (error) {
    console.error("[API /leads-funil-1] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

