# AvalonReach Remaining Tasks And Testing Work

Last updated: 2026-05-26  
Live site: https://avalon-reach.vercel.app/  
Intended Drive folder: https://drive.google.com/drive/folders/1BqXANTIw5LQAH6WaPfGdoYQ0RohE2oC-

## Current MVP Verdict

AvalonReach is acceptable for the core MVP demo/search flow.

The live app can load publicly, accept a search, return provider results, show priority-based recommendations, explain missing price data honestly, distinguish similar provider/technology results, and route users to an honest provider handoff page.

The remaining minimum work is mostly evidence and verification, not emergency app repair.

## Verified Working On Production

Verified on 2026-05-26 against `https://avalon-reach.vercel.app/`.

- Production smoke test passed with `npm run smoke:deploy`.
- Homepage, results page, provider handoff page, privacy page, and terms page returned HTTP 200.
- `GET /api/search` returned HTTP 405, matching the POST-only API design.
- `POST /api/search` returned HTTP 200 and 11 provider results for the public Philadelphia baseline address.
- All five priority modes returned usable results:
  - Best overall
  - Fastest speed
  - Cheapest
  - Best upload
  - Gaming / low-lag
- Best overall no longer shows fake `0.0 Mbps per dollar` copy when live price data is missing.
- Cheapest no longer presents missing prices as confirmed cheap options.
- Result cards show `Listed price: unavailable - confirm with provider` when live pricing is missing.
- Duplicate-looking Xfinity entries are now distinguishable as `Xfinity Cable / DOCSIS` and `Xfinity Fiber / FTTP`.
- `/go/verizon` explains AvalonReach does not have a live referral link yet and tells users to confirm availability, monthly price, promos, fees, and installation details directly with the provider.

## Fixed Issues

These issues were moved to fixed or fixed-for-MVP after production retesting.

| Issue | Status | Notes |
| --- | --- | --- |
| AR-I001 missing-price scoring | Fixed | Best-value and cheapest now show `Price unavailable` instead of fake zero-value scoring. |
| AR-I002 duplicate provider/technology labels | Fixed | Provider cards now distinguish technology variants. |
| AR-I003 provider handoff clarity | Fixed for MVP | Real referral data is future work, but the current handoff is honest enough for MVP. |
| AR-I007 lint script failure | Fixed | `npm run lint`, `npm run typecheck`, and `npm run build` pass. |
| AR-I008 visible price status line | Fixed | Result cards now explicitly show whether a price is listed or unavailable. |

## Remaining Minimum Tasks

These are the items still needed to make the project review-ready.

### 1. Verify Production Supabase Behavior

Status: Open  
Issue: AR-I004  
Minimum needed: prove production reads/writes work or explicitly document that production storage is deferred.

Tasks:

- Confirm production environment variables point to the intended Supabase project.
- Verify search/recommendation writes from live tests.
- Verify catalog/provider reads if production data is configured.
- Record proof in project notes.

Acceptance evidence:

- Screenshot or terminal output showing expected Supabase rows after a live test.
- Note in `known-issues.md` marking the result as verified or deferred.

### 2. Run One Controlled Lead-Capture Test

Status: Blocked on test email decision  
Issue: AR-I005  
Minimum needed: one approved test submission or explicit deferral.

Tasks:

- Pick a controlled test email.
- Submit exactly one production lead capture test.
- Verify the API response.
- Verify the row appears in Supabase.
- Record whether `stored` is true.

Suggested test payload:

```json
{
  "email": "controlled-test@example.com",
  "zip": "1400 John F Kennedy Blvd, Philadelphia, PA 19107",
  "intent": "results",
  "consent": "yes"
}
```

Do not run this until Alex approves the test email.

### 3. Align MVP Framing With Existing Features

Status: Open  
Issue: AR-I006  
Minimum needed: final report and visible product story should not contradict each other.

Current situation:

- The Week 3 progress report frames the MVP around fastest available internet plan.
- The app already includes broader priority modes: best overall, cheapest, upload, and gaming.
- Those modes should not be removed just to match the report.

Recommended framing:

AvalonReach's official course MVP is the fastest-plan recommendation flow. The additional priority modes are expanded functionality already implemented and currently being tested/refined.

Tasks:

- Use the fastest-plan flow as the main final-report story.
- Mention broader priority modes as working expanded features.
- Clean up any UI/docs language that makes the MVP sound broader than the course milestone requires.

### 4. Run Multi-Address Evidence Pass

Status: Pending  
Minimum needed: test at least five public, non-private addresses.

Use civic, commercial, campus, library, or public landmark addresses. Avoid private homes.

Suggested coverage:

| Category | Purpose | Status |
| --- | --- | --- |
| Urban baseline | Already tested with Philadelphia public address. | Started |
| Dense urban | Confirm many-provider behavior. | Pending |
| Suburban | Confirm cable/fiber/fixed wireless mix. | Pending |
| Rural | Confirm satellite/fixed wireless behavior. | Pending |
| Small city or campus/public institution | Capture varied public evidence. | Pending |

For each address, record:

- Address label.
- Priority mode tested.
- Provider count.
- Top three providers.
- Whether pricing is listed or unavailable.
- Whether duplicate-provider/technology labels are clear.
- Whether notices and recommendation reasons make sense.
- Screenshot captured: yes/no.
- New issue created or updated: yes/no.

### 5. Capture Review Screenshots

Status: Pending  
Minimum needed: enough screenshots to show a working deployed product.

Recommended screenshots:

- Live homepage.
- Search form with public test address.
- Results page with provider cards.
- Result card showing unavailable price handling.
- Xfinity technology label example.
- Provider handoff page showing no-live-referral copy.
- Smoke test terminal output.
- Supabase verification output or deferral note.

## Feature Work After Minimum Review Bar

These are good next features after the evidence/verification pass is stable.

### Recommendation Engine V2

- Improve scoring explanations for every priority mode.
- Make gaming/low-lag language more concrete.
- Add clearer fallback behavior when price, latency, upload, or provider plan names are missing.
- Consider showing confidence levels based on data completeness.

### Production Provider Handoff Data

- Add real provider URLs or referral URLs when ready.
- Store handoff data in the `provider_links` table.
- Track whether a provider URL is live, generic, or unavailable.

### Better Live/Fallback Data Notices

- Make it obvious when results are using live broadband availability data versus fallback/sample catalog data.
- Explain that live availability may not include current pricing or promos.

### Dashboard And Admin Review

- Build out the dashboard placeholder.
- Add basic views for searches, captured leads, and provider data health.

## Immediate Next Action

Choose the controlled lead-capture test email.

After that:

1. Run the lead-capture production test.
2. Verify Supabase rows.
3. Run the multi-address evidence pass.
4. Capture screenshots.
5. Update final report framing.

## Drive Storage Plan

This document should be mirrored into Alex's shared AVA Google Drive folder once Google Drive write access is connected:

https://drive.google.com/drive/folders/1BqXANTIw5LQAH6WaPfGdoYQ0RohE2oC-

Suggested Drive filename:

`AvalonReach - Remaining Tasks and Testing Work`
