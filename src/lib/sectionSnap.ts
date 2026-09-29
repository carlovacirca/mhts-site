// Full-screen section scroll on the homepage, batch 4b.
//
// THE SWITCH. true: on a phone and a desktop each homepage section fills one
// screen and a scroll moves to the next one. false: the homepage scrolls
// exactly as it did in batch 4a. Nothing else needs to change either way.
export const SECTION_SNAP = true;

// How it works, so it can be reasoned about without reading the CSS:
//
//   - CSS scroll snap only. No JavaScript moves the page and no library is
//     involved. The homepage wrapper carries SNAP_PAGE_CLASS when the switch is
//     on, and src/index.css turns that into `scroll-snap-type: y mandatory` on
//     the page scroller (html) and `scroll-snap-align: start` on every section
//     carrying SNAP_SECTION_CLASS. Leaving the homepage unmounts the wrapper,
//     so no other page ever snaps.
//   - Every rule sits inside `@media (prefers-reduced-motion: no-preference)`,
//     so for a reader who has asked for reduced motion it is off completely:
//     no snapping and no full-screen sizing.
//   - Sections are sized with 100svh less the sticky header and, on a phone,
//     the bottom Call and Book bar. scroll-padding keeps the header, the bar
//     and the cookie banner (its live height, --mhts-cookie-h) off the content.
//   - A section taller than the screen is still a single snap area, and the
//     browser lets the reader scroll through it freely. Nothing is trapped.
//   - All content is in the page from the first byte, pre-rendered as before.
//     Nothing is added on scroll.
export const SNAP_PAGE_CLASS = "mhts-snap-page";
export const SNAP_SECTION_CLASS = "mhts-snap-section";
/** The first section: it also covers the thin contact bar above the header. */
export const SNAP_HERO_CLASS = "mhts-snap-hero";

/** The class for the homepage wrapper. Empty when the switch is off. */
export const snapPageClass = (on: boolean = SECTION_SNAP): string => (on ? SNAP_PAGE_CLASS : "");
