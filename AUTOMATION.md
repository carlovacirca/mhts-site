# MHTS Content Automation

**Single source of truth for this project.** Every Cowork session, script, collaborator and dashboard reads this file first. If this file conflicts with anything else, including a planning conversation or an earlier assumption, this file wins.

Update and recommit it whenever a meaningful decision or change is made.

| | |
|---|---|
| **Client** | Men's Hair To Stay, menshairtostay.co.uk |
| **Repo** | github.com/carlovacirca/mhts-site, branch `main` |
| **Current phase** | Phase 1. Tasks 0a, 0b, 1, 2 done. Next: task 3 first real run, then task 4, Writer Agent. **Deadline: first automated blog live for all four clients Monday 5 October 2026** |
| **Last updated** | 23 September 2026 |
| **Owner** | Carlo Vacirca |

---

## 1. Project overview

Today a full month of blog posts and Google Business Profile posts is produced by hand in a Claude Cowork session, then scheduled and uploaded manually. That works, but it requires a person, a machine that is on, and a chat that stays open.

The goal is to remove all three. Content should be researched, written, illustrated, reviewed and published without anyone's computer being on, with one human decision left in the loop: a single Approve or Reject tap in Telegram.

Everything runs on free or serverless infrastructure. There is no VPS, no n8n, and no always-on server.

**Phase 1 covers blog posts only.** GBP automation and the dashboard come later.

---

## 2. Verified current state of the repo

Checked directly on 22 September 2026. **Several of these contradict the original plan.** Read this section before designing anything.

| Assumption in the plan | Reality |
|---|---|
| Site is built with Astro | **False.** React 18 + Vite 5 + Tailwind + shadcn-ui |
| Content Collections, `src/content/config.ts` | **Does not exist.** No `src/content/`, no `astro.config`, zero `.md` or `.mdx` files in `src` |
| Posts are markdown with frontmatter | **False.** Single `src/data/blogPosts.ts` array, body in a template literal, one `/blog/:slug` catch-all route |
| Monday auto-publish triggers a build | **False.** It is a browser-side date check in `BlogPage.tsx`. Everything deploys at once and `isPublished()` hides future-dated posts from the listing on each visit. Nothing rebuilds on a Monday |
| Merging a PR triggers a Cloudflare Pages build | **Almost certainly false.** `npm run deploy` is `vite build && npx wrangler pages deploy dist`, run manually. No `.github/workflows` exist. Pushing to GitHub has been confirmed not to publish |

Zod 3.25.76 **is** installed, but as a shadcn form dependency, not a content schema. It is reused for the new frontmatter schema.

**Since task 0a (23 September 2026)** the third row is no longer true: posts are markdown files in `src/content/blog/`, and `src/data/blogPosts.ts` is now a loader that maps them onto the `BlogPost` interface below, so no page component changed.

### Existing `BlogPost` interface

The markdown frontmatter schema must preserve every one of these or the live site loses features it currently has.

```ts
interface BlogPost {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  metaDescription: string;
  readTime: string;
  date: string;              // ISO, drives the date gate
  author: string;
  featuredImageAlt: string;
  image?: string;
  content: string;
  featured?: boolean;
  faqs?: { q: string; a: string }[];   // drives FAQPage schema
}
```

`faqs` generates FAQPage structured data. `date` drives date-gated publishing. Dropping either is a regression.

---

## 3. Finalized architecture

| Service | Role |
|---|---|
| **GitHub Actions** | The runner. Scheduled research, event-triggered writing, and deploy on merge |
| **Cloudflare Workers** | API and webhook glue. Serves Telegram and, later, the dashboard |
| **Cloudflare D1** | Database. Tasks, agent profiles, agent memory, cost logs |
| **Cloudflare R2** | **Not used in Phase 1.** See the decisions log. Reconsider for GBP and the dashboard |
| **Cloudflare Pages** | Hosts the live site, and later the dashboard as a separate project |
| **Telegram bot** | Approval interface. Preview plus Approve and Reject buttons |
| **Claude API** | Content generation, web search tool enabled so sources are real and current |
| **OpenAI images API** | Hero image generation |

**Publishing flow:** generate markdown + image, open a Pull Request, approve in Telegram, Worker merges the PR, a GitHub Action builds and deploys to Cloudflare Pages.

**Not used:** n8n, a VPS, any always-on server, DataForSEO or other search-volume tooling. Trend and topic signal comes from Claude's web search tool.

