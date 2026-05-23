# Week 2 Digital Evidence Checklist: AvalonReach

This file is intended to make the repository screenshot-friendly for CMIT 450 Week 2 evidence.

## Repository evidence to screenshot

Capture these views before submitting:

1. GitHub repository root showing the AvalonReach project files.
2. `app/` folder showing the Next.js route scaffold.
3. `components/` folder showing reusable UI pieces.
4. `lib/` folder showing TypeScript domain logic and Supabase helper.
5. `data/sample-results.ts` showing the fallback dataset.
6. `supabase/migrations/001_initial_schema.sql` showing database schema/RLS planning.
7. `docs/` folder showing Week 2 planning and data model documentation.
8. Terminal output for `npm run typecheck` and `npm run build` passing.

## Week 2 goals covered

- [x] MVP scaffold exists using Next.js App Router and TypeScript.
- [x] Landing page, results page, dashboard placeholder, privacy page, and terms page exist.
- [x] Search form and lead capture form exist.
- [x] Supabase public-client helper exists in `lib/supabase.ts`.
- [x] Supabase schema/RLS migration draft exists in `supabase/migrations/001_initial_schema.sql`.
- [x] Fallback provider dataset exists in `data/sample-results.ts`.
- [x] Recommendation engine foundation exists in `lib/recommendation.ts`.
- [x] Domain/data model types exist in `lib/types.ts`.
- [x] Project/data model documentation exists in `docs/`.
- [x] Deployment readiness is documented in `docs/LAUNCH_CHECKLIST.md`.

## Current environment/security note

The app uses these public Supabase environment variables only:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SUPABASE_PROJECT_REF`

No service role key, database password, or Supabase secret key is required for the current Week 2 MVP scaffold.

## Verification commands

Run before screenshotting/submission:

```bash
npm run typecheck
npm run build
```

Both commands passed on the local Week 2 scaffold after the AvalonReach rename and Supabase public-client integration.
