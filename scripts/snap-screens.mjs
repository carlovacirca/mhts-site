// Measures the phone snap screens of a page: every element the page can snap
// to, how tall it is, and how much of it is content.
//
// Used by src/test/snapScreens.test.ts (which fails on a screen that is too
// empty or too tall) and, run directly, to print the table in the report:
//
//   node scripts/snap-screens.mjs http://localhost:5173 [route ...]
//
// Measured at 390x844 with only the site's own requests allowed (the web
// font is replaced by its metric-matched fallback; see measureRoute).
//
// Definitions (kept here so the test and the report agree):
//   screen   the visible area when snapped: the viewport less the sticky header
//            and the bottom Call and Book bar (--snap-screen). The first screen
//            also covers the thin contact bar (--snap-first-screen).
//   height   the snap element's height, as a % of its screen. Not counting its
//            bottom border: since PR #8 every screen after the first carries
//            the bar's band as a transparent bottom border, the strip under the
//            bar, which is never content.
//   fill     the content inside it, from the top of its first piece of content
//            to the bottom of its last, as a % of the element's height (or of
//            the screen, when the element is shorter than a screen). Content is
//            text, images, video, maps, form controls and buttons, and any box
//            with a background or border narrower and shorter than the screen
//            (a card). A full-width band of colour is backdrop, not content.

import { readFileSync } from "node:fs";
import { chromium } from "playwright";

/** The area slugs, read from src/data/areas.ts without compiling it. */
export const areaSlugs = () =>
  [...readFileSync(new URL("../src/data/areas.ts", import.meta.url), "utf8").matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);

export const PHONE = { width: 390, height: 844 };

/** Every route with phone snap screens. Blog articles use proximity, not screens. */
export const SNAP_ROUTES = (areaSlugs) => [
  "/",
  "/hair-systems",
  "/hair-systems/non-surgical-hair-replacement",
  "/hair-systems/hair-replacement-service",
  "/hair-systems/initial-consultation-and-fitting",
  "/hair-systems/hair-system-colouring",
  "/hair-systems/hair-system-styling",
  "/scalp-micropigmentation",
  "/scalp-micropigmentation/full-smp-treatment",
  "/scalp-micropigmentation/smp-touch-up-session",
  "/scalp-micropigmentation/smp-consultation",
  "/hair-density",
  "/hair-density/density-treatment-consultation",
  "/hair-density/thinning-hair-treatment",
  "/hair-density/crown-coverage-treatment",
  "/hair-system-maintenance",
  "/hair-system-maintenance/hair-system-reattachment-and-restyling",
  "/hair-system-maintenance/hair-system-base-clean-and-reattach",
  "/hair-system-maintenance/hair-system-full-maintenance-package",
  "/how-it-works",
  "/faq",
  "/areas-serviced",
  ...areaSlugs.map((s) => `/areas/${s}`),
  "/blog",
  "/book",
  "/privacy-policy",
  "/gallery",
  "/contact",
  "/services",
];

