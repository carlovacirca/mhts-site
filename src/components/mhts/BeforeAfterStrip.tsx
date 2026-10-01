import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { stripGutter } from "@/lib/carousel";
import BeforeAfterFade from "@/components/mhts/BeforeAfterFade";
import { Reveal, usePrefersReducedMotion } from "@/lib/motion";

// The homepage's before and afters (Carlo, after the 4b fixes preview).
//
// Phone: one client at a time in a swipeable strip, the same kind of strip as
// the Google reviews. Each client shows Before for 2 seconds, fades to After,
// holds After for 2 seconds, then the strip moves on to the next client; after
// the third it goes back to the first. It only runs while the strip is on
// screen. Swiping works as it always does (a native scroll-snap row) and
// restarts the cycle on the client swiped to. No instruction text.
//
// Reduced motion: nothing moves on its own. Each frame shows Before and After
// side by side, still (the CSS in BeforeAfterFade's rules), and the reader
// swipes or uses the arrows.
//
// From md up: the three clients in a row, each looping on its own, exactly as
// before.
//
// The timing is a pair of timeouts that only run on a phone, on screen. The
// cross-fade itself is CSS (data-phase, src/index.css), so the pre-rendered
// HTML always shows Before and nothing can be captured mid-fade.

export interface BeforeAfterPair {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
}

const BEFORE_MS = 2000;
const FADE_MS = 600;
const AFTER_MS = 2000;
const PHONE = "(max-width: 767.98px)";

interface BeforeAfterStripProps {
  pairs: BeforeAfterPair[];
  frameClassName: string;
  sizes: string;
}

const BeforeAfterStrip = ({ pairs, frameClassName, sizes }: BeforeAfterStripProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState<"before" | "after">("before");
  const [onScreen, setOnScreen] = useState(false);
  const [phone, setPhone] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const list = window.matchMedia(PHONE);
    const onChange = () => setPhone(list.matches);
    onChange();
    list.addEventListener?.("change", onChange);
    return () => list.removeEventListener?.("change", onChange);
  }, []);

  const scrollToIndex = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const slide = track?.children[index] as HTMLElement | undefined;
      if (!track || !slide) return;
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - stripGutter(track), behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  // Whether the strip is on screen, and which client is in view (a swipe
  // changes it, and so does the strip moving on by itself).
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const screen = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.5 });
    screen.observe(track);
    const slides = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Array.prototype.indexOf.call(track.children, entry.target);
          if (index >= 0) setActive(index);
        }
      },
      { root: track, threshold: 0.6 },
    );
    Array.from(track.children).forEach((child) => slides.observe(child));
    return () => {
      screen.disconnect();
      slides.disconnect();
    };
  }, []);

  // The cycle for the client in view: Before, After, then the next client.
  useEffect(() => {
    setPhase("before");
    if (!phone || !onScreen || reduced) return;
    const toAfter = window.setTimeout(() => setPhase("after"), BEFORE_MS);
    const toNext = window.setTimeout(() => {
      const next = (active + 1) % pairs.length;
      setActive(next);
      scrollToIndex(next);
    }, BEFORE_MS + FADE_MS + AFTER_MS);
    return () => {
      window.clearTimeout(toAfter);
      window.clearTimeout(toNext);
    };
  }, [active, phone, onScreen, reduced, pairs.length, scrollToIndex]);

  const go = (index: number) => {
    const next = (index + pairs.length) % pairs.length;
    setActive(next);
    scrollToIndex(next);
  };

  return (
    <div>
      <div
        ref={trackRef}
        data-testid="before-after-strip"
        role="group"
        aria-roledescription="carousel"
        aria-label="Before and after, three clients"
        className="mhts-snap-x -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-auto md:grid md:w-full md:max-w-4xl md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0"
      >
        {pairs.map((pair, i) => (
          <div
            key={pair.label}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${pairs.length}, ${pair.label}`}
            className="w-[85%] shrink-0 snap-center snap-always md:w-auto md:snap-align-none"
          >
            <Reveal delay={i * 0.06}>
              <BeforeAfterFade
                {...pair}
                caption={pair.label}
                frameClassName={frameClassName}
                sizes={sizes}
                phase={i === active ? phase : "before"}
              />
            </Reveal>
          </div>
        ))}
      </div>

      {/* The same controls as the reviews strip: arrows and a dot per client.
          Phone only; from md up all three are in view. */}
      <div className="mt-3 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous client"
          className="grid h-10 w-10 place-items-center rounded-full border border-mhts-stone-deep text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex items-center">
          {pairs.map((pair, i) => (
            <button
              key={pair.label}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show client ${i + 1} of ${pairs.length}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-10 w-10 place-items-center rounded-full"
            >
              <span className={`h-2.5 rounded-full transition-all ${i === active ? "w-7 bg-mhts-red" : "w-2.5 bg-mhts-stone-deep"}`} />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next client"
          className="grid h-10 w-10 place-items-center rounded-full border border-mhts-stone-deep text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default BeforeAfterStrip;
