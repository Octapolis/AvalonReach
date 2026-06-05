# Week 4 Progress Report #3: AvalonReach Production Validation

**Your Name:** [Add full name from prior report]  
**Organization Name:** AvalonReach / CMIT 450 Senior Seminar Project  
**Contributing Personnel:** Student project owner; OpenAI Codex/OpenClaw used as an AI-assisted development and documentation support environment under student direction  
**Course:** CMIT 450 Senior Seminar Project  
**Reporting Period:** Week 4  
**Live Product URL:** https://avalon-reach.vercel.app/  
**Repository:** https://github.com/Octapolis/AvalonReach

## Table of Contents

1. Introduction ........................................................................ p. 1  
2. Project Plan & Weekly Timeline .................................................... p. 2  
3. Summary of Work Completed During This Reporting Period ........................... p. 3  
4. Status, Issues, and Analysis ...................................................... p. 4  
5. Digital Evidence of Work Completed ................................................. p. 6  
6. Conclusion and Self-Reflection .................................................... p. 8  
7. Bibliography ...................................................................... p. 9

*Note: final page numbers should be updated after the report is pasted into Word or Google Docs and pagination is finalized.*

## 1. Introduction

AvalonReach is a web-based broadband comparison and recommendation application. The project is designed to help users search for internet service options at a real address, compare available providers, and receive a clear recommendation based on measurable plan characteristics. The main business problem is that residential internet shopping is fragmented: users often have to visit several provider websites, compare different technology types, and interpret incomplete or inconsistent availability information before making a decision.

The product being created from this project is a deployed public web application. The current version includes an address/location search interface, live provider results, provider result cards, recommendation logic, transport type labels, provider handoff pages, and Save Search lead capture connected to a Supabase database. The project uses a modern web stack including Next.js, TypeScript, GitHub, Vercel, and Supabase.

The Week 3 milestone moved AvalonReach from a planned MVP into an actively deployed public product. Week 4 focused on validating that public deployment, testing whether the deployed system actually works, and documenting production issues that appeared after launch. This reporting period therefore emphasizes status and issues rather than future plans.

## 2. Project Plan & Weekly Timeline

The project remains organized around a seven-week build plan. The timeline below summarizes the intended progression and current status.

| Week | Planned Focus | Current Status |
| --- | --- | --- |
| Week 1 | Project foundation, product concept, initial app scaffold | Complete |
| Week 2 | Data model, Supabase direction, deployable MVP preparation | Complete |
| Week 3 | Public V1 launch through Vercel | Complete |
| Week 4 | Recommendation validation, live testing, production issue handling | In progress / this report |
| Week 5 | Saved results, dashboard, retention flow | Planned |
| Week 6 | Referral/admin-ready provider workflow, production hardening | Planned |
| Week 7 | Final report, screenshots, presentation, buffer | Planned |

The major Week 4 goal was to move from "the product is deployed" to "the deployed product has been tested and verified." This distinction matters because a public website can load successfully while still having untested database writes, incomplete data behavior, or confusing recommendation explanations.

## 3. Summary of Work Completed During This Reporting Period

During Week 4, AvalonReach moved into production validation. The live application was tested at the public URL, and the search/results flow was verified using a public Philadelphia address rather than a private residential address. The application loaded successfully, accepted a search, returned provider result cards, and displayed ranked provider options.

The most important completed work was confirming that production database writes are functioning. A controlled Save Search test was submitted through the live application using a school email address. After submission, the Supabase database was queried and confirmed to contain a new lead row. Related production rows were also confirmed in the search, search area, and recommendation tables. This verified that the deployed frontend, API route, and database persistence path are connected correctly.

The recommendation result presentation was also reviewed. AvalonReach currently supports several priority modes, but the course MVP is best framed around the fastest-plan recommendation flow because it is the most measurable and defensible at this stage. Existing broader modes such as cheapest, upload, gaming/low-lag, and best overall remain in the product as expanded functionality, but the report framing treats the fastest-plan flow as the official MVP story.

Work completed during this reporting period included:

- Verified the live Vercel deployment at https://avalon-reach.vercel.app/.
- Confirmed the homepage/search interface loads publicly.
- Confirmed the results page returns provider cards for a public address.
- Confirmed the fastest recommendation flow ranks providers by advertised download speed.
- Confirmed transport type labels appear in results, including Fiber/FTTP, Cable/DOCSIS, Fixed Wireless, LEO Satellite, and Traditional Satellite.
- Confirmed missing monthly pricing is shown as unavailable rather than presented as zero-dollar service.
- Confirmed the Save Search lead-capture path writes to Supabase.
- Confirmed related search, search-area, and recommendation records exist in production.
- Ran the production smoke test successfully.
- Captured Week 4 evidence screenshots with explicit figure captions.
- Documented a concrete rural/limited-service user scenario for recommendation validation.

## 4. Status, Issues, and Analysis

### 4.1 Current Project Status

AvalonReach is now beyond the planning-only stage. It is a public, deployed MVP with a working user journey: search for an address or location, view provider options, evaluate the recommended result, and save the search. The current deployed application is strong enough to support the core course demonstration because it proves the application is not only designed but also operating in production.

The strongest Week 4 milestone is database verification. In earlier weeks, the project focused on interface construction and public deployment. During this reporting period, the Save Search workflow proved that user input can move from the live site into persistent storage. For a business information system, that is a key transition from a static demonstration to a functioning application workflow.

### 4.2 Issue: Deployment Does Not Automatically Prove Functionality

One issue identified during Week 4 was that a successful deployment does not automatically prove the entire system works. A Vercel deployment can serve pages correctly while database writes, API routes, or persistence logic remain untested.

The response was to verify the system through both a smoke test and direct database evidence. The smoke test confirmed that key routes and expected production behaviors passed. The Save Search test confirmed that the deployed application could write a lead record to Supabase. This helped close the gap between "the site loads" and "the system works."

### 4.3 Issue: Broadband Data Quality and Missing Pricing

Live broadband data can be incomplete. During testing, provider availability and technology type were returned, but monthly pricing was often missing. This matters because a recommendation system can become misleading if it treats missing price data as zero cost or as a confirmed cheap option.

The Week 4 handling approach was transparency. Result cards now state when a listed price is unavailable and instruct users to confirm price with the provider. This is more honest than pretending the application has complete pricing information. It also supports the project goal of making recommendations understandable rather than hiding uncertainty behind a score.

This issue connects directly to the broader business problem. Internet provider comparison is difficult because availability, price, performance, and promotional details are not always available in a single consistent data source. The FCC National Broadband Map is based on provider-reported availability data, and the FCC notes that the map shows availability rather than all consumer decision factors such as performance, adoption, or affordability.[^1] AvalonReach's design therefore needs to communicate data limitations clearly.

### 4.4 Issue: Scope Control and Recommendation Complexity

The project originally considered several recommendation categories, including cheapest, best value, upload priority, and gaming/low-lag optimization. Those features are useful, but they increase the testing burden. The Week 3 report framed the MVP around the fastest available plan because speed is easier to measure and explain.

The Week 4 decision was not to remove working features simply to match earlier wording. Instead, the report frames the fastest-plan flow as the official course MVP and treats the other modes as expanded functionality already implemented and still being refined. This preserves project value while keeping the milestone defensible.

### 4.5 Concrete User Scenario for Recommendation Validation

One recommendation scenario documented for Week 4 is a rural or limited-service user. In this scenario, a user may not have several fiber or cable options. Instead, the available choices may include fixed wireless, DSL if available, traditional satellite, or LEO satellite such as Starlink. The recommendation logic should not treat every available option as equal just because it appears in the results.

For this type of user, transport type is important. A traditional satellite plan may provide broad coverage but can have higher latency. Fixed wireless may depend on signal quality and local congestion. Fiber, when available, is generally stronger for speed and upload performance. This scenario helps validate why AvalonReach displays transport type labels and explanation text instead of only showing provider names.

### 4.6 Connection to Systems and Business Information Concepts

This reporting period connects to systems and business information concepts because AvalonReach is becoming an integrated information system. The user interface, API routes, live broadband lookup, recommendation logic, and Supabase database are separate components, but they must operate together to produce business value.

The Week 4 testing process also showed the importance of validation and feedback loops. A system should not be evaluated only by whether the frontend appears complete. It must also be tested for data capture, persistence, error handling, and decision-support quality. AvalonReach is intended to support a business decision: choosing an internet provider. That means the recommendation output must be understandable, evidence-based, and transparent about incomplete information.

## 5. Digital Evidence of Work Completed