**Agent design:** each agent (Research, Writer, later Editor) stores its system prompt and memory in D1, not in code. Editable like an employee profile and chattable from the future dashboard. Every run logs tokens, cost in USD and duration to `agent_runs`.

**Repos:** one repo per client site, plus one private repo, `carlovacirca/rank-automation`, holding the agents for all clients: D1 migrations, the Worker, and the research, writer, image and GBP scripts with their GitHub Actions. Client site repos hold only their content and deploy Action. (Changed 23 September 2026, see decisions log.)

---

## 4. Data contracts

> Status: **4.1 implemented in task 0a. 4.2 created in D1 in task 1 (`rank-automation` repo, `db/migrations/0001_init.sql`). 4.3 live since task 2.** The dashboard should build against these shapes. Raise changes here before implementing them anywhere.

### 4.1 Markdown frontmatter

New posts are written to `src/content/blog/<slug>.md`, one file per post, loaded with `import.meta.glob('/src/content/blog/*.md', { eager: true })` and validated with Zod at build time.

```yaml
---
title: "Why Is My Hair Shedding More in Autumn?"
slug: "autumn-hair-shedding-explained"
description: "Autumn shedding is real and there is research behind it..."
metaDescription: "..."
category: "Hair Loss Solutions"
publishDate: 2026-09-14
author: "Lexie, hair replacement specialist, Men's Hair To Stay"
readTime: "8 min read"
heroImage: "@/assets/mhts-hair-shedding-brush-hero.jpg"
heroImageAlt: "A men's hairbrush on a dark grey surface with loose hair in the bristles"
tags: ["hair loss", "seasonal shedding"]
sources:
  - title: "Kunz M, Seifert B, Trueb RM. Dermatology 2009;219(2):105-110"
    url: "https://karger.com/drm/article/219/2/105/103448"
faqs:
  - q: "How long does autumn shedding last?"
    a: "For most people..."
draft: false
---
```

Zod schema lives at `src/content/schema.ts`. A post failing validation fails the build, which fails the PR check, which is the point.

**As implemented (task 0a):**

- Loader is `import.meta.glob('/src/content/blog/*.md', { eager: true, import: 'default' })` in `src/data/blogPosts.ts`.
- Parsing and validation happen at build time in a Vite plugin, `vite/blog-markdown.ts`, using the `yaml` package. No YAML parser ships to the browser.
- `heroImage` becomes a real import, so a missing image file also fails the build.
- Rules beyond the example: unknown keys fail (a misspelt field cannot slip through); `slug` must equal the filename; `category` must be one of the six existing categories; `publishDate` must be a real calendar date; `readTime` must look like `8 min read`; `heroImage` must be `@/assets/<name>.jpg|jpeg|png|webp`; body cannot be empty.
- Optional: `heroImage`, `featured` (added, the site uses it for one post), `faqs`, `tags` (default `[]`), `sources` (default `[]`), `draft` (default `false`, `true` hides the post entirely).
- Migrated posts have no `tags` or `sources`, because the old data had none and none were invented.

Mapping onto the site's existing `BlogPost` fields:

| Frontmatter | `BlogPost` |
|---|---|
| `description` | `excerpt` |
| `publishDate` | `date` |
| `heroImage` | `image` (hashed asset URL) |
| `heroImageAlt` | `featuredImageAlt` |
| markdown body | `content` |
| everything else | same name |

### 4.2 D1 schema

