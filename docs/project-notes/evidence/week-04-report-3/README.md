# Week 4 Report 3 Evidence

Captured: 2026-06-01 UTC  
Live site: https://avalon-reach.vercel.app/

## Production Database Verification

Alex submitted one controlled production lead-capture test using a school email address.

Verification query time: `2026-06-01T02:30:59.280Z`

Confirmed rows:

- `leads`: latest row created at `2026-06-01T02:28:58.633731+00:00`
  - Email was present and masked in local evidence as `bo*******@mymail.champlain.edu`
  - `location_hint`: `Current location`
  - `intent`: `results`
  - `consent`: `true`
  - `source`: `landing-page`
- `searches`: latest live search rows were present, including:
  - `Current location`, priority `fastest`, provider count `13`, source `live`
  - Philadelphia public-address smoke/evidence rows, provider count `11`, source `live`
- `search_areas`: recent live `Current location` and Philadelphia public-address rows were present.
- `recommendations`: recent live recommendation rows were present for `fastest`, `best-value`, and `cheapest`.

Verdict: production Supabase writes are working for lead capture, search capture, search-area capture, and recommendation capture.

## Screenshots

- `01-homepage.png`: live homepage/search interface.
- `02-results-fastest-public-address.png`: live results for public Philadelphia address with provider cards and missing-price language.
- `03-provider-handoff-verizon.png`: live provider handoff copy explaining no live referral link yet.
- `04-database-verification.png`: masked production Supabase write evidence for lead capture, search capture, search-area capture, and recommendation capture.
- `05-github-and-smoke-verification.png`: Git commit/deployment state plus production smoke-test pass.

## Report Framing

Use this as Week 4 Report 3 evidence that AvalonReach moved from deployment into production validation:

- The deployed app accepts real searches and returns ranked provider results.
- Production database writes are confirmed.
- Missing live pricing is shown honestly instead of as zero-price or fake value.
- Provider technology variants are distinguishable in the results.
- Provider handoff is MVP-honest while referral links remain future work.
- GitHub activity and production smoke-test evidence confirm the deployed project is backed by recent source-control work and a repeatable verification script.
