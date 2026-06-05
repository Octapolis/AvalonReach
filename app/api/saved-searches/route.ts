import { NextResponse } from "next/server";
import { z } from "zod";
import { getSavedSearchesByEmail, normalizeLookupEmail } from "@/lib/saved-searches";

const LookupSchema = z.object({
  email: z.string().email()
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const lookup = LookupSchema.safeParse({ email: url.searchParams.get("email") });

  if (!lookup.success) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const result = await getSavedSearchesByEmail(normalizeLookupEmail(lookup.data.email));

  return NextResponse.json(result);
}
