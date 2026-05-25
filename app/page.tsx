import { LeadCaptureForm } from "@/components/lead-capture-form";
import { SearchForm } from "@/components/search-form";
import { sampleResults } from "@/data/sample-results";
import { rankProviders } from "@/lib/recommendation";

export default function HomePage() {
  const ranked = rankProviders(sampleResults.providers, "best-value");

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Broadband comparison for real addresses</p>
          <h1>Find the best internet available where you actually live.</h1>
          <p className="hero-text">
            Enter an address, compare available providers, and get a clear recommendation based on speed, price, upload needs, and how you use the internet.
          </p>
          <SearchForm />
        </div>
        <aside className="score-card">
          <p className="card-label">Current MVP recommendation</p>
          <h2>{ranked[0]?.name}</h2>
          <p>{ranked[0]?.priceLabel}</p>
          <p>{ranked[0]?.recommendationReason}</p>
        </aside>
      </section>

      <section className="section" id="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <article><span>1</span><h3>Search your address</h3><p>We convert the address into coordinates and check broadband availability.</p></article>
          <article><span>2</span><h3>Choose priorities</h3><p>Pick fastest, cheapest, best value, gaming, streaming, or work-from-home.</p></article>
          <article><span>3</span><h3>Get a plain-English pick</h3><p>The site ranks providers and explains the tradeoffs without sales fog.</p></article>
        </div>
      </section>

      <section className="section">
        <h2>Example result cards</h2>
        <div className="provider-grid">
          {ranked.map((provider) => (
            <article className="provider-card" key={`${provider.name}-${provider.technology}`}>
              <div className="provider-topline">
                <h3>{provider.name}</h3>
                <span>{provider.technology}</span>
              </div>
              <p className="speed">{provider.maxDownloadMbps} Mbps down / {provider.maxUploadMbps} Mbps up</p>
              <p className="price-line">{provider.priceLabel}</p>
              <p>{provider.recommendationReason}</p>
              <a className="button ghost" href={provider.referralUrl}>Check availability</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section lead-section" id="lead-capture">
        <div>
          <p className="eyebrow">Responder list ready from day one</p>
          <h2>Send me my results and better-deal alerts.</h2>
          <p>Phase 1 captures emails, consent, searched location, and what the user wants help with.</p>
        </div>
        <LeadCaptureForm />
      </section>
    </main>
  );
}
