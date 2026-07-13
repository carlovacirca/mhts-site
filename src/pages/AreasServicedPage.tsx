import { Link } from "react-router-dom";
import { MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { useSeo } from "@/lib/seo";

const areas = [
  { name: "Amersham", slug: "amersham", desc: "Our home base — 11 Chesham Road, HP6 5HN. Specialist hair replacement and SMP." },
  { name: "Chesham", slug: "chesham", desc: "Just minutes away. Clients across Chesham trust us for non-surgical hair replacement." },
  { name: "High Wycombe", slug: "high-wycombe", desc: "The nearest specialist in hair systems and non-surgical hair replacement for High Wycombe." },
  { name: "Beaconsfield", slug: "beaconsfield", desc: "Confidential consultations for Beaconsfield clients seeking professional solutions." },
  { name: "Chalfont St Giles", slug: "chalfont-st-giles", desc: "Hair loss expertise close to home for Chalfont St Giles residents." },
  { name: "Chalfont St Peter", slug: "chalfont-st-peter", desc: "The nearest hair system and SMP specialist for Chalfont St Peter clients." },
  { name: "Little Chalfont", slug: "little-chalfont", desc: "Trusted by Little Chalfont clients for natural-looking hair systems and SMP." },
  { name: "Gerrards Cross", slug: "gerrards-cross", desc: "Premium hair replacement and maintenance for Gerrards Cross clients." },
  { name: "Rickmansworth", slug: "rickmansworth", desc: "A direct Metropolitan line journey to specialist hair systems in Amersham." },
  { name: "Chorleywood", slug: "chorleywood", desc: "A short hop on the Met line for specialist hair systems and hair replacement." },
  { name: "Watford", slug: "watford", desc: "Watford's nearest specialist in custom hair systems and hair replacement." },
  { name: "Berkhamsted", slug: "berkhamsted", desc: "Hair systems and hair replacement for Berkhamsted, reached via Chesham or the A41." },
];

const AreasServicedPage = () => {
  useSeo({
    title: "Areas Serviced | Hair Replacement & SMP Across Bucks & Herts",
    description:
      "Men's Hair To Stay serves Amersham, Chesham, High Wycombe, Beaconsfield, Rickmansworth, Watford and across Buckinghamshire and Hertfordshire.",
    canonicalPath: "/areas-serviced",
  });

  return (
    <div className="bg-mhts-light">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Service Areas</p>
            <h1 className="text-3xl md:text-5xl text-mhts-charcoal font-light tracking-wide mb-6">
              Hair Replacement & SMP Across Buckinghamshire &amp; Hertfordshire
            </h1>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mb-6" />
            <p className="text-foreground/80 font-body max-w-2xl mx-auto">
              Based in Amersham, our specialist technicians serve clients across Buckinghamshire and into
              Hertfordshire with non-surgical hair replacement systems, scalp micropigmentation (SMP) and
              ongoing maintenance. Choose your town below for details specific to your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((a) => (
              <Link
                key={a.name}
                to={`/areas/${a.slug}`}
                className="group bg-card rounded-sm p-6 border border-border hover:border-mhts-slate/40 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-mhts-charcoal mt-1 shrink-0" />
                  <div className="flex-1">
                    <h2 className="text-xl text-mhts-charcoal font-light tracking-wide mb-2">{a.name}</h2>
                    <p className="text-foreground/80 font-body text-sm mb-3">{a.desc}</p>
                    <span className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body group-hover:gap-2 transition-all">
                      Hair replacement in {a.name} <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white px-8 py-3 rounded-sm hover:bg-mhts-slate transition-colors font-body tracking-wide"
            >
              Book Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreasServicedPage;
