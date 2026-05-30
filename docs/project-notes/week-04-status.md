# Week 4 Status Report

Week start: 2026-05-25  
Status: In progress

## Summary

Week 4 begins with the public Vercel version already launched. The main goal is to test existing live features, fix rough edges, and then move into recommendation-engine upgrades.

The Week 3 course report framed the public MVP around fastest available plan as the single measurable recommendation variable. Since broader priority modes are already built, Week 4 should not remove or downgrade them. The better path is to test what exists, keep working features, and clarify product copy so fastest-plan remains the official MVP story while broader modes are treated as expanded functionality.

## Live Retest: 2026-05-26

Test URL: https://avalon-reach.vercel.app/

Test address used: `1400 John F Kennedy Blvd, Philadelphia, PA 19107`  
Reason: public civic/commercial address, not a private home address.

Results:

- Production smoke test passed with `npm run smoke:deploy`.
- Homepage, results page, provider handoff, privacy page, and terms page returned HTTP 200.
- `GET /api/search` returned HTTP 405, matching the POST-only route design.
- `POST /api/search` returned HTTP 200 and 11 provider results for all five priority modes.
- Best-value now shows `Price unavailable` instead of fake `0.0 Mbps per dollar` copy when live pricing is missing.
- Cheapest now says it cannot be confirmed as cheapest without listed monthly pricing.
- Result cards show `Listed price: unavailable - confirm with provider`.
- Duplicate provider/technology variants are distinguishable, including `Xfinity Cable / DOCSIS` and `Xfinity Fiber / FTTP`.
- `/go/verizon` explains AvalonReach does not have a live referral link yet and instructs users to confirm availability, monthly price, promos, fees, and installation details directly with the provider.

Priority retest summary:

| Priority | Top result | Production result |
| --- | --- | --- |
| Best overall | Verizon Fiber | Pass: missing price handled honestly. |
| Fastest speed | Verizon Fiber | Pass: `2300 Mbps down`. |
| Cheapest | Verizon Fiber | Pass: no longer presented as confirmed cheapest without price. |
| Best upload | Verizon Fiber | Pass: `2300 Mbps up`. |
| Gaming / low-lag | Verizon Fiber | Pass: `Connection fit 7/7`; copy can still improve later. |

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

- Best-value live results previously showed score/value as `0` when live provider data had no price. Fixed and verified on production 2026-05-26.
- The submitted Week 3 report narrows the MVP story to fastest available plan, while current app/docs still contain broader priority-mode language. Existing built modes should be tested and clarified, not removed.
- Lint tooling needed repair before it could be used as a reliable baseline check. This is now fixed.
- Live results can show duplicate providers across technologies, such as Xfinity cable and Xfinity fiber. This is acceptable for MVP now that the UI labels the technology distinction clearly.
- Provider handoff links route internally, but real referral/provider URLs still need production data. The current MVP behavior is acceptable because the handoff page now states the referral link is not live yet.
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
- `best-value` and `cheapest` previously failed clarity because missing prices produced zero-value style copy. Fixed and verified on production 2026-05-26.
- Result cards now show a dedicated listed-price line, either `$X/mo` or unavailable/confirm-with-provider. Verified on production 2026-05-26.
- No-plan live results now headline provider plus transport type, such as `Xfinity Cable / DOCSIS` and `Xfinity Fiber / FTTP`. Verified on production 2026-05-26.
- `/go/[provider]` now states referral links are not live yet and tells users to confirm availability, prices, promos, fees, and installation details directly with the provider. Verified on production 2026-05-26.

## Next Step

Decide the controlled lead-capture test email, verify production Supabase writes, and run the multi-address public evidence pass.

## Deployment Status Update: 2026-05-30

Alex reported production still appeared stuck on an older version. Investigation found `public/main` was already at `798e453`, but `private/main` was still behind at `415ebcf`. Pushing `798e453` to `private/main` caused production to update; the homepage no longer showed old-build indicators such as the `Updates` nav link and `Example recommendation` card.

Production smoke passed after the update with:

```bash
npm run smoke:deploy
```

Until Vercel's connected repository is confirmed, deployment-ready commits should be pushed to both `public/main` and `private/main`.
