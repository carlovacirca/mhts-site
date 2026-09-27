// One date gate for the whole site.
//
// Before this module, only the /blog listing hid future-dated posts. The
// homepage strip, the related posts under each article, the Blog JSON-LD on
// /blog and the post's own URL all showed them early. See docs/HEALTH-CHECK.md
// finding 8.
//
// A post becomes visible at 00:00 Europe/London on its publishDate, not at
// midnight in the visitor's own timezone. Someone reading from New York must
// not see Monday's post on Sunday evening, and someone in Sydney must not see
// it a day early either.
import type { BlogPost } from "@/data/blogPosts";

export const SITE_TIMEZONE = "Europe/London";

/**
 * Today's date in UK local time, as YYYY-MM-DD.
 *
 * Comparing two YYYY-MM-DD strings avoids all offset arithmetic: BST and GMT
 * are already handled by the formatter, so there is no hour to add or subtract
 * and no daylight-saving edge case to get wrong.
 */
export const siteToday = (now: Date = new Date()): string => {
  try {
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: SITE_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(now);
    const get = (t: string) => parts.find((p) => p.type === t)?.value;
    const y = get("year");
    const m = get("month");
    const d = get("day");
    if (y && m && d) return `${y}-${m}-${d}`;
  } catch {
    // Falls through to UTC below.
  }
  // Only reached if the runtime has no timezone data. UTC is never more than
  // one hour from UK time, so the worst case is a post appearing up to an hour
  // late, which is safer than showing it early.
  return now.toISOString().slice(0, 10);
};

/** Has this post's publish date arrived in UK time? */
export const isPublished = (isoDate: string, now: Date = new Date()): boolean =>
  isoDate.slice(0, 10) <= siteToday(now);

export interface VisibilityOptions {
  /** Show scheduled posts anyway. Drives the ?preview=1 escape hatch. */
  preview?: boolean;
  now?: Date;
}

/** Every post that is live right now, in the order it was given. */
export const visiblePosts = (
  posts: BlogPost[],
  { preview = false, now }: VisibilityOptions = {}
): BlogPost[] => (preview ? posts : posts.filter((p) => isPublished(p.date, now)));

/** The n most recent live posts, newest first. Drives the homepage strip. */
export const latestPosts = (
  posts: BlogPost[],
  count: number,
  opts: VisibilityOptions = {}
): BlogPost[] =>
  [...visiblePosts(posts, opts)].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);

/**
 * Up to `count` live posts to show under an article: same category first, then
 * any other live post to fill the row. Never includes the article itself.
 */
export const relatedPosts = (
  posts: BlogPost[],
  current: BlogPost,
  count = 3,
  opts: VisibilityOptions = {}
): BlogPost[] => {
  const pool = visiblePosts(posts, opts).filter((p) => p.slug !== current.slug);
  const sameCategory = pool.filter((p) => p.category === current.category).slice(0, count);
  if (sameCategory.length >= count) return sameCategory;
  const rest = pool.filter((p) => !sameCategory.includes(p));
  return [...sameCategory, ...rest].slice(0, count);
};

/**
 * Hosts where the ?preview=1 escape hatch is allowed: Cloudflare Pages preview
 * deployments and local development.
 *
 * Deliberately excludes the live domain. Otherwise anyone who knew to add
 * ?preview=1 could read a post days before it is meant to go out, and could
 * share that URL, which defeats the whole date gate.
 */
export const isPreviewHost = (hostname: string): boolean =>
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "[::1]" ||
  hostname === "::1" ||
  hostname.endsWith(".pages.dev");

/**
 * Is the ?preview=1 escape hatch on for this request?
 *
 * Needs both the query string and an allowed host. On menshairtostay.co.uk and
 * www.menshairtostay.co.uk it always returns false, whatever the URL says.
 */
export const isPreviewRequest = (
  loc: { hostname: string; search: string } | undefined = typeof window === "undefined"
    ? undefined
    : window.location
): boolean => {
  if (!loc) return false;
  if (!isPreviewHost(loc.hostname)) return false;
  return new URLSearchParams(loc.search).get("preview") === "1";
};
