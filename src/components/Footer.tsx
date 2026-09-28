import { Link } from "react-router-dom";
import { CalendarCheck, Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import mhtsLogoFull from "@/assets/mhts-logo-full.jpeg";
import ResponsiveImage from "@/components/ResponsiveImage";
import { treatments } from "@/data/treatments";
import { ADDRESS_LINE, EMAIL, GOOGLE_MAPS_URL, PHONE_DISPLAY, PHONE_TEL, SOCIALS } from "@/lib/site";

// One dark warm band with a red rule on top, four balanced columns, and the
// logo on a white chip rather than floating as a JPEG box on a white slab. See
// docs/DESIGN-AUDIT.md finding 14.
//
// The Studio column is load bearing: How It Works, FAQ, Areas Serviced and the
// Services overview all came out of the top menu in this batch, and this is
// where they keep their site-wide internal link. Nothing that left the menu is
// unlinked.

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.78a8.28 8.28 0 0 0 3.76.96V6.69Z" />
  </svg>
);

const studioLinks = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/gallery", label: "Results" },
  { to: "/faq", label: "FAQ" },
  { to: "/areas-serviced", label: "Areas Serviced" },
  { to: "/blog", label: "Blog" },
  { to: "/services", label: "Services overview" },
];

const columnLink =
  "block py-1.5 text-sm text-white/70 transition-colors hover:text-white";

const Footer = () => (
  <footer className="bg-mhts-deep text-white">
    <div className="h-1 w-full bg-mhts-red" />
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Treatments */}
        <div>
          <div className="mb-6 inline-block rounded-lg bg-white p-2.5">
            <ResponsiveImage
              src={mhtsLogoFull}
              alt="Men's Hair To Stay"
              className="h-12 w-auto object-contain"
              sizes="180px"
            />
          </div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light">
            Treatments
          </h3>
          <nav aria-label="Treatments">
            {treatments.map((t) => (
              <Link key={t.slug} to={`/${t.slug}`} className={columnLink}>
                {t.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Studio */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light">
            Studio
          </h3>
          <nav aria-label="Studio">
            {studioLinks.map((l) => (
              <Link key={l.to} to={l.to} className={columnLink}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex gap-2">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-mhts-red hover:text-white"
              aria-label="Men's Hair To Stay on Instagram"
            >
              <Instagram className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-mhts-red hover:text-white"
              aria-label="Men's Hair To Stay on Facebook"
            >
              <Facebook className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href={SOCIALS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-mhts-red hover:text-white"
              aria-label="Men's Hair To Stay on TikTok"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

        {/* Visit us */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light">
            Visit us
          </h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
                {ADDRESS_LINE}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
              <span>
                Tuesday to Friday, 9:30am to 5pm
                <br />
                <span className="text-white/50">Closed Saturday to Monday</span>
              </span>
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                data-cta="call"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 break-all transition-colors hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {/* Book */}
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light">
            Book
          </h3>
          <p className="mb-4 font-body text-sm leading-relaxed text-white/70">
            The first consultation is free, private and takes about half an hour.
          </p>
          <div className="grid gap-2.5">
            <Link
              to="/book"
              className="mhts-shine inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md bg-mhts-red px-5 text-sm font-semibold text-white transition-colors hover:bg-mhts-red-deep"
            >
              <CalendarCheck className="relative z-[2] h-4 w-4" aria-hidden="true" />
              <span className="relative z-[2]">Book free consultation</span>
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              data-cta="call"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border border-white/40 px-5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 py-4 text-center text-xs text-white/50 sm:flex-row">
        <span>© {new Date().getFullYear()} Men's Hair To Stay. All rights reserved.</span>
        <span className="hidden sm:inline">·</span>
        <Link to="/privacy-policy" className="underline transition-colors hover:text-white/80">
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
