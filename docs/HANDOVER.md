# Handover: MHTS blog automation and site health (25 Sep 2026)

Read this, then AUTOMATION.md (the single source of truth; it wins over anything else, including memory).

## Carlo's decision, 25 Sep

Finish MHTS completely before touching any other client:
1. The full MHTS weekly blog workflow, proven end to end on the live site.
2. A complete MHTS website health check: technical SEO, on-page SEO, UX/UI, site structure and internal linking, design consistency, the blog index page, sitemap and robots, structured data, performance, accessibility, security (headers, dependencies, secrets, forms).

Georges, BDB and PV are paused. Their rollout is built and committed locally but NOT pushed (see below). Do not push those repos or start their steps until Carlo says so.

## Standing rules (from Carlo)

- Never commit a secret. Credentials go in GitHub Actions secrets only.
- The live site is a real business that ranks. Nothing touches production without Carlo seeing what changed first.
- Update AUTOMATION.md and commit it whenever a meaningful decision or change is made.
- Verify claims against the actual repo and the live site. Report real numbers from real checks. Own mistakes plainly.
- Carlo is not a developer: plain English, exact button clicks, complete Windows Command Prompt commands from the `cd` onwards.
- Short replies, bullet points, no em dashes anywhere, no long summaries. End every reply with a one-line status.
- Budget is tight (Anthropic credits): estimate the cost of any paid run before asking him to start it.
- Settled, do not reopen: Astro rejected, R2 dropped, DataForSEO dropped, Hermes Agent rejected.

## Repos and where things run

- `carlovacirca/mhts-site`, local `C:\Users\0\1. Rank SEO\menshairtostay`: the site (React 18, Vite 5, Tailwind, shadcn). Cloudflare Pages project `menshairtostay`. Pushing to main deploys production via `.github/workflows/deploy.yml`; each PR gets a preview at `pr-<n>.menshairtostay.pages.dev`. Posts are markdown in `src/content/blog/`, validated at build time.
- `carlovacirca/rank-automation`, local `C:\Users\0\1. Rank SEO\rank-automation`: the agents (Node scripts run by GitHub Actions), the Cloudflare Worker `https://rank-automation.carlo-vacirca.workers.dev` (API, schedule, Telegram webhook) and D1 database `rank-automation`.
- Telegram: bot @Rank_automation_bot, group "MHTS Blogs" linked to client `mhts`.

## The weekly cycle now (Carlo's design, 24 Sep)

- Friday 06:00 UTC: Worker starts the "Weekly blog" workflow: research picks one topic, the writer writes it, the image is made (OpenAI gpt-image-2), a PR and preview open, and Telegram gets title + 3 to 5 bullets + image + preview link + Approve / Reject.
- Approve: queued; Monday 05:00 UTC the Worker squash-merges it and says "Live now".
- Reject: the bot asks why (reply to its message); the reason closes the PR and starts a new run with it as feedback. Reply "skip" for no post that week.
- `/queue@Rank_automation_bot` in the group lists posts waiting for approval or waiting to go live.
- Manual controls (rank-automation, Actions): "Weekly blog", "Run weekly step now" (weekly or publish; publish can take a task_id to publish one approved post now), "Unpublish", "Update agent prompt", "Telegram setup".
- Cost per week per client: about $0.85 (research about $0.33, writer about $0.45, image $0.04).

## MHTS state right now

- Post queue: finasteride post (task 5, PR #1, branch `post/finasteride-mhra-safety-warning-2026`) dated Mon 5 Oct. A test post from Carlo's test run (branch `post/can-a-hair-system-cause-traction-alopecia`) dated Mon 12 Oct, which Carlo approved, so it WILL go live on 12 Oct unless rejected. Ask Carlo whether to keep it, and check both with /queue first.
- Monday 5 Oct 05:00 UTC is the first real automated merge. Verify it: PR merged, deploy green, post live, "Live now" in Telegram.
- Unpushed commit `ff583fd` in rank-automation contains, mixed together: the Georges/BDB/PV agents and prompts, per-client content rules (MHTS rules unchanged), and the Worker change that adds each merged post to `public/sitemap.xml`. Without that change, new MHTS posts never reach the sitemap. Pushing it is safe for MHTS (new clients have no Telegram group, so no job runs for them), but it seeds their rows in D1. Tell Carlo before pushing.
- Unpushed commit `a8ac4b2` in mhts-site: AUTOMATION.md notes on the rollout. Harmless.
- Georges `8cd17ea`, BDB `5345bb4`, PV `ec63058`: rollout built and tested on a copy, not pushed, and their repo secrets are not set yet. Pushing them redeploys those live sites. Leave them.

## Open MHTS items

- Search Console automation, as Carlo asked: resubmit the sitemap via the Search Console API after each publish, check indexing 3 days later with the URL Inspection API and send the result to Telegram (with a one-tap link to Request indexing if not indexed), plus IndexNow for Bing. "Request indexing" itself cannot be automated legitimately (the Indexing API is for jobs and livestreams only). Needs from Carlo: a Google Cloud project, a service account key as a GitHub secret, and that account added as Owner on the MHTS property.
- Why the writer's first draft sometimes hits max_tokens (wasted cost).
- One "Lexie" mention left inside the body of `does-a-hair-system-look-natural` (the author lines were removed site-wide; Carlo has not been asked about this one).
- Rules can later move from config and code into the database so the future dashboard can edit them; a per-agent chat in the dashboard is possible later.
- Task 10 (Google Drive client files), task 11 (GBP post every Monday), the report agent: later, after MHTS.

## Health check: what already exists

- The site builds and tests in CI; 20 markdown posts; author removed site-wide; Sources list on posts; future-dated posts hidden from /blog but reachable by URL.
- Known from earlier work: the sitemap is hand-maintained in `public/sitemap.xml`; it is a single-page React app (no prerendering on MHTS, unlike PV), so social previews and first-load SEO depend on client-side rendering. Check what Google actually sees.

## Working notes for the next session (Cowork, Carlo's Windows PC)

- Connected folders are reached through the device shell. Git in that VM leaves `.git/index.lock`, `HEAD.lock` and `tmp_obj_*` files: after git commands run `find .git -name '*.lock' -delete; find .git/objects -name 'tmp_obj_*' -delete` (needs delete permission, requested once per folder per session).
- Commit with `git -c core.autocrlf=input -c user.name="Carlo Vacirca" -c user.email="carlo.vacirca@gmail.com"` and stage specific files, never `git add -A` in mhts-site (line-ending noise). Carlo pushes himself from Command Prompt (`git push`).
- The device cannot reach gov.uk, nhs.uk or the live sites, and its npm is slow. Build, test and screenshot on a copy in the cloud workspace (tar the repo without node_modules, stage it, `npm ci`, `npm run build`, Playwright with Chromium at /opt/pw-browsers/chromium, `vite preview --host 127.0.0.1`). Use WebFetch for live pages.
- The cloud copy of rank-automation for local Worker tests: `wrangler dev --local`, test token `test-token`, Telegram mock on port 9995.
