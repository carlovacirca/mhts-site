// Finding 6: the site shipped 43 original JPEGs, about 17 MB, with no WebP and
// no srcset.
//
// The point of these tests is not that today's images are converted. It is that
// the conversion is driven by a folder glob, so a hero image committed to
// src/assets by the weekly blog automation gets the same treatment with no
// manual step. If someone later replaces the glob with a hand-maintained list,
// these fail.
import { describe, expect, test } from "vitest";
import { getPicture, pictureCount } from "@/lib/images";
import { blogPosts } from "@/data/blogPosts";

// Imported the ordinary way, exactly as a page component does.
import heroUrl from "@/assets/mhts-hero.jpg";
import logoUrl from "@/assets/mhts-logo-full.jpeg";
import biggestUrl from "@/assets/mhts-hair-system-base-materials-hero.jpg";

const ALL_ASSETS = import.meta.glob<string>("/src/assets/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

describe("the responsive image pipeline", () => {
  test("covers every image in src/assets, not a hand-picked list", () => {
    const paths = Object.keys(ALL_ASSETS);
    expect(paths.length).toBeGreaterThan(40);
    expect(pictureCount()).toBe(paths.length);

    const missing = Object.entries(ALL_ASSETS)
      .filter(([, url]) => !getPicture(url))
      .map(([path]) => path);
    expect(missing).toEqual([]);
  });

  test("a plain import resolves to its variants", () => {
    const pic = getPicture(heroUrl);
    expect(pic).toBeDefined();
    expect(pic!.width).toBeGreaterThan(0);
    expect(pic!.height).toBeGreaterThan(0);
  });

  test("every image offers WebP", () => {
    const withoutWebp = Object.values(ALL_ASSETS).filter((url) => !getPicture(url)?.sources.webp);
    expect(withoutWebp).toEqual([]);
  });

  test("every image offers a non-WebP fallback, so old browsers still work", () => {
    const withoutFallback = Object.values(ALL_ASSETS).filter((url) => {
      const formats = Object.keys(getPicture(url)?.sources ?? {});
      return !formats.some((f) => f !== "webp");
    });
    expect(withoutFallback).toEqual([]);
  });

  test("large images get several widths in the srcset", () => {
    for (const url of [heroUrl, biggestUrl]) {
      const widths = getPicture(url)!.sources.webp.split(",").length;
      expect(widths).toBeGreaterThanOrEqual(3);
    }
  });

  test("a small image is not upscaled past its own size", () => {
    // The logo is 1560px wide, so it must never be offered at 1600.
    const pic = getPicture(logoUrl)!;
    expect(pic.width).toBeLessThanOrEqual(1560);
    const widths = [...pic.sources.webp.matchAll(/(\d+)w/g)].map((m) => Number(m[1]));
    expect(Math.max(...widths)).toBeLessThanOrEqual(1560);
  });

  test("the srcset is a valid srcset: url then width descriptor", () => {
    const srcset = getPicture(heroUrl)!.sources.webp;
    for (const entry of srcset.split(",").map((s) => s.trim())) {
      expect(entry).toMatch(/^\S+ \d+w$/);
    }
  });

  test("every blog post hero resolves, including any added later", () => {
    const withHero = blogPosts.filter((p) => p.image);
    expect(withHero.length).toBeGreaterThan(0);
    const unresolved = withHero.filter((p) => !getPicture(p.image)).map((p) => p.slug);
    expect(unresolved).toEqual([]);
  });

  test("an unknown source returns nothing, so the component falls back to a plain img", () => {
    expect(getPicture("/not/an/asset.jpg")).toBeUndefined();
    expect(getPicture(undefined)).toBeUndefined();
  });
});