```sql
CREATE TABLE clients (
  id           TEXT PRIMARY KEY,          -- 'mhts'
  name         TEXT NOT NULL,
  domain       TEXT NOT NULL,
  repo         TEXT NOT NULL,             -- 'carlovacirca/mhts-site'
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE agents (
  id            TEXT PRIMARY KEY,         -- 'mhts-research'
  client_id     TEXT NOT NULL REFERENCES clients(id),
  name          TEXT NOT NULL,            -- 'Research Agent'
  role          TEXT NOT NULL,            -- research | writer | editor
  system_prompt TEXT NOT NULL,            -- editable, never hardcoded
  model         TEXT NOT NULL,
  enabled       INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE agent_memory (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id   TEXT NOT NULL REFERENCES agents(id),
  client_id  TEXT NOT NULL REFERENCES clients(id),
  key        TEXT NOT NULL,
  value      TEXT NOT NULL,               -- JSON
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(agent_id, key)
);

CREATE TABLE tasks (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id           TEXT NOT NULL REFERENCES clients(id),
  type                TEXT NOT NULL,      -- research | write | image | publish
  status              TEXT NOT NULL,      -- pending | awaiting_approval | approved | rejected | published | failed
  title               TEXT,
  slug                TEXT,
  payload             TEXT,               -- JSON
  branch              TEXT,
  pr_number           INTEGER,
  pr_url              TEXT,
  telegram_message_id INTEGER,
  cost_usd            REAL DEFAULT 0,
  error               TEXT,
  created_at          TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE topics (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  client_id  TEXT NOT NULL REFERENCES clients(id),
  task_id    INTEGER REFERENCES tasks(id),
  title      TEXT NOT NULL,
  angle      TEXT,
  rationale  TEXT,
  service    TEXT,                        -- hair-systems | smp | hair-density
  sources    TEXT,                        -- JSON array
  status     TEXT NOT NULL DEFAULT 'proposed',  -- proposed | chosen | discarded
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE agent_runs (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id            TEXT NOT NULL REFERENCES agents(id),
  client_id           TEXT NOT NULL REFERENCES clients(id),
  task_id             INTEGER REFERENCES tasks(id),
  model               TEXT NOT NULL,
  input_tokens        INTEGER NOT NULL DEFAULT 0,
  output_tokens       INTEGER NOT NULL DEFAULT 0,
  cache_read_tokens   INTEGER NOT NULL DEFAULT 0,
  web_search_requests INTEGER NOT NULL DEFAULT 0,
  cost_usd            REAL NOT NULL DEFAULT 0,
  duration_ms         INTEGER NOT NULL DEFAULT 0,
  status              TEXT NOT NULL,      -- ok | error
  error               TEXT,
  created_at          TEXT NOT NULL DEFAULT (datetime('now'))
);
```

`client_id` is present on every table from day one, so going multi-client later is a data migration rather than a rewrite.

Cost is computed in the runner from a pricing table in config, not hardcoded per call. **Verify current Anthropic and OpenAI pricing at implementation time rather than trusting any figure written here or in a prompt.**

### 4.3 Worker API

