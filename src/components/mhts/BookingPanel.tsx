import { CalendarCheck, Clock, Mail, Phone } from "lucide-react";
import { setCookieConsent } from "@/lib/cookieConsent";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, hoursForToday } from "@/lib/site";

// What the booking section shows before the reader has answered the cookie
// banner, which is most first visits. It used to be one line of grey text and
// a button reading "Enable cookies to book online": an empty block where the
// most valuable thing on the page should be. See docs/DESIGN-AUDIT.md finding 12.
//
// The consent rule itself is untouched. Trafft is still loaded only after
// Accept, and the secondary button below sets consent exactly as Accept does,
// so a reader who wants the calendar can have it in one tap without hunting
// for the banner.

const BookingPanel = () => {
  const today = hoursForToday();

  return (
    <div className="container mx-auto px-4 pb-16">
      <div className="mx-auto max-w-2xl rounded-xl border border-mhts-stone bg-card p-7 sm:p-9">
        <div className="mb-6 flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mhts-red-tint">
            <CalendarCheck className="h-6 w-6 text-mhts-red" aria-hidden="true" />
          </span>
          <div>
            <h3 className="text-xl font-semibold text-mhts-ink">Book your free consultation</h3>
            <p className="mt-1 font-body text-sm leading-relaxed text-muted-foreground">
              Call or email and we will find you a time. No obligation, and nothing is discussed
              anywhere but the studio.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={`tel:${PHONE_TEL}`}
            data-cta="call"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-mhts-red px-5 text-base font-semibold text-white transition-colors hover:bg-mhts-red-deep"
          >
            <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-mhts-stone-deep px-5 text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
          >
            <Mail className="h-5 w-5 shrink-0" aria-hidden="true" />
            Email us
          </a>
        </div>

        <div className="mt-6 flex items-center gap-2.5 rounded-md bg-mhts-sand px-4 py-3">
          <Clock className="h-4 w-4 shrink-0 text-mhts-red" aria-hidden="true" />
          <p className="font-body text-sm text-mhts-ink">
            <span className="font-semibold">{today.day}:</span> {today.time}
            <span className="text-muted-foreground"> · Tuesday to Friday, 9:30am to 5pm</span>
          </p>
        </div>

        <div className="mt-6 border-t border-mhts-stone pt-5 text-center">
          <button
            type="button"
            onClick={() => setCookieConsent("accepted")}
            className="font-body text-sm font-semibold text-mhts-red-deep underline underline-offset-4 transition-colors hover:text-mhts-red"
          >
            Show the online booking calendar
          </button>
          <p className="mt-2 font-body text-xs text-muted-foreground">
            The calendar is run by Trafft and sets cookies, so it loads only once you accept them.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPanel;
