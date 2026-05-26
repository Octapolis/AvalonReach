# Vercel Redeploy And Retest Runbook

Purpose: get the pushed AvalonReach fixes live, then verify production with repeatable checks.

Current pushed app-fix commit: `59d1458`  
Current local smoke-test commit: `1e612f8`  
Production URL: https://avalon-reach.vercel.app/

## Situation

GitHub `main` has the app fixes from commit `59d1458`. Vercel blocked earlier pushed commits when the Git author was `Ava <ava@openclaw.local>`, because that identity was treated as an external/team author instead of the GitHub project owner.

Vercel CLI on the OpenClaw box does not have saved credentials. It requested device login, so either:

- Alex redeploys from the Vercel dashboard, or
- Alex completes Vercel device login for this environment, then Ava can deploy from CLI.

## GitHub Author Preflight

Run this before creating any deployment-triggering commit. Vercel must see the commit author as the GitHub owner identity.

```bash
cd /home/ubuntu/.openclaw/workspace/projects/avalonreach
git config user.name "Octapolis"
git config user.email "181661051+Octapolis@users.noreply.github.com"
git config user.name
git config user.email
```

The final two commands should print:

```text
Octapolis
181661051+Octapolis@users.noreply.github.com
```

After committing, verify the latest commit author before pushing:

```bash
git log -1 --format='%h %an <%ae> %s'
```

If the author is wrong, fix the commit before pushing:

```bash
GIT_AUTHOR_NAME="Octapolis" \
GIT_AUTHOR_EMAIL="181661051+Octapolis@users.noreply.github.com" \
GIT_COMMITTER_NAME="Octapolis" \
GIT_COMMITTER_EMAIL="181661051+Octapolis@users.noreply.github.com" \
git commit --amend --no-edit --reset-author
```

Then verify again with `git log -1 --format='%h %an <%ae> %s'`.

## Dashboard Redeploy Path

1. Open Vercel dashboard.
2. Open the AvalonReach project.
3. Go to Deployments.
4. Find the latest GitHub commit on `main`.
5. Confirm the deployment uses commit `59d1458` or newer.
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

## If Vercel Blocks The Commit As A Team Project

This usually means the pushed Git commit author is not the GitHub owner identity Vercel expects.

1. Check the latest commit author:

```bash
git log -1 --format='%h %an <%ae> %s'
```

2. If it is not `Octapolis <181661051+Octapolis@users.noreply.github.com>`, amend it:

```bash
GIT_AUTHOR_NAME="Octapolis" \
GIT_AUTHOR_EMAIL="181661051+Octapolis@users.noreply.github.com" \
GIT_COMMITTER_NAME="Octapolis" \
GIT_COMMITTER_EMAIL="181661051+Octapolis@users.noreply.github.com" \
git commit --amend --no-edit --reset-author
```

3. Push the rewritten commit to both GitHub repos:

```bash
git push public HEAD:main --force-with-lease
git push private HEAD:main --force-with-lease
```

4. Confirm Vercel now sees the rewritten commit as deployable.