Base: `https://rank-automation.carlo-vacirca.workers.dev/api`. Bearer token for Actions and dashboard. Telegram webhook verified with `X-Telegram-Bot-Api-Secret-Token`.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/tasks?client_id=&status=` | List tasks, powers the approval queue |
| `GET` | `/tasks/:id` | Single task with payload |
| `POST` | `/tasks` | Create a task, called by the runner |
| `PATCH` | `/tasks/:id` | Update status or fields |
| `POST` | `/tasks/:id/approve` | Set status `approved`. Does **not** merge: the Monday publish job (task 8) merges approved PRs on the post's date and sets `published`. Only `awaiting_approval` tasks can be approved, otherwise 409 |
| `POST` | `/tasks/:id/reject` | Close the PR, delete the branch, set `rejected`. Allowed from `pending`, `awaiting_approval`, `approved`, otherwise 409 |
| `GET` | `/topics?task_id=&client_id=` | Research output |
| `POST` | `/topics` | Save a proposed topic, called by the Research Agent |
| `POST` | `/topics/:id/choose` | Dispatch `writer.yml` in `rank-automation`, then mark chosen and discard sibling topics. If the dispatch fails the topic stays `proposed` |
| `GET` | `/clients`, `/clients/:id` | Client rows |
| `GET` | `/agents?client_id=` | Agent profiles |
| `GET` `PATCH` | `/agents/:id` | Read and edit a system prompt |
| `POST` | `/runs` | Log a run |
| `GET` | `/runs?client_id=&month=` | Cost report |
| `POST` | `/telegram/webhook` | Telegram updates, handles Approve and Reject callbacks (task 7, returns 501 until then) |
| `GET` | `/health` | No auth. Liveness check |

Telegram and the dashboard call the **same** endpoints. No logic lives only in the bot.

**As implemented (task 2):** Worker `rank-automation` in the `rank-automation` repo, `worker/src/index.ts`. JSON in and out. Errors are `{ "error": "..." }` with 400 (bad input, including unknown `client_id` or foreign key), 401 (no or wrong token), 404, 409 (wrong state), 502 (GitHub refused). `payload` and `sources` are sent and returned as JSON, stored as text. CORS allows `ALLOWED_ORIGIN` (currently `*`). **Dashboard note:** a bearer token in browser code is visible to anyone who can load the page, so the dashboard should call the Worker from its own server side or sit behind Cloudflare Access. Raise this before the dashboard goes live.

Values added beyond the 4.2 comments: task `type` also accepts `gbp`, agent `role` also accepts `gbp`, for the Monday GBP drafts. SQL comments only, no migration needed.

---

## 5. Content rules, MHTS

Non-negotiable, hard-won, and they belong in the Writer Agent system prompt in D1.

- **UK English, Oxford spelling.** "-ize" not "-ise". Words that are only ever "-ise" stay: advise, promise, comprise, otherwise, exercise
- **No em dashes and no en dashes**, anywhere
- **No pricing.** No prices, ranges or "from" figures. All pricing was deliberately stripped from this site
- **Discretion.** Private studio, no signage. Never identify a client in copy or an image
- **No red dots** on any scalp illustration
- **Never invent** a statistic, policy, price, credential or qualification
- **Every source fetched and verified.** Search snippets are not sources. This is a health-adjacent niche
- **Image filenames describe what the photo actually shows.** An SMP filename never goes on a hair system photo
- **Hours:** Tuesday to Friday, 9:30 to 5
- **Services rotated:** hair systems / non-surgical replacement, scalp micropigmentation, hair density treatment

Reference implementations: `content staging/august-2026/` and `content staging/september-2026/`.

---

## 6. Current phase and status

### Phase 1, blog automation

| # | Item | Status |
|---|---|---|
| 0a | Markdown content layer in the Vite app, Zod schema, `import.meta.glob` loader | **Done 23 Sep.** Pushed as `6d0722a`. Not yet deployed, the first 0b run deploys it |
| 0b | GitHub Action: build and `wrangler pages deploy` on merge to `main` | **Done 23 Sep.** Stage 1 deployed `f95b19e` to a preview URL. Stage 2 `901e79e` deploys `main` to production. Verified live: `menshairtostay.co.uk` serves bundle `index-ChM7DBzp.js`, the old `index-nQQevdLg.js` is gone |
| 1 | D1 database, tables, seed `clients` and `agents` | **Done 23 Sep.** D1 `rank-automation` (region weur) created by the Database Action in `rank-automation` repo, commit `e91f735`. All 6 contract tables present plus `d1_migrations` (Wrangler's own tracking table). `clients` seeded with `mhts`. Agents are seeded in tasks 3 and 4 with their prompts |
| 2 | Worker API | **Done 23 Sep.** `rank-automation` commit `b9c8473`, live at `https://rank-automation.carlo-vacirca.workers.dev`. 35 of 35 local checks pass. Deploy check: `/api/health` 200, `/api/tasks` 401 without token, 200 with token |
| 3 | Research Agent script, Claude API with web search, proposes 2 to 3 topics | **Done 24 Sep.** First real run: 3 topics, all sources read, $0.33 |
| 4 | Writer Agent script, full post as validated markdown | **Built 24 Sep**, `rank-automation` commit after `9904b0a`. Awaiting first real run |
| 5 | Image generation, OpenAI, committed to `src/assets` in the same PR | Not started |
| 6 | Commit and open PR | Not started |
| 7 | Telegram bot, preview, cost, Approve and Reject | Not started |
| 8 | Approve queues the PR; the Worker merges it on the post's Monday, Action deploys | Not started |
| 9 | GitHub Actions schedules and triggers | Not started |
| 10 | Client file library on Google Drive, agents pick real photos from it | Not started |
| 11 | GBP post + image every Monday, sent to Carlo on Telegram for manual posting | Not started |
| 12 | Roll out to Georges Barbers, BDB, PV Consulting: content layer + deploy Action per site, then agents | Not started |

**0a and 0b are prerequisites.** Nothing downstream works without them.

### Later phases, not in scope now

Phase 2 GBP automation. Phase 3 dashboard, built in parallel by the business partner against the section 4 contracts. Phase 4 Editor Agent. Phase 5 other clients.

---

## 7. Decisions log

**2026-09-22, Astro rejected. Markdown added to the existing Vite app instead.**
The plan assumed Astro Content Collections. The site is React and Vite, and Astro cannot be bolted onto just the blog: it is a separate build producing a separate app, which would mean two deploys, a duplicated header, footer and Tailwind config, and a full page reload when a reader crosses from a post to `/book`. The blog UI already built in React, the TOC, FAQ schema and related posts, would all need rebuilding. A full Astro migration would block Phase 1 for weeks and put a working, ranking site through a rebuild. Markdown files plus a Zod schema in the existing Vite app give the automation the identical file-per-post contract at a fraction of the risk. The only thing given up is Astro's static-output performance, which is a site-speed decision that can be revisited independently.

