import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { CalendarCheck } from "lucide-react";

const MHTSBook = () => {
  return (
    <div className="mhts-theme py-16">
      <div className="container mx-auto px-4">
        <SectionHeading title="Book a Consultation" subtitle="Secure your specialist appointment" brand="mhts" />

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking */}
          <div className="bg-mhts-light rounded-xl p-8 flex flex-col items-center justify-center">
            <CalendarCheck className="w-10 h-10 text-mhts-charcoal mb-4" />
            <a
              href="https://booking.appointy.com/Mhts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-mhts-charcoal text-white font-semibold text-lg hover:bg-mhts-charcoal/90 transition-colors"
            >
              Book a Consultation
            </a>
          </div>

          {/* Hours */}
          <OpeningHours brand="mhts" />
        </div>
      </div>
    </div>
  );
};

export default MHTSBook;
