# Deploying Men's Hair To Stay

## The site is on Cloudflare Pages, not Netlify

**Pushing to GitHub does not publish the site.** It only saves the source. Publishing needs a separate wrangler deploy.

There is a `netlify.toml` in this repo, but it is not what serves the site. It is left over and it is misleading. The real signal is the `.wrangler` folder, and the fact that Georges Barbers behaves the same way.

## To publish

From the `menshairtostay` folder:

```
npm run deploy
```

That runs `vite build` then `npx wrangler pages deploy dist`. Wrangler will ask which Cloudflare Pages project to deploy to the first time.

## To save the source to GitHub

Separate step, and it does not publish anything:

```
npm run push
```

Or with your own message:

```
git add -A
git commit -m "your message"
git push
```

## Doing both

Publish first, then save:

```
npm run deploy
npm run push
```

## Things that go wrong, and what they mean

**`Unable to create '.git/index.lock': File exists`**
A stale lock from an interrupted git operation. Check the date on `.git/index.lock`. If nothing is actually running, delete it and try again:

```
del .git\index.lock
```

**`LF will be replaced by CRLF`**
Line endings on Windows. Harmless, ignore it.

**Build fails with a type error**
Nothing was deployed. That is the point of building first. Fix the error and run again.

**The site looks unchanged after deploying**
Hard refresh, Ctrl+Shift+R. Cloudflare caches the old bundle aggressively.

## What happens to the August blogs when you deploy

All five URLs go live at once, but the blog listing only shows a post once its date has arrived.

| Post | Date | In the listing after deploy |
|---|---|---|
| Does a hair system look natural | 3 Aug | Yes, date has passed |
| Is SMP permanent | 10 Aug | Appears 10 August |
| SMP vs hair transplant | 17 Aug | Appears 17 August |
| What affects the cost of hair restoration | 24 Aug | Appears 24 August |
| What happens at a free consultation | 31 Aug | Appears 31 August |

The date check runs in the browser on every visit, so **one deploy covers the whole month**. No need to deploy again each Monday.

To see the scheduled posts before their date, visit `/blog?preview=1`.

Post URLs do resolve if typed directly, and all five sit in the sitemap from day one. Nothing links to them until their Monday, so no visitor will find them early, but Google could crawl one ahead of time. That trade off keeps the month hands off.

## Worth doing at some point

Delete `netlify.toml`, or rename it to `netlify.toml.unused`. It describes redirects, headers and a content security policy that are not being applied by anything, so it reads as live configuration when it is not. Anyone looking at this repo, including me, will draw the wrong conclusion from it.

The redirects and headers it defines would need setting up in Cloudflare if they are not already there. Worth checking:

- HTTP to HTTPS enforcement
- The SPA catch-all so client-side routes resolve on a direct hit or refresh
- The 301 from `/georges-barbers` to `georgesbarbers.co.uk`
- Security headers and the content security policy
- Long cache on `/assets/*`

If the site is working correctly today, most of this is already configured in the Cloudflare dashboard and the file is simply redundant.
