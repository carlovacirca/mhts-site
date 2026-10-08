import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarCheck, Phone } from "lucide-react";
import { PHONE_TEL } from "@/lib/site";

// The Call and Book bar at the bottom of a phone screen.
//
// The rule (batch 4b fixes, PR #8): nothing may ever sit under it. So it shows
// only when all four of these hold, and fades out the moment one stops:
//
//   1. The hero has scrolled away. The hero has its own Book and Call.
//   2. The footer is not on screen. The footer has its own Book and Call, and
//      the page ends on the footer's dark band, not on the bar.
//   3. No Book or Call button in the page is on screen (IntersectionObserver).
//      Two of the same button, one over the other, is clutter.
//   4. Nothing sits where the bar would be. Each phone screen ends above the
//      bar (src/index.css gives it a transparent border the bar's height), so
//      on a screen that fits, only background is there. A screen taller than
//      the phone, or a blog article between headings, can have words or a
//      card there, and the bar waits until the reader moves on. Checked when
//      scrolling stops, never mid-swipe.
//
// It renders inside the fixed stack in Layout, above the cookie banner, so the
// two never cover each other. It fades with opacity rather than collapsing, so
// showing or hiding it moves nothing on the page (no layout shift).

const HERO_SENTINEL_ID = "mhts-hero-end";

/** In-page Book and Call buttons. The header and the footer are not "in page". */
const CTA_SELECTOR = [
  'a[href^="tel:"]',
  'a[href="/book"]',
  'a[href^="/book?"]',
  'a[href$="#mhts-book"]',
  "[data-cta]",
].map((s) => `main ${s}`).join(", ");

const MEDIA = /^(IMG|PICTURE|VIDEO|IFRAME|CANVAS|SVG|INPUT|TEXTAREA|SELECT|BUTTON)$/i;

/** Is there content (words, an image, a control, a card) in the bar's strip? */
export const contentUnderBar = (bandTop: number, bandBottom: number): boolean => {
  const main = document.querySelector("main");
  if (!main || bandBottom <= bandTop) return false;
  const w = window.innerWidth;
  for (const el of main.querySelectorAll<HTMLElement>("*")) {
    const r = el.getBoundingClientRect();
    if (r.bottom <= bandTop + 1 || r.top >= bandBottom - 1 || r.width < 1 || r.height < 1) continue;
    // Off to the side in a swipeable strip.
    if (r.right <= 0 || r.left >= w) continue;
    // The answer inside a closed <details> still reports a box, though
    // nothing of it is drawn.
    const shut = el.closest("details:not([open])");
    if (shut && shut !== el && !el.closest("summary")) continue;
    if (MEDIA.test(el.tagName)) return true;
    // A card or a button: a painted box narrower than the screen. A
    // full-width band of colour is the section's background, which may sit
    // under the bar.
    if (r.width < 0.9 * w) {
      const cs = getComputedStyle(el);
      const painted =
        (cs.backgroundColor !== "rgba(0, 0, 0, 0)" && cs.backgroundColor !== "transparent") ||
        cs.backgroundImage !== "none" ||
        parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth) > 0;
      if (painted && cs.visibility !== "hidden") return true;
    }
    // Words: the words themselves, not the box they sit in.
    for (const n of Array.from(el.childNodes)) {
      if (n.nodeType !== 3 || !n.textContent!.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const t of Array.from(range.getClientRects?.() ?? [])) {
        if (t.bottom > bandTop + 1 && t.top < bandBottom - 1 && t.right > 0 && t.left < w) return true;
      }
    }
  }
  return false;
};

const StickyMobileCTA = () => {
  const { pathname } = useLocation();
  const barRef = useRef<HTMLDivElement>(null);
  const [pastHero, setPastHero] = useState(false);
  const [footerOn, setFooterOn] = useState(false);
  const [ctaOn, setCtaOn] = useState(false);
  const [covers, setCovers] = useState(false);

  // 1. Past the hero.
  useEffect(() => {
    const sentinel = document.getElementById(HERO_SENTINEL_ID);
    if (sentinel && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }
    // Pages without a marked hero (a blog post, the privacy policy): once
    // the reader has scrolled most of a screen.
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // 2. The footer, and 3. the page's own Book and Call buttons. The page can
  // change under us (a route change, the booking calendar loading, a blog
  // filter), so the buttons are looked up again whenever <main> changes.
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const footer = document.querySelector("footer");
    const footerObserver = new IntersectionObserver(([entry]) => setFooterOn(entry.isIntersecting), { threshold: 0 });
    if (footer) footerObserver.observe(footer);

    const onScreen = new Set<Element>();
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) onScreen.add(e.target);
          else onScreen.delete(e.target);
        }
        setCtaOn(onScreen.size > 0);
      },
      { threshold: 0 }
    );
    let watched: Element[] = [];
    const scan = () => {
      const now = Array.from(document.querySelectorAll(CTA_SELECTOR));
      if (now.length === watched.length && now.every((el, i) => el === watched[i])) return;
      ctaObserver.disconnect();
      onScreen.clear();
      watched = now;
      watched.forEach((el) => ctaObserver.observe(el));
      if (!watched.length) setCtaOn(false);
    };
    scan();
    let timer = 0;
    const main = document.querySelector("main");
    const mutations = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 150);
    });
    if (main) mutations.observe(main, { childList: true, subtree: true });
    return () => {
      window.clearTimeout(timer);
      mutations.disconnect();
      ctaObserver.disconnect();
      footerObserver.disconnect();
    };
  }, [pathname]);

  // 4. Anything in the bar's strip, checked once scrolling has stopped.
  useEffect(() => {
    let timer = 0;
    const check = () => {
      const bar = barRef.current;
      const stack = bar?.parentElement;
      if (!bar || !stack || getComputedStyle(bar).display === "none") return;
      // The bar sits on top of the fixed stack (the cookie banner, when open).
      const bottom = stack.getBoundingClientRect().top;
      setCovers(contentUnderBar(bottom - bar.offsetHeight, bottom));
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(check, 120);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  const show = pastHero && !footerOn && !ctaOn && !covers;

  return (
    <div
      ref={barRef}
      data-testid="sticky-mobile-cta"
      data-visible={show ? "1" : "0"}
      aria-hidden={show ? undefined : "true"}
      // On top of the fixed stack (bottom-full) rather than in its flow, so
      // the stack never moves and the bar sits directly above an open cookie
      // banner, never on it. Hidden, it is transparent and takes no taps;
      // `invisible` (after the fade) also takes it out of the tab order and
      // away from screen readers.
      className={`absolute inset-x-0 bottom-full transition-[opacity,visibility] duration-300 ease-out md:hidden ${
        show ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
    >
      <div
        data-testid="sticky-mobile-cta-row"
        className="grid grid-cols-2 gap-2 border-t border-white/10 bg-mhts-deep/95 px-3 py-2.5 backdrop-blur-sm"
      >
        <a
          href={`tel:${PHONE_TEL}`}
          tabIndex={show ? undefined : -1}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/40 px-3 text-sm font-semibold text-white"
        >
          <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
          Call
        </a>
        <Link
          to="/book"
          tabIndex={show ? undefined : -1}
          className="mhts-shine inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-mhts-red px-3 text-sm font-semibold text-white"
        >
          <CalendarCheck className="h-4 w-4 shrink-0 relative z-[2]" aria-hidden="true" />
          <span className="relative z-[2]">Book free consultation</span>
        </Link>
      </div>
    </div>
  );
};

export default StickyMobileCTA;
