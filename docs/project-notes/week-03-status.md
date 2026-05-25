# Week 3 Status Report

Week start: 2026-05-18  
Status: Launched public V1

Final report use: deployment milestone, implementation evidence, project-management reflection, and resume/project-portfolio source material.

## Summary

Week 3 focused on moving AvalonReach from a local MVP into a publicly accessible V1. The key decision was to stop expanding internal features long enough to prove the app could be deployed, loaded by outside users, and used as a real demonstration artifact for CMIT 450.

The official Week 3 course report also narrowed the MVP story to one measurable recommendation variable: fastest available internet plan. Earlier recommendation ideas such as cheapest, best value, upload priority, and gaming optimization remain useful roadmap items, but the submitted Week 3 framing treats them as future expansion rather than the first public MVP promise.

The public Vercel app was launched on Saturday, 2026-05-23:

https://avalon-reach.vercel.app/

This week is important for the final report because it marks the transition from prototype to live software. Even though more testing and polish remained, the project crossed the line from "local build" to "public web application."

## Completed

- Deployed the AvalonReach V1 app to Vercel.
- Confirmed the homepage was publicly reachable after deployment.
- Preserved the full address-search and provider-results user flow from the local MVP.
- Refined the official MVP scope around fastest-plan recommendation.
- Added Supabase catalog/fallback work after the Week 2 scaffold.
- Added sample provider catalog seed data for repeatable demos.
- Aligned Supabase environment setup for deployment.
- Connected fallback results to the Supabase catalog path when available.
- Kept the live-data seam in place so the app can continue moving from sample data toward real broadband lookup behavior.
- Continued transport type classification for Fiber/FTTP, Cable/DOCSIS, Fixed Wireless, 5G Home Internet, DSL, Traditional Satellite, and LEO Satellite such as Starlink.
- Stabilized the OpenClaw AWS development environment for continued AI-assisted implementation work.

## Implementation Notes

The Week 3 implementation strategy was to keep the app deployable and demonstrable instead of trying to complete every planned integration at once. This protects the course timeline by ensuring there is a working public artifact before deeper recommendation-engine and dashboard work.

Key technical pieces available by the end of Week 3:

- Next.js App Router application deployed on Vercel.
- Public homepage and results route.
- Address-search user flow.
- Provider result cards with ranked recommendations.
- Lead-capture form and API route.
- Provider handoff route.
- Supabase schema and seed files for the provider catalog.
- Fallback data path for demonstrations when live provider/pricing data is incomplete.
- GitHub repository structure for application source, Supabase artifacts, and project documentation.

The Week 3 progress report identifies the active stack as Next.js, TypeScript, GitHub, Supabase, Vercel, OpenAI Codex, and OpenClaw orchestration hosted on AWS.

## Evidence

- Live URL: https://avalon-reach.vercel.app/
- Vercel-hosted app reachable publicly.
- Supabase schema and seed artifacts:
  - `supabase/migrations/001_initial_schema.sql`
  - `supabase/seeds/001_sample_catalog.sql`
- Relevant docs:
  - `docs/ROADMAP_7_WEEKS.md`
  - `docs/WEEK_2_DIRECTION.md`
  - `docs/MVP_DATA_MODEL.md`
  - `docs/LAUNCH_CHECKLIST.md`
- Latest Git commits:
  - `58e4246 Align Supabase env setup`
  - `3be052f Add Supabase sample catalog seed`
  - `5363eff Use Supabase catalog for fallback results`
- Extracted course-report source notes:
  - `docs/project-notes/source-reports/week-03-progress-report-2.md`

## Final Report Talking Points

- The project followed an iterative software-development approach: scaffold, define MVP data model, deploy public V1, then refine based on live testing.
- Week 3 demonstrates deployment and release management, not just coding.
- Scope control became an explicit project-management lesson: the MVP was narrowed to fastest available plan to protect stability and the seven-week timeline.
- Launching early exposed realistic next-step issues, especially incomplete live broadband pricing data.
- Broadband data uncertainty can become a transparency feature through confidence indicators, source warnings, and clear explanation of incomplete provider data.
- The Vercel launch created a stable artifact that can be tested, screenshotted, and improved throughout Weeks 4-7.
- The project is intentionally scoped so the course submission has a working product even if deeper provider integrations remain future work.

## Resume / Portfolio Angle

AvalonReach can be described as:

> A deployed Next.js and TypeScript broadband-comparison MVP that lets users search an address, compare internet provider options, receive transparent priority-based recommendations, and submit lead-capture information. Built with a Supabase-ready data model, Vercel deployment, fallback catalog data, and a roadmap for live broadband-data integration.

Skills demonstrated:

- Product scoping and MVP planning
- Next.js App Router development
- TypeScript data modeling
- Supabase schema design
- Public deployment with Vercel
- API route implementation
- Recommendation logic design
- Documentation and staged project reporting

## Known Gaps

- Public launch has not had much manual user-flow testing yet.
- Live data can return provider availability without price data, which makes best-value scoring less useful.
- The official Week 3 report frames the MVP as fastest-plan-first, while the live app still contains broader priority/recommendation language that should be aligned or intentionally explained in Week 4.
- Provider handoff links exist, but referral URLs are still placeholders or generic routes.
- More screenshots are needed for course evidence.

## Risks / Lessons Learned

- Launching before full pricing integration is useful, but the UI must clearly explain when data is incomplete.
- A fallback catalog is valuable because it keeps the product demonstrable while live provider data matures.
- The fastest-plan MVP story is easier to defend than multiple partially complete recommendation modes.
- Deployment should happen before the final course week, because live deployment reveals issues local development does not.
- Weekly status notes should be written as the work happens so the final report can be assembled from evidence rather than memory.

## Next Step

Begin Week 4 by testing the live site and improving recommendation behavior around incomplete live data.
