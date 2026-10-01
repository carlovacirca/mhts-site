# Batch 4b fixes: report

Branch `design/batch-4b-fixes`, cut from `origin/design/batch-4b` (45f259b). Carlo's fixes from the batch 4b preview (PR #7). Only the listed items were changed; everything else I noticed is at the end of this report, not in the code.

## What changed

### A. Before and afters: one frame per client that fades

- New `src/components/mhts/BeforeAfterFade.tsx` replaces `BeforeAfterSlider` everywhere (homepage and /gallery). One frame per client, built from `mhts-before-N` / `mhts-after-N`. It shows Before, fades to After after 2.5 seconds (a 0.8 second fade), holds After for 2.5 seconds, fades back, on a loop. The corner label reads Before or After with it.
- The fade is a CSS keyframe (`mhts-ba-fade` in `src/index.css`), paused until an IntersectionObserver sees at least 35 per cent of the frame, and paused again when it leaves. Off screen, nothing runs.
- Reduced motion: no fade. The frame shows Before and After side by side, still, each with its label. This is done in CSS, so the pre-rendered HTML and React's first render are identical whatever the setting.
- Nothing to operate: no handle, no swipe, no carousel, no buttons. Each photo has its own alt text; the Before and After labels are visual only.
- Homepage on a phone: the heading and clients one and two fill one screen, then client three and "See all results" fill the next. On a desktop the three sit in one row. /gallery follows the same pattern: two to a screen, then the third; three in a row on a desktop.
- Removed from the page copy: "Drag the handle to see the difference", the slider's "Drag, swipe or use the arrow keys" and its spoken "drag to compare" label, "shared with their permission", and on /gallery "Click to enlarge" together with the lightbox it opened (it belonged to the old side-by-side pairs). The blog FAQ answer in `hair-restoration-before-after-transformations.md` is untouched.
- `BeforeAfterSlider.tsx` and its tests are deleted; nothing used them.

### B. Google reviews

- Desktop (md and up): three cards in one row. No scroll track, no arrows, no dots, no dimming of the side cards, no autoplay.
- Phone: the swipeable strip as it was. There was no instruction text under it to remove.
- A test renders ten pages and fails on any visible or spoken "drag", "swipe", "arrow keys" or "use the handle", or on "with their permission".

### C. Footer

On a phone the whole footer (red line down) is one screen and one snap stop:

- tighter padding, a smaller logo chip
- Treatments and Studio side by side (the Treatments column is slightly wider, so "Scalp Micropigmentation" and "Hair System Maintenance" stay on one line)
- the social links beside the "Visit us" heading
- the hours on one line with the closed days
- Book and Call side by side

Every link that was there is still there, including the Studio column's How It Works, Results, FAQ, Areas Serviced, Blog and Services overview. From md up the footer is as it was.

Measured with the bottom Call and Book bar showing, scrolled to the end of the page:

| Size | Footer height | Room between header and bar | Result |
|---|---|---|---|
| 360x740 | 578px | 590px | fits |
| 390x844 | 532px | 694px | fits |

### D. Section scroll on every page on a phone

- **Phone (below md), every page:** `y mandatory`. Each page's own top-level sections are stops and fill one screen, sized as the homepage's are (100svh less the header and the bottom bar; the first screen also covers the thin contact bar).
- **Blog articles:** `y proximity`, with stops only at the hero and at each h2, so reading is never pulled mid-paragraph.
- **Desktop:** unchanged from 4b, homepage only.
- **The switch:** still `SECTION_SNAP` in `src/lib/sectionSnap.ts`. `false` turns off the phone snap, the homepage snap and the article proximity together. Reduced motion still turns all of it off.

How the pages were fitted (superseded by "Phone screens, second round" at the end of this report, which replaced the small stops inside lists with whole screens):

- **Split into two phone screens:** a service page's "What is it" (words, then photo), "Who it's for" (words, then photo), Benefits (heading and first benefit, then the list) and Related (the sibling services, then the other three treatments); an area page's introduction (words, then the studio and address); the homepage and /gallery before and afters.
- **One screen each:** How It Works' steps and /services' four treatments.
- **Stops inside long lists,** so no Page Down or swipe skips more than a screen: FAQ questions, the twelve towns, the phone blog list (every six posts), contact channels, appointment types, the privacy policy's paragraphs.
- **Everything else:** spacing trimmed on a phone only. Desktop spacing is unchanged.

Two traps, found by walking each page with Page Down in Chromium and fixed:
- **`overflow-hidden` swallows stops.** It makes a section a scroll container of its own, so stops inside it belong to the section, not the page, and the page ignores them. The Benefits halves were skipped entirely. Every section now clips with `overflow-clip`, which looks the same but is not a scroll container, and a test fails on any `<section>` with `overflow-hidden`.
- **An oversized snap area lets the reader rest anywhere inside it.** A section split into two phone halves, if also a stop itself, is one snap area 1382px tall, and the browser may stop part way through it, past a half's stop. Such sections carry `mhts-snap-split` and are not stops themselves; their halves are.

How it is built (for whoever changes it next):

- Layout's `<main>` carries `mhts-snap-site` when the switch is on. The phone rule applies to `main > [page] > section`, so a new page gets it with no extra code.
- A section that should not show on a phone must use `hidden md:…`; the rule skips `.hidden` so it never un-hides one.
- `mhts-snap-phone` makes any block its own one-screen stop on a phone. `mhts-snap-stop`, `mhts-snap-stop-each` and `mhts-snap-stop-deep` add stops without sizing anything.

Every route checked at 390x844 by pressing Page Down from the top of the page to the end, in Chromium, as a reader would. The visible screen between the header and the bottom bar is 691px, so a step of 691 means the page moved exactly one screen and nothing was skipped. The first step on every page is 763: the hero plus the 28px contact bar, one full first screen by design.

| Route | Presses to the end | Largest step after the first |
|---|---|---|
| `/` | 11 | 691 |
| `/services` | 6 | 695 |
| `/hair-systems`, `/scalp-micropigmentation`, `/hair-density`, `/hair-system-maintenance` | 13 each | 691 |
| the 14 sub-service pages | 12 each (13 on the full maintenance package) | 691, except Full SMP Treatment 699 |
| `/how-it-works` | 9 | 723 (step four, 32px over: its paragraph is the longest on the site) |
| `/gallery` | 7 | 691 |
| `/faq` | 12 | 756 (see below) |
| `/areas-serviced` | 5 | 659 |
| `/areas/chesham` | 11 | 691 |
| `/blog` | 5 | 684 |
| `/blog/autumn-hair-shedding-explained` | 17 | 696 (proximity: stops at the hero and each h2, free scrolling between) |
| `/contact` | 10 | 691 |
| `/book` | 10 | 691 |
| `/privacy-policy` | 8 | 684 |
| 404 | 2 | 532 |

`/faq`: every question is a stop, and Chrome's Page Down picks the stop nearest a full page down. The first question's answer is open by default, so the first press carries past its last 53px. Touch scrolling is unaffected, and I did not change the FAQ's open-first behaviour to avoid it.

Section heights on the service pages: every section and half-section is exactly 691px, except the process steps on `/scalp-micropigmentation/full-smp-treatment`, which are 699px (8px over, allowed to scroll freely).

Snap state by width, measured in Chromium on the pre-rendered build:

| | `/` | `/hair-systems` | `/blog` | a blog article | `/faq` |
|---|---|---|---|---|---|
| 390, normal | y mandatory | y mandatory | y mandatory | y proximity | y mandatory |
| 390, reduced motion | none | none | none | none | none |
| 1280, normal | y mandatory | none | none | none | none |
| 1280, reduced motion | none | none | none | none | none |

### E. /blog on a phone

Below md, in this order:

1. The latest post as one large card: image, category, title, excerpt, date. It sits in the first screen under a slimmer heading.
2. The categories as chips, "All" plus each category. They wrap to a second line rather than scroll sideways, and "All" is selected to begin with.
3. Every other post as a compact list: a small image on the left, the title and date on the right. The chips filter it without a page load, and the latest post is never repeated in it.

Because "All" is the starting state, the pre-rendered HTML links every post. The desktop layout (masthead with search, tabs, cover story, grid, sidebar) is unchanged and hidden on a phone.

### F. Photos: two slots per page

`src/data/servicePhotos.ts` now has exactly two slots per page, `service` and `studio`:

- **4 treatment pages:** `service` in the hero (the old hero images are no longer passed in), `studio` beside "Who it's for". "What is it" has no photograph; its key fact is a large pull quote.
- **14 sub-service pages:** no framed photograph in the hero. `service` sits beside "What is it" and `studio` beside "Who it's for".
- **Related cards:** they carry no photographs, so each page shows exactly its own two. A test counts the `<img>`s on all 18 pages.
- **Studio photographs:** the three (`mhts-studio-wide-hero`, `mhts-consultation-room-hero`, `blog-hair-system-maintenance-studio`) rotate so neighbouring pages, in menu order, always differ.
- **The `service` slot:** each page now has its own approved photograph. See "Photos follow-up" below for the full list.

- **Deleted, unused:** `blog-aug04`, `blog-aug18`, `blog-before-after`, `blog-jul14`, `blog-jul21`, `blog-jul28`, `mhts-logo.png`.

## At 390x844

Screenshots are in `docs/reports/batch-4b-fixes/`, each a sheet of the screens a reader lands on, one per Page Down, taken on the pre-rendered build.

**Homepage** (`home-390.jpg`). One section per screen:
- hero
- before and after, clients one and two
- client three and "See all results"
- reviews
- treatments
- why us and maintenance
- FAQ
- blog
- book
- contact
- closing band
- footer

The before and after frames were captured on Before; they fade to After while on screen.

