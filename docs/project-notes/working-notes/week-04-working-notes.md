# Week 4 Working Notes

Week start: 2026-05-25  
Theme: live testing, recommendation cleanup, and evidence capture

Daily source notes:

- `daily/2026-05-25.md`

This file is a week-level rollup. Going forward, add raw entries to `daily/YYYY-MM-DD.md` first, then summarize here if useful.

## 2026-05-25 - Live Site Smoke Test

Context:

- Week 4 began after the live Vercel launch.
- The immediate question was whether the deployed site actually worked for a real search.
- A public address was used instead of a private personal address.

Test target:

- Site: https://avalon-reach.vercel.app/
- Test address: `1400 John F Kennedy Blvd, Philadelphia, PA 19107`

Actions tried:

- Checked homepage response.
- Loaded results page with address and priority query string.
- Called `/api/search` with the test address.
- Checked provider handoff route `/go/verizon`.
- Checked `/privacy` and `/terms`.

Result:

- Homepage returned HTTP 200.
- Results page rendered.
- `/api/search` returned HTTP 200.
- Live lookup geocoded the address to Philadelphia, PA.
- Live broadband lookup returned real provider results:
  - Verizon
  - Xfinity
  - Hotwire Communications
  - Starlink
  - AT&T
  - HughesNet
  - T-Mobile
  - MINTernet
  - Viasat
- `/go/verizon`, `/privacy`, and `/terms` returned HTTP 200.

Issue / blocker:

- Live broadband data includes speed/technology but not reliable pricing.
- Best-value mode currently shows awkward `0.0 Mbps per dollar` / score `0` when price is missing.
- Duplicate provider entries can appear for different technologies, such as Xfinity cable and Xfinity fiber.
- Lead capture storage was not tested during this pass to avoid creating unnecessary live lead records.

Decision:

- Treat the live app as working but needing Week 4 refinement.
- Prioritize missing-price handling before broader feature expansion.

Next:

- Update recommendation logic and UI copy:
  - If price is missing, do not calculate Mbps-per-dollar.
  - Show "price unavailable" or "pricing must be confirmed."
  - For best-value mode with missing price, fall back to speed + transport quality and explain the fallback.
- Create a 5-10 address live-test checklist.
- Decide on a controlled test email before testing lead capture in production.

## 2026-05-25 - Documentation Structure

Context:

- Weekly status reports are useful for summaries, but they do not capture the detailed engineering trail.
- The final report, resume writeup, and future build process need both polished status and raw working notes.

Actions tried:

- Created `docs/project-notes/` for weekly project reporting.
- Created `docs/project-notes/working-notes/` for action-by-action project history.
- Added Week 1-4 status reports.
- Expanded Week 3 status into final-report/resume-ready language.
- Added `docs/project-notes/process-map.md`.

Result:

- The project now has three documentation layers:
  - status reports for course summaries
  - working notes for engineering history
  - process map for future repeatability

Issue / blocker:

- Earlier weeks are reconstructed from memory and commits rather than written day-by-day at the time.

Decision:

- Use working notes going forward whenever a test, failed path, blocker, or decision happens.

Next:

- Keep adding entries as Week 4 fixes and tests happen.
- Use the working notes as raw material for final report sections.
