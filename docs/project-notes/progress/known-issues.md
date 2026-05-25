# Known Issues

Last updated: 2026-05-25

## Open

### AR-I001 - Missing price data makes best-value scoring awkward

Status: Fixed locally / pending deployment  
Found: 2026-05-25  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Live broadband lookup returns speed and technology data but not reliable monthly pricing.
- In best-value mode, the app can display `0.0 Mbps per dollar` and score `0`, which is misleading or unhelpful.
- In cheapest mode, when all prices are missing, the app shows score `0` and budget copy even though no listed monthly price exists.

Suggested fix:

- If `estimatedMonthlyPrice` is missing, do not calculate value score.
- Show "price unavailable" or "pricing must be confirmed."
- In best-value mode, use a fallback ranking based on speed plus transport quality and clearly explain that pricing is unavailable.
- In cheapest mode, explain that price data is unavailable and avoid presenting missing-price plans as cheaper.

Local fix:

- `valueScore` is now `null` when monthly price is unavailable.
- Result cards use `scoreLabel` instead of raw `Score {number}`.
- Best-value unknown-price plans show `Price unavailable` and explain the speed/connection-type fallback.
- Cheapest unknown-price plans show `Price unavailable` and explain they cannot be confirmed as cheapest without listed pricing.
- Local API/results page checks no longer show `0.0 Mbps per dollar` or `Score 0`.
- Still needs public deployment and live retest before moving to Fixed.

### AR-I002 - Duplicate provider entries can appear across technologies

Status: Fixed locally / pending deployment  
Found: 2026-05-25  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Live results can show the same provider multiple times with different technology labels, such as Xfinity cable and Xfinity fiber.

Suggested fix:

- Keep provider/technology variants as separate results for now.
- Make the technology distinction more prominent so duplicate provider names are not confusing.

Local fix:

- Live results without a plan name now use provider plus transport label as the card heading, such as `Xfinity Cable / DOCSIS` and `Xfinity Fiber / FTTP`.
- Recommendation explanations now include the transport label when no plan name exists.
- Local results page verification shows no bare `Xfinity</h3>` duplicate headings for the baseline address.
- Still needs public deployment and live retest before moving to Fixed.

### AR-I003 - Provider handoff links are not production referral links yet

Status: Fixed locally / pending deployment  
Found: 2026-05-23  
Source: `../working-notes/daily/2026-05-23.md`

Description:

- Provider handoff routes exist, but production referral/provider URLs still need real data.

Suggested fix:

- Add real provider URLs or mark links as demo/sample.
- Use `provider_links` table for production handoff data.

Local fix:

- Updated `/go/[provider]` user-facing copy to clearly say AvalonReach does not have a live referral link for the provider yet.
- Added explicit instructions to confirm availability, monthly price, promos, fees, and installation details directly with the provider.
- Added actions for update alerts and searching another address.
- Local `/go/verizon` returned HTTP 200 and contained the new handoff copy/actions.
- Still needs public deployment and live retest before moving to Fixed.

### AR-I004 - Production Supabase behavior needs verification

Status: Open  
Found: 2026-05-23  
Source: `../working-notes/daily/2026-05-23.md`

Description:

- Schema and seed files exist, but production reads/writes still need direct verification.

Suggested fix:

- Verify catalog reads.
- Verify search and recommendation inserts.
- Use a controlled test email before testing lead capture.

### AR-I005 - Lead capture not yet tested on production

Status: Open  
Found: 2026-05-25  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Lead form route exists, but production storage was not tested in the first live smoke test.

Suggested fix:

- Decide a controlled test email.
- Submit one production lead test.
- Verify the row appears in Supabase.

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

### AR-I008 - Price status should be visible on every result card

Status: Fixed locally / pending deployment  
Found: 2026-05-25  
Source: `../working-notes/daily/2026-05-25.md`

Description:

- Price status was only implied through score labels or recommendation explanations.
- Users needed a dedicated price line on every card to distinguish listed prices from unavailable live pricing.

Local fix:

- Added `priceLabel` to ranked provider results.
- Result cards now show `Listed price: $X/mo` when pricing exists.
- Result cards now show `Listed price: unavailable - confirm with provider` when live pricing is missing.
- Homepage sample cards also show listed prices.
- Local results page for the baseline live address shows unavailable price labels; homepage sample cards show listed fallback prices.
- Still needs public deployment and live retest before moving to Fixed.

## Fixed

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
