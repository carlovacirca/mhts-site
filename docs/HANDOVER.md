# Handover: MHTS site, blog automation and SEO automations (updated 28 Sep 2026, afternoon)

Read this first, then AUTOMATION.md in the menshairtostay repo (single source of truth; it wins over anything else). AUTOMATION.md was brought up to date on 28 Sep (catch-up commit on the batch 3 branch, goes to main with the batch 3 merge).

## Standing rules (Carlo)

- Never commit a secret. Credentials only in GitHub Actions secrets.
- Live site is a real ranking business. Nothing touches production without Carlo seeing the change first (PR + preview, he approves).
- Update AUTOMATION.md and commit on every meaningful decision or change.
- Verify against the real repo and live site; real numbers; own mistakes plainly.
- Carlo is not a developer: plain English, exact clicks, full Windows Command Prompt commands from `cd /d "..."`.
- Short replies, bullets, no em or en dashes anywhere, one-line status at the end of every reply.
- Do only what was asked; flag extras and wait for his go (usage is tight). Estimate cost of any paid run first.
- Claude Code prompts: send the prompt only (no preamble or postamble), one batch per prompt, wait to be asked for the next. Suggest `/clear` in Claude Code between batches.
- Carlo builds the dashboard himself. Do not mention a business partner building it.
- Settled, do not reopen: Astro rejected, R2 dropped (media library is Google Drive), DataForSEO dropped, Hermes rejected, Netlify gone (uninstalled from GitHub 27 Sep), `gh` CLI not used.
- MHTS only until Carlo says otherwise. Georges, BDB, PV rollout stays local and unpushed.

## How work is split

- Website changes: Claude Code in VS Code on Carlo's PC (he watches mobile preview there). You write the batch prompt; he pastes it; you review its output before he merges.
- Automations (rank-automation repo, Worker, GitHub Actions, Cowork scheduled tasks): built in Cowork, tested in the cloud container with mocks, committed via the device shell, Carlo pushes.
- Merge method that works for Carlo: `git push origin <branch>:main` after checking it is a fast-forward (`git merge-base --is-ancestor origin/main origin/<branch>`). Open PRs with `https://github.com/carlovacirca/mhts-site/compare/main...<branch>?expand=1`.
- Device notes: request folder access to `C:\Users\0\1. Rank SEO\menshairtostay` and `...\rank-automation`, and delete permission (git leaves `.git/*.lock` and `tmp_obj_*`; delete after git commands). Commit with `git -c core.autocrlf=input -c user.name="Carlo Vacirca" -c user.email="carlo.vacirca@gmail.com"`, stage specific files, never `git add -A` in mhts-site (the device mount shows every file as modified because of line endings; ignore that). The device shell cannot `git fetch` rank-automation (private, no credentials); Carlo's own pushes update the origin refs. mhts-site is public, so Actions status is readable unauthenticated. Device cannot reach the live site; use WebFetch. Never touch the mhts-site working tree or `.git` while Claude Code is working in it (check `git branch --show-current` and ask).

## State right now

mhts-site (`carlovacirca/mhts-site`, Cloudflare Pages `menshairtostay`)
- main = `8e58da3`, live. Batches 1 and 2 live and verified (details in AUTOMATION.md).
- Batch 3 pre-rendering: branch `fix/batch-3-prerender`, PR #5. pr-5 caught a defect (29 elements saved mid-fade on 15 pages), fixed in `e8b8ca0` (animations off during capture, build fails on any inline opacity below 1). Full set re-run on the real pr-5 preview 28 Sep: all clean (0 mid-fade, 60 of 60 URLs match live, 404s real, consent 16 of 16, JS-off vs React identical, h1 in the page 1.0 to 1.8 s sooner). Plus the AUTOMATION.md catch-up commit on top. Only unproven on real Cloudflare: a future-dated post (check on the first post PR after the merge). DECISION: merge only AFTER the Monday 5 Oct first publish is verified.
- Old alias URLs (/mens-hair-to-stay, /blog/ultimate-guide-hair-systems-2024, /blog/hair-restoration-cost-guide-2024) return 200 with a client redirect; make them 301s in batch 4.
- www.menshairtostay.co.uk serves the site with 200 (canonical points to apex, no redirect). First sweep shows Google splitting homepage clicks between www and apex. Quick task 9 (Cloudflare Redirect Rule) after Monday.

