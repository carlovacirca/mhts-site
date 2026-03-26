import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { Users } from "lucide-react";

const GBBook = () => (
  <div className="gb-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Book a Visit" subtitle="Walk-ins welcome — or book ahead for your convenience" brand="gb" />

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking info */}
        <div className="bg-gb-cream rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-gb-green" />
            <h3 className="font-display text-xl text-gb-green font-semibold">Walk-In Friendly</h3>
          </div>
          <p className="text-foreground/80 font-body mb-6">
            No appointment? No problem. Georges Barbers operates on a walk-in basis — just pop in and take a seat. For busier times, you can book ahead below.
          </p>
          <a
            href="https://carlo56fm.setmore.com/george"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gb-gold text-gb-green font-semibold px-8 py-3 rounded-md hover:bg-gb-gold-light transition-colors font-body mb-6"
          >
            Book Now
          </a>
          <div className="rounded-lg overflow-hidden border border-gb-gold/20">
            <iframe
              src="https://carlo56fm.setmore.com/george"
              width="100%"
              height="500"
              style={{ border: 0 }}
              title="Georges Barbers Booking"
              loading="lazy"
            />
          </div>
        </div>

        {/* Hours */}
        <OpeningHours brand="gb" />
      </div>
    </div>
  </div>
);

export default GBBook;