**2026-09-22, deploy on merge via GitHub Action, not a git-connected Pages project.**
A Pages project created by direct upload cannot be converted to git-connected, so that route would mean a new project and repointing the live custom domain. An Action running `wrangler pages deploy` on merge achieves the same merge-to-live outcome, leaves the live site untouched, and keeps the runner in one place. Needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as GitHub secrets.

**2026-09-22, Research Agent rotates all three services.**
Hair systems, SMP and hair density in rotation, so each money page gets fed. Matches the August and September packs.

**2026-09-22, MHTS only for Phase 1, but `client_id` everywhere from day one.**
The other three client repos each have a different blog architecture, so generalizing now would multiply the work before the loop is proven. Carrying `client_id` on every table makes going multi-client a migration, not a rewrite.

**2026-09-22, DataForSEO dropped.**
Claude's web search tool supplies trend and topic signal.

**2026-09-23, R2 dropped from Phase 1. Hero images are committed to `src/assets`.**
The plan had generated images stored in R2 and referenced by public URL. On inspection R2 was solving a problem this site does not have. Roughly 40 images already sit committed in `src/assets` and the arrangement works. Four posts a month at about 200KB is around 10MB of repo growth a year, which is negligible. Committed images also get hashed, compressed and cached by the Vite build, which a runtime R2 URL does not, so committing is marginally better for visitors as well as simpler. The one thing R2 offered was a public URL for the Telegram preview, but Telegram accepts a direct image upload, so no URL is needed. Dropping it removes a service, a credential and the permanent-URL decision from Phase 1. Revisit for GBP posts and the dashboard, which may genuinely want hosted images.

**2026-09-23, the live site is ahead of `main`, and that is a deploy-model artefact.**
Verified in a browser: September is live. Verified in git: September is not committed. `npm run deploy` builds from disk, not from git, so deploys have never required a commit. Recorded because it is counterintuitive and because it is exactly the kind of thing a future session would otherwise rediscover the hard way. The deploy Action fixes it permanently by making `main` the thing that ships.

**2026-09-23, September committed selectively, not with `git add -A`.**
About 83 files differ from git only in line endings (CRLF on disk, LF in the repo), with no content change. Committing them would bury the real change in noise. Only the real changes were staged, with `core.autocrlf=input` so they go in as LF. `.claude/settings.local.json` is now gitignored. `content staging/` remains untracked, pending a decision.

**Operational note for Cowork sessions:** committing from the Cowork VM cannot delete files in `.git` unless delete permission is granted, so git leaves `index.lock`, `HEAD.lock` and `tmp_obj_*` files behind. A leftover `index.lock` blocks every later git command. After any commit from Cowork, run `find .git -name '*.lock'` and remove anything it finds.

**2026-09-23, task 0a: markdown compiled by a Vite plugin, old array order kept.**
The frontmatter is parsed and validated at build time by a small Vite plugin rather than in the browser, so a bad post fails the build and no YAML parser ships to visitors. `blogPosts.ts` keeps its exports and the `BlogPost` shape, so no page component changed. Array order decides which related posts appear under each article. Sorting by date would have changed the related links on 13 of 20 posts and removed the flagship hair systems guide from the related links of 8 posts, an internal-linking loss on a ranking site. The original order is therefore kept in `src/content/legacy-order.ts`, and new posts are appended after it, oldest first, as they were before.

**Verification recorded for 0a:** a test compared every field of all 20 posts, and the array order, against a snapshot taken from the old `blogPosts.ts`: identical, including all FAQs (105 across the 20 posts) and every date. The production build before and after has the same image files with the same hashes, the same public files, and the same `index.html` apart from bundle names. Four unused CSS classes (`blur`, `shadow`, `static`, `running`) dropped out of the stylesheet because Tailwind had been picking those words up from blog prose in the old `.ts` file. No component uses them. Build validation was tested by breaking a post four ways (misspelt field, invalid category, missing image, impossible date), and each one stopped the build with a clear message.