**A sub-service page, Hair System Styling** (`sub-service-390.jpg`):
- hero, words only
- "What is it", words
- the hairline photograph with its key fact
- The Benefits, first benefit
- the rest of the benefits
- "Who it's for", words
- the studio chair photograph with its key fact
- the process
- the FAQ
- the other Hair Systems services
- the other three treatments
- the closing band
- the footer

**/blog** (`blog-390.jpg`): the heading and the latest post card in the first screen, then the chips and the list, stopping every six posts.

**Footer** (`footer.jpg`, 360x740 on the left, 390x844 on the right): the page scrolled to its end, the whole footer in one screen between the header and the bottom bar, at both sizes.

## Checks

| Check | Result |
|---|---|
| `npm test` | **204 of 204** after the photos follow-up (202 at the first push). New: `BeforeAfterFade.test.tsx` (5), `batch4b-fixes.test.tsx` (8), and 21 in `batch4b.test.tsx` (the two-photograph rule on all 18 pages, the studio rotation, the instruction text, the desktop reviews row). Removed: the slider's own 7 |
| `npm run build` | passes |
| `npm run build:prerender` | 64 pages; opacity guard green (0 elements with inline opacity below 1); collapsed sticky bar guard green |
| `npm run lint` | 14 problems (3 errors, 11 warnings), the same 14 as 4b, none new |
| Against the 4b build, all 64 pages | titles, every meta and og tag, canonicals, JSON-LD, h1s and `<html>` attributes: **0 differences**; `sitemap.xml`, `robots.txt`, `_redirects`, `_headers` identical |
| Words | removed only where asked: the instructions, "shared with their permission", "Click to enlarge", and "See more results" became "See all results". Added: the phone blog list's titles and dates, and the third client's caption (the phone-only copy of the third frame) |
| Sitemap URLs, local Cloudflare Pages emulator | **60 of 60** 200 with no redirect; unknown URL and unpublished post 404 |
| Consent (4 states x 4 pages x 4 checks) | **64 of 64 identical to 4b**, nothing third party before Accept |
| Keyboard, anchors, find in page, back, reduced motion, no JavaScript (homepage) | **28 of 28** at 1280x800 and 28 of 28 at 390x844 |
| Layout shift: 8 pages x 390 and 1280, median of 3 cold first visits, CPU x4 and Slow 4G, load plus a read to the bottom | **0 on all 16**, as in 4b (0 on all 16) |
| New dependencies | none |

## Things I was not sure about

1. **The gallery lightbox is gone.** It enlarged the old side-by-side pairs; with one fading frame per client, and "Click to enlarge" being an instruction, I removed it rather than keep a second way to see the same photographs. Easy to bring back as a plain enlarge on click if Carlo wants it.
2. **"See more results" is now "See all results",** the wording in the brief. It is the only link text I changed.
3. **With JavaScript off, the fade frames stay on Before.** The fade starts when the observer sees the frame, and without JavaScript nothing starts it. Both photographs are in the HTML with their alt text. Reduced motion is unaffected (side by side, pure CSS).
4. **/blog on a phone hides the search box and the breadcrumbs.** The brief lists exactly three things for the phone; the breadcrumb schema is unchanged. One new line of text exists for an empty category: "No other articles in this category yet." No category is empty today.
5. **Where `studio` goes on the four treatment pages.** The brief says pillar pages show `service` in the hero. I put `studio` beside "Who it's for", as on the sub-service pages, and gave "What is it" a pull quote instead of a photograph.
6. **The interim `service` photographs are gone.** The photos follow-up gave every page its own approved photograph (below).
7. **The homepage treatment cards** now use each treatment page's `service` photograph. `hair-systems-hero.jpg`, with its two generated-looking faces, and `hair-system-maintenance-hero.jpg` are deleted.
8. **Footer links on a phone are 26px tall.** This is to fit 360x740. It meets the WCAG 2.2 minimum of 24px but is under the 44px comfort size, and the columns are still well spaced. The social links are in the HTML twice (beside "Visit us" on a phone, under Studio from md up); the one not shown is `display:none`, so it is neither seen nor read out.
9. **How It Works step four is 32px taller than a phone screen** (its paragraph is the longest on the site). Full SMP's steps are 8px over. Both scroll freely; I did not shorten the words.
10. **On the desktop the reviews still carry the carousel's ARIA roles** (`aria-roledescription="carousel"`) though they are a plain row there. Harmless, but a screen reader announces a carousel. Worth a one-line change later.
11. **The phone snap applies to every page's top-level sections automatically.** A future page gets it for free, but a desktop-only section must use `hidden md:…` or it would be sized to a screen on a phone.
12. **While the cookie banner is open on a phone** (first visit, 178px), a section's last lines can sit under it at the moment it snaps, as in 4b; a short scroll reveals them.

## Photos follow-up

Merged `origin/images/batch-4b-fixes`. Its 35 photographs moved into `src/assets/` under the same names, with `svc-*` renamed `mhts-svc-*`. `docs/image-review/batch-4b-fixes/` (with its README and manifest) was deleted in the same commit. Every photograph placed has new alt text that describes what it shows.

### Service pages (`src/data/servicePhotos.ts`, the `service` slot)

| Page | Was | Now |
|---|---|---|
| Hair Systems | `mhts-hair-system-hairline-hero` | `mhts-svc-hair-systems` |
| Non-Surgical Hair Replacement | `mhts-hair-system-hairline-hero` | `mhts-svc-non-surgical-hair-replacement` |
| Hair Replacement Service | `mhts-hair-system-base-materials-hero` | `mhts-svc-hair-replacement-service` |
| Initial Consultation & Fitting | `mhts-hair-system-base-materials-hero` | `mhts-svc-initial-consultation-and-fitting` |
| Hair System Colouring | `mhts-hair-system-hairline-hero` | `mhts-svc-hair-system-colouring` |
| Hair System Styling | `mhts-hair-system-hairline-hero` | `mhts-svc-hair-system-styling` |
| Scalp Micropigmentation | `mhts-smp-healed-result-hero` | `smp-hero` (kept, as asked) |
| Full SMP Treatment | `blog-smp-procedure` | `mhts-svc-full-smp-treatment` |
| SMP Touch-Up Session | `smp-hero` | `mhts-svc-smp-touch-up-session` |
| SMP Consultation | `mhts-smp-healed-result-back-hero` | `mhts-svc-smp-consultation` |
| Hair Density | `blog-hair-density-treatment-hero` | `hair-density-hero` (kept, as asked) |
| Density Treatment Consultation | `blog-hair-density-comparison` | `mhts-svc-density-treatment-consultation` |
| Thinning Hair Treatment | `blog-hair-density-treatment-hero` | `mhts-svc-thinning-hair-treatment` |
| Crown Coverage | `mhts-before-after-composite-2` | `mhts-svc-crown-coverage-treatment` |
| Hair System Maintenance | `mhts-hair-system-maintenance-hero` | `mhts-svc-hair-system-maintenance` |
| Reattachment & Restyling | `blog-hair-system-bond-comparison` | `mhts-svc-reattachment-and-restyling` |
| Base Clean & Reattach | `mhts-hair-system-maintenance-hero` | `mhts-svc-base-clean-and-reattach` |
| Full Maintenance Package | `mhts-hair-system-maintenance-hero` | `mhts-svc-full-maintenance-package` |

The studio slot is unchanged (the three studio photographs rotate).

### Homepage treatment cards

Each card now takes its treatment page's `service` photograph (`cardPhotoFor`):
- Hair Systems: `hair-systems-hero` became `mhts-svc-hair-systems`.
- Hair System Maintenance: `hair-system-maintenance-hero` became `mhts-svc-hair-system-maintenance`.
- SMP (`smp-hero`) and Hair Density (`hair-density-hero`) are unchanged.

There are no faces on the homepage now apart from the real client before and afters. The latest-posts cards show a hair system base, a brush and the back of a head.

### Blog heroes (frontmatter)

| Post | Was | Now |
|---|---|---|
| womens-hair-loss-solutions-guide | `blog-aug11` | `blog-womens-hair-loss` |
| hair-system-maintenance-guide | `blog-aug25` | `blog-maintenance-guide` |
| modern-hair-system-vs-surgery | `blog-hair-system-fitting-hero` | `blog-hair-system-vs-surgery` |
| ultimate-guide-hair-systems | `blog-hair-systems-guide` | `blog-hair-systems-guide` (the file was replaced; same name) |
| best-hair-transplant-alternatives-non-surgical-solutions | `blog-hair-transplant-alternatives` | `blog-transplant-alternatives` |
| non-surgical-hair-replacement-men-uk | `blog-non-surgical-hair-replacement` | `blog-non-surgical-replacement` |
| scalp-micropigmentation-complete-guide | `blog-smp-procedure` | `blog-smp-guide` |
| smp-for-hair-transplant-scars | `mhts-smp-healed-result-back-hero` | `blog-smp-scars` |

### Blog inline images (`BlogPostPage.tsx`)

| Post | Was | Now |
|---|---|---|
| non-surgical-hair-replacement-men-uk | `blog-non-surgical-inline-1`, `-2`, `-3` | `inline-ns-1`, `-2`, `-3` |
| best-hair-transplant-alternatives-non-surgical-solutions | `blog-hair-transplant-alt-inline-1` to `-4` | `inline-alt-1` to `-4` |
| does-a-hair-system-look-natural | `mhts-hair-system-before-after-inline` (the crown before and after) | `inline-natural` |
| hair-system-maintenance-4-to-6-weeks | `blog-hair-system-bond-comparison` | `inline-maint-4-6` |
| hair-density-treatment-for-thinning-hair | `blog-hair-density-comparison` | `inline-density` |
| modern-hair-system-vs-surgery | `blog-hair-system-fitting-comparison` | `inline-vs-surgery` |

