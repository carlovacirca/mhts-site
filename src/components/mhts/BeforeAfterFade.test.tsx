// The before and after frame that replaced the drag slider (batch 4b fixes).
// What must hold: both photographs are in the page with their own alt text,
// nothing tells the reader what to do with it, the fade is CSS paused until the
// frame is on screen, and reduced motion gets both photographs side by side.
import { describe, it, expect, beforeEach } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { render, screen, act } from "@testing-library/react";
import BeforeAfterFade from "./BeforeAfterFade";
import { TestIntersectionObserver } from "@/test/setup";

const props = {
  before: "/before.jpg",
  after: "/after.jpg",
  beforeAlt: "A client before a hair system fitting",
  afterAlt: "The same client after a hair system fitting",
  caption: "Client one, hair system",
};

const css = readFileSync(join(__dirname, "..", "..", "index.css"), "utf8");

describe("BeforeAfterFade", () => {
  beforeEach(() => {
    TestIntersectionObserver.instances = [];
  });

  it("puts both photographs in the page, each with its own alt text", () => {
    render(<BeforeAfterFade {...props} />);
    expect(screen.getByAltText(props.beforeAlt)).toBeInTheDocument();
    expect(screen.getByAltText(props.afterAlt)).toBeInTheDocument();
    expect(screen.getByText(props.caption)).toBeInTheDocument();
  });

  it("labels Before and After visually only, since the alt text already says which is which", () => {
    render(<BeforeAfterFade {...props} />);
    expect(screen.getByText("Before")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText("After")).toHaveAttribute("aria-hidden", "true");
  });

  it("has no control to operate and no instructions", () => {
    const { container } = render(<BeforeAfterFade {...props} />);
    expect(container.querySelector("button, [role=slider], input, [tabindex]")).toBeNull();
    expect(container.textContent).not.toMatch(/drag|swipe|arrow|tap|click|handle/i);
  });

  it("plays only while the frame is on screen", () => {
    render(<BeforeAfterFade {...props} />);
    const frame = screen.getByTestId("before-after-fade");
    expect(frame).toHaveAttribute("data-playing", "0");
    const observer = TestIntersectionObserver.instances.at(-1)!;
    act(() => observer.fire([{ isIntersecting: true, boundingClientRect: { top: 0 } as DOMRect }]));
    expect(frame).toHaveAttribute("data-playing", "1");
    act(() => observer.fire([{ isIntersecting: false, boundingClientRect: { top: -900 } as DOMRect }]));
    expect(frame).toHaveAttribute("data-playing", "0");
  });

  it("fades in CSS, paused unless playing, and shows both side by side, still, for reduced motion", () => {
    expect(css).toMatch(/\.mhts-ba-after\s*\{[^}]*animation:\s*mhts-ba-fade[^}]*animation-play-state:\s*paused/);
    expect(css).toMatch(/\.mhts-ba\[data-playing="1"\] \.mhts-ba-after\s*\{[^}]*running/);
    const reduce = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reduce).toMatch(/\.mhts-ba\s*\{[^}]*grid-template-columns:\s*1fr 1fr/);
    expect(reduce).toMatch(/\.mhts-ba \.mhts-ba-after,\s*\.mhts-ba\[data-phase\] \.mhts-ba-after\s*\{[^}]*opacity:\s*1;[^}]*animation:\s*none/);
  });
});
