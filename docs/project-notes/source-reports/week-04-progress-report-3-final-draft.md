# Week 4: Progress Report #3

Student: Bo Gorman

Organization Name: AvalonReach

Champlain College Online

CMIT-450-40: Senior Seminar Project

Instructor: Shaffick Mohammed

Date: 2026-06-01

Contributing Personnel: Bo Gorman. OpenAI Codex and OpenClaw were used as AI-assisted development and documentation support tools under student direction and review (OpenAI, 2026).

# Table of Contents

- Introduction ........................................................................................................ 3
- Project Plan and Weekly Timeline ....................................................................... 4
- Summary of Work Completed During This Reporting Period .............................. 5
- Status, Issues, and Analysis ................................................................................ 6
- Digital Evidence ................................................................................................... 8
- Conclusion .......................................................................................................... 11
- References .......................................................................................................... 12

# Introduction

AvalonReach is a web-based internet provider comparison and recommendation platform being developed as the primary software product for the CMIT-450 Senior Seminar Project. The purpose of the platform is to help users search by address or location, compare internet providers available in that area, and receive a transparent recommendation based on measurable connection characteristics. The project applies systems analysis, cloud deployment, database integration, recommendation logic, and AI-assisted development workflow into a publicly accessible MVP product.

The project is currently being developed using a modern cloud-based software stack consisting of Next.js, TypeScript, GitHub, Supabase, Vercel deployment hosting, and AI-assisted development support from OpenAI Codex/ChatGPT (GitHub, 2026; Next.js, 2026; OpenAI, 2026; Supabase, 2026; Vercel, 2026). The current public deployment of the project is available at:

https://avalon-reach.vercel.app/

Week 3 represented the transition from planned MVP to actively deployed public product. Week 4 focused on validating that deployed product. The main question during this reporting period was no longer only whether AvalonReach could be deployed, but whether the deployed system could successfully return live results, explain recommendation output, capture a saved search, and write production records to the database.

# Project Plan and Weekly Timeline

| Week | Planned Focus | Current Status |
| --- | --- | --- |
| Week 1 | Project foundation, product concept, and initial application scaffold. | Complete |
| Week 2 | Data model, Supabase direction, and deployable MVP preparation. | Complete |
| Week 3 | Public V1 launch through Vercel and repository/deployment evidence. | Complete |
| Week 4 | Recommendation validation, live testing, database verification, and issue documentation. | In progress / current report |
| Week 5 | Saved-results/dashboard workflow and user-retention layer. | Planned |
| Week 6 | Referral/admin-ready provider workflow, production hardening, and final testing. | Planned |
| Week 7 | Final report, screenshots, presentation, and buffer/polish. | Planned |

The original Week 4 goal was to expand recommendation quality and make the recommendation logic more explainable. After Week 3 deployment, the Week 4 work became more specific: validate the deployed application, confirm database persistence, document issues discovered in production testing, and preserve evidence for the final report.

# Summary of Work Completed During This Reporting Period

During this reporting period, AvalonReach moved from a deployed public MVP into a validated production workflow. The live website was tested at its public Vercel URL, and the search/results flow was verified using a public Philadelphia address rather than a private residential address. The application loaded successfully, accepted a search, returned provider results, displayed provider cards, and showed a ranked fastest-plan recommendation flow.

The most important completed work was confirming production database writes. A controlled Save Search test was submitted through the live application using a school email address. After submission, Supabase production records were checked and confirmed. The database contained a new lead row, and related search, search-area, and recommendation rows were also present. This proved that the deployed user interface, API routes, and database persistence layer were functioning together.

The recommendation presentation was also reviewed. The course MVP is currently best framed around the fastest available plan because that metric is measurable and defensible. Existing additional recommendation modes, including best overall, cheapest, upload, and gaming/low-lag, remain in the application as expanded functionality that has already been implemented and is being refined. This approach avoids removing working features while keeping the MVP story clear.

Major work completed during Week 4 included:

