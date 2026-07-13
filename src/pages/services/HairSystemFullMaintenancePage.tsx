import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  ArrowLeft,
  Droplets,
  ShieldCheck,
  Anchor,
  Scissors,
  CalendarClock,
  Sparkles,
  MapPin,
  Check,
} from "lucide-react";
import { findCategory } from "@/data/services";
import { useCanonical, useOpenGraph } from "@/lib/seo";

const benefits = [
  { icon: Droplets, text: "Full base clean and deep treatment" },
  { icon: ShieldCheck, text: "Safe adhesive removal and scalp preparation" },
  { icon: Anchor, text: "Fresh, secure reattachment" },
  { icon: Scissors, text: "Wash, condition and style included" },
  { icon: CalendarClock, text: "Maximum lifespan for your system" },
  { icon: Sparkles, text: "Walk out looking freshly fitted" },
  { icon: CalendarCheck, text: "Everything in one convenient appointment" },
  { icon: MapPin, text: "Available in Amersham" },
];

const included = [
  "Safe system removal",
  "Full base clean and adhesive removal",
  "Scalp clean and preparation",
  "Fresh adhesive application",
  "Professional reattachment",
  "Wash and deep condition",
  "Full professional restyle",
];

const steps = [
  {
    title: "System Removal",
    desc: "Safe and careful removal by our specialists.",
  },
  {
    title: "Full Base Clean",
    desc: "Deep clean to remove all build-up and residue.",
  },
  {
    title: "Scalp Prep",
    desc: "Thorough scalp cleanse and preparation.",
  },
  {
    title: "Fresh Reattachment",
    desc: "New adhesive applied and system securely reattached.",
  },
  {
    title: "Wash, Condition & Restyle",
    desc: "System finished to its very best.",
  },
];

const faqs = [
  {
    q: "What is included in the full maintenance package?",
    a: "Everything — base clean, adhesive removal, scalp prep, fresh reattachment, wash, condition and a full restyle.",
  },
  {
    q: "How long does the full package appointment take?",
    a: "Typically between 90 minutes and 2 hours depending on the system and style.",
  },
  {
    q: "How often should I book the full maintenance package?",
    a: "We recommend the full package every 6 to 8 weeks for optimum system care and appearance.",
  },
  {
    q: "Can I book this for a system fitted elsewhere?",
    a: "Yes. We welcome all hair system clients regardless of where their system was fitted.",
  },
  {
    q: "Is this the best option for long-term system care?",
    a: "Yes. The full maintenance package is the most comprehensive way to protect the lifespan and appearance of your system.",
  },
];

const HairSystemFullMaintenancePage = () => {
  const category = findCategory("hair-system-maintenance")!;
  useCanonical("/hair-system-maintenance/hair-system-full-maintenance-package");
  useOpenGraph(
    "Hair System Full Maintenance Package Amersham | Men's Hair to Stay",
    "Complete hair system maintenance package in Amersham. Everything your system needs in one appointment at Men's Hair to Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Full Maintenance Package Amersham | Men's Hair to Stay";
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
      "Complete hair system maintenance package in Amersham. Everything your system needs in one appointment at Men's Hair to Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
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
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-charcoal via-mhts-charcoal/95 to-mhts-charcoal/80" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Link
              to="/hair-system-maintenance"
              className="inline-flex items-center gap-1 text-mhts-white/60 hover:text-mhts-white text-sm font-body mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Hair System Maintenance
            </Link>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              Everything Your System Needs.<br />
              <span className="font-normal">One Appointment.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              The complete hair system maintenance package at Men's Hair to Stay in Amersham —
              full care, professional results and a system that always looks its absolute best.
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

      {/* WHAT IS IT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              About
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              What Is the Full Maintenance Package?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Our hair system full maintenance package is the most comprehensive care option
              available for your hair system. In a single appointment, your system receives
              a full base clean, professional adhesive removal, scalp preparation, fresh
              reattachment, a wash and condition, and a complete professional restyle —
              leaving you walking out looking and feeling as if your system was just
              freshly fitted.
            </p>
            <p>
              It is the all-in-one maintenance solution for men who want to protect
              their investment and maintain the highest standard of appearance.
              Available at Men's Hair to Stay in Amersham, serving clients
              from Chesham, Beaconsfield, Rickmansworth, High Wycombe,
              Gerrards Cross, Watford, Uxbridge and all surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose This Package
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

      {/* WHAT IS INCLUDED */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Inclusions
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              What's Included
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 bg-mhts-light rounded-sm p-5 border border-border"
              >
                <Check className="w-5 h-5 text-mhts-charcoal shrink-0 mt-0.5" />
                <span className="text-foreground/80 font-body text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="py-20 bg-mhts-light">
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
            Men who want the complete maintenance experience and maximum care for their
            hair system. The full package is ideal for clients who want to ensure every
            aspect of their system is looked after in a single, thorough appointment.
          </p>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="py-20">
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

      {/* OTHER SUB-SERVICES */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Related
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              More Maintenance Services
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {category.subServices
              .filter((s) => s.slug !== "hair-system-full-maintenance-package")
              .map((sub, i) => (
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
      <section className="py-20">
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
            The Best Care for Your Most Important Investment.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your full hair system maintenance package at Men's Hair to Stay in Amersham.
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

export default HairSystemFullMaintenancePage;
