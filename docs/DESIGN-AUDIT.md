# MHTS design audit (28 Sep 2026)

Scope: menshairtostay.co.uk, homepage, header and menu, a service page (/hair-systems), /services, /blog, a post, /book, /gallery, footer. Checked at 390px (phone) and 1280px (desktop) on a build identical to live, plus the source (`BrandHeader.tsx`, `MHTSLanding.tsx`, `index.css`, `tailwind.config.ts`, `src/content/blog`). Nothing was changed.

Carlo's asks (28 Sep) are covered below: before and after straight under the hero, a cleaner menu, more colour and more engaging, new images for blog posts that show AI faces, the shine on the main button, Google reviews as a carousel.

## Verdict in one line

The site is clean and trustworthy but reads as a grey template: every section is the same eyebrow, thin heading, short rule and white cards, there is almost no colour or real photography after the hero, the proof (before and after, reviews) is buried halfway down, and the menu repeats itself.

## Critical (fix first)

1. **Proof is buried.** On a phone the before and after photos start 3,359px down, about four screens of scrolling (after the hero, trust strip, services and maintenance). For this business the photos are the sale. Move them directly under the hero (Carlo's ask; also in the 28 Sep decisions).
2. **Before and after photos show clients' full faces.** Pair 2 shows a whole face in both halves, pair 3 most of one. Decision already made: only consented photos, cropped so nobody is recognisable. Confirm consent for each before it moves to the top of the page.
3. **AI faces on 8 blog posts, including a "real results" post.** Posts with an AI face as the main image: best-hair-transplant-alternatives-non-surgical-solutions, hair-restoration-before-after-transformations, hair-system-maintenance-guide, hair-systems-vs-scalp-micropigmentation, modern-hair-system-vs-surgery, non-surgical-hair-replacement-men-uk, ultimate-guide-hair-systems, womens-hair-loss-solutions-guide. The worst is "15 Incredible Hair Restoration Transformations: Real Before & After Results", whose image is three AI faces presented as a transformation: a trust and advertising-standards risk. Recreate all 8 with no faces (same image rules as the automation: from behind or cropped, no text). About $0.32 at $0.04 each. The same studio photo is also the image on 3 posts (august-closure, hair-system-maintenance-4-to-6-weeks, what-happens-at-a-free-hair-loss-consultation); optional to replace.
4. **Menu is cluttered and repeats itself.** Phone menu: 11 links in a centred 3-column grid split into three groups ("Services" is a link and then "Service categories" lists the services again), centred text in a grid is hard to scan, and there is no Call button in it. Desktop: a home icon and the logo both go home, "Areas Serviced" wraps onto two lines, and the Services dropdown adds a second column (How It Works, Gallery) that has nothing to do with services.

## Major

5. **No colour system.** The MHTS theme is five greys (`--mhts-charcoal`, `navy`, `slate`, `white`, `light`); the site's `--primary` and `--accent` tokens are still the Georges Barbers green and gold and are not used by MHTS. The only colour on the page is the logo red (#DB241B, measured from the logo). Buttons, stars, icons and links are all black or grey.
6. **Headings are too thin.** Every MHTS heading is DM Sans weight 300 with wide letter spacing. On the dark hero and grey sections they look faint and lack authority; the hero headline does not hold the eye.
7. **Every section looks the same.** Small uppercase eyebrow, light heading, 40px rule, white cards, on alternating light grey. On almost every one of the homepage's 11 sections. No rhythm, no visual anchor, nothing to stop the scroll.
8. **Almost no real photography after the hero.** Service cards are text only. Service pages are long text blocks in a narrow column with one hero photo. The studio, the specialist at work, and hair system close-ups are the strongest trust signals and barely appear.
9. **Reviews are weak.** Three static cards, black stars, first name only, no Google logo, no rating total or review count, no link to Google. Decision already made: carousel of real verbatim Google reviews, swipe and pause, link to Google, no self-serving review schema.
10. **Hero does not convert as well as it could.** The studio photo sits behind a heavy dark overlay and a busy logo banner; the two buttons are white and outline, so nothing pops. No rating or proof in the first screen.
11. **Phone page is too long.** Homepage is 11,300px on a phone. Maintenance, FAQ, blog, areas, book and contact all stack. Several can be shortened or merged.
12. **Empty-looking blocks when cookies are declined.** The booking section shows a line of small text and "Enable cookies to book online"; the map is a blank grey box. That is most first visits. Show a proper call and consultation panel and a static map image with "Open in Google Maps" instead.
13. **Sticky "Book" bar is at the top on phones.** It takes 56px of the first screen under the header. Best practice and the 28 Sep decision: a sticky bar at the bottom (thumb zone) with Book free consultation and a tap-to-call button.

## Minor

14. **Footer looks unfinished.** The logo is a JPEG on a white box, the three columns are unbalanced, and the black "Visit Us" slab covers only the right third. The email everywhere is georgesbarbers1991@gmail.com (decision: info@menshairtostay.co.uk).
15. **Trust strip text is tiny.** 10 to 11px grey text on charcoal in four long paragraphs. Make them 4 short chips: icon plus two or three words.
16. **Service pages: "Contact us for pricing" four times** in a row under "What It Costs" (health check #20, Carlo's decision), and 5 cramped sub-service cards on desktop.
17. **Blog listing:** good structure (featured post, categories, sidebar), but the dark banner is tall and the cards are plain. Fine once the images are fixed.
18. **Brand casing is mixed** ("Men's Hair To Stay" 203 times, "Men's Hair to Stay" 35 times in the built pages). Decision: "Men's Hair To Stay".

## Recommendations

### Colour and type (fixes 5, 6, 7)

- Keep the premium, discreet feel: this is hair loss, and loud colour cheapens it. Colour comes from three places: the logo red as the one accent, warm neutrals instead of cold greys, and real photography.
- Tokens: `--mhts-red` #DB241B (white text on it passes AA at 4.9:1; red text on the sand colour is 4.4:1, so red text there only at 18px and up) for primary buttons, stars, icons, active menu item, links on hover, small rules; `--mhts-ink` charcoal kept for text and dark bands; `--mhts-sand` a warm off-white (about #F6F1EA) replacing the cold light grey on alternate sections; `--mhts-stone` a warm mid tone for borders.
- Point `--primary` and `--accent` at the MHTS colours so shadcn components stop inheriting Georges green and gold.
- Headings DM Sans 600 (hero 700), tighter letter spacing; keep 300 to 400 only for body. Eyebrows in red, used on fewer sections.
- One dark band with a subtle red glow or gradient behind the reviews or final CTA to break the page up.
- Shine: a slow diagonal shimmer on the main "Book free consultation" button only, every few seconds, off when the visitor has reduced motion turned on.

### Menu (fix 4)

- Desktop, left to right: logo (no home icon), Treatments (dropdown: Hair Systems, Scalp Micropigmentation, Hair Density, Maintenance, each with one line of description), Results, Reviews, Blog, Contact, then phone number and the red Book button. How It Works, FAQ and Areas move to the footer and to in-page links. Nothing wraps.
- Phone: full-height panel, one left-aligned column, large tap targets: the 4 treatments with small icons, Results, Blog, FAQ, Contact; Book and Call as two big buttons at the bottom.
- No page loses its internal links: every page removed from the menu stays linked from the footer and from the homepage.

### Homepage order (fixes 1, 9, 10, 11)

1. Hero: lighter overlay, stronger headline, red Book button with shine, secondary Call button, a proof line under it (Google rating stars and count, "8+ years", "private studio in Amersham").
2. Before and after slider (drag handle), consented and cropped photos, 3 to 5 pairs, caption per pair (treatment type).
3. Google reviews carousel with rating summary and "Read all reviews on Google".
4. Treatments: 4 photo cards with red icon, one line each, "See treatment".
5. How it works in 3 steps (short), link to the full page.
6. FAQ (4 questions, not 6).
7. Latest from the blog (3 cards).
8. Book and contact merged: call panel, hours, static map, areas as a single line of links.

### Service pages (fixes 8, 16)

- Photo or illustration beside each block of text, pull out one key fact per section, related-treatments cards at the end (decision), sticky bottom bar on phones, pricing section rewritten per Carlo's #20 decision.

### Blog images (fix 3)

- Recreate the 8 face images with the automation's image rules (no faces or identifiable people, no text). Show Carlo a sheet of the new images before they go in. About $0.32.

## How to ship it

Batch 4 is big. Suggested split, each its own Claude Code prompt, PR and preview, after the batch 3 merge on Mon 5 Oct:

- **4a Look and menu:** colour and type tokens, headings, menu desktop and phone, hero, CTA shine, sticky bottom bar, footer, info@ email and brand casing.
- **4b Homepage and proof:** new section order, before and after slider, Google reviews carousel, empty-state fixes for booking and map, trust chips.
- **4c Service pages and blog:** service page layout, related treatments, alias 301s, schema upgrade, GA4 key events, table support, CTA block, Key takeaways, Updated on date, the 8 image recreations, #38.

Carlo decides before 4a: approve the red plus warm neutral direction; which before and after photos have consent; the Google rating and review count to show; the reviews to feature.

## Carlo's decisions (28 Sep, supersede anything above)

- Client photos: all 3 before and after pairs on the homepage are consented and are shown as they are (faces included). Do not crop or ask again.
- The two blog posts with fake AI before and afters (hair-restoration-before-after-transformations, hair-systems-vs-scalp-micropigmentation) use the real homepage before and after photos instead.
- The other 6 posts with AI faces get new AI images with no faces (done separately, about $0.24).
- Colour: approved, logo red plus warm neutrals, and more colourful overall. Every page gets its own redesign with relevant transitions.
- Menu: stop repeating itself.
- Cookies: fix the empty booking and map blocks.
- Phone: a Call button sits next to every "Book free consultation" button.
- Reviews: keep the 3 real reviews on the site, styled as Google reviews (Google logo, stars, "on Google"), in an engaging auto-playing carousel with swipe and pause. No review schema, no invented dates or photos.
- Build order: batch 4a (colour, type, menu, CTAs, homepage, reviews, cookie blocks, footer, transitions, the 2 blog image swaps), then 4b (redesign of every other page), then 4c (blog structure, schema, SEO items).
