# Week 3 Working Notes

Week start: 2026-05-18  
Theme: public V1 launch and production setup

Daily source notes:

- `daily/2026-05-23.md`
- `../source-reports/week-03-progress-report-2.md`

This file is a week-level rollup. Going forward, add raw entries to `daily/YYYY-MM-DD.md` first, then summarize here if useful.

## 2026-05-23 - Public Vercel Launch

Context:

- The project needed to move from local/demo state to a public URL before the final course stretch.
- The launch goal was a usable public V1, not a fully completed commercial product.

Actions tried:

- Deployed AvalonReach to Vercel.
- Kept the main app flow intact: homepage, address search, results, lead capture, privacy/terms, and provider handoff route.
- Used existing fallback/sample data path so the app remained demonstrable even when live data was incomplete.

Result:

- Public app launched at https://avalon-reach.vercel.app/.
- This created a stable live artifact for testing, screenshots, and course evidence.

Issue / blocker:

- Manual testing was still limited immediately after launch.
- Provider/pricing data was not fully production-ready.
- Real referral/provider links were not yet configured.

Decision:

- Treat Week 3 as the public launch milestone.
- Move detailed live testing and recommendation cleanup into Week 4.

Next:

- Test the public app with real but non-private sample addresses.
- Capture launch screenshots.
- Record any live-data issues in Week 4 notes.

## 2026-05-23 - Supabase Catalog / Fallback Path

Context:

- The app needed a durable catalog direction so fallback results could eventually be managed through Supabase instead of only static TypeScript sample data.

Actions tried:

- Added/kept Supabase schema direction.
- Added sample catalog seed data.
- Aligned environment setup for Supabase/Vercel.
- Connected fallback behavior to the Supabase catalog path where available.

Result:

- The project has a clearer path for managing provider/plan data.
- Relevant commits:
  - `58e4246 Align Supabase env setup`
  - `3be052f Add Supabase sample catalog seed`
  - `5363eff Use Supabase catalog for fallback results`

Issue / blocker:

- Production Supabase behavior still needs verification against live tables.
- Pricing/live availability data is still incomplete.

Decision:

- Keep fallback data as a deliberate MVP safety layer.
- Do not block public deployment on perfect provider-data integration.

Next:

- Verify production Supabase inserts/reads.
- Improve UI wording when data is sample/fallback or incomplete.

## 2026-05-24 - Week 3 Course Progress Report

Context:

- A formal Week 3 progress report was prepared for CMIT 450.
- The report is useful as source material for the final paper, resume/project summary, and process map.

Actions recorded:

- Framed AvalonReach as a web-based internet provider comparison and recommendation platform.
- Recorded the live public deployment at https://avalon-reach.vercel.app/.
- Identified the active stack as Next.js, TypeScript, GitHub, Supabase, Vercel, OpenAI Codex, and OpenClaw orchestration on AWS.
- Documented the Week 3 scope-control decision to narrow the public MVP recommendation promise to fastest available plan.
- Preserved transport type classification work as part of recommendation transparency.
- Reframed broadband data inconsistency as a possible future transparency feature rather than only a cleanup problem.

Result:

- Added extracted Markdown source notes at `../source-reports/week-03-progress-report-2.md`.
- Updated `../week-03-status.md` to match the submitted report more closely.

Issue / blocker:

- The submitted Week 3 report frames the MVP as fastest-plan-first, while current app/docs still contain broader priority-mode language.

Decision:

- Track this as a Week 4 scope-alignment item instead of hiding the mismatch.

Next:

- Decide whether Week 4 should simplify visible recommendations around fastest plan or explicitly label broader priority modes as experimental/roadmap functionality.
