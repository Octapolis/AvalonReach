import { NextResponse } from "next/server";
import { z } from "zod";
import { suggestAddresses } from "@/lib/broadband";

const QuerySchema = z.object({
  q: z.string().trim().min(8).max(160)
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = QuerySchema.safeParse({ q: url.searchParams.get("q") ?? "" });

  if (!parsed.success) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const suggestions = await suggestAddresses(parsed.data.q);
    return NextResponse.json({
      suggestions: suggestions.slice(0, 5).map((suggestion) => ({
        label: suggestion.addressLabel,
        city: suggestion.city,
        state: suggestion.state,
        zip: suggestion.zip
      }))
    });
  } catch (error) {
    console.error("address suggestions failed", error);
    return NextResponse.json({ suggestions: [] });
  }
}
