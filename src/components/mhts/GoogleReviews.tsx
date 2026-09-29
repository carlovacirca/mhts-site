import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import GoogleMark from "@/components/mhts/GoogleMark";
import GoogleStars from "@/components/mhts/GoogleStars";
import { GOOGLE_MAPS_URL } from "@/lib/site";
import { usePrefersReducedMotion } from "@/lib/motion";
import { wasPrerendered } from "@/lib/prerender";

// The three real Google reviews, verbatim, with the names as they appear.
// Carlo's decision, 28 Sep: no invented dates, no invented photographs, no
// rating total or review count, and no Review or AggregateRating schema. A
// business marking up its own reviews is what Google's structured data policy
// forbids, and the counts we would need are not ours to state.
const reviews = [
  {
    name: "Leigh",
    text: "Their expertise in fitting hair replacement systems is unmatched. My new hair replacement system looks incredibly natural and has completely transformed my appearance. They are truly the gold standard in the industry.",
    rating: 5,
    avatar: "#1A73E8",
  },
  {
    name: "Fayaz",
    text: "I had thinning hair and got a hair system and it looks amazing. The team are so nice, supportive and understanding. Having bad hair made me feel ugly and stressed out. I can guarantee you, you'll feel so much better. Lads, do it here!",
    rating: 5,
    avatar: "#0B8043",
  },
  {
    name: "Sam",
    text: "The salon is friendly and welcoming. Lexie and Carly are incredibly talented, they know how to bring the best out of my hair and make me feel comfortable throughout every visit. Highly recommend.",
    rating: 5,
    avatar: "#B3341B",
  },
];

const AUTOPLAY_MS = 6000;

/**
 * An auto-playing reviews carousel built on a native scroll-snap row.
 *
 * Choosing the browser's own scroller over a transform track buys three things
 * at once: swipe is real swipe on a phone with no touch handling of our own,
 * every review is in the HTML and fully readable with JavaScript switched off,
 * and nothing is ever positioned with an inline opacity, so the pre-render
 * cannot capture a card mid-fade and the build guard stays green.
 *
 * The fade between cards comes from a CSS rule that only applies once
 * `data-carousel-ready` is set, which is to say only once JavaScript is
 * running. See src/index.css.
 */
