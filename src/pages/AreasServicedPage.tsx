import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { useSeo } from "@/lib/seo";

const areas = [
  { name: "Amersham", desc: "Our home base — 11 Chesham Road, HP6 5HN. Specialist hair replacement and SMP." },
  { name: "Chesham", desc: "Just minutes away. Clients across Chesham trust us for non-surgical hair replacement." },
  { name: "High Wycombe", desc: "Serving High Wycombe with bespoke hair systems and scalp micropigmentation." },
  { name: "Beaconsfield", desc: "Confidential consultations for Beaconsfield clients seeking professional solutions." },
  { name: "Chalfont St Giles", desc: "Hair loss expertise close to home for Chalfont St Giles residents." },
  { name: "Little Chalfont", desc: "Trusted by Little Chalfont clients for natural-looking hair systems and SMP." },
  { name: "Gerrards Cross", desc: "Premium hair replacement and maintenance for Gerrards Cross clients." },
  { name: "Throughout Buckinghamshire", desc: "Welcoming clients from across Buckinghamshire and beyond." },
];

const AreasServicedPage = () => {
  useSeo({
    title: "Areas Serviced | Hair Replacement & SMP Across Buckinghamshire",
    description:
      "Men's Hair To Stay serves Amersham, Chesham, High Wycombe, Beaconsfield, Chalfont St Giles and across Buckinghamshire with hair replacement systems and SMP.",
    canonicalPath: "/areas-serviced",
  });

  return (
    <div className="bg-mhts-light">
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Service Areas</p>
            <h1 className="text-3xl md:text-5xl text-mhts-charcoal font-light tracking-wide mb-6">
              Hair Replacement & SMP Across Buckinghamshire
            </h1>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mb-6" />
            <p className="text-foreground/80 font-body max-w-2xl mx-auto">
              Based in Amersham, our specialist technicians serve clients across Buckinghamshire with
              non-surgical hair replacement systems, scalp micropigmentation (SMP) and ongoing maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((a) => (
              <div key={a.name} className="bg-card rounded-sm p-6 border border-border">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-mhts-charcoal mt-1 shrink-0" />
                  <div>
                    <h2 className="text-xl text-mhts-charcoal font-light tracking-wide mb-2">{a.name}</h2>
                    <p className="text-foreground/80 font-body text-sm">{a.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white px-8 py-3 rounded-sm hover:bg-mhts-slate transition-colors font-body tracking-wide"
            >
              Book a Free Consultation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreasServicedPage;
