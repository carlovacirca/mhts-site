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

  // If we have fewer unique paragraph anchors than 4 (very short posts),
  // pad with the last paragraph index repeated — caller can still render
  // up to N images, but typically short posts will yield fewer slots.
  while (slots.size < 4 && paragraphIdx.length > 0) {
    const last = paragraphIdx[paragraphIdx.length - 1];
    if (slots.has(last)) break;
    slots.add(last);
  }

  return Array.from(slots).sort((a, b) => a - b);
};
