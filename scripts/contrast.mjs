// Checks every foreground and background pair the MHTS palette actually uses
// against WCAG 2.1 AA, and exits non-zero if one fails.
//
// The palette is a red on warm neutrals, and red is the colour most likely to
// be put somewhere it does not pass: #DB241B is 4.91:1 on white, which is fine
// for body text, but only 4.37:1 on the sand colour and 3.21:1 on the dark
// bands. That is why there are three reds rather than one, and this script is
// what stops the wrong one being used.
//
//   node scripts/contrast.mjs
//
// Colours are read from the token block in src/index.css, so a token edited
// there is checked here without anything being copied by hand.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(ROOT, "src/index.css"), "utf8");

/** Pull `--name: H S% L%;` out of the :root block. */
function token(name) {
  const m = css.match(new RegExp(`--${name}:\\s*([\\d.]+)\\s+([\\d.]+)%\\s+([\\d.]+)%`));
  if (!m) throw new Error(`token --${name} not found in src/index.css`);
  return hslToRgb(Number(m[1]), Number(m[2]) / 100, Number(m[3]) / 100);
}

function hslToRgb(h, s, l) {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x]
    : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return [r + m, g + m, b + m].map((v) => Math.round(v * 255));
}

const hex = ([r, g, b]) => "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0").toUpperCase()).join("");

function luminance([r, g, b]) {
  const lin = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const WHITE = [255, 255, 255];
const C = {
  red: token("mhts-red"),
  redDeep: token("mhts-red-deep"),
  redLight: token("mhts-red-light"),
  redTint: token("mhts-red-tint"),
  ink: token("mhts-ink"),
  sand: token("mhts-sand"),
  stone: token("mhts-stone"),
  stoneDeep: token("mhts-stone-deep"),
  deep: token("mhts-deep"),
  card: WHITE,
  background: hslToRgb(0, 0, 0.98),
  muted: token("muted-foreground"),
  white: WHITE,
};

// kind:
//   "text"       4.5:1. Body copy, labels, anything under 24px.
//   "large"      3.0:1. 24px, or 18.66px bold.
//   "ui"         3.0:1. Anything needed to identify a control or its state,
//                which is what WCAG 1.4.11 covers: outline button borders, the
//                focus ring, the carousel dots.
//   "decorative" no requirement. A shape that carries no information and sits
//                behind something that does. 1.4.11 exempts these by name.
//   "brand"      reported, not enforced. A third party's own colour that we are
//                not free to alter, and where the same information is given in
//                text as well.
const PAIRS = [
  ["White on the red button", C.white, C.red, "text"],
  ["White on the red button, hover", C.white, C.redDeep, "text"],
  ["Red button against the white card", C.red, C.card, "ui"],
  ["Eyebrows and links, red on white", C.redDeep, C.card, "text"],
  ["Eyebrows and links, red on sand", C.redDeep, C.sand, "text"],
  ["Eyebrows and links, red on the page background", C.redDeep, C.background, "text"],
  ["Body text on white", C.ink, C.card, "text"],
  ["Body text on sand", C.ink, C.sand, "text"],
  ["Muted text on white", C.muted, C.card, "text"],
  ["Muted text on sand", C.muted, C.sand, "text"],
  ["White on the deep dark band", C.white, C.deep, "text"],
  ["White on the ink band", C.white, C.ink, "text"],
  ["Footer headings, light red on deep", C.redLight, C.deep, "text"],
  ["Light red on ink", C.redLight, C.ink, "text"],
  ["Hero headline accent, light red on deep", C.redLight, C.deep, "large"],
  ["Red icon inside its tint circle", C.red, C.redTint, "ui"],
  ["Tint circle against the white card", C.redTint, C.card, "decorative"],
  ["Card edge, stone on white", C.stone, C.card, "decorative"],
  ["Card edge, stone on sand", C.stone, C.sand, "decorative"],
  ["Outline button border on white", C.stoneDeep, C.card, "ui"],
  ["Outline button border on sand", C.stoneDeep, C.sand, "ui"],
  ["Inactive carousel dot on sand", C.stoneDeep, C.sand, "ui"],
  ["Red rule against white", C.red, C.card, "ui"],
  ["Red rule against sand", C.red, C.sand, "ui"],
  ["Focus ring, red against white", C.red, C.card, "ui"],
  // Google's own star yellow, which the review block must use to be honest
  // about where the reviews came from. Every star group carries an aria-label
  // spelling the rating out, so the rating is never colour-only.
  ["Google yellow star against white", [251, 188, 4], C.card, "brand"],
  // The three avatar circles in the reviews, white initial on each.
  ["Review avatar, white on Google blue", C.white, [26, 115, 232], "text"],
  ["Review avatar, white on Google green", C.white, [11, 128, 67], "text"],
  ["Review avatar, white on brand red", C.white, [179, 52, 27], "text"],
  // Deliberately recorded failures, to document why the extra reds exist.
  ["(not used) brand red as text on sand", C.red, C.sand, "text"],
  ["(not used) brand red as text on deep", C.red, C.deep, "text"],
];

const NEED = { text: 4.5, large: 3, ui: 3, decorative: 0, brand: 0 };

let failures = 0;
const rows = [];
for (const [name, fg, bg, kind] of PAIRS) {
  const r = ratio(fg, bg);
  const need = NEED[kind];
  const documented = name.startsWith("(not used)");
  const pass = r >= need;
  if (!pass && !documented) failures++;
  const note =
    kind === "decorative" ? "decorative, exempt"
    : kind === "brand" ? "Google's own colour, rating also given in text"
    : null;
  rows.push({
    pair: name,
    fg: hex(fg),
    bg: hex(bg),
    ratio: r.toFixed(2) + ":1",
    needs: need.toFixed(1),
    result: documented
      ? "fails, which is why it is not used"
      : note ?? (pass ? "PASS" : "FAIL"),
  });
}

console.table(rows);
const enforced = PAIRS.filter(
  ([name, , , kind]) =>
    !name.startsWith("(not used)") && kind !== "decorative" && kind !== "brand"
).length;
console.log(
  failures === 0
    ? `\nAll ${enforced} pairs WCAG AA applies to pass. ` +
        `${PAIRS.length - enforced - 2} are exempt and are listed above with the reason.`
    : `\n${failures} of ${enforced} pair(s) fail WCAG AA.`
);
process.exit(failures === 0 ? 0 : 1);
