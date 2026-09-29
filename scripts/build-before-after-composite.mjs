// Builds the side-by-side before and after JPEGs used as the hero image on the
// two posts that used to carry generated faces.
//
// Why it exists: "15 Incredible Hair Restoration Transformations: Real Before &
// After Results" led with three AI faces presented as a transformation, and the
// hair systems versus SMP comparison led with two more. Publishing a generated
// face as a client result is a trust problem and an advertising-standards one.
// See docs/DESIGN-AUDIT.md finding 3.
//
// The replacements are built from the studio's own consented client
// photographs, the same three pairs the homepage shows. Run it with
//   node scripts/build-before-after-composite.mjs
// and commit what it writes. It is deliberately not part of the build: the
// output is a committed asset, not something regenerated on every deploy.
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const ASSETS = join(ROOT, "src/assets");

const WIDTH = 1536;
const HEIGHT = 1024;
const GAP = 8;
const HALF = Math.round((WIDTH - GAP) / 2);

// Where the labels can safely go.
//
// The blog hero is `w-full h-[40vh] md:h-[60vh] object-cover`, so the crop is
// whatever the viewport makes it and it is never the whole image. At 1280 wide
// the box is 2.37:1 and 188px is cut from the top and the bottom of the source;
// at 390 it is 1.15:1 and 177px is cut from each side. A label bar along the
// bottom edge, which is the obvious way to do this, is simply not there on a
// desktop. These two badges sit inside the band that survives both crops.
const SAFE_TOP = 188;
const SAFE_BOTTOM = HEIGHT - 188;
const SAFE_X = 177;

const BADGE_H = 64;
const BADGE_W = 232;
const BADGE_Y = SAFE_BOTTOM - BADGE_H - 28;

const INK = "rgb(33,35,39)";
const RED = "rgb(219,36,27)";

/** A rounded pill with the word in it, drawn as SVG so it is part of the JPEG. */
const badge = (text, fill) =>
  Buffer.from(
    `<svg width="${BADGE_W}" height="${BADGE_H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${BADGE_W}" height="${BADGE_H}" rx="${BADGE_H / 2}" fill="${fill}"/>
      <text x="50%" y="50%" dy="0.36em" text-anchor="middle"
            font-family="DejaVu Sans, Verdana, Arial, sans-serif"
            font-size="30" font-weight="bold" letter-spacing="5"
            fill="#ffffff">${text}</text>
    </svg>`
  );

const half = async (file) =>
  sharp(join(ASSETS, file)).resize(HALF, HEIGHT, { fit: "cover", position: "top" }).toBuffer();

async function build({ before, after, out }) {
  const [beforeBuf, afterBuf] = await Promise.all([half(before), half(after)]);
  const rightX = HALF + GAP;

  await sharp({
    create: { width: WIDTH, height: HEIGHT, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite([
      { input: beforeBuf, left: 0, top: 0 },
      { input: afterBuf, left: rightX, top: 0 },
      { input: badge("BEFORE", INK), left: SAFE_X + 36, top: BADGE_Y },
      { input: badge("AFTER", RED), left: WIDTH - SAFE_X - 36 - BADGE_W, top: BADGE_Y },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(join(ASSETS, out));

  const meta = await sharp(join(ASSETS, out)).metadata();
  console.log(`  ${out}  ${meta.width}x${meta.height}  labels at y=${BADGE_Y}, inside the ${SAFE_TOP} to ${SAFE_BOTTOM} band`);
}

const jobs = [
  // Pair 1 goes to the transformations post, pair 2 to the comparison post.
  { before: "mhts-before-1.jpg", after: "mhts-after-1.jpg", out: "mhts-before-after-composite-1.jpg" },
  { before: "mhts-before-2.jpg", after: "mhts-after-2.jpg", out: "mhts-before-after-composite-2.jpg" },
  // Pair 3 is the inline image for whichever of the two posts takes one.
  { before: "mhts-before-3.jpg", after: "mhts-after-3.jpg", out: "mhts-before-after-composite-3.jpg" },
];

console.log("Building before and after composites from the real client photographs\n");
for (const job of jobs) await build(job);
console.log("\nDone. Commit the files in src/assets.");
