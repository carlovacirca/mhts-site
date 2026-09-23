# MHTS Content Automation

**Single source of truth for this project.** Every Cowork session, script, collaborator and dashboard reads this file first. If this file conflicts with anything else, including a planning conversation or an earlier assumption, this file wins.

Update and recommit it whenever a meaningful decision or change is made.

| | |
|---|---|
| **Client** | Men's Hair To Stay, menshairtostay.co.uk |
| **Repo** | github.com/carlovacirca/mhts-site, branch `main` |
| **Current phase** | Phase 1, blog automation. Not started, setup pending |
| **Last updated** | 22 September 2026 |
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

**Repos:** one per client, not a monorepo. Phase 1 is MHTS only.

---

## 4. Data contracts

> Status: **drafted, not yet created.** The dashboard should build against these shapes. Raise changes here before implementing them anywhere.

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

Base: `https://<worker>.workers.dev/api`. Bearer token for Actions and dashboard. Telegram webhook verified with `X-Telegram-Bot-Api-Secret-Token`.

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/tasks?client_id=&status=` | List tasks, powers the approval queue |
| `GET` | `/tasks/:id` | Single task with payload |
| `POST` | `/tasks` | Create a task, called by the runner |
| `PATCH` | `/tasks/:id` | Update status or fields |
| `POST` | `/tasks/:id/approve` | Merge the PR, set status `published` |
| `POST` | `/tasks/:id/reject` | Close the PR, delete the branch, set `rejected` |
| `GET` | `/topics?task_id=` | Research output |
| `POST` | `/topics/:id/choose` | Mark chosen, dispatch the Writer workflow |
| `GET` | `/agents?client_id=` | Agent profiles |
| `GET` `PATCH` | `/agents/:id` | Read and edit a system prompt |
| `POST` | `/runs` | Log a run |
| `GET` | `/runs?client_id=&month=` | Cost report |
| `POST` | `/telegram/webhook` | Telegram updates, handles Approve and Reject callbacks |

Telegram and the dashboard call the **same** endpoints. No logic lives only in the bot.

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
| 0a | Markdown content layer in the Vite app, Zod schema, `import.meta.glob` loader | Not started |
| 0b | GitHub Action: build and `wrangler pages deploy` on merge to `main` | Not started |
| 1 | D1 database, tables, seed `clients` and `agents` | Not started |
| 2 | Worker API | Not started |
| 3 | Research Agent script, Claude API with web search, proposes 2 to 3 topics | Not started |
| 4 | Writer Agent script, full post as validated markdown | Not started |
| 5 | Image generation, OpenAI, committed to `src/assets` in the same PR | Not started |
| 6 | Commit and open PR | Not started |
| 7 | Telegram bot, preview, cost, Approve and Reject | Not started |
| 8 | Approve merges the PR, Action deploys | Not started |
| 9 | GitHub Actions schedules and triggers | Not started |

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

---

## 8. Open questions and next steps

### Blocking, needed from Carlo

1. **Is the Cloudflare Pages project git-connected or direct-upload?** Decision made assuming direct-upload. Worth confirming in the dashboard, because if it is already git-connected then item 0b is free.
2. **Cloudflare account ID** and an **API token** with Pages edit, D1 edit and R2 edit permissions, stored as GitHub secrets.
3. **Telegram** bot token and the chat ID to send approvals to.
4. **Anthropic and OpenAI API keys** as GitHub secrets. Names: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`.
5. **Write access** for the automation to open PRs. A fine-grained PAT scoped to this repo, with Contents read and write and Pull requests read and write.
6. **Commit and push the working tree**, so `main` matches the live site before any automated PR is opened.

### Known issues, unrelated to this project but worth clearing

- **The live site is ahead of the GitHub repo.** Verified 23 September 2026: the September posts are live and rendering correctly, but they are **not in `main`**. `git show HEAD:src/data/blogPosts.ts` contains none of the three September slugs. The last content commit is `6894aab`, the August pack.

  This is not a mistake, it is how the deploy works. `npm run deploy` runs `vite build && wrangler pages deploy dist`, which builds from **files on disk**, not from git. So a deploy publishes whatever is in the working folder whether or not it was ever committed.

  It matters for this project because **automated PRs branch from `main` on GitHub**. If `main` is missing a month of content that is live, a merged PR could rebuild the site from a stale base and silently regress it. Commit and push the working tree before the automation opens its first PR. Once the deploy Action is in place this class of drift disappears, because deploys will come from `main` rather than from a laptop.
- Four unused image imports remain in `blogPosts.ts`: `blogAug04`, `blogJul14`, `blogJul21`, `blogJul28`.
- `netlify.toml` is present but nothing reads it. It caused a wrong deploy-platform conclusion once already. Rename or delete it.

---

## 9. Setup guide for Carlo

Plain English. Work top to bottom. Nothing here needs a developer.

### Jargon, once

**PR, Pull Request.** GitHub's "propose a change" mechanism. Instead of editing the live branch directly, a change goes on a separate branch and you get a page showing exactly what would change, line by line, with a Merge button. Nothing takes effect until you merge. That is the whole reason it is in this design: every generated post becomes one reviewable PR, Approve in Telegram just presses Merge for you, and Reject closes it and throws the branch away. It is the undo button.

**PAT, Personal Access Token.** A password substitute for scripts. It lets automation act on the repo without handing it your GitHub password. "Fine-grained" means scoped to one repo with only the permissions it needs, so a leaked token cannot touch anything else.

**D1.** Cloudflare's database. **R2.** Cloudflare's file storage, not used in Phase 1. **Worker.** A small program that runs on Cloudflare's servers and answers web requests.

### Step 1. Make GitHub match the live site

The live site is ahead of the repo, see section 8. From the `menshairtostay` folder:

```
git add -A
git commit -m "September 2026 content, remove placeholder video component"
git push
```

**Do this before anything else.** Until it is done, an automated PR would branch from an August-era `main` and merging it could wipe September.

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

Build 0a, the markdown content layer, and migrate the existing 20 posts into `src/content/blog/*.md` with the Zod schema. Everything else depends on it.

**The migration must preserve `faqs`, `category`, `readTime`, `author` and the ISO `date` on every post.** `faqs` generates the FAQPage structured data and `date` drives the Monday gate. If a migration quietly drops either, the site loses rich results and scheduled publishing, and neither failure is visible by looking at the site. Verify post by post, not in aggregate.
