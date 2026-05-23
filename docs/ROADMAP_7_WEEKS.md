# 7-Week Build Roadmap

**Project:** AvalonReach  
**Course:** CMIT 450  
**Status anchor:** Week 1 ends today. The project already has a working Next.js/TypeScript app, search/results flow, live-data seam, lead capture route, provider handoff route, dashboard placeholder, privacy/terms pages, and passing typecheck/build.

## Target Milestones

- **Week 3:** Public V1 launched on Vercel with real address lookup, lead capture, and a demo-ready user flow.
- **Week 6:** Full course/product scope complete: database, referrals/admin-ready data, saved-results/dashboard flow, polish, tests, and documentation.
- **Week 7:** Buffer, presentation, screenshots, final report, and optional stretch polish only.

## Week 1: Foundation — COMPLETE / LOCKED

**Goal:** Establish the product, stack, and working core demo.

**Completed:**
- Next.js + TypeScript app scaffolded.
- Landing page with address search.
- Results flow with ranked provider cards.
- Priority modes started: best value, fastest, cheapest, upload, gaming.
- Lead capture form and API route added.
- Search API route added.
- Live lookup integration seam added with sample fallback data.
- Supabase-ready persistence helpers/schema direction added.
- Privacy, terms, provider handoff, dashboard placeholder, launch checklist, and project docs added.
- `npm run typecheck` passes.
- `npm run build` passes.

**Week 1 exit criteria:** satisfied.

## Week 2: Data + Launch Infrastructure

**Goal:** Convert the demo into a deployable V1 with durable storage, production configuration, and the instructor-clarified MVP direction.

**Direction update:** Week 2 locks the recommendation engine into simple transparent categories rather than ML: cheapest, fastest, best value (`download Mbps ÷ monthly price`), upload priority, and gaming/remote work based on expected latency/stability by transport type. See `docs/WEEK_2_DIRECTION.md`.

**Deliverables:**
- Create Supabase project.
- Add/verify database schema for:
  - leads
  - search history
  - saved results
  - provider referral links
- Connect lead capture to Supabase in production mode.
- Persist searches/results where keys are available.
- Add seed data for first referral/provider links.
- Finalize environment variable checklist for local + Vercel.
- Improve error states for unavailable lookup/API failure.
- Use the curated fallback dataset if FCC/live provider normalization takes longer than the course timeline.
- Test 5–10 real addresses with sample/live fallback behavior.
- Write short Week 2 course update.

**Exit criteria:** a production deploy can store leads/searches and the app is ready for public V1 launch work.

## Week 3: Public V1 Launch

**Goal:** Fully launch the first public version.

**Deliverables:**
- Deploy to Vercel.
- Configure domain or stable public Vercel URL.
- Enable live broadband lookup where API/data access is available.
- Keep sample fallback clearly labeled if live data is incomplete.
- Verify full user journey:
  1. user enters address
  2. sees provider results
  3. selects priority
  4. gets recommendation
  5. submits lead/contact form
  6. can click provider handoff/referral action
- Add production analytics/logging-lite if available.
- Confirm privacy/terms links and contact/consent language.
- Capture launch screenshots for CMIT 450.

**Exit criteria:** public V1 is online and demo-ready. This is the official launch milestone.

## Week 4: Recommendation Engine V2

**Goal:** Make the recommendation logic strong enough to feel useful rather than just decorative.

**Deliverables:**
- Keep recommendation rules transparent and defensible:
  - best value = download Mbps ÷ monthly price
  - cheapest = lowest monthly price
  - fastest = highest advertised download speed
  - upload = highest upload speed
  - gaming/remote work = transport-type latency/stability ranking
- Add clear recommendation explanation copy.
- Show confidence/data-source notes on results.
- Improve sorting, badges, and comparison clarity.
- Add unit-style test cases or documented test scenarios for the scoring algorithm.
- Write Week 4 progress note with screenshots.

**Exit criteria:** recommendations are explainable, repeatable, and defensible for the course demo.

## Week 5: Accounts / Saved Results / Dashboard

**Goal:** Add the user-retention layer that turns the site from a one-page demo into a real app.

**Deliverables:**
- Implement Supabase auth if time remains reasonable; otherwise use email-based saved-search lookup.
- Build dashboard/saved-results page beyond placeholder.
- Let users save a search or request follow-up.
- Add basic email/results workflow placeholder or documented integration point.
- Improve mobile responsiveness and empty/loading states.
- Write Week 5 progress note.

**Exit criteria:** users have a reason to return, and saved-search/dashboard behavior is demonstrable.

## Week 6: Full Completion / Final Product Scope

**Goal:** Finish the course/product scope before the final week.

**Deliverables:**
- Referral/admin-ready provider data table or seed script.
- Provider handoff/referral links working for top providers or documented placeholders.
- Admin data view, lightweight admin route, or database-management workflow documented.
- Production hardening:
  - input validation
  - error messages
  - loading states
  - mobile polish
  - accessibility pass
  - environment variable review
- Final test pass on the deployed site.
- Finalize README, project brief, launch checklist, and data notes.
- Prepare final demo script draft.

**Exit criteria:** full project is complete by the end of Week 6. Week 7 is not required for core build work.

## Week 7: Presentation + Buffer + Stretch

**Goal:** Submit cleanly and use buffer only for polish or surprises.

**Deliverables:**
- Final presentation/report.
- Screenshots and short demo walkthrough.
- Final testing evidence.
- Optional stretch:
  - AI recommendation assistant
  - local market landing pages
  - better provider enrichment
  - deal-alert concept mockup

**Exit criteria:** CMIT 450 submission is ready, with V1 launched and Week 6 scope complete.

## Locked Scope Rule

To protect the schedule, anything not needed for Week 3 launch or Week 6 completion is a stretch feature. The core build is:

1. address search
2. provider results
3. priority-based recommendation
4. lead capture
5. persistence/database
6. deployed public site
7. saved/dashboard or equivalent retention flow
8. referral/admin-ready provider workflow
9. final documentation and presentation
