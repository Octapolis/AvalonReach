import Link from "next/link";
import { providerDirectoryEntry, providerDisplayName } from "@/lib/provider-directory";

export default async function ProviderRedirectPage({ params }: { params: Promise<{ provider: string }> }) {
  const { provider } = await params;
  const entry = providerDirectoryEntry(provider);
  const label = providerDisplayName(provider);

  return (
    <main className="section narrow">
      <p className="eyebrow">Provider handoff</p>
      <h1>Confirm availability with {label || "this provider"}</h1>
      <p>
        Use this result as a shortlist, then confirm availability, monthly price, promos, fees, and installation details directly with the provider.
      </p>
      <p>
        {entry
          ? "AvalonReach has an official provider availability page configured for this handoff, but it is not a paid referral link yet."
          : "AvalonReach does not have an official provider availability page or live referral link configured for this provider yet."}
      </p>
      <div className="button-row">
        {entry && <a className="button" href={entry.availabilityUrl} rel="noreferrer" target="_blank">Open {label} availability</a>}
        <Link className={entry ? "button ghost" : "button"} href="/">Search another address</Link>
      </div>
    </main>
  );
}
