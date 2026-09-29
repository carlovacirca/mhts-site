import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/lib/motion";
import { SNAP_STOP_EACH_CLASS } from "@/lib/sectionSnap";
import { ADDRESS_LINE } from "@/lib/site";
import { BookButton, CallButton } from "@/components/mhts/CtaButtons";

const areas = [
  { name: "Amersham", slug: "amersham", desc: "Our home base, 11 Chesham Road, HP6 5HN. Specialist hair replacement and SMP." },
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
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Areas Serviced", path: "/areas-serviced" },
    ]),
  });

  return (
    <div className="mhts-theme">
      {/* Batch 4b. The areas used to be twelve identical grey boxes under a
          centred heading. Now the studio is the fixed point: a dark band with
          the heading and the address, then the towns as numbered pins in three
          columns, Amersham first, each with the journey line from its own
          page. */}
      <section className="relative overflow-hidden bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_85%_30%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <AreaRings />
        <div className="container relative mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.2em] text-mhts-red-light">Service Areas</p>
            <h1 className="mb-6 text-3xl leading-tight text-white md:text-5xl">
              Hair Replacement & SMP Across Buckinghamshire &amp; Hertfordshire
            </h1>
            <p className="mb-8 max-w-2xl font-body text-white/80">
              Based in Amersham, our specialist technicians serve clients across Buckinghamshire and into
              Hertfordshire with non-surgical hair replacement systems, scalp micropigmentation (SMP) and
              ongoing maintenance. Choose your town below for details specific to your journey.
            </p>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-body text-sm text-white/85">
              <MapPin className="h-4 w-4 text-mhts-red-light" aria-hidden="true" />
              {ADDRESS_LINE}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-mhts-sand py-8 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* On a phone every town is a stop. */}
          <ol className={`grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 ${SNAP_STOP_EACH_CLASS}`}>
            {areas.map((a, i) => (
              <Reveal as="li" key={a.name} delay={(i % 3) * 0.06}>
                <Link
                  to={`/areas/${a.slug}`}
                  className={`group flex h-full flex-col rounded-xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    i === 0 ? "border-mhts-red bg-mhts-red text-white" : "border-mhts-stone bg-card hover:border-mhts-red"
                  }`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-body text-xs font-bold ${
                        i === 0 ? "bg-white text-mhts-red-deep" : "bg-mhts-red-tint text-mhts-red-deep"
                      }`}
                    >
                      {i === 0 ? <MapPin className="h-4 w-4" aria-hidden="true" /> : String(i).padStart(2, "0")}
                    </span>
                    <h2 className={`text-xl ${i === 0 ? "text-white" : "text-mhts-ink"}`}>{a.name}</h2>
                  </div>
                  <p className={`mb-5 flex-1 font-body text-sm leading-relaxed ${i === 0 ? "text-white" : "text-foreground/80"}`}>
                    {a.desc}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 font-body text-sm font-semibold transition-all group-hover:gap-2 ${
                      i === 0 ? "text-white" : "text-mhts-red-deep"
                    }`}
                  >
                    Hair replacement in {a.name} <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton size="lg" label="Book Free Consultation" />
            <CallButton size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
};

/** Concentric rings behind the heading: the studio as the centre of the map. Decorative. */
const AreaRings = () => (
  <svg
    className="pointer-events-none absolute -right-24 top-1/2 hidden h-[560px] w-[560px] -translate-y-1/2 md:block"
    viewBox="0 0 200 200"
    aria-hidden="true"
  >
    {[30, 55, 80, 98].map((r) => (
      <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="white" strokeOpacity="0.1" strokeDasharray="2 3" />
    ))}
    <circle cx="100" cy="100" r="6" fill="hsl(var(--mhts-red))" />
    <circle cx="100" cy="100" r="12" fill="none" stroke="hsl(var(--mhts-red))" strokeOpacity="0.5" />
  </svg>
);

export default AreasServicedPage;
