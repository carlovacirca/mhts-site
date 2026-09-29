// The sticky bar moved from the top of a phone screen to the bottom, and it
// now holds two buttons instead of one. These tests pin the three things that
// made it worth moving: it stays out of the way until the hero has gone, it is
// not a keyboard trap while it is hidden, and it sits above the cookie banner
// rather than on top of it.
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StickyMobileCTA from "./StickyMobileCTA";
import Layout from "@/components/Layout";
import { TestIntersectionObserver } from "@/test/setup";

const bar = () => screen.getByTestId("sticky-mobile-cta");

const renderBar = (withHero: boolean) => {
  if (withHero) {
    const sentinel = document.createElement("div");
    sentinel.id = "mhts-hero-end";
    document.body.appendChild(sentinel);
  }
  return render(
    <MemoryRouter>
      <StickyMobileCTA />
    </MemoryRouter>
  );
};

/** Drive the observer the component attached to the hero sentinel. */
const heroScrollsAway = (gone: boolean) => {
  const observer = TestIntersectionObserver.instances.at(-1)!;
  act(() => {
    observer.fire([
      {
        isIntersecting: !gone,
        boundingClientRect: { top: gone ? -400 : 10 } as DOMRect,
      },
    ]);
  });
};

describe("StickyMobileCTA", () => {
  beforeEach(() => {
    document.getElementById("mhts-hero-end")?.remove();
    TestIntersectionObserver.instances = [];
  });

  it("holds two equal buttons, Call and Book", () => {
    renderBar(true);
    heroScrollsAway(true);
    const call = screen.getByRole("link", { name: "Call" });
    expect(call).toHaveAttribute("href", "tel:+447947878087");
    expect(screen.getByRole("link", { name: /Book free consultation/ })).toHaveAttribute(
      "href",
      "/book"
    );
    expect(call.className).toContain("min-h-[48px]");
  });

  it("is phone only", () => {
    renderBar(true);
    expect(bar().className).toContain("md:hidden");
  });

  it("stays off screen until the hero has scrolled away, then slides in", () => {
    renderBar(true);
    expect(bar()).toHaveAttribute("data-visible", "0");
    // Collapsed to nothing rather than translated: sliding it down would move
    // it on to the cookie banner below it, not off the screen.
    expect(bar().className).toContain("grid-rows-[0fr]");
    expect(bar().className).not.toContain("translate-y");

    heroScrollsAway(true);
    expect(bar()).toHaveAttribute("data-visible", "1");
    expect(bar().className).toContain("grid-rows-[1fr]");

    heroScrollsAway(false);
    expect(bar()).toHaveAttribute("data-visible", "0");
  });

  // Batch 4b fix of a 4a bug. A grid row at 0fr can only shrink its child to
  // the child's own padding plus border, so a padded child left a 21px strip
  // (20px of py-2.5, 1px of border-t) at the foot of every phone screen. jsdom
  // does no layout, so this adds up what the collapsing child can never shrink
  // below; the pre-render measures the real bar at 390px in Chromium and fails
  // the build if it is not 0px.
  it("measures 0px tall when collapsed: the collapsing row has no padding, no border and min-height 0", () => {
    renderBar(true);
    expect(bar().className).toContain("grid-rows-[0fr]");
    const row = screen.getByTestId("sticky-mobile-cta-row");
    expect(row.parentElement).toBe(bar());
    const classes = row.className.split(/\s+/);
    expect(classes).toContain("min-h-0");
    expect(classes).toContain("overflow-hidden");
    const PX: Record<string, number> = { "0": 0, "0.5": 2, "1": 4, "1.5": 6, "2": 8, "2.5": 10, "3": 12, "4": 16 };
    let floor = 0;
    for (const c of classes) {
      const pad = c.match(/^(?:p|py|pt|pb)-([\d.]+)$/);
      if (pad) floor += (c.startsWith("py-") || c.startsWith("p-") ? 2 : 1) * (PX[pad[1]] ?? 99);
      if (/^border(-[tb])?(-\d)?$/.test(c)) floor += c.startsWith("border-t") || c.startsWith("border-b") ? 1 : 2;
    }
    expect(floor, "px the collapsed row can never shrink below").toBe(0);
    // The padding and the rule live one level in, where they collapse with it.
    const inner = row.firstElementChild as HTMLElement;
    expect(inner.className).toContain("py-2.5");
    expect(inner.className).toContain("border-t");
  });

  it("is inert to the keyboard and to screen readers while it is hidden", () => {
    renderBar(true);
    expect(bar()).toHaveAttribute("aria-hidden", "true");
    expect(bar().className).toContain("pointer-events-none");
    for (const link of screen.getAllByRole("link", { hidden: true })) {
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
  });
});

describe("Layout puts the bar above the cookie banner, not under it", () => {
  it("stacks them in one fixed container and reserves room for the bar", () => {
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

    // And the page reserves the bar's height on phones, so the footer is never
    // covered and nothing shifts when the bar appears.
    expect(container.firstElementChild?.className).toContain("pb-[4.5rem]");
    expect(container.firstElementChild?.className).toContain("md:pb-0");
  });
});
