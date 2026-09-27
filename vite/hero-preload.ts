// Vite plugin: preloads the homepage hero image, on the homepage only.
//
// The hero is the LCP element on the homepage. In a single page app the browser
// cannot discover it from the HTML at all, because the <img> only exists once
// React has mounted. See docs/HEALTH-CHECK.md finding 5.
//
// Two approaches were tried and rejected:
//
//  1. A hand written <link rel="preload"> in index.html. Vite copies the asset
//     and leaves the imagetools query string on the URL, so the browser fetches
//     a different file from the one the <img> srcset asks for. Wasted download,
//     no benefit.
//  2. Injecting the <link> into index.html from this plugin with the real
//     variants. That works, but index.html is shared by every route in a single
//     page app, so /blog and every post also fetched the homepage hero: measured
//     at 47 KB downloaded at high priority on a page that never displays it,
//     competing with that page's own LCP image.
//
// So the preload is emitted as a path scoped `Link:` header for `/` only, which
// Cloudflare Pages reads from _headers. Nothing else on the site pays for it.
// If a browser does not understand imagesrcset in a Link header it falls back to
// the URL in angle brackets, which is the 800w variant a phone would pick anyway.
import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

const HERO_BASENAME = "mhts-hero";
/** The variant a phone picks at sizes="100vw". Used as the Link header fallback. */
const FALLBACK_WIDTH = 800;

/** Width in pixels from a WebP header, or 0 if it is not a shape we know. */
const webpWidth = (buf: Buffer): number => {
  if (buf.length < 30) return 0;
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return 0;
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8 ") return buf.readUInt16LE(26) & 0x3fff;
  if (chunk === "VP8L") return (buf.readUInt32LE(21) & 0x3fff) + 1;
  if (chunk === "VP8X") return (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1;
  return 0;
};

export default function heroPreload(): Plugin {
  let variants: { url: string; width: number }[] = [];
  let outDir = "dist";

  return {
    name: "mhts-hero-preload",
    apply: "build",

    configResolved(config) {
      outDir = config.build.outDir;
    },

    // The bundle is only available here, so collect the variants now and write
    // them in closeBundle, which runs after the public folder has been copied.
    generateBundle(_options, bundle) {
      variants = [];
      for (const [fileName, output] of Object.entries(bundle)) {
        if (output.type !== "asset") continue;
        if (!fileName.endsWith(".webp")) continue;
        if (!fileName.split("/").pop()?.startsWith(HERO_BASENAME + "-")) continue;
        const src = output.source;
        const buf = Buffer.isBuffer(src) ? src : Buffer.from(src as string | Uint8Array);
        const width = webpWidth(buf);
        if (width > 0) variants.push({ url: "/" + fileName, width });
      }
      variants.sort((a, b) => a.width - b.width);
    },

    closeBundle() {
      // Never fail the build over a preload hint.
      if (variants.length === 0) {
        this.warn(`hero preload: no ${HERO_BASENAME}-*.webp variants found, skipping`);
        return;
      }
      const headersPath = path.resolve(outDir, "_headers");
      if (!fs.existsSync(headersPath)) {
        this.warn(`hero preload: ${headersPath} not found, skipping`);
        return;
      }

      const imagesrcset = variants.map((v) => `${v.url} ${v.width}w`).join(", ");
      const base = (variants.find((v) => v.width === FALLBACK_WIDTH) ?? variants[variants.length - 1]).url;
      // imagesrcset is quoted because its value contains commas, which would
      // otherwise be read as separators between several Link values.
      const link =
        `<${base}>; rel=preload; as=image; type=image/webp; fetchpriority=high; ` +
        `imagesrcset="${imagesrcset}"; imagesizes="100vw"`;

      const block = [
        "",
        "# Added at build time by vite/hero-preload.ts. Homepage only, because",
        "# index.html is shared by every route and preloading this everywhere cost",
        "# 47 KB at high priority on pages that never show it.",
        "/",
        `  Link: ${link}`,
        "",
      ].join("\n");

      const existing = fs.readFileSync(headersPath, "utf8");
      fs.writeFileSync(headersPath, existing.replace(/\s*$/, "\n") + block);
    },
  };
}
