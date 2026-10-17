// "Arrive": the motion at every scroll stop (Carlo, Oct 2026: the site must
// feel like a £20k website, with something arriving at every stop, on a
// phone and on a desktop alike).
//
// One system and one vocabulary for every stop on every page, at every width
// where the page snaps (y mandatory). Four verbs, one easing family:
//
//   rise     eyebrow, title, lede, cards, chips, rows, buttons: a fade and a
//            short lift (16px, 12px on a phone). Inside a horizontal strip or
//            a clipping box it only fades, so nothing is cut mid-rise.
//   draw     the red rule under a title draws itself in from its centre (or
//            its left edge), just after the title.
//   uncover  photographs and before and after frames: a clip opens from a
//            slightly smaller rounded box and the picture settles from 1.05.
//            It waits for the photograph to decode (at most 600ms), so a stop
//            never uncovers a half-loaded picture.
//   light    the dark bands. A hook only for now (data-stop-light); the bands
//            are unchanged.
//
// How it ties to the snap, and why it can never hide anything that matters:
//
//   - It starts after React has mounted, two frames after the page has been
//     placed (ScrollToTop) and fitted (SnapGuides). Every stop is armed, the
//     first one with the h1 included, and the stops already on screen play
//     two frames later, so landing on a page (from a link or anywhere else)
//     arrives like any other stop (Carlo, Oct 2026).
//   - Armed means data-stop="armed" on the stop and data-stops on <html>. The
//     CSS needs both, and sits behind prefers-reduced-motion: no-preference,
//     so without JavaScript, in the pre-render, in print and for a reader who
//     asked for reduced motion every element stays exactly at rest.
//   - One IntersectionObserver, with the header (and on a phone the bottom
//     bar) taken off the root. A stop flips to "in" when half of the room it
//     can fill is in view: under mandatory snap that is the middle of the
//     glide, so the stop never slides in empty and its words are readable as
//     the snap settles. A stop that leaves the window is armed again, so it
//     plays every time it arrives.
//   - Safety nets: focus inside an armed stop flips it at once (keyboard
//     readers never tab onto invisible text); a stop that has been in view
//     for 1200ms flips; a change of route, of width across 768px or to
//     reduced motion drops everything back to rest.
//   - Only opacity, translate, scale and clip-path move, so there is no
//     layout shift and SnapGuides never refits mid-animation. SnapGuides sets
//     html[data-snap-measuring] while it measures, which takes the translate
//     and scale off for that frame (src/index.css), so its pages and zoom are
//     measured on the resting layout.
//   - Once a stop has settled its data-stop is removed, so the transitions
//     declared for the arrival never get in the way of a hover afterwards.
//
// The CSS is the "Arrive" block in src/index.css. scripts/prerender.mjs
// strips every attribute named here, as a safety net.
import { isPrerenderPass } from "./prerender";

/** Steps between items are capped at this index (560ms on a desktop). */
const MAX_INDEX = 8;
/** A stop in view for this long plays, whatever the observer said. */
const IN_VIEW_FLIP_MS = 1200;
/** The longest a photograph is waited for before it uncovers anyway. */
const DECODE_CAP_MS = 600;
/** After this the stop is at rest and its arrival attributes are removed. */
const SETTLE_MS = 3000;

/** Attributes the system writes, all removed again on teardown. */
export const STOP_ATTRIBUTES = [
  "data-stop",
  "data-stop-item",
  "data-stop-draw",
  "data-stop-media",
  "data-stop-fade",
  "data-stop-ready",
  "data-stop-style",
] as const;
/** Custom properties the system writes inline. */
export const STOP_VARIABLES = ["--stop-i", "--stop-m", "--stop-r"] as const;

const ITEM = "[data-stop-item]";
/** How many arrival styles there are (data-stop-style 0 to 9, src/index.css). */
const STYLES = 10;

/**
 * May the arrival motion run on this page now? Not in the build's capture,
 * not for a reader who has asked for reduced motion, and only where the page
 * snaps (mandatorily, or on a blog article by proximity).
 */
export const stopMotionAllowed = (): boolean => {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  if (isPrerenderPass()) return false;
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return false;
  // A blog article scrolls freely (proximity), and its blocks arrive too
  // (Carlo, Oct 2026: every page).
  if (document.querySelector(".mhts-snap-proximity")) return true;
  return getComputedStyle(document.documentElement).scrollSnapType.includes("mandatory");
};

