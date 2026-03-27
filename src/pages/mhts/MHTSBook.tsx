import { useEffect } from "react";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";

const MHTSBook = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://menshairtostay.trafft.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="mhts-theme py-16 bg-mhts-light">
      <div className="w-full px-4">
        <SectionHeading title="Book a Consultation" subtitle="Secure your specialist appointment" brand="mhts" />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking */}
          <div
            className="embedded-booking w-full"
            data-url="https://menshairtostay.trafft.com"
            data-query="&t=s&uuid=848c1e33-c5d4-4dc8-a7de-94102b7c344b"
            data-lang="en"
            data-autoresize="0"
            data-showsidebar="1"
            data-showservices="0"
            style={{ minWidth: "320px", minHeight: "1000px", width: "100%" }}
          />

          {/* Hours */}
          <OpeningHours brand="mhts" />
        </div>
      </div>
    </div>
  );
};

export default MHTSBook;
