import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import {
  CalendarCheck,
  Palette,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
  Phone,
  Shield,
  Award,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: CalendarCheck,
    title: "Free Initial Consultation and Fitting Assessment",
    desc: "Book a private, confidential consultation with one of our specialist-trained technicians at our Amersham studio. We assess your hair loss, discuss your options (hair systems, SMP, or thinning hair treatments), and create a personalized plan. No obligations, completely confidential.",
  },
  {
    icon: Palette,
    title: "Custom Hair System Design",
    desc: "Every solution is tailored to you. For hair systems, we match your natural hair color, texture, and style for a completely undetectable fit. For SMP (scalp micropigmentation), we design the density and coverage that works for your hair loss pattern. For thinning hair treatments, we create a solution that blends seamlessly with your existing hair.",
  },
  {
    icon: CheckCircle2,
    title: "Professional Hair System Reattachment or SMP Application",
    desc: "Our specialist technicians apply your solution with precision. For hair systems, we reattach your custom system with professional adhesive. For SMP, we apply scalp micropigmentation with realistic hair follicle patterns. You'll walk out with a completely natural look that boosts your confidence immediately.",
  },
  {
    icon: RefreshCw,
    title: "Hair System Maintenance & Professional Regroom Services",
    desc: "Regular hair system maintenance keeps your solution looking perfect. We offer Regroom (1x adhesive) for quick touch-ups, or Regroom (2x adhesive) for a full professional refresh. Services include hair system base clean and reattach, hair system styling, hair system colouring, and our full hair system maintenance package. For SMP, we provide SMP touch-up sessions to maintain density and color.",
  },
];

const whyChoose = [
  "8+ years of specialist expertise in hair systems and SMP",
  "100% confidential service — privacy guaranteed",
  "Specialist-trained technicians in non-surgical hair replacement",
  "By appointment only (private, discreet studio in Amersham)",
  "Free initial consultation and fitting assessment",
  "Proven, natural-looking results",
  "Professional hair system maintenance and aftercare support",
];

const serviceGroups = [
  {
    title: "Hair Replacement Systems",
    items: [
      { label: "Custom hair system fitting", to: "/hair-systems/initial-consultation-and-fitting" },
      { label: "Hair system colouring", to: "/hair-systems/hair-system-colouring" },
      { label: "Hair system styling", to: "/hair-systems/hair-system-styling" },
      { label: "Hair system base clean and reattach", to: "/hair-system-maintenance/hair-system-base-clean-and-reattach" },
      { label: "Full hair system maintenance package", to: "/hair-system-maintenance/hair-system-full-maintenance-package" },
    ],
  },
  {
    title: "Scalp Micropigmentation (SMP)",
    items: [
      { label: "Full SMP treatment", to: "/scalp-micropigmentation/full-smp-treatment" },
      { label: "SMP touch-up sessions", to: "/scalp-micropigmentation/smp-touch-up-session" },
      { label: "SMP consultation", to: "/scalp-micropigmentation/smp-consultation" },
    ],
  },
  {
    title: "Specialized Treatments",
    items: [
      { label: "Thinning hair treatment", to: "/hair-density/thinning-hair-treatment" },
      { label: "Crown coverage treatment", to: "/hair-density/crown-coverage-treatment" },
      { label: "Density treatment consultation", to: "/hair-density/density-treatment-consultation" },
    ],
  },
];

