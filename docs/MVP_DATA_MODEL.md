# AvalonReach MVP Data Model

This model keeps the Week 2 MVP simple enough to implement quickly while leaving room to normalize FCC and provider data later.

## Core entities

### Provider

Represents the company offering internet service.

Fields:

- `providerId` - internal provider identifier
- `name` - provider/company name
- `websiteUrl` - optional provider website or referral destination
- `supportNotes` - optional provider-level notes

### Internet Plan

Represents one plan available from one provider in a ZIP code or service area.

Fields:

- `planId` - internal plan identifier
- `providerId` - links the plan to a provider
- `providerName` - display name for the provider
- `planName` - display name for the internet plan
- `monthlyPrice` - advertised or estimated monthly price
- `downloadMbps` - advertised max download speed
- `uploadMbps` - advertised max upload speed
- `transportType` - normalized transport category: fiber, cable, fixed wireless, 5G home, DSL, traditional satellite, or LEO satellite
- `estimatedLatencyCategory` - very-low, low, medium, high, or variable
- `estimatedLatencyMs` - optional numeric latency when available
- `availabilityArea` - ZIP code, city, or service-area label
- `notes` - practical caveats or explanation text
- `source` - live, fallback, or sample

### Search Area

Represents a ZIP code or address lookup area.

Fields:

- `searchAreaId` - internal area identifier
- `input` - user-entered ZIP code or address
- `zip` - ZIP code when known
- `city` - optional city
- `state` - optional state
- `lat` / `lng` - coordinates when geocoding succeeds
- `source` - live, fallback, or sample

### Recommendation Result

Represents the ranked result generated for one selected user priority.

Fields:

- `priority` - cheapest, fastest, best value, upload priority, or gaming/remote work
- `recommendedPlanId` - top ranked plan
- `rankedPlans` - ordered list of plans with scores and explanation text
- `explanation` - plain-English reason for the recommendation
- `generatedAt` - timestamp for persisted results

## MVP recommendation rules

- Cheapest: lowest monthly price.
- Fastest: highest download speed.
- Best value: `download Mbps ÷ monthly price`.
- Upload priority: highest upload speed.
- Gaming / remote work: if numeric latency exists, use lowest latency first. Otherwise rank by transport stability: fiber, cable, fixed wireless, 5G home internet, DSL, LEO satellite, traditional satellite.

## FCC normalization notes

FCC National Broadband Map data can later be normalized into this same structure by mapping raw provider and technology fields into `ProviderPlan` records:

1. Normalize provider/company name into `providerName` and `providerId`.
2. Convert FCC technology codes or labels into the project's `TransportType` enum.
3. Map maximum advertised download and upload fields into `maxDownloadMbps` and `maxUploadMbps`.
4. Add pricing from provider APIs, manual research, or curated seed tables because FCC availability data may not include current promotional prices.
5. Attach ZIP, coordinates, census block, or service-area metadata to `availabilityArea` / `SearchArea`.
6. Fill latency from public data if available; otherwise use transport-based latency categories.
7. Mark imported records with `source: "live"` or a more specific future source value if the type is expanded.

This lets the app demonstrate the complete workflow with fallback data now, then swap in normalized FCC/provider records without rewriting the recommendation engine.
