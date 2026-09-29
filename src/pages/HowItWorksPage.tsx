import { Link } from "react-router-dom";
import { Reveal } from "@/lib/motion";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { SNAP_PHONE_CLASS, SNAP_STOP_CLASS, SNAP_STOP_EACH_CLASS } from "@/lib/sectionSnap";
import ResponsiveImage from "@/components/ResponsiveImage";
import consultationRoom from "@/assets/mhts-consultation-room-hero.jpg";
import baseMaterials from "@/assets/mhts-hair-system-base-materials-hero.jpg";
import hairline from "@/assets/mhts-hair-system-hairline-hero.jpg";
import maintenanceWork from "@/assets/mhts-hair-system-maintenance-hero.jpg";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import {
  CalendarCheck,
  Palette,
  CheckCircle2,
  RefreshCw,
  ChevronRight,
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

// One photograph per step, all the studio's own.
const stepPhotos = [
  { src: consultationRoom, alt: "The private consultation room at the Amersham studio" },
  { src: baseMaterials, alt: "Hair system bases and hair samples used to design a custom system" },
  { src: hairline, alt: "A natural hairline on a professionally fitted hair system" },
  { src: maintenanceWork, alt: "A hair system base being cleaned during a maintenance appointment" },
];

const whyChoose = [
  "8+ years of specialist expertise in hair systems and SMP",
  "100% confidential service, privacy guaranteed",
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

  // Batch 4b. The process page gets its own shape: a red rail down the middle
  // of the page with the four steps hung off it, photograph on one side and
  // words on the other, swapping sides as the reader goes down. On a phone the
  // rail moves to the left edge and the photographs sit above each step. The
  // rail fills in as each step arrives. Nothing on the page was reworded.
  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative overflow-hidden bg-mhts-deep">
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_90%_10%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
        <div className="container relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.24em] text-mhts-red-light">
              The Process
            </p>
            <h1 className="mb-4 text-4xl leading-tight text-white md:mb-6 md:text-6xl">
              How Hair Replacement Works:
              <br />
              <span className="text-mhts-red-light">Our 4-Step Process.</span>
            </h1>
            <p className="mb-6 max-w-2xl font-body text-base leading-relaxed text-white/80 md:mb-8 md:text-lg">
              Learn how Men's Hair To Stay transforms hair loss with non-surgical
              hair replacement systems and SMP treatments. From your free initial
              consultation to ongoing hair system maintenance, here's exactly how
              our process works.
            </p>
            {/* Call sits beside Book on every call to action on the site. */}
            <CtaPair size="lg" tone="dark" href="/#mhts-book" />
          </div>

          {/* TRUST STRIP, now chips on the same band */}
          <ul className="mt-6 flex flex-wrap gap-2 md:mt-10 md:gap-2.5">
            {[
              { icon: Shield, label: "100% Confidential" },
              { icon: Award, label: "Specialist Trained" },
              { icon: Clock, label: "By Appointment Only" },
            ].map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-2 pl-2 pr-4 text-white/85"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-mhts-red-light/15">
                  <item.icon className="h-4 w-4 text-mhts-red-light" aria-hidden="true" />
                </span>
                <span className="font-body text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4-STEP TIMELINE */}
      <section className="bg-card py-8 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
              Your Journey
            </p>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              The 4-Step Process
            </h2>
          </div>

          <ol className="relative">
            {/* The rail. Left edge on a phone, the middle from md up. */}
            <span className="absolute bottom-0 left-6 top-0 w-0.5 bg-mhts-stone md:left-1/2 md:-translate-x-1/2" aria-hidden="true" />
            {steps.map((step, i) => {
              const Icon = step.icon;
              const photo = stepPhotos[i];
              const flip = i % 2 === 1;
              return (
                // Phone: the heading and step one are a screen, then each
                // step after it a screen of its own.
                <li key={step.title} className={`relative grid gap-4 pb-6 pl-16 last:pb-0 md:grid-cols-2 md:gap-20 md:pb-14 md:pl-0 ${i > 0 ? SNAP_PHONE_CLASS : ""}`}>
                  {/* The node on the rail */}
                  <span className="absolute left-6 top-0 z-[1] -translate-x-1/2 md:left-1/2" aria-hidden="true">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-mhts-red text-white ring-8 ring-card">
                      <Icon className="h-5 w-5" />
                    </span>
                  </span>
                  <Reveal as="figure" from={flip ? "right" : "left"} className={flip ? "md:order-2" : ""}>
                    <ResponsiveImage
                      src={photo.src}
                      alt={photo.alt}
                      className="aspect-[2/1] w-full rounded-2xl object-cover md:aspect-[16/10]"
                      sizes="(max-width: 768px) 100vw, 520px"
                    />
                  </Reveal>
                  <Reveal from={flip ? "left" : "right"} className={flip ? "md:order-1 md:text-right" : ""}>
                    <span className="mb-2 block font-body text-xs font-semibold uppercase tracking-[0.2em] text-mhts-red-deep">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mb-3 text-xl text-mhts-ink md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-snug text-foreground/80 md:text-base md:leading-relaxed">
                      {step.desc}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* WHY CHOOSE, on the dark band */}
      <section className="relative overflow-hidden bg-mhts-deep py-8 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_0%_100%,hsl(var(--mhts-red)/0.2),transparent_70%)]" />
        <div className="container relative mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-light">
              The Difference
            </p>
            <h2 className="text-3xl text-white md:text-4xl">
              Why Choose Men's Hair To Stay for Your Hair Replacement?
            </h2>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 md:gap-y-4">
            {whyChoose.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 0.04} className={`flex items-start gap-3 font-body leading-snug text-white/85 md:leading-relaxed ${i === 3 ? SNAP_STOP_CLASS : ""}`}>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-mhts-red-light" aria-hidden="true" />
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICE OPTIONS */}
      <section className="bg-mhts-sand py-8 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10">
            <p className="mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
              What We Offer
            </p>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Our Service Options
            </h2>
          </div>
          <div className={`grid grid-cols-1 gap-5 md:grid-cols-3 ${SNAP_STOP_EACH_CLASS}`}>
            {serviceGroups.map((group, i) => (
              <Reveal
                key={group.title}
                delay={i * 0.08}
                className="h-full rounded-xl border border-mhts-stone bg-card p-7"
              >
                <span className="mb-4 grid h-10 w-10 place-items-center rounded-full bg-mhts-red-tint">
                  <Sparkles className="h-5 w-5 text-mhts-red" aria-hidden="true" />
                </span>
                <h3 className="mb-5 text-lg text-mhts-ink">
                  {group.title}
                </h3>
                <ul className="divide-y divide-mhts-stone/60">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="group flex items-center justify-between gap-2 py-2.5 font-body text-sm text-foreground/80 transition-colors hover:text-mhts-red-deep"
                      >
                        <span>{item.label}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-mhts-red transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-mhts-deep py-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl text-white md:text-4xl">
            Ready to Start Your Hair Replacement Journey?
          </h2>
          <p className="mx-auto mb-6 max-w-2xl font-body leading-relaxed text-white/75 md:mb-10">
            Book your free initial consultation with our specialist technicians.
            We'll assess your hair loss and discuss your non-surgical hair
            replacement options.
          </p>
          <CtaPair size="lg" tone="dark" href="/#mhts-book" className="justify-center" />

          {/* Related links */}
          <div className="mt-8 border-t border-white/10 pt-6 md:mt-14 md:pt-10">
            <p className="mb-5 font-body text-xs uppercase tracking-[0.2em] text-white/60">
              Explore More
            </p>
            <div className="flex flex-wrap justify-center gap-3 font-body text-sm">
              {[
                { to: "/#mhts-services", label: "View Our Services" },
                { to: "/#mhts-gallery", label: "See Hair System & SMP Results" },
                { to: "/#mhts-book", label: "Book Your Consultation" },
                { to: "/faq", label: "Read Hair Replacement FAQs" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-full border border-white/20 px-4 py-2 text-white/85 transition-colors hover:border-white hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-10 inline-flex items-center justify-center gap-2 font-body text-xs text-white/60">
            <MapPin className="h-3 w-3" aria-hidden="true" /> 11 Chesham Road, Amersham HP6 5HN
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
