import { Clock } from "lucide-react";
import { HOURS_CLOSED, HOURS_OPEN } from "@/lib/site";

interface OpeningHoursProps {
  compact?: boolean;
  /** Inside another card: keeps the heading, drops the box, tightens the rows. */
  columns?: boolean;
}

// One line, worded as the footer words it (both read HOURS_OPEN and
// HOURS_CLOSED in src/lib/site.ts). It was a seven-row table, and the booking
// panel showed today's hours ahead of the week's, so the same hours were said
// twice, once under the name of the day (PR #8).
const OpeningHours = ({ compact, columns }: OpeningHoursProps) => {
  return (
    <div className={compact || columns ? "" : "rounded-xl border border-mhts-stone bg-mhts-sand p-6"}>
      {!compact && (
        <h3 className={`${columns ? "mb-2" : "mb-4"} flex items-center gap-2 text-base font-semibold tracking-wide text-mhts-ink`}>
          <Clock className="h-4 w-4 text-mhts-red" aria-hidden="true" /> Opening Hours
        </h3>
      )}
      <p className="font-body text-sm text-mhts-ink">
        {HOURS_OPEN}
        <span className="text-muted-foreground"> · {HOURS_CLOSED}</span>
      </p>
    </div>
  );
};

export default OpeningHours;
