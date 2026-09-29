import { useEffect, useRef } from "react";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { useCookieConsent, setCookieConsent } from "@/lib/cookieConsent";
import { isPrerenderPass } from "@/lib/prerender";

const COOKIE_HEIGHT_VAR = "--mhts-cookie-h";

const CookieConsentBanner = () => {
  const consent = useCookieConsent();
  const ref = useRef<HTMLDivElement>(null);

  // Publishes the banner's height while it is open, so the homepage's section
  // scroll can keep content out from under it (see src/index.css). Skipped in
  // the pre-render, which removes the banner from the saved HTML and must not
  // bake a height into it either.
  useEffect(() => {
    const el = ref.current;
    if (!el || isPrerenderPass() || typeof ResizeObserver === "undefined") return;
    const root = document.documentElement;
    const publish = () => root.style.setProperty(COOKIE_HEIGHT_VAR, `${el.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.style.removeProperty(COOKIE_HEIGHT_VAR);
    };
  }, [consent]);

  if (consent !== null) return null;

  // data-prerender-strip below: the build renders every page with no stored
  // consent, so this banner would be baked into all of them and would flash up
  // for a second on returning visitors who have already answered it. The
  // pre-render drops the marked element, so the banner appears only once React
  // has read the real answer, exactly as it does today.
  return (
    // Position comes from the fixed stack in Layout, which keeps this banner
    // below the sticky call to action rather than on top of it.
    <div
      ref={ref}
      data-prerender-strip="cookie-banner"
      className="border-t border-white/10 bg-mhts-ink text-white"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-2xl">
          <Cookie className="w-5 h-5 shrink-0 mt-0.5 text-mhts-red-light" aria-hidden="true" />
          <p className="text-sm text-white/80 font-body leading-relaxed">
            We use cookies to run our online booking calendar. Accept to enable online booking, or decline and book by phone or email instead. See our{" "}
            <Link to="/privacy-policy" className="underline hover:text-white transition-colors">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCookieConsent("declined")}
            className="px-4 py-2 text-sm rounded-md border border-white/30 text-white/80 hover:bg-white/10 transition-colors font-body"
          >
            Decline
          </button>
          <button
            onClick={() => setCookieConsent("accepted")}
            className="px-4 py-2 text-sm rounded-md bg-mhts-red text-white hover:bg-mhts-red-deep transition-colors font-body font-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
