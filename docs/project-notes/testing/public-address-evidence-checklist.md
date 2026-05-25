# Public Address Evidence Checklist

Purpose: provide a repeatable set of non-private addresses for live AvalonReach testing, screenshots, and final-report evidence.

Rule: use public/civic/commercial/campus locations, not private home addresses.

## How To Use

For each address:

1. Search the address on the live site.
2. Run at least `fastest` and `best-value`.
3. Record provider count, top providers, missing-price behavior, duplicate-provider behavior, and notices.
4. Capture screenshots after the deployed fixes are live.
5. If a bug appears, add or update the issue in `../progress/known-issues.md` and add the raw observation to `../working-notes/daily/YYYY-MM-DD.md`.

## Baseline Test Fields

| Field | Notes |
| --- | --- |
| Date tested | Use `YYYY-MM-DD`. |
| Address | Public address used. |
| Market type | Urban, suburban, rural, campus, small city, etc. |
| Priority | `fastest`, `best-value`, `cheapest`, `upload`, or `gaming`. |
| Provider count | Count returned by API/results page. |
| Top provider | Provider and transport label. |
| Price status | Listed price, unavailable, or mixed. |
| Duplicate-provider behavior | Clear, confusing, grouped, or not applicable. |
| Notices | Any live/fallback/data quality notice shown. |
| Screenshot | Yes/no plus filename if saved. |
| Issue update | Issue ID or `none`. |

## Address Set

| ID | Market Type | Address | Why This Address |
| --- | --- | --- | --- |
| AR-E001 | Urban baseline | `1400 John F Kennedy Blvd, Philadelphia, PA 19107` | Already used for the first live smoke test. Public civic/commercial area. |
| AR-E002 | Dense urban | `476 5th Ave, New York, NY 10018` | New York Public Library main branch; strong dense-market test. |
| AR-E003 | Dense urban / Midwest | `121 N LaSalle St, Chicago, IL 60602` | Chicago City Hall; large urban market and public address. |
| AR-E004 | West Coast urban | `200 N Spring St, Los Angeles, CA 90012` | Los Angeles City Hall; large urban West Coast market. |
| AR-E005 | Fast-growth metro | `710 W Cesar Chavez St, Austin, TX 78701` | Austin Central Library; tech-heavy market with likely fiber/cable/wireless mix. |
| AR-E006 | Mountain metro | `10 W 14th Ave Pkwy, Denver, CO 80204` | Denver Central Library; regional market diversity. |
| AR-E007 | Mid-size city | `14 W 10th St, Kansas City, MO 64105` | Kansas City Public Library Central Library; useful mid-market comparison. |
| AR-E008 | Smaller metro | `150 N Capitol Blvd, Boise, ID 83702` | Boise City Hall; smaller metro availability test. |
| AR-E009 | Campus/public institution | `1 Shields Ave, Davis, CA 95616` | UC Davis public campus address; useful campus/public institution example. |
| AR-E010 | Rural/public landmark | `1 Mammoth Cave Pkwy, Mammoth Cave, KY 42259` | Public national park address; useful rural/satellite/fixed-wireless behavior test. |

## Results Log

Fill this in during live testing after deployment.

| Date | ID | Priority | Provider Count | Top Provider / Transport | Price Status | Duplicate Behavior | Notices | Screenshot | Issue Update |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| TBD | AR-E001 | `best-value` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E001 | `fastest` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E002 | `best-value` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E002 | `fastest` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E003 | `best-value` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E003 | `fastest` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E004 | `best-value` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E004 | `fastest` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E005 | `best-value` | TBD | TBD | TBD | TBD | TBD | No | TBD |
| TBD | AR-E005 | `fastest` | TBD | TBD | TBD | TBD | TBD | No | TBD |

## Minimum Evidence Target

For the final report, capture at least:

- 5 public addresses tested.
- 2 priority modes per address.
- 1 screenshot of homepage.
- 3 screenshots of result pages across different markets.
- 1 screenshot of provider handoff page.
- 1 screenshot or terminal output of smoke test passing after deployment.
