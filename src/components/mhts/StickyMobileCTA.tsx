import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Phone } from "lucide-react";
import { PHONE_TEL } from "@/lib/site";

// The sticky Book bar used to sit at the top of a phone screen, under the
// header, where it ate 56px of the first view and sat nowhere near a thumb.
// It now sits at the bottom, holds two equal buttons, and appears only once the
// hero has scrolled away, so the first screen is the photograph and the
// headline. See docs/DESIGN-AUDIT.md finding 13.
//
// It renders inside the fixed stack in Layout, above the cookie banner, so the
// two can never cover each other. Layout also carries a permanent bottom
// padding on phones, which is what keeps the bar off the footer: reserving the
// space up front rather than adding it when the bar appears means the page
// never shifts.

const HERO_SENTINEL_ID = "mhts-hero-end";

const StickyMobileCTA = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Pages with a hero mark where it ends. Anything else (a blog post, the
    // privacy policy) gets the bar as soon as the reader has scrolled a screen.
    const sentinel = document.getElementById(HERO_SENTINEL_ID);

    if (sentinel && typeof IntersectionObserver !== "undefined") {
      const observer = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
        { threshold: 0 }
      );
      observer.observe(sentinel);
      return () => observer.disconnect();
    }

    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hidden by collapsing the row to zero height, not by sliding it downwards.
  // The bar and the cookie banner share one fixed stack, so a translated bar
  // would slide straight on top of the banner rather than off the screen. A
  // 0fr to 1fr grid row animates the height without that side effect and
  // leaves the banner sitting at the bottom where it belongs.
  return (
    <div
      data-testid="sticky-mobile-cta"
      data-visible={show ? "1" : "0"}
      aria-hidden={show ? undefined : "true"}
      className={`grid transition-[grid-template-rows] duration-200 ease-out md:hidden ${
        show ? "grid-rows-[1fr]" : "pointer-events-none grid-rows-[0fr]"
      }`}
    >
      <div className="grid grid-cols-2 gap-2 overflow-hidden border-t border-white/10 bg-mhts-deep/95 px-3 py-2.5 backdrop-blur-sm">
        <a
          href={`tel:${PHONE_TEL}`}
          data-cta="call"
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