- **Fallback:** `blog-placeholder-illustration` was still the fallback for an inline slot with no photograph. It is now `inline-natural`.
- **Alt text:** inline images used to be `alt="Illustration"`. Each now has its own description; there are 0 "Illustration" alts in the build.
- **Where the fallback shows today:** the non-surgical post has four slots and three photographs, so its fourth slot shows `inline-natural`.

### Deleted from `src/assets` (no longer used anywhere)

21 files:
- Old blog heroes: `blog-aug11`, `blog-aug25`, `blog-hair-system-fitting-hero`, `blog-hair-transplant-alternatives`, `blog-non-surgical-hair-replacement`, `blog-smp-procedure`, `mhts-smp-healed-result-back-hero`.
- Old inline images: `blog-non-surgical-inline-1`, `-2`, `-3` and `blog-hair-transplant-alt-inline-1`, `-2`, `-3`, `-4`.
- The four comparisons: `blog-hair-system-bond-comparison`, `blog-hair-density-comparison`, `blog-hair-system-fitting-comparison`, `mhts-hair-system-before-after-inline`.
- The placeholder: `blog-placeholder-illustration`.
- Old treatment heroes: `hair-systems-hero`, `hair-system-maintenance-hero`.

`src/lib/images.test.ts` used `blog-non-surgical-inline-1` as its "large image" example. It now uses `mhts-hair-system-base-materials-hero`, the largest image left.

Images that lost a service-page job but are still used elsewhere are kept. They are:
- `mhts-hair-system-hairline-hero`, `mhts-hair-system-base-materials-hero`, `mhts-smp-healed-result-hero`, `blog-hair-density-treatment-hero` and `mhts-hair-system-maintenance-hero`, which are blog heroes and How It Works.
- `mhts-before-after-composite-2`, a blog hero showing a real client.

### New test

`batch4b.test.tsx` renders all 18 service pages. It fails in three cases:
- A page shows more than two `<img>`s.
- One image file appears on two service pages.
- A studio photograph is used as a page's `service` photograph.

The three studio photographs are the one exception to the "two pages" rule, because they rotate across pages by design. I confirmed the test fails by temporarily giving Hair Replacement Service the Hair Systems photograph.

### Checks

- `npm test`: 204 of 204.
- `npm run build`: passes.
- Clean `build:prerender`: 64 pages.
- `npm run lint`: the same 14 problems.
- No comparison, placeholder or old inline file is referenced in `dist`.

### Not sure

- **The real client before and afters** (`mhts-before-*`, `mhts-after-*`, `mhts-before-after-composite-*`) stay. They are real clients photographed in the studio, not generated, so "no AI before and after" does not cover them.
- **Two heroes show part of a face.** `smp-hero` and `hair-density-hero` show a forehead and hairline only, no eyes. They stay because the brief keeps them.

## Phone screens, second round

Carlo reviewed the preview on his phone. Everything here is below md only; from md up every page is unchanged. I checked this with full-page screenshots of all 41 routes before and after, at 768, 1024 and 1280 wide with reduced motion and at 1280 with motion on: 0 pixels differ.

### A. Homepage before and afters: a strip like the reviews

New `src/components/mhts/BeforeAfterStrip.tsx`.

- **Phone:** one client at a time in a swipeable scroll-snap strip, the same kind of strip as the Google reviews: the next client peeks, with arrows and a dot per client.
- **The cycle:** each client shows Before for 2s, cross-fades to After (0.6s), holds After for 2s, then the strip moves to the next client. After the third it returns to the first.
- **When it runs:** only while the strip is on screen (an IntersectionObserver). A swipe restarts the cycle on the client swiped to.
- **How the timing works:** two timeouts tell the frame which photograph to show (`data-phase`), and the cross-fade itself is CSS. The pre-rendered HTML always shows Before, and 0 elements are saved mid-fade.
- **No instruction text:** the arrows and dots are buttons labelled for screen readers only ("Next client", "Show client 2 of 3").
- **Reduced motion:** nothing moves on its own. Each frame shows Before and After side by side, still.
- **Desktop:** the three frames in a row, each looping on its own, as before.
- **Removed:** the phone-only copy of the third client and its separate screen.
- **Tests:** `BeforeAfterStrip.test.tsx` (6) checks the 2s/2s timing and the move on, the loop, off screen, swipe, reduced motion and desktop.

### B. Every screen is a full, sensible screen

On a phone a screen is now a page's own top-level section, or a block marked `mhts-snap-phone`. That block is either one screen of a long section split into screens, or a wrapper that groups short sections into one screen. A wrapper is `display:contents` from md up, so it changes nothing on a desktop.

- **Small stops are gone.** The stops inside lists (`mhts-snap-stop`, `-stop-each`, `-stop-deep`) were removed. Every stop is a whole screen.
- **Content starts at the top.** Content sits from the top of its screen (it was centred).
- **Growing photographs:** where a screen has a photograph, it grows to fill what the words leave (`mhts-fill`). Its minimum height is 9rem.

How each page was regrouped:

- **18 treatment pages** (`ServicePage.tsx`, one layout for all):
  - The key fact of "What is it" joins the hero as a pull quote. The fact stays beside its text from md up.
  - "What is it" is a screen of words. On a sub-service page it is followed by the service photograph filling a screen.
  - "The Benefits" heading, the first benefit and the whole list are one screen.
  - "Who it's for", the studio photograph and its key fact are one screen.
  - "Frequently Asked" shares a screen with the related services, which become a swipeable strip.
  - The other three treatments open the closing "Ready to…" screen.
  - The empty wrapper that was a stop is gone.
  - The quote mark in the hero, step spacing, short FAQ lists and short benefit lists are sized from each page's own text, so every page lands between 72% and 109%.
- **Homepage:**
  - The treatment cards' photographs are square on a phone.
  - The trust chips and the maintenance card have more room.
  - The FAQ heading is the same size as the other homepage headings.
  - The closing "Ready when you are" screen shows the studio photograph between the buttons and the towns.
- **/how-it-works:**
  - The heading and step one are one screen, then each step is a screen with its photograph filling it.
  - The service options are two screens (the heading and the first group, then the other two).
- **/faq:**
  - The first screen is the hero plus the search, the category filter and Book and Call. This is the same rail the desktop shows beside the questions.
  - The 20 questions are split into six screens. The split is worked out before render from each item's height, so the pre-rendered page and the live one agree, and opening a question never moves it to another screen.
  - To make an even split possible on a phone, a closed question is at least two lines tall and the booking band is a list item of its own. The band's desktop spacing is unchanged.
  - "Still have questions?" and "Explore more" are one screen.
- **/areas-serviced:**
  - The studio photograph fills the hero.
  - The twelve towns are three screens of four, the last with Book and Call.
- **Area pages (12):**
  - The studio photograph fills its screen above the address.
  - The four treatments are a swipeable strip.
  - The questions are a screen of their own.
  - The free consultation band joins the closing booking band.
  - The longer town texts are set slightly smaller on a phone.
- **/blog:** the phone list is split into screens of five or six rows, spread evenly, with 80px thumbnails.
- **/book:**
  - The consultation-room photograph fills the hero.
  - The five appointment types are a swipeable strip, so their heading, the cards and the buttons are one screen.
  - "Prefer to call?" joins the booking questions.
  - "Explore more" is a line of links on the footer's screen.
- **/privacy-policy:**
  - The first screen is the heading plus the contents list, as rows a thumb can tap.
  - The policy sections are grouped into five screens. Two sections continue onto the next screen, and from md up they are one section each, as before.
  - The last screen ends with "Ready to get started?" and the studio photograph.
- **/services:** the hero shows the studio photograph and Book and Call. Those are the buttons from the end of the page, which stay there from md up.
- **Copy:** no words were removed. Titles, h1s, meta and schema are byte for byte the same on all 64 pre-rendered pages. Where a block moved to another screen on a phone only, see "Not sure" below.

### C. Results page (/gallery) on a phone

1. **Hero:** the h1 and introduction, then the studio photograph filling the screen.
2. **One screen per client:**
   - A tall frame (2:3) with the service as its caption.
   - Before 2s, a 0.5s fade, After 2s, a 0.5s fade back (`mhts-ba-quick`). This is the same CSS loop as before at a quicker tempo, phone only.
   - The order is the two hair system fittings, then the reattachment and restyle, which is the maintenance result.
3. **Other results:** the only real maintenance photographs are that client. There are no real SMP before and afters, so there is no SMP screen.
4. **"What these results show":** the three result types (hair systems, SMP, maintenance) as three compact cards, one screen.
5. **"Why Clients Trust Men's Hair To Stay":** the three reasons, then the consultation room photograph.
6. **CTA:** the closing call to action and links.

The 6-photo grid, the 1153px section and the two small screens are gone.

### D. Contact page on a phone

1. **Hero:** the h1 and introduction, then Phone (a Call 07947 878087 button) and Email (an Email Us button), each with its line from the desktop cards. There is no WhatsApp number anywhere in the site, so there is no WhatsApp button.
2. **"Get in Touch":** the form's place (Call and Email), then the Visit Our Studio card with Book a visit and Call.
3. **"Find Our Amersham Studio":** the address, the map (the compact drawing) and the opening hours.
4. **The areas and "Why Choose Men's Hair To Stay":** the towns as a 3-column grid of chips, and the three reasons as a compact list.
5. **"Explore More":** a line of links that shares the footer's screen.

The desktop's three contact cards are `display:none` on a phone; their words are in screens 1 and 2.

### E. The test, and the numbers

