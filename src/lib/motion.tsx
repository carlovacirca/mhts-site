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
import { createElement, forwardRef } from "react";
import { isFirstPaint } from "./prerender";

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
