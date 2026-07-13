import { useParams, Navigate, Link } from "react-router-dom";
import { CalendarCheck, ChevronRight, MapPin, Phone, ShieldCheck } from "lucide-react";
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

  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center bg-mhts-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-charcoal via-mhts-charcoal/95 to-mhts-charcoal/80" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl">
            <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-sm mb-4 font-body">
              {area.distanceLabel}
            </p>
            <h1 className="text-3xl md:text-5xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              {area.h1}
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              {area.heroSubheading}
            </p>
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Your Nearest Specialist
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Hair Replacement Near {area.name}
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            {area.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex items-start gap-3 bg-mhts-light border border-border rounded-sm p-5">
            <MapPin className="w-5 h-5 text-mhts-charcoal shrink-0 mt-0.5" />
            <p className="text-sm text-foreground/80 font-body leading-relaxed">
              <strong className="text-mhts-charcoal">Men's Hair To Stay</strong> — 11 Chesham Road,
              Amersham, HP6 5HN. {area.distanceLabel}.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Services Available to {area.name} Clients
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {serviceCategories.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}`}
                className="group block bg-card rounded-sm p-6 border border-border hover:border-mhts-slate/40 transition-colors h-full"
              >
                <h3 className="text-lg font-medium text-mhts-charcoal mb-3 tracking-wide">
                  {c.name}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5">
                  {c.tagline}
                </p>
                <span className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Local Insight
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Why {area.name} Clients Choose Us
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            {area.whyChooseParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTATION */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Getting Started
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Your Free Consultation
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="bg-card border border-border rounded-sm p-8">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="w-6 h-6 text-mhts-charcoal shrink-0" />
              <p className="text-foreground/80 font-body leading-relaxed">{area.consultationParagraph}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Questions From {area.name}
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Frequently Asked
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-4">
            {area.faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-card border border-border rounded-sm p-6 open:border-mhts-slate/40 transition-colors"
              >
                <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                  <span className="text-mhts-charcoal font-medium tracking-wide font-body">
                    {f.q}
                  </span>
                  <ChevronRight className="w-5 h-5 text-mhts-slate shrink-0 mt-0.5 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground text-sm font-body leading-relaxed mt-4">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-mhts-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-mhts-white font-light tracking-wide mb-4">
            Book Your Free Consultation from {area.name}
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Speak to our specialist team at 11 Chesham Road, Amersham — free, confidential and no
            obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Free Consultation
            </Link>
            <a
              href="tel:07947878087"
              className="inline-flex items-center gap-2 border border-mhts-white/40 text-mhts-white px-8 py-3 rounded-sm hover:border-mhts-white hover:bg-mhts-white/10 transition-colors font-body tracking-wide"
            >
              <Phone className="w-4 h-4" /> Call 07947 878087
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AreaPage;
