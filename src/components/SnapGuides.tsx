import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SECTION_SNAP } from "@/lib/sectionSnap";

// Extra stops for a screen that is taller than the phone (batch 4b fixes,
// PR #8).
//
// Each screen is sized so its content ends above the bottom Call and Book bar.
// Some hold more than one screen of content, more of them on a 360x740 phone
// than a 390x844 one. Resting at the top of such a screen leaves its last
// lines down where the bar would be, and a fast swipe can carry the reader
// straight past them to the next screen. So each one also gets a stop where
// its end sits on the bottom of the phone, with the bar's band (the screen's
// transparent bottom border, src/index.css) under the bar, and one stop for
// every further screen of content in between. Nothing is skipped and the
// reader can always rest with nothing under the bar.
//
// The stops are empty, zero-height markers in a layer of their own at the end
// of <body>, outside React's tree, placed from the screens' measured positions
// and placed again whenever the page changes size. Nothing moves the page:
// the browser's own scroll snap does the rest. No screen that fits gets any.

const SCREENS = [
  ".mhts-snap-site > :not(.mhts-snap-proximity) > section",
  ".mhts-snap-site .mhts-snap-phone",
  ".mhts-snap-site .mhts-snap-section",
].join(", ");

const measure = (value: string) => {
  const probe = document.createElement("div");
  probe.style.cssText = `position:absolute;visibility:hidden;height:${value}`;
  document.body.appendChild(probe);
  const h = probe.getBoundingClientRect().height;
  probe.remove();
  return h;
};

const marker = (top: number, align: "start" | "end") => {
  const m = document.createElement("div");
  m.style.cssText = `position:absolute;left:0;width:100%;height:0;top:${top}px;scroll-snap-align:${align};`;
  return m;
};

export const placeSnapGuides = (layer: HTMLElement) => {
  layer.replaceChildren();
  if (!getComputedStyle(document.documentElement).scrollSnapType.includes("mandatory")) return;
  // The room between the header and the bar.
  const screen = measure("var(--snap-screen)");
  if (screen < 100) return;
  for (const el of document.querySelectorAll<HTMLElement>(SCREENS)) {
    const cs = getComputedStyle(el);
    if (cs.scrollSnapAlign.split(" ")[0] !== "start" || cs.display === "none") continue;
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY;
    const band = parseFloat(cs.borderBottomWidth) || 0;
    const content = r.height - band;
    if (content <= screen + 2) continue;
    // A stop for each further full screen of content, then the end.
    for (let at = top + screen; at + screen < top + content; at += screen) layer.appendChild(marker(at, "start"));
    layer.appendChild(marker(top + r.height, "end"));
  }
};

const SnapGuides = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!SECTION_SNAP || typeof ResizeObserver === "undefined") return;
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.dataset.snapGuides = "1";
    layer.style.cssText = "position:absolute;top:0;left:0;width:100%;height:0;pointer-events:none;";
    document.body.appendChild(layer);
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => placeSnapGuides(layer));
    };
    const main = document.querySelector("main");
    const resize = new ResizeObserver(schedule);
    if (main) resize.observe(main);
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("resize", schedule);
      layer.remove();
    };
  }, [pathname]);
  return null;
};

export default SnapGuides;
