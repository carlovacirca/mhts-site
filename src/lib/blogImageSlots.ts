// Computes block indices at which to insert 4 evenly-distributed in-content
// images for a blog post. Returns sorted ascending indices that are positions
// in the original blocks[] AFTER which an image should be injected.
//
// Strategy: count "p" blocks, pick the paragraphs at ~20/40/60/80% of the
// total, then snap each anchor forward to the end of its current paragraph
// (so the image always appears between paragraphs, never breaking a heading
// from its first paragraph).

export interface IndexableBlock {
  type: string;
}

export const computeImageSlots = <T extends IndexableBlock>(blocks: T[]): number[] => {
  const paragraphIdx: number[] = [];
  blocks.forEach((b, i) => {
    if (b.type === "p") paragraphIdx.push(i);
  });
  if (paragraphIdx.length === 0) return [];

  const targets = [0.2, 0.4, 0.6, 0.8];
  const slots = new Set<number>();
  for (const t of targets) {
    const pPos = Math.min(
      paragraphIdx.length - 1,
      Math.max(0, Math.floor(paragraphIdx.length * t)),
    );
    slots.add(paragraphIdx[pPos]);
  }

  while (slots.size < 4 && paragraphIdx.length > 0) {
    const last = paragraphIdx[paragraphIdx.length - 1];
    if (slots.has(last)) break;
    slots.add(last);
  }

  return Array.from(slots).sort((a, b) => a - b);
};

// Returns a new blocks array with synthetic `{ type: "img" }` blocks inserted
// at the 4 computed slot positions. Existing img blocks in the source are
// stripped first so we don't double-count.
export const withInjectedImages = <T extends IndexableBlock>(
  blocks: T[],
  makeImg: () => T,
): T[] => {
  const cleaned = blocks.filter((b) => b.type !== "img");
  const slots = new Set(computeImageSlots(cleaned));
  const out: T[] = [];
  cleaned.forEach((b, i) => {
    out.push(b);
    if (slots.has(i)) out.push(makeImg());
  });
  return out;
};
