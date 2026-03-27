import { useEffect, useRef } from "react";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { CalendarCheck } from "lucide-react";

const MHTSBook = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const d = e.data || {};
      if (d.type === "height" && iframeRef.current) {
        iframeRef.current.style.height = d.data + "px";
      }
      if (d.type === "scroll" && iframeRef.current) {
        iframeRef.current.scrollIntoView();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
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
                ref={iframeRef}
                src="https://booking.appointy.com/Mhts?isgadget=1&autoheight=1"
                scrolling="no"
                width="100%"
                frameBorder="0"
                style={{ border: 0 }}
                title="MHTS Booking"
              />
            </div>
          </div>

          {/* Hours */}
          <OpeningHours brand="mhts" />
        </div>
      </div>
    </div>
  );
};

export default MHTSBook;
