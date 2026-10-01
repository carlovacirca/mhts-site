// @vitest-environment node
//
// Carlo's rule for the section scroll on a phone (after the batch 4b fixes
// preview): every snap screen is a full, sensible screen. Measured in a real
// browser at 390x844, on every route that has snap screens:
//
//   - no screen is less than 70% filled with content,
//   - no screen is taller than 110% of the phone screen,
//   - no content sits between two screens where the page never rests.
//
// Nothing is exempt: the hero (the first screen) and the footer's screen are
// held to the same rule. Blog articles are not in the list: they use
// proximity, with stops only at their headings, not screens.
//
// How a screen and its fill are measured is defined once, in
// scripts/snap-screens.mjs, which also prints the table in the report. The
// test runs the dev server itself, so it needs no build; it needs Chromium,
// which CI installs before the tests run.
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createServer, type ViteDevServer } from "vite";
import type { Browser } from "playwright";
import { PHONE, SNAP_ROUTES, areaSlugs, launch, measureRoute } from "../../scripts/snap-screens.mjs";

const MIN_FILL = 70;
const MAX_HEIGHT = 110;

let server: ViteDevServer;
let browser: Browser;
let base: string;

beforeAll(async () => {
  server = await createServer({ configFile: "vite.config.ts", logLevel: "error", server: { host: "127.0.0.1", port: 0 } });
  await server.listen();
  const address = server.httpServer!.address();
  base = `http://127.0.0.1:${typeof address === "object" && address ? address.port : 0}`;
  browser = await launch();
  // The first request compiles the app; do it once before the clock starts.
  await measureRoute(browser, base, "/");
}, 120_000);

afterAll(async () => {
  await browser?.close();
  await server?.close();
});

describe(`every phone snap screen at ${PHONE.width}x${PHONE.height}`, () => {
  it(
    "is at least 70% filled, at most 110% of the screen tall, and nothing falls between two screens",
    async () => {
      const routes: string[] = SNAP_ROUTES(areaSlugs());
      const failures: string[] = [];
      // Four pages at a time.
      for (let i = 0; i < routes.length; i += 4) {
        const batch = routes.slice(i, i + 4);
        const results = await Promise.all(batch.map((r) => measureRoute(browser, base, r)));
        results.forEach(({ rows, unseen, unseenPx }, k) => {
          const route = batch[k];
          expect(rows.length, `${route} has no snap screens`).toBeGreaterThan(1);
          for (const r of rows) {
            if (r.fillPct < MIN_FILL) failures.push(`${route} #${r.index + 1} ${r.label}: ${r.fillPct}% filled`);
            if (r.heightPct > MAX_HEIGHT) failures.push(`${route} #${r.index + 1} ${r.label}: ${r.heightPct}% of the screen tall`);
          }
          if (unseen) failures.push(`${route}: ${unseenPx}px of content between screens`);
        });
      }
      expect(failures).toEqual([]);
    },
    600_000
  );
});
