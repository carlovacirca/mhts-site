import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  ArrowLeft,
  Route,
  MessageCircle,
  Palette,
  UserCheck,
  HeartHandshake,
  Clock,
  MapPin,
  Award,
} from "lucide-react";
import { findCategory } from "@/data/services";
import hairReplacementImage from "@/assets/mhts-hair-replacement-consultation.jpg";

const benefits = [
  { icon: Route, text: "Complete end-to-end hair replacement service" },
  { icon: MessageCircle, text: "Expert consultation included at no charge" },
  { icon: Palette, text: "Fully customised system matched to your profile" },
  { icon: UserCheck, text: "Professional fitting by trained specialists" },
  { icon: HeartHandshake, text: "Aftercare and maintenance support included" },
  { icon: Clock, text: "Flexible ongoing maintenance appointments" },
  { icon: MapPin, text: "Local service based in Amersham" },
  { icon: Award, text: "Trusted by men across Buckinghamshire and Hertfordshire" },
];

const steps = [
  {
    title: "Free Consultation",
    desc: "Hair loss assessment and goal setting with our specialist team.",
  },
  {
    title: "System Selection",
    desc: "We source and customise your perfect system matched to you.",
  },
  {
    title: "Fitting Appointment",
    desc: "Professional fitting and styling session for a seamless result.",
  },
  {
    title: "Aftercare Briefing",
    desc: "Full guidance on home care and maintenance to protect your investment.",
  },
  {
    title: "Ongoing Support",
    desc: "We are here for every maintenance appointment after your fitting.",
  },
];

const faqs = [
  {
    q: "Is the consultation really free?",
    a: "Yes, completely. No pressure, no obligation — just an honest conversation about your options.",
  },
  {
    q: "How long does the full process take from consultation to fitting?",
    a: "From your consultation to your fitting day is typically 2 to 4 weeks, depending on system customisation requirements.",
  },
  {
    q: "Do you offer a service for clients who already have a hair system?",
    a: "Yes. We can take over the maintenance and care of systems fitted elsewhere.",
  },
  {
    q: "Which areas do you cover?",
    a: "We are based in Amersham and serve clients from Chesham, Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe, Chorleywood, Chalfont St Giles, Watford, Uxbridge and surrounding areas.",
  },
];

const HairReplacementServicePage = () => {
  const category = findCategory("hair-systems")!;

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair Replacement Service Amersham | Men's Hair to Stay";
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
      "Professional hair replacement service for men in Amersham. Custom hair systems fitted by specialists serving Chesham, Beaconsfield, High Wycombe, Rickmansworth and surrounding areas."
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
              Your Complete Hair<br />
              <span className="font-normal">Replacement Service in Amersham.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              From consultation to fitting to aftercare — Men's Hair to Stay provides
              a full end-to-end hair replacement service for men across Buckinghamshire
              and Hertfordshire.
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
          <div className="max-w-4xl mx-auto aspect-[16/7] rounded-sm overflow-hidden bg-card">
            <img
              src={hairReplacementImage}
              alt="Hair replacement consultation at Men's Hair to Stay Amersham"
              className="w-full h-full object-cover"
              loading="lazy"
            />
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
              What Is the Hair Replacement Service?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              Our hair replacement service covers the complete journey from your very
              first consultation through to your fitting and beyond. We handle every
              detail — assessing your hair loss, sourcing and customising your system,
              professionally fitting it and providing ongoing aftercare and maintenance
              support.
            </p>
            <p>
              Men's Hair to Stay is Amersham's dedicated hair replacement specialists,
              serving clients across Chesham, Beaconsfield, Rickmansworth, Chorleywood,
              Gerrards Cross, High Wycombe, Watford and Uxbridge with a personalised,
              expert service from start to finish.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose Our Service
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
            Any man experiencing hair loss who wants a complete, managed solution from
            a trusted local specialist. Whether you are new to hair systems or looking
            to switch providers, our hair replacement service gives you everything you
            need under one roof.
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
              .filter((s) => s.slug !== "hair-replacement-service")
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
            A Service Built Around You.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Start your hair replacement journey with a free consultation at Men's Hair to Stay, Amersham.
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

export default HairReplacementServicePage;
