import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";

const GalleryPage = () => {
  return (
    <div className="mhts-theme">
      <section className="bg-mhts-charcoal py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">Real Results</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-mhts-white">Gallery</h1>
          <div className="w-12 h-px bg-mhts-white/40 mx-auto mt-5" />
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-foreground/80 font-body leading-relaxed mb-8">
            Our full gallery of hair system and SMP transformations is coming soon.
          </p>
          <Link
            to="/mens-hair-to-stay#mhts-gallery"
            className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white font-medium px-8 py-3 rounded-sm hover:bg-mhts-charcoal/90 transition-colors font-body tracking-wide"
          >
            <CalendarCheck className="w-4 h-4" /> View Featured Transformations
          </Link>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
