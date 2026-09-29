# Batch 4b report: every other page, and full-screen section scroll on the homepage

Branch `design/batch-4b`, cut from `design/batch-4a` at `e7bb17b` (confirmed before starting). Built 29 September 2026. Nothing was merged and no pull request was opened. `main`, `fix/batch-3-prerender` and `design/batch-4a` were not touched.

## In one paragraph

Every page that 4a did not redesign now has its own layout on the 4a design system (the tokens in `src/index.css` and `tailwind.config.ts`, the three reds, sand, stone, deep, the heading weights, `src/lib/motion.tsx` for all motion, Call beside every Book, the sticky bottom bar). The 18 treatment pages share one new layout with a studio photograph beside each block of text, one key fact per block quoted word for word from that block, and related treatment cards at the end. On the homepage each section now fills exactly one screen at 390x844 and at 1280x800, and a scroll moves to the next one. It is CSS scroll snap only, behind one constant, and off completely for reduced motion. Every URL, title, meta description, h1, canonical, og tag, schema block and the sitemap are byte-identical to the 4a build on all 64 pages. No word of copy was removed or changed except the three "Men's Hair to Stay" casing fixes. No new dependencies.

## The switch

`src/lib/sectionSnap.ts`, line 6:

```ts
export const SECTION_SNAP = true;
```

Set it to `false` and the homepage scrolls exactly as it did in 4a. Nothing else needs to change. With it on, only the homepage snaps: the CSS keys off a class the homepage wrapper renders (`html:has(.mhts-snap-page)`), so leaving the homepage turns it off, with no JavaScript involved.

## 1. The redesigned pages

Each page type has its own shape and its own motion, all through `src/lib/motion.tsx` (`Reveal` gained a `from` option: up, left, right, scale). None of it runs for a reader with reduced motion or during the pre-render.

