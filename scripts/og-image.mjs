// Builds the default link preview image, public/og-image.jpg (1200x630).
//
//   node scripts/og-image.mjs [out.jpg]
//
// Every page that has no image of its own (everything but the blog posts)
// points og:image and twitter:image at /og-image.jpg, from index.html and
// src/lib/seo.ts, so this one file is the preview for the whole site.
//
// The layout: the logo on a white chip, "Amersham, Buckinghamshire", the
// heading "Hair Systems & SMP" in one weight (batch 4b fixes, PR #8: with only
// SMP in bold it read as if SMP were the main service), a short rule, the one
// line, then the web address and the phone number. The real studio photograph
// (mhts-studio-wide-hero) fills the right, fading into the ink on its left.
//
// Rendered in Chromium (Playwright) with DM Sans, the site's own font, which
// the script downloads from Google Fonts and embeds, so the page has no
// requests of its own. Needs network access for that one download.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = new URL("..", import.meta.url);
const out = process.argv[2] ?? fileURLToPath(new URL("public/og-image.jpg", root));

const dataUri = (path, type) => `data:${type};base64,${readFileSync(new URL(path, root)).toString("base64")}`;

/** DM Sans, the latin subset of the variable font (every weight in one file). */
const dmSans = async () => {
  const css = await (
    await fetch("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300..700", {
      // Google serves woff2 only to a browser it recognises.
      headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" },
    })
  ).text();
  const latin = css.split("@font-face").find((block) => block.includes("U+0000-00FF"));
  const url = latin?.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error("Could not find DM Sans on Google Fonts");
  const font = Buffer.from(await (await fetch(url)).arrayBuffer());
  return `data:font/woff2;base64,${font.toString("base64")}`;
};

const html = (font) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: "DM Sans"; font-weight: 100 1000; src: url(${font}) format("woff2"); }
  * { margin: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { position: relative; background: #212327; font-family: "DM Sans", sans-serif; color: #fff; -webkit-font-smoothing: antialiased; }
  .photo { position: absolute; top: 0; right: 0; width: 535px; height: 630px; overflow: hidden; }
  .photo img { position: absolute; top: 0; left: -326px; height: 630px; width: 1120px; }
  .photo::after { content: ""; position: absolute; inset: 0;
    background: linear-gradient(90deg, #212327 0%, rgba(33,35,39,0.82) 14%, rgba(33,35,39,0.45) 32%, rgba(33,35,39,0.12) 52%, rgba(33,35,39,0) 70%); }
  .text { position: absolute; left: 56px; top: 62px; width: 600px; }
  .chip { display: inline-block; background: #fff; border-radius: 4px; padding: 6px 9px; }
  .chip img { display: block; height: 79px; width: auto; }
  .eyebrow { margin-top: 46px; font-size: 18px; font-weight: 400; letter-spacing: 0.29em; text-transform: uppercase; color: #a3a4a8; }
  h1 { margin-top: 15px; font-size: 62px; line-height: 64px; font-weight: 300; letter-spacing: -0.005em; color: #fff; }
  .rule { margin-top: 26px; width: 64px; height: 2px; background: #747579; }
  .line { margin-top: 23px; font-size: 23.2px; line-height: 34px; font-weight: 400; color: #c9cacd; }
  .contact { position: absolute; left: 56px; top: 540px; font-size: 20px; color: #a3a4a8; }
  .contact .dot { margin: 0 14px; color: #6d6e72; }
</style></head><body>
  <div class="photo"><img src="${dataUri("src/assets/mhts-studio-wide-hero.jpg", "image/jpeg")}" alt=""></div>
  <div class="text">
    <div class="chip"><img src="${dataUri("src/assets/mhts-logo-full.jpeg", "image/jpeg")}" alt=""></div>
    <p class="eyebrow">Amersham, Buckinghamshire</p>
    <h1>Hair Systems<br>&amp; SMP</h1>
    <div class="rule"></div>
    <p class="line">Premium non-surgical hair replacement,<br>delivered with discretion.</p>
  </div>
  <p class="contact">menshairtostay.co.uk<span class="dot">·</span>07947 878087</p>
</body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(html(await dmSans()), { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  const weights = await page.evaluate(() => document.fonts.check('300 58px "DM Sans"'));
  if (!weights) throw new Error("DM Sans did not load");
  await page.screenshot({ path: out, type: "jpeg", quality: 88 });
  console.log(`Wrote ${out}`);
} finally {
  await browser.close();
}
