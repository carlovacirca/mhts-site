import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, CalendarCheck } from "lucide-react";
import { findCategory } from "@/data/services";

const placeholderBullets = [
  "Add your key benefit or feature here",
  "Describe what makes this service stand out",
  "Highlight expertise, materials or technique",
  "Mention longevity, comfort or natural look",
];

const placeholderSteps = [
  { title: "Consultation", desc: "Placeholder description for the consultation step. Replace with your own copy." },
  { title: "Design & Plan", desc: "Placeholder description for the design and planning step." },
  { title: "Treatment / Fitting", desc: "Placeholder description for the treatment or fitting step." },
  { title: "Aftercare", desc: "Placeholder description for the aftercare and follow-up step." },
];

const ServiceCategoryPage = () => {
  const { category: categorySlug } = useParams();
  const category = categorySlug ? findCategory(categorySlug) : undefined;
  if (!category) return <Navigate to="/" replace />;

  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative min-h-[55vh] flex items-center bg-mhts-charcoal overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-charcoal via-mhts-charcoal/95 to-mhts-charcoal/80" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-sm mb-4 font-body">
              {category.tagline}
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              {category.name}
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              {category.intro}
            </p>
            <Link
              to="/mens-hair-to-stay#mhts-book"
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book a Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* IMAGE SLOT */}
      <section className="py-12 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto aspect-[16/7] border border-dashed border-mhts-slate/40 rounded-sm flex items-center justify-center bg-card">
            <span className="text-mhts-slate text-sm font-body uppercase tracking-[0.2em]">Image slot</span>
          </div>
        </div>
      </section>

      {/* OVERVIEW BULLETS */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Overview</p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">What's Included</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <ul className="space-y-3">
            {placeholderBullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-foreground/80 font-body">
                <CheckCircle2 className="w-5 h-5 text-mhts-charcoal shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SUB-SERVICES */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Explore</p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">{category.name} Services</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {category.subServices.map((sub, i) => (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={`/${category.slug}/${sub.slug}`}
                  className="group block bg-card rounded-sm p-7 border border-border hover:border-mhts-slate/40 transition-colors h-full"
                >
                  <h3 className="text-lg font-medium text-mhts-charcoal mb-3 tracking-wide">{sub.name}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5">{sub.blurb}</p>
                  <span className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body group-hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Your Journey</p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">How It Works</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="max-w-3xl mx-auto">
            {placeholderSteps.map((step, i) => (
              <div key={step.title} className="flex gap-6 mb-10 last:mb-0">
                <div className="shrink-0 w-14 h-14 rounded-full border-2 border-mhts-charcoal flex items-center justify-center">
                  <span className="text-mhts-charcoal font-body text-sm font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg text-mhts-charcoal tracking-wide mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">{step.desc}</p>
                  {i < placeholderSteps.length - 1 && <div className="w-px h-8 bg-border mt-4" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-mhts-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl text-mhts-white font-light tracking-wide mb-4">
            Ready to take the next step?
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book a free, no-obligation consultation with our specialist team in Amersham.
          </p>
          <Link
            to="/mens-hair-to-stay#mhts-book"
            className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
          >
            <CalendarCheck className="w-4 h-4" /> Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceCategoryPage;
