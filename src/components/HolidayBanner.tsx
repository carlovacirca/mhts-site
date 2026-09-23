import { Link } from "react-router-dom";
import { CalendarClock } from "lucide-react";

// Temporary closure notice. Shows only between the two dates below, then
// disappears on its own with no code change and no redeploy needed.
//
// SHOW_FROM  first day the banner appears
// SHOW_UNTIL last day the banner appears, it is gone from the day after
const SHOW_FROM = "2026-08-23";
const SHOW_UNTIL = "2026-08-27";

const isWithinWindow = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const from = new Date(`${SHOW_FROM}T00:00:00`);
  const until = new Date(`${SHOW_UNTIL}T23:59:59`);
  return today.getTime() >= from.getTime() && today.getTime() <= until.getTime();
};

const HolidayBanner = () => {
  if (!isWithinWindow()) return null;

  return (
    <Link
      to="/blog/august-closure-back-friday-28"
      role="status"
      className="block bg-mhts-charcoal text-mhts-white border-b border-mhts-white/15 hover:bg-mhts-charcoal/90 transition-colors"
    >
      <div className="container mx-auto px-4 py-3 flex items-start sm:items-center justify-center gap-3 text-center">
        <CalendarClock className="w-4 h-4 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="text-sm font-body leading-relaxed">
          <span className="font-semibold">The studio is closed until Friday 28 August.</span>{" "}
          Online booking stays open. <span className="underline underline-offset-2">Read more</span>
        </p>
      </div>
    </Link>
  );
};

export default HolidayBanner;
