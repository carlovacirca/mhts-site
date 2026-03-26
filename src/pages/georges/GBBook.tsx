import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { Users } from "lucide-react";

const GBBook = () => (
  <div className="gb-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Book a Visit" subtitle="Walk-ins welcome — or book ahead for your convenience" brand="gb" />

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Walk-in info + Hours row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gb-cream rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-gb-green" />
              <h3 className="font-display text-xl text-gb-green font-semibold">Walk-In Friendly</h3>
            </div>
            <p className="text-foreground/80 font-body">
              No appointment? No problem. Georges Barbers operates on a walk-in basis — just pop in and take a seat. For busier times, book ahead below. No payment is taken online — pay in person on the day.
            </p>
          </div>
          <OpeningHours brand="gb" />
        </div>

        {/* Full-width embedded booking widget */}
        <div className="rounded-xl overflow-hidden border border-gb-gold/20 bg-white">
          <iframe
            src="https://carlo56fm.setmore.com/george"
            width="100%"
            height="800"
            style={{ border: 0 }}
            title="Georges Barbers Booking"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
);

export default GBBook;
