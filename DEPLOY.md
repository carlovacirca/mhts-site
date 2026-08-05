# Deploying Men's Hair To Stay

## The one command

From the `menshairtostay` folder, in the VS Code terminal:

```
npm run deploy
```

That runs four steps in order and stops if any of them fails:

1. `npm run build` — compiles the site and catches any type error before it reaches the live site
2. `git add -A` — stages everything
3. `git commit` — commits with the message "Publish August 2026 content"
4. `git push` — pushes to `origin/main`

Netlify picks up the push and rebuilds. Give it a minute or two, then check the site.

## If you want your own commit message

```
npm run build
git add -A
git commit -m "your message here"
git push
```

## Things that will stop it, and what they mean

**"nothing to commit, working tree clean"** — everything is already committed. Run `git push` on its own to send it.

**A TypeScript or build error** — the build failed, so nothing was committed or pushed. That is the point of running the build first. Fix the error and run it again.

**`git push` asks for credentials** — GitHub needs a personal access token rather than a password. Once you save it, it will not ask again.

## How the site actually goes live

`netlify.toml` in the repo root is the deploy config. It sets the build command, the publish directory, the single page app redirect, HTTPS enforcement, the content security policy and cache headers. The push triggers a Netlify build.

There is a leftover empty `.wrangler` folder in the repo from a Cloudflare experiment. It has no config file in it and nothing uses it. Ignore it.

**Worth confirming once:** open the Netlify dashboard and check the site is connected to `github.com/carlovacirca/mhts-site` with automatic builds enabled. If it is not, the push will not publish and you would need to trigger a deploy manually. There is an old commit in the history called "Trigger redeploy", which suggests pushes do trigger builds, but check it once so you know for certain.

## What happens to the August blogs when you deploy

All five go up at once as URLs, but the blog listing only shows a post once its date has arrived. Today is 5 August, so:

| Post | Date | Visible in the listing after deploy |
|---|---|---|
| Does a hair system look natural | 3 Aug | Yes, its date has passed |
| Is SMP permanent | 10 Aug | No, appears on 10 August |
| SMP vs hair transplant | 17 Aug | No, appears on 17 August |
| What affects the cost of hair restoration | 24 Aug | No, appears on 24 August |
| What happens at a free consultation | 31 Aug | No, appears on 31 August |

The date check runs in the browser on every visit, so **one deploy covers the whole month**. You do not need to push again each Monday.

To see the scheduled posts before their date, visit `/blog?preview=1`.

One thing to know: the scheduled post URLs do resolve if someone types them directly, and all five are in the sitemap from day one. Nothing links to them until their Monday, so no visitor will stumble on them, but Google could crawl one early. That trade off keeps the month hands off and avoids errors in Search Console.

## Before you deploy

The five blog heroes are still placeholder images from the existing bank. The posts will publish and read correctly, but the pictures are not the ones the shot list calls for. You can either deploy now and update images later, which is a one line change per post, or wait until the photos are in.
