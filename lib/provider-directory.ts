export type ProviderDirectoryEntry = {
  slug: string;
  displayName: string;
  availabilityUrl: string;
  sourceNote: string;
};

const PROVIDERS: ProviderDirectoryEntry[] = [
  {
    slug: "att",
    displayName: "AT&T",
    availabilityUrl: "https://www.att.com/internet/availability/",
    sourceNote: "Official AT&T address-availability page configured."
  },
  {
    slug: "verizon",
    displayName: "Verizon",
    availabilityUrl: "https://www.verizon.com/home/internet/",
    sourceNote: "Official Verizon Home Internet availability page configured."
  },
  {
    slug: "xfinity",
    displayName: "Xfinity",
    availabilityUrl: "https://www.xfinity.com/learn/internet-service",
    sourceNote: "Official Xfinity internet service page configured."
  },
  {
    slug: "comcast",
    displayName: "Xfinity",
    availabilityUrl: "https://www.xfinity.com/learn/internet-service",
    sourceNote: "Official Xfinity internet service page configured."
  },
  {
    slug: "t-mobile",
    displayName: "T-Mobile",
    availabilityUrl: "https://www.t-mobile.com/home-internet",
    sourceNote: "Official T-Mobile Home Internet page configured."
  },
  {
    slug: "starlink",
    displayName: "Starlink",
    availabilityUrl: "https://www.starlink.com/residential",
    sourceNote: "Official Starlink residential internet page configured."
  },
  {
    slug: "hughesnet",
    displayName: "Hughesnet",
    availabilityUrl: "https://www.hughesnet.com/home-satellite-internet-plans",
    sourceNote: "Official Hughesnet residential plan availability page configured."
  },
  {
    slug: "viasat",
    displayName: "Viasat",
    availabilityUrl: "https://www.viasat.com/satellite-internet/",
    sourceNote: "Official Viasat satellite internet page configured."
  },
  {
    slug: "spectrum",
    displayName: "Spectrum",
    availabilityUrl: "https://www.spectrum.com/internet",
    sourceNote: "Official Spectrum internet page configured."
  },
  {
    slug: "cox",
    displayName: "Cox",
    availabilityUrl: "https://www.cox.com/residential/internet.html",
    sourceNote: "Official Cox residential internet page configured."
  },
  {
    slug: "optimum",
    displayName: "Optimum",
    availabilityUrl: "https://www.optimum.com/internet",
    sourceNote: "Official Optimum internet page configured."
  },
  {
    slug: "frontier",
    displayName: "Frontier",
    availabilityUrl: "https://frontier.com/internet",
    sourceNote: "Official Frontier internet page configured."
  },
  {
    slug: "centurylink",
    displayName: "CenturyLink",
    availabilityUrl: "https://www.centurylink.com/internet/",
    sourceNote: "Official CenturyLink internet page configured."
  },
  {
    slug: "google-fiber",
    displayName: "Google Fiber",
    availabilityUrl: "https://fiber.google.com/",
    sourceNote: "Official Google Fiber availability page configured."
  },
  {
    slug: "earthlink",
    displayName: "EarthLink",
    availabilityUrl: "https://www.earthlink.net/internet/",
    sourceNote: "Official EarthLink internet page configured."
  },
  {
    slug: "hotwire-communications",
    displayName: "Hotwire Communications",
    availabilityUrl: "https://www.hotwirecommunications.com/",
    sourceNote: "Official Hotwire Communications site configured."
  }
];

const PROVIDER_BY_SLUG = new Map(PROVIDERS.map((provider) => [provider.slug, provider]));

export function providerSlug(providerName?: string) {
  if (!providerName) return "";

  const normalized = providerName
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (normalized === "at-and-t" || normalized === "at-t") return "att";
  if (normalized.includes("xfinity") || normalized.includes("comcast")) return "xfinity";
  if (normalized.includes("t-mobile")) return "t-mobile";
  if (normalized.includes("starlink") || normalized.includes("spacex")) return "starlink";
  if (normalized.includes("hughesnet") || normalized.includes("hughes-network")) return "hughesnet";
  if (normalized.includes("viasat")) return "viasat";
  if (normalized.includes("verizon")) return "verizon";
  if (normalized.includes("spectrum") || normalized.includes("charter")) return "spectrum";
  if (normalized.includes("cox")) return "cox";
  if (normalized.includes("optimum") || normalized.includes("altice")) return "optimum";
  if (normalized.includes("frontier")) return "frontier";
  if (normalized.includes("centurylink") || normalized.includes("lumen")) return "centurylink";
  if (normalized.includes("google-fiber")) return "google-fiber";
  if (normalized.includes("earthlink")) return "earthlink";
  if (normalized.includes("hotwire")) return "hotwire-communications";

  return normalized;
}

export function providerDirectoryEntry(providerNameOrSlug?: string) {
  const slug = providerSlug(providerNameOrSlug);
  return slug ? PROVIDER_BY_SLUG.get(slug) : undefined;
}

export function providerDisplayName(providerNameOrSlug?: string) {
  const entry = providerDirectoryEntry(providerNameOrSlug);
  if (entry) return entry.displayName;
  if (!providerNameOrSlug) return "this provider";

  return providerSlug(providerNameOrSlug)
    .split("-")
    .filter(Boolean)
    .map((part) => part.toUpperCase() === "dsl" ? "DSL" : part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

export function providerHandoffUrl(providerName?: string) {
  const slug = providerSlug(providerName);
  return slug ? `/go/${slug}` : "#lead-capture";
}
