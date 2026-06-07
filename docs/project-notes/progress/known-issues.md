# Known Issues

Last updated: 2026-06-07

## Open

### AR-I004 - Production Supabase behavior needs verification

Status: Fixed  
Found: 2026-05-23  
Source: `../working-notes/daily/2026-05-23.md`

Description:

- Schema and seed files exist, but production reads/writes still need direct verification.

Fix:

- On 2026-06-07, production `/api/saved-searches?email=test@example.com` returned `{"configured":true,"searches":[]}` after Vercel picked up the Supabase service role key.
- A controlled production lead/save-search request returned `{"ok":true,"stored":true}`.
- Production `/api/saved-searches` returned the saved row for the controlled test email.
- `npm run smoke:deploy -- https://avalon-reach.vercel.app` passed.

### AR-I005 - Lead capture not yet tested on production

Status: Fixed  
Found: 2026-05-25  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Lead form route exists, but production storage was not tested in the first live smoke test.

Fix:

- A controlled production lead/save-search test was submitted on 2026-06-07.
- The API returned `stored:true`.
- The saved search was readable through the production saved-results API for the controlled email.

### AR-I006 - Official MVP framing and visible recommendation modes need alignment

Status: Open  
Found: 2026-05-25  
Source: `../source-reports/week-03-progress-report-2.md`

Description:

- The submitted Week 3 progress report frames the public MVP around one measurable recommendation variable: fastest available internet plan.
- Current app/docs still mention broader priority modes such as best value, upload priority, and gaming-oriented recommendations.
- This can make the final report narrative and live product behavior feel inconsistent.

Suggested fix:

- Do not remove or downgrade existing built features just to match the report.
- Explain that fastest-plan recommendation is the official MVP story while broader priority modes are existing expanded functionality that need testing and clearer copy.
- Align `week-04-status.md`, final-report evidence, and UI copy after the decision.

### AR-I009 - Week 5 saved-results dashboard needs production setup

Status: Fixed / polish ongoing  
Found: 2026-06-04  
Source: `../working-notes/daily/2026-06-04.md`, `../working-notes/daily/2026-06-05.md`

Description:

- The email-based saved-results dashboard is implemented in code and build-verified.
- The dashboard code was pushed to both deployment remotes in commit `081d19d`.
- Production now serves the new `/dashboard` UI and `/api/saved-searches` route.
- The app intentionally does not expose saved-search reads through the public Supabase anon key.
- Production private lookup now has the required server-only Supabase service role key and returns `configured:true`.

Fix:

- Alex confirmed the Vercel Supabase environment variables were configured for Production and redeployed.
- Production saved-results API returned `configured:true`.
- A controlled Save Search test was stored and then returned by `/api/saved-searches?email=...`.
- Follow-up polish is renaming the user-facing dashboard concept to results-page language, adding Search Again, and showing recent on-device searches.

## Fixed

### AR-I001 - Missing price data makes best-value scoring awkward

Status: Fixed  
Found: 2026-05-25  
Fixed: 2026-05-26  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Live broadband lookup returns speed and technology data but not reliable monthly pricing.
- In best-value mode, the app previously displayed `0.0 Mbps per dollar` and score `0`, which was misleading.
- In cheapest mode, missing prices previously looked like budget results even though no listed monthly price existed.

Fix:

- `valueScore` is now `null` when monthly price is unavailable.
- Result cards use `scoreLabel` instead of raw `Score {number}`.
- Best-value unknown-price plans show `Price unavailable` and explain the speed/connection-type fallback.
- Cheapest unknown-price plans show `Price unavailable` and explain they cannot be confirmed as cheapest without listed pricing.
- Live production smoke test passed on 2026-05-26.
- Live API retest for `1400 John F Kennedy Blvd, Philadelphia, PA 19107` returned `Price unavailable` for best-value and cheapest, explicit unavailable price labels, and no fake `0.0 Mbps per dollar` copy.

### AR-I002 - Duplicate provider entries can appear across technologies

Status: Fixed  
Found: 2026-05-25  
Fixed: 2026-05-26  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Live results can show the same provider multiple times with different technology labels, such as Xfinity cable and Xfinity fiber.

Fix:

- Live results without a plan name now use provider plus transport label as the card heading, such as `Xfinity Cable / DOCSIS` and `Xfinity Fiber / FTTP`.
- Recommendation explanations now include the transport label when no plan name exists.
- Live production smoke test passed on 2026-05-26 and confirmed Xfinity cable/fiber variants are distinguishable.

### AR-I003 - Provider handoff links are not production referral links yet

Status: Fixed for MVP / production data still future work  
Found: 2026-05-23  
Fixed: 2026-05-26  
Source: `../working-notes/daily/2026-05-23.md`

Description:

- Provider handoff routes exist, but production referral/provider URLs still need real data.

Fix:

- Updated `/go/[provider]` user-facing copy to clearly say AvalonReach does not have a live referral link for the provider yet.
- Added explicit instructions to confirm availability, monthly price, promos, fees, and installation details directly with the provider.
- Added actions for update alerts and searching another address.
- Live production smoke test passed on 2026-05-26 and confirmed `/go/verizon` contains the no-live-referral warning and provider-confirmation instructions.

### AR-I008 - Price status should be visible on every result card

Status: Fixed  
Found: 2026-05-25  
Fixed: 2026-05-26  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Price status was only implied through score labels or recommendation explanations.
- Users needed a dedicated price line on every card to distinguish listed prices from unavailable live pricing.

Fix:

- Added `priceLabel` to ranked provider results.
- Result cards now show `Listed price: $X/mo` when pricing exists.
- Result cards now show `Listed price: unavailable - confirm with provider` when live pricing is missing.
- Homepage sample cards also show listed prices.
- Live production smoke test passed on 2026-05-26 and confirmed explicit unavailable price lines on the results page.

### AR-I007 - Lint script no longer worked with installed Next version

Status: Fixed  
Found: 2026-05-25  
Fixed: 2026-05-25  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- `npm run lint` ran `next lint`.
- With the installed Next version, the command failed with: `Invalid project directory provided, no such directory: /home/ubuntu/openclaw-workspace/AvalonReach/lint`.

Fix:

- Added `eslint.config.mjs` using the Next flat ESLint config.
- Changed `package.json` lint script to `eslint .`.
- Replaced internal navigation anchors in `app/layout.tsx` with Next `Link`.
- Verified `npm run lint`, `npm run typecheck`, and `npm run build` pass.
