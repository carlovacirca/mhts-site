import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  ArrowLeft,
  Palette,
  Blend,
  Eye,
  Sparkles,
  Clock,
  UserCheck,
  MapPin,
} from "lucide-react";
import { findCategory } from "@/data/services";

const benefits = [
  { icon: Palette, text: "Precise colour matching to your natural hair" },
  { icon: Blend, text: "Grey blending and tonal variation included" },
  { icon: Eye, text: "Keeps your system looking undetectable" },
  { icon: Sparkles, text: "Available as part of a new fitting or as a standalone service" },
  { icon: Clock, text: "Extends the life and appearance of your system" },
  { icon: UserCheck, text: "Applied by experienced hair system specialists" },
  { icon: MapPin, text: "Available to clients across Amersham and surrounding areas" },
];

const steps = [
  {
    title: "Colour Assessment",
    desc: "We analyse your natural hair colour, including any grey and tonal variation.",
  },
  {
    title: "Colour Mixing",
    desc: "Bespoke colour is mixed to match your exact profile.",
  },
  {
    title: "Application",
    desc: "Colour is applied to your system with precision.",
  },
  {
    title: "Toning & Finishing",
    desc: "Final toning ensures a perfect, seamless match.",
  },
  {
    title: "Review",
    desc: "We check the result against your natural hair in all lighting conditions.",
  },
];

const faqs = [
  {
    q: "Can you match grey hair or mixed tones?",
    a: "Yes. We specialise in blending grey and matching complex, multi-tonal natural hair colours.",
  },
  {
    q: "How often will I need my system colour refreshed?",
    a: "This depends on how your system wears and your personal preference. We typically recommend a colour refresh every 3 to 6 months.",
  },
  {
    q: "Is colouring included in my initial fitting?",
    a: "Yes. Colour matching and application is part of our standard fitting process.",
  },
];

const HairSystemColouringPage = () => {
  const category = findCategory("hair-systems")!;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Colouring Amersham | Hair Unit Colour Matching | Men's Hair to Stay";
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
      "Professional hair system colouring in Amersham. Expert colour matching and toning for hair systems serving men across Chesham, Beaconsfield, High Wycombe and Buckinghamshire."
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
              The Perfect Colour Match.<br />
              <span className="font-normal">Every Time.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              Professional hair system colouring in Amersham — expert colour matching,
              toning and blending so your system looks completely natural against your
              own hair.
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
            <span className="text-mhts-slate text-sm font-body uppercase tracking-[0.2em]">
              Image slot
            </span>
          </div>
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
              What Is Hair System Colouring?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Getting the colour right is one of the most critical factors in making a
              hair system look completely natural. Our hair system colouring service
              ensures your unit is precisely matched to your natural hair colour —
              including any grey, highlights or subtle tonal variation — so there is no
              visible difference between your system and your own hair.
            </p>
            <p>
              At Men's Hair to Stay in Amersham, we offer professional colouring for new
              systems as part of the initial fitting process, as well as standalone colour
              refresh and toning services for existing systems. Serving clients across
              Chesham, Beaconsfield, Rickmansworth, High Wycombe and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose Professional Colouring
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
            Men who want their hair system to blend seamlessly with their natural hair
            or skin tone, and those whose system colour has faded and needs refreshing.
            Also ideal for clients who have experienced changes to their natural hair
            colour over time.
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
              .filter((s) => s.slug !== "hair-system-colouring")
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
            Colour That Looks Completely Natural.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your hair system colouring appointment at Men's Hair to Stay in Amersham.
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

export default HairSystemColouringPage;
