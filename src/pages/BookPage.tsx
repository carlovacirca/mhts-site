import { useEffect } from "react";

const BookPage = () => {
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
    <div className="mhts-theme">
      <section className="bg-mhts-charcoal py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">Reserve Your Time</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-mhts-white">Book a Consultation</h1>
          <div className="w-12 h-px bg-mhts-white/40 mx-auto mt-5" />
          <p className="text-mhts-white/70 font-body mt-6 max-w-xl mx-auto">
            Select a date and time below to book your free consultation with our specialist team.
          </p>
        </div>
      </section>
      <section className="py-12 bg-mhts-light">
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
      </section>
    </div>
  );
};

export default BookPage;
