/**
 * Where a swipeable strip's cards line up: its scroll-padding, the page's
 * gutter on a phone (.mhts-snap-x in src/index.css), 0 elsewhere. A strip that
 * moves on by itself scrolls a card to here, not to the screen's edge.
 */
export const stripGutter = (track: HTMLElement): number =>
  parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;