- Verified the live Vercel deployment at https://avalon-reach.vercel.app/.
- Confirmed the homepage/search interface loads publicly.
- Confirmed the results page returns provider cards for a public address.
- Confirmed the fastest recommendation flow ranks providers by advertised download speed.
- Confirmed transport type labels appear in results, including Fiber/FTTP, Cable/DOCSIS, Fixed Wireless, LEO Satellite, and Traditional Satellite.
- Confirmed missing monthly pricing is shown as unavailable rather than as a false zero-dollar result.
- Confirmed the Save Search lead-capture path writes to Supabase.
- Confirmed related search, search-area, and recommendation records exist in production.
- Ran a production smoke test successfully.
- Captured Week 4 evidence screenshots with explicit figure captions.
- Documented a rural/limited-service user scenario for recommendation validation.

# Status, Issues, and Analysis

## Current Project Status

AvalonReach is now beyond the planning-only stage. It is a public, deployed MVP with a working user journey: search for an address or current location, view provider options, evaluate a recommended result, and save the search. The current deployed application is strong enough to support the core course demonstration because it proves that the application is not only designed but also operating in production.

The strongest Week 4 milestone is production database verification. Earlier progress reports focused on interface construction, repository organization, and public deployment. During this reporting period, the Save Search workflow proved that user input can move through the deployed application and into persistent storage. For a business information system, this is a key transition from a static demonstration to a functioning application workflow.

## Issue 1: Deployment Does Not Automatically Prove Functionality

One issue identified during Week 4 was that a successful deployment does not automatically prove that the whole system works. A Vercel deployment can serve pages correctly while database writes, API routes, recommendation logic, or persistence behavior remain untested.

The response was to verify the system through both a smoke test and direct database evidence. The smoke test confirmed that key production routes and expected behaviors passed. The Save Search test confirmed that the deployed application could write a lead record to Supabase. This helped close the gap between “the site loads” and “the system works.”

## Issue 2: Broadband Data Quality and Missing Pricing

Live broadband data can be incomplete. During testing, provider availability and technology type were returned, but monthly pricing was often unavailable. This matters because a recommendation system can become misleading if it treats missing price data as zero cost or as a confirmed cheap option.

The Week 4 handling approach was transparency. Result cards now state when a listed price is unavailable and instruct users to confirm price with the provider. This is more honest than pretending the application has complete pricing information. It also supports the project goal of making recommendations understandable instead of hiding uncertainty behind a score.

This issue connects directly to the broader business problem. Internet provider comparison is difficult because availability, price, performance, and promotional details are not always available in one consistent source. The FCC National Broadband Map is based on provider-reported availability data, and the FCC separately supports availability challenges when consumers or organizations believe map information is inaccurate (Federal Communications Commission, 2026). AvalonReach therefore needs to communicate uncertainty clearly rather than presenting every data point as equally complete.

## Issue 3: Scope Control and Recommendation Complexity

The project originally considered several recommendation categories, including cheapest, best value, upload priority, and gaming/low-lag optimization. Those features are useful, but they increase testing complexity. The Week 3 report framed the MVP around the fastest available plan because advertised download speed is easier to measure, explain, and validate during an early public release.

The Week 4 decision was not to remove working features simply to match earlier wording. Instead, the report frames the fastest-plan flow as the official course MVP and treats the other modes as expanded functionality already implemented and still being refined. This preserves product value while keeping the milestone defensible.

## Concrete User Scenario for Recommendation Validation

One recommendation scenario documented for Week 4 is a rural or limited-service user. In this scenario, a user may not have several fiber or cable options. Instead, the available choices may include fixed wireless, DSL if available, traditional satellite, or LEO satellite such as Starlink. The recommendation logic should not treat every available option as equal simply because it appears in the results.

For this type of user, transport type is important. Traditional satellite may provide broad coverage but can have higher latency. Fixed wireless may depend on signal quality and local congestion. Fiber, when available, is generally stronger for speed and upload performance. This scenario validates why AvalonReach displays transport type labels and explanatory text instead of only showing provider names.

## Connection to Systems and Business Information Concepts

This reporting period connects directly to systems and business information concepts because AvalonReach is becoming an integrated information system. The user interface, API routes, live broadband lookup, recommendation logic, and Supabase database are separate components, but they must operate together to create business value.

