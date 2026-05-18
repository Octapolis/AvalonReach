import { sampleResults } from "@/data/sample-results";
import type { BroadbandLookupResult, GeocodeResult, ProviderPlan } from "./types";

const CENSUS_GEOCODER_URL = "https://geocoding.geo.census.gov/geocoder/locations/onelineaddress";
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

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const url = new URL(CENSUS_GEOCODER_URL);
  url.searchParams.set("address", address);
  url.searchParams.set("benchmark", "Public_AR_Current");
  url.searchParams.set("format", "json");

  const response = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
  if (!response.ok) throw new Error(`Census geocoder failed: ${response.status}`);

  const payload = (await response.json()) as CensusResponse;
  const match = payload.result?.addressMatches?.[0];
  const lat = match?.coordinates?.y;
  const lng = match?.coordinates?.x;
  if (typeof lat !== "number" || typeof lng !== "number") return null;

  return {
    addressLabel: match?.matchedAddress ?? address,
    lat,
    lng,
    zip: match?.addressComponents?.zip,
    city: match?.addressComponents?.city,
    state: match?.addressComponents?.state
  };
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

function fallbackResult(addressLabel: string, reason: string): BroadbandLookupResult {
  return {
    ...sampleResults,
    addressLabel,
    source: "fallback",
    notices: [{ level: "warning", message: reason }]
  };
}

function providerReferralUrl(providerName?: string) {
  if (!providerName) return "#lead-capture";
  const slug = providerName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return `/go/${slug}`;
}
