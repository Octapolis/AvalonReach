# AvalonReach Project Clarifications and Week 2 Direction

## Recommendation Algorithm Definition

For the first production version of AvalonReach, the recommendation engine will intentionally use simple and transparent logic rather than a complex machine learning system. The purpose is to create a recommendation system that users can easily understand while still producing useful and realistic results.

The first version of the recommendation system will include the following categories:

### Cheapest

Selects the internet plan with the lowest monthly price.

### Fastest

Selects the plan with the highest advertised download speed.

### Best Value

Calculates a value score using:

`Value Score = Download Speed (Mbps) ÷ Monthly Price`

The highest Mbps-per-dollar score will rank highest.

### Upload Priority

Selects the plan with the highest upload speed, which is important for remote work, streaming, video calls, and content creation.

### Gaming / Remote Work

Prioritizes low-latency and stable connection types. Fiber will rank highest where available, followed by cable, fixed wireless, 5G home internet, and satellite options.

## Connection Transport Type Classification

A major feature of the system will be displaying and explaining internet transport or connection type. This is important because internet plans with similar advertised speeds can perform very differently in real-world use.

The system will clearly identify connection technologies such as:

- Fiber-to-the-Premises (FTTP / Fiber)
- Cable / DOCSIS
- Fixed Wireless
- 5G Home Internet
- DSL
- Traditional Satellite
- Low Earth Orbit (LEO) Satellite such as Starlink

The recommendation system will use connection type as part of the ranking and explanation logic.

Examples:

- Fiber connections will generally rank highest for reliability, upload performance, and low latency.
- Cable may provide strong download speeds but often lower upload performance.
- Fixed wireless and 5G may vary depending on signal quality and congestion.
- Satellite services may provide rural coverage advantages but can have higher latency and weather sensitivity.
- LEO satellite systems such as Starlink may perform better than traditional satellite systems but can still experience obstruction and environmental limitations.

The goal is not only to recommend the cheapest or fastest plan, but also to provide practical real-world context to help users understand the tradeoffs between technologies.

## MVP Data Model and Implementation Artifacts

The MVP data structure is documented in `docs/MVP_DATA_MODEL.md` and implemented in `lib/types.ts`.

Current TypeScript model includes:

- `Provider` for company-level provider information.
- `ProviderPlan` for individual plans with provider name, plan name, price, download speed, upload speed, transport type, latency estimate, availability area, and notes.
- `SearchArea` for ZIP/address lookup areas.
- `RecommendationResult` for ranked recommendation output.

The curated fallback dataset lives in `data/sample-results.ts` and includes at least 10 plans across fiber/FTTP, cable/DOCSIS, fixed wireless, 5G home internet, DSL, LEO satellite, and traditional satellite.

The recommendation function lives in `lib/recommendation.ts`:

- `rankProviders(plans, priority)` returns ranked plan cards for the UI.
- `recommendPlans(plans, priority)` returns a recommendation result object with the selected top plan, ranked plans, explanation, and generated timestamp.

## FCC Data and Fallback Plan

The system is planned to eventually utilize publicly available broadband availability datasets from the FCC National Broadband Map and other public sources.

However, if FCC data normalization or provider integration takes longer than expected during the course timeline, the project will use a curated fallback dataset for selected ZIP codes or service areas.

The fallback dataset will contain manually structured provider information including:

- Provider name
- Monthly price
- Download speed
- Upload speed
- Transport type
- Estimated latency category
- Availability area
- Plan notes

This fallback approach ensures the website can still demonstrate the complete intended user workflow:

- Address or ZIP search
- Provider comparison
- Recommendation generation
- Database integration
- Public deployment
- User interaction and filtering

This allows the project to remain fully functional and deployable even if live provider integrations are not completed during the initial seven-week development period.

## Week 2 Implementation Checklist

- [x] Define the simplest MVP recommendation rules.
- [x] Define transport type taxonomy and explanation logic.
- [x] Add TypeScript interfaces for providers, plans, search areas, and recommendation results.
- [x] Create curated fallback data with 10+ plans across multiple transport types.
- [x] Implement recommendation function for selected priority.
- [x] Update results UI to show plan name, transport type, latency, and explanation.
- [x] Connect Supabase integration structure for leads/searches/saved recommendation results using the public client.
- [x] Document/add Supabase schema for providers, plans, search areas, recommendations, leads, searches, and provider links.
- [x] Keep fallback behavior available before live database reads are complete.
- [x] Add Week 2 digital evidence checklist for screenshots.
- [ ] Test ZIP/address fallback behavior with 5-10 sample searches.
- [ ] Write the Week 2 progress post/update for CMIT 450.

## Week 3 Implementation Checklist

- [ ] Deploy MVP to Vercel.
- [ ] Configure production environment variables.
- [ ] Confirm full user flow: ZIP/address search, plan cards, priority selection, recommendation, lead capture, provider handoff.
- [ ] Keep fallback data clearly labeled when live FCC/provider data is incomplete.
- [ ] Capture screenshots for course submission.
- [ ] Add light production polish: mobile layout, empty/error states, privacy/terms review, and basic analytics/logging if available.

## FCC Data Normalization Notes

FCC broadband data can be normalized into the same `ProviderPlan` structure later:

1. Provider name/provider ID maps to `providerName` and `providerId`.
2. FCC technology code or label maps to `transportType` and display `technology`.
3. Maximum advertised downstream maps to `maxDownloadMbps`.
4. Maximum advertised upstream maps to `maxUploadMbps`.
5. Census block, coordinate, ZIP, or service area maps to `availabilityArea` and future `SearchArea` records.
6. Pricing usually needs enrichment from provider sites, APIs, affiliate feeds, or manual seed data because FCC availability data may not include current plan prices.
7. Latency can come from future measured/public datasets; until then, the app uses transport-based `estimatedLatencyCategory`.

Because the fallback and FCC-normalized records share the same shape, the recommendation engine and UI should not need major rewrites when live data improves.

## Overall Development Philosophy

The goal of the first version of AvalonReach is to create a practical, understandable, and publicly deployable MVP rather than attempting to solve every broadband comparison challenge immediately.

The initial focus is:

- Clear provider comparison
- Transparent recommendation logic
- Real-world usability
- Public deployment
- Expandable system architecture

Additional features and deeper integrations can continue after the course concludes.
