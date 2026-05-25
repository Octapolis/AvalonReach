# AI Recovery Guide

Purpose: restore an AI assistant or new collaborator to useful AvalonReach context after memory loss, context wipe, model reset, or handoff.

Use this when the assistant has never seen the project before.

## Immediate Identity of the Project

Project name: AvalonReach  
Course: CMIT 450  
Live app: https://avalon-reach.vercel.app/  
Main repo path: `/home/ubuntu/openclaw-workspace/AvalonReach`  
Workspace mirror path: `/home/ubuntu/.openclaw/workspace/projects/avalonreach`  
Current anchor date: 2026-05-25  
Current phase: Week 4

AvalonReach is a deployed Next.js/TypeScript broadband-comparison MVP. Users enter an address, compare possible internet provider options, and receive transparent recommendations. The submitted Week 3 report frames the public MVP around the fastest available internet plan. Broader recommendation modes already exist in the app and should not be removed just to match the report; test them, preserve what works, and clarify the product copy.

## First 10-Minute Recovery Sequence

Run this sequence before making changes:

1. Read `docs/project-notes/project-covenant.md`.
2. Read `docs/project-notes/progress/plan-progress.md`.
3. Read `docs/project-notes/progress/known-issues.md`.
4. Read `docs/project-notes/progress/suggestions.md`.
5. Read the latest file in `docs/project-notes/working-notes/daily/`.
6. Read the current weekly status report, currently `docs/project-notes/week-04-status.md`.
7. Run `git status --short`.
8. Run `npm run typecheck`.
9. If code behavior matters, run `npm run build`.
10. Only then choose the next smallest action.

Useful commands:

```bash
cd /home/ubuntu/openclaw-workspace/AvalonReach
git status --short
npm run typecheck
npm run build
find docs/project-notes -maxdepth 4 -type f | sort
```

## What To Read For What

- Mission/customer/scope: `docs/project-notes/project-covenant.md`
- Current roadmap status: `docs/project-notes/progress/plan-progress.md`
- Bugs/blockers/gaps: `docs/project-notes/progress/known-issues.md`
- Suggested paths: `docs/project-notes/progress/suggestions.md`
- Raw recent trail: `docs/project-notes/working-notes/daily/YYYY-MM-DD.md`
- Polished weekly summaries: `docs/project-notes/week-XX-status.md`
- Current testing checklist: `docs/project-notes/testing/week-04-existing-feature-test-plan.md`
- Repeatable build workflow: `docs/project-notes/process-map.md`
- Product/data model: `docs/MVP_DATA_MODEL.md`
- 7-week plan: `docs/ROADMAP_7_WEEKS.md`
- Launch tasks: `docs/LAUNCH_CHECKLIST.md`

## Current Known State

As of 2026-05-25:

- Week 4 has begun.
- Public Vercel app launched on Saturday, 2026-05-23.
- Live URL responds: https://avalon-reach.vercel.app/
- A live smoke test with public address `1400 John F Kennedy Blvd, Philadelphia, PA 19107` succeeded.
- Homepage, results route, `/api/search`, `/go/verizon`, `/privacy`, and `/terms` returned successfully.
- Live lookup returned real provider results including Verizon, Xfinity, Hotwire Communications, Starlink, AT&T, HughesNet, T-Mobile, MINTernet, and Viasat.
- `npm run typecheck` passes.
- `npm run build` passes.
- `npm run lint` passes after replacing `next lint` with `eslint .` and adding `eslint.config.mjs`.
- The formal Week 3 progress report was ingested into `docs/project-notes/source-reports/week-03-progress-report-2.md`.

## Current Top Issues

1. **Missing price data breaks best-value usefulness.**
   - Live lookup can provide speed/technology but no monthly price.
   - Local fix is complete: best-value and cheapest show `Price unavailable` instead of fake zero-value scoring.
   - Needs deployment/live retest before closing.

