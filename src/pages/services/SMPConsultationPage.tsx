import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  ArrowLeft,
  MessageCircle,
  Search,
  Compass,
  HeartHandshake,
  HelpCircle,
  ShieldCheck,
  MapPin,
} from "lucide-react";
import { findCategory } from "@/data/services";
import { useCanonical, useOpenGraph } from "@/lib/seo";

const benefits = [
  { icon: MessageCircle, text: "Completely free with no obligation" },
  { icon: Search, text: "Expert scalp and hair loss assessment" },
  { icon: Compass, text: "Hairline design discussion included" },
  { icon: HeartHandshake, text: "Honest advice on whether SMP is right for you" },
  { icon: HelpCircle, text: "All questions answered by a specialist" },
  { icon: ShieldCheck, text: "Relaxed, private and welcoming environment" },
  { icon: MapPin, text: "Easy access from across Buckinghamshire and Hertfordshire" },
];

const steps = [
  {
    title: "Welcome",
    desc: "A relaxed, private appointment with no pressure.",
  },
  {
    title: "Scalp Assessment",
    desc: "We assess your scalp condition and hair loss pattern.",
  },
  {
    title: "Treatment Discussion",
    desc: "We explain the SMP process in full detail.",
  },
  {
    title: "Hairline Design",
    desc: "We map out a proposed hairline design together.",
  },
  {
    title: "Q&A",
    desc: "All your questions answered honestly and thoroughly.",
  },
];

const faqs = [
  {
    q: "Is the SMP consultation genuinely free?",
    a: "Yes. There is no cost and no obligation whatsoever.",
  },
  {
    q: "How long does the consultation take?",
    a: "Approximately 30 to 45 minutes.",
  },
  {
    q: "What if I decide SMP is not for me?",
    a: "That is absolutely fine. We will suggest alternatives that may better suit your needs and goals.",
  },
  {
    q: "Do I need to prepare anything beforehand?",
    a: "No preparation is needed. Just come along with your questions and we will handle the rest.",
  },
];

const SMPConsultationPage = () => {
  const category = findCategory("scalp-micropigmentation")!;
  useCanonical("/scalp-micropigmentation/smp-consultation");
  useOpenGraph(
    "SMP Consultation Amersham | Free Scalp Micropigmentation Consultation | Men's Hair to Stay",
    "Free SMP consultation in Amersham. Discuss your scalp micropigmentation options with the specialists at Men's Hair to Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "SMP Consultation Amersham | Free Scalp Micropigmentation Consultation | Men's Hair to Stay";
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
      "Free SMP consultation in Amersham. Discuss your scalp micropigmentation options with the specialists at Men's Hair to Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
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
              to="/scalp-micropigmentation"
              className="inline-flex items-center gap-1 text-mhts-white/60 hover:text-mhts-white text-sm font-body mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Scalp Micropigmentation
            </Link>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              Find Out If SMP Is<br />
              <span className="font-normal">Right for You.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              A free, no-obligation SMP consultation at Men's Hair to Stay in
              Amersham — honest advice, expert assessment and a clear plan with no
              pressure.
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
              What Is the SMP Consultation?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Your SMP consultation is a dedicated appointment with one of our scalp
              micropigmentation specialists. We assess your scalp, discuss your hair
              loss pattern and talk through what SMP can realistically achieve for you.
              We also design your hairline together, discuss pigment options and ensure
              you have all the information you need to make the right decision.
            </p>
            <p>
              There is absolutely no obligation to proceed and no cost for the
              consultation. Men's Hair to Stay in Amersham provides free SMP
              consultations for men across Chesham, Beaconsfield, Rickmansworth, High
              Wycombe, Gerrards Cross and all surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Book a Consultation
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
            Any man curious about scalp micropigmentation who wants to understand the
            process, assess suitability and make an informed decision before committing.
            The consultation is the ideal starting point.
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

      {/* OTHER SUB-SERVICES */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Related
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              More SMP Services
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {category.subServices
              .filter((s) => s.slug !== "smp-consultation")
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
            Your Questions Answered. No Pressure. No Cost.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your free SMP consultation at Men's Hair to Stay in Amersham today.
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

export default SMPConsultationPage;
