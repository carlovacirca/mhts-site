import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { serviceCategories } from "@/data/services";

const ServicesPage = () => {
  return (
    <div className="mhts-theme">
      <section className="bg-mhts-charcoal py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">What We Offer</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-wide text-mhts-white">Our Services</h1>
          <div className="w-12 h-px bg-mhts-white/40 mx-auto mt-5" />
        </div>
      </section>
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {serviceCategories.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="group bg-card rounded-sm p-7 border border-border hover:border-mhts-slate/40 transition-colors flex flex-col"
              >
                <h2 className="text-lg font-medium text-mhts-charcoal mb-3 tracking-wide">{c.name}</h2>
                <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1">{c.tagline}</p>
                <span className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body mt-5 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
