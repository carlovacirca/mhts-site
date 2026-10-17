import { useEffect, useRef, useState } from "react";

// The Trafft booking calendar on /book, with a loading state in the studio's
// colours (Carlo, Oct 2026: the site must look and feel like a £20k website).
//
// Trafft's script, which BookPage loads once the reader has accepted cookies,
// fills the .embedded-booking box with an iframe. Until that iframe had
// loaded, the box was white with a small grey spinner, for a second or two on
// the page's most valuable screen. A calendar-shaped skeleton now holds the
// space and cross-fades out when the iframe loads, or after a few seconds at
// most, so it never outlives a slow or blocked calendar. The box's height is
// set before anything loads, so nothing moves when the calendar arrives.
//
// The box is 1000px tall on a phone and with reduced motion, as before. From
// 768px up it takes the room its stop leaves ("The booking calendar's stop"
// in src/index.css), and the calendar scrolls inside its own frame.
//
// It renders only after consent, so never in the pre-render, and with reduced
// motion the skeleton neither shimmers nor fades.

/** Once the iframe is in, how long its own load may take before it shows anyway. */
const FRAME_WAIT_MS = 4000;
/** How long Trafft's script may take to add the iframe at all. */
const SCRIPT_WAIT_MS = 8000;
/** The studio is open Tuesday to Friday: those columns of a week from Monday. */
const OPEN_DAYS = [1, 2, 3, 4];

const CalendarSkeleton = ({ done }: { done: boolean }) => (
  <div
    aria-hidden="true"
    className={`mhts-skeleton absolute inset-0 z-[1] flex flex-col bg-card transition-[opacity,visibility] duration-300 ease-out md:flex-row ${
      done ? "invisible opacity-0" : ""
    }`}
  >
    {/* Trafft's steps: a bar across the top on a phone, a column from md up. */}
    <div className="flex shrink-0 items-center gap-4 bg-mhts-deep px-5 py-4 md:w-56 md:flex-col md:items-stretch md:gap-6 md:px-6 md:py-8">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <span className={`h-7 w-7 shrink-0 rounded-full ${i === 0 ? "bg-mhts-red" : "bg-white/15"}`} />
          <span className={`hidden h-2 rounded-full md:block ${i === 0 ? "w-24 bg-white/70" : "w-16 bg-white/20"}`} />
        </div>
      ))}
    </div>
    {/* The month, its open days and one chosen, then the times. */}
    <div className="flex max-h-[30rem] min-h-0 flex-1 flex-col gap-4 p-5 md:max-h-[38rem] md:p-8">
      <div className="flex items-center justify-between">
        <span className="h-3.5 w-36 rounded-full bg-mhts-ink/80" />
        <span className="flex gap-2">
          <span className="h-8 w-8 rounded-full border border-mhts-stone" />
          <span className="h-8 w-8 rounded-full border border-mhts-stone" />
        </span>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }, (_, d) => (
          <span key={d} className="mx-auto h-2 w-5 rounded-full bg-mhts-stone" />
        ))}
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-7 grid-rows-5 gap-2">
        {Array.from({ length: 35 }, (_, i) => {
          const tone =
            i < 2 ? "" : i === 16 ? "bg-mhts-red" : OPEN_DAYS.includes(i % 7) ? "bg-mhts-red-tint" : "bg-mhts-sand";
          return <span key={i} className={`rounded-md ${tone}`} />;
        })}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="h-9 rounded-md border border-mhts-stone" />
        ))}
      </div>
    </div>
  </div>
);

/** Give it `key={serviceUuid}`: a new service is a new calendar, with its own loading state. */
const BookingCalendar = ({ serviceUuid, fill = false }: { serviceUuid: string; fill?: boolean }) => {
  const box = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const show = () => setDone(true);
    let frame: HTMLIFrameElement | null = null;
    let timer = window.setTimeout(show, SCRIPT_WAIT_MS);
    const watch = () => {
      const f = el.querySelector("iframe");
      if (!f || f === frame) return;
      frame = f;
      f.addEventListener("load", show);
      window.clearTimeout(timer);
      timer = window.setTimeout(show, FRAME_WAIT_MS);
    };
    const observer = new MutationObserver(watch);
    observer.observe(el, { childList: true });
    watch();
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      frame?.removeEventListener("load", show);
    };
  }, []);

  return (
    // The frame's rounded corners also make it one block for SnapGuides, so a
    // stop that has to be paged never draws its line through the calendar.
    // `fill`: the full-screen booking window on /book, where the calendar
    // takes the whole window below its bar.
    <div className={`mhts-embed-frame relative flex flex-col overflow-hidden ${fill ? "h-full" : "h-[1000px] rounded-xl"}`}>
      <div
        ref={box}
        className="embedded-booking min-h-0 w-full flex-1"
        data-url="https://menshairtostay.trafft.com"
        data-query={`&t=s&uuid=${serviceUuid}`}
        data-lang="en"
        data-autoresize="0"
        data-showsidebar="1"
        data-showservices="0"
        style={{ minWidth: "320px" }}
      />
      <CalendarSkeleton done={done} />
      {!done && (
        <p role="status" className="sr-only">
          Loading the booking calendar
        </p>
      )}
    </div>
  );
};

export default BookingCalendar;
