# CMIT 450 Project Plan: AvalonReach

## Project Title

**AvalonReach: Internet Provider Comparison and Recommendation Website**

## Project Overview

For my CMIT 450 semester project, I plan to build **AvalonReach**, a web application that helps users compare home internet options available at their address. Choosing an internet provider can be confusing because customers often have to compare speed, price, availability, technology type, upload speed, contracts, and reliability across multiple provider websites. Provider websites are also usually biased toward selling only their own plans.

AvalonReach will allow a user to enter an address, view available internet provider options, select their priorities, and receive a clear recommendation. The goal is to create a practical, real-world software project that could eventually become a live referral or lead-generation website.

## Problem Statement

Many people struggle to choose the best internet provider for their home because provider information is scattered, difficult to compare, and not always presented in a user-friendly way. Users may not know whether they should prioritize the cheapest plan, fastest download speed, best upload speed, gaming performance, reliability, or overall value. This project will solve that problem by organizing provider information into one simple comparison and recommendation tool.

## Proposed Solution

AvalonReach.com will be a responsive website where users can:

1. Enter an address or service location
2. View internet providers and plans available for that area
3. Compare plans based on price, speed, and other key factors
4. Choose priorities such as best value, cheapest, fastest, upload speed, or gaming
5. Receive a plain-English recommendation
6. Save or submit their contact information for follow-up or deal alerts

The first version may use sample data while the core application is being built. Later versions will connect to live broadband availability data or provider APIs where possible.

## Target Users

The primary users for this application include:

- People moving to a new home or apartment
- Current internet customers looking for a better provider or plan
- Remote workers and students who need reliable internet
- Gamers, streamers, and content creators who care about speed, upload, and latency
- Households comparing internet options by price and performance

## Major Features

### Minimum Viable Product Features

- Landing page explaining the service
- Address/search form
- Provider result cards
- Priority selector for user preferences
- Recommendation scoring algorithm
- Lead capture form with email consent
- Basic database structure for searches and leads
- Responsive design for desktop and mobile users

### Stretch Features

- Live broadband availability lookup
- User accounts and saved searches
- AI-generated recommendation explanations
- Provider referral or affiliate links
- Local market landing pages
- Deal alerts or price tracking
- Admin dashboard for managing provider data

## Technology Plan

The planned technology stack is:

- **Frontend/Backend Framework:** Next.js
- **Programming Language:** TypeScript
- **Database/Auth:** Supabase
- **Deployment:** Vercel
- **Data Source:** Initially sample provider data, then FCC/Broadband Map data or provider API integrations if available

This stack was chosen because it supports rapid development, responsive web design, database integration, authentication, and cloud deployment.

## Data and Database Plan

The application will likely include tables or data models for:

- Users or leads
- Search history
- Provider information
- Internet plans
- Referral links
- Saved search results

The database will allow the project to move beyond a static demo and become a functional application that stores user searches and contact requests.

## Development Timeline

### Week 1: Project Foundation

- Set up the project structure
- Create the landing page
- Build the first search/results flow
- Add the initial search API, lead capture route, provider cards, recommendation structure, privacy/terms pages, and launch documentation
- Finalize the project proposal and core requirements

### Week 2: Data Model and Launch Infrastructure

- Set up the Supabase project
- Create tables for leads, search history, saved results, provider data, and referral links
- Connect lead capture and search persistence to the database
- Add seed data for initial provider/referral records
- Improve error handling for unavailable or incomplete lookup data
- Prepare production environment variables for Vercel

### Week 3: Public V1 Launch

- Deploy the application to Vercel
- Configure the public URL or domain
- Enable live broadband lookup where possible, with labeled fallback data if needed
- Test the full user flow from address search to provider comparison to lead submission
- Capture launch screenshots and demo evidence

### Week 4: Recommendation Engine V2

- Improve the scoring algorithm for cheapest, fastest, best value, upload speed, and gaming priorities
- Add clearer explanation text for why a provider or plan is recommended
- Show data-source and confidence notes on the results page
- Document or test the recommendation scenarios

### Week 5: Accounts and Saved Results

- Add user authentication if time allows, or create an email-based saved-search flow
- Build out the dashboard/saved-results page
- Let users save searches or request follow-up
- Improve mobile design, loading states, and empty states

### Week 6: Referral/Admin Features and Full Completion

- Add provider referral link support
- Create an admin-ready provider data workflow, seed script, or lightweight admin view
- Complete UI polish, validation, accessibility, and production hardening
- Run final testing on the deployed site
- Finalize README, project brief, launch checklist, data notes, and demo script

### Week 7: Presentation, Buffer, and Stretch Features

- Prepare the final course submission and presentation
- Capture final screenshots and walkthrough materials
- Use this week only for buffer, bug fixes, or optional stretch features such as AI recommendation explanations, local market landing pages, or provider enrichment

## Expected Final Deliverable

By the end of the semester, I plan to have a deployed web application where a user can search for internet options, compare provider plans, select priorities, and receive a recommendation. Even if every provider integration is not complete, the application will demonstrate a working software system with a database, user input, search results, ranking logic, and deployment.

## Why This Project Is Appropriate for CMIT 450

This project is appropriate for CMIT 450 because it includes real software planning, web application development, database design, user interface design, data processing, and deployment. It is also practical because it solves a real problem and could continue to be developed after the course as a live product.

## Project Success Criteria

The project will be successful if it can:

- Accept user input through an address/search form
- Display internet provider results in a clear format
- Rank or recommend plans based on user priorities
- Store lead or search information in a database
- Work well on desktop and mobile screens
- Be deployed online for demonstration
- Provide a clear foundation for future live provider integrations
