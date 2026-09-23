# Prompt for the next Cowork chat on this project

Paste the block below into a **new Cowork chat** with `1. Rank SEO` as the selected folder.

Keep this project in its own chat, separate from the monthly content runs. Reuse this same chat for each session, and only start a fresh one if it slows down or gets compacted more than once. When you do start fresh, paste this block again.

---

```
Work on the Men's Hair To Stay content automation project, in
C:\Users\0\1. Rank SEO\menshairtostay.

STEP 1. READ AUTOMATION.md FIRST, BEFORE ANYTHING ELSE.

C:\Users\0\1. Rank SEO\menshairtostay\AUTOMATION.md is the single source of
truth for this project. It holds the architecture, the D1 schema and Worker API
contracts, the content rules, the decisions log with reasoning, the task list
with status, and a setup guide.

Read all of it. If it conflicts with anything I say from memory, or with any
earlier planning conversation, AUTOMATION.md wins and you tell me where the
conflict is.

Do not re-litigate anything in the decisions log. Astro, R2 and DataForSEO are
settled and the reasoning is written down. If you think a settled decision is
wrong, say so and say why, but do not quietly design around it.

STEP 2. VERIFY THE CURRENT STATE YOURSELF.

Do not trust the status table in AUTOMATION.md without checking. Verify and
report, in a short list:

- git log and git status. Is the working tree committed and pushed? Does main
  match the live site? Section 8 explains why this matters.
- Which Phase 1 tasks are genuinely done versus marked done.
- Whether src/content/blog exists yet.
- Whether .github/workflows exists yet.
- Whether I have answered the blocking questions in section 8.

Then tell me what changed since the file was last updated, and what the real
next step is.

STEP 3. ASK ME FOR WHAT YOU NEED, THEN WAIT.

Use multiple choice questions. Do not start writing code until I have answered
and until the prerequisites in section 8 are actually met.

STEP 4. BUILD ONE TASK AT A TIME.

Work through the Phase 1 task list in AUTOMATION.md in order. Tasks 0a and 0b
are prerequisites, nothing downstream works without them.

Finish one task, verify it, show me the evidence, update the status table in
AUTOMATION.md, commit, and only then move to the next. Do not build three
things at once and hand me a pile.

RULES FOR THIS PROJECT:

- Update AUTOMATION.md and commit it whenever a meaningful decision or change
  is made. That file going stale is the main risk to this project, because my
  business partner is building a dashboard against its data contracts.
- Verify claims against the actual repo and the live site rather than asserting
  from memory or from earlier in the chat. Deploys on this site build from
  files on disk, not from git, so the live site and the repo can disagree.
- Report real numbers from real checks, not reassurance.
- I am not a developer. Explain anything technical in plain English the first
  time you use it, and tell me exactly which buttons to click when you need me
  to do something in a dashboard.
- Never commit a secret. Credentials go in GitHub Actions secrets only.
- The live site is a real business that ranks. Nothing touches production
  without me seeing what changed first.
- Do not write long summaries of what you did. I will read the files.
```

---

## What the next chat will find already done

- `AUTOMATION.md` written and committed, four commits on `main`, **not yet pushed**
- Architecture settled: no Astro, no R2 in Phase 1, no DataForSEO, no n8n, no VPS
- D1 schema and Worker API endpoints drafted, ready for the dashboard to build against
- Phase 1 task list defined, all nine tasks Not Started
- Setup guide written, section 9

## What it needs from you

Two things unblock the build, both in section 9:

1. **Commit and push the working tree**, so GitHub matches the live site
2. **Check whether Cloudflare Pages is git-connected or Direct Upload**, and report which

Credentials can follow after that.
