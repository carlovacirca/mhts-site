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

export const SCREENS = [
  ".mhts-snap-site > :not(.mhts-snap-proximity) > section",
  ".mhts-snap-site .mhts-snap-phone",
  ".mhts-snap-site .mhts-snap-section",
  ".mhts-snap-site > :not(.mhts-snap-proximity) > .mhts-snap-desk",
  // On a phone a desktop group is display: contents and its sections are screens.
  ".mhts-snap-site > :not(.mhts-snap-proximity) > .mhts-snap-desk > section",
  // From 768px up a phone wrapper is display: contents and its sections are screens.
  ".mhts-snap-site > :not(.mhts-snap-proximity) > .md\\:contents > section",
].join(", ");

// From 768px up a stop never cuts anything (Carlo, Oct 2026: "never ever
// must something be cut off on a scroll stop"). A screen taller than the
// window is paged like a printed document: a block that would cross the
// bottom of a stop is pushed (with the others starting on its row) to the top
// of the next one, and the last page is padded to a whole screen so the next
// section starts on a stop of its own. The pushes are a margin and a padding
// set here, cleared before every measurement, and never saved by the
// pre-render.
const BLOCKS = "li, article, figure, details, p, h2, h3, h4, img, blockquote, table, form, [class*='rounded-']";
const GAP = 24;

const inSticky = (b: HTMLElement, stop: HTMLElement) => {
  for (let n: HTMLElement | null = b; n && n !== stop; n = n.parentElement) {
    if (getComputedStyle(n).position === "sticky") return true;
  }
  return false;
};

export const clearBreaks = () => {
  document.querySelectorAll<HTMLElement>("[data-snap-break]").forEach((el) => {
    el.removeAttribute("data-snap-break");
    el.style.removeProperty("--snap-break");
    el.style.removeProperty("--snap-break-base");
  });
  document.querySelectorAll<HTMLElement>("[data-snap-pad]").forEach((el) => {
    el.removeAttribute("data-snap-pad");
    el.style.removeProperty("--snap-pad");
    el.style.removeProperty("--snap-pad-base");
  });
};

const pageY = (e: Element) => {
  const r = e.getBoundingClientRect();
  return { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, h: r.height };
};

// The outermost element inside `stop` that starts where `b` starts.
const rowItem = (b: HTMLElement, stop: HTMLElement, top: number) => {
  let item = b;
  for (let n = b.parentElement; n && n !== stop; n = n.parentElement) {
    if (Math.abs(pageY(n).top - top) > 3) break;
    item = n;
  }
  return item;
};

const desktopPages = (el: HTMLElement, screen: number) => {
  const stops: number[] = [];
  const top = pageY(el).top;
  let at = top;
  for (let guard = 0; guard < 60; guard++) {
    const end = pageY(el).bottom;
    const line = at + screen;
    if (line >= end - 1) {
      // The last page: pad it to a whole screen.
      const short = line - end;
      if (at > top && short > 1) {
        // A sticky sidebar stays whole only while its own container runs to
        // the end of the screen, so the padding goes there.
        const sticky = Array.from(el.querySelectorAll<HTMLElement>("aside, nav, div")).find(
          (n) => getComputedStyle(n).position === "sticky",
        );
        const padEl = sticky?.parentElement ?? el;
        padEl.style.setProperty("--snap-pad-base", getComputedStyle(padEl).paddingBottom);
        padEl.style.setProperty("--snap-pad", `${Math.ceil(short)}px`);
        padEl.setAttribute("data-snap-pad", "");
      }
      break;
    }
    const blocks = Array.from(el.querySelectorAll<HTMLElement>(BLOCKS))
      .filter((b) => !inSticky(b, el))
      .map((b) => ({ el: b, ...pageY(b) }))
      .filter((b) => b.h > 0 && b.h < screen * 0.9);
    const cut = blocks.filter((b) => b.top < line - 1 && b.bottom > line + 1 && b.top > at + 1);
    if (cut.length) {
      const cutTop = Math.min(...cut.map((b) => b.top));
      // Everything that starts on that row moves down together.
      const row = new Set(
        blocks.filter((b) => Math.abs(b.top - cutTop) <= 3).map((b) => rowItem(b.el, el, b.top)),
      );
      const target = line + GAP;
      for (const item of row) {
        // Inside a scaled screen a margin is scaled too, and a margin can
        // collapse into the one above it: set it, then top it up until the
        // block really starts on the next stop.
        const scale = item.offsetHeight ? item.getBoundingClientRect().height / item.offsetHeight : 1;
        item.style.setProperty("--snap-break-base", getComputedStyle(item).marginTop);
        item.setAttribute("data-snap-break", "");
        let extra = 0;
        for (let k = 0; k < 4; k++) {
          const short = target - pageY(item).top;
          if (short <= 1) break;
          extra += short / (scale || 1);
          item.style.setProperty("--snap-break", `${Math.ceil(extra)}px`);
        }
      }
    }
    stops.push(line);
    at = line;
  }
  return stops;
};

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

