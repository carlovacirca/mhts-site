// Finding 8: a post dated in the future must not be visible anywhere until
// 00:00 Europe/London on its publishDate.
//
// Every surface on the site goes through one of the helpers below, so testing
// them covers the /blog listing, the /blog Blog JSON-LD, the homepage
// latest-posts strip, the related posts under an article, and the post's own
// URL (which passes isPublished straight into its 404 guard).
import { describe, expect, test } from "vitest";
import { blogPosts, type BlogPost } from "@/data/blogPosts";
import {
  isPreviewHost,
  isPreviewRequest,
  isPublished,
  latestPosts,
  relatedPosts,
  siteToday,
  visiblePosts,
} from "@/lib/publishing";

// Midday UTC on a fixed day, so "today" is unambiguous in UK time.
const NOW = new Date("2026-06-15T12:00:00Z");
const TODAY = "2026-06-15";
const TOMORROW = "2026-06-16";
const YESTERDAY = "2026-06-14";

const post = (slug: string, date: string, category = "Hair Systems"): BlogPost => ({
  slug,
  title: `Post ${slug}`,
  category,
  excerpt: "",
  metaDescription: "",
  readTime: "5 min read",
  date,
  featuredImageAlt: "",
  content: "",
});

const TODAY_POST = post("today-post", TODAY);
const TOMORROW_POST = post("tomorrow-post", TOMORROW);
const OLD_POST = post("old-post", YESTERDAY);
const OTHER_CATEGORY = post("other-cat", YESTERDAY, "Expert Tips");
const ALL = [OLD_POST, TODAY_POST, TOMORROW_POST, OTHER_CATEGORY];

const slugs = (posts: BlogPost[]) => posts.map((p) => p.slug);

describe("isPublished", () => {
  test("a post dated today is published", () => {
    expect(isPublished(TODAY, NOW)).toBe(true);
  });

  test("a post dated tomorrow is not published", () => {
    expect(isPublished(TOMORROW, NOW)).toBe(false);
  });

  test("a post dated yesterday is published", () => {
    expect(isPublished(YESTERDAY, NOW)).toBe(true);
  });
});

describe("the gate uses UK time, not the visitor's timezone", () => {
  test("siteToday follows Europe/London", () => {
    // 23:30 UTC on 15 June is 00:30 on 16 June in British Summer Time.
    expect(siteToday(new Date("2026-06-15T23:30:00Z"))).toBe("2026-06-16");
    // In winter, UK time is UTC, so the same clock time is still the 15th.
    expect(siteToday(new Date("2026-01-15T23:30:00Z"))).toBe("2026-01-15");
  });

  test("a post goes live at 00:00 UK time, not a moment before", () => {
    // 22:59 UTC on 15 June is 23:59 UK time. Still the 15th.
    expect(isPublished(TOMORROW, new Date("2026-06-15T22:59:00Z"))).toBe(false);
    // 23:00 UTC on 15 June is 00:00 UK time on the 16th.
    expect(isPublished(TOMORROW, new Date("2026-06-15T23:00:00Z"))).toBe(true);
  });

  test("a reader in Sydney does not get the post a day early", () => {
    // 14:00 UTC on 15 June is midnight on the 16th in Sydney, but it is still
    // the 15th in the UK, so the post stays hidden.
    expect(isPublished(TOMORROW, new Date("2026-06-15T14:00:00Z"))).toBe(false);
  });
});

describe("visiblePosts, which drives /blog and the /blog Blog JSON-LD", () => {
  test("hides tomorrow's post and shows today's", () => {
    const out = slugs(visiblePosts(ALL, { now: NOW }));
    expect(out).toContain("today-post");
    expect(out).not.toContain("tomorrow-post");
  });

  test("?preview=1 still shows scheduled posts", () => {
    expect(slugs(visiblePosts(ALL, { now: NOW, preview: true }))).toContain("tomorrow-post");
  });
});

describe("latestPosts, which drives the homepage strip", () => {
  test("hides tomorrow's post even though it is the newest", () => {
    const out = slugs(latestPosts(ALL, 3, { now: NOW }));
    expect(out).not.toContain("tomorrow-post");
    expect(out[0]).toBe("today-post");
  });

  test("still fills the strip from the live posts", () => {
    expect(latestPosts(ALL, 3, { now: NOW })).toHaveLength(3);
  });
});

