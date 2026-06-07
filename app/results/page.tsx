import { LeadCaptureForm } from "@/components/lead-capture-form";
import { lookupBroadbandByAddress, lookupBroadbandByCoordinates } from "@/lib/broadband";
import { saveSearch } from "@/lib/persistence";
import { rankProviders } from "@/lib/recommendation";
import type { UserPriority } from "@/lib/types";
import Link from "next/link";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const address = value(params.address) || "Sample address";
  const lat = parseCoordinate(value(params.lat));
  const lng = parseCoordinate(value(params.lng));
  const priority = normalizePriority(value(params.priority));
  const usedDeviceLocation = lat !== null && lng !== null;
  const lookup = lat !== null && lng !== null
    ? await lookupBroadbandByCoordinates(lat, lng, address)
    : await lookupBroadbandByAddress(address);
  const ranked = rankProviders(lookup.providers, priority);
  const resultStatus = getResultStatus(lookup.source, usedDeviceLocation);
  await saveSearch({ lookup, priority, rankedPlans: ranked });

  return (
    <main className="section">
      <p className="eyebrow">Search results</p>
      <h1>Internet options for {lookup.addressLabel}</h1>
      <p className="hero-text">Showing ranked options for priority: {priority.replace("-", " ")}.</p>
      <div className="button-row">
        <Link className="button ghost compact" href="/">Search again</Link>
        <Link className="button ghost compact" href="/dashboard">Saved results</Link>
      </div>

      <section className={`result-status ${resultStatus.level}`} aria-label="Search status">
        <p className="eyebrow">{resultStatus.eyebrow}</p>
        <h2>{resultStatus.title}</h2>
        <p>{resultStatus.message}</p>
      </section>

      {usedDeviceLocation && (
        <section className="location-feedback">
          <p className="eyebrow">Location used</p>
          <h2>{lookup.addressLabel}</h2>
          <p>
            Your browser shared an approximate device location, not a typed service address. Device location can come from GPS, Wi-Fi, cell towers, or IP-based signals, and a VPN can make it wrong. For the most accurate internet results, search the address where service will be installed.
          </p>
        </section>
      )}

      <div className="notice-stack">
        {lookup.notices.map((notice) => (
          <div className={`notice ${notice.level}`} key={notice.message}>{notice.message}</div>
        ))}
      </div>

      {ranked.length > 0 ? (
        <div className="provider-grid">
          {ranked.map((provider, index) => (
            <article className="provider-card" key={`${provider.name}-${provider.technology}-${provider.providerId ?? "none"}`}>
              <div className="provider-topline">
                <h3>{provider.planName ?? `${provider.name} ${provider.transportLabel}`}</h3>
                <span>{index === 0 ? "Recommended" : provider.scoreLabel}</span>
              </div>
              <p className="speed">{provider.maxDownloadMbps} Mbps down / {provider.maxUploadMbps} Mbps up</p>
              <p className="price-line">{provider.priceLabel}</p>
              <p>{provider.name} • {provider.transportLabel} {provider.contractRequired ? "• Contract may apply" : ""}</p>
              <p>Estimated latency: {provider.estimatedLatencyMs ? `${provider.estimatedLatencyMs} ms` : provider.estimatedLatencyCategory.replace("-", " ")}</p>
              <p>{provider.recommendationReason}</p>
              <p className="fine-print">{provider.notes ?? provider.transportNote}</p>
              <a className="button ghost" href={provider.referralUrl}>Check availability</a>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">No providers returned yet. Join updates and we can notify you as coverage data improves.</div>
      )}

      <section className="section lead-section" id="lead-capture">
        <div>
          <p className="eyebrow">Want these results later?</p>
          <h2>Save this search.</h2>
          <p>Keep the results available without making the main comparison page feel crowded.</p>
        </div>
        <LeadCaptureForm defaultLocation={lookup.addressLabel} defaultPriority={priority} initiallyCollapsed />
      </section>
    </main>
  );
}

function value(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function normalizePriority(input: string | undefined): UserPriority {
  if (input === "fastest" || input === "cheapest" || input === "upload" || input === "gaming" || input === "best-value") return input;
  return "fastest";
}

function parseCoordinate(input: string | undefined) {
  if (!input) return null;
  const value = Number(input);
  return Number.isFinite(value) ? value : null;
}

function getResultStatus(source: "live" | "sample" | "fallback", usedDeviceLocation: boolean) {
  if (source === "live") {
    return {
      level: "success",
      eyebrow: "Address found",
      title: usedDeviceLocation ? "Success: found options near your device location." : "Success: found these options at your address.",
      message: usedDeviceLocation
        ? "These recommendations are based on the approximate location your browser shared. Search the service address for the most accurate result."
        : "These recommendations are based on the verified address match used for this lookup. Confirm exact plans, prices, and installation details with the provider."
    };
  }

  return {
    level: "warning",
    eyebrow: "Address not found",
    title: "Address not found. Displaying top regional options.",
    message: "AvalonReach could not verify that exact address through the live lookup, so this page is showing fallback options while keeping the comparison useful. Future partner recommendations can plug into this same area once they are configured."
  };
}
