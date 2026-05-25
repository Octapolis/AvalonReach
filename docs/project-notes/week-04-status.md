# Week 4 Status Report

Week start: 2026-05-25  
Status: In progress

## Summary

Week 4 begins with the public Vercel version already launched. The main goal is to test existing live features, fix rough edges, and then move into recommendation-engine upgrades.

The Week 3 course report framed the public MVP around fastest available plan as the single measurable recommendation variable. Since broader priority modes are already built, Week 4 should not remove or downgrade them. The better path is to test what exists, keep working features, and clarify product copy so fastest-plan remains the official MVP story while broader modes are treated as expanded functionality.

## Live Test: 2026-05-25

Test URL: https://avalon-reach.vercel.app/

Test address used: `1400 John F Kennedy Blvd, Philadelphia, PA 19107`  
Reason: public civic/commercial address, not a private home address.

Results:

- Homepage returned HTTP 200 from Vercel.
- Results page rendered for the test address.
- Live lookup geocoded the address to Philadelphia, PA.
- Live broadband lookup returned provider results including Verizon, Xfinity, Hotwire Communications, Starlink, AT&T, HughesNet, T-Mobile, MINTernet, and Viasat.
- Provider handoff route `/go/verizon` returned HTTP 200.
- Privacy and terms pages returned HTTP 200.
- API search endpoint returned HTTP 200 for POST with the test address. A direct GET request returns HTTP 405, which matches the current route implementation.

## Local Baseline Checks: 2026-05-25

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run lint` initially failed before linting code because `next lint` is no longer working with the installed Next version.
- Lint tooling was repaired with an ESLint flat config and `eslint .`; lint now passes.

## Issues Found

- Best-value live results show score/value as `0` when live provider data has no price. The app should display "price unavailable" and avoid pretending Mbps-per-dollar scoring is meaningful without a price.
- The submitted Week 3 report narrows the MVP story to fastest available plan, while current app/docs still contain broader priority-mode language. Existing built modes should be tested and clarified, not removed.
- Lint tooling needed repair before it could be used as a reliable baseline check. This is now fixed.
- Live results can show duplicate providers across technologies, such as Xfinity cable and Xfinity fiber. That may be acceptable, but the UI should make the distinction clearer.
- Provider handoff links route internally, but real referral/provider URLs still need production data.
- Lead form storage was not tested in this pass to avoid creating unnecessary live lead records.

## Week 4 Priorities

1. Finish baseline testing of existing features.
2. Improve missing-price handling in recommendation copy and scoring.
3. Preserve existing recommendation modes while aligning visible language with the fastest-plan MVP framing.
4. Add a small live-test evidence checklist with 5-10 sample searches.
5. Capture screenshots of the live homepage, search results, provider cards, and course-relevant docs.
6. Verify Supabase production tables received search/recommendation rows from live tests.
7. Decide whether lead-capture testing should use a controlled test email or wait until production policy is clearer.

## Testing Plan

The detailed Week 4 existing-feature checklist is tracked in `docs/project-notes/testing/week-04-existing-feature-test-plan.md`.

Priority matrix baseline result:

- `fastest`, `upload`, and `gaming` rank sensibly for the public Philadelphia baseline address.
- `best-value` fails clarity because missing price data produces score `0` and `0.0 Mbps per dollar`.
- `cheapest` needs missing-price handling because all prices are unavailable, so the mode cannot honestly rank by budget yet.
- Local fix completed: best-value and cheapest now show `Price unavailable` and explanatory copy instead of fake zero-value scores. Public deployment still needs retest after the fix is published.
- Local price clarity fix completed: result cards now show a dedicated listed-price line, either `$X/mo` or unavailable/confirm-with-provider. Public deployment still needs retest after the fix is published.
- Local duplicate-provider label fix completed: no-plan live results now headline provider plus transport type, such as `Xfinity Cable / DOCSIS` and `Xfinity Fiber / FTTP`. Public deployment still needs retest after the fix is published.
- Local provider handoff clarity fix completed: `/go/[provider]` now states referral links are not live yet and tells users to confirm availability, prices, promos, fees, and installation details directly with the provider. Public deployment still needs retest after the fix is published.

## Next Step

Decide the controlled lead-capture test email, then deploy/retest the missing-price, price-line, duplicate-provider-label, and handoff-clarity fixes on the live site.
