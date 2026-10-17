import { useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CalendarCheck, X } from "lucide-react";
import BookingCalendar from "@/components/mhts/BookingCalendar";
import { CallButton } from "@/components/mhts/CtaButtons";

// The Trafft calendar, full screen over the page (Carlo, Oct 2026). Inside a
// page that snaps from stop to stop, a calendar that scrolls on its own fought
// the page and never fitted one stop. Here it has the whole window: a bar
// with the title and Close, and Trafft below it. It is only ever opened after
// the reader has accepted cookies, and Trafft's script, which fills the box
// when it runs, is added each time the window opens.

export const TRAFFT_DEFAULT_SERVICE_UUID = "848c1e33-c5d4-4dc8-a7de-94102b7c344b";

export const BookingWindow = ({
  open,
  onOpenChange,
  serviceUuid = TRAFFT_DEFAULT_SERVICE_UUID,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceUuid?: string;
}) => {
  useEffect(() => {
    if (!open) return;
    const script = document.createElement("script");
    script.src = "https://menshairtostay.trafft.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) document.body.removeChild(script);
    };
  }, [open, serviceUuid]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[70] bg-mhts-deep/80 backdrop-blur-sm" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className="mhts-theme mhts-book-window fixed inset-0 z-[71] flex flex-col bg-card md:inset-x-[max(1.5rem,calc(50vw_-_36rem))] md:inset-y-6 md:overflow-hidden md:rounded-2xl md:shadow-2xl"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 bg-mhts-deep px-5 py-4 text-white md:px-8">
            <DialogPrimitive.Title className="flex items-center gap-3 text-lg md:text-xl">
              <CalendarCheck className="h-5 w-5 text-mhts-red-light" aria-hidden="true" /> Book your appointment
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              className="grid h-10 w-10 place-items-center rounded-full border border-white/25 transition-colors hover:border-white"
              aria-label="Close the booking calendar"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>
          <div className="min-h-0 flex-1">
            <BookingCalendar key={serviceUuid} serviceUuid={serviceUuid} fill />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

/** The three steps and the button that opens the window, then Call. */
export const BookOnlineSteps = ({ onOpen }: { onOpen: () => void }) => (
  <>
    <ol className="mx-auto grid max-w-4xl gap-2 md:grid-cols-3 md:gap-6">
      {[
        { n: "01", t: "Choose your appointment", d: "Free consultation, regroom, maintenance or SMP." },
        { n: "02", t: "Pick a date and time", d: "Tuesday to Friday, 9:30am to 5pm." },
        { n: "03", t: "Confirm", d: "You get an email confirmation straight away." },
      ].map((s) => (
        <li key={s.n} className="flex gap-4 rounded-xl border border-mhts-stone bg-mhts-sand px-4 py-3 md:flex-col md:gap-3 md:p-6">
          <span className="font-body text-sm font-bold text-mhts-red-deep md:text-base">{s.n}</span>
          <span>
            <span className="block text-base text-mhts-ink md:text-xl">{s.t}</span>
            <span className="mt-1 hidden font-body text-sm text-foreground/75 md:block md:text-base">{s.d}</span>
          </span>
        </li>
      ))}
    </ol>
    <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row md:mt-10">
      <button
        type="button"
        onClick={onOpen}
        className="mhts-shine inline-flex items-center justify-center gap-2 rounded-md bg-mhts-red px-8 py-4 font-body text-base font-semibold tracking-wide text-white transition-colors hover:bg-mhts-red-deep"
      >
        <CalendarCheck className="h-5 w-5" aria-hidden="true" /> Open the booking calendar
      </button>
      <CallButton size="lg" />
    </div>
  </>
);
