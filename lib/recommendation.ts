import type { ProviderPlan, RankedProviderPlan, RecommendationResult, TransportType, UserPriority } from "./types";

type TransportProfile = {
  label: string;
  latencyCategory: "very-low" | "low" | "medium" | "high" | "variable";
  gamingRank: number;
  note: string;
};

const TRANSPORT_PROFILES: Record<TransportType, TransportProfile> = {
  fiber: {
    label: "Fiber / FTTP",
    latencyCategory: "very-low",
    gamingRank: 7,
    note: "Fiber is generally the strongest option for speed, latency, upload performance, and reliability."
  },
  cable: {
    label: "Cable / DOCSIS",
    latencyCategory: "low",
    gamingRank: 6,
    note: "Cable is strong for download speed, but upload is often weaker than fiber."
  },
  "fixed-wireless": {
    label: "Fixed Wireless",
    latencyCategory: "variable",
    gamingRank: 5,
    note: "Fixed wireless depends heavily on signal quality, line of sight, and local congestion."
  },
  "5g-home": {
    label: "5G Home Internet",
    latencyCategory: "variable",
    gamingRank: 4,
    note: "5G home internet can be fast, but performance depends on signal strength and tower congestion."
  },
  dsl: {
    label: "DSL",
    latencyCategory: "medium",
    gamingRank: 3,
    note: "DSL may be available in legacy wireline areas, but speeds and uploads are usually lower than newer technologies."
  },
  "leo-satellite": {
    label: "LEO Satellite",
    latencyCategory: "medium",
    gamingRank: 2,
    note: "LEO satellite, such as Starlink, is usually better than traditional satellite but can still be affected by obstructions and weather."
  },
  satellite: {
    label: "Traditional Satellite",
    latencyCategory: "high",
    gamingRank: 1,
    note: "Traditional satellite provides rural coverage but may have higher latency and weather sensitivity."
  },
  unknown: {
    label: "Unknown Transport",
    latencyCategory: "variable",
    gamingRank: 0,
    note: "Transport details are limited, so confirm performance expectations with the provider."
  }
};

export function rankProviders(providers: ProviderPlan[], priority: UserPriority): RankedProviderPlan[] {
  return providers
    .map((provider) => {
      const transportType = provider.transportType ?? classifyTransport(provider.technology);
      const profile = TRANSPORT_PROFILES[transportType];
      const valueScore = valueScoreFor(provider);
      const score = displayScore(provider, priority, valueScore, profile.gamingRank);

      return {
        ...provider,
        providerName: provider.providerName ?? provider.name,
        transportType,
        transportLabel: profile.label,
        estimatedLatencyCategory: provider.estimatedLatencyCategory ?? profile.latencyCategory,
        transportNote: profile.note,
        valueScore,
        score,
        scoreLabel: displayScoreLabel(provider, priority, valueScore, score, profile.gamingRank),
        priceLabel: displayPriceLabel(provider),
        recommendationReason: explain(provider, priority, valueScore, profile)
      };
    })
    .sort((a, b) => compareByPriority(a, b, priority));
}

export function recommendPlans(providers: ProviderPlan[], priority: UserPriority): RecommendationResult {
  const rankedPlans = rankProviders(providers, priority);
  const recommended = rankedPlans[0];

  return {
    priority,
    recommendedPlanId: recommended?.planId,
    rankedPlans,
    explanation: recommended
      ? `${recommended.planName ?? recommended.name} is the top recommendation for ${priority.replace("-", " ")} because ${recommended.recommendationReason}`
      : "No plans were available to recommend.",
    generatedAt: new Date().toISOString()
  };
}

export function classifyTransport(technology: string): TransportType {
  const normalized = technology.toLowerCase();

  if (normalized.includes("fiber") || normalized.includes("fttp")) return "fiber";
  if (normalized.includes("cable") || normalized.includes("docsis")) return "cable";
  if (normalized.includes("fixed wireless")) return "fixed-wireless";
  if (normalized.includes("5g")) return "5g-home";
  if (normalized.includes("dsl")) return "dsl";
  if (normalized.includes("starlink") || normalized.includes("leo")) return "leo-satellite";
  if (normalized.includes("satellite")) return "satellite";

  return "unknown";
}

function compareByPriority(a: RankedProviderPlan, b: RankedProviderPlan, priority: UserPriority) {
  if (priority === "cheapest") return compareByPrice(a, b) || b.maxDownloadMbps - a.maxDownloadMbps;
  if (priority === "fastest") return b.maxDownloadMbps - a.maxDownloadMbps || b.maxUploadMbps - a.maxUploadMbps;
  if (priority === "upload") return b.maxUploadMbps - a.maxUploadMbps || b.maxDownloadMbps - a.maxDownloadMbps;
  if (priority === "gaming") return compareGamingAndRemoteWork(a, b);
  return compareBestValue(a, b);
}

function compareBestValue(a: RankedProviderPlan, b: RankedProviderPlan) {
  if (a.valueScore !== null && b.valueScore !== null) return b.valueScore - a.valueScore || compareByPrice(a, b);
  if (a.valueScore !== null && b.valueScore === null) return -1;
  if (a.valueScore === null && b.valueScore !== null) return 1;

  return transportQuality(b) - transportQuality(a) || b.maxDownloadMbps - a.maxDownloadMbps || b.maxUploadMbps - a.maxUploadMbps;
}

