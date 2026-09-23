# Deploying Men's Hair To Stay

## Deploys run from GitHub (since 23 September 2026)

Every push to `main` on GitHub runs `.github/workflows/deploy.yml`, which installs, tests, builds and deploys to the Cloudflare Pages project `menshairtostay`. Watch it in the repo's **Actions** tab. Green means live, usually about 2 minutes after the push.

**Do not deploy from your laptop.** `npm run deploy` now refuses on purpose. Laptop deploys build from files on disk, so they can publish work that never reached GitHub. That is how the September posts ended up live but missing from git.

## To publish a change

```
cd "C:\Users\0\1. Rank SEO\menshairtostay"
git add <the files you changed>
git commit -m "what changed"
git push
```

Avoid `git add -A`. About 80 files show as modified only because of Windows line endings and have no real change.

## If a run goes red

Nothing was deployed. The live site stays on the last good version. Open the red run in the Actions tab, click the red step, and read the error. A blog post that fails validation names the file and the field.

## To roll back

Cloudflare dashboard, **Workers & Pages**, **menshairtostay**, **Deployments**. Find the last good deployment, click the three dots, **Rollback to this deployment**.

## Things that go wrong

**`Unable to create '.git/index.lock': File exists`**
A stale lock from an interrupted git operation. If nothing is running, `del .git\index.lock` and try again.

**The site looks unchanged after deploying**
Hard refresh, Ctrl+Shift+R.

## Blog posts and dates

Posts are markdown files in `src/content/blog/`. A post goes live with the deploy, but the `/blog` listing only shows it once its `publishDate` has arrived. See `/blog?preview=1` to see scheduled posts early. See AUTOMATION.md for the full format.
