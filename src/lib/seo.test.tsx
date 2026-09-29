// Share previews. Until pre-rendering, no crawler ran the JavaScript that set
// these, so every link to any page showed the homepage card. Now the tags are
// baked into the HTML, so what they say matters.
import { describe, it, expect, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { useSeo, useOpenGraph, useCanonical, SITE_URL } from "./seo";

const meta = (selector: string) =>
  document.head.querySelector(selector)?.getAttribute("content") ?? null;

const Seo = () => {
  useSeo({
    title: "Page title",
    description: "Page description",
    canonicalPath: "/hair-systems",
  });
  return null;
};

const Canonical = () => {
  useCanonical("/scalp-micropigmentation");
  useOpenGraph("Service title", "Service description");
  return null;
};

describe("useSeo", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("sets Open Graph and Twitter text from the page's own title and description", () => {
    render(<Seo />);
    expect(document.title).toBe("Page title");
    expect(meta('meta[name="description"]')).toBe("Page description");
    expect(meta('meta[property="og:title"]')).toBe("Page title");
    expect(meta('meta[property="og:description"]')).toBe("Page description");
    expect(meta('meta[name="twitter:title"]')).toBe("Page title");
    expect(meta('meta[name="twitter:description"]')).toBe("Page description");
  });

  it("keeps og:url and the canonical in step", () => {
    render(<Seo />);
    const canonical = document.head
      .querySelector('link[rel="canonical"]')
      ?.getAttribute("href");
    expect(canonical).toBe(`${SITE_URL}/hair-systems`);
    expect(meta('meta[property="og:url"]')).toBe(canonical);
  });
});

describe("useCanonical with useOpenGraph", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  it("gives the service pages their own og:url and Twitter card", () => {
    render(<Canonical />);
    expect(meta('meta[property="og:url"]')).toBe(`${SITE_URL}/scalp-micropigmentation`);
    expect(meta('meta[property="og:title"]')).toBe("Service title");
    expect(meta('meta[name="twitter:title"]')).toBe("Service title");
    expect(meta('meta[name="twitter:description"]')).toBe("Service description");
  });

  it("leaves the canonical alone when passed null", () => {
    const None = () => {
      useCanonical(null);
      return null;
    };
    render(<None />);
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(meta('meta[property="og:url"]')).toBeNull();
  });
});
