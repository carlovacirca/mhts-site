import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  Wallet,
  RotateCcw,
  Smile,
  Palette,
  MapPin,
} from "lucide-react";
import { findCategory } from "@/data/services";
import { useCanonical, useOpenGraph } from "@/lib/seo";

const benefits = [
  { icon: Zap, text: "Immediate results — walk in, walk out with a full head of hair" },
  { icon: ShieldCheck, text: "No surgery, anaesthetic or recovery period" },
  { icon: Sparkles, text: "No scarring or risk of complications" },
  { icon: Wallet, text: "Fraction of the cost of a hair transplant" },
  { icon: RotateCcw, text: "Completely reversible if you change your mind" },
  { icon: Smile, text: "Results that look and feel completely natural" },
  { icon: Palette, text: "Custom matched to your exact colour and texture" },
  { icon: MapPin, text: "Ongoing support from your local Amersham specialists" },
];

const steps = [
  {
    title: "Free Consultation",
    desc: "Discuss your hair loss and goals with our specialist team.",
  },
  {
    title: "System Design",
    desc: "Custom matched to your hair profile — colour, texture and density.",
  },
  {
    title: "Professional Fitting",
    desc: "Seamlessly blended and styled to look completely natural.",
  },
  {
    title: "Aftercare Training",
    desc: "Learn how to care for your system at home for lasting results.",
  },
  {
    title: "Ongoing Maintenance",
    desc: "Regular appointments available to keep your system looking perfect.",
  },
];

const faqs = [
  {
    q: "How is non-surgical hair replacement different from a transplant?",
    a: "A transplant moves your own follicles surgically. Non-surgical replacement uses a custom hair system fitted to your scalp — no surgery, no recovery, immediate results.",
  },
  {
    q: "Will anyone be able to tell I am wearing a hair system?",
    a: "With a professional fit from Men's Hair to Stay, your system is virtually undetectable even up close.",
  },
  {
    q: "Is non-surgical hair replacement permanent?",
    a: "The system itself is long-lasting with maintenance, but it is not a permanent attachment. This also means it is fully reversible, which many clients see as a benefit.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation and we will take it from there.",
  },
];

const NonSurgicalHairReplacementPage = () => {
  const category = findCategory("hair-systems")!;
  useCanonical("/hair-systems/non-surgical-hair-replacement");
  useOpenGraph(
    "Non-Surgical Hair Replacement Amersham | Men's Hair to Stay",
    "Non-surgical hair replacement for men in Amersham. Get a full head of natural hair without surgery or downtime. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Non-Surgical Hair Replacement Amersham | Men's Hair to Stay";
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
      "Non-surgical hair replacement for men in Amersham. Get a full head of natural hair without surgery or downtime. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
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
              to="/hair-systems"
              className="inline-flex items-center gap-1 text-mhts-white/60 hover:text-mhts-white text-sm font-body mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Hair Systems
            </Link>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              All the Hair.<br />
              <span className="font-normal">None of the Surgery.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              Non-surgical hair replacement in Amersham — the safe, effective and
              immediate alternative to hair transplant surgery.
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
              What Is Non-Surgical Hair Replacement?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Non-surgical hair replacement is an umbrella term for all methods of
              restoring a full head of hair without going under the knife. At Men's
              Hair to Stay, our non-surgical approach centres on premium custom hair
              systems — real human hair units, individually matched and professionally
              fitted to give you an undetectable, natural result with zero surgery,
              zero scarring and zero recovery time.
            </p>
            <p>
              For men in Amersham, Chesham, Beaconsfield, Rickmansworth, High Wycombe
              and across Buckinghamshire and Hertfordshire, non-surgical hair
              replacement offers an immediate, life-changing result that surgery simply
              cannot match for speed or accessibility.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose Non-Surgical Replacement
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
            Non-surgical hair replacement is suitable for men at any stage of hair
            loss — from a slightly receding hairline to complete baldness. It is
            particularly popular with men who have been advised they are not suitable
            for a transplant, those who want immediate results, and those who want to
            avoid the risk and cost of surgery. Serving men across Amersham, Chesham,
            Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe, Watford and
            Uxbridge.
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
              More Hair Systems Services
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {category.subServices
              .filter((s) => s.slug !== "non-surgical-hair-replacement")
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
            Your Hair Transformation Starts Here.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your free non-surgical hair replacement consultation in Amersham today.
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

export default NonSurgicalHairReplacementPage;
