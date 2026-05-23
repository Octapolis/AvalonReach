export type UserPriority = "best-value" | "fastest" | "cheapest" | "upload" | "gaming";

export type DataSource = "live" | "sample" | "fallback";

export type TransportType =
  | "fiber"
  | "cable"
  | "fixed-wireless"
  | "5g-home"
  | "dsl"
  | "satellite"
  | "leo-satellite"
  | "unknown";

export type LatencyCategory = "very-low" | "low" | "medium" | "high" | "variable";

export type Provider = {
  providerId: string;
  name: string;
  websiteUrl?: string;
  supportNotes?: string;
};

export type SearchArea = {
  searchAreaId: string;
  input: string;
  zip?: string;
  city?: string;
  state?: string;
  lat?: number;
  lng?: number;
  source: DataSource;
};

export type ProviderPlan = {
  planId?: string;
  providerId?: string | number;
  name: string;
  providerName?: string;
  planName?: string;
  technology: string;
  transportType?: TransportType;
  maxDownloadMbps: number;
  maxUploadMbps: number;
  estimatedMonthlyPrice?: number;
  estimatedLatencyCategory?: LatencyCategory;
  estimatedLatencyMs?: number;
  availabilityArea?: string;
  notes?: string;
  referralUrl: string;
  contractRequired?: boolean;
  source?: DataSource;
};

export type RankedProviderPlan = ProviderPlan & {
  score: number;
  valueScore: number;
  transportType: TransportType;
  transportLabel: string;
  estimatedLatencyCategory: LatencyCategory;
  transportNote: string;
  recommendationReason: string;
};

export type RecommendationResult = {
  priority: UserPriority;
  recommendedPlanId?: string;
  rankedPlans: RankedProviderPlan[];
  explanation: string;
  generatedAt: string;
};

export type LookupNotice = {
  level: "info" | "warning" | "error";
  message: string;
};

export type BroadbandLookupResult = {
  addressLabel: string;
  lat: number;
  lng: number;
  providers: ProviderPlan[];
  source: DataSource;
  notices: LookupNotice[];
};

export type GeocodeResult = {
  addressLabel: string;
  lat: number;
  lng: number;
  zip?: string;
  city?: string;
  state?: string;
};
