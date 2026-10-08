import { Link } from "react-router-dom";
import { CalendarCheck, Clock, Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import mhtsLogoFull from "@/assets/mhts-logo-full.jpeg";
import ResponsiveImage from "@/components/ResponsiveImage";
import { treatments } from "@/data/treatments";
import { ADDRESS_LINE, EMAIL, GOOGLE_MAPS_URL, HOURS_CLOSED, HOURS_OPEN, PHONE_DISPLAY, PHONE_TEL, SOCIALS } from "@/lib/site";

// One dark warm band with a red rule on top, four balanced columns, and the
// logo on a white chip rather than floating as a JPEG box on a white slab. See
// docs/DESIGN-AUDIT.md finding 14.
//
// The Studio column is load bearing: How It Works, FAQ, Areas Serviced and the
// Services overview all came out of the top menu in this batch, and this is
// where they keep their site-wide internal link. Nothing that left the menu is
// unlinked.
//
// The footer is exactly one screen under the sticky header, at every width
// (PR #8), and the last stop in the section scroll: at the end of any page
// its top sits under the header and its bottom on the bottom of the screen.
// Its content is spread evenly down that height. On a phone (batch 4b fixes)
// the content is compact so it fits even a 375x667 screen: tighter padding, a
// smaller logo chip, the two link columns side by side, the social links
// beside "Visit us", the contact details on as few lines as they will go, and
// Book and Call side by side. Nothing is dropped; every link is still here.
// The social links are rendered twice, once for each layout, and the one not
// in use is display:none.

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true">
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
  "block py-[3px] text-sm text-white/70 transition-colors hover:text-white md:py-1.5";

const heading =
  "mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light md:mb-2";

const social =
  "grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-mhts-red hover:text-white md:h-10 md:w-10";

const Socials = ({ className = "" }: { className?: string }) => (
  <div className={`gap-2 ${className}`}>
    <a
      href={SOCIALS.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={social}
      aria-label="Men's Hair To Stay on Instagram"
    >
      <Instagram className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
    </a>
    <a
      href={SOCIALS.facebook}
      target="_blank"
      rel="noopener noreferrer"
      className={social}
      aria-label="Men's Hair To Stay on Facebook"
    >
      <Facebook className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
    </a>
    <a
      href={SOCIALS.tiktok}
      target="_blank"
      rel="noopener noreferrer"
      className={social}
      aria-label="Men's Hair To Stay on TikTok"
    >
      <TikTokIcon />
    </a>
  </div>
);

const Footer = () => (
  <footer className="bg-mhts-deep text-white">
    <div className="h-1 w-full bg-mhts-red" />
    {/* The footer is one screen tall (src/index.css). This block takes the
        height the rule and the copyright line leave, and its rows share the
        spare room evenly above, between and below them. */}
    <div className="container mx-auto flex flex-1 flex-col px-4 py-4 md:py-10">
      {/* Phone: the Treatments column is the wider of the two, so "Scalp
          Micropigmentation" and "Hair System Maintenance" stay on one line. */}
      <div className="grid flex-1 grid-cols-[1.3fr_1fr] content-evenly gap-x-4 gap-y-4 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
        {/* Treatments */}
        <div>
          <div className="mb-3 inline-block rounded-md bg-white p-1.5 md:mb-6 md:rounded-lg md:p-2.5">
            <ResponsiveImage
              src={mhtsLogoFull}
              alt="Men's Hair To Stay"
              className="h-8 w-auto object-contain md:h-12"
              sizes="180px"
            />
          </div>
          <h3 className={heading}>Treatments</h3>
          <nav aria-label="Treatments">
            {treatments.map((t) => (
              <Link key={t.slug} to={`/${t.slug}`} className={columnLink}>
                {t.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Studio */}
        <div className="md:flex md:flex-col">
          <Socials className="hidden md:order-last md:mt-6 md:flex" />
          <div>
            <h3 className={heading}>Studio</h3>
            <nav aria-label="Studio">
              {studioLinks.map((l) => (
                <Link key={l.to} to={l.to} className={columnLink}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Visit us */}
        <div className="col-span-2 md:col-span-1">
          {/* On a phone the social links sit beside this heading, where there
              is room; from md up they sit under the Studio links. */}
          <div className="flex items-center justify-between md:block">
            <h3 className={heading}>Visit us</h3>
            <Socials className="flex md:hidden" />
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-white/70 md:block md:space-y-3">
            <li className="w-full">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 transition-colors hover:text-white md:gap-2.5"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
                {ADDRESS_LINE}
              </a>
            </li>
            <li className="flex w-full items-start gap-2 md:gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
              <span>
                {HOURS_OPEN}
                <span className="text-white/60 md:hidden"> · </span>
                <br className="hidden md:inline" />
                <span className="text-white/60">{HOURS_CLOSED}</span>
              </span>
            </li>
            <li>
              <a
                href={`tel:${PHONE_TEL}`}
                data-cta="call"
                className="flex items-center gap-2 transition-colors hover:text-white md:gap-2.5"
              >
                <Phone className="h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2 break-all transition-colors hover:text-white md:gap-2.5"
              >
                <Mail className="h-4 w-4 shrink-0 text-mhts-red-light" aria-hidden="true" />
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>

        {/* Book */}
        <div className="col-span-2 md:col-span-1">
          <h3 className={heading}>Book</h3>
          <p className="mb-2.5 font-body text-sm leading-snug text-white/70 md:mb-4 md:leading-relaxed">
            The first consultation is free, private and takes about half an hour.
          </p>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1 md:gap-2.5">
            <Link
              to="/book"
              className="mhts-shine inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md bg-mhts-red px-2 text-[13px] font-semibold text-white transition-colors hover:bg-mhts-red-deep md:min-h-[48px] md:gap-2 md:px-5 md:text-sm"
            >
              <CalendarCheck className="relative z-[2] h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="relative z-[2]">Book free consultation</span>
            </Link>
            <a
              href={`tel:${PHONE_TEL}`}
              data-cta="call"
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-md border border-white/40 px-2 text-[13px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 md:min-h-[48px] md:gap-2 md:px-5 md:text-sm"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-4 py-2.5 text-center text-xs text-white/60 md:py-4">
        <span>© {new Date().getFullYear()} Men's Hair To Stay. All rights reserved.</span>
        <span aria-hidden="true">·</span>
        <Link to="/privacy-policy" className="underline transition-colors hover:text-white/80">
          Privacy Policy
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
