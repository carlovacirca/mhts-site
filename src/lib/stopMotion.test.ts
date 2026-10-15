// The arrival motion at every scroll stop (src/lib/stopMotion.ts) may only
// ever hide something the reader cannot see yet. These tests pin that: a stop
// on screen when the page mounts is never touched, nothing is armed in the
// build's own capture, and no hook of the system is ever saved in the HTML.
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { TestIntersectionObserver } from "@/test/setup";

const STOPS = ".mhts-snap-site > div > section";

const realGetComputedStyle = window.getComputedStyle.bind(window);

// jsdom has no layout and no scroll snap: every section is a snap area, the
// page snaps mandatorily, and nothing clips.
const fakeStyle = (el: Element) => {
  const real = realGetComputedStyle(el);
  return new Proxy(real, {
    get(target, key) {
      if (key === "scrollSnapType") return "y mandatory";
      if (key === "scrollSnapAlign") return el.tagName === "SECTION" ? "start" : "none";
      if (key === "display") return "block";
      if (key === "overflowX" || key === "overflowY") return "visible";
      if (key === "borderTopLeftRadius") return "16px";
      const value = Reflect.get(target, key);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
};

const media = (noPreference: boolean) => (query: string) => ({
  matches: query.includes("no-preference") ? noPreference : false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

const place = (el: Element, top: number, height: number) => {
  el.getBoundingClientRect = () =>
    ({ top, bottom: top + height, height, left: 0, right: 1000, width: 1000, x: 0, y: top, toJSON: () => ({}) }) as DOMRect;
};

const page = () => {
  document.body.innerHTML = `
    <main class="mhts-snap-site"><div>
      <section id="first"><h1>Hair systems in Amersham</h1></section>
      <section id="second">
        <p class="uppercase">Why us</p>
        <h2>One studio</h2>
        <div class="mx-auto mt-3 h-0.5 w-12 bg-mhts-red"></div>
        <p>The lede.</p>
        <div data-stop-item="" style="--i: 1"><h3>A card</h3></div>
        <img data-stop-media="" alt="" />
      </section>
      <section id="third"><h2>Book</h2><p>Free consultation.</p></section>
      <section id="hero-again"><h1>Not on screen, but the h1</h1></section>
    </div></main>`;
  // A 768px window: the first stop fills it, the rest are below.
  place(document.getElementById("first")!, 0, 768);
  place(document.getElementById("second")!, 768, 700);
  place(document.getElementById("third")!, 1468, 700);
  place(document.getElementById("hero-again")!, 2168, 700);
};

const load = async (prerenderPass = false) => {
  vi.resetModules();
  (window as unknown as Record<string, unknown>).__MHTS_PRERENDER__ = prerenderPass;
  return import("./stopMotion");
};

describe("stop motion", () => {
  beforeEach(() => {
    vi.stubGlobal("getComputedStyle", fakeStyle);
    window.getComputedStyle = fakeStyle as typeof window.getComputedStyle;
    window.matchMedia = media(true) as unknown as typeof window.matchMedia;
    TestIntersectionObserver.instances.length = 0;
    page();
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    window.getComputedStyle = realGetComputedStyle;
    delete (window as unknown as Record<string, unknown>).__MHTS_PRERENDER__;
    document.documentElement.removeAttribute("data-stops");
    document.body.innerHTML = "";
  });

  it("arms every stop, the first with the h1 too, and plays the ones on screen two frames later", async () => {
    const { startStopMotion } = await load();
    const teardown = startStopMotion(STOPS);
    expect(document.documentElement.hasAttribute("data-stops")).toBe(true);
    expect(document.getElementById("first")!.getAttribute("data-stop")).toBe("armed");
    expect(document.querySelector("#first h1")!.hasAttribute("data-stop-item")).toBe(true);
    expect(document.getElementById("second")!.getAttribute("data-stop")).toBe("armed");
    expect(document.getElementById("third")!.getAttribute("data-stop")).toBe("armed");
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r(null))));
    expect(document.getElementById("first")!.getAttribute("data-stop")).toBe("in");
    expect(document.getElementById("second")!.getAttribute("data-stop")).toBe("armed");
    teardown();
  });

  it("tags the base cascade in reading order: eyebrow, title, rule with its title, lede", async () => {
    const { startStopMotion } = await load();
    const teardown = startStopMotion(STOPS);
    const second = document.getElementById("second")!;
    const [eyebrow, lede] = Array.from(second.querySelectorAll("p"));
    const h2 = second.querySelector("h2")!;
    const rule = second.querySelector("div.bg-mhts-red") as HTMLElement;
    const card = second.querySelector("div[data-stop-item]") as HTMLElement;
    expect(eyebrow.style.getPropertyValue("--stop-i")).toBe("0");
    expect(h2.style.getPropertyValue("--stop-i")).toBe("1");
    expect(rule.getAttribute("data-stop-draw")).toBe("center");
    expect(rule.style.getPropertyValue("--stop-i")).toBe("1");
    expect(lede.style.getPropertyValue("--stop-i")).toBe("2");
    expect(card.style.getPropertyValue("--stop-i")).toBe("3");
    expect(second.querySelector("img")!.style.getPropertyValue("--stop-r")).toBe("16px");
    teardown();
  });

  it("plays a stop every time it comes into view, and puts everything back on teardown", async () => {
    const { startStopMotion } = await load();
    const teardown = startStopMotion(STOPS);
    const second = document.getElementById("second")!;
    const io = TestIntersectionObserver.instances.at(-1)!;
    expect(io.targets.has(second)).toBe(true);
    // A sliver in view: not yet.
    io.fire([{ target: second, isIntersecting: true, intersectionRect: { height: 100 } as DOMRect, boundingClientRect: { height: 700 } as DOMRect, rootBounds: { height: 671 } as DOMRect }]);
    expect(second.getAttribute("data-stop")).toBe("armed");
    // Half of the room it can fill: it plays.
    io.fire([{ target: second, isIntersecting: true, intersectionRect: { height: 340 } as DOMRect, boundingClientRect: { height: 700 } as DOMRect, rootBounds: { height: 671 } as DOMRect }]);
    expect(second.getAttribute("data-stop")).toBe("in");
    // Scrolled away: armed again, and still observed, so it plays next time.
    io.fire([{ target: second, isIntersecting: false, intersectionRect: { height: 0 } as DOMRect, boundingClientRect: { height: 700 } as DOMRect, rootBounds: { height: 671 } as DOMRect }]);
    expect(second.getAttribute("data-stop")).toBe("armed");
    expect(io.targets.has(second)).toBe(true);
    io.fire([{ target: second, isIntersecting: true, intersectionRect: { height: 340 } as DOMRect, boundingClientRect: { height: 700 } as DOMRect, rootBounds: { height: 671 } as DOMRect }]);
    expect(second.getAttribute("data-stop")).toBe("in");
    teardown();
    expect(document.documentElement.hasAttribute("data-stops")).toBe(false);
    expect(document.querySelector("[data-stop], [data-stop-draw], [data-stop-fade], [data-stop-ready]")).toBeNull();
    // Only the hooks written in the markup (Reveal, stopMedia) are left.
    expect(Array.from(document.querySelectorAll("[data-stop-item]")).map((el) => el.tagName)).toEqual(["DIV"]);
    expect(document.querySelector("h2")!.style.getPropertyValue("--stop-i")).toBe("");
  });

  it("plays a stop that has been partly in view for 1200ms, but not one that only touches the window", async () => {
    const { startStopMotion } = await load();
    vi.useFakeTimers();
    try {
      const teardown = startStopMotion(STOPS);
      const second = document.getElementById("second")!;
      const io = TestIntersectionObserver.instances.at(-1)!;
      const entry = (height: number) => ({ target: second, isIntersecting: true, intersectionRect: { height } as DOMRect, boundingClientRect: { height: 700 } as DOMRect, rootBounds: { height: 671 } as DOMRect });
      io.fire([entry(0)]);
      vi.advanceTimersByTime(1500);
      expect(second.getAttribute("data-stop")).toBe("armed");
      io.fire([entry(120)]);
      vi.advanceTimersByTime(1250);
      expect(second.getAttribute("data-stop")).toBe("in");
      teardown();
    } finally {
      vi.useRealTimers();
    }
  });

  it("flips a stop at once when focus moves into it", async () => {
    const { startStopMotion } = await load();
    const teardown = startStopMotion(STOPS);
    const third = document.getElementById("third")!;
    third.querySelector("p")!.dispatchEvent(new FocusEvent("focusin", { bubbles: true }));
    expect(third.getAttribute("data-stop")).toBe("in");
    teardown();
  });

  it("arms nothing in the pre-render pass", async () => {
    const { startStopMotion } = await load(true);
    startStopMotion(STOPS)();
    startStopMotion(STOPS);
    expect(document.documentElement.hasAttribute("data-stops")).toBe(false);
    expect(document.querySelector("[data-stop]")).toBeNull();
    expect(document.querySelector("h2")!.hasAttribute("data-stop-item")).toBe(false);
  });

  it("arms nothing for a reader who has asked for reduced motion", async () => {
    window.matchMedia = media(false) as unknown as typeof window.matchMedia;
    const { startStopMotion } = await load();
    startStopMotion(STOPS);
    expect(document.documentElement.hasAttribute("data-stops")).toBe(false);
    expect(document.querySelector("[data-stop]")).toBeNull();
  });

  it("arms nothing on a blog article (proximity snap)", async () => {
    document.querySelector("main > div")!.classList.add("mhts-snap-proximity");
    const { startStopMotion } = await load();
    startStopMotion(STOPS);
    expect(document.querySelector("[data-stop]")).toBeNull();
  });
});

describe("the built HTML", () => {
  const ROOT = join(__dirname, "../..");

  it("strips every hook of the arrival motion in the pre-render", () => {
    const script = readFileSync(join(ROOT, "scripts/prerender.mjs"), "utf8");
    for (const name of ["data-stops", "data-stop", "data-stop-item", "data-stop-draw", "data-stop-media", "data-stop-from", "data-stop-fade", "data-stop-ready", "--i", "--stop-i", "--stop-m", "--stop-r"]) {
      expect(script).toContain(`"${name}"`);
    }
  });

  const dist = join(ROOT, "dist");
  const built = existsSync(join(dist, "index.html")) && readFileSync(join(dist, "index.html"), "utf8").includes('data-prerendered="1"');
  it.skipIf(!built)("has no data-stop attribute in any pre-rendered page", () => {
    const files: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const path = join(dir, name);
        if (statSync(path).isDirectory()) walk(path);
        else if (name.endsWith(".html")) files.push(path);
      }
    };
    walk(dist);
    const offenders = files.filter((f) => /\sdata-stops?(-[a-z]+)?=/.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });
});
