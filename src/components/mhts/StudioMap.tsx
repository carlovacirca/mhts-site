import { ExternalLink, MapPin } from "lucide-react";
import { useCookieConsent } from "@/lib/cookieConsent";
import { ADDRESS_LINE, BRAND, GOOGLE_MAPS_URL } from "@/lib/site";

// The map block, consent aware.
//
// Google's embed sets cookies before the reader has agreed to any, so the
// iframe now waits for Accept like GA4 and the Trafft calendar already did.
// What the reader sees before that was a blank grey rectangle: the old embed
// URL carried a hand-made `pb=` parameter that Google could not resolve, so it
// failed silently whether or not cookies were on. See docs/DESIGN-AUDIT.md
// finding 12 and docs/HEALTH-CHECK.md finding 16.
//
// The fallback below is drawn in CSS and inline SVG: no tiles, no request, no
// third party, and nothing that could be mistaken for a real map of a street
// the studio is not on. It is a signpost to the address, not a map.

const MapIllustration = () => (
  <svg
    viewBox="0 0 400 200"
    className="h-full w-full"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="400" height="200" fill="hsl(var(--mhts-sand))" />
    {/* Parkland */}
    <path d="M0 148 L92 132 L132 200 L0 200 Z" fill="hsl(120 18% 88%)" />
    <path d="M318 0 L400 0 L400 62 L336 44 Z" fill="hsl(120 18% 88%)" />
    {/* Minor roads */}
    <g stroke="hsl(var(--mhts-stone))" strokeWidth="7" strokeLinecap="round" fill="none">
      <path d="M-10 60 L150 44 L262 74 L410 52" />
      <path d="M96 -10 L112 96 L74 210" />
      <path d="M286 -10 L268 84 L300 210" />
      <path d="M-10 154 L128 140 L248 168 L410 146" />
    </g>
    {/* The main road the studio sits on */}
    <path
      d="M-10 118 L120 104 L232 128 L410 100"
      stroke="hsl(var(--mhts-stone))"
      strokeWidth="14"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M-10 118 L120 104 L232 128 L410 100"
      stroke="hsl(0 0% 100%)"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    {/* Blocks */}
    <g fill="hsl(var(--mhts-stone) / 0.55)">
      <rect x="150" y="66" width="46" height="26" rx="3" />
      <rect x="206" y="72" width="34" height="20" rx="3" />
      <rect x="140" y="140" width="40" height="22" rx="3" />
      <rect x="312" y="112" width="52" height="24" rx="3" />
      <rect x="22" y="72" width="44" height="22" rx="3" />
    </g>
    {/* The studio */}
    <circle cx="200" cy="118" r="26" fill="hsl(var(--mhts-red) / 0.14)" />
    <circle cx="200" cy="118" r="15" fill="hsl(var(--mhts-red) / 0.24)" />
    <path
      d="M200 100c-6.6 0-12 5.4-12 12 0 8.6 12 20 12 20s12-11.4 12-20c0-6.6-5.4-12-12-12Zm0 16.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Z"
      fill="hsl(var(--mhts-red))"
    />
  </svg>
);

const StudioMap = ({ className = "" }: { className?: string }) => {
  const consent = useCookieConsent();

  if (consent === "accepted") {
    return (
      <div className={`overflow-hidden rounded-xl border border-mhts-stone ${className}`}>
        <iframe
          src="https://www.google.com/maps?q=11+Chesham+Road+Amersham+HP6+5HN&output=embed"
          width="100%"
          height="240"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${BRAND} location`}
        />
      </div>
    );
  }

  return (
    <div
      data-testid="map-fallback"
      className={`overflow-hidden rounded-xl border border-mhts-stone bg-card ${className}`}
    >
      <div className="relative h-[150px]">
        <MapIllustration />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
      </div>
      <div className="px-5 pb-5 pt-1">
        <p className="flex items-start gap-2.5 font-body text-sm text-mhts-ink">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mhts-red" aria-hidden="true" />
          <span>
            <span className="font-semibold">{BRAND}</span>
            <br />
            {ADDRESS_LINE}
          </span>
        </p>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-mhts-stone-deep px-5 py-2.5 text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
        >
          Open in Google Maps
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};

export default StudioMap;
