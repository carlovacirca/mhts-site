import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  Infinity as InfinityIcon,
  Sparkles,
  Users,
  ShieldCheck,
  Scissors,
  Droplet,
  Zap,
  MapPin,
} from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph } from "@/lib/seo";
import ServicePricing from "@/components/ServicePricing";
import smpHero from "@/assets/smp-hero.jpg";

const pricingRows = [
  { name: "SMP Consultation", price: "Free", note: "No obligation" },
  { name: "Full SMP Treatment", price: "Contact us for pricing" },
  { name: "SMP Touch-Up Session", price: "Contact us for pricing" },
];

const pricingJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "SMP Consultation",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP", description: "Free initial consultation" },
  },
];

const benefits = [
  { icon: InfinityIcon, text: "Permanent solution with minimal top-up maintenance" },
  { icon: Sparkles, text: "Creates a realistic, natural-looking hairline" },
  { icon: Users, text: "Suitable for all skin tones and stages of hair loss" },
  { icon: ShieldCheck, text: "No surgery, no scarring, no recovery time" },
  { icon: Scissors, text: "Covers scars from previous hair transplants" },
  { icon: Droplet, text: "Low daily maintenance — just keep it moisturised" },
  { icon: Zap, text: "Immediate confidence boost after first session" },
  { icon: MapPin, text: "Locally available in Amersham" },
];

const steps = [
  {
    title: "Free SMP Consultation",
    desc: "We discuss your hair loss pattern, desired look and design your hairline together.",
  },
  {
    title: "Session One",
    desc: "Initial pigment is applied across the treatment area at a lighter density.",
  },
  {
    title: "Session Two",
    desc: "Depth and density are built up, refining the hairline and coverage.",
  },
  {
    title: "Session Three (if needed)",
    desc: "Final detailing and perfecting for a flawless result.",
  },
  {
    title: "Aftercare",
    desc: "Simple moisturising routine and sun protection to preserve your results.",
  },
];

const faqs = [
  {
    q: "Does scalp micropigmentation look natural?",
    a: "Yes. When performed by a specialist, SMP creates incredibly realistic follicle impressions that are virtually indistinguishable from real stubble.",
  },
  {
    q: "Is SMP painful?",
    a: "Most clients describe SMP as mildly uncomfortable rather than painful. We take every step to ensure you are comfortable throughout.",
  },
  {
    q: "How long does SMP last?",
    a: "SMP is a long-term solution. Results typically last 3 to 5 years before a light touch-up session is recommended to refresh the pigment.",
  },
  {
    q: "Will it look like a tattoo?",
    a: "No. SMP uses different pigments, needle sizes and techniques to traditional tattooing, producing a natural result that does not fade to blue or green.",
  },
  {
    q: "How many sessions will I need?",
    a: "Most full SMP treatments require 2 to 3 sessions spaced 7 to 14 days apart for the best result.",
  },
  {
    q: "Do you offer SMP near High Wycombe and Chesham?",
    a: "Yes. Our Amersham studio serves clients across High Wycombe, Chesham, Beaconsfield, Rickmansworth, Gerrards Cross and all surrounding areas.",
  },
];

const ScalpMicropigmentationPage = () => {
  const category = findCategory("scalp-micropigmentation")!;

  useJsonLd(pricingJsonLd);
  useCanonical("/scalp-micropigmentation");
  useOpenGraph(
    "Scalp Micropigmentation Amersham | SMP Treatment | Men's Hair to Stay",
    "Expert scalp micropigmentation in Amersham. Men's Hair to Stay provides full SMP treatments, touch-up sessions and consultations for men across Buckinghamshire and Hertfordshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Scalp Micropigmentation Amersham | SMP Treatment | Men's Hair to Stay";
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
      "Expert scalp micropigmentation in Amersham. Men's Hair to Stay provides full SMP treatments, touch-up sessions and consultations for men across Buckinghamshire and Hertfordshire."
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
          src={smpHero}
          alt="Close-up of scalp micropigmentation result showing a defined hairline"
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
              Scalp Micropigmentation
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              The Look of a Fresh Shave.<br />
              <span className="font-normal">Every Single Day.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              Scalp micropigmentation in Amersham — a permanent, low-maintenance
              solution for hair loss that creates the appearance of a full,
              closely-shaved head.
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
              What Is Scalp Micropigmentation?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Scalp micropigmentation, commonly known as SMP, is a specialist
              treatment that uses micro-needles to deposit pigment into the scalp,
              replicating the appearance of hair follicles. The result is a
              realistic, defined hairline and the look of a closely cropped head of
              hair — even on a completely bald scalp.
            </p>
            <p>
              Unlike tattoos, SMP uses specific pigments and techniques designed
              exclusively for the scalp, ensuring a natural result that does not
              turn blue or green over time. At Men's Hair to Stay in Amersham, our
              SMP treatments are tailored to your skin tone, head shape and desired
              hairline — serving clients across Chesham, Beaconsfield,
              Rickmansworth, High Wycombe, Gerrards Cross and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose SMP
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
            SMP is ideal for men who want a permanent, low-maintenance answer to
            hair loss. It suits men who prefer the shaved head look, those who have
            tried other treatments without success, and those looking to cover
            transplant scarring or patchy hair loss. If you are based in Amersham,
            Chesham, Beaconsfield, High Wycombe, Rickmansworth, Chorleywood,
            Chalfont St Giles, Chalfont St Peter, Gerrards Cross, Watford or
            Uxbridge, our specialist SMP clinic is right on your doorstep.
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
              SMP Services
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
            Confident. Sharp. Permanent.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your free SMP consultation at Men's Hair to Stay in Amersham.
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

export default ScalpMicropigmentationPage;
