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
          {/* Booking embed placeholder */}
          <div className="bg-card rounded-lg border border-gb-gold/20 p-8 text-center">
            <p className="text-muted-foreground text-sm font-body mb-2">Booking widget</p>
            <p className="text-xs text-muted-foreground font-body">
              Google Appointment Setter or HubSpot Meeting link will be embedded here.
            </p>
          </div>
        </div>

        {/* Hours */}
        <OpeningHours brand="gb" />
      </div>
    </div>
  </div>
);

export default GBBook;
