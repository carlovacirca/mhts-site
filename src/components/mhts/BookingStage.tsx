import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Check, Mail, Phone } from "lucide-react";
import { useCookieConsent, setCookieConsent } from "@/lib/cookieConsent";
import { clearAsked, openBooking, useBooking, warmBooking, type BookingSource } from "@/lib/booking";
import { track } from "@/lib/analytics";
import { EMAIL, HOURS_CLOSED, HOURS_OPEN, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

// The booking stop, on the homepage (#mhts-book) and /book (#trafft-booking)
// (Carlo, Oct 2026: "every scroll stop that has the booking section, that
// needs to be the main thing ... the most visually engaging on all the
// website, second only to the home page hero").
//
// A dark stage with a red glow holds one big object: a desk calendar of the
// studio's real week, Tuesday to Friday lit, Monday and the weekend closed.
// The whole card is the button: its red band says "Open the booking calendar".
// Pressing it grows the real Trafft calendar out of the card (BookingSheet),
// and is counted (open_booking_calendar). Before cookies are accepted the
// same card turns, in place, to one honest consent step; nothing from Trafft
// is requested before Accept. The stop is one screen at every size and
// carries scroll-snap-stop: always (mhts-snap-must), so a fling cannot carry
// the reader past it.

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const OPEN = [1, 2, 3, 4];
/** Wednesday's second slot is the one picked. */
const PICKED = { day: 2, slot: 1 };
const SLOTS = 4;

export interface BookingStageProps {
  id: string;
  /** Classes for the <section>: the page's own snap classes go here. */
  className?: string;
  source: Extract<BookingSource, "home_stop" | "book_stop">;
  eyebrow: string;
  title: ReactNode;
  /** The page's h1 on /book; an h2 on the homepage. */
  titleAs?: "h1" | "h2";
  lede: string;
  /** A long title (the /book h1) is set a size smaller from lg. */
  longTitle?: boolean;
}

const Week = () => (
  <div className="mhts-book-week" aria-hidden="true">
    <div className="mhts-book-days">
      {DAYS.map((d, i) => (
        <span key={d} className={OPEN.includes(i) ? "text-mhts-red-deep" : "text-mhts-ink/45"}>
          {d}
        </span>
      ))}
    </div>
    <div className="mhts-book-grid">
      {DAYS.map((d, i) =>
        OPEN.includes(i) ? (
          <span key={d} className="mhts-book-col" style={{ ["--col" as string]: OPEN.indexOf(i) }}>
            {Array.from({ length: SLOTS }, (_, s) => {
              const picked = i === PICKED.day && s === PICKED.slot;
              return (
                <span
                  key={s}
                  className={`mhts-book-tile ${picked ? "mhts-book-picked" : ""} ${s === SLOTS - 1 ? "mhts-book-tile-last" : ""}`}
                  style={{ ["--slot" as string]: OPEN.indexOf(i) * SLOTS + s }}
                >
                  {picked && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>
              );
            })}
          </span>
        ) : (
          <span key={d} className="mhts-book-closed">
            <span>Closed</span>
          </span>
        ),
      )}
    </div>
  </div>
);

const BookingStage = ({ id, className = "", source, eyebrow, title, titleAs = "h2", lede, longTitle = false }: BookingStageProps) => {
  const consent = useCookieConsent();
  const { asked } = useBooking();
  const stage = useRef<HTMLElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const consentHead = useRef<HTMLHeadingElement>(null);
  const cardButton = useRef<HTMLButtonElement>(null);
  const [face, setFace] = useState<"calendar" | "consent">("calendar");
  const Title = titleAs;

  // A price row or Book button elsewhere on the page asked for the calendar
  // before consent: this card turns to its consent face.
  useEffect(() => {
    if (asked && consent !== "accepted") setFace("consent");
  }, [asked, consent]);
  useEffect(() => {
    if (consent === "accepted") setFace("calendar");
  }, [consent]);
  useEffect(() => {
    if (face === "consent") consentHead.current?.focus({ preventScroll: true });
  }, [face]);

  // Near: build the hidden calendar (with consent only), so a press opens it
  // at once. On screen: the idle motion runs, and the stop is counted once.
  useEffect(() => {
    const el = stage.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let counted = false;
    let seenTimer = 0;
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        const go = () => warmBooking();
        const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
        if (document.readyState === "complete") {
          if (idle) idle(go, { timeout: 1500 });
          else window.setTimeout(go, 300);
        } else {
          window.addEventListener("load", () => window.setTimeout(go, 300), { once: true });
        }
      },
      { rootMargin: "100% 0px 100% 0px" },
    );
    const live = new IntersectionObserver(
      ([e]) => {
        const on = e.isIntersecting && e.intersectionRatio >= 0.5;
        if (on) el.setAttribute("data-live", "");
        else el.removeAttribute("data-live");
        window.clearTimeout(seenTimer);
        if (on && !counted) {
          seenTimer = window.setTimeout(() => {
            counted = true;
            track("view_booking_stop", { stop: source, page_path: window.location.pathname });
          }, 800);
        }
      },
      { threshold: [0, 0.5, 1] },
    );
    near.observe(el);
    live.observe(el);
    return () => {
      near.disconnect();
      live.disconnect();
      window.clearTimeout(seenTimer);
    };
  }, [source, consent]);

  const press = () => {
    if (consent === "accepted") openBooking({ source, from: card.current });
    else setFace("consent");
  };

  const accept = () => {
    const previous = consent === "declined" ? "declined" : "unanswered";
    const wanted = asked;
    setCookieConsent("accepted");
    track("booking_consent_inline", { stop: source, previous, page_path: window.location.pathname });
    clearAsked();
    setFace("calendar");
    openBooking({
      source: wanted?.source ?? source,
      serviceUuid: wanted?.serviceUuid,
      from: card.current,
      consent: "inline",
    });
  };

  const notNow = () => {
    clearAsked();
    setFace("calendar");
    requestAnimationFrame(() => cardButton.current?.focus({ preventScroll: true }));
  };

  const accepted = consent === "accepted";

  return (
    <section
      ref={stage}
      id={id}
      data-arrive="book"
      className={`mhts-snap-must mhts-book-stage relative overflow-clip bg-mhts-deep text-white ${className}`}
    >
      <div className="mhts-book-glow absolute inset-0" aria-hidden="true" />
      <div className="mhts-book-paper absolute inset-0" aria-hidden="true" />

      <div className="mhts-fill-chain container relative mx-auto max-w-6xl px-4 lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:grid-rows-[auto_auto] lg:content-center lg:gap-x-14 lg:px-8">
        {/* THE WORDS */}
        <div className="text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
          <p className="mb-3 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.22em] text-mhts-red-light">
            <span className="mhts-live-dot" aria-hidden="true" />
            {eyebrow}
          </p>
          <Title className={`text-[1.75rem] leading-[1.15] text-white md:text-4xl lg:leading-[1.05] ${longTitle ? "lg:text-[2.6rem]" : "lg:text-5xl"}`}>{title}</Title>
          <div className="mx-auto mt-3 h-1 w-14 rounded-full bg-mhts-red lg:mx-0 lg:mt-5" />
          <p className="mx-auto mt-3 max-w-xl font-body text-[15px] leading-[1.45] text-white/75 md:text-lg md:leading-relaxed lg:mx-0 lg:mt-5 lg:max-w-md">
            {lede}
          </p>
          <ol className="mt-6 hidden gap-6 font-body text-base text-white/90 lg:flex">
            {["Open the calendar", "Pick a time", "Confirm"].map((s, i) => (
              <li key={s} className="flex items-baseline gap-2">
                <span className="text-sm font-semibold text-mhts-red-light">0{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>

        {/* THE CARD: a desk calendar of the studio's week, and the button */}
        <div
          className="mhts-book-cardwrap mhts-fill-chain mt-5 md:mx-auto md:mt-8 md:w-full md:max-w-xl lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-none lg:self-center"
          data-stop-item=""
          data-stop-from="scale"
        >
          <div ref={card} className="mhts-book-card mhts-fill relative">
            {face === "calendar" ? (
              <button
                ref={cardButton}
                type="button"
                onClick={press}
                onPointerEnter={() => warmBooking(true)}
                onFocus={() => warmBooking(true)}
                onTouchStart={() => warmBooking(true)}
                aria-label="Open the booking calendar"
                aria-describedby={`${id}-note`}
                aria-haspopup="dialog"
                className="mhts-book-face group absolute inset-0 flex flex-col text-left"
              >
                <span className="mhts-book-band mhts-shine">
                  <span className="mhts-book-icon" aria-hidden="true">
                    <CalendarCheck className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                  <span className="relative z-[2] min-w-0 flex-1">
                    <span className="block text-lg font-bold leading-tight md:text-2xl">Open the booking calendar</span>
                    <span className="mt-0.5 block font-body text-[13px] text-white/90 md:text-sm">See prices and open times</span>
                  </span>
                  <span className="mhts-book-go" aria-hidden="true">
                    <ArrowRight className="h-5 w-5" />
                  </span>
                </span>
                <Week />
              </button>
            ) : (
              <div className="mhts-book-face mhts-book-consent absolute inset-0 flex flex-col justify-center overflow-y-auto p-4 text-mhts-ink md:p-8">
                <h3 ref={consentHead} tabIndex={-1} className="text-lg font-bold leading-tight outline-none md:text-2xl">
                  One step before the calendar
                </h3>
                <p className="mt-2 font-body text-[13px] leading-snug text-foreground/80 md:mt-3 md:text-base md:leading-relaxed">
                  {consent === "declined" ? "You turned cookies off earlier. " : ""}
                  Our booking calendar is run by Trafft and sets cookies, including Google Ads cookies. Accepting also
                  turns on Google Analytics on this site, the same as Accept on the cookie banner.
                </p>
                <button
                  type="button"
                  onClick={accept}
                  className="mhts-shine mt-4 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-mhts-red px-4 font-body text-[15px] font-semibold text-white transition-colors hover:bg-mhts-red-deep md:mt-5 md:min-h-[52px] md:text-base"
                >
                  <CalendarCheck className="relative z-[2] h-5 w-5" aria-hidden="true" />
                  <span className="relative z-[2]">Accept and open the calendar</span>
                </button>
                <div className="mt-2.5 flex items-center justify-between gap-3 md:mt-3">
                  <button
                    type="button"
                    onClick={notNow}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-mhts-stone-deep px-5 font-body text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
                  >
                    Not now
                  </button>
                  <Link
                    to="/privacy-policy#cookies-and-analytics"
                    className="font-body text-xs text-muted-foreground underline underline-offset-4 hover:text-mhts-red-deep"
                  >
                    Privacy Policy
                  </Link>
                </div>
              </div>
            )}
          </div>
          <p id={`${id}-note`} className="mt-2.5 min-h-[18px] text-center font-body text-xs text-white/60 lg:text-left">
            {accepted ? "Takes about a minute. Confirmation by email." : "Run by Trafft. We ask before it sets any cookies."}
          </p>
        </div>

        {/* CALL, EMAIL AND THE HOURS */}
        <div className="mt-3 text-center lg:col-start-1 lg:row-start-2 lg:mt-8 lg:self-start lg:text-left" data-stop-item="">
          <p className="text-balance font-body text-[13px] text-white/70 md:text-sm">
            {HOURS_OPEN} · {HOURS_CLOSED}
          </p>
          <div className="mt-2 flex items-center justify-center gap-5 lg:mt-4 lg:justify-start">
            <a
              href={`tel:${PHONE_TEL}`}
              data-cta="call"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white underline-offset-4 hover:underline lg:rounded-md lg:border lg:border-white/40 lg:px-5 lg:py-2.5 lg:no-underline lg:hover:border-white"
            >
              <Phone className="h-4 w-4 text-mhts-red-light" aria-hidden="true" />
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
            >
              <Mail className="h-4 w-4 text-mhts-red-light" aria-hidden="true" />
              Email us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingStage;
