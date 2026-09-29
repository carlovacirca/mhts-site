import { Clock } from "lucide-react";
import { OPENING_HOURS } from "@/lib/site";

interface OpeningHoursProps {
  compact?: boolean;
  /** Inside another card: keeps the heading, drops the box, tightens the rows. */
  columns?: boolean;
}

const OpeningHours = ({ compact, columns }: OpeningHoursProps) => {
  return (
    <div className={compact || columns ? "" : "rounded-xl border border-mhts-stone bg-mhts-sand p-6"}>
      {!compact && (
        <h3 className={`${columns ? "mb-2" : "mb-4"} flex items-center gap-2 text-base font-semibold tracking-wide text-mhts-ink`}>
          <Clock className="h-4 w-4 text-mhts-red" aria-hidden="true" /> Opening Hours
        </h3>
      )}
      <div className={columns ? "space-y-0.5" : "space-y-1"}>
        {OPENING_HOURS.map((h) => (
          <div key={h.day} className="flex justify-between gap-2 text-sm">
            <span className="font-medium">{h.day}</span>
            <span className={h.time === "Closed" ? "text-muted-foreground" : "text-mhts-ink"}>{h.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;
