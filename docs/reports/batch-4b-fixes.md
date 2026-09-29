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

How the pages were fitted:

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
