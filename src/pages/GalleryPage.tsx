import { Link } from "react-router-dom";
import { Shield, Award, Sparkles } from "lucide-react";
import BeforeAfterFade from "@/components/mhts/BeforeAfterFade";
import { SNAP_PHONE_CLASS, SNAP_SPLIT_CLASS, SNAP_STOP_EACH_CLASS } from "@/lib/sectionSnap";
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


/** One client: the frame, with the service as its caption. */
const ClientFrame = ({ item }: { item: GalleryItem }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 [&_figcaption]:text-sm [&_figcaption]:font-semibold [&_figcaption]:text-white">
    <BeforeAfterFade
      before={item.before}
      after={item.after}
      beforeAlt={`Before, ${item.service}`}
      afterAlt={`After, ${item.service}`}
      caption={item.service}
      frameClassName="aspect-[3/2] md:aspect-[4/5]"
      sizes="(max-width: 768px) 100vw, 360px"
    />
  </div>
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

  const visible = items;

  // Batch 4b. The results page is the one page where the photographs are the
  // content, so it is laid out like a gallery wall: the clients on the deep
  // dark, and the words that follow in three columns rather than a long grey
  // column.
  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative overflow-clip bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <div className="container relative mx-auto max-w-3xl px-4 py-14 text-center md:pb-12 md:pt-20">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">
            Real Results
          </p>
          <h1 className="text-3xl leading-tight text-white md:text-5xl">
            Hair Replacement Before &amp; After Gallery, Real Results
          </h1>
          <div className="mx-auto my-6 h-1 w-14 rounded-full bg-mhts-red" />
          <p className="font-body leading-relaxed text-white/80">
            See real transformation results from Men's Hair To Stay. These before
            and after photos showcase the power of our hair systems and scalp
            micropigmentation (SMP) treatments applied by our specialist
            technicians in Amersham.
          </p>
        </div>
      </section>

      {/* THE CLIENTS. One frame each that fades from Before to After on its
          own (batch 4b fixes): no dragging, no swiping, no lightbox and no
          instructions. Two to a screen on a phone, then the third on a screen
          of its own; three in a row on a desktop. The phone-only and
          desktop-only copies of the third are the same client, and the hidden
          one is display:none, so it is neither downloaded nor read out. */}
      <section className={`${SNAP_SPLIT_CLASS} relative overflow-clip bg-mhts-deep md:pb-24`}>
        {visible.length === 0 ? (
          <p className="py-12 text-center font-body text-white/75">
            More transformations coming soon for this category.
          </p>
        ) : (
          <>
            <div className={`${SNAP_PHONE_CLASS} container relative mx-auto px-4 py-8 md:py-0`}>
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
                {visible.map((item, idx) => (
                  <Reveal key={idx} from="scale" delay={idx * 0.08} className={idx === 2 ? "hidden md:block" : undefined}>
                    <ClientFrame item={item} />
                  </Reveal>
                ))}
              </div>
            </div>
            {visible[2] && (
              <div className={`${SNAP_PHONE_CLASS} container relative mx-auto px-4 py-8 md:hidden`}>
                <ClientFrame item={visible[2]} />
              </div>
            )}
          </>
        )}
      </section>

      {/* CATEGORY COPY, three columns */}
      <section className="bg-mhts-sand py-8 md:py-20">
        <div className={`container mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3 md:gap-6 ${SNAP_STOP_EACH_CLASS}`}>
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
            <Reveal key={c.title} delay={i * 0.06} className="rounded-2xl border-t-4 border-mhts-red bg-card p-6 md:p-7">
              <h2 className="mb-3 text-xl text-mhts-ink md:text-2xl">
                {c.title}
              </h2>
              <p className="font-body leading-relaxed text-foreground/80">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-card py-8 md:py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-3xl text-mhts-ink md:text-4xl">
            Why Clients Trust Men's Hair To Stay
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
        </div>
      </section>

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
