// The pre-render is only safe because it is complete.
//
// Once dist/404.html exists, Cloudflare Pages stops serving index.html for
// unknown paths, so any real page the build forgot to render stops being a page
// at all and starts returning a 404. These tests are the guard rail: they fail
// the build if a route in App.tsx, or a URL in the sitemap, would not get a file.
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  parseAppRoutes,
  enumerateRoutes,
  outputFileFor,
  sitemapPaths,
  areaSlugs,
  blogSlugs,
} from "../../scripts/routes.mjs";

const ROOT = join(__dirname, "../..");

describe("route enumeration", () => {
  it("reads every <Route> in App.tsx", () => {
    const { statics, dynamics, aliases, catchAll, total } = parseAppRoutes(ROOT);
    // +1 for the pathless <Route element={<Layout />}> wrapper.
    expect(statics.length + dynamics.length + aliases.length + 1 + 1).toBe(total);
    expect(catchAll).toBe(true);
  });

  it("expands every dynamic route pattern", () => {
    // enumerateRoutes throws on a :param route with no expander, which is what
    // stops a new dynamic section shipping as a site-wide 404.
    expect(() => enumerateRoutes(ROOT)).not.toThrow();
    const paths = enumerateRoutes(ROOT).map((r) => r.path);
    expect(paths.filter((p) => p.includes(":"))).toEqual([]);
    for (const slug of areaSlugs(ROOT)) expect(paths).toContain(`/areas/${slug}`);
    for (const slug of blogSlugs(ROOT)) expect(paths).toContain(`/blog/${slug}`);
  });

  it("covers every URL in public/sitemap.xml", () => {
    const paths = new Set(enumerateRoutes(ROOT).map((r) => r.path));
    const missing = sitemapPaths(ROOT).filter((p) => !paths.has(p));
    expect(missing).toEqual([]);
  });

  it("renders the client-side redirect aliases too", () => {
    // These URLs are not in the sitemap and are not pages, but they are old
    // addresses that still get traffic. Without a file they would now 404
    // instead of bouncing the reader to the current page.
    const aliases = enumerateRoutes(ROOT).filter((r) => r.kind === "alias");
    expect(aliases.length).toBeGreaterThan(0);
    for (const a of aliases) expect(a.to).toMatch(/^\//);
  });
});

describe("output file layout", () => {
  // Cloudflare Pages serves dist/foo.html at /foo with no redirect, but serves
  // dist/foo/index.html at /foo/ and redirects /foo to it. Every URL on this
  // site is extensionless with no trailing slash, so writing index.html files
  // would add a redirect to all 60 of them.
  it("writes <route>.html, never <route>/index.html", () => {
    for (const { path } of enumerateRoutes(ROOT)) {
      const file = outputFileFor(path);
      if (path === "/") expect(file).toBe("index.html");
      else expect(file).toBe(`${path.slice(1)}.html`);
      expect(file.endsWith("/index.html")).toBe(false);
    }
  });

  it("keeps the sitemap free of trailing slashes and .html", () => {
    for (const path of sitemapPaths(ROOT)) {
      expect(path === "/" || !path.endsWith("/")).toBe(true);
      expect(path.endsWith(".html")).toBe(false);
    }
  });
});

describe("no SPA fallback is left in _redirects", () => {
  it("has no catch-all rewrite that would hide the 404", () => {
    const redirects = readFileSync(join(ROOT, "public/_redirects"), "utf8");
    const rules = redirects
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
    for (const rule of rules) {
      expect(rule.startsWith("/*")).toBe(false);
    }
  });
});
