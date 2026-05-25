# Vercel Redeploy And Retest Runbook

Purpose: get the pushed AvalonReach fixes live, then verify production with repeatable checks.

Current pushed app-fix commit: `908bfdc`  
Current local smoke-test commit: `1e612f8`  
Production URL: https://avalon-reach.vercel.app/

## Situation

GitHub `main` has the app fixes from commit `908bfdc`, but production was still serving the older build during the last check on 2026-05-25.

Vercel CLI on the OpenClaw box does not have saved credentials. It requested device login, so either:

- Alex redeploys from the Vercel dashboard, or
- Alex completes Vercel device login for this environment, then Ava can deploy from CLI.

## Dashboard Redeploy Path

1. Open Vercel dashboard.
2. Open the AvalonReach project.
3. Go to Deployments.
4. Find the latest GitHub commit on `main`.
5. Confirm the deployment uses commit `908bfdc` or newer.
6. Click Redeploy if the latest commit is not already deployed.
7. Wait for deployment to finish successfully.
8. Tell Ava deployment is complete.

## CLI Login Path

Only use this if Alex wants Ava to deploy from the OpenClaw box.

1. Ava runs:

```bash
npx vercel whoami
```

2. Vercel prints a device login URL and code.
3. Alex opens the URL and enters the code.
4. Ava confirms login.
5. Ava deploys from the repo:

```bash
npx vercel --prod
```

## Retest Commands

Once production deployment is complete:

```bash
cd /home/ubuntu/openclaw-workspace/AvalonReach
npm run smoke:deploy
```

If testing another base URL:

```bash
npm run smoke:deploy -- https://some-preview-url.vercel.app
```

## What Pass Looks Like

The smoke command should end with:

```text
Smoke test passed for https://avalon-reach.vercel.app
```

It verifies:

- homepage loads
- results page loads
- `/api/search` accepts POST
- `/api/search` rejects GET with 405
- privacy and terms pages load
- provider handoff loads
- best-value no longer shows fake zero value
- cheapest no longer treats missing price as free/cheap
- explicit price labels appear
- Xfinity cable/fiber variants are clearly labeled
- handoff page explains referral links are not live yet

## Manual Visual Checks

After the smoke command passes, manually check:

1. https://avalon-reach.vercel.app/
2. Search: `1400 John F Kennedy Blvd, Philadelphia, PA 19107`
3. Priority: Best overall
4. Confirm result cards show:
   - `Listed price: unavailable - confirm with provider`
   - `Price unavailable`
   - `Xfinity Cable / DOCSIS`
   - `Xfinity Fiber / FTTP`
5. Open `/go/verizon`.
6. Confirm it says AvalonReach does not have a live referral link yet.

## If Production Still Shows Old Build

Record:

- Vercel deployment commit SHA.
- Deployment timestamp.
- Whether build succeeded.
- Whether custom domain points to the expected project.
- Smoke test failure output.

Then update:

- `progress/known-issues.md`
- `working-notes/daily/YYYY-MM-DD.md`
- `week-04-status.md`