/** The page's stops, in document order: snap areas that start or end a screen. */
export const findStops = (selector: string): HTMLElement[] => {
  const out: HTMLElement[] = [];
  for (const el of document.querySelectorAll<HTMLElement>(selector)) {
    // The footer is a stop of its own (Carlo, Oct 2026: every stop, footers
    // too); nothing inside it is.
    if (el.tagName !== "FOOTER" && el.closest("footer")) continue;
    const cs = getComputedStyle(el);
    const align = (cs.scrollSnapAlign || "none").split(" ")[0];
    // On a blog article (proximity) and for the footer, a block is a stop
    // whether or not the page snaps to it.
    const free = el.tagName === "FOOTER" || !!el.closest(".mhts-snap-proximity");
    if ((align === "none" && !free) || cs.display === "none" || cs.display === "contents") continue;
    out.push(el);
  }
  return out;
};

const intersectsViewport = (el: HTMLElement) => {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight && r.height > 0;
};

const isRule = (el: Element | null): el is HTMLElement =>
  !!el &&
  el.tagName === "DIV" &&
  el.childElementCount === 0 &&
  el.classList.contains("bg-mhts-red") &&
  (el.classList.contains("h-0.5") || el.classList.contains("h-1"));

const isEyebrow = (el: Element | null): el is HTMLElement =>
  !!el && (el.tagName === "P" || el.tagName === "SPAN") && el.classList.contains("uppercase");

const isLede = (el: Element | null): el is HTMLElement =>
  !!el &&
  (el.tagName === "P" ||
    (el.tagName === "DIV" &&
      el.childElementCount > 0 &&
      Array.from(el.children).every((c) => c.tagName === "P")));