2. **Duplicate provider entries can appear across technologies.**
   - Example: Xfinity cable and Xfinity fiber can appear separately.
   - Local fix is complete: no-plan live result headings include provider plus transport label.
   - Needs deployment/live retest before closing.

3. **Provider handoff/referral links are not fully production data yet.**
   - Local copy fix is complete: `/go/[provider]` now clearly says live referral links are not configured yet and tells users to confirm details directly with providers.
   - Real provider/referral links still need production catalog data later.
   - Needs deployment/live retest before closing.

4. **Production Supabase behavior needs verification.**
   - Schema and seed files exist.
   - Need to verify production reads/writes for catalog, searches, recommendations, and leads.

5. **Lead capture not yet tested on production.**
   - Need a controlled test email before creating live test rows.

6. **Fastest-plan MVP framing needs UI/docs alignment.**
   - The submitted Week 3 report narrowed the MVP recommendation promise to fastest available plan.
   - The app/docs still mention broader priority modes in places.
   - Fix path: preserve built features, test them, and clarify copy so fastest-plan is the official MVP story while broader modes are expanded functionality.

## Current Recommended Next Action

Decide the controlled lead-capture test email, then deploy/retest the missing-price recommendation fix and align visible copy with the fastest-plan MVP framing from the Week 3 report.

Expected implementation direction:

- Inspect `lib/recommendation.ts`, `lib/types.ts`, and results UI.
- Change best-value scoring so plans without `estimatedMonthlyPrice` do not produce fake value scores.
- Show copy like "Price unavailable; ranking uses speed and connection type until pricing is confirmed."
- Add/update a note in:
  - `docs/project-notes/working-notes/daily/YYYY-MM-DD.md`
  - `docs/project-notes/progress/known-issues.md`
  - `docs/project-notes/progress/plan-progress.md`
- Run `npm run typecheck` and `npm run build`.

## Documentation Update Contract

Every meaningful work session must update documentation in the same flow:

1. Add raw actions/results to `docs/project-notes/working-notes/daily/YYYY-MM-DD.md`.
2. If a bug/blocker changes, update `docs/project-notes/progress/known-issues.md`.
3. If a possible path changes, update `docs/project-notes/progress/suggestions.md`.
4. If project status changes, update `docs/project-notes/progress/plan-progress.md`.
5. If mission/customer/scope/process changes, update `docs/project-notes/project-covenant.md`.
6. If a weekly milestone closes, update `docs/project-notes/week-XX-status.md`.

Do not let working notes and progress trackers drift apart.

## Repo / Deployment Facts

Recent commits:

- `5363eff Use Supabase catalog for fallback results`
- `3be052f Add Supabase sample catalog seed`
- `58e4246 Align Supabase env setup`
- `9836026 Add AvalonReach Week 2 MVP scaffold`
- `fafab16 Initial commit`

Important stack:

- Next.js App Router
- TypeScript
- Supabase public client structure
- Vercel deployment
- Broadband live lookup seam plus fallback/sample catalog

Important app files:

- `app/page.tsx`
- `app/results/page.tsx`
- `app/api/search/route.ts`
- `app/api/leads/route.ts`
- `lib/broadband.ts`
- `lib/recommendation.ts`
- `lib/persistence.ts`
- `lib/types.ts`
- `data/sample-results.ts`
- `supabase/migrations/001_initial_schema.sql`
- `supabase/seeds/001_sample_catalog.sql`

## If Everything Is Confusing

Do not start by coding.

Reset with this path:

1. Read this file.
2. Read `project-covenant.md`.
3. Read `progress/plan-progress.md`.
4. Read `progress/known-issues.md`.
5. Read latest daily working note.
6. State the current phase and top issue in one paragraph.
7. Pick one smallest next action.

Current smallest next action: get Alex's approved production lead-capture test email, or skip lead capture temporarily and deploy/retest the missing-price recommendation fix.
