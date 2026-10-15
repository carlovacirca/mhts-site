// The booking calendar's loading state (premium plan, step 1). Trafft's script
// fills the box with an iframe after consent; until that iframe has loaded a
// skeleton in the studio's colours holds the space, and it must never outlive
// a slow or blocked calendar.
import { describe, it, expect, afterEach, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { act, render, screen } from "@testing-library/react";
import BookingCalendar from "./BookingCalendar";

const css = readFileSync(join(__dirname, "..", "..", "index.css"), "utf8");

const skeleton = (root: ParentNode) => root.querySelector(".mhts-skeleton")!;
const shown = (root: ParentNode) => !skeleton(root).classList.contains("invisible");

/** What Trafft's embed.js does: an iframe appended to the box. */
const addFrame = async (root: ParentNode) => {
  const frame = document.createElement("iframe");
  await act(async () => {
    root.querySelector(".embedded-booking")!.appendChild(frame);
  });
  return frame;
};

describe("BookingCalendar", () => {
  afterEach(() => vi.useRealTimers());

  it("is Trafft's box for the chosen service, scrolling inside its own frame", () => {
    const { container } = render(<BookingCalendar serviceUuid="abc" />);
    const box = container.querySelector(".embedded-booking")!;
    expect(box.getAttribute("data-url")).toBe("https://menshairtostay.trafft.com");
    expect(box.getAttribute("data-query")).toBe("&t=s&uuid=abc");
    expect(box.getAttribute("data-autoresize")).toBe("0");
    // A fixed height from the first frame, so nothing moves when it loads.
    expect(container.querySelector(".mhts-embed-frame")!.className).toContain("h-[1000px]");
  });

  it("shows the skeleton, and says so to a screen reader, until the calendar loads", async () => {
    const { container } = render(<BookingCalendar serviceUuid="abc" />);
    expect(shown(container)).toBe(true);
    expect(skeleton(container).getAttribute("aria-hidden")).toBe("true");
    expect(screen.getByRole("status")).toHaveTextContent("Loading the booking calendar");
    const frame = await addFrame(container);
    expect(shown(container)).toBe(true);
    await act(async () => {
      frame.dispatchEvent(new Event("load"));
    });
    expect(shown(container)).toBe(false);
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("never outlives a calendar that is slow to load", async () => {
    vi.useFakeTimers();
    const { container } = render(<BookingCalendar serviceUuid="abc" />);
    await addFrame(container);
    act(() => vi.advanceTimersByTime(3900));
    expect(shown(container)).toBe(true);
    act(() => vi.advanceTimersByTime(200));
    expect(shown(container)).toBe(false);
  });

  it("never outlives a calendar whose script does not arrive", () => {
    vi.useFakeTimers();
    const { container } = render(<BookingCalendar serviceUuid="abc" />);
    act(() => vi.advanceTimersByTime(7900));
    expect(shown(container)).toBe(true);
    act(() => vi.advanceTimersByTime(200));
    expect(shown(container)).toBe(false);
  });

  it("only shimmers when motion is allowed", () => {
    const at = css.indexOf("animation: mhts-skeleton-sweep");
    expect(at).toBeGreaterThan(0);
    const media = css.lastIndexOf("@media", at);
    expect(css.slice(media, css.indexOf("{", media)).trim()).toBe("@media (prefers-reduced-motion: no-preference)");
  });
});
