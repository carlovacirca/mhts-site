import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarCheck, Phone, X, Shield, Award, Sparkles } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import before1 from "@/assets/mhts-before-1.jpg";
import before2 from "@/assets/mhts-before-2.jpg";
import before3 from "@/assets/mhts-before-3.jpg";
import after1 from "@/assets/mhts-after-1.jpg";
import after2 from "@/assets/mhts-after-2.jpg";
import after3 from "@/assets/mhts-after-3.jpg";

type Category = "all" | "hair-systems" | "smp" | "maintenance" | "thinning" | "crown";

interface GalleryItem {
  before: string;
  after: string;
  service: string;
  category: Exclude<Category, "all">;
  alt: string;
}

const items: GalleryItem[] = [
  {
    before: before1,
    after: after1,
    service: "Hair System Fitting & Application",
    category: "hair-systems",
    alt: "Before and after hair system fitting — Men's Hair To Stay Amersham",
  },
  {
    before: before2,
    after: after2,
    service: "Hair System Reattachment & Restyle",
    category: "maintenance",
    alt: "Before and after hair system reattachment and restyle — Men's Hair To Stay Amersham",
  },
  {
    before: before3,
    after: after3,
    service: "Full SMP Treatment",
    category: "smp",
    alt: "Before and after full scalp micropigmentation treatment — Men's Hair To Stay Amersham",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All Results", value: "all" },
  { label: "Hair Systems", value: "hair-systems" },
  { label: "Scalp Micropigmentation (SMP)", value: "smp" },
  { label: "Maintenance & Regroom", value: "maintenance" },
  { label: "Thinning Hair Treatments", value: "thinning" },
  { label: "Crown Coverage Treatments", value: "crown" },
];

const GalleryPage = () => {
  const [filter, setFilter] = useState<Category>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair Replacement Before & After | Real Results | Men's Hair To Stay";
    const meta =
      document.querySelector('meta[name="description"]') ||
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        document.head.appendChild(m);
        return m;
      })();
    const prevDesc = meta.getAttribute("content");
    meta.setAttribute(
      "content",
      "See real before and after photos of hair systems and scalp micropigmentation (SMP). Transformation results from Men's Hair To Stay in Amersham."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="bg-mhts-charcoal py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">
            Real Results
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-mhts-white leading-tight">
            Hair Replacement Before &amp; After Gallery — Real Results
          </h1>
          <div className="w-12 h-px bg-mhts-white/40 mx-auto my-6" />
          <p className="text-mhts-white/70 font-body leading-relaxed">
            See real transformation results from Men's Hair To Stay. These before
            and after photos showcase the power of our hair systems and scalp
            micropigmentation (SMP) treatments applied by our specialist
            technicians in Amersham.
          </p>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 text-sm rounded-sm font-body tracking-wide transition-colors border ${
                  filter === f.value
                    ? "bg-mhts-charcoal text-mhts-white border-mhts-charcoal"
                    : "bg-card text-mhts-charcoal border-border hover:bg-mhts-light"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="text-center text-foreground/70 font-body py-12">
              More transformations coming soon for this category.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {visible.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightbox(item)}
                  className="group text-left bg-card border border-border rounded-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-2">
                    <div className="relative">
                      <img
                        src={item.before}
                        alt={`Before — ${item.service}`}
                        loading="lazy"
                        className="w-full h-64 object-cover object-top"
                      />
                      <span className="absolute top-2 left-2 bg-mhts-charcoal/90 text-mhts-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-body">
                        Before
                      </span>
                    </div>
                    <div className="relative">
                      <img
                        src={item.after}
                        alt={`After — ${item.service}`}
                        loading="lazy"
                        className="w-full h-64 object-cover object-top"
                      />
                      <span className="absolute top-2 left-2 bg-mhts-white/95 text-mhts-charcoal text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm font-body">
                        After
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-mhts-charcoal font-medium tracking-wide">
                      {item.service}
                    </h3>
                    <p className="text-mhts-slate text-xs mt-1 font-body uppercase tracking-[0.2em]">
                      Click to enlarge
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATEGORY COPY */}
      <section className="py-16 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <div>
            <h2 className="text-2xl md:text-3xl text-mhts-charcoal font-light tracking-wide mb-3">
              Hair System Transformation Results
            </h2>
            <p className="text-foreground/80 font-body leading-relaxed">
              View real before and after photos of custom hair system fittings
              and professional hair system reattachment applications. Each hair
              replacement system is tailored for natural, undetectable results.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl text-mhts-charcoal font-light tracking-wide mb-3">
              Scalp Micropigmentation (SMP) Transformation Results
            </h2>
            <p className="text-foreground/80 font-body leading-relaxed">
              See the immediate results from our full SMP treatments and SMP
              touch-up sessions. Scalp micropigmentation creates realistic hair
              follicle density for men with significant hair loss.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl text-mhts-charcoal font-light tracking-wide mb-3">
              Hair System Maintenance &amp; Regroom Results
            </h2>
            <p className="text-foreground/80 font-body leading-relaxed">
              Our professional hair system maintenance services keep your system
              looking fresh. View results from hair system base cleaning,
              reattachment, styling, and colouring treatments. Whether you need a
              quick regroom (1x adhesive) or full regroom (2x adhesive), we
              deliver professional results.
            </p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Why Clients Trust Men's Hair To Stay
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "100% Confidential Service", desc: "All consultations and treatments are completely private." },
              { icon: Award, title: "Specialist-Trained Technicians", desc: "8+ years of hair system and SMP expertise." },
              { icon: Sparkles, title: "Real Results, Real Confidence", desc: "Proven transformations for men across Amersham and Buckinghamshire." },
            ].map((s) => (
              <div key={s.title} className="bg-mhts-light border border-border p-7 rounded-sm text-center">
                <s.icon className="w-6 h-6 text-mhts-charcoal mx-auto mb-4" />
                <h3 className="text-mhts-charcoal font-medium tracking-wide mb-2">{s.title}</h3>
                <p className="text-foreground/75 text-sm font-body leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mhts-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-mhts-white font-light tracking-wide mb-4">
            Ready to See Your Own Transformation?
          </h2>
          <p className="text-mhts-white/70 font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            Book a free initial consultation with our specialist technicians.
            We'll assess your hair loss and discuss your options for hair
            systems, SMP, or specialized treatments like thinning hair or crown
            coverage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Your Free Consultation
            </Link>
            <a
              href="tel:07947878087"
              className="inline-flex items-center gap-2 border border-mhts-white/40 text-mhts-white px-8 py-3 rounded-sm hover:border-mhts-white hover:bg-mhts-white/10 transition-colors font-body tracking-wide"
            >
              <Phone className="w-4 h-4" /> Call 07947 878087
            </a>
          </div>
          <div className="mt-14 pt-10 border-t border-mhts-white/10">
            <p className="text-mhts-white/50 uppercase tracking-[0.2em] text-xs mb-5 font-body">
              Explore More
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-body">
              <Link to="/how-it-works" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                How It Works
              </Link>
              <Link to="/services" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                View Our Services
              </Link>
              <Link to="/book" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                Book Your Consultation
              </Link>
              <Link to="/faq" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                Read Hair Replacement FAQs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            aria-label="Close"
          >
            <X className="w-7 h-7" />
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="relative">
                <img src={lightbox.before} alt={`Before — ${lightbox.service}`} className="w-full max-h-[80vh] object-contain bg-black" />
                <span className="absolute top-3 left-3 bg-mhts-charcoal/90 text-mhts-white text-xs uppercase tracking-widest px-3 py-1 rounded-sm font-body">
                  Before
                </span>
              </div>
              <div className="relative">
                <img src={lightbox.after} alt={`After — ${lightbox.service}`} className="w-full max-h-[80vh] object-contain bg-black" />
                <span className="absolute top-3 left-3 bg-mhts-white/95 text-mhts-charcoal text-xs uppercase tracking-widest px-3 py-1 rounded-sm font-body">
                  After
                </span>
              </div>
            </div>
            <p className="text-white text-center mt-4 font-body tracking-wide">{lightbox.service}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
