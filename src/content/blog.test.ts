// Sanity checks on the markdown blog layer. Field-level validation happens at
// build time in vite/blog-markdown.ts; these catch problems across posts.
import { describe, expect, test } from "vitest";
import { blogPosts } from "@/data/blogPosts";
import { LEGACY_ORDER } from "@/content/legacy-order";

describe("blog posts", () => {
  test("posts load", () => expect(blogPosts.length).toBeGreaterThanOrEqual(LEGACY_ORDER.length));

  test("slugs are unique", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("every legacy post still exists", () => {
    const slugs = new Set(blogPosts.map((p) => p.slug));
    expect(LEGACY_ORDER.filter((s) => !slugs.has(s))).toEqual([]);
  });

  test.each(blogPosts.map((p) => [p.slug, p]))("%s has a date, hero image and FAQs", (_, p) => {
    expect(p.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(p.image).toBeTruthy();
    expect(p.faqs?.length ?? 0).toBeGreaterThan(0);
    expect(p.content.trim().length).toBeGreaterThan(0);
  });
});
