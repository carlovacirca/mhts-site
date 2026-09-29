// Build-time pre-rendering. Runs after `vite build`.
//
// Why: every URL on this site used to return the same empty HTML shell with the
// homepage title, description and canonical, and only became its real page once
// React had run. Google can render JavaScript but is slow to, and the AI
// crawlers that increasingly send traffic do not run it at all. Search Console
// had 8 of about 60 pages indexed. See docs/HEALTH-CHECK.md finding 1.
//
// What it does: boots a preview server on dist/, opens every route in headless
// Chrome, waits for the page to settle, and saves the finished HTML.
//
// Two rules make the output safe to ship:
//
//  1. FILE LAYOUT. Cloudflare Pages serves dist/foo.html at /foo with a 200 and
//     no redirect, but serves dist/foo/index.html at /foo/ and redirects /foo
//     to it. Every URL on this site is extensionless with no trailing slash, so
//     every page is written as <route>.html. Nothing redirects and no URL
//     changes.
//
//  2. A PAGE THAT IS NOT A PAGE GETS NO FILE. If a route renders the 404 (an
//     unknown URL, or a post whose publish date has not arrived) nothing is
//     written for it. Cloudflare Pages then falls through to dist/404.html and
//     answers with a real HTTP 404 instead of the 200 it used to give. That is
//     also what turns the date gate into a status code: a scheduled post's URL
//     is a genuine 404 until the day it is due, and ?preview=1 still opens it
//     in the browser on a preview host, which is what the Telegram approval
//     link uses.
//
// The presence of dist/404.html is what switches Cloudflare Pages out of
// single-page-app mode, so the pre-render must be complete. It is: the route
// list comes from App.tsx itself (see scripts/routes.mjs) and the build fails
// if a sitemap URL did not produce a file.
import { preview } from "vite";
import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { enumerateRoutes, outputFileFor, sitemapPaths, blogSlugs } from "./routes.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4);
/** A URL no route claims, used to capture the branded 404 page. */
const NOT_FOUND_PROBE = "/__prerender_404__";

/** Scripts that must never end up in the HTML, whatever a page does. */
const FORBIDDEN_IN_HTML = [
  { name: "GA4 loader", pattern: /googletagmanager\.com/ },
  { name: "Trafft embed", pattern: /trafft\.com\/embed\.js/ },
];

const settle = async (page) => {
  // Scroll the whole page so anything that only renders once it has been near
  // the viewport has rendered. Entry animations are switched off for this pass
  // (see the init script in render below), so there is nothing to wait out and
  // no dependence on how fast the machine doing the build happens to be.
  await page.evaluate(async () => {
    const step = Math.max(400, window.innerHeight);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r()));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 150));
  });
};

async function render(page, baseUrl, routePath) {
  // Read by src/lib/prerender.ts before React mounts. It makes every motion
  // component render at its resting state instead of animating in, so what
  // this function serialises is the finished page and never a frame of an
  // animation that happened not to have finished yet. Without it, whichever
  // fades were still running at capture time were frozen into the file at
  // opacity 0: invisible without JavaScript, and popping into view when React
  // took over. It showed up on 6 pages locally and 10 on the CI runner.
  await page.addInitScript(() => {
    window.__MHTS_PRERENDER__ = true;
  });
  await page.goto(baseUrl + routePath, { waitUntil: "networkidle", timeout: 60000 });
  // <main> only exists once Layout has mounted, and the static index.html has
  // none, so it is a reliable "React has committed" signal for every route,
  // including the homepage whose title matches the static default.
  await page.waitForSelector("main", { timeout: 20000 });
  await settle(page);

  const info = await page.evaluate(() => {
    // Only the 404 page asks for noindex, and it removes it again on unmount,
    // so this is the app telling us the URL is not a page.
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content") || "";
    return {
      isNotFound: robots.includes("noindex"),
      title: document.title,
      finalPath: window.location.pathname,
      h1: document.querySelector("h1")?.textContent?.trim() || null,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") || null,
    };
  });

  // Strip what must not be baked, and stamp the flag src/lib/prerender.ts reads.
  await page.evaluate(() => {
    document.querySelectorAll("[data-prerender-strip]").forEach((el) => el.remove());
    // The toast library injects its own 14 KB stylesheet on mount. Baking it
    // adds 14 KB to every page for something that cannot appear before
    // JavaScript runs, and the library injects it again anyway.
    document.querySelectorAll("style").forEach((el) => {
      if (el.textContent && el.textContent.includes("[data-sonner-toaster]")) el.remove();
    });
    document.documentElement.setAttribute("data-prerendered", "1");
  });

  return Object.assign(info, { html: await page.content() });
}

function stripCanonical(html) {
  // A 404 must not claim a canonical URL, and the probe path it was rendered
  // from is not a real address.
  return html
    .replace(/\s*<link[^>]*rel="canonical"[^>]*>/gi, "")
    .replace(/\s*<meta[^>]*property="og:url"[^>]*>/gi, "");
}

