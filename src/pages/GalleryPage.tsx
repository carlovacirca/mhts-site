import { Link } from "react-router-dom";
import { Shield, Award, Sparkles } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import ResponsiveImage from "@/components/ResponsiveImage";
import before1 from "@/assets/mhts-before-1.jpg";
import before2 from "@/assets/mhts-before-2.jpg";
import before3 from "@/assets/mhts-before-3.jpg";
import after1 from "@/assets/mhts-after-1.jpg";
import after2 from "@/assets/mhts-after-2.jpg";
import after3 from "@/assets/mhts-after-3.jpg";
import studioWide from "@/assets/mhts-studio-wide-hero-v2.jpg";
import consultationRoom from "@/assets/mhts-consultation-room-hero-v2.jpg";

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
    alt: "Before and after hair system fitting, Men's Hair To Stay Amersham",
  },
  {
    before: before2,
    after: after2,
    service: "Hair System Reattachment & Restyle",
    category: "maintenance",
    alt: "Before and after hair system reattachment and restyle, Men's Hair To Stay Amersham",
  },
  {
    before: before3,
    after: after3,
    service: "Hair System Fitting and Style",
    category: "smp",
    alt: "Before and after full scalp micropigmentation treatment, Men's Hair To Stay Amersham",
  },
];


// The hair system clients first, then the regroom.
const ordered = [...items].sort((x, y) => Number(x.category === "maintenance") - Number(y.category === "maintenance"));

const blurbs: Record<GalleryItem["category"], string> = {
  "hair-systems": "A custom hair system, colour matched, fitted and cut in at the studio.",
  maintenance: "An existing system cleaned, reattached and restyled so it looks new again.",
  smp: "A custom hair system fitted, then cut and styled to suit him.",
  thinning: "",
  crown: "",
};

/** One photograph with its Before or After label. */
const Shot = ({ src, alt, label }: { src: string; alt: string; label: string }) => (
  <figure className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
    <ResponsiveImage
      src={src}
      alt={alt}
      className="aspect-[3/5] max-h-[calc(var(--snap-screen)_-_17rem)] w-full object-cover md:aspect-[4/5] md:max-h-none"
      sizes="(max-width: 768px) 50vw, 520px"
      stopMedia
    />
    <figcaption
      className={`absolute left-3 top-3 rounded-full px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-[0.18em] md:left-4 md:top-4 md:text-xs ${
        label === "After" ? "bg-mhts-red text-white" : "bg-black/60 text-white"
      }`}
    >
      {label}
    </figcaption>
  </figure>
);

/**
 * One client, one stop (Carlo, Oct 2026): Before and After side by side, as
 * big as the stop allows, the client's treatment beside them from lg and
 * above them below it. The pair is sized from the height of the stop, so it
 * is never zoomed (mhts-fit-own).
 */
const ClientStop = ({ item, n }: { item: GalleryItem; n: number }) => (
  <section className="mhts-fit-own relative overflow-clip bg-mhts-deep py-6 max-md:flex max-md:flex-col max-md:justify-center md:py-10">
    <div className={`absolute inset-0 ${n % 2 ? "bg-[radial-gradient(60%_70%_at_85%_20%,hsl(var(--mhts-red)/0.22),transparent_70%)]" : "bg-[radial-gradient(60%_70%_at_15%_80%,hsl(var(--mhts-red)/0.22),transparent_70%)]"}`} />
    <div className="container relative mx-auto flex flex-col gap-5 px-4 md:gap-8 lg:max-w-[96rem] lg:flex-row lg:items-center lg:justify-center lg:gap-14 lg:px-10">
      <div className="text-center lg:w-72 lg:shrink-0 lg:text-left">
        <p className="mb-2 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">
          Client {n} of {items.length}
        </p>
        <h2 className="text-2xl leading-tight text-white md:text-4xl">{item.service}</h2>
        <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red lg:mx-0" />
        <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-white/70 md:text-lg">{blurbs[item.category]}</p>
      </div>
      <div className="mx-auto grid w-full grid-cols-2 gap-2 md:max-w-[calc((var(--snap-screen)_-_15rem)*1.6_+_1.5rem)] md:gap-6 lg:mx-0 lg:max-w-[calc((var(--snap-screen)_-_5rem)*1.6_+_1.5rem)] lg:flex-1">
        <Shot src={item.before} alt={`Before, ${item.service}`} label="Before" />
        <Shot src={item.after} alt={`After, ${item.service}`} label="After" />
      </div>
      {/* Phone: the next step under the pair. */}
      <CtaPair size="lg" tone="dark" label="Book Free Consultation" className="justify-center md:hidden" />
    </div>
  </section>
);