rank-automation (`carlovacirca/rank-automation`, private)
- origin/main = `7abf2e7`. Live: publish job adds each merged post to the sitemap (`dc6a92b`); daily 07:00 UTC `seo` job (sitemap resubmit, IndexNow, URL Inspection day 3 and 7) (`3c8533c`); `?preview=1` approval link (`741caf6`); SEO sweep (`7abf2e7`, manual, pushed and run 28 Sep).
- First sweep 28 Sep: 5 of 60 sitemap pages indexed, 44 Discovered not indexed, 11 unknown; 33 clicks, 1,263 impressions (29 Aug to 25 Sep). "Nearly page 1": "hair systems near me" family at positions 7 to 10. Low CTR: /blog/best-hair-transplant-alternatives-non-surgical-solutions 378 views, 0.5%. Display bug: path only, so www and apex both show as "/" (fix offered: now or in the blog pulse; Carlo to choose).
- Local, never push without Carlo's go: `7783367` Georges/BDB/PV rollout (backup branch `rollout-backup` = old `ff583fd`).
- Google: GCP project "Rank SEO" (project id georges-barbers; holds the Business Profile API application, pending). Service account `rank-automation@...` key in GitHub secret `GOOGLE_SA_KEY` (Worker has it too), Full user on `sc-domain:menshairtostay.co.uk`. `rank-seo-reporting@georges-barbers.iam.gserviceaccount.com` belongs to the local monthly report system (`_reporting`); leave it alone.
- IndexNow key `045a17596b825b6e29d674784a26eac1` (public; in D1 clients.indexnow_key; key file live).
- Writer finding (for roadmap item 6): writer.mjs treats a first draft that stops at max_tokens (14,000) like a finished one; the repair pass then rewrites the whole post, so it is paid for twice.

Blog queue
- PR #1 finasteride, publishes Mon 5 Oct 05:00 UTC (first real automated publish). PR #2 traction alopecia, Mon 12 Oct.
- Friday 2 Oct weekly run uses the CURRENT writer rules (1,400 to 2,800 words). New structure comes with the writer update, after batch 4 is live.

Search Console / crawlers
- Sitemap first submitted 28 Sep. Indexing requested 28 Sep for the 10 URLs in quick task 2.
- Cloudflare AI Crawl Control: AI crawlers allowed. Bytespider blocked. Do not buy "Markdown for Agents".
- Monday checks: a scheduled task in the 28 Sep chat fires Mon 5 Oct 05:30 UTC (trigger `trig_01DYVutm1ZtgsvhU9rgJCfCs`); the older chat has one at the same time too.

## Carlo's quick tasks

1. DONE 28 Sep: push and run the SEO sweep.
2. DONE 28 Sep: request indexing for /hair-systems, /scalp-micropigmentation, /hair-density, /hair-system-maintenance, /blog, and posts autumn-hair-shedding-explained, swimming-gym-showering-with-a-hair-system, smp-for-hair-transplant-scars, hair-system-maintenance-4-to-6-weeks, hair-systems-vs-scalp-micropigmentation.
3. Search Console, Indexing, Pages, Soft 404, Validate fix.
4. Bing Webmaster Tools: sign in, Import from Google Search Console.
5. Bing Places: import from Google Business Profile, email info@menshairtostay.co.uk.
6. Apple Business Connect: claim MHTS, same name/address/phone, email info@.
7. Gemini API key from aistudio.google.com (free tier) for the AI visibility tracker; store as a GitHub secret when the tracker is built.
8. Google Drive folder "MHTS Media" with subfolders before-after (consented only), studio, other; upload his desktop photos.
9. After Monday: Cloudflare Redirect Rule www to apex (dashboard; _redirects cannot do domain-level).
10. Sign the info@ webmail into the Claude desktop app's built-in browser (for the directory agent).

## Monday 5 Oct check

PR #1 merged; Build and deploy green for the merge and for the Worker's "Sitemap: add /blog/finasteride-mhra-safety-warning-2026" commit; live sitemap has 61 URLs; post live at /blog/finasteride-mhra-safety-warning-2026 and on /blog and homepage; "Live now" in Telegram; about 07:00 UTC "Sent to search engines" message; Thu 8 Oct day-3 index check message. Then merge batch 3 (`git push origin fix/batch-3-prerender:main`, fast-forward check first; if main moved, rebase the branch first), then re-verify live raw HTML and 404s.

## Decisions 25 to 28 Sep

All recorded in AUTOMATION.md (decisions log entry "2026-09-28, catch-up") as of the 28 Sep catch-up commit.

## Next steps, in order

The roadmap is in AUTOMATION.md section 8 (items 1 to 17). Next Cowork task: item 6, writer update, waiting for Carlo's go. Plan: build locally with mocks ($0), keep unpushed until batch 4 is live, price any real test draft first.
