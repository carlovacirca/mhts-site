import { useEffect, useRef, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { isPrerenderPass } from "@/lib/prerender";

// One client, one frame: the Before photograph, a fade to the After, a hold,
// and a fade back, on a loop. Carlo's decision after the 4b preview: the drag
// slider was hard to use on a phone, so nothing here asks the reader to do
// anything. There is no handle, no swipe and no instruction text.
//
// How it is built, and why:
//
//  - The fade is a CSS keyframe animation (mhts-ba-fade in src/index.css), not
//    a JavaScript timer. It is paused until this frame is on screen, and an
//    IntersectionObserver switches it on and off as the frame comes and goes,
//    so frames off screen cost nothing.
//  - Reduced motion is handled in CSS too: under prefers-reduced-motion the
//    frame shows Before and After side by side, still, each with its label.
//    Doing it in CSS means the pre-rendered HTML and React's first render are
//    identical whatever the reader's setting.
//  - Both photographs are always in the HTML with their own alt text. The
//    pre-render captures the frame paused on Before and never bakes the
//    "playing" flag, so nothing is saved part way through a fade.
//  - The Before and After labels are visual only (aria-hidden); the alt text
//    already says which photograph is which.

interface BeforeAfterFadeProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** Shown under the frame, e.g. "Client one, hair system". */
  caption: string;
  /** Classes for the frame's shape, e.g. an aspect ratio per breakpoint. */
  frameClassName?: string;
  sizes?: string;
  className?: string;
}

const BeforeAfterFade = ({
  before,
  after,
  beforeAlt,
  afterAlt,
  caption,
  frameClassName = "aspect-square",
  sizes = "(max-width: 768px) 100vw, 360px",
  className = "",
}: BeforeAfterFadeProps) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = frameRef.current;
    if (!el || isPrerenderPass() || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const label =
    "pointer-events-none absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white";

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        data-testid="before-after-fade"
        data-playing={playing ? "1" : "0"}
        className={`mhts-ba relative w-full overflow-hidden rounded-lg border border-mhts-stone bg-mhts-sand ${frameClassName}`}
      >
        <div className="mhts-ba-before absolute inset-0">
          <ResponsiveImage
            src={before}
            alt={beforeAlt}
            className="h-full w-full object-cover object-[50%_30%]"
            sizes={sizes}
          />
          <span className={`${label} mhts-ba-label-before bg-mhts-ink/85`} aria-hidden="true">
            Before
          </span>
        </div>
        <div className="mhts-ba-after absolute inset-0">
          <ResponsiveImage
            src={after}
            alt={afterAlt}
            className="h-full w-full object-cover object-[50%_30%]"
            sizes={sizes}
          />
          <span className={`${label} bg-mhts-red`} aria-hidden="true">
            After
          </span>
        </div>
      </div>
      <figcaption className="mt-2.5 text-center font-body text-xs text-muted-foreground">{caption}</figcaption>
    </figure>
  );
};

export default BeforeAfterFade;
