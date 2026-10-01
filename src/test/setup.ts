import "@testing-library/jest-dom";

// A test that runs in node rather than jsdom (src/test/snapScreens.test.ts,
// which drives a real browser) has no window, and needs none of this.
const hasWindow = typeof window !== "undefined";

// jsdom has no matchMedia. Tests that need a specific answer (reduced motion,
// for instance) override this with their own stub.
if (hasWindow) Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// jsdom has no IntersectionObserver either, and three components now use one:
// the reviews carousel, the sticky bottom bar and framer-motion's whileInView.
// The stub records its targets so a test can drive an intersection by hand.
class TestIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  readonly targets = new Set<Element>();

  constructor(
    private callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.root = (options?.root as Element) ?? null;
    TestIntersectionObserver.instances.push(this);
  }

  static instances: TestIntersectionObserver[] = [];

  observe(target: Element) {
    this.targets.add(target);
  }
  unobserve(target: Element) {
    this.targets.delete(target);
  }
  disconnect() {
    this.targets.clear();
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  /** Test helper: fire the callback as if these entries had changed. */
  fire(entries: Partial<IntersectionObserverEntry>[]) {
    this.callback(entries as IntersectionObserverEntry[], this);
  }
}

if (hasWindow) Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: TestIntersectionObserver,
});
if (hasWindow) Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: TestIntersectionObserver,
});

// jsdom implements neither of these, and the carousel calls both.
if (hasWindow && !Element.prototype.scrollTo) {
  Element.prototype.scrollTo = function scrollTo() {};
}
if (hasWindow && !Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false;
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}

export { TestIntersectionObserver };
