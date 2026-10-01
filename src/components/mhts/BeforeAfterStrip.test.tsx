// The homepage's before and afters on a phone (Carlo, after the batch 4b fixes
// preview): one client at a time in a strip like the reviews, Before for 2
// seconds, After for 2 seconds, then the next client, round and round; only
// while on screen; swiping still works; no instruction text; and for reduced
// motion nothing moves on its own.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, act } from "@testing-library/react";
import BeforeAfterStrip from "./BeforeAfterStrip";
import { TestIntersectionObserver } from "@/test/setup";

const pairs = [1, 2, 3].map((n) => ({
  before: `/before-${n}.jpg`,
  after: `/after-${n}.jpg`,
  beforeAlt: `Client ${n} before`,
  afterAlt: `Client ${n} after`,
  label: `Client ${n}`,
}));

const css = readFileSync(join(__dirname, "..", "..", "index.css"), "utf8");

const stubMedia = ({ phone, reduced }: { phone: boolean; reduced: boolean }) => {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("max-width") ? phone : query.includes("reduce") ? reduced : false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  })) as typeof window.matchMedia;
};

const renderStrip = () => {
  const view = render(<BeforeAfterStrip pairs={pairs} frameClassName="aspect-square" sizes="100vw" />);
  const track = screen.getByTestId("before-after-strip");
  const onScreen = TestIntersectionObserver.instances.find((o) => o.targets.has(track))!;
  const slides = TestIntersectionObserver.instances.find((o) => o.root === track)!;
  const phases = () => Array.from(track.querySelectorAll(".mhts-ba")).map((f) => f.getAttribute("data-phase"));
  const current = () =>
    screen.getAllByRole("button", { name: /Show client/ }).findIndex((b) => b.getAttribute("aria-current") === "true");
  return { ...view, track, onScreen, slides, phases, current };
};

describe("BeforeAfterStrip", () => {
  const original = window.matchMedia;
  beforeEach(() => {
    TestIntersectionObserver.instances = [];
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    window.matchMedia = original;
  });

  it("puts all three clients in the page, both photographs each, and no instruction text", () => {
    stubMedia({ phone: true, reduced: false });
    const { track } = renderStrip();
    for (const p of pairs) {
      expect(screen.getByAltText(p.beforeAlt)).toBeInTheDocument();
      expect(screen.getByAltText(p.afterAlt)).toBeInTheDocument();
    }
    expect(track.children).toHaveLength(3);
    expect(document.body.textContent).not.toMatch(/drag|swipe|scroll|tap|click|arrow/i);
  });

  it("on a phone, on screen: Before 2s, After 2s, then the next client, and back to the first after the third", () => {
    stubMedia({ phone: true, reduced: false });
    const { onScreen, phases, current } = renderStrip();
    act(() => onScreen.fire([{ isIntersecting: true }]));
    expect(phases()).toEqual(["before", "before", "before"]);
    act(() => vi.advanceTimersByTime(2000));
    expect(phases()).toEqual(["after", "before", "before"]);
    act(() => vi.advanceTimersByTime(2600));
    expect(current()).toBe(1);
    expect(phases()).toEqual(["before", "before", "before"]);
    act(() => vi.advanceTimersByTime(2000));
    expect(phases()).toEqual(["before", "after", "before"]);
    act(() => vi.advanceTimersByTime(2600));
    expect(current()).toBe(2);
    act(() => vi.advanceTimersByTime(4600));
    expect(current()).toBe(0);
  });

  it("does nothing while the strip is off screen", () => {
    stubMedia({ phone: true, reduced: false });
    const { phases, current } = renderStrip();
    act(() => vi.advanceTimersByTime(20000));
    expect(phases()).toEqual(["before", "before", "before"]);
    expect(current()).toBe(0);
  });

  it("restarts the cycle on the client the reader swipes to", () => {
    stubMedia({ phone: true, reduced: false });
    const { onScreen, slides, track, phases, current } = renderStrip();
    act(() => onScreen.fire([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(1500));
    act(() => slides.fire([{ isIntersecting: true, target: track.children[2] }]));
    expect(current()).toBe(2);
    act(() => vi.advanceTimersByTime(1000));
    expect(phases()).toEqual(["before", "before", "before"]);
    act(() => vi.advanceTimersByTime(1000));
    expect(phases()).toEqual(["before", "before", "after"]);
  });

  it("with reduced motion, never moves on its own; each frame shows Before and After side by side", () => {
    stubMedia({ phone: true, reduced: true });
    const { onScreen, phases, current } = renderStrip();
    act(() => onScreen.fire([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(20000));
    expect(phases()).toEqual(["before", "before", "before"]);
    expect(current()).toBe(0);
    const reduce = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reduce).toMatch(/\.mhts-ba\[data-phase\] \.mhts-ba-after\s*\{[^}]*opacity:\s*1/);
  });

  it("from md up, never runs the cycle: the three frames loop on their own as before", () => {
    stubMedia({ phone: false, reduced: false });
    const { onScreen, phases } = renderStrip();
    act(() => onScreen.fire([{ isIntersecting: true }]));
    act(() => vi.advanceTimersByTime(20000));
    expect(phases()).toEqual(["before", "before", "before"]);
    // The phase only steers the frame below md.
    const phone = css.slice(css.indexOf("@media (max-width: 767.98px) {\n  .mhts-ba[data-phase]"));
    expect(phone).toMatch(/^@media \(max-width: 767\.98px\) \{\s*\.mhts-ba\[data-phase\] \.mhts-ba-after\s*\{[^}]*animation:\s*none/);
  });
});
