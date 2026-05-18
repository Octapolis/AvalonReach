import Link from "next/link";

export default async function ProviderRedirectPage({ params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const label = provider.split("-").filter(Boolean).map((part) => part[0]?.toUpperCase() + part.slice(1)).join(" ");

  return (
    <main className="section narrow">
      <p className="eyebrow">Provider handoff</p>
      <h1>Check availability with {label || "this provider"}</h1>
      <p>
        V1 placeholder: this page will route to provider-specific referral or affiliate links once they are configured.
      </p>
      <p>
        For now, capture the user as a lead and show that exact pricing/promos need provider confirmation.
      </p>
      <Link className="button" href="/#lead-capture">Get update alerts</Link>
    </main>
  );
}