- **The test:** `src/test/snapScreens.test.ts` starts the dev server and opens every route that has snap screens in Chromium at 390x844: the home page, 18 treatment pages, how it works, FAQ, the areas list, 12 area pages, blog, book, privacy, gallery, contact and services (41 routes).
  - It fails if any screen is below 70% filled or taller than 110% of the screen.
  - It also fails if any content sits between two screens where the page never rests.
  - **Exempt:** nothing. The hero and the footer's screen are held to the same rule. Blog articles are not screens; they keep proximity snap at their headings.
- **Definitions** (one place, `scripts/snap-screens.mjs`, which also prints the table below):
  - **screen:** the viewport less the sticky header and the bottom bar (691px; the first is 735px).
  - **height:** the stop's height as a % of its screen.
  - **fill:** the content shown at that stop, from the top of its first piece to the bottom of its last, as a % of the screen. Text, images, buttons, form controls and inset cards count; a full-width band of colour does not.
  - The page is scrolled through once first, so blocks that rise into place are measured where they settle.
  - For the footer, which snaps by its end, the screen is the one that ends with it.
  - Only the site's own requests are allowed, so the web font is replaced by its metric-matched fallback and every run measures the same thing.
- **CI:** the test needs Chromium, so in `.github/workflows/deploy.yml` the Test step now runs after Install Chromium (it ran before). It takes about a minute.
- **Totals:**
  - **Before** (`18fc45e`, measured the same way): 522 stops, 275 failing.
  - **After:** 332 screens, 0 failing. The lowest fill is 72% and the tallest screen is 109%.
  - **Pre-rendered build:** the same, 0 failing.

### Checks

- **`npm test`:** 211 of 211 (17 files).
  - New: `BeforeAfterStrip.test.tsx` (6) and `snapScreens.test.ts` (1, the 41 routes).
  - Changed: one regex in `BeforeAfterFade.test.tsx`, for the new reduced-motion selector.
- **`npm run build`:** passes. `npm run build:prerender` writes 64 pages, and the guard against frames saved mid-fade is green.
- **Head and SEO against the previous build (64 pages):** titles, meta, canonicals, JSON-LD, h1s, `<html>`, `sitemap.xml`, `robots.txt`, `_redirects` and `_headers` are all identical.
- **Desktop:** 0 pixels differ on 41 routes at 768, 1024 and 1280.
- **Layout shift:** 0 on the same 16 page and width combinations as before.
- **`npm run lint`:** the same 14 problems, none new.
- **New dependencies:** none.

### Not sure

1. **At 375x812, Carlo's measuring size,** the screen is 32px shorter.
   - None of the 332 screens is under-filled, but 31 are 111 to 117% tall: some treatment page screens, the area pages' "Local Insight" and free-consultation screens, and a few others.
   - They scroll freely, nothing is cut off, and none is near the 1153px and 1214px he measured.
   - Holding both sizes to 70%/110% at once would mean retuning those 31 screens; tell me if you want that.
2. **A few blocks are in the page twice, one of them `display:none` at any width,** so a phone shows them on a different screen from a desktop. A hidden copy is neither shown nor read out, but the words are in the HTML twice:
   - **Contact:** the Phone, Email and Visit Our Studio cards.
   - **FAQ:** the search and filter rail.
   - **Privacy:** the contents list and "Ready to get started?".
   - **Services:** Book and Call.
   - **Treatment pages:** the key fact, which is already hidden from screen readers.
3. **Area pages: the free consultation band comes after the questions in the source.** That puts it next to the booking band on a phone. From md up, CSS order puts it back where it was, pixel for pixel. It has no links or buttons, so keyboard order is unchanged; a screen reader on a desktop reads it after the questions.
4. **Real studio photographs were added on a phone** to fill screens that were only words:
   - the homepage's closing screen
   - the gallery hero and "Why clients trust"
   - the areas list hero
   - the /book hero
   - the privacy policy's last screen
   - the /services hero

   All are the existing studio photographs; no faces.
5. **Small phone-only changes:**
   - The FAQ's "Explore more" cards show a chevron instead of the words "Learn more", as the treatment pages' related cards already do.
   - The contact page's town chips lose their pin icon.
   - On /contact and /book, "Explore More" is a line of links instead of pills.
6. **The FAQ split is worked out from estimated heights at 390px.** With a category filter or a search the list is shorter and the last screen may be short. That is the reader's own choice, not the page's layout, and the test measures the full list.

### Every route, every screen, at 390x844: before and after

Before is `18fc45e` (the photos follow-up); after is this commit. Height is the stop's height in px and as a % of its screen; fill is the content shown at that stop as a % of the screen. ✗ marks a screen below 70% filled or over 110% tall. "Unseen" is content between two screens that the page never rests on.