/** Runs in the page. Returns one row per snap screen, top to bottom. */
function measureInPage() {
  const probe = (v) => {
    const d = document.createElement("div");
    d.style.cssText = `position:absolute;visibility:hidden;height:${v}`;
    document.body.appendChild(d);
    const h = d.getBoundingClientRect().height;
    d.remove();
    return h;
  };
  const screen = probe("var(--snap-screen)");
  const firstScreen = probe("var(--snap-first-screen)");

  const visible = (el) => {
    // The answer inside a closed <details> still reports a box in Chromium,
    // though nothing of it is drawn.
    const shut = el.closest("details:not([open])");
    if (shut && shut !== el && !el.closest("summary")) return false;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0;
  };
  // A stop inside a scroller of its own (a swipeable strip) snaps that
  // scroller, not the page.
  const inOwnScroller = (el) => {
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const cs = getComputedStyle(a);
      if (/(auto|scroll|hidden)/.test(cs.overflowX + cs.overflowY)) return true;
    }
    return false;
  };
  // Inside a swipeable strip only what is in view counts.
  const visibleInScroller = (el) => {
    const r = el.getBoundingClientRect();
    return r.right > 0 && r.left < innerWidth;
  };
  // Top to bottom as laid out (CSS order can differ from the source).
  const stops = Array.from(document.querySelectorAll("body *"))
    .filter((el) => getComputedStyle(el).scrollSnapAlign.split(" ").some((a) => a !== "none") && visible(el) && !inOwnScroller(el))
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);

  // Named after its heading, or failing that its first words.
  const label = (el) => {
    const h = ["h1", "h2", "h3", "figcaption", "blockquote", "p", "a", "button"].map((t) => el.querySelector(t)).find(Boolean);
    const text = (h?.textContent ?? el.textContent ?? "").replace(/\s+/g, " ").trim();
    return `${el.tagName}${text ? ` "${text.slice(0, 48)}"` : " (empty)"}`;
  };

  // Every piece of content on the page, in page coordinates. The sticky
  // header and the fixed bottom bar are left out: they sit over every screen.
  const pinned = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const pos = getComputedStyle(a).position;
      if (pos === "fixed" || pos === "sticky") return true;
    }
    return false;
  };
  const content = [];
  const push = (rect) => {
    if (rect.width >= 1 && rect.height >= 1) content.push({ top: rect.top + scrollY, bottom: rect.bottom + scrollY });
  };
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const p = n.parentElement;
    if (!n.textContent.trim() || !p || !visible(p) || pinned(p) || inOwnScroller(p) && !visibleInScroller(p)) continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    for (const rect of range.getClientRects()) push(rect);
  }
  for (const c of document.body.querySelectorAll("*")) {
    if (!visible(c) || pinned(c)) continue;
    const cr = c.getBoundingClientRect();
    if (/^(IMG|SVG|VIDEO|IFRAME|CANVAS|INPUT|TEXTAREA|SELECT|BUTTON)$/i.test(c.tagName)) {
      push(cr);
      continue;
    }
    const cs = getComputedStyle(c);
    const painted =
      (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") ||
      cs.backgroundImage !== "none" ||
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) > 0;
    // A card, not a band: a background as wide as the screen is backdrop.
    if (painted && cr.width < 0.9 * innerWidth && cr.height < 0.9 * screen) push(cr);
  }

  // What the reader sees at each stop: from the stop down one screen, or for
  // a stop aligned to its end (the footer), the screen that ends with it.
  const rows = stops.map((el, i) => {
    const r = el.getBoundingClientRect();
    const top = r.top + scrollY;
    const cs = getComputedStyle(el);
    const isEnd = cs.scrollSnapAlign.split(" ").includes("end");
    const height = r.height - (parseFloat(cs.borderBottomWidth) || 0);
    const scr = i === 0 ? firstScreen : screen;
    const box = Math.max(height, scr);
    const from = isEnd ? top + height - box : top;
    const to = from + box;
    let min = Infinity;
    let max = -Infinity;
    for (const c of content) {
      const t = Math.max(c.top, from);
      const b = Math.min(c.bottom, to);
      if (b <= t) continue;
      min = Math.min(min, t);
      max = Math.max(max, b);
    }
    const filled = max > min ? max - min : 0;
    return {
      index: i,
      label: label(el),
      footer: el.tagName === "FOOTER",
      top: Math.round(top),
      from,
      to,
      height: Math.round(height),
      screen: Math.round(scr),
      heightPct: Math.round((height / scr) * 100),
      fillPct: Math.round((filled / box) * 100),
    };
  });

  // Content no screen shows: it sits between two stops and the page never
  // rests on it.
  // (The contact line above the header is seen at the top of the page.)
  const firstTop = stops.length ? stops[0].getBoundingClientRect().top + scrollY : 0;
  const unseen = content.filter((c) => c.bottom > firstTop && !rows.some((r) => (c.top + c.bottom) / 2 >= r.from && (c.top + c.bottom) / 2 <= r.to));
  const unseenPx = unseen.length ? Math.round(Math.max(...unseen.map((c) => c.bottom)) - Math.min(...unseen.map((c) => c.top))) : 0;
  for (const r of rows) {
    delete r.from;
    delete r.to;
  }
  return { screen: Math.round(screen), firstScreen: Math.round(firstScreen), rows, unseen: unseen.length, unseenPx };
}

export async function launch() {
  return chromium.launch();
}

/** Measures one route. `browser` from launch(). */
export async function measureRoute(browser, base, route, viewport = PHONE) {
  const context = await browser.newContext({ viewport, reducedMotion: "no-preference" });
  const page = await context.newPage();
  // Only the site itself. The web font comes from Google, which a test runner
  // may or may not reach; without it the page uses the metric-matched DM Sans
  // fallback (src/index.css), so every run measures the same thing.
  const origin = new URL(base).origin;
  await page.route("**/*", (route) => (route.request().url().startsWith(origin) ? route.continue() : route.abort()));
  // A reader who has already answered the cookie banner: no banner.
  await page.addInitScript(() => localStorage.setItem("mhts-cookie-consent", "declined"));
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Scroll through once, as a reader would, so every block that rises into
  // place on arrival (Reveal, once only) is measured where it settles.
  await page.evaluate(async () => {
    const html = document.documentElement;
    html.style.scrollSnapType = "none";
    for (let y = 0; y < html.scrollHeight; y += 300) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    await new Promise((r) => setTimeout(r, 700));
    window.scrollTo(0, 0);
    html.style.scrollSnapType = "";
  });
  await page.waitForTimeout(150);
  const result = await page.evaluate(measureInPage);
  await context.close();
  return result;
}

const fmt = (route, { rows, unseen, unseenPx }) =>
  rows.map((r) => `${route}\t${r.index + 1}\t${r.label}\t${r.height}\t${r.heightPct}\t${r.fillPct}`).join("\n") +
  (unseen ? `\n${route}\t-\tUNSEEN content between screens\t${unseenPx}\t0\t0` : "");

if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , base, ...routes] = process.argv;
  const list = routes.length ? routes : SNAP_ROUTES(areaSlugs());
  const browser = await launch();
  console.log("route\tscreen\tstop\theight px\theight %\tfill %");
  for (const route of list) console.log(fmt(route, await measureRoute(browser, base, route)));
  await browser.close();
}
