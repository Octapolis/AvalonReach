# AvalonReach Week 1-7 Milestones

Last updated: 2026-06-04

Purpose: provide a clean course-facing milestone list from current state through final submission.

## Week 1 - Foundation And Working Demo

Status: Complete

Milestone:

- Establish AvalonReach as a working Next.js/TypeScript broadband comparison app.

Completed:

- Project scaffold created.
- Homepage search flow created.
- Results page and ranked provider cards created.
- Initial recommendation modes created.
- Lead capture route and form created.
- Privacy, terms, dashboard placeholder, provider handoff, and documentation added.
- Typecheck and build verified.

Done means:

- A user can enter an address-like input and see a working demo result flow.

## Week 2 - Data Model And Launch Infrastructure

Status: Complete / production database verification still open

Milestone:

- Turn the demo into a deployable MVP with a defensible data model and production-ready structure.

Completed:

- Supabase schema and database types created.
- Provider, plan, lead, search, saved-result, and referral-link data model defined.
- Fallback/sample provider catalog added.
- Recommendation rules made transparent and explainable.
- Public launch checklist and Week 2 evidence docs created.
- GitHub repository established.

Still needs verification:

- Confirm production Supabase reads/writes from live traffic.

Done means:

- The app has a durable data design and can be configured for production storage.

## Week 3 - Public V1 Launch

Status: Complete / manual testing continued into Week 4

Milestone:

- Launch the first public version of AvalonReach.

Completed:

- Public Vercel deployment launched at `https://avalon-reach.vercel.app/`.
- Real address lookup path connected.
- Search/results journey works publicly.
- Provider handoff route exists.
- Privacy and terms pages are live.
- Week 3 course report framed the official MVP around fastest available plan.

Done means:

- AvalonReach is publicly accessible and demo-ready for the core search/recommendation flow.

## Week 4 - Testing, Stabilization, And Recommendation Quality

Status: In progress

Milestone:

- Move from launched to tested, stabilized, and course-defensible.

Completed this week:

- Production smoke test passed.
- Live production search retested with a public Philadelphia address.
- Missing-price recommendation behavior fixed.
- Cheapest mode no longer treats unavailable prices as confirmed cheap.
- Result cards now show explicit listed-price status.
- Duplicate provider/technology labels are clearer.
- Provider handoff copy now honestly states live referral links are not configured yet.
- Homepage simplification started: no demo cards, less clutter, search-first layout.
- Save Search is now hidden behind a post-search button.
- Use My Location search was added locally.
- Default recommendation priority changed locally to Fastest to match the official MVP framing.
- Help Me Choose and Get Updates were recorded as future feature paths.

Still open:

- Production Supabase verification.
- One controlled lead-capture test.
- Multi-address evidence pass.
- Screenshot set for review/final report.
- Final wording alignment: fastest-plan recommendation is the official MVP; extra priority modes are expanded functionality.

Done means:

- Recommendations are explainable, missing data is handled honestly, and the project has repeatable test evidence.

## Week 5 - Email Follow-Up, Referral Link, And Light Retention

Status: Pending

Milestone:

- Add a lightweight retention and monetization layer so users can save results, receive useful follow-up, and reach at least one live provider through a trackable/referral-style handoff.

Planned scope:

- Improve Save Search after results.
- Keep Get Updates as a post-search feature, not homepage clutter.
- Add email autoresponder flow.
- Add double opt-in setup for newsletter/update consent.
- Send saved results to the user's email after a search.
- Give users an option to verify interests, such as fastest speed, lowest bill, gaming, remote work, upload-heavy use, or general updates.
- Add newsletter signup tied to the Save Search/Get Updates flow.
- Draft the newsletter welcome email.
- Draft a short email sequence with tips on choosing internet options.
- Include a preview of what future newsletter content will cover.
- Plug in at least one live provider handoff with a unique referral/tracking link to the provider site so AvalonReach can receive credit or attribution.
- Decide whether the dashboard is email-based saved search or full auth.
- Start dashboard with email-based saved search lookup unless a stronger account requirement appears.
- Keep the saved-results model username-ready so unique usernames can be added later without rebuilding user profiles.
- Add basic saved-search/dashboard behavior if schedule allows.
- Add Help Me Choose as a compact guided picker if Week 4 evidence is stable.

Recommended constraint:

- Avoid heavy auth unless the evidence, Supabase verification, and screenshot work are already stable.
- Avoid brittle account design: use a stable internal saved-user/profile ID, then attach email and later username as changeable identifiers.
- Keep the autoresponder/newsletter flow small and testable. It should prove the product loop, not become a full marketing automation build.

Done means:

- A user can save results, receive an email follow-up, opt into updates/newsletter intentionally, and click through at least one provider handoff link with attribution/tracking.

## Week 6 - Domain Launch, Full Rollout, Expanded Data, And Hardening

Status: Pending

Milestone:

- Move AvalonReach from Vercel-preview-style launch to full public rollout on a unique domain with paid hosting, expanded live data, and final feature testing.

Planned scope:

- Launch or connect a unique domain for the public site.
- Move to paid hosting or paid production tier as needed for the full rollout.
- Confirm the final production URL and update project docs/screenshots.
- Expand live provider data beyond the first provider/referral integration.
- Full test of all features built so far:
  - address search
  - Use My Location
  - priority dropdown/recommendation modes
  - Save Search
  - email autoresponder/results email
  - double opt-in/newsletter signup
  - provider referral handoff
  - privacy/terms
  - dashboard or saved-search placeholder/workflow
- Verify or explicitly defer production Supabase workflows.
- Add or document provider referral/admin-ready data workflow.
- Improve error/loading/empty states.
- Run final deployed-site test pass.
- Polish mobile layout and accessibility basics.
- Finalize README, project brief, launch notes, and data notes.
- Prepare final report materials.
- Draft final demo script.

Done means:

- The site is live on its intended public domain, core workflows are tested end-to-end, provider data is expanded, and Week 7 can focus on final report and presentation packaging instead of emergency repair.

## Week 7 - Presentation, Final Report, And Buffer

Status: Pending

Milestone:

- Package AvalonReach for final submission.

Planned scope:

- Final report.
- Final screenshots.
- Short demo walkthrough.
- Testing evidence summary.
- Known limitations and future work.
- Optional stretch polish only if the core package is already done.

Done means:

- AvalonReach is ready to submit and explain clearly: what was built, what works, how it was tested, what was learned, and what comes next.

## Current Critical Path

1. Finish Week 4 evidence: Supabase verification, controlled lead test, multi-address tests, screenshots.
2. Keep homepage/results UI simple and search-first.
3. Build Week 5 email follow-up, double opt-in, newsletter welcome/sequence drafts, and at least one live referral provider handoff.
4. Complete Week 6 domain launch, paid production rollout, expanded live data, full feature test, and final report prep.
5. Use Week 7 for presentation/report packaging.
