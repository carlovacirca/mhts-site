import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronRight,
  CalendarCheck,
  Sparkles,
  Palette,
  ShieldCheck,
  Waves,
  Zap,
  Clock,
  Smile,
  MapPin,
} from "lucide-react";
import { findCategory } from "@/data/services";
import hairSystemsHero from "@/assets/hair-systems-hero.jpg";

const benefits = [
  { icon: Sparkles, text: "100% human hair for a completely natural look and feel" },
  { icon: Palette, text: "Custom matched to your exact colour, texture and density" },
  { icon: ShieldCheck, text: "No surgery, no downtime, no risk" },
  { icon: Waves, text: "Swim, gym and sleep in your system with the right maintenance" },
  { icon: Zap, text: "Immediate results from your very first fitting" },
  { icon: Clock, text: "Long-lasting with regular professional maintenance" },
  { icon: Smile, text: "Confidence-boosting results from day one" },
  { icon: MapPin, text: "Locally available in Amersham with ongoing support" },
];

const steps = [
  {
    title: "Free Consultation",
    desc: "We assess your hair loss, discuss your goals and recommend the right system for you.",
  },
  {
    title: "Custom Design",
    desc: "Your system is matched to your hair colour, density, texture and base size.",
  },
  {
    title: "Fitting Day",
    desc: "Your system is professionally fitted and styled to blend seamlessly with your natural hair.",
  },
  {
    title: "Aftercare Guidance",
    desc: "We walk you through home care and maintenance routines.",
  },
  {
    title: "Ongoing Support",
    desc: "Regular maintenance appointments keep your system looking perfect.",
  },
];

const faqs = [
  {
    q: "Are hair systems noticeable?",
    a: "Modern hair systems are virtually undetectable. Our systems use ultra-thin lace or skin bases that sit flush against your scalp, making them impossible to spot even up close.",
  },
  {
    q: "How long does a hair system last?",
    a: "With professional maintenance, a well-looked-after hair system typically lasts between 3 to 6 months before needing to be replaced.",
  },
  {
    q: "Can I wash and style my hair system normally?",
    a: "Yes. You can wash, style, and even use heat tools on your hair system just like natural hair.",
  },
  {
    q: "Do you serve areas outside Amersham?",
    a: "Yes. We serve clients across Chesham, Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe, Watford, Uxbridge and the surrounding areas.",
  },
  {
    q: "What is the first step?",
    a: "Book a free consultation. We will assess your hair loss, answer all your questions and create a plan tailored to you.",
  },
];

const HairSystemsPage = () => {
  const category = findCategory("hair-systems")!;

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Hair Systems Amersham | Non-Surgical Hair Replacement | Men's Hair to Stay";
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
      "Discover premium hair systems in Amersham. Men's Hair to Stay offers natural-looking, non-surgical hair replacement for men across Amersham, Chesham, Beaconsfield, High Wycombe and surrounding areas."
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
            <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-sm mb-4 font-body">
              Hair Systems
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              Real Hair. Natural Results.<br />
              <span className="font-normal">Zero Surgery.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              Premium hair systems for men in Amersham and across Buckinghamshire.
              Look and feel like yourself again — without going under the knife.
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

      {/* HERO IMAGE */}
      <section className="bg-mhts-light">
        <img
          src={hairSystemsHero}
          alt="Men's Hair to Stay consultation in Amersham"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </section>

      {/* WHAT IS IT */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              About
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              What Is a Hair System?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Hair systems are the most advanced form of non-surgical hair replacement
              available today. Also known as hair pieces or hair units, modern hair
              systems are crafted from real human hair and fitted to a virtually
              undetectable base that sits against your scalp. The result is a full,
              natural head of hair that you can style, wash and live your life in with
              complete confidence.
            </p>
            <p>
              At Men's Hair to Stay, we custom-fit every hair system to your head shape,
              hair colour, texture and density — so no two systems are ever the same.
              Serving men across Amersham, Chesham, Beaconsfield, Rickmansworth,
              Gerrards Cross and High Wycombe, we are the local specialists in hair
              systems that truly look and feel real.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose a Hair System
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
            Hair systems are ideal for men who are experiencing any stage of hair loss —
            from a receding hairline to complete baldness. Whether your hair loss is
            caused by genetics, alopecia, medical treatment or any other reason, a hair
            system can restore your full head of hair without surgery. If you live in or
            around Amersham, Chesham, Beaconsfield, High Wycombe, Rickmansworth,
            Chorleywood, Chalfont St Giles, Chalfont St Peter, Gerrards Cross, Watford
            or Uxbridge and want a permanent non-surgical solution to hair loss, Men's
            Hair to Stay is your local expert.
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
              Hair Systems Services
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {category.subServices.map((sub, i) => (
              <motion.div
                key={sub.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`${
                  i < 3
                    ? "md:col-span-2"
                    : i === 3
                    ? "md:col-span-2 md:col-start-2"
                    : "md:col-span-2 md:col-start-4"
                } lg:col-span-1 lg:col-start-auto`}
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
            Ready to Get Your Hair Back?
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Book your free no-obligation consultation with Men's Hair to Stay in
            Amersham today.
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

export default HairSystemsPage;
