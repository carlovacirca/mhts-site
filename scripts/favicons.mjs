// Builds the site icons in public/: favicon.ico, the PNG favicons, the Apple
// touch icon and the web app manifest icons.
//
//   node scripts/favicons.mjs [dm-sans.woff2]
//
// The old icons were a crop of the logo's head silhouette, which at tab size
// read as a dark smudge. The mark is now the brand's initials, MH over TS, in
// the logo red and white on the logo black. At 16px two lines of letters blur,
// so that size carries the M alone.
//
// Rendered in Chromium (Playwright) with DM Sans, the site's own font. Pass a
// local DM Sans woff2 to skip the Google Fonts download (as og-image.mjs does).

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = new URL("..", import.meta.url);
const pub = (name) => fileURLToPath(new URL(`public/${name}`, root));

const RED = "#DA261B";
const INK = "#141517";

const dmSans = async (localPath) => {
  if (localPath) return `data:font/woff2;base64,${readFileSync(localPath).toString("base64")}`;
  const css = await (
    await fetch("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300..1000", {
      headers: { "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36" },
    })
  ).text();
  const latin = css.split("@font-face").find((block) => block.includes("U+0000-00FF"));
  const url = latin?.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error("Could not find DM Sans on Google Fonts");
  return `data:font/woff2;base64,${Buffer.from(await (await fetch(url)).arrayBuffer()).toString("base64")}`;
};

// Drawn on a 512 square. `scale` shrinks the letters for the maskable icon,
// whose corners Android may crop to a circle (safe zone: the middle 80%).
const twoLine = (scale = 1) => `
  <div class="mark" style="transform: scale(${scale})">
    <span style="color:${RED}">MH</span><span style="color:#fff">TS</span>
  </div>`;
const oneLetter = `<div class="mark one"><span style="color:${RED}">M</span></div>`;

const page = (font, inner, size) => `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: "DM Sans"; font-weight: 100 1000; src: url(${font}) format("woff2"); }
  * { margin: 0; }
  html { zoom: ${size / 512}; }
  html, body { width: 512px; height: 512px; overflow: hidden; background: ${INK}; }
  body { display: flex; align-items: center; justify-content: center; font-family: "DM Sans", sans-serif; -webkit-font-smoothing: antialiased; }
  .mark { display: flex; flex-direction: column; align-items: center; font-weight: 800; font-size: 214px; line-height: 0.86; letter-spacing: -0.02em; }
  .mark.one { font-size: 400px; line-height: 1; padding-bottom: 24px; }
</style></head><body>${inner}</body></html>`;

/** A .ico holding PNG images (supported by every browser since IE Vista era). */
const ico = (pngs) => {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
};

const font = await dmSans(process.argv[2]);
const browser = await chromium.launch(process.env.PLAYWRIGHT_CHROMIUM ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM } : {});

const render = async (inner, size) => {
  const ctx = await browser.newContext({ viewport: { width: size, height: size } });
  const p = await ctx.newPage();
  await p.setContent(page(font, inner, size));
  await p.evaluate(() => document.fonts.ready);
  const data = await p.screenshot({ type: "png" });
  await ctx.close();
  return data;
};

const small = await render(oneLetter, 16);
const sizes = {};
for (const size of [32, 48, 180, 192, 512]) sizes[size] = await render(twoLine(), size);
const maskable = await render(twoLine(0.78), 512);
await browser.close();

writeFileSync(pub("favicon-16x16.png"), small);
writeFileSync(pub("favicon-32x32.png"), sizes[32]);
writeFileSync(pub("favicon-48x48.png"), sizes[48]);
writeFileSync(pub("apple-touch-icon.png"), sizes[180]);
writeFileSync(pub("icon-192.png"), sizes[192]);
writeFileSync(pub("icon-512.png"), sizes[512]);
writeFileSync(pub("icon-maskable-512.png"), maskable);
writeFileSync(pub("favicon.ico"), ico([
  { size: 16, data: small },
  { size: 32, data: sizes[32] },
  { size: 48, data: sizes[48] },
]));
console.log("Wrote favicon.ico, favicon-16/32/48, apple-touch-icon, icon-192, icon-512, icon-maskable-512");
