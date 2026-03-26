import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { CalendarCheck, AlertCircle } from "lucide-react";

const MHTSBook = () => (
  <div className="mhts-theme py-16">
    <div className="container mx-auto px-4">
      <SectionHeading title="Book a Consultation" subtitle="Secure your specialist appointment" brand="mhts" />

      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Booking */}
        <div className="bg-mhts-light rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <CalendarCheck className="w-6 h-6 text-mhts-charcoal" />
            <h3 className="text-xl font-semibold text-mhts-charcoal">Book Online</h3>
          </div>



          <div className="rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://carlo56fm.setmore.com/lexie"
              width="100%"
              height="500"
              style={{ border: 0 }}
              title="MHTS Booking"
              loading="lazy"
            />
          </div>
        </div>

        {/* Hours */}
        <OpeningHours brand="mhts" />
      </div>
    </div>
  </div>
);

export default MHTSBook;
