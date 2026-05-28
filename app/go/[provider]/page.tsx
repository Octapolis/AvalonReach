import Link from "next/link";

export default async function ProviderRedirectPage({ params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const label = provider.split("-").filter(Boolean).map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");

  return (
    <main className="section narrow">
      <p className="eyebrow">Provider handoff</p>
      <h1>Confirm availability with {label || "this provider"}</h1>
      <p>
        AvalonReach does not have a live referral link for this provider yet. Use this result as a shortlist, then confirm availability, monthly price, promos, fees, and installation details directly with the provider.
      </p>
      <p>
        This keeps the MVP honest while provider-specific handoff links are being configured.
      </p>
      <div className="button-row">
        <Link className="button" href="/">Search another address</Link>
      </div>
    </main>
  );
}
