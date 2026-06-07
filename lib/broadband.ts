import { sampleResults } from "@/data/sample-results";
import { createSupabaseClient } from "@/lib/supabase";
import type { BroadbandLookupResult, GeocodeResult, ProviderPlan } from "./types";

const CENSUS_GEOCODER_URL = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";
const CENSUS_REVERSE_GEOCODER_URL = "https://geocoding.geo.census.gov/geocoder/geographies/coordinates";
const BROADBAND_MAP_URL = "https://broadbandmap.com/api/v1/location/internet";

type CensusResponse = {
  result?: {
    addressMatches?: Array<{
      matchedAddress?: string;
      coordinates?: { x?: number; y?: number };
      addressComponents?: { zip?: string; city?: string; state?: string };
    }>;
  };
};

type CensusReverseResponse = {
  result?: {
    geographies?: Record<string, Array<Record<string, string | number | null | undefined>>>;
  };
};

type BroadbandMapProvider = {
  name?: string;
  technology?: string;
  technology_code?: number;
  max_download_mbps?: number;
  max_upload_mbps?: number;
  provider_id?: number;
};

type BroadbandMapResponse = {
  providers?: BroadbandMapProvider[];
};

type CatalogPlanRow = {
  slug: string;
  name: string;
  provider_id: string | null;
  technology: string;
  transport_type: string | null;
  max_download_mbps: number | null;
  max_upload_mbps: number | null;
  estimated_monthly_price: number | string | null;
  estimated_latency_ms: number | null;
  contract_required: boolean | null;
  referral_url: string | null;
  availability_notes: string | null;
  source: string | null;
};

type CatalogProviderRow = {
  id: string;
  slug: string;
  name: string;
};

export async function lookupBroadbandByAddress(address: string): Promise<BroadbandLookupResult> {
  const trimmed = address.trim();
  if (!trimmed || process.env.BROADBAND_PROVIDER === "mock") {
    return fallbackResult(trimmed || sampleResults.addressLabel, "Showing sample data. Set BROADBAND_PROVIDER=live to use live lookup.");
  }

  try {
    const geocode = await geocodeAddress(trimmed);
    if (!geocode) return fallbackResult(trimmed, "We could not geocode that address yet, so sample data is shown.");

    const providers = await lookupProvidersByCoordinates(geocode.lat, geocode.lng);
    if (providers.length === 0) {
      return {
        addressLabel: geocode.addressLabel,
        lat: geocode.lat,
        lng: geocode.lng,
        source: "live",
        providers: [],
        notices: [
          {
            level: "warning",
            message: "No providers were returned for this coordinate lookup. Availability data can be incomplete, so confirm with local providers."
          }
        ]
      };
    }

    return {
      addressLabel: geocode.addressLabel,
      lat: geocode.lat,
      lng: geocode.lng,
      source: "live",
      providers,
      notices: [
        {
          level: "info",
          message: "Availability is based on broadband map data near this address. Exact plans, pricing, and promos should be confirmed with the provider."
        }
      ]
    };
  } catch (error) {
    console.error("lookupBroadbandByAddress failed", error);
    return fallbackResult(trimmed, "Live lookup failed, so sample data is shown while we keep the site usable.");
  }
}

export async function lookupBroadbandByCoordinates(lat: number, lng: number, addressLabel = "Current location"): Promise<BroadbandLookupResult> {
  try {
    const resolvedLocationLabel = addressLabel === "Current location"
      ? await reverseGeocodeCoordinates(lat, lng) ?? addressLabel
      : addressLabel;
    const providers = await lookupProvidersByCoordinates(lat, lng);
    if (providers.length === 0) {
      return {
        addressLabel: resolvedLocationLabel,
        lat,
        lng,
        source: "live",
        providers: [],
        notices: [
          {
            level: "warning",
            message: "No providers were returned for this location. Availability data can be incomplete, so confirm with local providers."
          }
        ]
      };
    }

    return {
      addressLabel: resolvedLocationLabel,
      lat,
      lng,
      source: "live",
      providers,
      notices: [
        {
          level: "info",
          message: "Availability is based on broadband map data near the device location your browser shared. If your VPN or device location is wrong, enter the service address instead."
        }
      ]
    };
  } catch (error) {
    console.error("lookupBroadbandByCoordinates failed", error);
    return fallbackResult(addressLabel, "Live lookup failed, so sample data is shown while we keep the site usable.");
  }
}

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const matches = await geocodeAddressMatches(address);
  return matches[0] ?? null;
}

export async function suggestAddresses(address: string): Promise<GeocodeResult[]> {
  const trimmed = address.trim();
  if (trimmed.length < 8) return [];

  return geocodeAddressMatches(trimmed);
}

async function geocodeAddressMatches(address: string): Promise<GeocodeResult[]> {
  const url = new URL(CENSUS_GEOCODER_URL);
  url.searchParams.set("address", address);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!response.ok) throw new Error(`Census geocoder failed: ${response.status}`);

  const payload = (await response.json()) as CensusResponse;
  const matches: GeocodeResult[] = [];

  for (const match of payload.result?.addressMatches ?? []) {
    const lat = match.coordinates?.y;
    const lng = match.coordinates?.x;
    if (typeof lat !== "number" || typeof lng !== "number") continue;

    matches.push({
      addressLabel: match.matchedAddress ?? address,
      lat,
      lng,
      zip: match.addressComponents?.zip,
      city: match.addressComponents?.city,
      state: match.addressComponents?.state
    });
  }

  return matches;
}

