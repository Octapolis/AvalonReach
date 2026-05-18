import { LeadCaptureForm } from "@/components/lead-capture-form";
import { lookupBroadbandByAddress } from "@/lib/broadband";
import { saveSearch } from "@/lib/persistence";
import { rankProviders } from "@/lib/recommendation";
import type { UserPriority } from "@/lib/types";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const address = value(params.address) || "Sample address";
  const priority = normalizePriority(value(params.priority));
  const lookup = await lookupBroadbandByAddress(address);
  const ranked = rankProviders(lookup.providers, priority);
  await saveSearch({ lookup, priority, rankedPlans: ranked });

  return (
    <main className="section">
      <p className="eyebrow">Search results</p>
      <h1>Internet options for {lookup.addressLabel}</h1>
      <p className="hero-text">Showing ranked options for priority: {priority.replace("-", " ")}.</p>

      <div className="notice-stack">
        {lookup.notices.map((notice) => (
          <div className={`notice ${notice.level}`} key={notice.message}>{notice.message}</div>
        ))}
      </div>

      {ranked.length > 0 ? (
        <div className="provider-grid">
          {ranked.map((provider) => (
            <article className="provider-card" key={`${provider.name}-${provider.technology}-${provider.providerId ?? "none"}`}>
              <div className="provider-topline">
                <h3>{provider.planName ?? provider.name}</h3>
                <span>Score {provider.score}</span>
              </div>
              <p className="speed">{provider.maxDownloadMbps} Mbps down / {provider.maxUploadMbps} Mbps up</p>
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
          <h2>Send me updates for this area.</h2>
          <p>Leave your email for deal alerts, provider updates, and help choosing a plan.</p>
        </div>
        <LeadCaptureForm defaultLocation={lookup.addressLabel} />
      </section>
    </main>
  );
}

function value(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}

function normalizePriority(input: string | undefined): UserPriority {
  if (input === "fastest" || input === "cheapest" || input === "upload" || input === "gaming" || input === "best-value") return input;
  return "best-value";
}
