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
      const monthlyPrice = provider.estimatedMonthlyPrice ?? Number.POSITIVE_INFINITY;
      const transportType = provider.transportType ?? classifyTransport(provider.technology);
      const profile = TRANSPORT_PROFILES[transportType];
      const valueScore = provider.maxDownloadMbps / Math.max(monthlyPrice, 1);

      return {
        ...provider,
        providerName: provider.providerName ?? provider.name,
        transportType,
        transportLabel: profile.label,
        estimatedLatencyCategory: provider.estimatedLatencyCategory ?? profile.latencyCategory,
        transportNote: profile.note,
        valueScore,
        score: displayScore(provider, priority, valueScore, profile.gamingRank),
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
  if (priority === "cheapest") return price(a) - price(b) || b.maxDownloadMbps - a.maxDownloadMbps;
  if (priority === "fastest") return b.maxDownloadMbps - a.maxDownloadMbps || b.maxUploadMbps - a.maxUploadMbps;
  if (priority === "upload") return b.maxUploadMbps - a.maxUploadMbps || b.maxDownloadMbps - a.maxDownloadMbps;
  if (priority === "gaming") return compareGamingAndRemoteWork(a, b);
  return b.valueScore - a.valueScore || price(a) - price(b);
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

function displayScore(provider: ProviderPlan, priority: UserPriority, valueScore: number, gamingRank: number) {
  if (priority === "cheapest") return Number.isFinite(price(provider)) ? Math.round(price(provider)) : 0;
  if (priority === "fastest") return provider.maxDownloadMbps;
  if (priority === "upload") return provider.maxUploadMbps;
  if (priority === "gaming") return typeof provider.estimatedLatencyMs === "number" ? provider.estimatedLatencyMs : gamingRank;
  return Math.round(valueScore * 10) / 10;
}

function gamingTransportScore(provider: RankedProviderPlan) {
  return TRANSPORT_PROFILES[provider.transportType].gamingRank * 1000 + provider.maxUploadMbps + provider.maxDownloadMbps / 100;
}

function price(provider: ProviderPlan) {
  return provider.estimatedMonthlyPrice ?? Number.POSITIVE_INFINITY;
}

function explain(provider: ProviderPlan, priority: UserPriority, valueScore: number, profile: TransportProfile): string {
  const planLabel = provider.planName ? `${provider.name} ${provider.planName}` : provider.name;

  if (priority === "fastest") {
    return `${planLabel} ranks highly because it advertises up to ${provider.maxDownloadMbps} Mbps download.`;
  }

  if (priority === "cheapest") {
    const priceText = Number.isFinite(price(provider)) ? `$${provider.estimatedMonthlyPrice}/mo` : "price not listed";
    return `${planLabel} ranks on budget because its listed monthly price is ${priceText}.`;
  }

  if (priority === "upload") {
    return `${planLabel} stands out for remote work, video calls, streaming, and content creation with up to ${provider.maxUploadMbps} Mbps upload.`;
  }

  if (priority === "gaming") {
    const latencyText = typeof provider.estimatedLatencyMs === "number" ? ` Estimated latency is about ${provider.estimatedLatencyMs} ms.` : "";
    return `${planLabel} uses ${profile.label}, which is ranked for gaming/remote work by latency and connection stability.${latencyText} ${profile.note}`;
  }

  return `${planLabel} has a value score of ${valueScore.toFixed(1)} Mbps per dollar based on ${provider.maxDownloadMbps} Mbps download and $${provider.estimatedMonthlyPrice ?? "unknown"}/mo pricing.`;
}