| Page | Layout | Motion |
|---|---|---|
| 18 treatment pages (`src/components/mhts/ServicePage.tsx`) | Category pages keep their full-bleed hero photo; sub-service pages get a split hero with a framed photo from md up. "What It Costs" (4 category pages) sits beside its free consultation note instead of in a narrow column. "What is it" and "Who it's for" are text beside a photograph, alternating sides, each with one key fact pulled out on a card over the photo. Benefits on the dark band with the first benefit set large on red. The process as a numbered timeline on a red-dotted rule, heading sticky beside it. FAQ with the heading beside the questions. Related treatment cards at the end: the sibling sub-services with photographs, three across at most, then the other three treatments. | Photographs slide in from the side they sit on; text rises; timeline steps stagger |
| `/services` | Four large photo tiles, two by two, each listing its sub-services as links (it linked 4 pages; it now links all 18) | Tiles scale in |
| `/areas-serviced` | Dark header with the studio as the centre of a ring motif, then the twelve towns as numbered pins, Amersham (the studio's town) first in red | Cards rise, staggered per row |
| Area pages (`AreaPage.tsx`, 12) | Split hero with a drawn journey card (the reader's town, a dashed line, the studio); intro beside a studio photograph with the address card; the four treatments as photo cards; "Why choose" in two ruled columns; the free consultation on the dark band; FAQ beside its heading | Journey card slides in from the right |
| `/how-it-works` | A red rail down the middle with the four steps hung off it, photograph on one side and words on the other, swapping sides; rail at the left edge on a phone. Trust chips on the hero band, "Why choose" on the dark band, service options as three link lists | Photos and text slide towards the rail from opposite sides |
| `/faq` | A reference layout: short dark header, then a rail (search, category filter, Book and Call) that stays beside the numbered questions on a desktop | Questions fade in as before |
| `/gallery` | A gallery wall: the pairs on the deep dark with Before and After labels on the photos, the first pair wide; the three category texts in three columns | Pairs scale in |
| `/blog` | A light editorial masthead with the search beside the title, categories as tabs, the newest post as a cover story with its words over the photograph, then the grid and a restyled sidebar | Cards lift on hover |
| Blog post layout | Title card overlapping the foot of the hero photo, the article at a reading width (about 70 characters), h2s with a red rule, contents box and sources on sand, related articles on their own band, a red reading progress bar. Post content untouched | Unchanged |
| `/book` | Dark header with Book and Call; the prices beside their note; the calendar (or its panel) on white; the five appointment types three across instead of five cramped in a row; "Prefer to Call?" as a red band with the number on a white button | Appointment cards rise |
| `/contact` | A switchboard: studio photograph beside the heading, the phone as the first and largest way in (red card), then email and the visit; opening hours now beside the map; towns as chips; "Why choose" on the dark band | Photo slides in |
| `/privacy-policy` | A document: quiet sand header, a contents list that stays beside the text on a desktop, sections in a reading column with a rule between each | None |
| 404 | A large outlined 404 on the dark band, the six ways back as tiles, Book and Call | None |

Call now also sits beside Book on the four places that still had Book alone: `/areas-serviced`, every area page hero, the privacy policy CTA and the `/book` appointment types button.

### Rules held

- **"What It Costs" wording** is exactly as it was, every word, on all five places `ServicePricing` is used. Layout only.
- **Key facts** are quoted verbatim from the text beside them, and a test (`src/test/batch4b.test.tsx`) fails if any of the 36 is not. They repeat a line of the body, so they are `aria-hidden` rather than read out twice.
- **Photographs**: only files already in `src/assets`; none generated. The map is in `src/data/servicePhotos.ts`. Images showing AI faces were not used on any page 4b designed. Two-photo composites are flagged `wide` and never cropped to a portrait frame.
- **Form field edges**: `--input` is now stone-deep `#7A6E63`, 4.96:1 on white, 4.75:1 on the page background, 4.41:1 on sand. `--border`, the default edge of everything else shadcn draws, is `#918578`, 3.60:1 on white, 3.45:1 on the page background, 3.21:1 on sand. Both were `#E5DED4`, 1.3:1.

## 2. Full-screen section scroll on the homepage

### How it works

- `scroll-snap-type: y mandatory` on the page scroller (`html`), `scroll-snap-align: start` on each section, `scroll-snap-align: end` on the footer so the bottom of the page is always a stop.
- Sections are sized `min-height: calc(100svh - header - bottom bar)`: 100svh, never 100vh. The hero also covers the thin contact bar above the header, so it fills the first screen exactly and its snap point is the very top of the page.
- `scroll-padding-top` is the sticky header (81px phone, 97px from md). `scroll-padding-bottom` is the bottom Call and Book bar on a phone (the same 4.5rem Layout already reserves, a constant, so nothing shifts when the bar shows or hides) plus the cookie banner's live height while it is open (`--mhts-cookie-h`, published by the banner, never baked into the pre-render).
- A section taller than one screen stays one snap area, and the browser lets the reader scroll through it freely. Nothing is trapped.
- Every rule is inside `@media (prefers-reduced-motion: no-preference)`. With reduced motion there is no snapping and no one-screen sizing at all.
- Pre-rendered HTML carries every section and every word; nothing is added on scroll.

### What changed to make each section fit

| Section | Change |
|---|---|
| Before and after | Tighter heading; one pair per swipe on a phone with the next peeking; three across in a narrower row on a desktop |
| Google reviews | New `compact` option: smaller summary card and controls. One review per swipe (`snap-always`), the next peeking |
| Treatments | Was a 2x2 grid on a phone; now a swipeable strip, one card per swipe with the next peeking; four across on a desktop |
| Trust chips and maintenance | Were two thin bands; now one screen on the dark band |
| FAQ | Already four questions with "View all FAQs"; spacing tightened |
| Blog | Swipeable strip, one post per swipe, excerpt clamped to two lines |
| Book | The old combined booking section (1,757px on a phone) is now two screens. This one holds the heading and the booking panel (new `compact` option) or the calendar |
| Contact | The contact card, with the opening hours folded into it, and the map (new `compact` option shortens the drawing on a phone) |
| Closing CTA | Unchanged words, now also carrying the "Serving Amersham, Chesham…" areas line, which moved from the old booking section |

Every internal link the 4a homepage had is still on it, and every anchor other pages link to (`#mhts-gallery`, `#mhts-reviews`, `#mhts-services`, `#mhts-book`, `#mhts-contact`, `#mhts-areas`) still exists. A test holds both.

### Section heights, before (4a) and after (4b)

Measured on the pre-rendered builds, cookies declined, in Chromium. "One screen" is 691px on the phone (844 less the 81px header and the 72px bottom bar) and 703px on the desktop (800 less the 97px header); the hero's is 735 and 675 because it also covers the 28px contact bar.

**390x844**

| Section | 4a | 4b snap on | 4b snap off | 4b content |
|---|---|---|---|---|
| Hero | 608 | **735** (one screen) | 608 | fits |
| Before and after | 736 | **691** | 629 | 549 |
| Reviews | 811 | **691** | 673 | 593 |
| Treatments | 932 | **691** | 573 | 493 |
| Trust chips (4a) | 262 | merged below | | |
| Maintenance / chips + maintenance | 378 | **691** | 576 | 496 |
| FAQ | 628 | **691** | 508 | 428 |
| Blog | 866 | **691** | 647 | 567 |
| Book and contact (4a) / Book | 1,757 | **691** | 685 | 653 |
| Contact | (in the above) | **691** | 685 | 637 |
| Closing CTA | 374 | **691** | 515 | 403 |
| **Whole page** | **8,708** | **8,310** | **7,455** | |

**1280x800**

| Section | 4a | 4b snap on | 4b snap off | 4b content |
|---|---|---|---|---|
| Hero | 576 | **675** (one screen) | 576 | fits |
| Before and after | 846 | **703** | 649 | 553 |
| Reviews | 744 | **703** | 624 | 528 |
| Treatments | 667 | **703** | 613 | 517 |
| Trust chips (4a) | 134 | merged below | | |
| Maintenance / chips + maintenance | 250 | **703** | 352 | 256 |
| FAQ | 592 | **703** | 508 | 412 |
| Blog | 830 | **703** | 681 | 585 |
| Book and contact (4a) / Book | 1,321 | **703** | 599 | 551 |
| Contact | (in the above) | **703** | 515 | 419 |
| Closing CTA | 306 | **703** | 425 | 297 |
| **Whole page** | **6,852** | **7,588** | **6,127** | |

"Snap off" is the same build with reduced motion, which is exactly what `SECTION_SNAP = false` renders. "Content" is the section's content without its padding: all ten fit inside one screen at both sizes, the tightest being Book on a phone (653 of 691).

Two cases where a section can be taller than a screen, both handled by free scrolling inside the section: the Book section once cookies are accepted (the Trafft calendar is tall), and an FAQ answer opened on a phone.

**The cookie banner.** While it is open on a phone it is 178px, which leaves 513px of screen, and five sections have up to 653px of content. At the moment such a section snaps its last lines sit under the banner. Each section grows by the banner's height while it is open, so a short scroll reveals them and snap holds that position; I checked all ten at both sizes and every line can be brought clear. On a desktop the banner is 79px and only the blog section's last line starts under it. Once the banner is answered this goes away.

### Keyboard, anchors, find, back (snap on)

28 of 28 checks pass at 390x844 and 28 of 28 at 1280x800, in full Chromium on the pre-rendered build:

- Space, Page Down, Arrow Down (twice), Page Up and Shift+Space each move and land exactly on a section under the header. PageDown from the top lands on 763, 1454, 2145 … on a phone (each section top less 81) and 703, 1406, 2109 … on a desktop, with no stray stops.
- End reaches the very bottom (the footer); Home returns to the top.
- Tab through every focusable element in the homepage sections (62 on a phone, 50 on a desktop): every one is visible when focused, none under the header or the bottom bar.
- Loading `/#mhts-book`, `#mhts-reviews`, `#mhts-gallery`, `#mhts-services`, `#mhts-contact` and `#mhts-areas`: the target is in view below the header.
- Clicking the hero's "Google reviews" and Book anchors lands the section exactly under the header. Browser back after an anchor jump returns to the previous position. `/#mhts-gallery` from How It Works lands on the gallery; back to How It Works, that page does not snap.
- Find in page (`window.find`) for five phrases in five sections: found and visible after the snap settles.
- Reduced motion: `scroll-snap-type` is none, sections are not snap targets and not one-screen tall; Page Down scrolls a plain page.
- JavaScript off: all ten sections and all their words are in the pre-rendered HTML, and the snap still works because it is CSS.

Two defects were found by these checks and fixed before this report:
1. On a desktop the strips stop being scrollers, and their cards' `snap-start` then made them stops on the page (Page Down landed at 952, 2324 and 4391). The cards drop their snap point at the breakpoints where the row stops scrolling (`md:snap-align-none`).
2. A jump to `#mhts-areas`, which sits inside the closing screen, was pulled to the footer's end and left the anchor off screen (top at -156 on a phone). Ids inside a snap section carry a half-screen scroll margin, so the nearest stop is the section that holds them.

## 3. The 4a sticky bottom bar fix

Carlo's report, confirmed: on a phone the hidden bar was 21px tall, not 0, so a strip with the tops of the Call and Book buttons showed at the foot of every page before the hero had scrolled away. A 0fr grid row can only shrink its child to the child's own padding and border, and the child carried `py-2.5` and `border-t`. The padding and border now live on an inner wrapper; the collapsing child has `min-h-0`, `overflow-hidden` and no padding or border. Measured at 390x844 on `/hair-systems`: **21px in the 4a build, 0px now**.

Two tests hold it:
- `StickyMobileCTA.test.tsx`, "measures 0px tall when collapsed": in `npm test`. jsdom does no layout, so it adds up what the collapsing row can never shrink below (its padding and border) and requires 0, plus `min-h-0`.
- A real measurement in the pre-render (`scripts/prerender.mjs`): Chromium opens `/`, `/hair-systems` and `/blog` at 390x844 and fails the build if the collapsed bar is not 0px. It lives there, not in `npm test`, because CI runs the tests before it installs Chromium.

Fixing the strip exposed a layout-shift cost that the strip had been hiding, and two more changes deal with it. Measured on a phone first visit, scrolled to the bottom (throttled, as in section 5):

| Version of the bar | Phone layout shift |
|---|---|
| 4a (21px strip, height animated) | 0.0142 |
| Strip fixed, height still animated | 0.0200 |
| Strip fixed, row opens in one step | 0.0239 |
| **Strip fixed, bar out of the stack's flow (shipped)** | **0** |

The cause: the bar and the cookie banner share one fixed stack at the foot of the screen, and opening the bar raised the stack's top edge above an open banner, which the browser counts as a shift. 4a's version grew only 48px (from the 21px strip), so it scored less. The bar now sits on top of the stack (`absolute bottom-full`) instead of in its flow: it still opens directly above the banner and never over it, the stack itself never moves, and the bar grows from 0px, which does not count. The buttons slide up into it by a transform (the existing `bar-in` keyframe), which does not count either and is off for reduced motion. The collapse method is the one asked for: the collapsing child has `min-h-0` and no padding or border.

## 4. What stayed identical

Compared file by file, all 64 pre-rendered pages, 4a build against 4b build, both built clean:

| Check | Result |
|---|---|
| Page list | identical (64) |
| `<title>` | 0 differences |
| Every `<meta>` (description, og:*, twitter:*, robots) | 0 differences |
| Canonical | 0 differences |
| JSON-LD (all blocks, parsed and compared) | 0 differences |
| h1 | 0 differences |
| `<html>` attributes | 0 differences |
| `sitemap.xml`, `robots.txt`, `_redirects`, `_headers` | identical |
| `src/content`, blog post files | untouched (`git diff` empty) |

**Visible words**, compared as a bag of words per page between the two builds: **0 words removed on any page**. The homepage's words are identical. What was added: Call button labels where Book stood alone; the related-treatment names and one-liners from `src/data/treatments.ts` on the 18 treatment pages; the sub-service names on `/services` (as links, plus a screen-reader-only "about [treatment]" on its four "Learn more" links); step and pin numbers; the privacy policy's contents list (its own headings); the studio address repeated on area pages; the 404 numeral; and the casing fix. The three "Men's Hair to Stay" left in the 4a source (on `/hair-systems`, `/hair-systems/non-surgical-hair-replacement` and `/scalp-micropigmentation/smp-touch-up-session`, each split across a line break, which is why 4a's search missed them) now read "Men's Hair To Stay".

Heading levels changed in two places, never the h1: the FAQ questions are h2 (they were h3 straight after the h1) and the FAQ's inline booking band is h3 (was h4). Both fix Lighthouse `heading-order`.

A trap worth knowing, recorded in AUTOMATION.md: a build run after `npm run dev` or `npm test` reads vite-imagetools' cache and writes every JPEG as `.jpeg` instead of `.jpg`, which changes every `og:image` URL. My first 4b build did exactly that. CI builds from a clean checkout and is unaffected; locally, `rm -rf node_modules/.cache/imagetools` before a build you are going to compare. Every figure in this report is from clean builds.

## 5. Checks

| Check | 4a | 4b |
|---|---|---|
| `npm test` | 128 of 128 | **175 of 175** (47 new) |
| `npm run lint` | 14 problems (3 errors, 11 warnings) | 14, the same 14, none new |
| Pre-render | 64 pages | **64 pages**, opacity guard green (0 elements with inline opacity below 1), new collapsed-bar guard green |
| Sitemap URLs 200 with no redirect, local Cloudflare Pages emulator | 60 of 60 | **60 of 60**; unknown URL and unpublished post 404 |
| Consent | 32 of 32 | **64 of 64 identical to 4a, 0 rule failures** (below) |
| Contrast AA | 25 of 25 | **46 of 46** (21 new pairs, below) |
| New dependencies | 0 | **0** (`package.json` and the lockfile unchanged) |

**Tests added** (`src/test/batch4b.test.tsx` and `StickyMobileCTA.test.tsx`):
- The switch: one constant, true in this branch; maps to the homepage class and to nothing when off; the homepage renders in snap mode with every section a snap section and the hero marked; no other page carries the class; the CSS uses `y mandatory` on the page scroller, `start` on sections, 100svh (and no 100vh anywhere in the snap block), and scroll-padding for the header, the bar and the cookie banner.
- Reduced motion: every `scroll-snap-type`, `scroll-snap-align` and `scroll-padding` declaration, and every svh min-height, sits inside `@media (prefers-reduced-motion: no-preference)`.
- Links kept: the homepage keeps all 13 internal links the 4a homepage had (including the three live blog posts) and all seven anchors; each of the 18 treatment pages links its sibling sub-services, its category, the other three treatments, Book and Call; `/services` links all 4 treatments and all 18 sub-services; `/areas-serviced` links all 12 towns and a town page links all four treatments, Book and Call; How It Works, the gallery, contact, book, privacy and the 404 keep every link they had.
- Key facts: all 36 quoted word for word from the text beside them.
- The collapsed sticky bar measures 0px.

**Consent.** Four states (first visit, Decline clicked, Accept clicked, returning visitor who declined) on four pages (`/`, `/book`, `/contact`, `/hair-systems`), four things each (banner shown, GA4 requested, Trafft requested, Google Maps requested): 64 checks, every one identical to the 4a build. Nothing third party is requested before Accept on any page; after Accept GA4 loads everywhere, Trafft on `/` and `/book`, Maps on `/contact`. (4a's own script is not in the repo, so this is a fresh and larger set rather than the same 32.)

**New colour pairs**, all checked by `scripts/contrast.mjs` from the tokens: the six `--input` and `--border` edge pairs (above); white at 60, 70, 75, 80 and 85 per cent on the deep band and on a white/5 card on it (7.02:1 to 11.82:1); light red on a white/5 card on deep (6.25:1); red-deep on the red tint chips (5.62:1); red-deep on a white button on red (6.48:1); muted on the page background (7.03:1); body text at 75 per cent on sand (6.44:1) and at 80 per cent on white (8.22:1); white over the featured-post scrim (10.31:1); the pull-quote rule (4.91:1); the white step numbers on red (4.91:1). One pair Lighthouse caught that the script had not: 90 per cent white on the red Amersham card on `/areas-serviced`. It is plain white now.

### Layout shift

`menshairtostay.co.uk` is blocked by this environment's network policy (the proxy refuses the connection), so there is no fresh live measurement. Carlo can allow it under Network access in the environment's settings if he wants one. For reference, 4a's report measured live at 0.0383 (home, 390), 0.0978 (`/contact`) and 0.1111 (`/book`), with every 4a figure below live. Here 4a and 4b were measured side by side from the same machine: median of three cold loads, first visit (no consent stored), CPU slowed 4x and network at Slow 4G, then a full read to the bottom of the page. Google Fonts is also unreachable here, so the font swap 4a fixed does not occur in either build.

Values are "on load / after reading to the bottom". Lower is better; Google's "good" is under 0.1.

| Page | Width | 4a | 4b |
|---|---|---|---|
| `/` | 390 | 0 / 0.0142 | **0 / 0** |
| `/hair-systems` | 390 | 0 / 0.0142 | **0 / 0** |
| `/blog` | 390 | 0 / 0.0141 | **0 / 0** |
| `/blog/autumn-hair-shedding-explained` | 390 | 0 / 0.0141 | **0 / 0** |
| `/contact` | 390 | 0 / 0.0142 | **0 / 0** |
| `/book` | 390 | 0 / 0.0142 | **0 / 0** |
| `/scalp-micropigmentation/smp-touch-up-session` | 390 | 0 / 0.0142 | **0 / 0** |
| `/areas/chesham` | 390 | 0 / 0.0142 | **0 / 0** |
| `/` | 1280 | 0 / 0 | **0 / 0** |
| `/hair-systems` | 1280 | 0 / 0 | **0 / 0** |
| `/blog` | 1280 | 0.0014 / 0.0014 | **0 / 0** |
| `/blog/autumn-hair-shedding-explained` | 1280 | 0 / 0 | **0 / 0** |
| `/contact` | 1280 | 0 / 0 | **0 / 0** |
| `/book` | 1280 | 0 / 0 | **0 / 0** |
| `/scalp-micropigmentation/smp-touch-up-session` | 1280 | 0 / 0 | **0 / 0** |
| `/areas/chesham` | 1280 | 0 / 0 | **0 / 0** |

The first four rows of each width are the 8 page and width combinations 4a reported; the other four are the new page types. 4b is at or below 4a on all 16 and is 0 on all 16. The 0.0142 in 4a, on every phone page, was the sticky bar opening above the cookie banner (section 3).

### Lighthouse mobile (accessibility, best practices, SEO)

Lighthouse 12, mobile, both builds on the local emulator.

| Page | 4a a11y / BP / SEO | 4b a11y / BP / SEO |
|---|---|---|
| `/` | 100 / 96 / 92 | 100 / 96 / 92 |
| `/hair-systems` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/scalp-micropigmentation/smp-touch-up-session` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/services` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/blog` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/blog/autumn-hair-shedding-explained` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/book` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/contact` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/faq` | 91 / 96 / 100 | **100** / 96 / 100 |
| `/gallery` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/how-it-works` | 96 / 96 / 100 | **100** / 96 / 100 |
| `/areas-serviced` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/areas/chesham` | 100 / 96 / 100 | 100 / 96 / 100 |
| `/privacy-policy` | 100 / 96 / 100 | 100 / 96 / 100 |

No page is below 4a. Two improved: `/faq` (4a's list held bare divs and its questions skipped from h1 to h3) and `/how-it-works` (4a's footer address line was 40 per cent white on the dark band, which fails contrast). The first 4b run had two regressions, both fixed before this report and re-measured: `/services` SEO 92 (four identical "Learn more" link texts) and `/areas-serviced` accessibility 96 (90 per cent white on the red card). `/`, `/hair-systems` and `/contact` were re-run on the final build after the last sticky bar change.

Best practices is 96 on every page in both builds, for two things this environment causes: the Google Fonts request fails its certificate check through the proxy (a console error), and the build ships no source maps. The homepage's SEO 92 in both builds is the three "Read More" links: Lighthouse reads their visible text, not the `aria-label` 4a gave them. The 404 cannot be scored because it answers with a real 404 status, in both builds.

## 6. Photographs I would want

Every section is laid out well with what exists. These would make specific pages better; none were generated.

1. **SMP being applied at the studio**, hands and scalp only. For Full SMP, SMP Touch-Up and the SMP category page, which currently use the blog's SMP illustration.
2. **Colour matching**: hair swatches held against a client's own hair. For Hair System Colouring.
3. **A cut and style on a fitted system**, from behind. For Hair System Styling.
4. **A consultation in progress**, hands, a measuring template or a scalp map, no face. For the four consultation pages and How It Works step 1, which use the empty consultation room.
5. **A real density treatment before and after** from a consenting client. The three density pages use the blog's comparison illustrations.
6. **A crown before and after** from a consenting client, close, for Crown Coverage.
7. **Adhesive being applied during a reattachment.** For Reattachment and Base Clean, which use the blog's bond illustration.
8. **The studio entrance on Chesham Road.** For Contact ("discreet entrance") and every area page's journey card.
9. **Lexie at work**, for How It Works and Contact, if she is happy to be shown.

Also for Carlo: the four category heroes (`hair-systems-hero.jpg`, `smp-hero.jpg`, `hair-density-hero.jpg`, `hair-system-maintenance-hero.jpg`) are unchanged from 4a and the Hair Systems one shows two faces that look generated. They are the pages' LCP images, so replacing them is a separate, measured change.

## 7. Files

- New: `src/components/mhts/ServicePage.tsx` (the treatment page layout), `src/data/servicePhotos.ts` (which photo goes where), `src/lib/sectionSnap.ts` (the switch), `src/test/batch4b.test.tsx`, this report.
- Rewritten onto the shared layout, words carried over by a script that failed on any key fact not found verbatim: the 18 files in `src/pages/services` (6,833 lines to 3,135).
- Redesigned: `ServicesPage`, `AreasServicedPage`, `AreaPage`, `HowItWorksPage`, `FAQPage`, `GalleryPage`, `BlogPage`, `BlogPostPage` (layout only), `BookPage`, `ContactPage`, `PrivacyPolicyPage`, `NotFound`, `ServicePricing` (layout only), the homepage for the section scroll.
- Small options added: `compact` on `GoogleReviews`, `BookingPanel` and `StudioMap`, `columns` on `OpeningHours`, `label` on `CtaPair`, `from` on `Reveal`, `isPrerenderPass()` in `src/lib/prerender.ts`.
- `src/index.css`: `--border`, `--input`, the section snap block. `scripts/contrast.mjs`: 21 new pairs. `scripts/prerender.mjs`: the collapsed-bar guard. `StickyMobileCTA.tsx`: the 4a fix. `CookieConsentBanner.tsx`: publishes its height. `AUTOMATION.md`: the 4b row and two decision log entries.