export async function reverseGeocodeCoordinates(lat: number, lng: number): Promise<string | null> {
  const url = new URL(CENSUS_REVERSE_GEOCODER_URL);
  url.searchParams.set("x", String(lng));
  url.searchParams.set("y", String(lat));
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("vintage", "Current_Current");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!response.ok) return null;

  const payload = (await response.json()) as CensusReverseResponse;
  const geographies = payload.result?.geographies;
  if (!geographies) return null;

  const place = firstGeography(geographies, "Incorporated Places") ?? firstGeography(geographies, "County Subdivisions");
  const county = firstGeography(geographies, "Counties");
  const state = firstGeography(geographies, "States");

  const placeName = cleanCensusName(place?.NAME ?? place?.BASENAME);
  const countyName = cleanCensusName(county?.NAME ?? county?.BASENAME);
  const stateCode = typeof state?.STUSAB === "string" ? state.STUSAB : undefined;
  const stateName = cleanCensusName(state?.NAME ?? state?.BASENAME);

  if (placeName && stateCode) return `Device location near ${placeName}, ${stateCode}`;
  if (countyName && stateCode) return `Device location near ${countyName}, ${stateCode}`;
  if (placeName && stateName) return `Device location near ${placeName}, ${stateName}`;
  if (countyName && stateName) return `Device location near ${countyName}, ${stateName}`;
  return null;
}

export async function lookupProvidersByCoordinates(lat: number, lng: number): Promise<ProviderPlan[]> {
  const url = new URL(BROADBAND_MAP_URL);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lng", String(lng));
  url.searchParams.set("service_type", "residential");

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 7 } });
  if (!response.ok) throw new Error(`Broadband provider lookup failed: ${response.status}`);

  const payload = (await response.json()) as BroadbandMapResponse;
  return (payload.providers ?? [])
    .filter((provider) => provider.name && provider.technology)
    .map((provider) => ({
      name: provider.name ?? "Unknown provider",
      technology: provider.technology ?? "Unknown",
      maxDownloadMbps: Number(provider.max_download_mbps ?? 0),
      maxUploadMbps: Number(provider.max_upload_mbps ?? 0),
      providerId: provider.provider_id,
      referralUrl: providerReferralUrl(provider.name),
      source: "live" as const
    }));
}

async function fallbackResult(addressLabel: string, reason: string): Promise<BroadbandLookupResult> {
  const catalogPlans = await loadCatalogPlans();

  return {
    ...sampleResults,
    addressLabel,
    source: "fallback",
    providers: catalogPlans.length > 0 ? catalogPlans : sampleResults.providers,
    notices: [{ level: "warning", message: reason }]
  };
}

async function loadCatalogPlans(): Promise<ProviderPlan[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return [];

  const [{ data: plans, error: plansError }, { data: providers, error: providersError }] = await Promise.all([
    supabase
      .from("plans")
      .select(
        "slug,name,provider_id,technology,transport_type,max_download_mbps,max_upload_mbps,estimated_monthly_price,estimated_latency_ms,contract_required,referral_url,availability_notes,source"
      )
      .eq("active", true)
      .order("max_download_mbps", { ascending: false }),
    supabase.from("providers").select("id,slug,name").eq("active", true)
  ]);

  if (plansError || providersError) {
    console.error("loadCatalogPlans failed", plansError ?? providersError);
    return [];
  }

  const providerById = new Map((providers as CatalogProviderRow[] | null ?? []).map((provider) => [provider.id, provider]));

  return (plans as CatalogPlanRow[] | null ?? []).map((plan) => {
    const provider = plan.provider_id ? providerById.get(plan.provider_id) : undefined;
    const providerName = provider?.name ?? "Unknown provider";

    return {
      planId: plan.slug,
      providerId: provider?.slug ?? plan.provider_id ?? undefined,
      name: providerName,
      providerName,
      planName: plan.name,
      technology: plan.technology,
      transportType: normalizeTransportType(plan.transport_type),
      maxDownloadMbps: Number(plan.max_download_mbps ?? 0),
      maxUploadMbps: Number(plan.max_upload_mbps ?? 0),
      estimatedMonthlyPrice:
        plan.estimated_monthly_price === null ? undefined : Number(plan.estimated_monthly_price),
      estimatedLatencyMs: plan.estimated_latency_ms ?? undefined,
      notes: plan.availability_notes ?? undefined,
      referralUrl: plan.referral_url ?? providerReferralUrl(providerName),
      contractRequired: Boolean(plan.contract_required),
      source: "sample"
    };
  });
}

function firstGeography(geographies: Record<string, Array<Record<string, string | number | null | undefined>>>, key: string) {
  return geographies[key]?.[0];
}

function cleanCensusName(input: string | number | null | undefined) {
  if (typeof input !== "string") return undefined;
  return input
    .replace(/\s+city$/i, "")
    .replace(/\s+County$/i, " County")
    .trim();
}

function normalizeTransportType(input: string | null | undefined): ProviderPlan["transportType"] {
  if (
    input === "fiber" ||
    input === "cable" ||
    input === "fixed-wireless" ||
    input === "5g-home" ||
    input === "dsl" ||
    input === "satellite" ||
    input === "leo-satellite" ||
    input === "unknown"
  ) {
    return input;
  }

  return "unknown";
}

function providerReferralUrl(providerName?: string) {
  if (!providerName) return "#lead-capture";
  const slug = providerName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `/go/${slug}`;
}