/** `compact` tightens the spacing for the homepage, where it has to fit one screen. */
const GoogleReviews = ({ compact = false }: { compact?: boolean } = {}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // Seeded from the pre-rendered HTML so React's first render matches what the
  // build captured. Flipping this after mount used to add the dimming a frame
  // late, and gating the controls on it shifted everything below them.
  const [ready, setReady] = useState(() => wasPrerendered());
  const pausedRef = useRef(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => setReady(true), []);

  const scrollToIndex = useCallback(
    (index: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const slide = track.children[index] as HTMLElement | undefined;
      if (!slide) return;
      track.scrollTo({
        left: slide.offsetLeft - track.offsetLeft,
        behavior: smooth && !reduced ? "smooth" : "auto",
      });
    },
    [reduced],
  );

  // Which card is in view drives both the dots and the dimming.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Array.prototype.indexOf.call(
            track.children,
            entry.target,
          );
          if (index >= 0) setActive(index);
        }
      },
      { root: track, threshold: 0.6 },
    );
    Array.from(track.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  // Autoplay. Paused by hover, by keyboard focus anywhere inside, by a touch,
  // and switched off entirely for a reader who has asked for reduced motion.
  useEffect(() => {
    if (reduced) return;
    // From md up the reviews are a plain row of three, so there is nothing to
    // advance.
    if (typeof window.matchMedia === "function" && window.matchMedia("(min-width: 768px)").matches) return;
    const timer = window.setInterval(() => {
      if (pausedRef.current) return;
      setActive((current) => {
        const next = (current + 1) % reviews.length;
        scrollToIndex(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [reduced, scrollToIndex]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const go = (delta: number) => {
    const next = (active + delta + reviews.length) % reviews.length;
    setActive(next);
    scrollToIndex(next);
  };

  return (
    <div
      data-testid="reviews-carousel"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      onTouchStart={pause}
      onPointerDown={pause}
    >
      {/* Header card: the Google logo, five stars, and the way out to the listing. */}
      <div className={`mx-auto flex max-w-3xl flex-col items-center rounded-xl border border-mhts-stone bg-card px-6 text-center sm:flex-row sm:justify-between sm:text-left ${compact ? "mb-5 gap-3 py-4" : "mb-8 gap-4 py-6"}`}>
        <div className="flex items-center gap-4">
          <GoogleMark className="h-9 w-9 shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-mhts-ink">
              Our Google reviews
            </h3>
            <GoogleStars
              className="w-4 h-4"
              label="Five star reviews on Google"
            />
          </div>
        </div>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-mhts-stone-deep px-5 py-2.5 text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
        >
          See us on Google
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div
        ref={trackRef}
        data-carousel-ready={ready ? "1" : undefined}
        data-testid="reviews-track"
        className="mhts-snap-x -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 md:pb-0"
        // Phone: one review per swipe (snap-always on each card), the next one
        // peeking. From md up the three already fit, so they are simply three
        // cards in a row: no track, no arrows, no dots (batch 4b fixes).
        role="group"
        aria-roledescription="carousel"
        aria-label="Google reviews"
      >
        {reviews.map((r, i) => (
          <article
            key={r.name}
            data-carousel-slide=""
            data-active={i === active ? "1" : undefined}
            aria-roledescription="slide"
            aria-label={`Review ${i + 1} of ${reviews.length}, ${r.name}`}
            className={`flex w-[85%] shrink-0 snap-center snap-always flex-col rounded-xl border border-mhts-stone bg-card sm:w-[60%] md:w-auto md:snap-align-none ${compact ? "p-5" : "p-6"}`}
          >
            <div className="mb-4 flex items-center gap-3">
              <span
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-base font-semibold text-white"
                style={{ backgroundColor: r.avatar }}
                aria-hidden="true"
              >
                {r.name.slice(0, 1)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-mhts-ink">
                  {r.name}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <GoogleMark className="h-3.5 w-3.5" />
                  Google review
                </p>
              </div>
            </div>
            <GoogleStars
              className="w-4 h-4"
              label={`${r.rating} out of 5 on Google`}
            />
            <p className="mt-4 flex-1 font-body text-sm leading-relaxed text-foreground/85">
              {r.text}
            </p>
          </article>
        ))}
      </div>

      {/* Always rendered, never mounted late. Adding this row after hydration
          pushed the rest of the page down and was the whole of the homepage's
          extra layout shift on a phone. The track itself is a native scroller,
          so a reader without JavaScript can still swipe through all three
          reviews; only these two arrows are inert for them. */}
      <div className={`flex items-center justify-center gap-4 md:hidden ${compact ? "mt-4" : "mt-6"}`}>
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="grid h-10 w-10 place-items-center rounded-full border border-mhts-stone-deep text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        {/* The dot is 10px because that is what a dot should look like, but the
            button around it is 40px, because that is what a thumb needs. As a
            bare 10px button it was the one accessibility failure Lighthouse
            found on the page. */}
        <div className="flex items-center">
          {reviews.map((r, i) => (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                setActive(i);
                scrollToIndex(i);
              }}
              aria-label={`Show review ${i + 1} of ${reviews.length}`}
              aria-current={i === active ? "true" : undefined}
              className="grid h-10 w-10 place-items-center rounded-full"
            >
              <span
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? "w-7 bg-mhts-red" : "w-2.5 bg-mhts-stone-deep"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="grid h-10 w-10 place-items-center rounded-full border border-mhts-stone-deep text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default GoogleReviews;
