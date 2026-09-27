// Responsive variants for every image in src/assets, built automatically.
//
// Before this, the site shipped 43 original JPEGs totalling about 17 MB, with no
// WebP and no srcset, so a 1600x900 hero was downloaded in full to fill a
// 278x174 blog card. See docs/HEALTH-CHECK.md finding 6.
//
// The two globs below are the whole mechanism. They match a folder, not a list,
// so a hero image committed to src/assets by the weekly blog automation is
// picked up on the next build with no manual step and no code change.

export interface PictureSource {
  /** The plain URL a component already has from a normal import. */
  src: string;
  /** srcset per format, WebP first, original format last as the fallback. */
  sources: Record<string, string>;
  /** Intrinsic size of the largest variant, used for width and height. */
  width: number;
  height: number;
}

type ImagetoolsPicture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

// Variant ladder. 400 covers gallery thumbs and blog cards at 2x on a phone,
// 800 covers a full-width phone hero at 2x, 1200 and 1600 cover desktop.
// withoutEnlargement means a small source is never upscaled, so no variant is
// ever larger than the file we started with.
const PICTURES = import.meta.glob<ImagetoolsPicture>("/src/assets/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?w=400;800;1200;1600&format=webp;jpg&quality=80&withoutEnlargement&as=picture",
  import: "default",
});

// The same files imported the ordinary way, so we can map the URL a component
// already holds onto its variants. No query here on purpose: imagetools claims
// any import that carries one, including ?url, and would hand back a variant
// instead of the plain asset URL the components actually hold.
const PLAIN = import.meta.glob<string>("/src/assets/*.{jpg,jpeg,png}", {
  eager: true,
  import: "default",
});

const byUrl = new Map<string, PictureSource>();

for (const [path, url] of Object.entries(PLAIN)) {
  const pic = PICTURES[path];
  if (!pic?.img?.src) continue;
  byUrl.set(url, {
    src: pic.img.src,
    sources: pic.sources,
    width: pic.img.w,
    height: pic.img.h,
  });
}

/**
 * Variants for an already-imported image URL, or undefined if we have none.
 *
 * Undefined is a normal outcome, not an error: SVGs, remote URLs and anything
 * outside src/assets fall through to a plain <img>, which is why adding this
 * could not break an existing image.
 */
export const getPicture = (src: string | undefined): PictureSource | undefined =>
  src ? byUrl.get(src) : undefined;

/** How many images have variants. Used by the tests. */
export const pictureCount = (): number => byUrl.size;
