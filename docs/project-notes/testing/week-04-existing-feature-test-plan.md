# Week 4 Existing Feature Test Plan

Purpose: finish testing the built AvalonReach feature set before starting Week 4 upgrades.

Rule: do not remove or downgrade existing features just to match the Week 3 report. Test what exists, fix broken behavior, then tune or expand.

## Current Test Status

Last updated: 2026-05-25

Summary:

- Local baseline gates pass.
- Live smoke routes pass.
- Priority matrix has been run once against the baseline public address.
- Missing-price behavior is fixed locally and needs deployment before live retest.
- Duplicate provider/technology card labels are fixed locally and need deployment before live retest.
- Provider handoff clarity is fixed locally and needs deployment before live retest.
- Price status line is fixed locally and needs deployment before live retest.
- Lead capture remains blocked on a controlled test email.

## Phase 1 - Local Baseline Gates

Status: Complete

| Check | Command | Status | Notes |
| --- | --- | --- | --- |
| TypeScript | `npm run typecheck` | Pass | No TypeScript errors. |
| Production build | `npm run build` | Pass | Next build completes. |
| Lint | `npm run lint` | Pass | Repaired script from `next lint` to `eslint .`; added `eslint.config.mjs`; fixed layout links. |
| Deployment smoke | `npm run smoke:deploy -- <base-url>` | Added locally | Verifies the post-deploy fixes against live or local base URL. |

## Phase 2 - Live Smoke Routes

Status: Mostly complete

Test URL: https://avalon-reach.vercel.app/  
Baseline address: `1400 John F Kennedy Blvd, Philadelphia, PA 19107`

| Area | Route / Action | Status | Notes |
| --- | --- | --- | --- |
| Homepage | `/` | Pass | HTTP 200. |
| Results page | `/results?address=...&priority=fastest` | Pass | HTTP 200 and rendered. |
| Search API | `POST /api/search` | Pass | HTTP 200 with provider results. |
| Search API GET | `GET /api/search` | Expected 405 | Route is POST-only. |
| Provider handoff | `/go/verizon` | Pass | HTTP 200. |
| Privacy | `/privacy` | Pass | HTTP 200. |
| Terms | `/terms` | Pass | HTTP 200. |

## Phase 3 - Priority Mode Matrix

Status: Started

Run each priority mode against the same public baseline address first. Then repeat any suspicious mode with at least one additional address.

| Priority | UI value | API value | Expected behavior | Status |
| --- | --- | --- | --- | --- |
| Best overall | Best overall | `best-value` | Ranks by value when price exists; must explain missing prices honestly. | Fixed locally / retest after deploy |
| Fastest speed | Fastest speed | `fastest` | Highest download speed should rank first. | Pass |
| Cheapest | Cheapest | `cheapest` | Lowest listed price should rank first; missing prices should not look like free service. | Fixed locally / retest after deploy |
| Best upload | Best upload | `upload` | Highest upload speed should rank first. | Pass |
| Gaming / low-lag | Gaming / low-lag | `gaming` | Lowest latency or best transport profile should rank first. | Pass / copy can improve |

Evidence to record:

- Top provider.
- Top technology.
- Top download/upload speed.
- Whether price is listed.
- Whether score/reason text makes sense.
- Any duplicate-provider confusion.

Baseline run: 2026-05-25, address `1400 John F Kennedy Blvd, Philadelphia, PA 19107`

| Priority | Top result | Top score | Result |
| --- | --- | --- | --- |
| `best-value` | Verizon Fiber, 2300/2300 Mbps | `0` | Fails clarity: says `0.0 Mbps per dollar` with unknown pricing. |
| `fastest` | Verizon Fiber, 2300/2300 Mbps | `2300` | Pass. |
| `cheapest` | Verizon Fiber, 2300/2300 Mbps | `0` | Needs fix: all prices missing, so ranking falls back to speed but copy says price not listed. |
| `upload` | Verizon Fiber, 2300/2300 Mbps | `2300` | Pass. |
| `gaming` | Verizon Fiber, 2300/2300 Mbps | `7` | Pass by transport profile, but score label could be clearer. |

