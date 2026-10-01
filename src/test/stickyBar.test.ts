// @vitest-environment node
//
// The bottom Call and Book bar on a phone (batch 4b fixes, PR #8), checked in
// a real browser at 390x844 and 360x740 on every route with phone screens:
//
//   - nothing ever sits under the bar while it shows,
//   - at the end of the page the bar is gone and the footer reaches the
//     bottom of the screen, with no strip under it.
//
// How a page is walked and what counts as "under" is defined once, in
// scripts/bar-check.mjs, which also prints the table in the report. The test
// runs the dev server itself, as src/test/snapScreens.test.ts does.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type ViteDevServer } from "vite";
import { chromium, type Browser } from "playwright";
import { BAR_ROUTES, SIZES, checkRoute } from "../../scripts/bar-check.mjs";

let server: ViteDevServer;
let browser: Browser;
let base: string;

beforeAll(async () => {
  server = await createServer({ configFile: "vite.config.ts", logLevel: "error", server: { host: "127.0.0.1", port: 0 } });
  await server.listen();
  const address = server.httpServer!.address();
  base = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;
  browser = await chromium.launch();
  // The first request compiles the app; do it once before the clock starts.
  await checkRoute(browser, base, "/no-such-page", SIZES[0]);
}, 120_000);

afterAll(async () => {
  await browser?.close();
  await server?.close();
});

describe.each(SIZES)("the bottom bar at $width x $height", (size) => {
  it(
    "never shows over content, and is gone at the end of the page, where the footer meets the bottom edge",
    async () => {
      const routes: string[] = BAR_ROUTES();
      const failures: string[] = [];
      for (let i = 0; i < routes.length; i += 4) {
        const batch = routes.slice(i, i + 4);
        const results = await Promise.all(batch.map((r) => checkRoute(browser, base, r, size)));
        results.forEach((res, k) => {
          const route = batch[k];
          for (const c of res.covers) failures.push(`${route} at ${c.y}px: the bar is over ${c.under.join(", ")}`);
          if (res.endBar) failures.push(`${route}: the bar shows at the end of the page`);
          // Up to 1px is the page's height rounding to whole pixels at the end
          // of the scroll; the page's own background there is the footer's
          // dark colour (src/index.css), so even that sliver is never light.
          if (Math.abs(res.endGap) > 1) failures.push(`${route}: ${res.endGap}px under the footer at the end of the page`);
        });
      }
      expect(failures).toEqual([]);
    },
    900_000
  );
});