const HowItWorksPage = () => {
  useSeo({
    title: "Hair Replacement Process | 4-Step Hair System & SMP",
    description:
      "Learn our 4-step process for hair systems and SMP. Free initial consultation to professional maintenance. Undetectable results from Amersham specialists.",
    canonicalPath: "/how-it-works",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "How It Works", path: "/how-it-works" },
    ]),
  });

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
            className="max-w-3xl"
          >
            <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">
              The Process
            </p>
            <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
              How Hair Replacement Works:
              <br />
              <span className="font-normal">Our 4-Step Process.</span>
            </h1>
            <p className="text-mhts-white/70 text-lg max-w-2xl mb-10 font-body leading-relaxed">
              Learn how Men's Hair to Stay transforms hair loss with non-surgical
              hair replacement systems and SMP treatments. From your free initial
              consultation to ongoing hair system maintenance, here's exactly how
              our process works.
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

      {/* TRUST STRIP */}
      <section className="py-10 bg-mhts-charcoal border-t border-mhts-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: Shield, label: "100% Confidential" },
              { icon: Award, label: "Specialist Trained" },
              { icon: Clock, label: "By Appointment Only" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-3 text-mhts-white/80">
                <item.icon className="w-5 h-5 text-mhts-white/50" />
                <span className="text-sm tracking-wide font-body">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-STEP TIMELINE */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              Your Journey
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              The 4-Step Process
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 md:gap-8 mb-12 last:mb-0"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-16 h-16 rounded-full bg-mhts-charcoal flex items-center justify-center">
                      <Icon className="w-7 h-7 text-mhts-white" />
                    </div>
                    <span className="mt-3 text-mhts-slate text-xs font-body uppercase tracking-[0.2em]">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-4 min-h-[60px]" />
                    )}
                  </div>
                  <div className="pt-1 pb-8 flex-1">
                    <h3 className="text-xl md:text-2xl text-mhts-charcoal tracking-wide mb-3 font-light">
                      {step.title}
                    </h3>
                    <p className="text-foreground/80 text-base font-body leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-20 bg-mhts-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              The Difference
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Why Choose Men's Hair To Stay for Your Hair Replacement?
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="max-w-3xl mx-auto bg-card rounded-sm p-8 border border-border">
            <ul className="space-y-4">
              {whyChoose.map((item) => (
                <li key={item} className="flex items-start gap-3 font-body text-foreground/80 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-mhts-charcoal shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Our Service Options
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {serviceGroups.map((group, i) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-mhts-light rounded-sm p-7 border border-border h-full"
              >
                <Sparkles className="w-5 h-5 text-mhts-charcoal mb-4" />
                <h3 className="text-lg font-medium text-mhts-charcoal mb-5 tracking-wide">
                  {group.title}
                </h3>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="group inline-flex items-start gap-1.5 text-sm font-body text-foreground/80 hover:text-mhts-charcoal transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 mt-0.5 text-mhts-slate group-hover:text-mhts-charcoal shrink-0 transition-colors" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mhts-charcoal">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl text-mhts-white font-light tracking-wide mb-4">
            Ready to Start Your Hair Replacement Journey?
          </h2>
          <p className="text-mhts-white/70 font-body mb-10 max-w-2xl mx-auto leading-relaxed">
            Book your free initial consultation with our specialist technicians.
            We'll assess your hair loss and discuss your non-surgical hair
            replacement options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/mens-hair-to-stay#mhts-book"
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Your Free Consultation
            </Link>
            <a
              href="tel:07947878087"
              className="inline-flex items-center gap-2 border border-mhts-white/40 text-mhts-white px-8 py-3 rounded-sm hover:border-mhts-white hover:bg-mhts-white/10 transition-colors font-body tracking-wide"
            >
              <Phone className="w-4 h-4" /> Call 07947 878087
            </a>
          </div>

          {/* Related links */}
          <div className="mt-14 pt-10 border-t border-mhts-white/10">
            <p className="text-mhts-white/50 uppercase tracking-[0.2em] text-xs mb-5 font-body">
              Explore More
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-body">
              <Link to="/mens-hair-to-stay#mhts-services" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                View Our Services
              </Link>
              <Link to="/mens-hair-to-stay#mhts-gallery" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                See Hair System & SMP Results
              </Link>
              <Link to="/mens-hair-to-stay#mhts-book" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                Book Your Consultation
              </Link>
              <Link to="/faq" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
                Read Hair Replacement FAQs
              </Link>
            </div>
          </div>

          <p className="text-mhts-white/40 text-xs font-body mt-10 inline-flex items-center gap-2 justify-center">
            <MapPin className="w-3 h-3" /> 11 Chesham Road, Amersham HP6 5HN
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