#### `/`: 12 screens, 4 failing → 11 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Your Confidence,Restored. | 735 (100%) | 100% | Your Confidence,Restored. | 735 (100%) | 100% |
| 2 | Before and after | 691 (100%) | 93% | Before and after | 691 (100%) | 80% |
| 3 | ✗ Client three, hair system | 691 (100%) | 43% | Reviews from Google | 691 (100%) | 86% |
| 4 | Reviews from Google | 691 (100%) | 86% | Our treatments | 691 (100%) | 82% |
| 5 | Our treatments | 691 (100%) | 73% | Maintenance and aftercare | 691 (100%) | 74% |
| 6 | ✗ Maintenance and aftercare | 691 (100%) | 68% | Frequently Asked Questions About … | 691 (100%) | 74% |
| 7 | ✗ Frequently Asked Questions About … | 691 (100%) | 62% | Latest Articles & Expert Advice o… | 691 (100%) | 82% |
| 8 | Latest Articles & Expert Advice o… | 691 (100%) | 82% | Book a Consultation | 691 (100%) | 86% |
| 9 | Book a Consultation | 691 (100%) | 86% | Contact | 691 (100%) | 86% |
| 10 | Contact | 691 (100%) | 86% | Ready when you are | 691 (100%) | 88% |
| 11 | ✗ Ready when you are | 691 (100%) | 58% | Footer | 552 (80%) | 94% |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-systems`: 14 screens, 8 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Real Hair. Natural Results.Zero S… | 735 (100%) | 100% | Real Hair. Natural Results.Zero S… | 735 (100%) | 100% |
| 2 | What It Costs | 691 (100%) | 89% | What It Costs | 738 (107%) | 89% |
| 3 | What Is a Hair System? | 691 (100%) | 76% | What Is a Hair System? | 691 (100%) | 79% |
| 4 | ✗ no two systems are ever the same | 691 (100%) | 19% | The Benefits | 691 (100%) | 88% |
| 5 | ✗ The Benefits | 691 (100%) | 40% | Who It's For | 724 (105%) | 91% |
| 6 | ✗ Custom matched to your exact colo… | 691 (100%) | 67% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ Who It's For | 691 (100%) | 61% | Frequently Asked | 691 (100%) | 86% |
| 8 | ✗ from a receding hairline to compl… | 691 (100%) | 46% | Ready to Get Your Hair Back? | 691 (100%) | 79% |
| 9 | What to Expect | 691 (100%) | 79% | Footer | 552 (80%) | 94% |
| 10 | ✗ Frequently Asked | 691 (100%) | 56% |  | |  |
| 11 | Hair Systems Services | 691 (100%) | 89% |  | |  |
| 12 | ✗ Scalp MicropigmentationThe look o… | 691 (100%) | 26% |  | |  |
| 13 | ✗ Ready to Get Your Hair Back? | 691 (100%) | 39% |  | |  |
| 14 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-systems/non-surgical-hair-replacement`: 13 screens, 9 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ All the Hair.None of the Surgery. | 735 (100%) | 55% | All the Hair.None of the Surgery. | 735 (100%) | 77% |
| 2 | What Is Non-Surgical Hair Replace… | 691 (100%) | 77% | What Is Non-Surgical Hair Replace… | 691 (100%) | 80% |
| 3 | ✗ zero surgery, zero scarring and z… | 691 (100%) | 46% | zero surgery, zero scarring and z… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 40% | The Benefits | 691 (100%) | 90% |
| 5 | ✗ No surgery, anaesthetic or recove… | 691 (100%) | 67% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 50% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ suitable for men at any stage of … | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 90% |
| 8 | What to Expect | 691 (100%) | 79% | Your Hair Transformation Starts H… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 54% | Footer | 552 (80%) | 94% |
| 10 | More Hair Systems Services | 691 (100%) | 78% |  | |  |
| 11 | ✗ Scalp MicropigmentationThe look o… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Your Hair Transformation Starts H… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-systems/hair-replacement-service`: 13 screens, 9 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Your Complete HairReplacement Ser… | 735 (100%) | 64% | Your Complete HairReplacement Ser… | 735 (100%) | 84% |
| 2 | What Is the Hair Replacement Serv… | 691 (100%) | 74% | What Is the Hair Replacement Serv… | 691 (100%) | 76% |
| 3 | ✗ the complete journey from your ve… | 691 (100%) | 50% | the complete journey from your ve… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 90% |
| 5 | ✗ Expert consultation included at n… | 691 (100%) | 67% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 35% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ everything you need under one roo… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 87% |
| 8 | What to Expect | 691 (100%) | 79% | A Service Built Around You. | 691 (100%) | 74% |
| 9 | ✗ Frequently Asked | 691 (100%) | 51% | Footer | 552 (80%) | 98% |
| 10 | More Hair Systems Services | 691 (100%) | 78% |  | |  |
| 11 | ✗ Scalp MicropigmentationThe look o… | 691 (100%) | 26% |  | |  |
| 12 | ✗ A Service Built Around You. | 691 (100%) | 34% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-systems/initial-consultation-and-fitting`: 13 screens, 9 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ It All Starts Witha Free Conversa… | 735 (100%) | 55% | It All Starts Witha Free Conversa… | 735 (100%) | 73% |
| 2 | What Is the Initial Consultation … | 691 (100%) | 81% | What Is the Initial Consultation … | 691 (100%) | 84% |
| 3 | ✗ completely pressure-free | 691 (100%) | 42% | completely pressure-free | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 88% |
| 5 | ✗ Expert assessment of your hair lo… | 691 (100%) | 63% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 35% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ You do not need to have made any … | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 87% |
| 8 | What to Expect | 691 (100%) | 79% | Take the First Step Today. | 691 (100%) | 77% |
| 9 | ✗ Frequently Asked | 691 (100%) | 54% | Footer | 552 (80%) | 96% |
| 10 | More Hair Systems Services | 691 (100%) | 78% |  | |  |
| 11 | ✗ Scalp MicropigmentationThe look o… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Take the First Step Today. | 691 (100%) | 37% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-systems/hair-system-colouring`: 13 screens, 9 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ The Perfect Colour Match.Every Ti… | 735 (100%) | 60% | The Perfect Colour Match.Every Ti… | 735 (100%) | 83% |
| 2 | What Is Hair System Colouring? | 691 (100%) | 77% | What Is Hair System Colouring? | 691 (100%) | 80% |
| 3 | ✗ including any grey, highlights or… | 691 (100%) | 46% | including any grey, highlights or… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 84% |
| 5 | ✗ Grey blending and tonal variation… | 691 (100%) | 58% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 35% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ blend seamlessly with their natur… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 78% |
| 8 | What to Expect | 691 (100%) | 79% | Colour That Looks Completely Natu… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 42% | Footer | 552 (80%) | 94% |
| 10 | More Hair Systems Services | 691 (100%) | 78% |  | |  |
| 11 | ✗ Scalp MicropigmentationThe look o… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Colour That Looks Completely Natu… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-systems/hair-system-styling`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Styled to Suit You.Cut to Perfect… | 735 (100%) | 55% | Styled to Suit You.Cut to Perfect… | 735 (100%) | 75% |
| 2 | What Is Hair System Styling? | 691 (100%) | 70% | What Is Hair System Styling? | 691 (100%) | 72% |
| 3 | ✗ A great hair system is only as go… | 691 (100%) | 46% | A great hair system is only as go… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 84% |
| 5 | ✗ Blended with your natural hair fo… | 691 (100%) | 58% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 31% | What to Expect | 691 (100%) | 72% |
| 7 | ✗ Every man wearing a hair system. | 691 (100%) | 42% | Frequently Asked | 691 (100%) | 78% |
| 8 | ✗ What to Expect | 691 (100%) | 66% | Look Sharp. Feel Confident. | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 38% | Footer | 552 (80%) | 94% |
| 10 | More Hair Systems Services | 691 (100%) | 78% |  | |  |
| 11 | ✗ Scalp MicropigmentationThe look o… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Look Sharp. Feel Confident. | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/scalp-micropigmentation`: 14 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | The Look of a Fresh Shave.Every S… | 735 (100%) | 100% | The Look of a Fresh Shave.Every S… | 735 (100%) | 100% |
| 2 | ✗ What It Costs | 691 (100%) | 68% | What It Costs | 691 (100%) | 73% |
| 3 | What Is Scalp Micropigmentation? | 691 (100%) | 81% | What Is Scalp Micropigmentation? | 691 (100%) | 84% |
| 4 | ✗ a natural result that does not tu… | 691 (100%) | 19% | The Benefits | 691 (100%) | 90% |
| 5 | ✗ The Benefits | 691 (100%) | 35% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Creates a realistic, natural-look… | 691 (100%) | 68% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ Who It's For | 691 (100%) | 54% | Frequently Asked | 691 (100%) | 94% |
| 8 | ✗ a permanent, low-maintenance answ… | 691 (100%) | 46% | Confident. Sharp. Permanent. | 691 (100%) | 79% |
| 9 | What to Expect | 691 (100%) | 79% | Footer | 552 (80%) | 94% |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ SMP Services | 691 (100%) | 56% |  | |  |
| 12 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 13 | ✗ Confident. Sharp. Permanent. | 691 (100%) | 39% |  | |  |
| 14 | Footer | 552 (80%) | 75% |  | |  |

#### `/scalp-micropigmentation/full-smp-treatment`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ A Complete SMP Programme.Defined.… | 735 (100%) | 69% | A Complete SMP Programme.Defined.… | 768 (104%) | 85% |
| 2 | What Is Full SMP Treatment? | 691 (100%) | 74% | What Is Full SMP Treatment? | 691 (100%) | 76% |
| 3 | ✗ delivered across multiple session… | 691 (100%) | 50% | delivered across multiple session… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 80% |
| 5 | ✗ Defines a sharp, tailored hairline | 691 (100%) | 49% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 31% | What to Expect | 719 (104%) | 91% |
| 7 | ✗ Full SMP suits all skin types and… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 84% |
| 8 | What to Expect | 699 (101%) | 91% | Ready to Take the Next Step? | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 51% | Footer | 552 (80%) | 94% |
| 10 | ✗ More SMP Services | 691 (100%) | 40% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Ready to Take the Next Step? | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/scalp-micropigmentation/smp-touch-up-session`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Keep Your SMP LookingFresh and Sh… | 735 (100%) | 60% | Keep Your SMP LookingFresh and Sh… | 735 (100%) | 80% |
| 2 | What Is an SMP Touch-Up Session? | 691 (100%) | 81% | What Is an SMP Touch-Up Session? | 691 (100%) | 84% |
| 3 | ✗ Touch-up sessions are typically s… | 691 (100%) | 46% | Touch-up sessions are typically s… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 82% |
| 5 | ✗ Sharpens hairline and edges | 691 (100%) | 52% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 31% | What to Expect | 691 (100%) | 80% |
| 7 | ✗ Most clients require a touch-up e… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 72% |
| 8 | What to Expect | 691 (100%) | 73% | Refresh Your Results. Book a Touc… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 38% | Footer | 552 (80%) | 94% |
| 10 | ✗ More SMP Services | 691 (100%) | 40% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Refresh Your Results. Book a Touc… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/scalp-micropigmentation/smp-consultation`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Find Out If SMP IsRight for You. | 735 (100%) | 55% | Find Out If SMP IsRight for You. | 735 (100%) | 75% |
| 2 | What Is the SMP Consultation? | 691 (100%) | 77% | What Is the SMP Consultation? | 691 (100%) | 80% |
| 3 | ✗ There is absolutely no obligation… | 691 (100%) | 50% | There is absolutely no obligation… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 78% |
| 5 | ✗ Expert scalp and hair loss assess… | 691 (100%) | 56% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 31% | What to Expect | 691 (100%) | 83% |
| 7 | ✗ The consultation is the ideal sta… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 78% |
| 8 | What to Expect | 691 (100%) | 76% | Your Questions Answered. No Press… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 47% | Footer | 552 (80%) | 94% |
| 10 | ✗ More SMP Services | 691 (100%) | 40% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Your Questions Answered. No Press… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-density`: 14 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Thicker Hair. Fuller Coverage.Rea… | 735 (100%) | 100% | Thicker Hair. Fuller Coverage.Rea… | 735 (100%) | 100% |
| 2 | ✗ What It Costs | 691 (100%) | 68% | What It Costs | 691 (100%) | 73% |
| 3 | What Is Hair Density Treatment? | 691 (100%) | 85% | What Is Hair Density Treatment? | 693 (100%) | 88% |
| 4 | ✗ density treatments work with what… | 691 (100%) | 19% | The Benefits | 691 (100%) | 90% |
| 5 | ✗ The Benefits | 691 (100%) | 35% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Targeted treatment for thinning a… | 691 (100%) | 67% | What to Expect | 691 (100%) | 88% |
| 7 | ✗ Who It's For | 691 (100%) | 54% | Frequently Asked | 691 (100%) | 84% |
| 8 | ✗ a density treatment is the perfec… | 691 (100%) | 46% | Stop Hiding Your Hair. Start Lovi… | 691 (100%) | 79% |
| 9 | What to Expect | 691 (100%) | 81% | Footer | 552 (80%) | 94% |
| 10 | ✗ Frequently Asked | 691 (100%) | 56% |  | |  |
| 11 | ✗ Hair Density Services | 691 (100%) | 56% |  | |  |
| 12 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 13 | ✗ Stop Hiding Your Hair. Start Lovi… | 691 (100%) | 39% |  | |  |
| 14 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-density/density-treatment-consultation`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Understand Your Hair Loss.Find Yo… | 735 (100%) | 60% | Understand Your Hair Loss.Find Yo… | 735 (100%) | 83% |
| 2 | What Is the Density Treatment Con… | 691 (100%) | 74% | What Is the Density Treatment Con… | 691 (100%) | 76% |
| 3 | ✗ we provide free, honest density c… | 691 (100%) | 46% | we provide free, honest density c… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 76% |
| 5 | ✗ In-depth scalp and density assess… | 691 (100%) | 49% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 28% | What to Expect | 691 (100%) | 83% |
| 7 | ✗ professional guidance on what to … | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 72% |
| 8 | What to Expect | 691 (100%) | 76% | The Right Solution Starts With th… | 694 (100%) | 84% |
| 9 | ✗ Frequently Asked | 691 (100%) | 38% | Footer | 552 (80%) | 98% |
| 10 | ✗ More Hair Density Services | 691 (100%) | 40% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ The Right Solution Starts With th… | 691 (100%) | 44% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-density/thinning-hair-treatment`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Thicker, Fuller HairWithout the W… | 735 (100%) | 55% | Thicker, Fuller HairWithout the W… | 735 (100%) | 77% |
| 2 | What Is Thinning Hair Treatment? | 691 (100%) | 74% | What Is Thinning Hair Treatment? | 691 (100%) | 76% |
| 3 | ✗ Rather than replacing your hair, … | 691 (100%) | 46% | Rather than replacing your hair, … | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 30% | The Benefits | 691 (100%) | 78% |
| 5 | ✗ Immediate visible improvement in … | 691 (100%) | 52% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 31% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ without moving to a full hair sys… | 691 (100%) | 42% | Frequently Asked | 691 (100%) | 75% |
| 8 | What to Expect | 691 (100%) | 79% | Fuller Hair Is Closer Than You Th… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 44% | Footer | 552 (80%) | 94% |
| 10 | ✗ More Hair Density Services | 691 (100%) | 40% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Fuller Hair Is Closer Than You Th… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-density/crown-coverage-treatment`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Cover Your Crown.Restore Your Con… | 735 (100%) | 56% | Cover Your Crown.Restore Your Con… | 735 (100%) | 76% |
| 2 | What Is Crown Coverage Treatment? | 691 (100%) | 81% | What Is Crown Coverage Treatment? | 691 (100%) | 84% |
| 3 | ✗ Crown hair loss is one of the mos… | 691 (100%) | 50% | Crown hair loss is one of the mos… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 82% |
| 5 | ✗ Works with your existing natural … | 691 (100%) | 54% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 28% | What to Expect | 691 (100%) | 83% |
| 7 | ✗ Suitable for early to moderate st… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 76% |
| 8 | What to Expect | 691 (100%) | 76% | No More Worrying About Your Crown. | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 42% | Footer | 552 (80%) | 94% |
| 10 | ✗ More Hair Density Services | 691 (100%) | 40% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ No More Worrying About Your Crown. | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-system-maintenance`: 14 screens, 8 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Keep Your System LookingIts Best. | 735 (100%) | 100% | Keep Your System LookingIts Best. | 735 (100%) | 100% |
| 2 | What It Costs | 691 (100%) | 71% | What It Costs | 691 (100%) | 76% |
| 3 | What Is Hair System Maintenance? | 691 (100%) | 81% | What Is Hair System Maintenance? | 691 (100%) | 84% |
| 4 | ✗ keep your system looking freshly … | 691 (100%) | 19% | The Benefits | 713 (103%) | 91% |
| 5 | ✗ The Benefits | 691 (100%) | 35% | Who It's For | 747 (108%) | 91% |
| 6 | Keeps your system looking freshly… | 691 (100%) | 72% | What to Expect | 691 (100%) | 86% |
| 7 | ✗ Who It's For | 691 (100%) | 58% | Frequently Asked | 728 (105%) | 95% |
| 8 | ✗ We recommend maintenance appointm… | 691 (100%) | 53% | Protect Your Investment. Book a M… | 694 (100%) | 84% |
| 9 | What to Expect | 691 (100%) | 79% | Footer | 552 (80%) | 98% |
| 10 | ✗ Frequently Asked | 691 (100%) | 67% |  | |  |
| 11 | ✗ Maintenance Services | 691 (100%) | 56% |  | |  |
| 12 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 13 | ✗ Protect Your Investment. Book a M… | 691 (100%) | 44% |  | |  |
| 14 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-system-maintenance/hair-system-reattachment-and-restyling`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Secure. Restyled.Looking Its Best… | 735 (100%) | 60% | Secure. Restyled.Looking Its Best… | 735 (100%) | 80% |
| 2 | What Is Reattachment & Restyling? | 691 (100%) | 70% | What Is Reattachment & Restyling? | 691 (100%) | 72% |
| 3 | ✗ the adhesive bonding your hair sy… | 691 (100%) | 50% | the adhesive bonding your hair sy… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 81% |
| 5 | ✗ Fresh adhesive application for ma… | 691 (100%) | 54% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 31% | What to Expect | 691 (100%) | 83% |
| 7 | ✗ Regular reattachment appointments… | 691 (100%) | 53% | Frequently Asked | 691 (100%) | 79% |
| 8 | What to Expect | 691 (100%) | 76% | Book Your Reattachment Appointmen… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 42% | Footer | 552 (80%) | 94% |
| 10 | ✗ More Maintenance Services | 691 (100%) | 45% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Book Your Reattachment Appointmen… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-system-maintenance/hair-system-base-clean-and-reattach`: 13 screens, 10 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Deep Clean. Fresh Start.Perfect R… | 735 (100%) | 64% | Deep Clean. Fresh Start.Perfect R… | 750 (102%) | 85% |
| 2 | What Is Base Clean & Reattach? | 691 (100%) | 77% | What Is Base Clean & Reattach? | 691 (100%) | 80% |
| 3 | ✗ goes deeper than a standard reatt… | 691 (100%) | 46% | goes deeper than a standard reatt… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 40% | The Benefits | 691 (100%) | 73% |
| 5 | ✗ Restores base condition and integ… | 691 (100%) | 47% | Who It's For | 691 (100%) | 91% |
| 6 | ✗ Who It's For | 691 (100%) | 28% | What to Expect | 691 (100%) | 77% |
| 7 | ✗ a deeper level of maintenance for… | 691 (100%) | 46% | Frequently Asked | 691 (100%) | 79% |
| 8 | What to Expect | 691 (100%) | 70% | Give Your System the Deep Clean I… | 691 (100%) | 79% |
| 9 | ✗ Frequently Asked | 691 (100%) | 38% | Footer | 552 (80%) | 94% |
| 10 | ✗ More Maintenance Services | 691 (100%) | 45% |  | |  |
| 11 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 12 | ✗ Give Your System the Deep Clean I… | 691 (100%) | 39% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/hair-system-maintenance/hair-system-full-maintenance-package`: 14 screens, 9 failing → 10 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Everything Your System Needs.One … | 735 (100%) | 64% | Everything Your System Needs.One … | 735 (100%) | 84% |
| 2 | What Is the Full Maintenance Pack… | 691 (100%) | 85% | What Is the Full Maintenance Pack… | 693 (100%) | 88% |
| 3 | ✗ the most comprehensive care optio… | 691 (100%) | 50% | the most comprehensive care optio… | 691 (100%) | 88% |
| 4 | ✗ The Benefits | 691 (100%) | 35% | The Benefits | 691 (100%) | 86% |
| 5 | ✗ Safe adhesive removal and scalp p… | 691 (100%) | 60% | What's Included | 691 (100%) | 79% |
| 6 | What's Included | 691 (100%) | 79% | Who It's For | 691 (100%) | 91% |
| 7 | ✗ Who It's For | 691 (100%) | 35% | What to Expect | 691 (100%) | 77% |
| 8 | ✗ every aspect of their system is l… | 691 (100%) | 50% | Frequently Asked | 751 (109%) | 93% |
| 9 | What to Expect | 691 (100%) | 70% | The Best Care for Your Most Impor… | 691 (100%) | 79% |
| 10 | Frequently Asked | 691 (100%) | 70% | Footer | 552 (80%) | 94% |
| 11 | ✗ More Maintenance Services | 691 (100%) | 45% |  | |  |
| 12 | ✗ Hair SystemsReal hair, custom fit… | 691 (100%) | 26% |  | |  |
| 13 | ✗ The Best Care for Your Most Impor… | 691 (100%) | 39% |  | |  |
| 14 | Footer | 552 (80%) | 75% |  | |  |

#### `/how-it-works`: 12 screens, 2 failing → 10 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | How Hair Replacement Works:Our 4-… | 735 (100%) | 90% | How Hair Replacement Works:Our 4-… | 735 (100%) | 90% |
| 2 | ✗ The 4-Step Process | 2671 (387%) | 93% | The 4-Step Process | 691 (100%) | 91% |
| 3 | Custom Hair System Design | 691 (100%) | 77% | Custom Hair System Design | 691 (100%) | 91% |
| 4 | Professional Hair System Reattach… | 691 (100%) | 78% | Professional Hair System Reattach… | 691 (100%) | 91% |
| 5 | Hair System Maintenance & Profess… | 691 (100%) | 82% | Hair System Maintenance & Profess… | 691 (100%) | 91% |
| 6 | Why Choose Men's Hair To Stay for… | 691 (100%) | 77% | Why Choose Men's Hair To Stay for… | 691 (100%) | 77% |
| 7 | By appointment only (private, dis… | 44 (6%) | 100% | Our Service Options | 691 (100%) | 74% |
| 8 | ✗ Our Service Options | 1142 (165%) | 92% | Scalp Micropigmentation (SMP) | 739 (107%) | 83% |
| 9 | Scalp Micropigmentation (SMP) | 284 (41%) | 96% | Ready to Start Your Hair Replacem… | 739 (107%) | 91% |
| 10 | Specialized Treatments | 284 (41%) | 92% | Footer | 552 (80%) | 97% |
| 11 | Ready to Start Your Hair Replacem… | 739 (107%) | 91% |  | |  |
| 12 | Footer | 552 (80%) | 97% |  | |  |

#### `/faq`: 25 screens, 4 failing → 9 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Frequently Asked Questions | 735 (100%) | 36% | Frequently Asked Questions | 735 (100%) | 75% |
| 2 | ✗ What is a hair system and how doe… | 4275 (619%) | 97% | What is a hair system and how doe… | 691 (100%) | 90% |
| 3 | ✗ What is a hair system and how doe… | 3796 (549%) | 100% | Are hair systems detectable or do… | 691 (100%) | 88% |
| 4 | How long do hair systems last? | 94 (14%) | 100% | What's the difference between a h… | 710 (103%) | 95% |
| 5 | Are hair systems detectable or do… | 118 (17%) | 100% | What is scalp micropigmentation (… | 691 (100%) | 88% |
| 6 | Can I swim, shower, and exercise … | 118 (17%) | 100% | How many sessions does SMP requir… | 691 (100%) | 91% |
| 7 | How much does a hair system cost? | 404 (58%) | 100% | How much does scalp micropigmenta… | 691 (100%) | 95% |
| 8 | What's the difference between a h… | 118 (17%) | 100% | Still have questions? | 692 (100%) | 90% |
| 9 | How is a hair system attached to … | 118 (17%) | 100% | Footer | 552 (80%) | 91% |
| 10 | Can I style and colour my hair sy… | 94 (14%) | 100% |  | |  |
| 11 | How often do I need maintenance f… | 118 (17%) | 100% |  | |  |
| 12 | Will wearing a hair system damage… | 428 (62%) | 100% |  | |  |
| 13 | What is scalp micropigmentation (… | 118 (17%) | 100% |  | |  |
| 14 | How long does scalp micropigmenta… | 118 (17%) | 100% |  | |  |
| 15 | Is scalp micropigmentation painfu… | 94 (14%) | 100% |  | |  |
| 16 | How many sessions does SMP requir… | 118 (17%) | 100% |  | |  |
| 17 | Can SMP work for women experienci… | 428 (62%) | 100% |  | |  |
| 18 | What's the difference between SMP… | 118 (17%) | 100% |  | |  |
| 19 | How much does scalp micropigmenta… | 118 (17%) | 92% |  | |  |
| 20 | What is the recovery time after S… | 94 (14%) | 74% |  | |  |
| 21 | Can SMP cover scars from hair tra… | 118 (17%) | 99% |  | |  |
| 22 | Can I combine hair systems with s… | 118 (17%) | 100% |  | |  |
| 23 | ✗ Still have questions? | 691 (100%) | 40% |  | |  |
| 24 | Explore more | 691 (100%) | 75% |  | |  |
| 25 | Footer | 552 (80%) | 98% |  | |  |

#### `/areas-serviced`: 14 screens, 2 failing → 5 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Hair Replacement & SMP Across Buc… | 735 (100%) | 52% | Hair Replacement & SMP Across Buc… | 735 (100%) | 91% |
| 2 | ✗ Amersham | 2635 (381%) | 97% | Amersham | 691 (100%) | 78% |
| 3 | Chesham | 188 (27%) | 96% | Chalfont St Giles | 691 (100%) | 78% |
| 4 | High Wycombe | 188 (27%) | 96% | Rickmansworth | 740 (107%) | 91% |
| 5 | Beaconsfield | 188 (27%) | 96% | Footer | 552 (80%) | 95% |
| 6 | Chalfont St Giles | 188 (27%) | 96% |  | |  |
| 7 | Chalfont St Peter | 188 (27%) | 96% |  | |  |
| 8 | Little Chalfont | 188 (27%) | 96% |  | |  |
| 9 | Gerrards Cross | 188 (27%) | 96% |  | |  |
| 10 | Rickmansworth | 188 (27%) | 96% |  | |  |
| 11 | Chorleywood | 188 (27%) | 96% |  | |  |
| 12 | Watford | 188 (27%) | 96% |  | |  |
| 13 | Berkhamsted | 210 (30%) | 95% |  | |  |
| 14 | Footer | 552 (80%) | 98% |  | |  |

#### `/areas/amersham`: 12 screens, 6 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Amersha… | 735 (100%) | 85% | Hair Replacement & SMP in Amersha… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Amersham | 691 (100%) | 88% | Hair Replacement Near Amersham | 691 (100%) | 84% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Amersham Cl… | 1895 (274%) | 95% | Services Available to Amersham Cl… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Amersham Clients Choose Us | 732 (106%) | 91% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 75% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 732 (106%) | 91% |
| 8 | ✗ Why Amersham Clients Choose Us | 792 (115%) | 92% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 59% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 66% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/chesham`: 12 screens, 6 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Chesham… | 735 (100%) | 85% | Hair Replacement & SMP in Chesham… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Chesham | 691 (100%) | 77% | Hair Replacement Near Chesham | 691 (100%) | 77% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Chesham Cli… | 1895 (274%) | 95% | Services Available to Chesham Cli… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Chesham Clients Choose Us | 708 (102%) | 90% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 79% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 706 (102%) | 91% |
| 8 | ✗ Why Chesham Clients Choose Us | 766 (111%) | 91% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 55% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/little-chalfont`: 12 screens, 5 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Little … | 735 (100%) | 85% | Hair Replacement & SMP in Little … | 735 (100%) | 85% |
| 2 | Hair Replacement Near Little Chal… | 691 (100%) | 88% | Hair Replacement Near Little Chal… | 691 (100%) | 88% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Little Chal… | 1895 (274%) | 95% | Services Available to Little Chal… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Little Chalfont Clients Choos… | 740 (107%) | 91% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 75% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 691 (100%) | 89% |
| 8 | Why Little Chalfont Clients Choos… | 740 (107%) | 91% | Footer | 552 (80%) | 98% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 51% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 62% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/chalfont-st-giles`: 12 screens, 4 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Chalfon… | 735 (100%) | 85% | Hair Replacement & SMP in Chalfon… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Chalfont St… | 691 (100%) | 84% | Hair Replacement Near Chalfont St… | 691 (100%) | 84% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Chalfont St… | 1895 (274%) | 95% | Services Available to Chalfont St… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Chalfont St Giles Clients Cho… | 714 (103%) | 91% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 86% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 732 (106%) | 91% |
| 8 | Why Chalfont St Giles Clients Cho… | 714 (103%) | 91% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 59% |  | |  |
| 10 | Frequently Asked | 691 (100%) | 76% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/chalfont-st-peter`: 12 screens, 5 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Chalfon… | 735 (100%) | 85% | Hair Replacement & SMP in Chalfon… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Chalfont St… | 691 (100%) | 84% | Hair Replacement Near Chalfont St… | 691 (100%) | 84% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Chalfont St… | 1895 (274%) | 95% | Services Available to Chalfont St… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Chalfont St Peter Clients Cho… | 691 (100%) | 90% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 82% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 732 (106%) | 91% |
| 8 | Why Chalfont St Peter Clients Cho… | 691 (100%) | 90% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 59% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/beaconsfield`: 12 screens, 5 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Beacons… | 735 (100%) | 85% | Hair Replacement & SMP in Beacons… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Beaconsfield | 691 (100%) | 88% | Hair Replacement Near Beaconsfield | 691 (100%) | 88% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Beaconsfiel… | 1895 (274%) | 95% | Services Available to Beaconsfiel… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Beaconsfield Clients Choose Us | 691 (100%) | 86% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 82% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 706 (102%) | 91% |
| 8 | Why Beaconsfield Clients Choose Us | 691 (100%) | 86% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 55% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/gerrards-cross`: 12 screens, 5 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & SMP in Gerrard… | 735 (100%) | 85% | Hair Replacement & SMP in Gerrard… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Gerrards Cr… | 691 (100%) | 84% | Hair Replacement Near Gerrards Cr… | 691 (100%) | 84% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Gerrards Cr… | 1895 (274%) | 95% | Services Available to Gerrards Cr… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Gerrards Cross Clients Choose… | 691 (100%) | 90% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 82% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 691 (100%) | 89% |
| 8 | Why Gerrards Cross Clients Choose… | 691 (100%) | 90% | Footer | 552 (80%) | 98% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 51% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/high-wycombe`: 12 screens, 7 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & Hair Systems i… | 735 (100%) | 85% | Hair Replacement & Hair Systems i… | 735 (100%) | 85% |
| 2 | ✗ Hair Replacement Near High Wycombe | 858 (124%) | 92% | Hair Replacement Near High Wycombe | 709 (103%) | 90% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to High Wycomb… | 1895 (274%) | 95% | Services Available to High Wycomb… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why High Wycombe Clients Choose Us | 721 (104%) | 91% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 82% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 732 (106%) | 91% |
| 8 | ✗ Why High Wycombe Clients Choose Us | 896 (130%) | 93% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 59% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/rickmansworth`: 12 screens, 6 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & Hair Systems i… | 735 (100%) | 85% | Hair Replacement & Hair Systems i… | 735 (100%) | 85% |
| 2 | ✗ Hair Replacement Near Rickmanswor… | 780 (113%) | 91% | Hair Replacement Near Rickmanswor… | 696 (101%) | 90% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Rickmanswor… | 1895 (274%) | 95% | Services Available to Rickmanswor… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Rickmansworth Clients Choose … | 691 (100%) | 86% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 82% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 706 (102%) | 91% |
| 8 | Why Rickmansworth Clients Choose … | 740 (107%) | 91% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 55% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/chorleywood`: 12 screens, 6 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & Hair Systems i… | 735 (100%) | 85% | Hair Replacement & Hair Systems i… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Chorleywood | 691 (100%) | 88% | Hair Replacement Near Chorleywood | 691 (100%) | 88% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Chorleywood… | 1895 (274%) | 95% | Services Available to Chorleywood… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Chorleywood Clients Choose Us | 708 (102%) | 90% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 86% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 706 (102%) | 91% |
| 8 | ✗ Why Chorleywood Clients Choose Us | 766 (111%) | 91% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 55% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/watford`: 12 screens, 5 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & Hair Systems i… | 735 (100%) | 85% | Hair Replacement & Hair Systems i… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Watford | 754 (109%) | 91% | Hair Replacement Near Watford | 720 (104%) | 91% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Watford Cli… | 1895 (274%) | 95% | Services Available to Watford Cli… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Watford Clients Choose Us | 691 (100%) | 90% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 86% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 691 (100%) | 88% |
| 8 | Why Watford Clients Choose Us | 691 (100%) | 90% | Footer | 552 (80%) | 98% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 55% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 43% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/areas/berkhamsted`: 12 screens, 6 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Replacement & Hair Systems i… | 735 (100%) | 85% | Hair Replacement & Hair Systems i… | 735 (100%) | 85% |
| 2 | Hair Replacement Near Berkhamsted | 728 (105%) | 91% | Hair Replacement Near Berkhamsted | 691 (100%) | 87% |
| 3 | ✗ Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 53% | Men's Hair To Stay, 11 Chesham Ro… | 691 (100%) | 87% |
| 4 | ✗ Services Available to Berkhamsted… | 1895 (274%) | 95% | Services Available to Berkhamsted… | 691 (100%) | 84% |
| 5 | Scalp Micropigmentation | 408 (59%) | 100% | Why Berkhamsted Clients Choose Us | 691 (100%) | 89% |
| 6 | Hair Density | 408 (59%) | 100% | Frequently Asked | 691 (100%) | 79% |
| 7 | Hair System Maintenance | 408 (59%) | 100% | Your Free Consultation | 706 (102%) | 91% |
| 8 | ✗ Why Berkhamsted Clients Choose Us | 766 (111%) | 91% | Footer | 552 (80%) | 96% |
| 9 | ✗ Your Free Consultation | 691 (100%) | 55% |  | |  |
| 10 | ✗ Frequently Asked | 691 (100%) | 69% |  | |  |
| 11 | ✗ Book Your Free Consultation from … | 691 (100%) | 48% |  | |  |
| 12 | Footer | 552 (80%) | 75% |  | |  |

