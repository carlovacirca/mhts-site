// Was this page served as pre-rendered HTML, and is React still on its first
// render of it?
//
// Every file scripts/prerender.mjs writes carries data-prerendered="1" on
// <html>. The dev server's index.html does not, so in `npm run dev` all of
// this is inert.
//
// Why it matters: the pre-rendered HTML shows each page at rest, with no entry
// animation ever having run. When React takes over it must render the same
// thing. If the motion components played their entry animations the reader
// would see finished content fade out to nothing and fade back in.
// See src/lib/motion.tsx.

const PRERENDERED_ATTRIBUTE = "data-prerendered";
/** Set by scripts/prerender.mjs before the bundle loads, in its own browser. */
const PRERENDER_PASS_FLAG = "__MHTS_PRERENDER__";

interface PrerenderWindow extends Window {
  [PRERENDER_PASS_FLAG]?: boolean;
}

// Two separate things, both of which mean "do not play the entry animations".
//
//  - servedPrerendered: a visitor has loaded a file the build wrote.
//  - prerenderPass: we are inside the build's own headless browser.
//
// The second matters because the build captures the DOM as HTML. If the
// animations ran during the capture, whichever ones happened not to have
// finished would be frozen into the file at opacity 0, invisible to anyone
// without JavaScript and popping into view when React took over. Turning them
// off for the capture makes the output the resting page every time, with no
// dependence on how fast the machine doing the build happens to be.
const prerenderPass =
  typeof window !== "undefined" && (window as PrerenderWindow)[PRERENDER_PASS_FLAG] === true;

const servedPrerendered =
  typeof document !== "undefined" &&
  document.documentElement.getAttribute(PRERENDERED_ATTRIBUTE) === "1";

/** True if this page's HTML was pre-rendered, or is being pre-rendered now. */
export const wasPrerendered = (): boolean => prerenderPass || servedPrerendered;

let firstPaint = prerenderPass || servedPrerendered;

/**
 * True until React has finished mounting the route the pre-rendered HTML was
 * already showing. Read during render, so it is deliberately a plain variable
 * rather than state: nothing needs to re-render when it flips, because the
 * only thing that reads it is a mount-time prop.
 */
export const isFirstPaint = (): boolean => firstPaint;

/**
 * Called once from App after the first mount. Later routes animate normally.
 *
 * A no-op during the build's capture. The three alias URLs redirect in the
 * browser, so rendering one is a client-side navigation and the page it lands
 * on would otherwise animate in and be captured part way through.
 */
export const endFirstPaint = (): void => {
  if (prerenderPass) return;
  firstPaint = false;
};

/** Test helper. Not used by the app. */
export const resetFirstPaintForTests = (value: boolean): void => {
  firstPaint = value;
};