async function main() {
  const routes = enumerateRoutes(ROOT);
  const targets = routes.concat([{ path: NOT_FOUND_PROBE, kind: "notfound" }]);
  console.log("Pre-rendering " + routes.length + " routes plus the 404 page\n");

  const server = await preview({
    root: ROOT,
    preview: { port: 4173, strictPort: false },
    logLevel: "warn",
  });
  const baseUrl = server.resolvedUrls.local[0].replace(/\/$/, "");
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });

  const files = new Map(); // dist-relative path -> html
  const rendered = [];
  const skipped = [];
  const failures = [];
  let next = 0;

  const worker = async () => {
    while (next < targets.length) {
      const target = targets[next++];
      const page = await context.newPage();
      try {
        const r = await render(page, baseUrl, target.path);

        if (target.kind === "notfound") {
          if (!r.isNotFound) throw new Error("the 404 probe did not render the 404 page");
          files.set("404.html", stripCanonical(r.html));
          rendered.push(Object.assign({}, target, r, { file: "404.html" }));
        } else if (r.isNotFound) {
          // No file on purpose. Cloudflare Pages answers 404 from 404.html.
          skipped.push({ path: target.path, reason: "renders the 404 page" });
        } else {
          const file = outputFileFor(target.path);
          files.set(file, r.html);
          rendered.push(Object.assign({}, target, r, { file }));
        }
      } catch (err) {
        failures.push({ path: target.path, message: err.message });
      } finally {
        await page.close();
      }
    }
  };

  // The sticky bottom bar on a phone, while it is hidden at the top of a page,
  // must take up no room at all. In batch 4a its collapsing row kept its
  // padding and border, so a 21px strip with the tops of the Call and Book
  // buttons showed at the foot of every phone screen. Measured here, in a real
  // browser at phone width, because jsdom cannot lay anything out.
  const measureCollapsedBar = async () => {
    const phone = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const out = [];
    for (const path of ["/", "/hair-systems", "/blog"]) {
      const page = await phone.newPage();
      await page.goto(baseUrl + path, { waitUntil: "networkidle", timeout: 60000 });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(400);
      const bar = await page.evaluate(() => {
        const el = document.querySelector('[data-testid="sticky-mobile-cta"]');
        return el ? { visible: el.getAttribute("data-visible"), height: el.getBoundingClientRect().height } : null;
      });
      if (!bar) out.push(path + ": the sticky bottom bar is missing");
      else if (bar.visible !== "0") out.push(path + ": the sticky bottom bar is showing at the top of the page");
      else if (bar.height !== 0) out.push(path + ": the collapsed sticky bottom bar is " + bar.height + "px tall at 390px, not 0");
      await page.close();
    }
    await phone.close();
    return out;
  };
  let barProblems = [];

  try {
    await Promise.all(Array.from({ length: CONCURRENCY }, worker));
    barProblems = await measureCollapsedBar();
  } finally {
    await browser.close();
    await server.close();
  }

  if (failures.length) {
    console.error("\nFailed to render:");
    for (const f of failures) console.error("  " + f.path + ": " + f.message);
    process.exit(1);
  }

  // ---- checks, before anything is written ----
  const problems = [...barProblems];

  for (const [file, html] of files) {
    for (const forbidden of FORBIDDEN_IN_HTML) {
      if (forbidden.pattern.test(html)) {
        problems.push(file + " has a baked " + forbidden.name + ", which must stay behind cookie consent");
      }
    }
    if (!/<title>[^<]{5,}<\/title>/i.test(html)) problems.push(file + " has no usable <title>");
    if ((html.match(/<h1\b/gi) || []).length !== 1) problems.push(file + " does not have exactly one <h1>");
    // An element saved part way through a fade is invisible to anyone without
    // JavaScript and pops into view when React takes over. Switching the
    // animations off for the capture makes it impossible; this makes sure.
    const midAnimation = html.match(/style="[^"]*opacity:\s*0(\.\d+)?\s*[;"]/g) || [];
    if (midAnimation.length) {
      problems.push(
        file + " has " + midAnimation.length + " element(s) saved mid-animation (inline opacity below 1)"
      );
    }
  }
  for (const r of rendered) {
    if (r.kind === "page" && !r.canonical) problems.push(r.path + " rendered without a canonical");
  }

  // Every sitemap URL must be a real file, otherwise it now 404s at the edge.
  const posts = new Set(blogSlugs(ROOT).map((s) => "/blog/" + s));
  for (const path of sitemapPaths(ROOT)) {
    if (files.has(outputFileFor(path))) continue;
    if (posts.has(path)) {
      console.warn("  ! " + path + " is in the sitemap but is not published yet, so it will 404 until its date");
      continue;
    }
    problems.push(path + " is in public/sitemap.xml but no page was rendered for it");
  }

  if (problems.length) {
    console.error("\nPre-render checks failed:");
    for (const p of problems) console.error("  - " + p);
    process.exit(1);
  }

  // ---- write ----
  for (const [file, html] of files) {
    const out = join(DIST, file);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, html, "utf8");
  }

  rendered.sort((a, b) => a.path.localeCompare(b.path));
  for (const r of rendered) {
    const kb = Math.round(files.get(r.file).length / 1024);
    console.log("  " + String(kb).padStart(4) + " KB  " + r.path.padEnd(58) + " " + r.title);
  }
  for (const s of skipped) {
    console.log("       --  " + s.path.padEnd(58) + " no file, " + s.reason);
  }

  console.log(
    "\n" + files.size + " files written to dist (" + rendered.length + " pages, " +
      skipped.length + " URLs left to 404)."
  );

  if (process.env.PRERENDER_REPORT) {
    writeFileSync(
      process.env.PRERENDER_REPORT,
      JSON.stringify(
        {
          rendered: rendered.map((r) => {
            const copy = Object.assign({}, r);
            delete copy.html;
            return copy;
          }),
          skipped,
        },
        null,
        2
      )
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