const GalleryPage = () => {

  useSeo({
    title: "Hair Replacement Before & After | Real Results",
    description:
      "See real before and after photos of hair systems and scalp micropigmentation (SMP). Transformation results from Men's Hair To Stay in Amersham.",
    canonicalPath: "/gallery",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
      ]),
      ...items.map((it) => ({
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: it.after,
        caption: it.alt,
        description: `${it.service}, before and after at Men's Hair To Stay, Amersham.`,
      })),
    ],
  });

  // Batch 4b. The results page is the one page where the photographs are the
  // content, so it is laid out like a gallery wall: the clients on the deep
  // dark, and the words that follow in three columns rather than a long grey
  // column.
  return (
    <div className="mhts-theme">
      {/* HERO, a stop of its own, the studio every photograph was taken in
          beside the words from md up. */}
      <section className="relative overflow-clip bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <div className="mhts-fill-chain container relative mx-auto max-w-3xl px-4 py-10 text-center md:grid md:max-w-7xl md:grid-cols-2 md:items-center md:gap-12 md:py-12 md:text-left">
          <div>
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">
              Real Results
            </p>
            <h1 className="text-3xl leading-tight text-white md:text-5xl">
              Hair Replacement Before &amp; After Gallery, Real Results
            </h1>
            <div className="mx-auto my-6 h-1 w-14 rounded-full bg-mhts-red md:mx-0" />
            <p className="font-body leading-relaxed text-white/80 md:text-lg">
              See real transformation results from Men's Hair To Stay. These before
              and after photos showcase the power of our hair systems and scalp
              micropigmentation (SMP) treatments applied by our specialist
              technicians in Amersham.
            </p>
          </div>
          <ResponsiveImage
            src={studioWide}
            alt="The Men's Hair To Stay studio in Amersham"
            className="mhts-fill mt-8 aspect-[16/10] w-full rounded-2xl object-cover md:mt-0 md:aspect-auto md:h-[min(60vh,560px)]"
            sizes="(max-width: 768px) 100vw, 640px"
          />
        </div>
      </section>

      {/* THE CLIENTS, one stop each. */}
      {ordered.map((item, i) => (
        <ClientStop key={item.service} item={item} n={i + 1} />
      ))}

      {/* From md up the three kinds of result and why clients trust us share
          one screen on a dark red band (Carlo, Oct 2026). */}
      <div className="mhts-snap-desk mhts-desk-dark mhts-desk-diag">
      {/* CATEGORY COPY, three columns */}
      {/* One screen on a phone: the three kinds of result, compact. */}
      <section className="bg-mhts-sand py-8 md:pb-6 md:pt-12">
        <div className="container mx-auto grid max-w-6xl gap-3 px-4 md:grid-cols-3 md:gap-6">
          {[
            {
              title: "Hair System Transformation Results",
              body: "View real before and after photos of custom hair system fittings and professional hair system reattachment applications. Each hair replacement system is tailored for natural, undetectable results.",
            },
            {
              title: "Scalp Micropigmentation (SMP) Transformation Results",
              body: "See the immediate results from our full SMP treatments and SMP touch-up sessions. Scalp micropigmentation creates realistic hair follicle density for men with significant hair loss.",
            },
            {
              title: "Hair System Maintenance & Regroom Results",
              body: "Our professional hair system maintenance services keep your system looking fresh. View results from hair system base cleaning, reattachment, styling, and colouring treatments. Whether you need a quick regroom (1x adhesive) or full regroom (2x adhesive), we deliver professional results.",
            },
          ].map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06} className="rounded-2xl border-t-4 border-mhts-red bg-card p-5 md:p-7">
              <h2 className="mb-2 text-lg leading-snug text-mhts-ink md:mb-3 md:text-2xl">
                {c.title}
              </h2>
              <p className="font-body text-[15px] leading-snug text-foreground/80 md:text-base md:leading-relaxed">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-card py-8 md:pb-12 md:pt-6">
        <div className="mhts-fill-chain container mx-auto max-w-5xl px-4">
          <h2 className="mb-8 text-center text-3xl text-mhts-ink md:mb-10 md:text-4xl">
            Why Clients Trust Men's Hair To Stay
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {[
              { icon: Shield, title: "100% Confidential Service", desc: "All consultations and treatments are completely private." },
              { icon: Award, title: "Specialist-Trained Technicians", desc: "8+ years of hair system and SMP expertise." },
              { icon: Sparkles, title: "Real Results, Real Confidence", desc: "Proven transformations for men across Amersham and Buckinghamshire." },
            ].map((s) => (
              <div key={s.title} className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mhts-red-tint">
                  <s.icon className="h-6 w-6 text-mhts-red" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1.5 text-mhts-ink">{s.title}</h3>
                  <p className="font-body text-sm leading-relaxed text-foreground/75">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Phone only: the private room every consultation happens in. */}
          <ResponsiveImage
            src={consultationRoom}
            alt="The private consultation room at the Amersham studio"
            className="mhts-fill mt-8 aspect-[16/10] w-full rounded-2xl object-cover md:hidden"
            sizes="100vw"
          />
        </div>
      </section>

      </div>

      {/* CTA */}
      <section className="relative overflow-clip bg-mhts-deep py-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl text-white md:text-4xl">
            Ready to See Your Own Transformation?
          </h2>
          <p className="mx-auto mb-10 max-w-2xl font-body leading-relaxed text-white/75">
            Book a free initial consultation with our specialist technicians.
            We'll assess your hair loss and discuss your options for hair
            systems, SMP, or specialized treatments like thinning hair or crown
            coverage.
          </p>
          <CtaPair size="lg" tone="dark" label="Book Free Consultation" className="justify-center" />
          <div className="mt-8 border-t border-white/10 pt-6 md:mt-14 md:pt-10">
            <p className="mb-5 font-body text-xs uppercase tracking-[0.2em] text-white/60">
              Explore More
            </p>
            <div className="flex flex-wrap justify-center gap-3 font-body text-sm">
              {[
                { to: "/how-it-works", label: "How It Works" },
                { to: "/services", label: "View Our Services" },
                { to: "/book", label: "Book Your Consultation" },
                { to: "/faq", label: "Read Hair Replacement FAQs" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-full border border-white/20 px-4 py-2 text-white/85 transition-colors hover:border-white hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default GalleryPage;