describe("relatedPosts, which drives the list under each article", () => {
  test("hides tomorrow's post in the same category", () => {
    const out = slugs(relatedPosts(ALL, OLD_POST, 3, { now: NOW }));
    expect(out).toContain("today-post");
    expect(out).not.toContain("tomorrow-post");
  });

  test("never includes the article you are reading", () => {
    expect(slugs(relatedPosts(ALL, TODAY_POST, 3, { now: NOW }))).not.toContain("today-post");
  });

  test("falls back to other categories to fill the row, live posts only", () => {
    const out = slugs(relatedPosts(ALL, OLD_POST, 3, { now: NOW }));
    expect(out).toContain("other-cat");
    expect(out).not.toContain("tomorrow-post");
  });
});

describe("the post's own URL guard", () => {
  // BlogPostPage computes: match && (preview || isPublished(match.date)).
  // When that is false it renders <NotFound />, which carries noindex.
  const resolve = (p: BlogPost, preview = false) =>
    preview || isPublished(p.date, NOW) ? p : undefined;

  test("a post dated tomorrow resolves to nothing, so the URL 404s", () => {
    expect(resolve(TOMORROW_POST)).toBeUndefined();
  });

  test("a post dated today resolves, so the URL renders", () => {
    expect(resolve(TODAY_POST)).toBe(TODAY_POST);
  });

  test("?preview=1 opens a scheduled post, which the PR approval step needs", () => {
    expect(resolve(TOMORROW_POST, true)).toBe(TOMORROW_POST);
  });
});

describe("?preview=1 is limited to preview hosts", () => {
  const at = (hostname: string, search = "?preview=1") => isPreviewRequest({ hostname, search });

  test("does nothing on the live domain", () => {
    expect(at("menshairtostay.co.uk")).toBe(false);
  });

  test("does nothing on www", () => {
    expect(at("www.menshairtostay.co.uk")).toBe(false);
  });

  test("works on a Cloudflare Pages preview deployment", () => {
    expect(at("pr-3.menshairtostay.pages.dev")).toBe(true);
    expect(at("menshairtostay.pages.dev")).toBe(true);
  });

  test("works on localhost and 127.0.0.1", () => {
    expect(at("localhost")).toBe(true);
    expect(at("127.0.0.1")).toBe(true);
  });

  test("a lookalike domain is not a preview host", () => {
    // Must be a real *.pages.dev subdomain, not a name that merely ends that way.
    expect(isPreviewHost("evilpages.dev")).toBe(false);
    expect(isPreviewHost("menshairtostay.co.uk.attacker.com")).toBe(false);
    expect(isPreviewHost("notpages.dev")).toBe(false);
    expect(isPreviewHost("pages.dev.attacker.com")).toBe(false);
  });

  test("an allowed host without the query string is still not preview mode", () => {
    expect(at("pr-3.menshairtostay.pages.dev", "")).toBe(false);
    expect(at("pr-3.menshairtostay.pages.dev", "?preview=0")).toBe(false);
    expect(at("localhost", "?preview=yes")).toBe(false);
  });

  test("a scheduled post stays hidden on the live domain even with ?preview=1", () => {
    const preview = isPreviewRequest({ hostname: "menshairtostay.co.uk", search: "?preview=1" });
    const out = slugs(visiblePosts(ALL, { now: NOW, preview }));
    expect(out).not.toContain("tomorrow-post");
  });

  test("the same post is visible on a preview host with ?preview=1", () => {
    const preview = isPreviewRequest({
      hostname: "pr-3.menshairtostay.pages.dev",
      search: "?preview=1",
    });
    const out = slugs(visiblePosts(ALL, { now: NOW, preview }));
    expect(out).toContain("tomorrow-post");
  });
});

describe("against the real posts on this site", () => {
  const scheduled = "smp-for-hair-transplant-scars"; // publishDate 2026-09-28
  const real = blogPosts.find((p) => p.slug === scheduled);

  test("the scheduled post exists in the content folder", () => {
    expect(real).toBeDefined();
  });

  test("it is hidden the day before its date", () => {
    const dayBefore = new Date(`${real!.date}T00:00:00Z`);
    dayBefore.setUTCDate(dayBefore.getUTCDate() - 1);
    dayBefore.setUTCHours(12);
    expect(slugs(visiblePosts(blogPosts, { now: dayBefore }))).not.toContain(scheduled);
    expect(slugs(latestPosts(blogPosts, 3, { now: dayBefore }))).not.toContain(scheduled);
  });

  test("it appears on its own date", () => {
    const onTheDay = new Date(`${real!.date}T12:00:00Z`);
    expect(slugs(visiblePosts(blogPosts, { now: onTheDay }))).toContain(scheduled);
  });

  test("no post is ever shown before its date", () => {
    const now = new Date();
    for (const p of visiblePosts(blogPosts, { now })) {
      expect(p.date.slice(0, 10) <= siteToday(now)).toBe(true);
    }
  });
});