The Week 4 testing process also showed the importance of validation and feedback loops. A system should not be evaluated only by whether the frontend appears complete. It must also be tested for data capture, persistence, error handling, and decision-support quality. AvalonReach is intended to support a business decision: choosing an internet provider. That means the recommendation output must be understandable, evidence-based, and transparent about incomplete information.

# Digital Evidence

The following digital evidence was generated during this reporting period. Evidence files are stored in the project evidence folder: docs/project-notes/evidence/week-04-report-3/.

**Figure 1: Public AvalonReach Homepage and Search Interface. This screenshot shows the live public homepage at https://avalon-reach.vercel.app/. It documents that users can access the deployed AvalonReach search interface and choose a recommendation priority.**
File: `01-homepage.png`

**Figure 2: Live Provider Results for a Public Philadelphia Address. This screenshot shows ranked provider cards for 1400 John F Kennedy Blvd, Philadelphia, PA 19107. It demonstrates provider results, advertised speeds, missing-price transparency, and transport type labels such as Fiber/FTTP, Cable/DOCSIS, Fixed Wireless, LEO Satellite, and Traditional Satellite.**
File: `02-results-fastest-public-address.png`

**Figure 3: Production Database Verification After Save Search Test. This screenshot summarizes the production Supabase verification after a controlled Save Search test. The email address is masked, but the evidence confirms a lead row was created and that related search, search-area, and recommendation records exist in production.**
File: `04-database-verification.png`

**Figure 4: GitHub and Production Smoke Test Verification. This screenshot documents recent GitHub commit activity, current repository/deployment state, and a successful production smoke test against the live AvalonReach website. It supports the chain of evidence from source control to deployed behavior.**
File: `05-github-and-smoke-verification.png`

**Figure 5: Provider Handoff Page Showing MVP-Honest Referral Status. This screenshot shows the Verizon provider handoff page. It states that AvalonReach does not yet have a live referral link for that provider and instructs the user to confirm availability, monthly price, promotions, fees, and installation details directly with the provider.**
File: `03-provider-handoff-verizon.png`

# Conclusion

This reporting period changed AvalonReach from a deployed prototype into a more credible production MVP. The most important lesson from Week 4 was that deployment is not the same as validation. In Week 3, getting AvalonReach online was the milestone. In Week 4, the work shifted toward proving that the deployed system actually performs the functions required for the project.

The strongest accomplishment this week was verifying production database writes. The Save Search test showed that user input can travel through the deployed application and be stored in Supabase. That matters because AvalonReach is not intended to be only a static website. It is supposed to be a business information system that captures searches, supports follow-up, and eventually supports provider referral workflows.

Another important accomplishment was improving how the project handles incomplete data. Rather than hiding missing prices or presenting unavailable pricing as zero, the application now communicates uncertainty more honestly. This made the recommendation system more defensible and helped clarify the next product direction: the fastest-plan MVP is the clearest course milestone, while additional recommendation modes should continue to be tested as expanded features.

Compared with the planned Week 4 milestones, the project made strong progress on validation, evidence collection, recommendation transparency, and production testing. Some work remains for future weeks, including broader rural/suburban test cases, more provider handoff data, and a more complete saved-results/dashboard experience. However, the core Week 4 objective was met: AvalonReach is publicly deployed, tested with live results, and verified with production database evidence.

# References

Federal Communications Commission. (2026). National Broadband Map. https://broadbandmap.fcc.gov/home

Federal Communications Commission. (2026). National Broadband Map availability challenges. https://help.bdc.fcc.gov/hc/en-us/articles/10476040597787-How-to-Submit-an-Availability-Challenge

GitHub. (2026). GitHub platform overview. https://github.com/

Next.js. (2026). Next.js documentation. https://nextjs.org/docs

OpenAI. (2026). Codex and ChatGPT software development assistance. https://chatgpt.com/

Supabase. (2026). Supabase documentation. https://supabase.com/docs

Vercel. (2026). Vercel platform overview and deployment documentation. https://vercel.com/docs
