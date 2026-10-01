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
//   - Phone (below md): every page, `y mandatory`, one screen per stop. A
//     page's own top-level <section>s are screens, and so are blocks marked
//     SNAP_PHONE_CLASS: a long section split into screens (the section then
//     carries SNAP_SPLIT_CLASS), or short sections grouped into one screen
//     (a wrapper that is display:contents from md up, so the desktop is
//     untouched). Content sits from the top of its screen.
//   - The rule for a phone screen (Carlo, after the 4b fixes preview): a
//     full, sensible screen. A heading shares its screen with what it heads,
//     a quote or a short block joins the screen next to it, content fills at
//     least 70% of the screen and no screen is more than 10% taller than it.
//     src/test/snapScreens.test.ts measures every route in a browser and
//     holds this; scripts/snap-screens.mjs prints the numbers. There are no
//     small stops inside a screen any more: each stop is a whole screen.
//   - A short last band of links can share the footer's screen instead
//     (SNAP_BEFORE_FOOTER_CLASS).
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
/** The homepage's first section: it fills the first screen under the header. */
export const SNAP_HERO_CLASS = "mhts-snap-hero";
/**
 * A block that is its own one-screen stop on a phone only: one screen of a
 * split section, or a wrapper grouping short sections into one screen.
 */
export const SNAP_PHONE_CLASS = "mhts-snap-phone";
/** A section whose phone screens (SNAP_PHONE_CLASS) are the stops, so the section itself is not one. */
export const SNAP_SPLIT_CLASS = "mhts-snap-split";
/** A short last band (related links) that shares the footer's screen on a phone instead of being a screen. */
export const SNAP_BEFORE_FOOTER_CLASS = "mhts-snap-before-footer";
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
