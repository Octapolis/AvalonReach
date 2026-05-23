import { NextResponse } from "next/server";
import { z } from "zod";
import { lookupBroadbandByAddress } from "@/lib/broadband";
import { saveSearch } from "@/lib/persistence";
import { rankProviders } from "@/lib/recommendation";

const SearchSchema = z.object({
  address: z.string().min(3),
  priority: z.enum(["best-value", "fastest", "cheapest", "upload", "gaming"]).default("best-value"),
  email: z.string().email().optional()
});

export async function POST(request: Request) {
  const body = SearchSchema.parse(await request.json());
  const lookup = await lookupBroadbandByAddress(body.address);
  const rankedProviders = rankProviders(lookup.providers, body.priority);
  await saveSearch({ lookup, priority: body.priority, email: body.email, rankedPlans: rankedProviders });
  return NextResponse.json({ ...lookup, providers: rankedProviders });
}
