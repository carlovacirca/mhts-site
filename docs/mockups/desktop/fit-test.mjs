import { chromium } from "/home/user/mhts-site/node_modules/playwright/index.mjs";
import { readFileSync, mkdirSync } from "node:fs";
const OUT = process.argv[2], SHOTS = process.argv[3];
const FONT = "/tmp/claude-0/-home-user/6c429986-fd3b-5365-bc48-91c461a94f01/scratchpad/fontpkg/node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2";
mkdirSync(SHOTS, { recursive: true });
const vps = [[1920,960,"desktop 1080p"],[1536,730,"laptop 1536x864"],[1440,790,"MacBook Air"],[1366,650,"laptop 1366x768"],[1280,600,"laptop 1280x720"],[1366,930,"iPad Pro landscape"],[1180,760,"iPad Air landscape"],[1024,700,"iPad landscape"],[1024,1270,"iPad Pro portrait"],[820,1100,"iPad Air portrait"],[768,950,"iPad portrait"]];
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
let bad = 0;
for (const page of ["index.html", "hair-systems.html"]) for (const [w, h, name] of vps) {
  const ctx = await b.newContext({ viewport: { width: w, height: h } });
  const p = await ctx.newPage();
  await p.route("https://fonts.googleapis.com/**", (r) => r.fulfill({ contentType: "text/css", body: "@font-face{font-family:'DM Sans';font-style:normal;font-weight:100 1000;src:url(https://fonts.gstatic.com/dm.woff2) format('woff2')}" }));
  await p.route("https://fonts.gstatic.com/**", (r) => r.fulfill({ contentType: "font/woff2", body: readFileSync(FONT) }));
  await p.goto("file://" + OUT + "/" + page);
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(async () => { for (const i of document.images) { i.loading = "eager"; } await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))); });
  const res = await p.evaluate(() => {
    const out = []; const vw = innerWidth;
    const hdr = document.querySelector(".hdr").getBoundingClientRect().height;
    if (document.documentElement.scrollWidth > vw) out.push("horizontal overflow " + document.documentElement.scrollWidth);
    document.querySelectorAll(".scr").forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const want = Math.max(520, innerHeight - hdr);
      if (Math.abs(r.height - want) > 1) out.push(`S${i+1} height ${Math.round(r.height)} != ${want}`);
      for (const e of s.querySelectorAll("*")) {
        const cs = getComputedStyle(e); if (cs.display === "none" || cs.visibility === "hidden" || e.closest("svg") || e.closest(".mock-badge")) continue;
        if (e.tagName === "IMG") continue;
        const er = e.getBoundingClientRect(); if (!er.width || !er.height) continue;
        if (er.bottom > r.bottom + 1 || er.top < r.top - 1) { out.push(`S${i+1} ${e.tagName}.${e.className} out of section by ${Math.round(Math.max(er.bottom - r.bottom, r.top - er.top))}px`); break; }
        if (er.right > vw + 1) { out.push(`S${i+1} ${e.tagName}.${e.className} past right edge`); break; }
        if (["DIV","ARTICLE","UL","OL","LI","FIGURE","FOOTER","DETAILS","SECTION"].includes(e.tagName) || e.matches("a.card,a.post,a.tcard")) {
          if (e.clientHeight > 0 && e.scrollHeight > e.clientHeight + 8) { out.push(`S${i+1} ${e.tagName}.${e.className} content taller than box by ${e.scrollHeight - e.clientHeight}px`); break; }
        }
        // small media check
      }
      s.querySelectorAll(".media,.ph,.pair,.tcard,.hero-media,.mapsign").forEach((m) => { const mr = m.getBoundingClientRect(); if (getComputedStyle(m).display !== "none" && mr.height < 110) out.push(`S${i+1} ${m.className} media only ${Math.round(mr.height)}px tall`); });
    });
    return out;
  });
  const tag = `${page.replace(".html","")}-${w}x${h}`;
  if (res.length) { bad += res.length; console.log("FAIL", tag, name, "\n  " + [...new Set(res)].join("\n  ")); } else console.log("ok  ", tag, name);
  await p.addStyleTag({ content: "html.snap{scroll-snap-type:none!important}" });
  await p.screenshot({ path: `${SHOTS}/${tag}.jpg`, fullPage: true, type: "jpeg", quality: 70 });
  await ctx.close();
}
await b.close();
console.log("issues", bad);
