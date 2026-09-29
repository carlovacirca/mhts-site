// The pre-rendered HTML shows each page at rest, because the build captures it
// after every animation has finished. If React then replayed the entry
// animations, the reader would watch finished content blank out and fade back
// in a second after it appeared. These tests pin the behaviour that stops it.
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { motion } from "./motion";
import { resetFirstPaintForTests, endFirstPaint, isFirstPaint } from "./prerender";

vi.mock("framer-motion", async () => {
  const { forwardRef } = await import("react");
  // A stand-in that records the props it was given, so the test asserts what
  // this module passes down rather than what framer-motion does with it.
  // forwardRef, because the shim tells element factories (objects) apart from
  // helpers such as motion.create (plain functions) that way.
  const make = (tag: string) =>
    forwardRef<HTMLDivElement, Record<string, unknown>>((props, ref) => {
      const { children, initial, ...rest } = props;
      return (
        <div
          ref={ref}
          data-tag={tag}
          data-initial={initial === false ? "false" : JSON.stringify(initial ?? null)}
          {...(rest as Record<string, unknown>)}
        >
          {children as React.ReactNode}
        </div>
      );
    });
  const cache: Record<string, unknown> = {};
  return {
    motion: new Proxy(
      {},
      {
        get(_t, key: string) {
          if (key === "create") return () => null;
          cache[key] = cache[key] ?? make(key);
          return cache[key];
        },
      }
    ),
  };
});

const Sample = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    hello
  </motion.div>
);

describe("motion shim", () => {
  beforeEach(() => resetFirstPaintForTests(false));

  it("passes the page's own initial through on a normal client render", () => {
    render(<Sample />);
    expect(screen.getByText("hello").getAttribute("data-initial")).toBe(
      JSON.stringify({ opacity: 0, y: 20 })
    );
  });

  it("forces initial={false} while React is catching up with pre-rendered HTML", () => {
    resetFirstPaintForTests(true);
    render(<Sample />);
    expect(screen.getByText("hello").getAttribute("data-initial")).toBe("false");
  });

  it("goes back to normal once the first paint is over", () => {
    resetFirstPaintForTests(true);
    expect(isFirstPaint()).toBe(true);
    endFirstPaint();
    expect(isFirstPaint()).toBe(false);
    render(<Sample />);
    expect(screen.getByText("hello").getAttribute("data-initial")).toBe(
      JSON.stringify({ opacity: 0, y: 20 })
    );
  });

  it("does not wrap non-element members such as motion.create", () => {
    expect(typeof (motion as unknown as { create: unknown }).create).toBe("function");
  });
});
