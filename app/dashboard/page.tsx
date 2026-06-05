import { getSavedSearchesByEmail, normalizeLookupEmail } from "@/lib/saved-searches";

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
    <main className="section narrow">
      <p className="eyebrow">Saved results dashboard</p>
      <h1>Your saved internet searches</h1>
      <p className="hero-text">
        Look up saved AvalonReach results by email. This keeps Week 5 simple while leaving room for unique usernames later.
      </p>

      <form className="lookup-form" action="/dashboard">
        <input name="email" type="email" placeholder="Email address" defaultValue={email} required />
        <button type="submit">Find saved results</button>
      </form>

      <section className="identity-note">
        <p className="eyebrow">Username-ready design</p>
        <p>
          Email is the first lookup method, but saved results should live under a stable internal profile. Later, a username can be added without rebuilding the account if an email changes.
        </p>
      </section>

      {lookup && !lookup.configured && (
        <div className="notice warning">
          Saved-search lookup is designed, but production needs the server-only Supabase key before private dashboard reads are enabled.
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
              <a className="button ghost compact" href={`/results?address=${encodeURIComponent(search.addressLabel)}&priority=${encodeURIComponent(search.priority)}`}>
                Reopen results
              </a>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

function value(input: string | string[] | undefined) {
  return Array.isArray(input) ? input[0] : input;
}
