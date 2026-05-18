import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseClient } from "@/lib/supabase";

const LeadSchema = z.object({
  email: z.string().email(),
  zip: z.string().optional().default(""),
  intent: z.string().optional().default("results"),
  consent: z.literal("yes")
});

export async function POST(request: Request) {
  const lead = LeadSchema.parse(await request.json());
  const supabase = createSupabaseClient();

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      email: lead.email,
      location_hint: lead.zip,
      intent: lead.intent,
      consent: true,
      source: "landing-page"
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, stored: Boolean(supabase) });
}
