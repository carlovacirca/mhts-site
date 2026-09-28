import { Link } from "react-router-dom";
import { CalendarCheck, Phone } from "lucide-react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

// Every "Book free consultation" on the site now has a Call button beside it.
// Carlo's decision, 28 Sep: most first visits decline cookies, so the phone has
// to be as easy to reach as the calendar, on the header, the hero, every CTA
// band, the booking section and the service pages.

const SIZES = {
  sm: "px-4 py-2.5 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-7 py-3.5 text-base",
} as const;

type Size = keyof typeof SIZES;

interface ButtonProps {
  size?: Size;
  className?: string;
  /** Where the Book button goes. An in-page anchor on the homepage, /book elsewhere. */
  href?: string;
  label?: string;
}

/**
 * The one red button on a page. `mhts-shine` puts a slow diagonal highlight
 * across it every 5 seconds; the class is a no-op under prefers-reduced-motion
 * (see src/index.css). White on #DB241B is 4.91:1, which passes AA.
 */
export const BookButton = ({
  size = "md",
  className = "",
  href = "/book",
  label = "Book free consultation",
}: ButtonProps) => {
  const classes = `mhts-shine inline-flex items-center justify-center gap-2 bg-mhts-red text-white font-semibold rounded-md tracking-wide hover:bg-mhts-red-deep transition-colors whitespace-nowrap ${SIZES[size]} ${className}`;
  const inner = (
    <>
      <CalendarCheck className="w-4 h-4 shrink-0 relative z-[2]" aria-hidden="true" />
      <span className="relative z-[2]">{label}</span>
    </>
  );
  // An in-page target stays an <a>: it has to work with no JavaScript, and on
  // the homepage it is a jump, not a navigation.
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={href} className={classes}>
      {inner}
    </Link>
  );
};

/**
 * Outline, so it reads as the quieter of the two without disappearing.
 * `tone` picks the border and text colour for the band it sits on.
 */
export const CallButton = ({
  size = "md",
  className = "",
  tone = "light",
  label = `Call ${PHONE_DISPLAY}`,
}: ButtonProps & { tone?: "light" | "dark" }) => (
  <a
    href={`tel:${PHONE_TEL}`}
    data-cta="call"
    className={`inline-flex items-center justify-center gap-2 rounded-md border font-semibold tracking-wide transition-colors whitespace-nowrap ${
      tone === "dark"
        ? "border-white/40 text-white hover:bg-white/10 hover:border-white"
        : "border-mhts-stone-deep text-mhts-ink hover:border-mhts-red hover:text-mhts-red-deep"
    } ${SIZES[size]} ${className}`}
  >
    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
    {label}
  </a>
);

/** The pair, in the order they appear everywhere: Book first, then Call. */
export const CtaPair = ({
  size = "md",
  tone = "light",
  href = "/book",
  className = "",
  callLabel,
}: ButtonProps & { tone?: "light" | "dark"; callLabel?: string }) => (
  <div className={`flex flex-col sm:flex-row gap-3 ${className}`}>
    <BookButton size={size} href={href} />
    <CallButton size={size} tone={tone} label={callLabel} />
  </div>
);
