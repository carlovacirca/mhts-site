// The booking calendar's loading state, in the studio's colours (Carlo, Oct
// 2026: the site must look and feel like a £20k website). It holds the
// calendar's shape while Trafft's page loads in the booking sheet
// (BookingSheet.tsx) and cross-fades out when it is ready. With reduced
// motion it neither shimmers nor fades.

/** The studio is open Tuesday to Friday: those columns of a week from Monday. */
const OPEN_DAYS = [1, 2, 3, 4];

export const CalendarSkeleton = ({ done }: { done: boolean }) => (
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
