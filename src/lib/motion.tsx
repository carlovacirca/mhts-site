// A drop-in replacement for framer-motion's `motion`, used everywhere in this
// site instead of importing from "framer-motion" directly.
//
// It changes exactly one thing: on the first render after a pre-rendered page
// loads, every motion element is given `initial={false}`, which tells
// framer-motion to render straight at its animate/resting state with no entry
// animation.
//
// Without this, pre-rendering would look broken. The build captures each page
// after its animations have finished, so the HTML the reader sees at 200 ms is
// the finished page. A second later the bundle arrives, React renders, and
// every `initial={{ opacity: 0 }}` would blank the content out and fade it
// back in. Nothing moves in the layout (these are opacity and transform
// animations) but it reads as a glitch.
//
// Client side navigation is untouched: endFirstPaint() runs after the first
// mount, so every route the reader clicks through to animates exactly as it
// does today.
import { motion as framerMotion } from "framer-motion";
import { createElement, forwardRef, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { isFirstPaint } from "./prerender";
import { SECTION_SNAP } from "./sectionSnap";

type AnyComponent = Parameters<typeof createElement>[0];

const wrapped = new Map<string, AnyComponent>();

export const motion = new Proxy(framerMotion as unknown as Record<string, unknown>, {
  get(target, key) {
    if (typeof key !== "string") return Reflect.get(target, key);

    const cached = wrapped.get(key);
    if (cached) return cached;

    const Base = Reflect.get(target, key);
    // motion.div and friends are forwardRef components, which are objects.
    // motion.create and any other helper is a plain function and is passed
    // straight through, so this proxy only ever wraps element factories.
    if (typeof Base !== "object" || Base === null) return Base;
    const Wrapped = forwardRef<unknown, Record<string, unknown>>((props, ref) =>
      createElement(Base as AnyComponent, {
        ...props,
        // An explicit initial={false} in a page stays false either way.
        ...(isFirstPaint() ? { initial: false } : null),
        ref,
      })
    );
    Wrapped.displayName = `motion.${key}`;
    wrapped.set(key, Wrapped);
    return Wrapped;
  },
}) as unknown as typeof framerMotion;

/**
 * Does this reader have "reduce motion" switched on?
 *
 * framer-motion ships its own useReducedMotion, but it reads the media query
 * once at module level and caches the answer for the life of the page, which
 * makes it impossible to assert on and impossible to change at runtime. This
 * asks the browser each time and subscribes to changes, so a reader who turns
 * the setting on mid-visit is obeyed without a reload.
 *
 * It returns false on the server and during the pre-render capture, which is
 * correct: the capture has no reader and no preference to honour.
 */
export const usePrefersReducedMotion = (): boolean => {
  const query = "(prefers-reduced-motion: reduce)";
  const read = () =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia(query).matches
      : false;

  const [reduced, setReduced] = useState(read);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const list = window.matchMedia(query);
    const onChange = () => setReduced(list.matches);
    onChange();
    list.addEventListener?.("change", onChange);
    return () => list.removeEventListener?.("change", onChange);
  }, []);

  return reduced;
};

/**
 * The scroll reveal used across the redesigned pages: a short rise as its
 * scroll stop arrives, with an optional stagger for a row of cards.
 *
 * With the section scroll on (SECTION_SNAP) it is a plain element marked
 * data-stop-item, with its place in a row as --i, and the arrival motion at
 * every stop moves it (src/lib/stopMotion.ts, the "Arrive" block in
 * src/index.css), on a phone and a desktop alike. Nothing about it is hidden
 * in the HTML: only that system, once React has mounted, can arm it, and
 * never for a reader who has asked for reduced motion, in the pre-render or
 * without JavaScript.
 *
 * With the section scroll off it is the framer-motion fade up it always was,
 * through the `motion` proxy above, so the pre-render captures the finished
 * element and React re-renders the same thing.
 */
/**
 * Where a Reveal comes in from. Each page type leans on one or two of these so
 * the pages do not all move alike: words beside a photograph come in from its
 * side, the gallery's frames scale, everything else rises. The photographs
 * themselves uncover (ResponsiveImage's stopMedia).
 */
export type RevealFrom = "up" | "left" | "right" | "scale";

const REVEAL_START: Record<RevealFrom, { opacity: number; x?: number; y?: number; scale?: number }> = {
  up: { opacity: 0, y: 16 },
  left: { opacity: 0, x: -24 },
  right: { opacity: 0, x: 24 },
  scale: { opacity: 0, scale: 0.96 },
};

export const Reveal = ({
  children,
  delay = 0,
  className,
  as = "div",
  from = "up",
}: {
  children: ReactNode;
  /** Seconds. Use index * 0.06 for a staggered row. */
  delay?: number;
  className?: string;
  /** Any intrinsic element framer-motion has a factory for. */
  as?: "div" | "article" | "li" | "section" | "span" | "figure";
  /** The direction it arrives from. Default is the 16px rise. */
  from?: RevealFrom;
}) => {
  const reduced = usePrefersReducedMotion();

  if (SECTION_SNAP) {
    const Plain = as;
    return (
      <Plain
        className={className}
        data-stop-item=""
        data-stop-from={from === "up" ? undefined : from}
        style={{ "--i": Math.round(delay / 0.06) } as CSSProperties}
      >
        {children}
      </Plain>
    );
  }

  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Animated = (motion as unknown as Record<string, AnyComponent>)[as] as React.ElementType;

  return (
    <Animated
      className={className}
      initial={REVEAL_START[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </Animated>
  );
};
