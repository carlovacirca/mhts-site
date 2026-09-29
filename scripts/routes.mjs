// Every URL this site has, derived from the app itself rather than from a
// hand-written list that would go stale.
//
// Three sources, no fourth:
//   1. src/App.tsx            every <Route path="...">
//   2. src/data/areas.ts      the slugs behind /areas/:slug
//   3. src/content/blog/*.md  the slugs behind /blog/:slug
//
// Deliberately NOT public/sitemap.xml. The blog automation merges a post and
// only then, in a second commit, adds it to the sitemap, so a sitemap-driven
// pre-render would miss every new post on the build that publishes it. The
// sitemap is used the other way round: scripts/prerender.mjs fails the build
// if any sitemap URL did not produce a file.
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/** Expanders for the dynamic route patterns in App.tsx. */
const DYNAMIC = {
  "/areas/:slug": (root) => areaSlugs(root).map((s) => `/areas/${s}`),
  "/blog/:slug": (root) => blogSlugs(root).map((s) => `/blog/${s}`),
};

export function areaSlugs(root) {
  const src = readFileSync(join(root, "src/data/areas.ts"), "utf8");
  const slugs = [...src.matchAll(/^ {4}slug:\s*"([^"]+)"/gm)].map((m) => m[1]);
  if (!slugs.length) throw new Error("No area slugs found in src/data/areas.ts");
  return slugs;
}

/** Every markdown post, draft or not, published or not. The renderer decides. */
export function blogSlugs(root) {
  const dir = join(root, "src/content/blog");
  const slugs = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
  if (!slugs.length) throw new Error("No markdown posts found in src/content/blog");
  return slugs;
}

/**
 * The <Route> table in App.tsx.
 *
 * Returns { statics, dynamics, aliases, catchAll, total }. `total` counts every
 * <Route ...> element in the file so a route this parser failed to read shows
 * up as a mismatch instead of silently going un-pre-rendered.
 */
export function parseAppRoutes(root) {
  const src = readFileSync(join(root, "src/App.tsx"), "utf8");
  const total = (src.match(/<Route\b/g) || []).length;
  const statics = [];
  const dynamics = [];
  const aliases = [];
  let catchAll = false;

  for (const line of src.split("\n")) {
    if (!/<Route\b/.test(line)) continue;
    const pathMatch = line.match(/<Route\s+path="([^"]+)"/);
    if (!pathMatch) continue; // the pathless <Route element={<Layout />}>
    const path = pathMatch[1];
    if (path === "*") {
      catchAll = true;
      continue;
    }
    const navigate = line.match(/<Navigate\s+to="([^"]+)"/);
    if (navigate) aliases.push({ path, to: navigate[1] });
    else if (path.includes(":")) dynamics.push(path);
    else statics.push(path);
  }
  return { statics, dynamics, aliases, catchAll, total };
}

/**
 * Every URL to render, in a stable order.
 *
 * kind: "page" a route of its own
 *       "alias" a URL that redirects to another route in the browser. It is
 *               rendered so the old address keeps working; without a file it
 *               would now hit the real 404.
 */
export function enumerateRoutes(root) {
  const { statics, dynamics, aliases, catchAll, total } = parseAppRoutes(root);

  const unknown = dynamics.filter((d) => !DYNAMIC[d]);
  if (unknown.length) {
    throw new Error(
      `App.tsx has dynamic route(s) with no expander in scripts/routes.mjs: ${unknown.join(", ")}.\n` +
        "Add one there, otherwise those URLs would ship as a 404."
    );
  }
  if (!catchAll) throw new Error('App.tsx has no <Route path="*"> to render the 404 page from');

  const parsed = statics.length + dynamics.length + aliases.length + 1; // +1 catch-all
  if (parsed + 1 !== total) {
    // +1 for the pathless <Route element={<Layout />}> wrapper.
    throw new Error(
      `App.tsx has ${total} <Route> elements but ${parsed + 1} were understood. ` +
        "A route was added in a shape scripts/routes.mjs cannot read."
    );
  }

  const urls = [
    ...statics.map((path) => ({ path, kind: "page" })),
    ...dynamics.flatMap((d) => DYNAMIC[d](root).map((path) => ({ path, kind: "page" }))),
    ...aliases.map(({ path, to }) => ({ path, kind: "alias", to })),
  ];
  urls.sort((a, b) => a.path.localeCompare(b.path));
  return urls;
}

/** dist path for a URL. /foo.html, never /foo/index.html. See prerender.mjs. */
export function outputFileFor(routePath) {
  if (routePath === "/") return "index.html";
  return routePath.replace(/^\//, "") + ".html";
}

/** The URLs in public/sitemap.xml, as paths. */
export function sitemapPaths(root, site = "https://menshairtostay.co.uk") {
  const xml = readFileSync(join(root, "public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(site, "") || "/");
}
