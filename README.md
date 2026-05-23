# AvalonReach

AvalonReach.com is a CMIT 450 software project and live-product MVP for helping residents compare internet options available at a real address.

## Product goal

Users enter an address, see available internet providers, choose priorities, and receive a clear recommendation. The site also captures email leads from day one for follow-up, better-deal alerts, and plan-selection help.

## Phase 1 MVP

- Landing page with address search
- Priority selector: best value, fastest, cheapest, upload, gaming
- Results page with ranked provider cards
- Lead capture form with consent
- API routes for search and lead creation
- Supabase-ready schema for providers, plans, search areas, recommendations, leads, searches, and provider referral links
- Integration seam for live geocoding + broadband availability APIs

## Tech stack

- Next.js App Router
- TypeScript
- Supabase for public-client database integration and email list storage
- Vercel deployment target
- Broadband data provider TBD: FCC/BDC-derived data or Broadband Map API

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` and add the public Supabase URL, anon key, and project ref. Do not add service role keys unless a specific server-side admin task is approved.

## Week 2 digital evidence

Screenshot-ready evidence is collected in `docs/WEEK_2_DIGITAL_EVIDENCE.md`. The key artifacts are:

- `app/` - Next.js route scaffold
- `components/` - search and lead capture UI
- `lib/` - Supabase client, recommendation engine, TypeScript types, persistence helpers
- `data/sample-results.ts` - fallback provider/plan dataset
- `supabase/migrations/001_initial_schema.sql` - initial database schema and RLS policy draft
- `docs/` - project brief, roadmap, data model, Week 2 direction, launch checklist

Verification commands:

```bash
npm run typecheck
npm run build
```

## Course angle

This is intentionally built as more than a static class demo. The locked schedule is:

- **Week 3:** public V1 launched on Vercel
- **Week 6:** full course/product scope complete
- **Week 7:** presentation, screenshots, final report, buffer, and optional stretch polish

A real user should be able to look up an address, compare results, receive a recommendation, and join the responder list.
