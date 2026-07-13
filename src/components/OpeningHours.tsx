import { Clock } from "lucide-react";

const mhtsHours = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "9:30am – 5pm" },
  { day: "Wednesday", time: "9:30am – 5pm" },
  { day: "Thursday", time: "9:30am – 5pm" },
  { day: "Friday", time: "9:30am – 5pm" },
  { day: "Saturday", time: "Closed" },
  { day: "Sunday", time: "Closed" },
];

interface OpeningHoursProps {
  compact?: boolean;
}

const OpeningHours = ({ compact }: OpeningHoursProps) => {
  return (
    <div className={`${compact ? "" : "bg-mhts-light rounded-lg p-6"}`}>
      {!compact && (
        <h3 className="font-semibold text-mhts-charcoal flex items-center gap-2 mb-4 text-base tracking-wide">
          <Clock className="w-4 h-4" /> Opening Hours
        </h3>
      )}
      <div className="space-y-1">
        {mhtsHours.map((h) => (
          <div key={h.day} className="flex justify-between text-sm">
            <span className="font-medium">{h.day}</span>
            <span className="text-muted-foreground">{h.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHours;
