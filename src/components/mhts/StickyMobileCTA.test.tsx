// The sticky bar moved from the top of a phone screen to the bottom, and it
// holds two buttons. These tests pin what keeps it out of the way: it shows
// only once the hero has gone, it fades out while the footer or one of the
// page's own Book or Call buttons is on screen (batch 4b fixes, PR #8), it is
// not a keyboard trap while it is hidden, and it sits above the cookie banner
// rather than on top of it. Whether anything sits under it needs real layout,
// so that is checked in Chromium (docs/reports/batch-4b-fixes.md).
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StickyMobileCTA from "./StickyMobileCTA";
import Layout from "@/components/Layout";
import { TestIntersectionObserver } from "@/test/setup";

const bar = () => screen.getByTestId("sticky-mobile-cta");

const renderBar = (withHero: boolean, page = "") => {
  if (withHero) {
    const sentinel = document.createElement("div");
    sentinel.id = "mhts-hero-end";
    document.body.appendChild(sentinel);
  }
  return render(
    <MemoryRouter>
      <main dangerouslySetInnerHTML={{ __html: page }} />
      <footer>Footer</footer>
      <StickyMobileCTA />
    </MemoryRouter>
  );
};

/** The observer watching this element. */
const observerOf = (el: Element) => TestIntersectionObserver.instances.filter((o) => o.targets.has(el)).at(-1)!;

const fire = (el: Element, on: boolean, top = 10) =>
  act(() => {
    observerOf(el).fire([{ target: el, isIntersecting: on, boundingClientRect: { top } as DOMRect }]);
  });

/** Drive the observer the component attached to the hero sentinel. */
const heroScrollsAway = (gone: boolean) => fire(document.getElementById("mhts-hero-end")!, !gone, gone ? -400 : 10);

describe("StickyMobileCTA", () => {
  beforeEach(() => {
    document.getElementById("mhts-hero-end")?.remove();
    TestIntersectionObserver.instances = [];
  });
  afterEach(() => document.getElementById("mhts-hero-end")?.remove());

  it("holds two equal buttons, Call and Book", () => {
    renderBar(true);
    heroScrollsAway(true);
    const call = screen.getByRole("link", { name: "Call" });
    expect(call).toHaveAttribute("href", "tel:+447947878087");
    expect(screen.getByRole("link", { name: /Book free consultation/ })).toHaveAttribute("href", "/book");
    expect(call.className).toContain("min-h-[48px]");
  });

  it("is phone only", () => {
    renderBar(true);
    expect(bar().className).toContain("md:hidden");
  });

  it("stays hidden until the hero has scrolled away, and fades rather than moves", () => {
    renderBar(true);
    expect(bar()).toHaveAttribute("data-visible", "0");
    expect(bar().className).toContain("opacity-0");
    expect(bar().className).toContain("invisible");
    // A fade: nothing slides and nothing collapses, so nothing on the page
    // moves and nothing is left half showing.
    expect(bar().className).toContain("transition-[opacity,visibility]");
    expect(bar().className).not.toMatch(/translate-y|grid-rows/);

    heroScrollsAway(true);
    expect(bar()).toHaveAttribute("data-visible", "1");
    expect(bar().className).toContain("opacity-100");

    heroScrollsAway(false);
    expect(bar()).toHaveAttribute("data-visible", "0");
  });

  it("fades out while the footer is on screen, so the page ends on the footer", () => {
    renderBar(true);
    heroScrollsAway(true);
    const footer = document.querySelector("footer")!;
    fire(footer, true);
    expect(bar()).toHaveAttribute("data-visible", "0");
    fire(footer, false);
    expect(bar()).toHaveAttribute("data-visible", "1");
  });

  it("fades out while one of the page's own Book or Call buttons is on screen", () => {
    renderBar(
      true,
      '<a href="tel:+447947878087">Call</a><a href="/book">Book</a><a href="#mhts-book">Book</a><a href="/hair-systems">Hair Systems</a>'
    );
    heroScrollsAway(true);
    const [call, book, jump, other] = Array.from(document.querySelectorAll("main a"));
    expect(observerOf(other)).toBeUndefined();

    fire(book, true);
    expect(bar()).toHaveAttribute("data-visible", "0");
    fire(call, true);
    fire(book, false);
    expect(bar()).toHaveAttribute("data-visible", "0");
    fire(call, false);
    expect(bar()).toHaveAttribute("data-visible", "1");
    fire(jump, true);
    expect(bar()).toHaveAttribute("data-visible", "0");
  });

  it("is inert to the keyboard and to screen readers while it is hidden", () => {
    renderBar(true);
    expect(bar()).toHaveAttribute("aria-hidden", "true");
    expect(bar().className).toContain("pointer-events-none");
    for (const link of screen.getAllByRole("link", { hidden: true }).filter((l) => bar().contains(l))) {
      expect(link).toHaveAttribute("tabindex", "-1");
    }

    heroScrollsAway(true);
    expect(bar()).not.toHaveAttribute("aria-hidden");
    expect(screen.getByRole("link", { name: "Call" })).not.toHaveAttribute("tabindex");
  });

  it("falls back to a scroll threshold on a page with no hero", () => {
    renderBar(false);
    expect(bar()).toHaveAttribute("data-visible", "0");

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 2000, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(bar()).toHaveAttribute("data-visible", "1");
    Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  });
});

describe("Layout puts the bar above the cookie banner, not under it", () => {
  it("stacks them in one fixed container, with no room reserved under the footer", () => {
    const { container } = render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    const stack = container.querySelector(".fixed.inset-x-0.bottom-0");
    expect(stack).not.toBeNull();
    // Column order is bar first, banner second, so the banner is underneath it.
    expect(stack!.className).toContain("flex-col");
    expect(stack!.firstElementChild).toBe(screen.getByTestId("sticky-mobile-cta"));
    expect(stack!.children.length).toBe(2);

    // Neither the bar nor the banner positions itself any more, so they cannot
    // claim the same strip of screen.
    expect(screen.getByTestId("sticky-mobile-cta").className).not.toContain("fixed");

    // No room is reserved under the footer: the bar fades out while the
    // footer is on screen, so the page ends on the footer's dark band rather
    // than on a white strip with the bar half over it (PR #8).
    expect(container.firstElementChild?.className).not.toMatch(/pb-\[4\.5rem\]/);
  });
});
