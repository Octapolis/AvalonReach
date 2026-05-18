import type { BroadbandLookupResult, RankedProviderPlan, UserPriority } from "./types";
import { createSupabaseClient } from "./supabase";

export async function saveSearch(params: {
  lookup: BroadbandLookupResult;
  priority: UserPriority;
  email?: string | null;
  rankedPlans?: RankedProviderPlan[];
}) {
  const supabase = createSupabaseClient();
  if (!supabase) return { stored: false, reason: "supabase-not-configured" } as const;

  const searchAreaId = crypto.randomUUID();
  const { error: searchAreaError } = await supabase.from("search_areas").insert({
    id: searchAreaId,
    input: params.lookup.addressLabel,
    normalized_label: params.lookup.addressLabel,
    lat: params.lookup.lat,
    lng: params.lookup.lng,
    source: params.lookup.source
  });

  if (searchAreaError) {
    console.error("saveSearch search_areas insert failed", searchAreaError);
    return { stored: false, reason: searchAreaError.message } as const;
  }

  const { error: legacySearchError } = await supabase.from("searches").insert({
    email: params.email ?? null,
    address_label: params.lookup.addressLabel,
    lat: params.lookup.lat,
    lng: params.lookup.lng,
    priority: params.priority,
    raw_provider_count: params.lookup.providers.length,
    data_source: params.lookup.source
  });

  if (legacySearchError) {
    console.error("saveSearch searches insert failed", legacySearchError);
  }

  const recommendedPlan = params.rankedPlans?.[0];
  const { error: recommendationError } = await supabase.from("recommendations").insert({
    search_area_id: searchAreaId,
    priority: params.priority,
    recommended_plan_id: recommendedPlan?.planId ?? null,
    ranked_plan_ids: params.rankedPlans?.map((plan) => plan.planId).filter((id): id is string => Boolean(id)) ?? [],
    explanation: recommendedPlan?.recommendationReason ?? null,
    source: params.lookup.source
  });

  if (recommendationError) {
    console.error("saveSearch recommendations insert failed", recommendationError);
    return { stored: false, reason: recommendationError.message } as const;
  }

  return { stored: true } as const;
}
