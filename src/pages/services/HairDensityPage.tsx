import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  Leaf,
  Crosshair,
  ShieldCheck,
  Sparkles,
  UserCog,
  Activity,
  Zap,
  MapPin,
} from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph } from "@/lib/seo";
import ServicePricing from "@/components/ServicePricing";
import hairDensityHero from "@/assets/hair-density-hero.jpg";

const pricingRows = [
  { name: "Density Treatment Consultation", price: "Free", note: "No obligation" },
  { name: "Thinning Hair Treatment", price: "Contact us for pricing" },
  { name: "Crown Coverage Treatment", price: "Contact us for pricing" },
];

const pricingJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Density Treatment Consultation",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", description: "Free initial consultation" },
  },
];

const benefits = [
  { icon: Leaf, text: "Works with your existing natural hair" },
  { icon: Crosshair, text: "Targeted treatment for thinning and crown loss" },
  { icon: ShieldCheck, text: "No surgery or lengthy recovery" },
  { icon: Sparkles, text: "Natural-looking fullness and volume" },
  { icon: UserCog, text: "Personalised to your exact hair loss pattern" },
  { icon: Activity, text: "Suitable for early to moderate stages of hair loss" },
  { icon: Zap, text: "Immediate visible improvement" },
  { icon: MapPin, text: "Ongoing support from local Amersham specialists" },
];

const steps = [
  {
    title: "Density Treatment Consultation",
    desc: "We assess your scalp, hair density and loss pattern in detail.",
  },
  {
    title: "Treatment Plan",
    desc: "A personalised plan is created targeting your specific areas of concern.",
  },
  {
    title: "Treatment Session",
    desc: "Your chosen density treatment is carried out by our specialist team.",
  },
  {
    title: "Review",
    desc: "We assess results and determine whether further sessions or complementary treatments are needed.",
  },
  {
    title: "Aftercare",
    desc: "Guidance on home care to maintain and support your results.",
  },
];

const faqs = [
  {
    q: "What is the difference between hair density treatment and a hair system?",
    a: "A hair system replaces hair entirely. A density treatment enhances and works with the natural hair you already have, adding fullness and coverage without replacement.",
  },
  {
    q: "Is hair density treatment suitable for me?",
    a: "It is most effective for men in the early to moderate stages of hair loss who still have a reasonable amount of natural hair to work with.",
  },
  {
    q: "How quickly will I see results?",
    a: "Many clients notice an immediate difference after their first treatment session.",
  },
  {
    q: "Do I need multiple sessions?",
    a: "This depends on the degree of thinning. We will outline a full treatment plan during your free consultation.",
  },
  {
    q: "Do you serve men outside Amersham?",
    a: "Yes. We welcome clients from Chesham, Beaconsfield, High Wycombe, Rickmansworth, Gerrards Cross, Watford, Uxbridge and all nearby areas.",
  },
];

const HairDensityPage = () => {
  const category = findCategory("hair-density")!;

  useJsonLd(pricingJsonLd);
  useCanonical("/hair-density");
  useOpenGraph(
    "Hair Density Treatment Amersham | Thinning Hair Solutions | Men's Hair to Stay",
    "Struggling with thinning hair? Men's Hair to Stay in Amersham offers specialist hair density treatments for men including crown coverage and thinning hair solutions across Buckinghamshire and Hertfordshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Hair Density Treatment Amersham | Thinning Hair Solutions | Men's Hair to Stay";
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
      "Struggling with thinning hair? Men's Hair to Stay in Amersham offers specialist hair density treatments for men including crown coverage and thinning hair solutions across Buckinghamshire and Hertfordshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center bg-mhts-charcoal overflow-hidden">
        <img
          src={hairDensityHero}
          alt="Close-up of natural-looking hair density result"
          className="absolute inset-0 w-full h-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-charcoal/85 via-mhts-charcoal/60 to-transparent" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-sm mb-4 font-body">
              Hair Density
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              Thicker Hair. Fuller Coverage.<br />
              <span className="font-normal">Real Confidence.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              Specialist hair density treatments for men in Amersham — targeted
              solutions for thinning hair, crown coverage and everything in between.
            </p>
            <Link
              to="/#mhts-book"
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <ServicePricing rows={pricingRows} />

      {/* WHAT IS IT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              About
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              What Is Hair Density Treatment?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Hair density treatments are specialist solutions designed for men who
              still have natural hair but are experiencing thinning, reduced volume
              or patchy coverage — particularly around the crown. Rather than
              replacing your hair entirely, density treatments work with what you
              have, enhancing fullness and coverage for a natural, thicker result.
            </p>
            <p>
              At Men's Hair to Stay in Amersham, we assess your individual hair
              loss pattern and recommend the most effective density solution —
              whether that is a targeted thinning hair treatment, crown coverage or
              a full density consultation to map out your options. We serve men
              across Amersham, Chesham, Beaconsfield, Rickmansworth, Gerrards Cross
              and High Wycombe.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose Density Treatment
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              The Benefits
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b.text}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-sm p-6 border border-border hover:border-mhts-slate/40 transition-colors"
              >
                <b.icon className="w-6 h-6 text-mhts-charcoal mb-4" />
                <p className="text-sm text-foreground/80 font-body leading-relaxed">
                  {b.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Suitability
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Who It's For
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <p className="text-foreground/80 font-body leading-relaxed">
            Hair density treatments are ideal for men who are in the early to
            moderate stages of hair loss — particularly those noticing thinning at
            the crown, a widening parting or reduced volume overall. If you are not
            yet ready for a full hair system or SMP but want to address your
            thinning hair now, a density treatment is the perfect starting point.
            Available to men across Amersham, Chesham, High Wycombe, Rickmansworth,
            Beaconsfield, Chorleywood, Chalfont St Giles, Gerrards Cross, Watford
            and Uxbridge.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              What to Expect
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="max-w-3xl mx-auto">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 mb-10 last:mb-0"
              >
                <div className="shrink-0 w-14 h-14 rounded-full border-2 border-mhts-charcoal flex items-center justify-center bg-card">
                  <span className="text-mhts-charcoal font-body text-sm font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="text-lg text-mhts-charcoal tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed">
                    {step.desc}
                  </p>
                  {i < steps.length - 1 && <div className="w-px h-8 bg-border mt-4" />}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SUB-SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Hair Density Services
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                  className="group block bg-mhts-light rounded-sm p-7 border border-border hover:border-mhts-slate/40 transition-colors h-full"
                >
                  <h3 className="text-lg font-medium text-mhts-charcoal mb-3 tracking-wide">
                    {sub.name}
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed mb-5">
                    {sub.blurb}
                  </p>
                  <span className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body group-hover:gap-2 transition-all">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Questions
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Frequently Asked
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-4">
            {faqs.map((f) => (
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
            Stop Hiding Your Hair. Start Loving It.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your free hair density consultation at Men's Hair to Stay in
            Amersham.
          </p>
          <Link
            to="/#mhts-book"
            className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
          >
            <CalendarCheck className="w-4 h-4" /> Book Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HairDensityPage;
