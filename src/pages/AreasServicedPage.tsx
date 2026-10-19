import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/lib/motion";
import ResponsiveImage from "@/components/ResponsiveImage";
import studioWide from "@/assets/mhts-studio-wide-hero-v2.jpg";
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
    title: "Areas We Serve | Hair Replacement & SMP, Bucks & Herts",
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
      <section className="relative overflow-clip bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(50%_80%_at_85%_30%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <AreaRings />
        <div className="mhts-fill-chain container relative mx-auto max-w-6xl px-4 py-8 md:py-24">
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
          {/* Phone only: the studio every town travels to, filling the first
              screen. */}
          <ResponsiveImage
            src={studioWide}
            alt="The Men's Hair To Stay studio in Amersham"
            className="mhts-fill mt-8 aspect-[16/10] w-full rounded-2xl object-cover md:hidden"
            sizes="100vw"
          />
        </div>
      </section>

      {/* THE TOWNS. One stop on every screen (Carlo, Oct 2026: the towns
          were three phone screens of uneven size, and a desktop stop of tiny
          writing with no heading). On a phone, twelve tiles two across, the
          town's name only (its own page has the detail); from md up, four
          across with each town's line. */}
      <section className="bg-mhts-sand py-8 md:py-10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-5 text-center md:mb-8">
            <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.2em] text-mhts-red-deep">12 towns, one studio</p>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Choose Your Town</h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
          </div>
          <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            {areas.map((a, i) => (
              <Reveal as="li" key={a.name} delay={(i % 4) * 0.05}>
                <Link
                  to={`/areas/${a.slug}`}
                  className={`group flex h-full items-center gap-3 rounded-xl border px-3.5 py-[18px] transition-all hover:-translate-y-0.5 hover:shadow-lg md:flex-col md:items-start md:gap-2 md:p-5 ${
                    i === 0 ? "border-mhts-red bg-mhts-red text-white" : "border-mhts-stone bg-card hover:border-mhts-red"
                  }`}
                >
                  <span className="flex w-full items-center gap-2.5">
                    {i === 0 && (
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-mhts-red-deep md:h-8 md:w-8">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    )}
                    <span className={`min-w-0 flex-1 font-body text-[15px] font-semibold leading-tight md:text-lg ${i === 0 ? "text-white" : "text-mhts-ink group-hover:text-mhts-red-deep"}`}>
                      {a.name}
                    </span>
                    <ChevronRight className={`h-4 w-4 shrink-0 ${i === 0 ? "text-white" : "text-mhts-red"}`} aria-hidden="true" />
                  </span>
                  <span className={`hidden font-body text-sm leading-snug md:block ${i === 0 ? "text-white/90" : "text-foreground/75"}`}>{a.desc}</span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* CLOSING: wherever the reader lives, the studio and how to book. */}
      <section className="relative overflow-clip bg-mhts-deep py-10 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
        <div className="mhts-fill-chain container relative mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
          <div className="text-center md:text-left">
            <h2 className="text-3xl text-white md:text-4xl">Not Far, Wherever You Are</h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red md:mx-0" />
            <p className="mt-4 font-body leading-relaxed text-white/80 md:text-lg">
              Every appointment is at our private studio in Amersham, easy to reach by car or on the
              Metropolitan line. Your first consultation is free and takes about half an hour.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 font-body text-sm text-white/75">
              <MapPin className="h-4 w-4 text-mhts-red-light" aria-hidden="true" />
              {ADDRESS_LINE}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
              <BookButton size="lg" label="Book Free Consultation" />
              <CallButton size="lg" tone="dark" />
            </div>
          </div>
          <ResponsiveImage
            src={studioWide}
            alt="The Men's Hair To Stay studio in Amersham"
            className="mhts-fill aspect-[16/10] w-full rounded-2xl object-cover md:aspect-[4/3]"
            sizes="(max-width: 768px) 100vw, 560px"
          />
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
