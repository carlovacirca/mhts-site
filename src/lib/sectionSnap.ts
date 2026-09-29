// Section scroll, batch 4b, extended in the batch 4b fixes.
//
// THE SWITCH. true: on a phone every page scrolls one section per screen, and
// on a desktop the homepage does. false: every page scrolls exactly as it did
// in batch 4a, at every width. Nothing else needs to change either way.
export const SECTION_SNAP = true;

// How it works, so it can be reasoned about without reading the CSS:
//
//   - CSS scroll snap only. No JavaScript moves the page and no library is
//     involved. When the switch is on, Layout's <main> carries SNAP_SITE_CLASS
//     and the homepage wrapper carries SNAP_PAGE_CLASS; src/index.css turns
//     those into `scroll-snap-type` on the page scroller (html).
//   - Desktop (md and up): the homepage only, `y mandatory`, every section
//     carrying SNAP_SECTION_CLASS is a stop. Exactly 4b's behaviour.
//   - Phone (below md): every page, `y mandatory`. Each page's own top-level
//     <section>s are stops and fill one screen, as are blocks marked
//     SNAP_PHONE_CLASS (a tall section split in two). SNAP_STOP_CLASS adds a
//     stop inside a long list without sizing anything.
//   - Blog articles (SNAP_PROXIMITY_CLASS on the page) use `y proximity`, with
//     stops only at the hero and each h2 (SNAP_POINT_CLASS), so reading is
//     never pulled mid-paragraph.
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
export const SNAP_SITE_CLASS = "mhts-snap-site";
export const SNAP_PAGE_CLASS = "mhts-snap-page";
export const SNAP_SECTION_CLASS = "mhts-snap-section";
/** The homepage's first section: it also covers the thin contact bar above the header. */
export const SNAP_HERO_CLASS = "mhts-snap-hero";
/** A block that is its own one-screen stop on a phone only (half of a split section). */
export const SNAP_PHONE_CLASS = "mhts-snap-phone";
/** A stop inside a long section on a phone, with no sizing. */
export const SNAP_STOP_CLASS = "mhts-snap-stop";
/** Blog articles: proximity instead of mandatory. */
export const SNAP_PROXIMITY_CLASS = "mhts-snap-proximity";
/** A stop in a proximity page: the hero and each h2. */
export const SNAP_POINT_CLASS = "mhts-snap-point";
export const SNAP_POINT_TOP_CLASS = "mhts-snap-point-top";

/** The class for the homepage wrapper. Empty when the switch is off. */
export const snapPageClass = (on: boolean = SECTION_SNAP): string => (on ? SNAP_PAGE_CLASS : "");

/** The class for Layout's <main>. Empty when the switch is off. */
export const snapSiteClass = (on: boolean = SECTION_SNAP): string => (on ? SNAP_SITE_CLASS : "");

/** The class for a blog article's wrapper. Empty when the switch is off. */
export const snapProximityClass = (on: boolean = SECTION_SNAP): string => (on ? SNAP_PROXIMITY_CLASS : "");
