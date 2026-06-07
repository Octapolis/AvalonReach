import { getSavedSearchesByEmail, normalizeLookupEmail } from "@/lib/saved-searches";
import { RecentSearches } from "@/components/recent-searches";
import Link from "next/link";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const email = normalizeLookupEmail(value(params.email) ?? "");
  const lookup = email ? await getSavedSearchesByEmail(email) : null;

  const formatter = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <main className="section narrow dashboard-page">
      <p className="eyebrow">Results page</p>
      <h1>Your saved internet results</h1>
      <p className="hero-text">
        Enter the email you used to save a search, reopen recommendations, or start another address search.
      </p>

      <form className="lookup-form" action="/dashboard">
        <input name="email" type="email" placeholder="Email address" defaultValue={email} required />
        <button type="submit">Find saved results</button>
      </form>

      <div className="button-row">
        <Link className="button ghost compact" href="/">Search again</Link>
      </div>

      <section className="dashboard-assurance" aria-label="Saved results details">
        <div>
          <span>Private lookup</span>
          <p>Only searches saved with this email are shown.</p>
        </div>
        <div>
          <span>Fast return</span>
          <p>Reopen results without starting a new comparison.</p>
        </div>
        <div>
          <span>No account required</span>
          <p>Save and revisit results when you are ready.</p>
        </div>
      </section>

      {lookup && !lookup.configured && (
        <div className="notice warning">
          Saved-result lookup is temporarily unavailable. Please try again shortly.
        </div>
      )}

      {lookup?.configured && lookup.searches.length === 0 && (
        <div className="empty-state">No saved searches found for that email yet.</div>
      )}

      {lookup?.configured && lookup.searches.length > 0 && (
        <div className="saved-search-list">
          {lookup.searches.map((search) => (
            <article className="saved-search-card" key={search.id}>
              <div>
                <h2>{search.addressLabel}</h2>
                <p>
                  {search.priority.replace("-", " ")} priority
                  {search.providerCount === null ? "" : ` / ${search.providerCount} providers`}
                </p>
              </div>
              <div className="saved-search-meta">
                <span>{search.dataSource}</span>
                <span>{formatter.format(new Date(search.createdAt))}</span>
              </div>
              <Link className="button ghost compact" href={`/results?address=${encodeURIComponent(search.addressLabel)}&priority=${encodeURIComponent(search.priority)}`}>
                Reopen results
              </Link>
            </article>
          ))}
        </div>
      )}

      <RecentSearches />
    </main>
  );
}

function value(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}