Local fix verification: 2026-05-25

| Priority | Top result | Score label | Result |
| --- | --- | --- | --- |
| `best-value` | Verizon Fiber, 2300/2300 Mbps | `Price unavailable` | Pass locally. Copy explains ranking uses advertised speed and connection type until pricing is confirmed. |
| `cheapest` | Verizon Fiber, 2300/2300 Mbps | `Price unavailable` | Pass locally. Copy says it cannot be confirmed as cheapest without listed monthly pricing. |

## Phase 4 - Data Behavior Checks

Status: Pending

| Behavior | What to confirm | Status |
| --- | --- | --- |
| Missing prices | UI does not show fake `0` score or fake Mbps-per-dollar when price is unknown. | Fixed locally; retest on live after deployment |
| Price line clarity | Every card explicitly says whether a listed monthly price exists. | Fixed locally; retest on live after deployment |
| Duplicate providers | Same provider across technologies is either clearly labeled or grouped later. | Fixed locally; retest on live after deployment |
| Transport labels | Fiber, Cable, Fixed Wireless, Satellite, and LEO Satellite display understandable labels. | Pending |
| Live/fallback notices | Notice text clearly explains data limitations. | Pending |
| Provider links | Links work and are clearly demo/generic until production referral URLs are ready. | Fixed locally; retest on live after deployment |

## Phase 5 - Lead Capture Test

Status: Blocked on test email decision

Required before testing production lead capture:

- Pick a controlled test email.
- Submit exactly one production lead test.
- Verify API response.
- Verify Supabase row exists.
- Record whether `stored` is true.

API shape:

```json
{
  "email": "test@example.com",
  "zip": "1400 John F Kennedy Blvd, Philadelphia, PA 19107",
  "intent": "results",
  "consent": "yes"
}
```

Do not run this against production until Alex approves the test email.

## Phase 6 - Multi-Address Evidence Pass

Status: Pending

Use public, non-private addresses. Prefer civic, commercial, campus, library, or public landmark addresses.

Suggested address mix:

| Label | Address | Reason | Status |
| --- | --- | --- | --- |
| Urban baseline | `1400 John F Kennedy Blvd, Philadelphia, PA 19107` | Public civic/commercial address already tested. | Started |
| Dense urban | TBD | Test many-provider market. | Pending |
| Suburban | TBD | Test cable/fiber/fixed wireless mix. | Pending |
| Rural | TBD | Test satellite/fixed wireless behavior. | Pending |
| Small city | TBD | Test mid-market availability. | Pending |
| Campus/public institution | TBD | Public address, useful for screenshots. | Pending |

For each address record:

- Address label.
- Priority tested.
- Provider count.
- Top three providers.
- Missing price behavior.
- Duplicate provider behavior.
- Notices shown.
- Screenshot captured: yes/no.
- Issue created or updated: yes/no.

## Completion Criteria

Testing is complete enough to start Week 4 upgrades when:

- Local lint/typecheck/build all pass.
- Live smoke routes pass.
- All five priority modes have been tested at least once. Complete for baseline address; repeat after deploying AR-I001 fix.
- Missing-price behavior is either fixed or clearly tracked as the first upgrade.
- Lead capture has either been tested with an approved test email or explicitly deferred.
- At least five public addresses have been tested and documented.
- Known issues and suggestions are updated from the test results.

## Post-Deploy Smoke Script

After Vercel deploys the latest GitHub commit, run:

```bash
npm run smoke:deploy
```

To test a local server instead:

```bash
npm run dev -- --hostname 127.0.0.1 --port 3015
npm run smoke:deploy -- http://127.0.0.1:3015
```

The smoke script checks:

- homepage/results/legal/handoff routes
- POST-only search API behavior
- missing-price score labels
- explicit listed-price lines
- duplicate provider technology labels
- provider handoff honesty copy