function compareByPrice(a: ProviderPlan, b: ProviderPlan) {
  const aPrice = price(a);
  const bPrice = price(b);

  if (aPrice !== null && bPrice !== null) return aPrice - bPrice;
  if (aPrice !== null && bPrice === null) return -1;
  if (aPrice === null && bPrice !== null) return 1;

  return 0;
}

function compareGamingAndRemoteWork(a: RankedProviderPlan, b: RankedProviderPlan) {
  const aLatency = a.estimatedLatencyMs;
  const bLatency = b.estimatedLatencyMs;

  if (typeof aLatency === "number" && typeof bLatency === "number" && aLatency !== bLatency) {
    return aLatency - bLatency;
  }

  if (typeof aLatency === "number" && typeof bLatency !== "number") return -1;
  if (typeof aLatency !== "number" && typeof bLatency === "number") return 1;

  return gamingTransportScore(b) - gamingTransportScore(a) || b.maxUploadMbps - a.maxUploadMbps || b.maxDownloadMbps - a.maxDownloadMbps;
}

function displayScore(provider: ProviderPlan, priority: UserPriority, valueScore: number | null, gamingRank: number) {
  const monthlyPrice = price(provider);

  if (priority === "cheapest") return monthlyPrice !== null ? Math.round(monthlyPrice) : null;
  if (priority === "fastest") return provider.maxDownloadMbps;
  if (priority === "upload") return provider.maxUploadMbps;
  if (priority === "gaming") return typeof provider.estimatedLatencyMs === "number" ? provider.estimatedLatencyMs : gamingRank;
  return valueScore !== null ? Math.round(valueScore * 10) / 10 : null;
}

function displayScoreLabel(
  provider: ProviderPlan,
  priority: UserPriority,
  valueScore: number | null,
  score: number | null,
  gamingRank: number
) {
  if (priority === "cheapest") return price(provider) !== null ? `$${score}/mo` : "Price unavailable";
  if (priority === "fastest") return `${provider.maxDownloadMbps} Mbps down`;
  if (priority === "upload") return `${provider.maxUploadMbps} Mbps up`;
  if (priority === "gaming") {
    return typeof provider.estimatedLatencyMs === "number" ? `${provider.estimatedLatencyMs} ms latency` : `Connection fit ${gamingRank}/7`;
  }
  return valueScore !== null ? `${valueScore.toFixed(1)} Mbps/$` : "Price unavailable";
}

function displayPriceLabel(provider: ProviderPlan) {
  const monthlyPrice = price(provider);
  return monthlyPrice !== null ? `Listed price: $${monthlyPrice}/mo` : "Listed price: unavailable - confirm with provider";
}

function gamingTransportScore(provider: RankedProviderPlan) {
  return transportQuality(provider) * 1000 + provider.maxUploadMbps + provider.maxDownloadMbps / 100;
}

function transportQuality(provider: Pick<RankedProviderPlan, "transportType">) {
  return TRANSPORT_PROFILES[provider.transportType].gamingRank;
}

function price(provider: ProviderPlan) {
  return provider.estimatedMonthlyPrice ?? null;
}

function valueScoreFor(provider: ProviderPlan) {
  const monthlyPrice = price(provider);
  return monthlyPrice !== null ? provider.maxDownloadMbps / Math.max(monthlyPrice, 1) : null;
}

function explain(provider: ProviderPlan, priority: UserPriority, valueScore: number | null, profile: TransportProfile): string {
  const planLabel = provider.planName ? `${provider.name} ${provider.planName}` : `${provider.name} ${profile.label}`;

  if (priority === "fastest") {
    return `${planLabel} ranks highly because it advertises up to ${provider.maxDownloadMbps} Mbps download.`;
  }

  if (priority === "cheapest") {
    const monthlyPrice = price(provider);
    if (monthlyPrice === null) {
      return `${planLabel} does not have listed monthly pricing in the live data yet, so it cannot be confirmed as the cheapest option. Confirm current pricing with the provider.`;
    }
    return `${planLabel} ranks on budget because its listed monthly price is $${monthlyPrice}/mo.`;
  }

  if (priority === "upload") {
    return `${planLabel} stands out for remote work, video calls, streaming, and content creation with up to ${provider.maxUploadMbps} Mbps upload.`;
  }

  if (priority === "gaming") {
    const latencyText = typeof provider.estimatedLatencyMs === "number" ? ` Estimated latency is about ${provider.estimatedLatencyMs} ms.` : "";
    return `${planLabel} uses ${profile.label}, which is ranked for gaming/remote work by latency and connection stability.${latencyText} ${profile.note}`;
  }

  if (valueScore === null) {
    return `${planLabel} is ranked using advertised speed and connection type because live monthly pricing is not available yet. Confirm current pricing before comparing value.`;
  }

  return `${planLabel} has a value score of ${valueScore.toFixed(1)} Mbps per dollar based on ${provider.maxDownloadMbps} Mbps download and $${provider.estimatedMonthlyPrice}/mo pricing.`;
}
