# AvalonReach Project Covenant

Purpose: preserve the mission, customer promise, operating rules, and documentation engine for AvalonReach so the project can be continued, audited, reset, or replicated without losing its north star.

## Mission

AvalonReach helps people choose internet service with less confusion, less sales fog, and more practical context.

The project exists to turn an address-based broadband search into a plain-English decision aid: what options appear available, what tradeoffs matter, and which plan best fits the user's priorities.

## Ideal Customer

AvalonReach is for people who need internet service but do not want to decode provider marketing pages one by one.

Primary customers:

- Someone moving to a new address and trying to choose internet before they arrive.
- A current customer wondering if there is a better plan nearby.
- A remote worker or student who needs reliable video calls, upload, and uptime.
- A gamer, streamer, or creator who cares about latency, speed, and upload performance.
- A rural or edge-market customer comparing cable, fixed wireless, 5G, satellite, or LEO satellite options.

## Customer Problem

Choosing home internet is harder than it should be because:

- Availability changes by address.
- Provider sites are biased toward their own plans.
- Advertised download speed does not explain upload, latency, or reliability.
- Pricing, promos, contracts, equipment fees, and availability are inconsistent.
- Rural and edge-market options can involve confusing tradeoffs between wired, wireless, and satellite technologies.

## Promise

AvalonReach should help users answer:

- What internet options may be available at this address?
- Which option looks fastest?
- Which option looks cheapest?
- Which option looks best for the money?
- Which option is better for gaming, remote work, uploads, or reliability?
- What information still needs to be confirmed with the provider?

AvalonReach should be honest when data is incomplete. If pricing is missing, the app should say so. If availability must be confirmed, the app should say so. Trust matters more than pretending the data is perfect.

## Product Principles

1. **Transparent beats magical.** The first recommendation engine should use explainable rules, not vague AI claims.
2. **Useful with imperfect data.** The app should still work with fallback/sample data, but clearly label uncertainty.
3. **Address-first.** Availability and recommendations should always be grounded in a searched place.
4. **Tradeoffs matter.** Speed alone is not enough; technology type, upload, latency, and price all matter.
5. **Launch early, then test.** A public V1 reveals real issues faster than endless local polishing.
6. **Document the trail.** Record attempts, failures, blockers, decisions, and fixes as they happen.
7. **Course and product both count.** The project must satisfy CMIT 450 while also becoming a credible portfolio/product artifact.

## What AvalonReach Is Not

- Not a provider marketing site.
- Not a guaranteed availability or pricing authority.
- Not a full commercial affiliate engine yet.
- Not an AI-first product until the basic comparison and recommendation flow is trustworthy.
- Not a place to hide uncertainty behind confident wording.

## Current Course/Product Scope

Core scope:

1. Address search.
2. Provider results.
3. Priority-based recommendation.
4. Lead capture.
5. Persistence/database structure.
6. Public deployment.
7. Saved/dashboard or equivalent retention flow.
8. Referral/admin-ready provider workflow.
9. Final documentation and presentation.

Stretch scope:

- AI recommendation assistant.
- Local market landing pages.
- Provider enrichment.
- Better referral/affiliate integration.
- Deal alerts.

## Documentation Engine

AvalonReach has four documentation layers:

0. **AI recovery:** `ai-recovery.md`
   - Fast context restoration after memory loss, context wipe, or handoff.
1. **Covenant:** `project-covenant.md`
   - Mission, customer, promise, principles, and operating rules.
2. **Daily working notes:** `working-notes/daily/YYYY-MM-DD.md`
   - Raw project trail: actions, tests, failed paths, blockers, decisions, and next steps.
3. **Progress trackers:** `progress/`
   - `plan-progress.md`: current project status against the roadmap.
   - `known-issues.md`: bugs, blockers, gaps, and verification needs.
   - `suggestions.md`: possible fixes, paths, and improvements.
4. **Weekly status reports:** `week-XX-status.md`
   - Polished summaries for CMIT 450, final report, and portfolio reuse.

## Update Rule

When work happens:

1. Write the raw action/result in the daily working note.
2. If a bug or blocker appears, update `progress/known-issues.md`.
3. If a possible path appears, update `progress/suggestions.md`.
4. If milestone status changes, update `progress/plan-progress.md`.
5. If the work changes the mission, customer, scope, or operating rules, update this covenant.
6. At week close or milestone close, summarize into the weekly status report.

## Reset Rule

If the project gets confused, restart from this sequence:

1. Read `ai-recovery.md`.
2. Read this covenant.
3. Read `progress/plan-progress.md`.
4. Read open items in `progress/known-issues.md`.
5. Read active items in `progress/suggestions.md`.
6. Read the latest daily working note.
7. Choose the next action that advances the current week milestone.

## Definition of Success

For CMIT 450:

- A public, working web app exists.
- The app demonstrates address search, provider comparison, recommendation logic, and lead capture.
- The final report can show staged progress, screenshots, code artifacts, testing, and lessons learned.

For portfolio/resume:

- AvalonReach can be described as a deployed Next.js/TypeScript product MVP with transparent recommendation logic, Supabase-ready data modeling, Vercel deployment, and documented live testing.

For future process:

- The project leaves behind a reusable build structure: covenant, roadmap, daily notes, progress trackers, weekly reports, and process map.