The following figures document work completed during the Week 4 reporting period. The screenshots are stored in the project evidence folder:

`docs/project-notes/evidence/week-04-report-3/`

**Figure 1: Public AvalonReach Homepage and Search Interface.**  
This screenshot shows the live public homepage at https://avalon-reach.vercel.app/. It documents that users can access the deployed AvalonReach search interface and choose a recommendation priority.

**File:** `01-homepage.png`

**Figure 2: Live Provider Results for a Public Philadelphia Address.**  
This screenshot shows ranked provider cards for `1400 John F Kennedy Blvd, Philadelphia, PA 19107`, a public civic/commercial address. It demonstrates provider results, advertised speeds, missing-price transparency, and transport type labels such as Fiber/FTTP, Cable/DOCSIS, Fixed Wireless, LEO Satellite, and Traditional Satellite.

**File:** `02-results-fastest-public-address.png`

**Figure 3: Production Database Verification After Save Search Test.**  
This screenshot summarizes the production Supabase verification after a controlled Save Search test. The email address is masked, but the evidence confirms a lead row was created and that related search, search-area, and recommendation records exist in production.

**File:** `04-database-verification.png`

**Figure 4: GitHub and Production Smoke Test Verification.**  
This screenshot documents recent GitHub commit activity, current repository/deployment state, and a successful production smoke test against https://avalon-reach.vercel.app/. It supports the chain of evidence from source control to deployed behavior.

**File:** `05-github-and-smoke-verification.png`

**Figure 5: Provider Handoff Page Showing MVP-Honest Referral Status.**  
This screenshot shows the Verizon provider handoff page. It states that AvalonReach does not yet have a live referral link for that provider and instructs the user to confirm availability, monthly price, promotions, fees, and installation details directly with the provider. This supports the transparency strategy used throughout the MVP.

**File:** `03-provider-handoff-verizon.png`

## 6. Conclusion and Self-Reflection

Week 4 changed the project from a deployed prototype into a more credible production MVP. The most important lesson from this reporting period was that deployment is not the same as validation. In Week 3, getting AvalonReach online was the milestone. In Week 4, the work shifted toward proving that the deployed system actually performs the functions required for the project.

The strongest accomplishment this week was verifying production database writes. The Save Search test showed that user input can travel through the deployed application and be stored in Supabase. That matters because AvalonReach is not intended to be only a static website. It is supposed to be a business information system that captures searches, supports follow-up, and eventually supports provider referral workflows.

Another important accomplishment was improving how the project handles incomplete data. Rather than hiding missing prices or pretending unavailable pricing is zero, the application now communicates uncertainty more honestly. This made the recommendation system more defensible. It also helped clarify the next product direction: the fastest-plan MVP is the clearest course milestone, while additional recommendation modes should continue to be tested as expanded features.

Compared with the planned Week 4 milestones, the project made strong progress on validation, evidence collection, recommendation transparency, and production testing. Some work remains for future weeks, including broader rural/suburban test cases, more provider handoff data, and a more complete saved-results/dashboard experience. However, the core Week 4 objective was met: AvalonReach is now publicly deployed, tested with live results, and verified with production database evidence.

## 7. Bibliography

Federal Communications Commission. "How to Use the FCC's National Broadband Map." FCC Broadband Data Collection Help Center. https://help.bdc.fcc.gov/hc/en-us/articles/10467446103579-How-to-Use-the-FCC-s-National-Broadband-Map

Federal Communications Commission. "How to Submit an Availability Challenge." FCC Broadband Data Collection Help Center. https://help.bdc.fcc.gov/hc/en-us/articles/10476040597787-How-to-Submit-an-Availability-Challenge

Next.js. "Deploying." Next.js Documentation. https://nextjs.org/docs/app/getting-started/deploying

Supabase. "Row Level Security." Supabase Documentation. https://supabase.com/docs/guides/database/postgres/row-level-security

Vercel. "Deploying Git Repositories with Vercel." Vercel Documentation. https://vercel.com/docs/deployments/git

Vercel. "Deploying to Vercel." Vercel Documentation. https://vercel.com/docs/deployments/deployment-methods

[^1]: The FCC explains that the National Broadband Map displays availability information reported through the Broadband Data Collection process. Its challenge guidance also distinguishes availability from other consumer decision factors such as performance, affordability, and adoption.
