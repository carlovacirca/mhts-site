import { useCallback, useId, useRef, useState } from "react";
import ResponsiveImage from "@/components/ResponsiveImage";

// A draggable before and after comparison. Carlo's decision, 28 Sep: all three
// homepage pairs are consented and are shown as they are, faces included, with
// no crop or blur beyond the square the site already displayed them in.
//
// Three things it has to be:
//
//  1. Operable by mouse, touch and keyboard. The handle is a real ARIA slider
//     with arrow, Home and End keys and a spoken label, not a decorative div.
//  2. Safe to pre-render. The divider is a clip-path percentage, never an
//     opacity, so nothing can be captured part way through a fade and the
//     build guard that fails on any inline opacity below 1 stays green.
//  3. Honest with no JavaScript. The HTML ships at 50 per cent, so both
//     photographs are in the page and half of each is visible exactly as the
//     old side-by-side pair was.

interface BeforeAfterSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  /** Spoken name for the slider, e.g. "Client one". */
  label: string;
  className?: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

const BeforeAfterSlider = ({
  before,
  after,
  beforeAlt,
  afterAlt,
  label,
  className = "",
}: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const id = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    // Stops the swipeable row underneath from scrolling sideways mid-drag.
    e.preventDefault();
    setFromClientX(e.clientX);
  };

  const endDrag = (e: React.PointerEvent) => {
    draggingRef.current = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setPosition((p) => clamp(p - step));
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setPosition((p) => clamp(p + step));
    } else if (e.key === "Home") {
      setPosition(0);
    } else if (e.key === "End") {
      setPosition(100);
    } else {
      return;
    }
    e.preventDefault();
  };

  return (
    <div className={`group ${className}`}>
      <div
        ref={frameRef}
        className="relative aspect-square w-full overflow-hidden rounded-lg border border-mhts-stone bg-mhts-sand select-none touch-pan-y"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {/* After sits underneath and is revealed as the handle moves left. */}
        <ResponsiveImage
          src={after}
          alt={afterAlt}
          className="absolute inset-0 h-full w-full object-cover object-top"
          sizes="(max-width: 768px) 80vw, 380px"
        />
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ResponsiveImage
            src={before}
            alt={beforeAlt}
            className="absolute inset-0 h-full w-full object-cover object-top"
            sizes="(max-width: 768px) 80vw, 380px"
          />
        </div>

        <span className="absolute left-3 top-3 rounded-full bg-mhts-ink/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          Before
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-mhts-red px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          After
        </span>

        {/* The divider and its handle. */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white/90 shadow-[0_0_0_1px_hsl(var(--mhts-ink)/0.25)]"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${label}: drag to compare the before and after photographs`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)} per cent before, ${100 - Math.round(position)} per cent after`}
          aria-describedby={`${id}-hint`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-mhts-red text-white shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-mhts-red/40"
          style={{ left: `${position}%` }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <path d="M9 6 4 12l5 6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m15 6 5 6-5 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <p id={`${id}-hint`} className="mt-3 text-center text-xs font-body text-muted-foreground">
        {label}. Drag, swipe or use the arrow keys.
      </p>
    </div>
  );
};

export default BeforeAfterSlider;
