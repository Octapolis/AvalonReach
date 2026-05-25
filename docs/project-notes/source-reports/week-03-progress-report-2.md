# Week 3 Progress Report 2 - Extracted Source Notes

Source: uploaded Word document `Week_3_Progress_Report_2_-_Bo---5bd0a170-2677-4f69-874b-375eefbaf5b3.docx`  
Report date: 2026-05-24  
Course: CMIT-450-40 Senior Seminar Project

Purpose: preserve the project facts from the submitted Week 3 progress report so weekly status reports, final-report sections, resume language, and process maps can be updated from a searchable Markdown source.

## Official Week 3 Framing

AvalonReach is described as a web-based internet provider comparison and recommendation platform. Users search by address or ZIP code, compare internet providers available in their area, and receive transparent recommendations based on measurable connection characteristics.

The Week 3 report frames the current public MVP around one primary recommendation variable: fastest available internet plan. Earlier ideas such as cheapest, best value, upload priority, and gaming optimization are described as future expansion ideas rather than MVP requirements.

## Public Deployment Milestone

The report records Week 3 as the point where AvalonReach moved from conceptual planning and early implementation into an actively deployed public software platform.

Live deployment:

- https://avalon-reach.vercel.app/

Evidence recorded in the report:

- Public AvalonReach deployment through Vercel.
- GitHub repository creation and organization.
- Active implementation commits and repository structure.
- GitHub repository screenshot.
- Vercel deployment screenshot.
- Public website screenshot.

## Week 3 Work Completed

- Public deployment through Vercel.
- GitHub repository structure organized.
- Recommendation system architecture refined.
- MVP scope narrowed to a single measurable recommendation variable for faster and more stable delivery.
- Transport type classification continued:
  - Fiber/FTTP
  - Cable/DOCSIS
  - Fixed Wireless
  - 5G Home Internet
  - DSL
  - Traditional Satellite
  - LEO Satellite, including Starlink
- Fallback dataset strategy became a major architecture focus.
- OpenClaw AWS development environment was stabilized and restored for continued AI-assisted implementation.
- OpenAI Codex continued assisting with implementation scaffolding, project structure, repetitive development tasks, and architecture support under human oversight.

## Architecture Recorded

Stack named in the report:

- Next.js
- TypeScript
- GitHub
- Supabase
- Vercel
- OpenAI Codex
- OpenClaw orchestration environment hosted on AWS

## Scope Control Lesson

The report emphasizes iterative deployment over feature completeness. The project intentionally deferred advanced recommendation categories, diagnostic tools, user accounts, provider reconciliation systems, and advanced integrations until after the first stable deployment milestone.

## Data Quality Lesson

The report identifies broadband data inconsistency as more than a cleanup problem. FCC and provider datasets can include stale records, conflicting availability information, inconsistent transport types, and inconsistent provider naming. Future AvalonReach versions may surface confidence indicators or uncertainty warnings as part of the value proposition.

## Implications For Week 4

- Align the live app and documentation around the fastest-plan MVP unless a deliberate scope change is made.
- Treat missing pricing as an incomplete-data transparency issue, not just a math bug.
- Keep transport type explanation central to recommendation transparency.
- Use live testing to decide which advanced recommendation modes should stay visible now versus be deferred.