**2026-09-23, task 0b rolled out in two stages.**
Pushing the workflow file to `main` runs it straight away, so a workflow that deployed to production would put the first automated build live before anyone looked at it. Stage 1 therefore deploys to a Pages preview URL (`preview-0b.menshairtostay.pages.dev`) and leaves the live domain alone. Once the preview is checked against the live site, one line (`DEPLOY_BRANCH`) changes to `main` and deploys go to production. Pull requests only build and test, never deploy, so a post that fails validation fails the PR check. Wrangler is called directly with `npx wrangler@4` rather than through a third-party Action, to keep one less dependency.

**Why the Cloudflare deployments list shows the August commit on September deploys.** A direct-upload deploy is labelled with whatever commit the laptop's git was on at the time, not with what was actually uploaded. September was deployed while git still pointed at the August commit `6894aab`, so every recent deployment carries the August message. The labels are misleading, not the deploys. From 0b onwards each deployment is labelled with the real commit it was built from.

**2026-09-23, 0b stage 1 verified by bundle hash.** Vite names each bundle by a hash of its contents, so an identical filename means an identical build. The preview serves `assets/index-ChM7DBzp.js`, the exact bundle from the verified local build of `6d0722a`. The live domain serves `assets/index-nQQevdLg.js`, the exact bundle built from the committed pre-0a code, and does not have the new bundle (negative control). So the live site matched git before 0a, and the preview is byte-for-byte the build that passed the 0a field-by-field checks. `CLOUDFLARE_API_TOKEN` is scoped to Cloudflare Pages Edit and D1 Edit only, via a custom permission policy.

**2026-09-23, scope and deadline set by Carlo.**
- Deadline: first automated blog live for **all four clients** (MHTS, Georges Barbers, BDB, PV Consulting) on **Monday 5 October 2026**. Claude recommended MHTS fully automated plus Telegram drafts for the other three, because each of their sites has a different blog architecture needing its own content layer and deploy Action. Carlo chose all four fully automated, accepting the risk.
- Cadence: the agent produces one blog per week per client, and only one is queued at a time, after approval.
- **Approval no longer publishes immediately.** Approve can happen any day. The Worker merges the approved PR on the post's Monday, so the post never appears early. This removes the need to fix the future-dated-posts known issue for the automation, because nothing future-dated reaches the live site.
- GBP is pulled into Phase 1 as drafts: every Monday the agent also produces a GBP post and image and sends them to Carlo on Telegram. Carlo posts manually until Google approves Business Profile API access. Posting uses the Business Profile API `localPosts` resource. The Performance API is read-only metrics and cannot post. Access approval applies per Google Cloud project, so one approval covers both. Carlo applied on 23 September; Google states about 14 days.
- Order of work: blog agent, then the same agent does GBP drafts, then the report agent.

**2026-09-23, client files on Google Drive. Revisits the R2 decision for images.**
Carlo has client photos and documents on his desktop that agents should draw on for blog and GBP images. Stored in Google Drive, one folder per client, read by agents through the Drive API. Chosen over R2 because Carlo can drag or sync files from his desktop. R2 stays out. Generated hero images are still committed to `src/assets`. MHTS discretion rule applies: the agent never uses a photo that identifies a client.

**2026-09-23, report agent planned (after the blog and GBP agent).**
Trigger: on the second-to-last day of each month Carlo uploads booking data and performance screenshots. The report agent then calls the GA4 and Search Console APIs, and the GBP Performance API once approved, and builds the reports. It runs on the automation system, not a Cowork chat. It will reuse the existing `_reporting` folder conventions. Booking exports contain customer personal data, so they never go into a client git repo.

**2026-09-23, agents live in a separate `rank-automation` repo.**
With four clients in scope, putting the agents inside `mhts-site` would make the other three sites depend on MHTS's repo. One private `rank-automation` repo holds the Worker, D1 migrations and agent scripts for every client. The agents open PRs against each client's site repo using a fine-grained PAT scoped to those repos. `client_id` on every table already supports this.

