// Batch 4b fixes (Carlo's review of the 4b preview): the compact phone footer
// keeps every link, the section scroll now reaches every page on a phone with
// blog articles on proximity, and the phone /blog layout.
import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  SECTION_SNAP,
  SNAP_PROXIMITY_CLASS,
  SNAP_SITE_CLASS,
  snapProximityClass,
  snapSiteClass,
} from "@/lib/sectionSnap";
import Footer from "@/components/Footer";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import { blogPosts } from "@/data/blogPosts";
import { visiblePosts } from "@/lib/publishing";
import { treatments } from "@/data/treatments";

const css = readFileSync(join(__dirname, "..", "index.css"), "utf8");
const layoutSource = readFileSync(join(__dirname, "..", "components", "Layout.tsx"), "utf8");

const hrefs = (root: ParentNode) =>
  new Set(Array.from(root.querySelectorAll("a[href]")).map((a) => a.getAttribute("href")!));

/** The CSS inside the phone-only snap block. */
const phoneBlock = () => {
  const start = css.indexOf("@media (max-width: 767.98px) and (prefers-reduced-motion: no-preference)");
  expect(start).toBeGreaterThan(-1);
  return css.slice(start);
};

describe("footer, compact on a phone", () => {
  it("keeps every link it had: four treatments, the six Studio links, socials, map, phone, email, Book, Call, privacy", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const links = hrefs(container);
    for (const t of treatments) expect(links, t.slug).toContain(`/${t.slug}`);
    for (const to of ["/how-it-works", "/gallery", "/faq", "/areas-serviced", "/blog", "/services", "/book", "/privacy-policy"]) {
      expect(links, to).toContain(to);
    }
    expect(links).toContain("tel:+447947878087");
    expect(links).toContain("mailto:info@menshairtostay.co.uk");
    expect(Array.from(links).some((h) => h.includes("google.com/maps"))).toBe(true);
    for (const name of ["Instagram", "Facebook", "TikTok"]) {
      // Twice: beside "Visit us" on a phone, under the Studio links from md up.
      expect(screen.getAllByRole("link", { name: `Men's Hair To Stay on ${name}` }).length).toBeGreaterThan(0);
    }
  });

  it("puts the two link columns side by side on a phone, and Book and Call side by side", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const grid = container.querySelector("footer .grid")!;
    expect(grid.className).toMatch(/(^|\s)grid-cols-\[1\.3fr_1fr\](\s|$)/);
    const book = screen.getByRole("link", { name: /Book free consultation/ });
    expect(book.parentElement!.className).toMatch(/(^|\s)grid-cols-2(\s|$)/);
  });
});

describe("section scroll on every page on a phone", () => {
  it("is still one switch: the site, homepage and article classes all come from it", () => {
    expect(SECTION_SNAP).toBe(true);
    expect(snapSiteClass(true)).toBe(SNAP_SITE_CLASS);
    expect(snapSiteClass(false)).toBe("");
    expect(snapProximityClass(true)).toBe(SNAP_PROXIMITY_CLASS);
    expect(snapProximityClass(false)).toBe("");
    // Layout's <main> takes the class from the switch, not a literal.
    expect(layoutSource).toMatch(/<main className=\{`flex-1 \$\{snapSiteClass\(\)\}`\}>/);
  });

  it("snaps every page's sections below md only, y mandatory, sized to the screen", () => {
    const phone = phoneBlock();
    expect(phone).toMatch(/html:has\(\.mhts-snap-site\)\s*\{[^}]*scroll-snap-type:\s*y mandatory/);
    expect(phone).toMatch(/\.mhts-snap-site > :not\(\.mhts-snap-proximity\) > section:not\(\.hidden\)/);
    expect(phone).toMatch(/min-height:\s*var\(--snap-screen\)/);
    // The desktop block still only knows the homepage.
    const desktop = css.slice(css.indexOf("/* ── The homepage, every width ── */"), css.indexOf("/* ── Every page, phone only ── */"));
    expect(desktop).not.toMatch(/mhts-snap-site/);
  });

  it("uses proximity for blog articles, with stops only at the hero and each h2", () => {
    const phone = phoneBlock();
    expect(phone).toMatch(/html:has\(\.mhts-snap-site \.mhts-snap-proximity\)\s*\{[^}]*scroll-snap-type:\s*y proximity/);
    const post = visiblePosts(blogPosts)[0];
    const { container } = render(
      <MemoryRouter initialEntries={[`/blog/${post.slug}`]}>
        <Routes>
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </MemoryRouter>
    );
    const root = container.firstElementChild!;
    expect(root.className).toContain(SNAP_PROXIMITY_CLASS);
    const points = Array.from(container.querySelectorAll(".mhts-snap-point, .mhts-snap-point-top"));
    const h2s = Array.from(container.querySelectorAll("article h2[id]")).filter((h) => h.id !== "sources");
    expect(points.length).toBe(h2s.length + 1);
    for (const p of points) expect(["H2", "SECTION"]).toContain(p.tagName);
  });
});

describe("/blog on a phone", () => {
  beforeEach(() => window.localStorage.clear());

  const live = [...visiblePosts(blogPosts)].sort((a, b) => b.date.localeCompare(a.date));
  const renderBlog = () =>
    render(
      <MemoryRouter initialEntries={["/blog"]}>
        <BlogPage />
      </MemoryRouter>
    );
  const phoneList = (c: HTMLElement) => c.querySelector('section[aria-label="All articles"]') as HTMLElement;

  it("leads with the latest post as one large card, then chips, then the list without the latest post", () => {
    const { container } = renderBlog();
    const masthead = container.querySelector("section")!;
    const card = masthead.querySelector(`a[href="/blog/${live[0].slug}"]`)!;
    expect(card).not.toBeNull();
    expect(card.className).toContain("md:hidden");
    const list = phoneList(container);
    expect(list.className).toContain("md:hidden");
    expect(list.querySelector(`a[href="/blog/${live[0].slug}"]`)).toBeNull();
    // Every other live post is linked in the list, so the pre-rendered HTML links every post.
    for (const p of live.slice(1)) expect(list.querySelector(`a[href="/blog/${p.slug}"]`), p.slug).not.toBeNull();
  });

  it("offers All plus each category as chips that wrap, All selected first", () => {
    const { container } = renderBlog();
    const group = within(phoneList(container)).getByRole("group", { name: "Filter by category" });
    expect(group.className).toContain("flex-wrap");
    expect(group.className).not.toMatch(/overflow-x/);
    const all = within(group).getByRole("button", { name: "All" });
    expect(all).toHaveAttribute("aria-pressed", "true");
  });

  it("filters the list by the chosen chip without a page load", () => {
    const { container } = renderBlog();
    const list = phoneList(container);
    const category = live.slice(1).find((p) => p.category)!.category;
    fireEvent.click(within(list).getByRole("button", { name: category }));
    const shown = Array.from(list.querySelectorAll("li a")).map((a) => a.getAttribute("href"));
    const expected = live.slice(1).filter((p) => p.category === category).map((p) => `/blog/${p.slug}`);
    expect(shown).toEqual(expected);
    fireEvent.click(within(list).getByRole("button", { name: "All" }));
    expect(list.querySelectorAll("li a").length).toBe(live.length - 1);
  });
});
