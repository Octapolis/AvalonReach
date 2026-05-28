# Suggestions / Suggested Paths

Last updated: 2026-05-27

## Active Suggestions

### AR-S001 - Make missing price data a first-class live-data state

Source: `../working-notes/daily/2026-05-25.md`  
Related issue: `AR-I001`

Suggestion:

- Add explicit UI copy for plans where monthly price is unavailable.
- Avoid value-score math when price is unavailable.
- For best-value mode, rank by speed and transport quality as a fallback and explain the fallback.

Why:

- Live broadband sources may provide availability and speed but not retail price.
- Clear incomplete-data handling will make the app feel honest instead of broken.

### AR-S002 - Create a 5-10 address live-test checklist

Source: `../working-notes/daily/2026-05-25.md`

Suggestion:

- Test a mix of public/commercial addresses, not private home addresses.
- Include urban, suburban, and rural examples.
- Record source, result count, top provider, data source, visible issue, and screenshot status.

Why:

- The final report needs evidence that the public app was tested beyond one address.
- The checklist will reveal patterns in live-data gaps.

### AR-S003 - Use working notes as the raw input to weekly status reports

Source: `../working-notes/daily/2026-05-25.md`

Suggestion:

- At the end of each week, summarize daily working notes into `week-XX-status.md`.
- Move open blockers into `progress/known-issues.md`.
- Move good future paths into `progress/suggestions.md`.

Why:

- This prevents final-report writing from depending on memory.
- It also creates a reusable project-management loop for future builds.

### AR-S004 - Keep Week 5 dashboard scope lightweight unless Week 4 fixes are done

Source: `../progress/plan-progress.md`

Suggestion:

- Delay heavy account/auth work unless Week 4 live-data fixes are stable.
- Consider an email-based saved-search/demo dashboard instead of full auth if schedule pressure rises.

Why:

- The public app, recommendation clarity, and final-report evidence are more important than an overbuilt dashboard.

### AR-S005 - Use the covenant before major feature decisions

Source: `../working-notes/daily/2026-05-25.md`

Suggestion:

- Before adding a major feature, check whether it supports the covenant mission and ideal customer.
- If a new feature changes the product promise or operating process, update `../project-covenant.md`.

Why:

- The project is becoming both a product and a reusable build engine. The covenant keeps the mission and workflow from drifting as features are added.

### AR-S006 - Keep AI recovery guide current

Source: `../working-notes/daily/2026-05-25.md`

Suggestion:

- Update `../ai-recovery.md` whenever the current week, top issue, live deployment status, or recommended next action changes.

Why:

- If context gets wiped, the recovery guide is the fastest path back to useful work. It must reflect the actual project state, not a stale snapshot.

### AR-S007 - Align Week 4 tuning with fastest-plan MVP framing

Source: `../source-reports/week-03-progress-report-2.md`  
Related issue: `AR-I006`

Suggestion:

- Treat fastest available plan as the official public MVP recommendation promise for course reporting.
- Do not downgrade existing built features.
- Use Week 4 testing to verify the existing modes, then reframe the public copy so fastest-plan is the core MVP story and broader modes are expanded functionality.
- Keep transport type explanations visible because they support the fastest-plan recommendation story.

Why:

- The Week 3 report already submitted a defensible scope-control narrative.
- Aligning the app and docs with that narrative will make the final report cleaner and reduce feature-scope drift.

### AR-S008 - Make Week 4 testing-first before upgrades

Source: `../working-notes/daily/2026-05-25.md`

Suggestion:

- Establish a baseline for existing features before adding Week 4 upgrades.
- Use checks in this order: `npm run typecheck`, `npm run build`, repaired lint, live homepage/results/API/handoff/legal pages, controlled lead capture, then multi-address testing.
- Treat failed baseline checks as fixes before new feature work.
- Track the test plan in `../testing/week-04-existing-feature-test-plan.md`.

Why:

- The live product already exists. Week 4 should stabilize and verify it before expanding.
- This creates stronger final-report evidence and avoids masking existing issues with new work.

### AR-S009 - Keep Get Updates as a future feature, not homepage clutter

Source: `../working-notes/daily/2026-05-27.md`

Suggestion:

- Keep email/update capture available after a search through Save Search.
- Treat broader deal alerts and provider-update notifications as a Week 5/6 retention feature.
- Avoid restoring a full homepage update form while the homepage is being simplified.

Why:

- The homepage should stay search-first and low-clutter.
- Update alerts are still valuable, but they fit better after the user has search context.

### AR-S010 - Add a Help Me Choose guide

Source: `../working-notes/daily/2026-05-27.md`

Suggestion:

- Add a small guided choice tool that asks what matters most: lowest bill, fastest speed, gaming/video calls, uploading/creator work, or unsure.
- Map each answer to an existing priority mode.
- Keep it optional and lightweight, either as a button beside the priority dropdown or as a compact modal.

Why:

- Users may not know whether to choose fastest, cheapest, upload, or gaming.
- A guided picker would make the existing recommendation modes easier without adding new ranking logic.
