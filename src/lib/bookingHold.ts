// No one scrolls past the booking stop without seeing it (Carlo, Oct 2026).
//
// On a phone scroll-snap-stop: always (mhts-snap-must) is enough: one swipe
// is one scroll and cannot pass the stop. A mouse wheel or a trackpad flick
// on a laptop is many small scrolls, and a fast one sails past any stop. So
// while a wheel scroll heads for a booking stop from up to two and a half
// screens away, the snap positions beyond the stop are switched off
// (data-snap-hold, src/index.css): the browser's own snapping then has
// nowhere to land but the stop. Once the reader has rested on it for a
// moment they are switched back on, and the next scroll moves on as usual.
// Nothing here moves the page; only the browser's scroll snap does.
//
// Only wheel scrolls are held. A link to a place further down, the keyboard
// (which already respects scroll-snap-stop), a scrollbar drag or a scroll
// from code is never held, and any of them releases a hold at once.

const DWELL_MS = 650;
/** A hold never outlives this, whatever happens. */
const MAX_HOLD_MS = 4000;
const RANGE = 2.5;

const SNAP_AREAS = "main section, main .mhts-snap-desk, main .mhts-snap-phone, body footer, [data-snap-guides] > *";

const headerOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

export const startBookingHold = (): (() => void) => {
  // No snapping (reduced motion, a blog article): nothing to hold.
  if (!getComputedStyle(document.documentElement).scrollSnapType.includes("mandatory")) return () => {};
  const stops = Array.from(document.querySelectorAll<HTMLElement>(".mhts-snap-must"));
  if (!stops.length) return () => {};

  let held: HTMLElement[] = [];
  let target: HTMLElement | null = null;
  const dwelled = new Set<HTMLElement>();
  let dwellTimer = 0;
  let maxTimer = 0;
  let restTimer = 0;

  const stopY = (stop: HTMLElement) => stop.getBoundingClientRect().top + window.scrollY - headerOffset();

  const release = () => {
    held.forEach((el) => el.removeAttribute("data-snap-hold"));
    held = [];
    target = null;
    window.clearTimeout(dwellTimer);
    window.clearTimeout(maxTimer);
  };

  const hold = (stop: HTMLElement, down: boolean) => {
    const y = stopY(stop);
    const pad = headerOffset();
    for (const el of document.querySelectorAll<HTMLElement>(SNAP_AREAS)) {
      if (el === stop || stop.contains(el) || el.contains(stop)) continue;
      const align = getComputedStyle(el).scrollSnapAlign;
      if (!align || align === "none") continue;
      const top = el.getBoundingClientRect().top + window.scrollY - pad;
      if (down ? top > y + 2 : top < y - 2) {
        el.setAttribute("data-snap-hold", "");
        held.push(el);
      }
    }
    target = stop;
    maxTimer = window.setTimeout(release, MAX_HOLD_MS);
  };

  const onWheel = (e: WheelEvent) => {
    if (target) {
      // Still moving on the stop: the dwell starts again from now.
      window.clearTimeout(dwellTimer);
      return;
    }
    if (!e.deltaY || e.ctrlKey) return;
    const down = e.deltaY > 0;
    const H = window.innerHeight;
    const now = window.scrollY;
    for (const stop of stops) {
      if (dwelled.has(stop)) continue;
      const y = stopY(stop);
      const ahead = down ? y - now : now - y;
      if (ahead > 2 && ahead < RANGE * H) {
        hold(stop, down);
        return;
      }
    }
  };

  const onScroll = () => {
    window.clearTimeout(restTimer);
    restTimer = window.setTimeout(() => {
      const H = window.innerHeight;
      for (const stop of stops) {
        if (Math.abs(window.scrollY - stopY(stop)) > 3 * H) dwelled.delete(stop);
      }
      if (!target) return;
      if (Math.abs(window.scrollY - stopY(target)) <= 2) {
        const stop = target;
        window.clearTimeout(dwellTimer);
        dwellTimer = window.setTimeout(() => {
          dwelled.add(stop);
          release();
        }, DWELL_MS);
      }
    }, 140);
  };

  // Anything that is not a wheel scroll lets go at once.
  const letGo = () => {
    if (target) release();
  };

  window.addEventListener("wheel", onWheel, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", letGo);
  window.addEventListener("pointerdown", letGo);
  window.addEventListener("hashchange", letGo);
  window.addEventListener("popstate", letGo);
  return () => {
    release();
    window.clearTimeout(restTimer);
    window.removeEventListener("wheel", onWheel);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("keydown", letGo);
    window.removeEventListener("pointerdown", letGo);
    window.removeEventListener("hashchange", letGo);
    window.removeEventListener("popstate", letGo);
  };
};