// From 768px up each screen is fitted to the room under the header (Carlo,
// Oct 2026: one screen per section, nothing cut off, on every laptop,
// desktop and tablet). See "Fitting a screen to the window" in index.css.
export const FIT_SCREENS = [
  ".mhts-snap-site > :not(.mhts-snap-proximity) > section",
  ".mhts-snap-site > :not(.mhts-snap-proximity) > .mhts-snap-desk",
  ".mhts-snap-site > :not(.mhts-snap-proximity) > .md\\:contents > section",
].join(", ");
// A screen holding the booking calendar is sized to the window by its own
// rule in index.css and is never zoomed: zoom would shrink the calendar's
// text to 8 or 9px.
const NO_FIT = ".mhts-snap-embed";
// Below this a screen would be too small to read: it keeps zoom 1 and gets
// further stops instead.
const MIN_ZOOM = 0.6;

const clearFit = () => {
  document.querySelectorAll<HTMLElement>("[data-snap-fit]").forEach((el) => {
    el.removeAttribute("data-snap-fit");
    el.style.removeProperty("--snap-zoom");
  });
};

export const fitScreens = () => {
  if (window.innerWidth < 768 || !getComputedStyle(document.documentElement).scrollSnapType.includes("mandatory")) {
    clearFit();
    return;
  }
  const screen = measure("var(--snap-screen)");
  const first = measure("var(--snap-first-screen)");
  if (screen < 100) return;
  for (const el of document.querySelectorAll<HTMLElement>(FIT_SCREENS)) {
    const cs = getComputedStyle(el);
    if (cs.scrollSnapAlign.split(" ")[0] !== "start" || cs.display === "none") continue;
    if (el.matches(NO_FIT)) {
      // It may have been fitted before the calendar replaced its panel.
      el.removeAttribute("data-snap-fit");
      el.style.removeProperty("--snap-zoom");
      continue;
    }
    const kind = el.classList.contains("mhts-snap-desk")
      ? "group"
      : el.classList.contains("mhts-snap-section") && !el.classList.contains("mhts-snap-hero")
        ? "home"
        : "section";
    const cap = kind === "section" ? 1 : 1.2;
    const room = el.previousElementSibling ? screen : first;
    // Padding that does not scale with the content.
    const pad = kind === "section" ? parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom) : 0;
    el.dataset.snapFit = kind;
    el.style.setProperty("--snap-zoom", "1");
    el.setAttribute("data-snap-measure", "");
    let zoom = 1;
    for (let i = 0; i < 3; i++) {
      const h = el.getBoundingClientRect().height;
      // A screen that already fits, and may not grow, is left alone.
      if (i === 0 && cap === 1 && h <= room + 1) break;
      const want = Math.min(cap, (zoom * (room - pad)) / Math.max(h - pad, 1)) * (i === 0 ? 0.98 : 0.99);
      if (i > 0 && h <= room + 1) break;
      zoom = want;
      if (zoom < MIN_ZOOM) break;
      el.style.setProperty("--snap-zoom", zoom.toFixed(4));
    }
    el.removeAttribute("data-snap-measure");
    if (zoom < MIN_ZOOM || Math.abs(zoom - 1) < 0.01) {
      el.removeAttribute("data-snap-fit");
      el.style.removeProperty("--snap-zoom");
    }
  }
};

export const placeSnapGuides = (layer: HTMLElement) => {
  layer.replaceChildren();
  clearBreaks();
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
    if (window.innerWidth >= 768) {
      for (const at of desktopPages(el, screen)) layer.appendChild(marker(at, "start"));
      continue;
    }
    for (let at = top + screen; at + screen < top + content; at += screen) layer.appendChild(marker(at, "start"));
    layer.appendChild(marker(top + r.height, "end"));
  }
};

const SnapGuides = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!SECTION_SNAP || typeof ResizeObserver === "undefined") return;
    // A layer left from an earlier pass (an older pre-rendered page) holds
    // stops measured for another screen: drop it before placing our own.
    document.querySelectorAll("[data-snap-guides]").forEach((el) => el.remove());
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.dataset.snapGuides = "1";
    layer.style.cssText = "position:absolute;top:0;left:0;width:100%;height:0;pointer-events:none;";
    document.body.appendChild(layer);
    let frame = 0;
    // Fitting changes the page's height, which the observer sees: only a new
    // window size, the fonts or a new page fit again; the observer only
    // places the stops.
    let refit = true;
    let fittedHeight = -1;
    const main = document.querySelector("main");
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // A change of height the fit did not make (an image arriving, a
        // panel opening) fits again.
        if (main && fittedHeight >= 0 && Math.abs(main.offsetHeight - fittedHeight) > 2) refit = true;
        // The arrival motion (src/lib/stopMotion.ts) moves items with
        // translate and scale, which getBoundingClientRect counts. This flag
        // takes them off while the screens are measured, and goes again in
        // the same frame, so it never paints.
        const root = document.documentElement;
        root.setAttribute("data-snap-measuring", "");
        if (refit) {
          clearBreaks();
          fitScreens();
        }
        refit = false;
        placeSnapGuides(layer);
        if (main) fittedHeight = main.offsetHeight;
        root.removeAttribute("data-snap-measuring");
      });
    };
    const refitSoon = () => {
      refit = true;
      schedule();
    };
    const resize = new ResizeObserver(schedule);
    if (main) resize.observe(main);
    window.addEventListener("resize", refitSoon);
    document.fonts?.ready.then(refitSoon);
    window.addEventListener("load", refitSoon);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("resize", refitSoon);
      window.removeEventListener("load", refitSoon);
      layer.remove();
    };
  }, [pathname]);
  return null;
};

export default SnapGuides;