/** One page view of the system: arms, observes, and returns its teardown. */
export const startStopMotion = (selector: string): (() => void) => {
  if (!stopMotionAllowed()) return () => {};
  const html = document.documentElement;
  const written = new Map<HTMLElement, Set<string>>();
  const write = (el: HTMLElement, name: string, value = "") => {
    if (name.startsWith("--")) el.style.setProperty(name, value);
    else el.setAttribute(name, value);
    const names = written.get(el) ?? new Set<string>();
    names.add(name);
    written.set(el, names);
  };
  const erase = (el: HTMLElement, name: string) => {
    if (name.startsWith("--")) el.style.removeProperty(name);
    else el.removeAttribute(name);
  };

  const stops = findStops(selector);
  const stopSet = new Set(stops);
  const ownerOf = (el: Element) => {
    for (let n = el.parentElement; n; n = n.parentElement) if (stopSet.has(n as HTMLElement)) return n;
    return null;
  };
  const inItem = (el: Element, stop: Element) => {
    for (let n = el.parentElement; n && n !== stop; n = n.parentElement) if (n.hasAttribute("data-stop-item")) return true;
    return false;
  };
  // A box between the item and its stop that clips (a strip that scrolls
  // sideways on a phone, a card with overflow hidden): the item only fades.
  // The stop's own sections clip too, but with room around their content.
  const clipped = (el: Element, stop: Element) => {
    for (let n = el.parentElement; n && n !== stop; n = n.parentElement) {
      if (n.tagName === "SECTION") continue;
      if (n.classList.contains("mhts-snap-x")) return true;
      const cs = getComputedStyle(n);
      if (cs.overflowX !== "visible" || cs.overflowY !== "visible") return true;
    }
    return false;
  };

  // Each stop arrives its own way (data-stop-style, src/index.css), in page
  // order from an offset taken from the path, so no two neighbouring stops and
  // no two pages' first stops arrive alike.
  let offset = 0;
  for (const ch of window.location.pathname) offset = (offset * 31 + ch.charCodeAt(0)) % STYLES;

  const armed: HTMLElement[] = [];
  for (const stop of stops) {
    const mine = (el: Element) => ownerOf(el) === stop;

    // The base cascade, with no page edits: the first h2 of each band is the
    // title, the uppercase line just before it the eyebrow, a red rule after
    // it draws, and the paragraph after that is the lede. A heading already
    // inside a Reveal (or holding one) is left to it.
    const bands = new Set<Element>();
    for (const h2 of stop.querySelectorAll<HTMLElement>("h1, h2")) {
      let band: Element | null = h2.closest("section");
      if (!band || !stop.contains(band)) band = stop;
      if (bands.has(band) || !mine(h2)) continue;
      bands.add(band);
      if (h2.hasAttribute("data-stop-item") || inItem(h2, stop) || h2.querySelector(ITEM)) continue;
      const prev = h2.previousElementSibling;
      if (isEyebrow(prev) && !prev.hasAttribute("data-stop-item")) write(prev, "data-stop-item");
      write(h2, "data-stop-item");
      let next = h2.nextElementSibling;
      if (isRule(next)) {
        if (!next.hasAttribute("data-stop-draw")) write(next, "data-stop-draw", next.classList.contains("mx-auto") ? "center" : "left");
        next = next.nextElementSibling;
      }
      if (isLede(next) && !next.hasAttribute("data-stop-item") && !next.querySelector(ITEM)) write(next as HTMLElement, "data-stop-item");
    }
    // Any other red rule in the stop draws too.
    for (const rule of stop.querySelectorAll<HTMLElement>("div.bg-mhts-red")) {
      if (!isRule(rule) || rule.hasAttribute("data-stop-draw") || !mine(rule) || inItem(rule, stop)) continue;
      write(rule, "data-stop-draw", rule.classList.contains("mx-auto") ? "center" : "left");
    }

    // Photographs and before and after frames, left to right.
    let m = 0;
    for (const media of stop.querySelectorAll<HTMLElement>(".mhts-ba, [data-stop-media]")) {
      if (!mine(media)) continue;
      if (!media.hasAttribute("data-stop-media")) write(media, "data-stop-media");
      write(media, "--stop-m", String(Math.min(m++, MAX_INDEX)));
      write(media, "--stop-r", getComputedStyle(media).borderTopLeftRadius || "0px");
    }

    // A stop with no heading (a contact card and a map, the footer) still
    // arrives: the blocks of its layout come in one after another.
    if (!Array.from(stop.querySelectorAll("[data-stop-item]")).some(mine)) {
      let box: Element = stop;
      for (let k = 0; k < 4; k++) {
        const kids = Array.from(box.children).filter((c) => !c.classList.contains("absolute") && getComputedStyle(c).display !== "none");
        if (kids.length === 1 && kids[0].children.length) box = kids[0];
        else break;
      }
      for (const kid of Array.from(box.children) as HTMLElement[]) {
        if (kid.classList.contains("absolute") || kid.getBoundingClientRect().height < 2) continue;
        if (kid.hasAttribute("data-stop-media") || kid.querySelector(ITEM)) continue;
        write(kid, "data-stop-item");
      }
    }

    // Index everything in reading order. A rule draws with its title.
    let i = 0;
    for (const el of stop.querySelectorAll<HTMLElement>("[data-stop-item], [data-stop-draw]")) {
      if (!mine(el)) continue;
      if (el.hasAttribute("data-stop-draw") && !el.hasAttribute("data-stop-item")) {
        write(el, "--stop-i", String(Math.min(Math.max(i - 1, 0), MAX_INDEX)));
        continue;
      }
      write(el, "--stop-i", String(Math.min(i++, MAX_INDEX)));
      // An item holding a photograph lets the photograph do the moving.
      if (el.querySelector("[data-stop-media]") || clipped(el, stop)) write(el, "data-stop-fade");
    }

    write(stop, "data-stop-style", String((offset + armed.length) % STYLES));
    write(stop, "data-stop", "armed");
    armed.push(stop);
  }
  if (!armed.length) return () => {};
  html.setAttribute("data-stops", "");

  const timers = new Map<Element, number>();
  const away = new Set<Element>();
  const settles: number[] = [];
  let observer: IntersectionObserver | null = null;

  const uncover = (stop: HTMLElement) => {
    for (const media of stop.querySelectorAll<HTMLElement>("[data-stop-media]")) {
      if (ownerOf(media) !== stop) continue;
      const imgs = media.tagName === "IMG" ? [media as HTMLImageElement] : Array.from(media.querySelectorAll("img"));
      const decoded = Promise.all(imgs.map((img) => (typeof img.decode === "function" ? img.decode().catch(() => {}) : undefined)));
      const cap = new Promise((resolve) => window.setTimeout(resolve, DECODE_CAP_MS));
      Promise.race([decoded, cap]).then(() => {
        if (media.isConnected && stop.getAttribute("data-stop") === "in") write(media, "data-stop-ready");
      });
    }
  };

  const flip = (stop: HTMLElement) => {
    if (stop.getAttribute("data-stop") !== "armed") return;
    window.clearTimeout(timers.get(stop));
    timers.delete(stop);
    write(stop, "data-stop", "in");
    uncover(stop);
    // At rest: the stop looks exactly as it did before it was armed.
    settles.push(
      window.setTimeout(() => {
        // Already scrolled away and armed again: leave it armed.
        if (stop.getAttribute("data-stop") !== "in") return;
        erase(stop, "data-stop");
        stop.querySelectorAll<HTMLElement>("[data-stop-ready]").forEach((el) => erase(el, "data-stop-ready"));
      }, SETTLE_MS),
    );
  };

  const measure = (value: string) => {
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;height:${value}`;
    document.body.appendChild(probe);
    const h = probe.getBoundingClientRect().height;
    probe.remove();
    return h;
  };
  const top = Math.round(measure("var(--snap-header)"));
  const bottom = Math.round(measure("var(--snap-bottom)"));

  if (typeof IntersectionObserver !== "undefined") {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const stop = entry.target as HTMLElement;
          // A stop whose edge only touches the window (the next one, while
          // the reader rests on this one) counts as intersecting, with no
          // area: it is not in view.
          if (!entry.isIntersecting || entry.intersectionRect.height < 1) {
            window.clearTimeout(timers.get(stop));
            timers.delete(stop);
            away.delete(stop);
            // Out of view: armed again, so it plays every time it arrives
            // (Carlo, Oct 2026: "any time I scroll anywhere on the page").
            // Arming declares no transition, so it hides off screen at once.
            if (!entry.isIntersecting && stop.getAttribute("data-stop") !== "armed") {
              stop.querySelectorAll<HTMLElement>("[data-stop-ready]").forEach((el) => erase(el, "data-stop-ready"));
              write(stop, "data-stop", "armed");
            }
            continue;
          }
          const room = entry.rootBounds?.height ?? window.innerHeight;
          const need = 0.5 * Math.min(room, entry.boundingClientRect.height);
          // Mostly out of view but never quite gone (the stop above the
          // footer while the footer is the stop): it plays again when it
          // comes back, scrolling up as well as down (Carlo, Oct 2026).
          if (entry.intersectionRect.height < 0.3 * need && stop.getAttribute("data-stop") !== "armed") {
            away.add(stop);
            continue;
          }
          if (away.has(stop) && entry.intersectionRect.height >= need - 1) {
            away.delete(stop);
            stop.querySelectorAll<HTMLElement>("[data-stop-ready]").forEach((el) => erase(el, "data-stop-ready"));
            write(stop, "data-stop", "armed");
            requestAnimationFrame(() => requestAnimationFrame(() => flip(stop)));
            continue;
          }
          if (!timers.has(stop)) timers.set(stop, window.setTimeout(() => flip(stop), IN_VIEW_FLIP_MS));
          if (entry.intersectionRect.height >= need - 1) flip(stop);
        }
      },
      {
        rootMargin: `-${top}px 0px -${bottom}px 0px`,
        threshold: Array.from({ length: 21 }, (_, k) => k / 20),
      },
    );
    armed.forEach((stop) => observer?.observe(stop));
    // Landing on a page, by a link or from anywhere else: the stops already
    // on screen play too (Carlo, Oct 2026), two frames after they are armed.
    const onScreen = armed.filter(intersectsViewport);
    requestAnimationFrame(() => requestAnimationFrame(() => onScreen.forEach(flip)));
  } else {
    armed.forEach(flip);
  }

  const onFocus = (e: FocusEvent) => {
    const target = e.target as Element | null;
    if (!target?.closest) return;
    const stop = target.closest<HTMLElement>('[data-stop="armed"]');
    if (stop) flip(stop);
  };
  document.addEventListener("focusin", onFocus);

  // Reduced motion switched on, or the window crossing between phone and
  // desktop: everything goes back to rest at once.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const wide = window.matchMedia("(min-width: 768px)");
  let done = false;
  const teardown = () => {
    if (done) return;
    done = true;
    observer?.disconnect();
    timers.forEach((t) => window.clearTimeout(t));
    settles.forEach((t) => window.clearTimeout(t));
    document.removeEventListener("focusin", onFocus);
    reduce.removeEventListener?.("change", teardown);
    wide.removeEventListener?.("change", teardown);
    html.removeAttribute("data-stops");
    written.forEach((names, el) => names.forEach((name) => erase(el, name)));
    written.clear();
  };
  reduce.addEventListener?.("change", teardown);
  wide.addEventListener?.("change", teardown);
  return teardown;
};

/**
 * Where an element sits at rest, top and bottom, whatever the arrival motion
 * is doing to it right now. getBoundingClientRect counts translate and scale,
 * so anything that decides from positions while a stop arrives (the phone's
 * bottom bar, which waits while something sits where it would show) measures
 * with this instead and decides exactly as it would on a still page.
 */
export const restingBox = (el: Element, rect: { top: number; bottom: number } = el.getBoundingClientRect()) => {
  let { top, bottom } = rect;
  if (!document.documentElement.hasAttribute("data-stops")) return { top, bottom };
  // Undo each lift and scale from the inside out. Each is about the centre
  // of the element it is on (transform-origin is left alone vertically).
  for (let n: Element | null = el; n; n = n.parentElement) {
    if (n.hasAttribute("data-stop-item") || n.hasAttribute("data-stop-media") || (n === el && n.tagName === "IMG")) {
      const cs = getComputedStyle(n);
      const dy = cs.translate && cs.translate !== "none" ? parseFloat(cs.translate.split(" ")[1] ?? "0") || 0 : 0;
      const sy = cs.scale && cs.scale !== "none" ? parseFloat(cs.scale.split(" ").pop() ?? "1") || 1 : 1;
      if (dy || sy !== 1) {
        const r = n.getBoundingClientRect();
        const c = (r.top + r.bottom) / 2;
        top = c - dy + (top - c) / sy;
        bottom = c - dy + (bottom - c) / sy;
      }
    }
    if (n.hasAttribute("data-stop")) break;
  }
  return { top, bottom };
};
