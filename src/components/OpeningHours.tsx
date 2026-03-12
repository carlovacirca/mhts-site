import { Clock } from "lucide-react";

const gbHours = [
  { day: "Monday", time: "8:30am – 6pm" },
  { day: "Tuesday", time: "8:30am – 6pm" },
  { day: "Wednesday", time: "8:30am – 6pm" },
  { day: "Thursday", time: "8:30am – 6pm" },
  { day: "Friday", time: "8:30am – 6pm" },
  { day: "Saturday", time: "8:30am – 5pm" },
  { day: "Sunday", time: "10am – 1pm" },
];

const mhtsHours = [
  { day: "Monday", time: "9:30am – 5pm" },
  { day: "Tuesday", time: "9:30am – 5pm" },
  { day: "Wednesday", time: "9:30am – 5pm" },
  { day: "Thursday", time: "9:30am – 5pm" },
  { day: "Friday", time: "9:30am – 5pm" },
  { day: "Saturday", time: "9:30am – 12:30pm" },
  { day: "Sunday", time: "Closed" },
];

interface OpeningHoursProps {
  brand: "gb" | "mhts";
  compact?: boolean;
}

const OpeningHours = ({ brand, compact }: OpeningHoursProps) => {
  const hours = brand === "gb" ? gbHours : mhtsHours;
  const accent = brand === "gb" ? "text-gb-green" : "text-mhts-charcoal";
  const bg = brand === "gb" ? "bg-gb-cream" : "bg-mhts-light";

  return (
    <div className={`${compact ? "" : `${bg} rounded-lg p-6`}`}>
      {!compact && (
        <h3 className={`font-semibold ${accent} flex items-center gap-2 mb-4 ${brand === "gb" ? "font-display text-lg" : "text-base tracking-wide"}`}>
          <Clock className="w-4 h-4" /> Opening Hours
        </h3>
      )}
      <div className="space-y-1">
        {hours.map((h) => (
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
