import { useParams, Navigate, Link } from "react-router-dom";
import { ChevronRight, MapPin, ShieldCheck } from "lucide-react";
import { Reveal } from "@/lib/motion";
import ResponsiveImage from "@/components/ResponsiveImage";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { cardPhotoFor } from "@/data/servicePhotos";
import studioPhoto from "@/assets/mhts-studio-wide-hero.jpg";
import { useSeo, useJsonLd, useOpenGraph, localBusinessSchema, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { findArea } from "@/data/areas";
import { serviceCategories } from "@/data/services";

const AreaPage = () => {
  const { slug } = useParams();
  const area = slug ? findArea(slug) : undefined;

  useSeo({
    title: area?.seoTitle ?? "Area Not Found | Men's Hair To Stay",
    description: area?.seoDescription ?? "",
    canonicalPath: area ? `/areas/${area.slug}` : "/areas-serviced",
  });

  useOpenGraph(
    area?.seoTitle ?? "Area Not Found | Men's Hair To Stay",
    area?.seoDescription ?? ""
  );

  useJsonLd(
    area
      ? [
          {
            ...localBusinessSchema,
            url: `${SITE_URL}/areas/${area.slug}`,
            areaServed: area.name,
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Areas Serviced", path: "/areas-serviced" },
            { name: area.name, path: `/areas/${area.slug}` },
          ]),
        ]
      : []
  );

  if (!area) return <Navigate to="/areas-serviced" replace />;

  // Batch 4b. The area pages were the service page template with the photos
  // taken out: seven centred sections of grey. They now read as a local page:
  // the journey to the studio sits beside the heading, the studio itself beside
  // the introduction, the four treatments as photo cards, and the free
  // consultation on the one dark band. Every word comes from src/data/areas.ts
  // as before.
  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative overflow-hidden bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(55%_90%_at_0%_100%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <div className="container relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.2em] text-mhts-red-light">
              {area.distanceLabel}
            </p>
            <h1 className="mb-6 text-3xl leading-tight text-white md:text-5xl">
              {area.h1}
            </h1>
            <p className="mb-8 max-w-xl font-body text-lg text-white/80">
              {area.heroSubheading}
            </p>
            <CtaPair size="lg" tone="dark" label="Book Free Consultation" />
          </div>

          {/* The journey, drawn: the reader's town, a dashed line, the studio. */}
          <Reveal from="right" className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-white/60" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <p className="font-body text-lg font-semibold text-white">{area.name}</p>
            </div>
            <div className="ml-5 h-10 border-l-2 border-dashed border-white/35" aria-hidden="true" />
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mhts-red" aria-hidden="true">
                <MapPin className="h-5 w-5 text-white" />
              </span>
              <p className="pt-1 font-body text-sm leading-relaxed text-white/85">
                <strong className="block text-base text-white">Men's Hair To Stay</strong>
                11 Chesham Road, Amersham, HP6 5HN.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* INTRO, with the studio beside it */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:gap-14">
          <Reveal>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
              Your Nearest Specialist
            </p>
            <h2 className="mb-6 text-3xl text-mhts-ink md:text-4xl">
              Hair Replacement Near {area.name}
            </h2>
            <div className="space-y-5 font-body leading-relaxed text-foreground/80">
              {area.introParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal as="figure" from="right" className="md:pt-10">
            <ResponsiveImage
              src={studioPhoto}
              alt="The Men's Hair To Stay studio in Amersham"
              className="aspect-[4/3] w-full rounded-2xl object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            <figcaption className="mt-4 flex items-start gap-3 rounded-xl border-l-4 border-mhts-red bg-mhts-sand p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mhts-red" aria-hidden="true" />
              <p className="font-body text-sm leading-relaxed text-foreground/80">
                <strong className="text-mhts-ink">Men's Hair To Stay</strong>, 11 Chesham Road,
                Amersham, HP6 5HN. {area.distanceLabel}.
              </p>
            </figcaption>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-mhts-sand py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
              What We Offer
            </p>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Services Available to {area.name} Clients
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((c, i) => {
              const photo = cardPhotoFor(`/${c.slug}`);
              return (
                <Reveal key={c.slug} delay={i * 0.06}>
                  <Link
                    to={`/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-mhts-stone bg-card transition-all hover:-translate-y-1 hover:border-mhts-red hover:shadow-lg"
                  >
                    {photo && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <ResponsiveImage
                          src={photo.src}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="mb-2 text-lg text-mhts-ink">
                        {c.name}
                      </h3>
                      <p className="mb-5 flex-1 font-body text-sm leading-relaxed text-muted-foreground">
                        {c.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-mhts-red-deep transition-all group-hover:gap-2">
                        Learn more <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-card py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="mb-8 max-w-2xl">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
              Local Insight
            </p>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Why {area.name} Clients Choose Us
            </h2>
          </div>
          <div className="grid gap-6 font-body leading-relaxed text-foreground/80 md:grid-cols-2 md:gap-10">
            {area.whyChooseParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? "border-l-4 border-mhts-red pl-5" : "border-l-4 border-mhts-stone pl-5"}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION, on the one dark band */}
      <section className="relative overflow-hidden bg-mhts-deep py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_0%,hsl(var(--mhts-red)/0.2),transparent_70%)]" />
        <div className="container relative mx-auto grid max-w-5xl items-center gap-8 px-4 md:grid-cols-[auto_1fr] md:gap-12">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-mhts-red" aria-hidden="true">
            <ShieldCheck className="h-8 w-8 text-white" />
          </span>
          <div>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light">
              Getting Started
            </p>
            <h2 className="mb-4 text-3xl text-white md:text-4xl">
              Your Free Consultation
            </h2>
            <p className="font-body leading-relaxed text-white/80">{area.consultationParagraph}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mhts-sand py-16 md:py-24">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
              Questions From {area.name}
            </p>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Frequently Asked
            </h2>
          </div>
          <div className="space-y-3">
            {area.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-mhts-stone bg-card p-5 transition-colors open:border-mhts-red md:p-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <span className="font-body font-semibold text-mhts-ink">
                    {f.q}
                  </span>
                  <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-mhts-red transition-transform group-open:rotate-90" aria-hidden="true" />
                </summary>
                <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden bg-mhts-deep py-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl text-white md:text-4xl">
            Book Your Free Consultation from {area.name}
          </h2>
          <p className="mx-auto mb-8 max-w-xl font-body text-white/75">
            Speak to our specialist team at 11 Chesham Road, Amersham, free, confidential and no
            obligation.
          </p>
          <CtaPair size="lg" tone="dark" label="Book Free Consultation" className="justify-center" />
        </div>
      </section>
    </div>
  );
};

export default AreaPage;
