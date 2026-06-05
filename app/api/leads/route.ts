import { NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseClient } from "@/lib/supabase";

const LeadSchema = z.object({
  email: z.string().email(),
  zip: z.string().optional().default(""),
  intent: z.string().optional().default("results"),
  priority: z.enum(["best-value", "fastest", "cheapest", "upload", "gaming"]).optional().default("fastest"),
  consent: z.literal("yes")
});

export async function POST(request: Request) {
  const lead = LeadSchema.parse(await request.json());
  const supabase = createSupabaseClient();
  const email = lead.email.trim().toLowerCase();

  if (supabase) {
    const { error } = await supabase.from("leads").insert({
      email,
      location_hint: lead.zip,
      intent: lead.intent,
      consent: true,
      source: "landing-page"
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const { error: savedUserError } = await supabase.from("saved_users").insert({
      primary_email: email
    });

    if (savedUserError && savedUserError.code !== "23505") {
      console.error("saved_users insert failed", savedUserError);
    }

    if (lead.zip.trim()) {
      const { error: searchError } = await supabase.from("searches").insert({
        email,
        address_label: lead.zip,
        priority: lead.priority,
        raw_provider_count: null,
        data_source: "saved-result-request"
      });

      if (searchError) {
        console.error("saved search insert failed from lead capture", searchError);
      }
    }
  }

  return NextResponse.json({ ok: true, stored: Boolean(supabase) });
}
