# AvalonReach Build Process Map

Purpose: capture the repeatable build process so future projects can move faster and the final report has a clear development-method section.

For full context recovery after memory loss, start with `ai-recovery.md`. For mission, customer, promise, and operating rules, read `project-covenant.md`. This process map explains how the project moves.

## Process Overview

1. Define the product problem.
2. Lock the MVP scope.
3. Build the smallest working user flow.
4. Add a transparent data model.
5. Add fallback data so the demo works without perfect integrations.
6. Deploy publicly before the final stretch.
7. Test the live app with realistic inputs.
8. Fix the gaps revealed by production behavior.
9. Capture screenshots, notes, and evidence weekly.
10. Convert weekly notes into final-report and portfolio material.

## Documentation Loop

Every meaningful work session should update the docs in this order:

1. Check `ai-recovery.md` after context loss or handoff.
2. Check `project-covenant.md` if the work touches mission, customer, scope, or operating rules.
3. Add raw actions and results to `working-notes/daily/YYYY-MM-DD.md`.
4. Add or update bugs/blockers in `progress/known-issues.md`.
5. Add or update suggested paths in `progress/suggestions.md`.
6. Update milestone state in `progress/plan-progress.md`.
7. Summarize into `week-XX-status.md` when the week closes or a major milestone happens.

## Reset / Handoff Sequence

If someone new picks up the project, or if the work gets tangled, use this order:

1. Read `ai-recovery.md`.
2. Read `project-covenant.md`.
3. Read `progress/plan-progress.md`.
4. Read open items in `progress/known-issues.md`.
5. Read active items in `progress/suggestions.md`.
6. Read the latest daily note in `working-notes/daily/`.
7. Read the current week's `week-XX-status.md`.
8. Choose the smallest next action that advances the current milestone.

This keeps the mission, current state, and raw trail separated but connected.

## Stage 1: Problem and Scope

Output:

- Project brief
- 7-week roadmap
- MVP feature list

Decision rule:

- If a feature is not needed for public V1 or final course evidence, label it stretch.

## Stage 2: Working MVP

Output:

- Landing page
- Address search
- Results cards
- Priority selector
- Lead capture

Decision rule:

- Make the first version end-to-end before making any single part advanced.

## Stage 3: Data Foundation

Output:

- TypeScript domain types
- Supabase schema
- Seed/fallback provider catalog
- Recommendation rules

Decision rule:

- Prefer transparent logic for V1. A simple explainable recommendation beats a vague "AI" recommendation for course and user trust.

## Stage 4: Public Launch

Output:

- Vercel deployment
- Production environment variables
- Public URL
- Launch checklist

Decision rule:

- Deploy once the core flow works, even if data enrichment is incomplete. Public testing reveals the real next priorities.

## Stage 5: Live Testing

Output:

- 5-10 sample address tests
- screenshots
- bug list
- Week 4+ status notes
- working notes that record attempts, failures, decisions, and suggested paths

Decision rule:

- Treat live-data weirdness as product information. Do not hide incomplete data; explain it clearly.
- Record the trail, not just the conclusion, so the next project can avoid rediscovering the same path.

## Stage 6: Final Report / Portfolio Packaging

Output:

- final status summary
- screenshots
- architecture/process explanation
- resume-ready project description

Decision rule:

- The final report should tell the story of staged engineering progress: plan, build, deploy, test, improve.
