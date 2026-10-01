// Walks a page on a phone the way a reader does, a screen at a time, and
// checks the bottom Call and Book bar at every place the page comes to rest
// (batch 4b fixes, PR #8):
//
//   - while the bar shows, nothing sits under it: no words, image, button or
//     card, only a section's own background;
//   - at the end of the page the bar is gone and the footer runs to the bottom
//     edge of the screen, with no strip under it.
//
// Used by src/test/stickyBar.test.ts and, run directly, prints one line per
// route and size for the report:
//
//   node scripts/bar-check.mjs http://localhost:5173 [route ...]
//
// "A screen at a time" is the Page Down key, which scroll snap turns into the
// next stop. A swipe can also rest at the extra stops SnapGuides adds at the
// end of a screen taller than the phone; the bar's rule is the same there.

import { chromium } from "playwright";
import { SNAP_ROUTES, areaSlugs } from "./snap-screens.mjs";

export const SIZES = [
  { width: 390, height: 844 },
  { width: 360, height: 740 },
];

/** Every route with phone screens, plus two blog articles and a 404. */
export const BAR_ROUTES = () => [
  ...SNAP_ROUTES(areaSlugs()),
  "/blog/autumn-hair-shedding-explained",
  "/blog/hair-systems-vs-scalp-micropigmentation",
  "/no-such-page",
];

/** Runs in the page: what sits under the bar's strip of screen. */
function underBar() {
  const bar = document.querySelector('[data-testid="sticky-mobile-cta"]');
  const r = bar.getBoundingClientRect();
  const top = r.top;
  const bottom = r.bottom;
  const w = innerWidth;
  const hits = [];
  const shown = (el) => {
    const shut = el.closest("details:not([open])");
    if (shut && shut !== el && !el.closest("summary")) return false;
    const cs = getComputedStyle(el);
    return cs.display !== "none" && cs.visibility !== "hidden";
  };
  const pinned = (el) => {
    for (let a = el; a && a !== document.body; a = a.parentElement) {
      const p = getComputedStyle(a).position;
      if (p === "fixed" || p === "sticky") return true;
    }
    return false;
  };
  const inStrip = (t) => t.bottom > top + 1 && t.top < bottom - 1 && t.right > 0 && t.left < w && t.width > 0;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const p = n.parentElement;
    if (!n.textContent.trim() || !p || !shown(p) || pinned(p)) continue;
    const range = document.createRange();
    range.selectNodeContents(n);
    if (Array.from(range.getClientRects()).some(inStrip)) hits.push(`"${n.textContent.trim().slice(0, 40)}"`);
  }
  for (const el of document.querySelectorAll("main *, footer *")) {
    if (!shown(el) || pinned(el)) continue;
    const c = el.getBoundingClientRect();
    if (c.height < 1 || !inStrip(c)) continue;
    if (/^(IMG|SVG|VIDEO|IFRAME|INPUT|BUTTON|TEXTAREA|SELECT)$/i.test(el.tagName)) {
      hits.push(el.tagName.toLowerCase());
      continue;
    }
    const cs = getComputedStyle(el);
    const painted =
      cs.backgroundColor !== "rgba(0, 0, 0, 0)" ||
      cs.backgroundImage !== "none" ||
      parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) > 0;
    if (painted && c.width < 0.9 * w) hits.push(`a card (${el.tagName.toLowerCase()})`);
  }
  return hits;
}

/** One route at one size. `browser` from chromium.launch(). */
export async function checkRoute(browser, base, route, viewport) {
  const context = await browser.newContext({ viewport, reducedMotion: "no-preference" });
  const page = await context.newPage();
  // Only the site itself, as in snap-screens.mjs.
  const origin = new URL(base).origin;
  await page.route("**/*", (r) => (r.request().url().startsWith(origin) ? r.continue() : r.abort()));
  await page.addInitScript(() => localStorage.setItem("mhts-cookie-consent", "declined"));
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  const rests = [];
  let last = -1;
  for (let k = 0; k < 60; k++) {
    // A rest is where the page has stopped: the same scroll position over
    // several checks. On a busy machine a Page Down can take longer than any
    // fixed wait, and a page still moving is not a rest. The bar is decided
    // once scrolling stops, then fades over 300ms.
    let still = 0;
    let at = -1;
    for (let t = 0; t < 40 && still < 3; t++) {
      await page.waitForTimeout(150);
      const y = await page.evaluate(() => scrollY);
      still = y === at ? still + 1 : 0;
      at = y;
    }
    await page.waitForTimeout(500);
    const rest = await page.evaluate((fn) => {
      const bar = document.querySelector('[data-testid="sticky-mobile-cta"]');
      const footer = document.querySelector("footer").getBoundingClientRect();
      return {
        y: Math.round(scrollY),
        bar: bar.getAttribute("data-visible") === "1" && getComputedStyle(bar).opacity === "1",
        under: new Function(`return (${fn})()`)(),
        footerGap: Math.round(innerHeight - footer.bottom),
      };
    }, underBar.toString());
    if (rest.y === last) break;
    rests.push(rest);
    last = rest.y;
    await page.keyboard.press("PageDown");
  }
  await context.close();
  const end = rests.at(-1);
  return {
    rests: rests.length,
    shown: rests.filter((r) => r.bar).length,
    covers: rests.filter((r) => r.bar && r.under.length).map((r) => ({ y: r.y, under: r.under.slice(0, 3) })),
    endBar: end.bar,
    endGap: end.footerGap,
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , base, ...routes] = process.argv;
  const list = routes.length ? routes : BAR_ROUTES();
  const browser = await chromium.launch();
  console.log("size\troute\tstops\tbar shown at\tbar over content\tbar at the end\tgap under footer");
  for (const size of SIZES) {
    for (let i = 0; i < list.length; i += 4) {
      const batch = list.slice(i, i + 4);
      const results = await Promise.all(batch.map((r) => checkRoute(browser, base, r, size)));
      results.forEach((res, k) =>
        console.log(
          `${size.width}x${size.height}\t${batch[k]}\t${res.rests}\t${res.shown}\t${res.covers.length ? JSON.stringify(res.covers) : "never"}\t${res.endBar ? "SHOWING" : "hidden"}\t${res.endGap}px`
        )
      );
    }
  }
  await browser.close();
}
