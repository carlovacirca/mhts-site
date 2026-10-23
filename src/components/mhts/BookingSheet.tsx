import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarCheck, Phone, X } from "lucide-react";
import { TRAFFT_ORIGIN, closeBooking, markBookingReady, trafftEmbedUrl, useBooking, warmBooking } from "@/lib/booking";
import { useCookieConsent } from "@/lib/cookieConsent";
import { CalendarSkeleton } from "@/components/mhts/BookingSkeleton";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

// The booking calendar, full screen over the page (Carlo, Oct 2026). One sheet
// for the whole site, mounted in Layout: it is built hidden as soon as the
// reader has accepted cookies and nears a booking stop (src/lib/booking.ts),
// so Trafft's page is already loaded when the card is pressed. Opening grows
// the sheet out of the card that was pressed; closing shrinks it back. While
// closed it is invisible, inert and hidden from screen readers, but keeps its
// open size, so Trafft lays out once and nothing reflows on open.
//
// Phone: the whole window. From md up: a window inset from the edges, as the
// booking window was before.

/** How long a calendar may take before the sheet offers a call instead. */
const SLOW_MS = 10000;
const OPEN_MS = 440;
const CLOSE_MS = 320;
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const BookingSheet = () => {
  const { mounted, open, serviceUuid, ready, from } = useBooking();
  const panel = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  // Shown: in the page and visible. It stays true through the closing
  // animation, so the sheet is hidden only once it has shrunk away.
  const [shown, setShown] = useState(false);
  const [slow, setSlow] = useState(false);
  // The iframe's src, set once the sheet is mounted (never in the pre-render).
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (mounted) setSrc(trafftEmbedUrl(serviceUuid));
  }, [mounted, serviceUuid]);

  // Trafft's own page takes two seconds or more to load, however it is
  // asked for (Carlo, Oct 2026: "book widget also takes too long to load").
  // So once the reader has accepted cookies, on any page, it loads quietly a
  // moment after the page has, and is ready before any Book button is
  // pressed. Accepting on the banner starts it the same way.
  const consent = useCookieConsent();
  useEffect(() => {
    if (consent !== "accepted" || mounted) return;
    let timer = 0;
    const go = () => {
      timer = window.setTimeout(() => warmBooking(), 1200);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", go);
    };
  }, [consent, mounted]);

  // Ready: Trafft's page fires its load event a second or two before its
  // services and times are drawn, then posts its first message to us. The
  // skeleton gives way on that message, or a little after load at the latest.
  useEffect(() => {
    if (!mounted) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin === TRAFFT_ORIGIN) markBookingReady();
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [mounted]);
  const onFrameLoad = () => window.setTimeout(markBookingReady, 1500);

  // Open and close, with the grow-from-the-card animation.
  useLayoutEffect(() => {
    const el = panel.current;
    const bg = backdrop.current;
    if (!el || !bg) return;
    const html = document.documentElement;
    if (open) {
      opener.current = document.activeElement;
      setShown(true);
      html.setAttribute("data-booking-open", "");
      // The page under the sheet stays where it is.
      html.style.overflow = "hidden";
      const r = el.getBoundingClientRect();
      const radius = getComputedStyle(el).borderTopLeftRadius || "0px";
      if (reduced() || !from || !r.width) {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reduced() ? 120 : 260, easing: EASE });
      } else {
        const inset = `inset(${Math.max(0, from.top - r.top)}px ${Math.max(0, r.right - (from.left + from.width))}px ${Math.max(0, r.bottom - (from.top + from.height))}px ${Math.max(0, from.left - r.left)}px round 1.5rem)`;
        el.animate(
          [{ clipPath: inset }, { clipPath: `inset(0px 0px 0px 0px round ${radius})` }],
          { duration: OPEN_MS, easing: EASE },
        );
      }
      bg.animate([{ opacity: 0 }, { opacity: 1 }], { duration: reduced() ? 120 : OPEN_MS, easing: EASE });
      requestAnimationFrame(() => closeBtn.current?.focus({ preventScroll: true }));
    } else if (shown) {
      const done = () => {
        setShown(false);
        html.removeAttribute("data-booking-open");
        html.style.overflow = "";
        // Back to what opened it; if that has gone (the consent face's
        // Accept), to the booking card on screen.
        const back = opener.current;
        const cards = Array.from(document.querySelectorAll<HTMLElement>('main [aria-label="Open the booking calendar"]'));
        const card =
          cards.find((b) => {
            const r = b.getBoundingClientRect();
            return r.bottom > 0 && r.top < window.innerHeight;
          }) ?? cards[0];
        const to = back instanceof HTMLElement && back.isConnected ? back : card;
        to?.focus({ preventScroll: true });
      };
      const r = el.getBoundingClientRect();
      const anim =
        reduced() || !from || !r.width
          ? el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: reduced() ? 100 : 200, easing: EASE, fill: "forwards" })
          : el.animate(
              [
                { clipPath: `inset(0px 0px 0px 0px round ${getComputedStyle(el).borderTopLeftRadius || "0px"})` },
                {
                  clipPath: `inset(${Math.max(0, from.top - r.top)}px ${Math.max(0, r.right - (from.left + from.width))}px ${Math.max(0, r.bottom - (from.top + from.height))}px ${Math.max(0, from.left - r.left)}px round 1.5rem)`,
                },
              ],
              { duration: CLOSE_MS, easing: EASE, fill: "forwards" },
            );
      bg.animate([{ opacity: 1 }, { opacity: 0 }], { duration: CLOSE_MS, easing: EASE, fill: "forwards" });
      anim.onfinish = () => {
        el.getAnimations().forEach((a) => a.cancel());
        bg.getAnimations().forEach((a) => a.cancel());
        done();
      };
    }
    // `shown` is read, not watched: this runs on open and close only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape closes; Tab stays inside the sheet while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeBooking();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const items = Array.from(
        panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), iframe"),
      ).filter((n) => n.offsetParent !== null || n.tagName === "IFRAME");
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // A calendar still not there after a while: offer a call instead.
  useEffect(() => {
    setSlow(false);
    if (!open || ready) return;
    const t = window.setTimeout(() => setSlow(true), SLOW_MS);
    return () => window.clearTimeout(t);
  }, [open, ready]);

  // Closed: out of the tab order and hidden from screen readers.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    if (shown) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [shown, mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="mhts-theme mhts-book-sheet fixed inset-0 z-[120]"
      style={{ visibility: shown ? "visible" : "hidden", pointerEvents: shown ? "auto" : "none" }}
      aria-hidden={shown ? undefined : true}
    >
      <div ref={backdrop} className="absolute inset-0 bg-mhts-deep/80 backdrop-blur-sm" onClick={closeBooking} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mhts-book-sheet-title"
        className="absolute inset-0 flex flex-col overflow-hidden bg-card md:inset-x-[max(1.5rem,calc(50vw_-_36rem))] md:inset-y-6 md:rounded-2xl md:shadow-2xl"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 bg-mhts-deep px-5 py-4 text-white md:px-8">
          <h2 id="mhts-book-sheet-title" className="flex items-center gap-3 text-lg md:text-xl">
            <CalendarCheck className="h-5 w-5 text-mhts-red-light" aria-hidden="true" /> Book your appointment
          </h2>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${PHONE_TEL}`}
              data-cta="call"
              className="hidden items-center gap-2 font-body text-sm text-white/80 transition-colors hover:text-white md:inline-flex"
            >
              <Phone className="h-4 w-4 text-mhts-red-light" aria-hidden="true" /> Prefer to call? {PHONE_DISPLAY}
            </a>
            <button
              ref={closeBtn}
              type="button"
              onClick={closeBooking}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:border-white"
              aria-label="Close the booking calendar"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="relative min-h-0 flex-1">
          {src && (
            <iframe
              key={src}
              src={src}
              title="Booking calendar, run by Trafft"
              className="absolute inset-0 h-full w-full border-0"
              onLoad={onFrameLoad}
            />
          )}
          <CalendarSkeleton done={ready} />
          {!ready && open && (
            <p role="status" className="sr-only">
              Loading the booking calendar
            </p>
          )}
          {slow && !ready && (
            <div className="absolute inset-x-4 bottom-4 z-[2] rounded-xl bg-mhts-deep p-5 text-center text-white shadow-2xl md:inset-x-auto md:right-6 md:max-w-sm">
              <p className="font-semibold">The calendar is taking longer than usual</p>
              <p className="mt-1 font-body text-sm text-white/75">Call or email us and we will book you in.</p>
              <div className="mt-4 flex justify-center gap-3">
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-cta="call"
                  className="rounded-md bg-mhts-red px-4 py-2.5 font-body text-sm font-semibold text-white hover:bg-mhts-red-deep"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="rounded-md border border-white/30 px-4 py-2.5 font-body text-sm font-semibold text-white hover:border-white"
                >
                  Email us
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default BookingSheet;
