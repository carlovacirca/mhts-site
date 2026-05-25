## Goal

Every existing blog post on both sites (Men's Hair To Stay and Georges Barbers) should render **exactly 4 in-content images** (real or placeholder), spaced through the article body the same way the reference post "Non-Surgical Hair Replacement for Men in the UK" does. Hero images, written content, headings and formatting stay untouched.

## Reference behaviour (MHTS BlogPostPage)

The reference renderer in `src/pages/BlogPostPage.tsx` groups blocks by `## H2`, then inserts one image per section after the 2nd `### H3` (or after the 2nd `<p>` if the section has no H3s). On the reference post this happens to yield ~4 images, but for posts with fewer/more H2 sections the count drifts.

## Scope of posts affected

- **MHTS** — all posts in `src/data/blogPosts.ts` rendered through `src/pages/BlogPostPage.tsx`.
- **Georges Barbers** — the 3 standalone post pages:
  - `src/pages/georges/GBSkinFadePostPage.tsx`
  - `src/pages/georges/GBEarPiercingPostPage.tsx`
  - `src/pages/georges/GBWelcomePostPage.tsx`

## Approach

### 1. MHTS — make image count deterministic (exactly 4)

Update the placeholder injection in `src/pages/BlogPostPage.tsx`:

- Pre-compute 4 anchor positions inside the parsed `blocks[]` array based on `<p>` count: insert an image after paragraph indices at roughly 20%, 40%, 60%, 80% of total paragraphs (snapping to the end of the nearest H2 section so an image never splits a heading from its first paragraph).
- Remove the current "after 2nd H3 / 2nd P" trigger.
- Keep the existing `inlineImageOverrides[post.slug]` array so the non-surgical post's custom images at slots 1 and 2 continue to display; the remaining 2 fall back to `blogPlaceholderIllustration`.

Result: every MHTS post shows exactly 4 evenly-spaced images, the reference post is unchanged.

### 2. GB — add the same 4-image logic

Each GB post page already parses its own markdown into `Block[]` and supports an `"img"` block type that today is triggered only by a literal `[IMAGE]` line in the content string. None of the 3 GB posts include `[IMAGE]` markers, so they currently render 0 in-content images.

For each of the 3 GB pages:

- Keep the parser and block types untouched (no content edits).
- After parsing, run the same 20/40/60/80%-paragraph distribution helper to inject 4 synthetic `{ type: "img" }` blocks at the chosen positions.
- Reuse each page's existing image-placeholder JSX (the dashed box with `<ImageIcon />` + "Image placeholder" label) so the visual matches the current Georges design system.

### 3. Shared helper

Extract the distribution math into one small helper (e.g. `src/lib/blogImageSlots.ts`) returning the 4 block indices to inject at, so MHTS and the 3 GB pages share identical positioning logic.

## Out of scope

- No edits to `content` strings, headings, lists or any written copy.
- No edits to hero images, featured image fields, or `image:` properties in `blogPosts.ts` / `gbBlogPosts.ts`.
- No new image assets — slots without an override show the existing placeholder.
- No changes to sidebar, FAQs, CTAs, Related Video, or Newsletter sections.

## Files touched

- `src/lib/blogImageSlots.ts` (new)
- `src/pages/BlogPostPage.tsx`
- `src/pages/georges/GBSkinFadePostPage.tsx`
- `src/pages/georges/GBEarPiercingPostPage.tsx`
- `src/pages/georges/GBWelcomePostPage.tsx`

## Verification

- Spot-check 3 MHTS posts of different lengths and all 3 GB posts in the preview: each shows 4 images spaced through the body, hero unchanged, copy unchanged.
- Confirm the non-surgical reference post still shows its 2 custom photos in slots 1–2 and placeholders in slots 3–4.
