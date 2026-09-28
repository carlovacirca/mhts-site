import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { useCookieConsent, setCookieConsent } from "@/lib/cookieConsent";

const CookieConsentBanner = () => {
  const consent = useCookieConsent();

  if (consent !== null) return null;

  // data-prerender-strip below: the build renders every page with no stored
  // consent, so this banner would be baked into all of them and would flash up
  // for a second on returning visitors who have already answered it. The
  // pre-render drops the marked element, so the banner appears only once React
  // has read the real answer, exactly as it does today.
  return (
    <div
      data-prerender-strip="cookie-banner"
      className="fixed bottom-0 left-0 right-0 z-[100] bg-mhts-charcoal text-mhts-white border-t border-mhts-white/10"
    >
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-2xl">
          <Cookie className="w-5 h-5 shrink-0 mt-0.5 text-mhts-white/70" />
          <p className="text-sm text-mhts-white/80 font-body leading-relaxed">
            We use cookies to run our online booking calendar. Accept to enable online booking, or decline and book by phone or email instead. See our{" "}
            <Link to="/privacy-policy" className="underline hover:text-mhts-white transition-colors">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCookieConsent("declined")}
            className="px-4 py-2 text-sm rounded-sm border border-mhts-white/30 text-mhts-white/80 hover:bg-mhts-white/10 transition-colors font-body"
          >
            Decline
          </button>
          <button
            onClick={() => setCookieConsent("accepted")}
            className="px-4 py-2 text-sm rounded-sm bg-mhts-white text-mhts-charcoal hover:bg-mhts-light transition-colors font-body font-medium"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