**2026-09-23, Research Agent design (task 3).**
- Model `claude-sonnet-5` with `web_search_20250305` and `web_fetch_20250910` (the basic versions; the 2026 versions add dynamic filtering, which made turns go silent for minutes in the first live run). Search runs first: web_fetch only opens URLs already seen in search results. Chosen over Haiku because it supports web fetch, which the source rule depends on. Pricing verified on 23 September: $2 input, $10 output per million tokens, $10 per 1,000 searches, web fetch free beyond tokens. Stored in `config/pricing.json`.
- **Source rule enforced in code, not just the prompt:** a source is kept only if the model fetched that exact page during the run. Unfetched sources are removed and a topic left with no fetched source is dropped. Fewer than 2 surviving topics fails the run.
- Service rotation: the service least recently chosen leads the week.
- System prompts live in `agents/prompts/<agent-id>.md` only as the starting version. They are seeded into D1 with INSERT OR IGNORE, so once an agent exists its prompt is edited in D1 (dashboard or API), never overwritten by a deploy.
- Runners talk only to the Worker API, never to D1 directly, so the dashboard and the agents share one set of rules.

**2026-09-24, Writer Agent design and real costs.**
- The research run costs about $0.33 (117k input tokens, 4 searches). Estimated writer run $0.25 to $0.45. About $0.80 per client per week, roughly $13 a month for four clients. Carlo's budget is tight, so tool budgets are kept small.
- The writer opens the topic's sources with plain HTTP in our own code (free) and passes the text to the model, instead of paying the model to fetch them. It may still search twice and read 3 more pages.
- Every draft is checked in code, not trusted: section 5 rules (dashes, pricing, -ize spelling, hours), renderer-supported markdown only (the site renders ##, ###, lists, **bold** and links; no italics, tables or quotes), word count, closing CTA, internal links only to real sitemap pages, external links and sources only to pages read in the run. One repair pass without tools; if it still fails, the task is saved as failed with the reasons.
- Publish date is the next Monday not taken by a live or queued post.
- Research topic review, 24 Sep: topic about traction alopecia wrongly linked it to tight fades. Traction alopecia comes from pulling tension, not clipper cuts, and blaming fades is also bad for Georges Barbers, where MHTS is based. Topic about NHS wigs must not quote NHS charges (no-pricing rule).

---

## 8. Open questions and next steps

### Blocking, needed from Carlo

1. ~~Is the Cloudflare Pages project git-connected or direct-upload?~~ **Answered 23 Sep: Direct Upload, no git connection.** Project name `menshairtostay`, production branch `main`, domains `menshairtostay.co.uk`, `www.menshairtostay.co.uk`, `menshairtostay.pages.dev`.
2. **Cloudflare account ID** and an **API token** with Pages edit and D1 edit permissions, stored as GitHub secrets. (R2 is not needed, see the decisions log.)
3. **Telegram** bot token and the chat ID to send approvals to.
4. **Anthropic and OpenAI API keys** as GitHub secrets. Names: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`.
7. **Google Drive**: one folder per client, shared with a service account the agents use (set up in task 10).
8. **Georges Barbers, BDB and PV repos**: same GitHub secrets and Cloudflare project names per site (task 12).
5. **Write access** for the automation to open PRs. A fine-grained PAT scoped to this repo, with Contents read and write and Pull requests read and write.
6. **Push to GitHub.** Done locally 23 September 2026: September committed as `217cdbe`. **Awaiting `git push` from Carlo.** Until pushed, GitHub `main` is still `6894aab` (August).

### Known issues, unrelated to this project but worth clearing

- **The live site is ahead of the GitHub repo.** Verified 23 September 2026: the September posts are live and rendering correctly, but they are **not in `main`**. `git show HEAD:src/data/blogPosts.ts` contains none of the three September slugs. The last content commit is `6894aab`, the August pack.

  This is not a mistake, it is how the deploy works. `npm run deploy` runs `vite build && wrangler pages deploy dist`, which builds from **files on disk**, not from git. So a deploy publishes whatever is in the working folder whether or not it was ever committed.

  It matters for this project because **automated PRs branch from `main` on GitHub**. If `main` is missing a month of content that is live, a merged PR could rebuild the site from a stale base and silently regress it. Commit and push the working tree before the automation opens its first PR. Once the deploy Action is in place this class of drift disappears, because deploys will come from `main` rather than from a laptop.
- **Future-dated posts show early in three places.** The date gate only applies to the `/blog` listing. The homepage's latest-posts strip, the related posts under each article, and the Blog structured data on `/blog` all include posts dated in the future, and a future post's URL works if visited directly. Existing behaviour, not caused by 0a, and left unchanged. Worth fixing before the automation starts scheduling posts ahead.
- `npm run deploy` now refuses on purpose (task 0b). Deploys run only from GitHub. See DEPLOY.md.
- `netlify.toml` is present but nothing reads it. It caused a wrong deploy-platform conclusion once already. Rename or delete it.

---

## 9. Setup guide for Carlo

Plain English. Work top to bottom. Nothing here needs a developer.

### Jargon, once

**PR, Pull Request.** GitHub's "propose a change" mechanism. Instead of editing the live branch directly, a change goes on a separate branch and you get a page showing exactly what would change, line by line, with a Merge button. Nothing takes effect until you merge. That is the whole reason it is in this design: every generated post becomes one reviewable PR, Approve in Telegram just presses Merge for you, and Reject closes it and throws the branch away. It is the undo button.

**PAT, Personal Access Token.** A password substitute for scripts. It lets automation act on the repo without handing it your GitHub password. "Fine-grained" means scoped to one repo with only the permissions it needs, so a leaked token cannot touch anything else.

**D1.** Cloudflare's database. **R2.** Cloudflare's file storage, not used in Phase 1. **Worker.** A small program that runs on Cloudflare's servers and answers web requests.

### Step 1. Make GitHub match the live site

The commit is done (`217cdbe`, 23 September 2026). Only the push is left. In Command Prompt:

```
cd "C:\Users\0\1. Rank SEO\menshairtostay"
git push
```

**Do not use `git add -A`.** About 83 files show as modified only because of Windows versus Linux line endings. They have no real change and were deliberately left out of the commit.

**Do this before anything else.** Until it is pushed, an automated PR would branch from an August-era `main` and merging it could wipe September.

### Step 2. Check how Cloudflare Pages deploys

1. Go to **dash.cloudflare.com**
2. **Workers & Pages**, click the Men's Hair To Stay project
3. Open the **Deployments** tab and look at the most recent row

If each deployment shows a **branch name and a commit hash**, the project is git-connected. If it says **"Direct Upload"** or mentions Wrangler, it is not. Cross-check under **Settings, Builds & deployments**: a git-connected project names the GitHub repo and production branch, a direct-upload one lists no repo at all.

Expected answer is Direct Upload, since `npm run deploy` exists and pushing has never published. Either way, report what it says. If it turns out to be git-connected, task 0b disappears.

### Step 3. Collect the credentials

**Cloudflare Account ID.** Workers & Pages, right-hand sidebar. Also in the dashboard URL straight after `dash.cloudflare.com/`.

**Cloudflare API token.** Top-right profile icon, **My Profile**, **API Tokens**, **Create Token**, **Create Custom Token**. Add these Account-level permissions: `Cloudflare Pages: Edit` and `D1: Edit`. Shown once only, copy it immediately.

**GitHub PAT.** GitHub, **Settings**, **Developer settings**, **Personal access tokens**, **Fine-grained tokens**, **Generate new token**. Scope it to the `mhts-site` repository only. Permissions: **Contents: Read and write**, **Pull requests: Read and write**.

**Telegram bot token.** Open Telegram, message **@BotFather**, send `/newbot`, give it a name. He replies with the token. Not needed until task 7.

**Telegram chat ID.** Send your new bot any message, then open `https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates` in a browser and find `"chat":{"id":` followed by a number. That number is it.

### Step 4. Store them as GitHub secrets

Repo, **Settings**, **Secrets and variables**, **Actions**, **New repository secret**. Never in a file, never in the repo.

| Secret name | Needed by |
|---|---|
| `ANTHROPIC_API_KEY` | tasks 3 and 4 |
| `OPENAI_API_KEY` | task 5 |
| `CLOUDFLARE_API_TOKEN` | tasks 0b, 1, 2 |
| `CLOUDFLARE_ACCOUNT_ID` | tasks 0b, 1, 2 |
| `GH_PAT` | task 6 |
| `TELEGRAM_BOT_TOKEN` | task 7 |
| `TELEGRAM_CHAT_ID` | task 7 |

Steps 1 and 2 unblock the build. The rest can follow.

---

### Immediate next step

0a and 0b are done. Next is task 1, the D1 database, using the schema in section 4.2. Kept below for the record: the rule that applied to the 0a migration.

**The migration must preserve `faqs`, `category`, `readTime`, `author` and the ISO `date` on every post.** `faqs` generates the FAQPage structured data and `date` drives the Monday gate. If a migration quietly drops either, the site loses rich results and scheduled publishing, and neither failure is visible by looking at the site. Verify post by post, not in aggregate.
