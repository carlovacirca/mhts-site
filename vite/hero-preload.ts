// Vite plugin: injects a <link rel="preload"> for the homepage hero image.
//
// The hero is the LCP element on the homepage. In a single page app the browser
// cannot discover it from the HTML at all, because the <img> only exists once
// React has mounted. On the live site that showed up as 2.4s of "load delay"
// inside a 6.9s LCP. See docs/HEALTH-CHECK.md finding 5.
//
// Writing the preload by hand in index.html does not work: Vite copies the
// asset and leaves the imagetools query string on the URL, so the browser would
// fetch a different file from the one the <img> srcset asks for and the preload
// would be wasted. This plugin instead reads the real emitted WebP variants out
// of the bundle and builds an imagesrcset that matches the <img> exactly.
import type { IndexHtmlTransformResult, Plugin } from "vite";

const HERO_BASENAME = "mhts-hero";

/** Width in pixels from a WebP header, or 0 if it is not a shape we know. */
const webpWidth = (buf: Buffer): number => {
  if (buf.length < 30) return 0;
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return 0;
  const chunk = buf.toString("ascii", 12, 16);
  if (chunk === "VP8 ") {
    // Lossy. 14-bit width just after the 3 byte sync code.
    return buf.readUInt16LE(26) & 0x3fff;
  }
  if (chunk === "VP8L") {
    // Lossless. width - 1 is the low 14 bits of a 32 bit little endian field.
    return (buf.readUInt32LE(21) & 0x3fff) + 1;
  }
  if (chunk === "VP8X") {
    // Extended. Canvas width - 1 as 24 bit little endian.
    return (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1;
  }
  return 0;
};

export default function heroPreload(): Plugin {
  return {
    name: "mhts-hero-preload",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, ctx): IndexHtmlTransformResult {
        const bundle = ctx.bundle;
        if (!bundle) return [];

        const variants: { url: string; width: number }[] = [];
        for (const [fileName, output] of Object.entries(bundle)) {
          if (output.type !== "asset") continue;
          if (!fileName.endsWith(".webp")) continue;
          if (!fileName.split("/").pop()?.startsWith(HERO_BASENAME + "-")) continue;
          const source = output.source;
          const buf = Buffer.isBuffer(source)
            ? source
            : typeof source === "string"
              ? Buffer.from(source)
              : Buffer.from(source);
          const width = webpWidth(buf);
          if (width > 0) variants.push({ url: "/" + fileName, width });
        }

        if (variants.length === 0) {
          // Never fail the build over a preload. Worst case we lose the hint.
          this.warn(`hero preload: no ${HERO_BASENAME}-*.webp variants found in the bundle`);
          return [];
        }

        variants.sort((a, b) => a.width - b.width);
        const imagesrcset = variants.map((v) => `${v.url} ${v.width}w`).join(", ");

        return [
          {
            tag: "link",
            attrs: {
              rel: "preload",
              as: "image",
              type: "image/webp",
              imagesrcset,
              // Matches sizes="100vw" on the hero <img>, so the browser picks the
              // same variant here as it does there and the preload is always used.
              imagesizes: "100vw",
              fetchpriority: "high",
            },
            injectTo: "head",
          },
        ];
      },
    },
  };
}