#### `/blog`: 6 screens, 1 failing → 6 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | Hair Restoration Blog | 735 (100%) | 80% | Hair Restoration Blog | 735 (100%) | 80% |
| 2 | ✗ Can You Swim, Shower and Go to th… | 2078 (301%) | 97% | Can You Swim, Shower and Go to th… | 691 (100%) | 89% |
| 3 | SMP vs Hair Transplant: Which One… | 97 (14%) | 95% | The Studio Is Closed Until Friday… | 691 (100%) | 77% |
| 4 | Non-Surgical Hair Replacement for… | 97 (14%) | 95% | Thinning Hair But Not Ready for a… | 691 (100%) | 77% |
| 5 | 15 Incredible Hair Restoration Tr… | 97 (14%) | 98% | The Complete Guide to Scalp Micro… | 691 (100%) | 77% |
| 6 | Footer | 552 (80%) | 98% | Footer | 552 (80%) | 98% |

#### `/book`: 13 screens, 6 failing → 6 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Book Your Hair Replacement Consul… | 735 (100%) | 63% | Book Your Hair Replacement Consul… | 735 (100%) | 91% |
| 2 | ✗ What It Costs | 691 (100%) | 67% | What It Costs | 691 (100%) | 73% |
| 3 | Choose a Date & Time | 691 (100%) | 89% | Choose a Date & Time | 691 (100%) | 89% |
| 4 | Book your free consultation | 542 (78%) | 100% | Appointment Types | 737 (107%) | 89% |
| 5 | ✗ Appointment Types | 1853 (268%) | 96% | Booking Questions Answered | 736 (107%) | 89% |
| 6 | Regroom Services (Reattachment & … | 301 (44%) | 96% | Footer | 552 (80%) | 90% |
| 7 | Full Maintenance Package | 250 (36%) | 96% |  | |  |
| 8 | SMP Treatments (Scalp Micropigmen… | 278 (40%) | 96% |  | |  |
| 9 | Specialized Treatments | 257 (37%) | 93% |  | |  |
| 10 | ✗ Booking Questions Answered | 691 (100%) | 63% |  | |  |
| 11 | ✗ Prefer to Call? | 691 (100%) | 28% |  | |  |
| 12 | ✗ Explore More | 691 (100%) | 25% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/privacy-policy`: 28 screens, 5 failing → 7 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Privacy Policy | 735 (100%) | 16% | Privacy Policy | 735 (100%) | 74% |
| 2 | ✗ Who we are | 3387 (490%) | 96% | Who we are | 691 (100%) | 82% |
| 3 | Who we are | 32 (5%) | 92% | How we use your data | 705 (102%) | 96% |
| 4 | Men's Hair To Stay is a hair repl… | 156 (23%) | 100% | Cookies and analytics | 691 (100%) | 86% |
| 5 | What data we collect | 32 (5%) | 100% | How long we keep your data | 730 (106%) | 96% |
| 6 | When you fill in our contact form… | 78 (11%) | 99% | Contact us about your data | 691 (100%) | 93% |
| 7 | Your nameYour email addressYour p… | 154 (22%) | 93% | Footer | 552 (80%) | 98% |
| 8 | We don't collect any information … | 52 (8%) | 98% |  | |  |
| 9 | How we use your data | 32 (5%) | 100% |  | |  |
| 10 | We use the information you give u… | 26 (4%) | 99% |  | |  |
| 11 | Respond to your enquiry and answe… | 172 (25%) | 100% |  | |  |
| 12 | We never sell your personal data … | 78 (11%) | 100% |  | |  |
| 13 | Third-party services we use | 32 (5%) | 100% |  | |  |
| 14 | To run this website and its booki… | 78 (11%) | 100% |  | |  |
| 15 | Formspree processes submissions f… | 164 (24%) | 100% |  | |  |
| 16 | These providers process data on o… | 78 (11%) | 100% |  | |  |
| 17 | Cookies and analytics | 32 (5%) | 99% |  | |  |
| 18 | Our online booking calendar (prov… | 234 (34%) | 99% |  | |  |
| 19 | We also use Google Analytics 4 (G… | 286 (41%) | 99% |  | |  |
| 20 | The Google Maps that shows where … | 182 (26%) | 100% |  | |  |
| 21 | How long we keep your data | 32 (5%) | 100% |  | |  |
| 22 | We keep enquiry and contact form … | 208 (30%) | 98% |  | |  |
| 23 | ✗ Your rights | 32 (5%) | 69% |  | |  |
| 24 | ✗ You can ask us at any time to tel… | 156 (23%) | 61% |  | |  |
| 25 | Contact us about your data | 32 (5%) | 94% |  | |  |
| 26 | 11 Chesham Road, Amersham, HP6 5HN | 178 (26%) | 93% |  | |  |
| 27 | ✗ Ready to get started? | 691 (100%) | 25% |  | |  |
| 28 | Footer | 552 (80%) | 75% |  | |  |

#### `/gallery`: 9 screens, 5 failing → 8 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Hair Replacement Before & After G… | 735 (100%) | 48% | Hair Replacement Before & After G… | 735 (100%) | 89% |
| 2 | ✗ Hair System Fitting & Application | 691 (100%) | 64% | Hair System Fitting & Application | 691 (100%) | 77% |
| 3 | ✗ Hair System Fitting and Style | 691 (100%) | 36% | Hair System Fitting and Style | 691 (100%) | 77% |
| 4 | ✗ Hair System Transformation Results | 950 (137%) | 87% | Hair System Reattachment & Restyle | 691 (100%) | 77% |
| 5 | Scalp Micropigmentation (SMP) Tra… | 250 (36%) | 78% | Hair System Transformation Results | 718 (104%) | 85% |
| 6 | Hair System Maintenance & Regroom… | 328 (47%) | 96% | Why Clients Trust Men's Hair To S… | 691 (100%) | 91% |
| 7 | ✗ Why Clients Trust Men's Hair To S… | 691 (100%) | 55% | Ready to See Your Own Transformat… | 691 (100%) | 88% |
| 8 | Ready to See Your Own Transformat… | 691 (100%) | 88% | Footer | 552 (80%) | 98% |
| 9 | Footer | 552 (80%) | 97% |  | |  |

#### `/contact`: 13 screens, 8 failing → 5 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Contact Men's Hair To Stay, Hair … | 735 (100%) | 51% | Contact Men's Hair To Stay, Hair … | 735 (100%) | 86% |
| 2 | ✗ Phone | 1040 (151%) | 88% | Get in Touch | 696 (101%) | 87% |
| 3 | Email | 292 (42%) | 84% | Find Our Amersham Studio | 712 (103%) | 87% |
| 4 | Visit Our Studio | 340 (49%) | 87% | Hair Replacement Across Buckingha… | 710 (103%) | 92% |
| 5 | ✗ Get in Touch | 691 (100%) | 57% | Footer | 552 (80%) | 94% |
| 6 | ✗ Find Our Amersham Studio | 816 (118%) | 89% |  | |  |
| 7 | Studio Opening Hours | 294 (43%) | 100% |  | |  |
| 8 | ✗ Hair Replacement Across Buckingha… | 691 (100%) | 60% |  | |  |
| 9 | ✗ Why Choose Men's Hair To Stay | 955 (138%) | 90% |  | |  |
| 10 | ✗ Specialist Expertise | 238 (34%) | 61% |  | |  |
| 11 | 100% Confidential | 238 (34%) | 95% |  | |  |
| 12 | ✗ Explore More | 691 (100%) | 32% |  | |  |
| 13 | Footer | 552 (80%) | 75% |  | |  |

#### `/services`: 7 screens, 1 failing → 6 screens, 0 failing

| # | Before | Height | Fill | After | Height | Fill |
|---|---|---|---|---|---|---|
| 1 | ✗ Our Services | 735 (100%) | 13% | Our Services | 735 (100%) | 87% |
| 2 | Hair Systems | 691 (100%) | 97% | Hair Systems | 691 (100%) | 97% |
| 3 | Scalp Micropigmentation | 691 (100%) | 97% | Scalp Micropigmentation | 691 (100%) | 97% |
| 4 | Hair Density | 691 (100%) | 97% | Hair Density | 691 (100%) | 97% |
| 5 | Hair System Maintenance | 691 (100%) | 97% | Hair System Maintenance | 691 (100%) | 97% |
| 6 | Book free consultation | 118 (17%) | 98% | Footer | 552 (80%) | 89% |
| 7 | Footer | 552 (80%) | 98% |  | |  |

