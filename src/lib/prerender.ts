// Was this page served as pre-rendered HTML, and is React still on its first
// render of it?
//
// Every file scripts/prerender.mjs writes carries data-prerendered="1" on
// <html>. The dev server's index.html does not, so in `npm run dev` all of
// this is inert.
//
// Why it matters: the pre-rendered HTML is captured after every entry and
// scroll animation has finished, so it shows the page at rest. When React
// takes over it must render the same thing. If the motion components replayed
// their entry animations the reader would see finished content fade out to
// nothing and fade back in. See src/lib/motion.tsx.

const PRERENDERED_ATTRIBUTE = "data-prerendered";

const detect = (): boolean => {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute(PRERENDERED_ATTRIBUTE) === "1";
};

const prerendered = detect();

/** True if the HTML this page started from was pre-rendered at build time. */
export const wasPrerendered = (): boolean => prerendered;

let firstPaint = prerendered;

/**
 * True until React has finished mounting the route the pre-rendered HTML was
 * already showing. Read during render, so it is deliberately a plain variable
 * rather than state: nothing needs to re-render when it flips, because the
 * only thing that reads it is a mount-time prop.
 */
export const isFirstPaint = (): boolean => firstPaint;

/** Called once from App after the first mount. Later routes animate normally. */
export const endFirstPaint = (): void => {
  firstPaint = false;
};

/** Test helper. Not used by the app. */
export const resetFirstPaintForTests = (value: boolean): void => {
  firstPaint = value;
};
