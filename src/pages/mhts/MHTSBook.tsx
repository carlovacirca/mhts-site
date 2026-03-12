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

          {/* Deposit notice */}
          <div className="bg-card border border-border rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-mhts-slate shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/80">
              <p className="font-semibold mb-1">Deposit Required</p>
              <p>A deposit is required to secure your specialist appointment. This is deducted from your treatment cost and ensures dedicated time with our specialist.</p>
            </div>
          </div>

          {/* Booking embed placeholder */}
          <div className="bg-card rounded-lg border border-border p-8 text-center">
            <p className="text-muted-foreground text-sm mb-2">Booking widget</p>
            <p className="text-xs text-muted-foreground">
              Picktime or YouCanBook.me widget with deposit payment will be embedded here.
            </p>
          </div>
        </div>

        {/* Hours */}
        <OpeningHours brand="mhts" />
      </div>
    </div>
  </div>
);

export default MHTSBook;
