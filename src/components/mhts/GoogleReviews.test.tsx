// The reviews carousel publishes three real people's words about a hair loss
// business, so what it must never do is as important as what it does: no
// invented rating, no invented count, no review schema, and nothing hidden
// from a reader with no JavaScript. It also has to stop moving when asked.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import GoogleReviews from "./GoogleReviews";

const REVIEW_OPENINGS = [
  "Their expertise in fitting hair replacement systems is unmatched",
  "I had thinning hair and got a hair system and it looks amazing",
  "The salon is friendly and welcoming",
];

let canHover = false;
const setReducedMotion = (matches: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? matches : query.includes("hover: hover") ? canHover : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });
};

// The reader scrolls the reviews onto the screen: the autoplay only runs
// while their middle is inside the window (jsdom has no layout, so the
// track's position is set by hand).
const scrollReviewsIntoView = (visible = true) => {
  const track = screen.getByTestId("reviews-track");
  const top = visible ? 200 : 2000;
  track.getBoundingClientRect = () =>
    ({ top, bottom: top + 300, left: 0, right: 390, width: 390, height: 300, x: 0, y: top, toJSON: () => ({}) }) as DOMRect;
};

describe("GoogleReviews carousel", () => {
  let scrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setReducedMotion(false);
    scrollTo = vi.fn();
    Element.prototype.scrollTo = scrollTo as unknown as Element["scrollTo"];
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    canHover = false;
    vi.useRealTimers();
  });

  it("puts all three reviews in the page, verbatim", () => {
    render(<GoogleReviews />);
    for (const opening of REVIEW_OPENINGS) {
      expect(screen.getByText(new RegExp(opening))).toBeInTheDocument();
    }
    expect(screen.getByText("Leigh")).toBeInTheDocument();
    expect(screen.getByText("Fayaz")).toBeInTheDocument();
    expect(screen.getByText("Sam")).toBeInTheDocument();
  });

  it("labels them as Google reviews and links out to the listing", () => {
    render(<GoogleReviews />);
    expect(screen.getAllByText("Google review")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Our Google reviews" })).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /See us on Google/ });
    // The Google profile with its reviews, not Maps (Carlo, Oct 2026).
    expect(link).toHaveAttribute("href", expect.stringContaining("google.com/search"));
    expect(link.getAttribute("href")).not.toContain("/maps");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("states no rating figure and no review count, because neither is ours to state", () => {
    const { container } = render(<GoogleReviews />);
    const text = container.textContent ?? "";
    expect(text).not.toMatch(/\d+(\.\d+)?\s*(out of|\/)\s*5/i);
    expect(text).not.toMatch(/\d+\s*(reviews|ratings)/i);
    expect(container.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it("stays on the first review until the reader scrolls to it", () => {
    render(<GoogleReviews />);
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(scrollTo).not.toHaveBeenCalled();
    // On screen at last: the first review still gets its full six seconds.
    scrollReviewsIntoView();
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(scrollTo).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(1);
    // Scrolled away: it stops again.
    scrollReviewsIntoView(false);
    act(() => {
      vi.advanceTimersByTime(30000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("autoplays to the next review after 6 seconds", () => {
    render(<GoogleReviews />);
    scrollReviewsIntoView();
    expect(scrollTo).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(2);
  });

  it("pauses on hover and starts again when the pointer leaves", () => {
    canHover = true;
    render(<GoogleReviews />);
    scrollReviewsIntoView();
    const root = screen.getByTestId("reviews-carousel");

    fireEvent.mouseEnter(root);
    act(() => {
      vi.advanceTimersByTime(18000);
    });
    expect(scrollTo).not.toHaveBeenCalled();

    fireEvent.mouseLeave(root);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("pauses on keyboard focus and on a touch", () => {
    render(<GoogleReviews />);
    scrollReviewsIntoView();
    const root = screen.getByTestId("reviews-carousel");

    fireEvent.keyDown(window, { key: "Tab" });
    fireEvent.focus(screen.getByRole("link", { name: /See us on Google/ }));
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    expect(scrollTo).not.toHaveBeenCalled();

    fireEvent.blur(screen.getByRole("link", { name: /See us on Google/ }));
    fireEvent.touchStart(root);
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("on a phone a touch pauses only while the finger is down", () => {
    render(<GoogleReviews />);
    scrollReviewsIntoView();
    const root = screen.getByTestId("reviews-carousel");
    // A phone "hovers" on every tap and never leaves: that must not stop it.
    fireEvent.mouseEnter(root);
    fireEvent.touchStart(root);
    act(() => {
      vi.advanceTimersByTime(12000);
    });
    expect(scrollTo).not.toHaveBeenCalled();
    fireEvent.touchEnd(root);
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("a tap's focus does not stop it; only keyboard focus does", () => {
    render(<GoogleReviews />);
    scrollReviewsIntoView();
    fireEvent.pointerDown(window);
    fireEvent.focus(screen.getByRole("link", { name: /See us on Google/ }));
    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("never autoplays for a reader who has asked for reduced motion", () => {
    setReducedMotion(true);
    render(<GoogleReviews />);
    scrollReviewsIntoView();
    act(() => {
      vi.advanceTimersByTime(60000);
    });
    expect(scrollTo).not.toHaveBeenCalled();
  });

  it("swipes: the track is a real scroller that snaps", () => {
    render(<GoogleReviews />);
    const track = screen.getByTestId("reviews-track");
    expect(track.className).toContain("overflow-x-auto");
    expect(track.className).toContain("snap-x");
    expect(track).toHaveAttribute("aria-roledescription", "carousel");
    for (const slide of Array.from(track.children)) {
      expect(slide.className).toContain("snap-center");
    }
  });

  it("moves on the arrows and the dots, and wraps round", () => {
    render(<GoogleReviews />);
    fireEvent.click(screen.getByRole("button", { name: "Next review" }));
    expect(scrollTo).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Show review 2 of 3" })).toHaveAttribute(
      "aria-current",
      "true"
    );

    // Back past the start wraps to the last review rather than sticking.
    fireEvent.click(screen.getByRole("button", { name: "Previous review" }));
    fireEvent.click(screen.getByRole("button", { name: "Previous review" }));
    expect(screen.getByRole("button", { name: "Show review 3 of 3" })).toHaveAttribute(
      "aria-current",
      "true"
    );

    fireEvent.click(screen.getByRole("button", { name: "Show review 1 of 3" }));
    expect(screen.getByRole("button", { name: "Show review 1 of 3" })).toHaveAttribute(
      "aria-current",
      "true"
    );
  });

  it("dims the inactive cards with a class, never an inline opacity", () => {
    const { container } = render(<GoogleReviews />);
    for (const el of Array.from(container.querySelectorAll<HTMLElement>("[style]"))) {
      expect(el.style.opacity === "" || Number(el.style.opacity) === 1).toBe(true);
    }
    // The dimming rule is keyed off this attribute, which only appears once
    // React has taken the row over.
    expect(screen.getByTestId("reviews-track")).toHaveAttribute("data-carousel-ready", "1");
  });
});
