import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  CalendarCheck,
  Clock,
  Sparkles,
  ShieldCheck,
  Droplet,
  Scissors,
  MapPin,
  Users,
} from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph } from "@/lib/seo";
import ServicePricing from "@/components/ServicePricing";
import hairSystemMaintenanceHero from "@/assets/hair-system-maintenance-hero.jpg";

const pricingRows = [
  { name: "Hair System Reattachment & Restyling", price: "£60", note: "Regroom · 1x adhesive" },
  { name: "Hair System Base Clean & Reattach", price: "£65", note: "Regroom · 2x adhesive, includes base clean" },
  { name: "Hair System Full Maintenance Package", price: "Contact us for pricing" },
];

const pricingJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hair System Reattachment & Restyling (Regroom, 1x Adhesive)",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
    offers: { "@type": "Offer", price: "60", priceCurrency: "GBP" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Hair System Base Clean & Reattach (Regroom, 2x Adhesive)",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
    offers: { "@type": "Offer", price: "65", priceCurrency: "GBP" },
  },
];

const benefits = [
  { icon: Clock, text: "Extends the lifespan of your hair system" },
  { icon: Sparkles, text: "Keeps your system looking freshly fitted" },
  { icon: ShieldCheck, text: "Professional adhesive removal and reapplication" },
  { icon: Droplet, text: "Deep cleaning to remove product and adhesive build-up" },
  { icon: Scissors, text: "Restyling to keep your look sharp and current" },
  { icon: CalendarCheck, text: "Regular appointments available to suit your schedule" },
  { icon: MapPin, text: "Locally based in Amersham for convenience" },
  { icon: Users, text: "Expert care from your original fitting specialists" },
];

const steps = [
  {
    title: "Assessment",
    desc: "We check the condition of your system, adhesive and base at every visit.",
  },
  {
    title: "Safe Removal",
    desc: "Your system is carefully removed using professional-grade adhesive solvents.",
  },
  {
    title: "Base Clean",
    desc: "The system base and your scalp are thoroughly cleaned and prepared.",
  },
  {
    title: "Reattachment",
    desc: "Fresh adhesive is applied and your system is professionally reattached.",
  },
  {
    title: "Restyle",
    desc: "Your system is washed, conditioned and styled to look its absolute best.",
  },
];

const faqs = [
  {
    q: "How often should I have my hair system maintained?",
    a: "We recommend a professional maintenance appointment every 4 to 6 weeks to keep your system secure, clean and looking its best.",
  },
  {
    q: "Can you maintain a system that was not fitted by you?",
    a: "Yes. We are happy to take on maintenance for systems fitted elsewhere and will always treat your system with the same level of care.",
  },
  {
    q: "What happens if I skip maintenance appointments?",
    a: "Adhesive breaks down over time, which can cause your system to lift, look unnatural or even become damaged. Regular maintenance protects your investment.",
  },
  {
    q: "Do you offer maintenance packages?",
    a: "Yes. Our Hair System Full Maintenance Package covers everything your system needs in a single comprehensive appointment.",
  },
  {
    q: "How long does a maintenance appointment take?",
    a: "A standard maintenance appointment typically takes between 60 and 90 minutes depending on the services required.",
  },
];

const HairSystemMaintenancePage = () => {
  const category = findCategory("hair-system-maintenance")!;

  useJsonLd(pricingJsonLd);
  useCanonical("/hair-system-maintenance");
  useOpenGraph(
    "Hair System Maintenance Amersham | Hair System Aftercare | Men's Hair to Stay",
    "Professional hair system maintenance in Amersham. Men's Hair to Stay offers reattachment, base cleans and full maintenance packages to keep your hair system looking perfect. Serving Buckinghamshire and Hertfordshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Hair System Maintenance Amersham | Hair System Aftercare | Men's Hair to Stay";
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
      "Professional hair system maintenance in Amersham. Men's Hair to Stay offers reattachment, base cleans and full maintenance packages to keep your hair system looking perfect. Serving Buckinghamshire and Hertfordshire."
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
          src={hairSystemMaintenanceHero}
          alt="Stylist performing hair system maintenance on a client"
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
              Hair System Maintenance
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              Keep Your System Looking<br />
              <span className="font-normal">Its Best.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-xl mb-10 font-body">
              Professional hair system maintenance in Amersham — reattachment,
              cleaning, restyling and full maintenance packages to protect your
              investment.
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
              What Is Hair System Maintenance?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="space-y-6 text-foreground/80 font-body leading-relaxed">
            <p>
              A hair system is an investment — and like any investment, it needs
              regular professional care to perform at its best. Hair system
              maintenance covers everything from reattachment and restyling through
              to deep base cleans and full maintenance packages that keep your
              system looking freshly fitted at all times.
            </p>
            <p>
              At Men's Hair to Stay in Amersham, we offer a complete range of
              maintenance services to suit every client and every system. Whether
              you need a quick reattach, a thorough base clean or a comprehensive
              maintenance session, our team keeps your hair system in perfect
              condition — serving clients across Chesham, Beaconsfield,
              Rickmansworth, High Wycombe, Gerrards Cross and surrounding areas.
            </p>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Why Choose Professional Maintenance
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
            Hair system maintenance is essential for every man wearing a hair
            system. Whether you had your system fitted with us or elsewhere, our
            Amersham maintenance team will care for it professionally and keep it
            performing at its best. We recommend maintenance appointments every 4
            to 6 weeks depending on your system type and lifestyle. Available to
            clients across Amersham, Chesham, Beaconsfield, High Wycombe,
            Rickmansworth, Chorleywood, Chalfont St Giles, Chalfont St Peter,
            Gerrards Cross, Watford and Uxbridge.
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
              Maintenance Services
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
            Protect Your Investment. Book a Maintenance Appointment.
          </h2>
          <p className="text-mhts-white/70 font-body mb-8 max-w-xl mx-auto">
            Professional hair system maintenance at Men's Hair to Stay in
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

export default HairSystemMaintenancePage;