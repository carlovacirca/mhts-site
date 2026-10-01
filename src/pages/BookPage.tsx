import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/lib/motion";
import { SNAP_BEFORE_FOOTER_CLASS, SNAP_PHONE_CLASS } from "@/lib/sectionSnap";
import ResponsiveImage from "@/components/ResponsiveImage";
import consultationRoom from "@/assets/mhts-consultation-room-hero.jpg";
import { Phone, CalendarCheck } from "lucide-react";
import { useSeo, useJsonLd, breadcrumbSchema } from "@/lib/seo";
import { useCookieConsent } from "@/lib/cookieConsent";
import BookingPanel from "@/components/mhts/BookingPanel";
import { CallButton } from "@/components/mhts/CtaButtons";
import ServicePricing from "@/components/ServicePricing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TRAFFT_DEFAULT_SERVICE_UUID = "848c1e33-c5d4-4dc8-a7de-94102b7c344b";
const TRAFFT_REGROOM_1X_SERVICE_UUID = "80fff5ce-ada5-47aa-a44b-d13e553088db";
const TRAFFT_REGROOM_2X_SERVICE_UUID = "d7d8c271-93b9-4fa1-aa0d-c1eb39b41c3f";
const TRAFFT_CONSULTATION_SERVICE_UUID = "21801063-7fb5-47a2-aa5b-39c66bd400fb";

const pricingJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Regroom (1x Adhesive)",
    serviceType: "Regroom (1x Adhesive)",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Regroom (2x Adhesive)",
    serviceType: "Regroom (2x Adhesive)",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Initial Consultation",
    serviceType: "Initial Consultation",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
    offers: { "@type": "Offer", name: "Initial Consultation", price: "0", priceCurrency: "GBP", description: "Free initial consultation" },
  },
];

const appointments = [
  {
    title: "Free Hair Replacement Consultation",
    isFree: true,
    desc: "A confidential, no-obligation consultation with a specialist technician to assess hair loss, discuss hair systems, SMP and thinning hair options, and answer your questions.",
    keywords: "Free consultation · Hair replacement assessment · Specialist advice",
  },
  {
    title: "Regroom Services (Reattachment & Restyle)",
    desc: "Professional hair system reattachment with quick regroom (1x adhesive) or full regroom (2x adhesive), including base clean, fresh adhesive application, and restyle to your preferred look.",
    keywords: "Hair system regroom · Reattachment · Adhesive · Restyle",
  },
  {
    title: "Full Maintenance Package",
    desc: "Complete hair system full maintenance package: deep base clean, full reattachment with two adhesive applications, colour refresh and professional styling for long-lasting wear.",
    keywords: "Hair system maintenance · Base clean · Colour · Styling",
  },
  {
    title: "SMP Treatments (Scalp Micropigmentation)",
    desc: "Full SMP treatment, SMP touch-up sessions and SMP consultations to create realistic hair follicle density for thinning hair, crown coverage, or full scalp micropigmentation.",
    keywords: "Scalp micropigmentation · SMP touch-up · Crown coverage",
  },
  {
    title: "Specialized Treatments",
    desc: "Targeted thinning hair treatments, crown coverage treatments and density treatment consultations designed to address specific hair loss concerns with discreet, natural-looking results.",
    keywords: "Thinning hair · Crown coverage · Density treatment",
  },
];

const faqs = [
  {
    q: "What's the difference between a quick regroom and a full regroom?",
    a: "A quick regroom uses one adhesive application and is ideal for clients with stable hair systems needing a fast refresh. A full regroom uses two adhesive applications with a thorough base clean for maximum hold and longevity, recommended every 4 to 6 weeks for daily wearers.",
  },
  {
    q: "Is scalp micropigmentation (SMP) painful?",
    a: "Most clients describe SMP as a mild, tolerable sensation similar to a light tattoo. We use ultra-fine needles and pause whenever needed. Numbing options can be discussed at your SMP consultation.",
  },
  {
    q: "I'm not sure which service I need, what should I book?",
    a: "Book the free hair replacement consultation. Our specialist will assess your hair loss, explain hair system, SMP, thinning hair and crown coverage options, and recommend the right treatment, with no obligation to proceed.",
  },
  {
    q: "Can I reschedule or cancel my appointment?",
    a: "Yes. You can reschedule or cancel through your booking confirmation email up to 24 hours before your appointment, or call us on 07947 878087 and we'll arrange a new time that suits you.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const BookPage = () => {
  useSeo({
    title: "Book Hair Replacement Appointment | Free Consultation",
    description:
      "Schedule your free hair replacement consultation or maintenance appointment. Hair systems, SMP, thinning hair treatments. Flexible booking in Amersham.",
    canonicalPath: "/book",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Book", path: "/book" },
    ]),
  });

  useJsonLd(pricingJsonLd);
  useJsonLd(faqJsonLd);

  const cookieConsent = useCookieConsent();
  const [serviceUuid, setServiceUuid] = useState(TRAFFT_DEFAULT_SERVICE_UUID);

  useEffect(() => {
    if (cookieConsent !== "accepted") return;
    const script = document.createElement("script");
    script.src = "https://menshairtostay.trafft.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) document.body.removeChild(script);
    };
  }, [cookieConsent, serviceUuid]);

  const scrollToWidget = (uuid: string = TRAFFT_DEFAULT_SERVICE_UUID) => {
    setServiceUuid(uuid);
    document.getElementById("trafft-booking")?.scrollIntoView({ behavior: "smooth" });
  };

  const pricingRows = [
    { name: "Regroom (1x Adhesive)", price: "Quoted at your consultation", onClick: () => scrollToWidget(TRAFFT_REGROOM_1X_SERVICE_UUID) },
    { name: "Regroom (2x Adhesive)", price: "Quoted at your consultation", onClick: () => scrollToWidget(TRAFFT_REGROOM_2X_SERVICE_UUID) },
    { name: "Initial Consultation", price: "Free", onClick: () => scrollToWidget(TRAFFT_CONSULTATION_SERVICE_UUID) },
  ];

  return (
    // Batch 4b. The booking page is a desk, not a brochure: the heading and
    // both ways to book on the dark band, the prices beside their note, the
    // calendar (or its panel when cookies are off) on sand, the five
    // appointment types three across instead of five cramped in a row, and the
    // phone number large on its own band for the reader who would rather call.
    <div className="mhts-theme">
      {/* HERO */}
      <section className="relative overflow-clip bg-mhts-deep py-8 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(60%_90%_at_50%_0%,hsl(var(--mhts-red)/0.25),transparent_70%)]" />
        <div className="mhts-fill-chain container relative mx-auto max-w-3xl px-4 text-center">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">
            Reserve Your Appointment
          </p>
          <h1 className="text-3xl leading-tight text-white md:text-5xl">
            Book Your Hair Replacement Consultation &amp; Appointment
          </h1>
          <div className="mx-auto my-6 h-1 w-14 rounded-full bg-mhts-red" />
          <p className="font-body leading-relaxed text-white/80">
            Schedule a free hair replacement consultation, hair system regroom,
            full maintenance, scalp micropigmentation (SMP) or specialized
            thinning hair and crown coverage treatment with our specialist team
            in Amersham.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => scrollToWidget()}
              className="mhts-shine inline-flex items-center justify-center gap-2 bg-mhts-red text-white font-semibold px-7 py-3.5 rounded-md hover:bg-mhts-red-deep transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4 relative z-[2]" aria-hidden="true" />
              <span className="relative z-[2]">Book free consultation</span>
            </button>
            <CallButton size="lg" tone="dark" />
          </div>
          {/* Phone only: the private room the consultation happens in, filling
              the first screen. */}
          <ResponsiveImage
            src={consultationRoom}
            alt="The private consultation room at the Amersham studio"
            className="mhts-fill mt-8 aspect-[16/10] w-full rounded-2xl object-cover md:hidden"
            sizes="100vw"
          />
        </div>
      </section>

      {/* PRICING */}
      <ServicePricing rows={pricingRows} />

      {/* TRAFFT WIDGET */}
      <section id="trafft-booking" className="scroll-mt-24 border-y border-mhts-stone bg-card py-4 md:py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-5 text-center md:mb-10">
            <span className="mx-auto mb-4 hidden h-12 w-12 place-items-center rounded-full bg-mhts-red text-white md:grid" aria-hidden="true">
              <CalendarCheck className="h-5 w-5" />
            </span>
            <h2 className="text-2xl text-mhts-ink md:text-3xl">
              Choose a Date &amp; Time
            </h2>
            <p className="text-foreground/75 font-body mt-4 max-w-xl mx-auto">
              Select your service and time below to confirm your appointment.
            </p>
          </div>
          {cookieConsent === "accepted" ? (
            <div
              key={serviceUuid}
              className="embedded-booking w-full"
              data-url="https://menshairtostay.trafft.com"
              data-query={`&t=s&uuid=${serviceUuid}`}
              data-lang="en"
              data-autoresize="0"
              data-showsidebar="1"
              data-showservices="0"
              style={{ minWidth: "320px", minHeight: "1000px", width: "100%" }}
            />
          ) : (
            /* Was one line of grey text and a button that read "Enable cookies
               to book online": an empty block where the booking calendar should
               be, on most first visits. The consent rule is unchanged, Trafft
               still loads only after Accept, but the reader now gets a way to
               book either way. See docs/DESIGN-AUDIT.md finding 12. */
            <BookingPanel compact />
          )}
        </div>
      </section>

      {/* APPOINTMENT TYPES */}
      <section className="bg-mhts-sand py-8 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-6 max-w-6xl md:mb-12">
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Appointment Types
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
            <p className="mt-4 max-w-2xl font-body text-foreground/75 md:mt-5">
              From your first free consultation to ongoing hair system
              maintenance and SMP, choose the right appointment for you.
            </p>
          </div>
          {/* Three across at most. Five in a row made each card 200px wide. On
              a phone the five are a swipeable strip, one card per swipe with
              the next peeking, so the heading, the cards and the buttons are
              one screen. */}
          <div className="mhts-snap-x -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5 lg:grid-cols-3">
            {appointments.map((a, i) => (
              <Reveal
                as="article"
                key={a.title}
                delay={(i % 3) * 0.06}
                className={`flex w-[82%] shrink-0 snap-start snap-always flex-col rounded-xl border bg-card p-6 sm:w-auto sm:snap-align-none ${a.isFree ? "border-mhts-red border-t-4" : "border-mhts-stone"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg text-mhts-ink">
                    {a.title}
                  </h3>
                  {a.isFree && (
                    <span className="inline-flex w-fit shrink-0 items-center gap-1 rounded-full bg-mhts-red px-2.5 py-1 font-body text-xs font-semibold uppercase tracking-[0.15em] text-white">
                      Free
                    </span>
                  )}
                </div>
                <p className="text-foreground/80 font-body text-sm leading-relaxed mt-4 flex-1">
                  {a.desc}
                </p>
                <p className="mt-4 border-t border-mhts-stone pt-4 font-body text-xs text-mhts-slate">
                  {a.keywords}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-10">
            <button
              onClick={() => scrollToWidget()}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mhts-red px-7 py-3.5 font-body font-semibold tracking-wide text-white transition-colors hover:bg-mhts-red-deep"
            >
              <CalendarCheck className="w-4 h-4" /> Book Free Consultation
            </button>
            {/* Call sits beside Book on every call to action on the site. */}
            <CallButton size="lg" />
          </div>
        </div>
      </section>

      {/* Phone: the booking questions and "Prefer to call?" are one screen. */}
      <div className={`${SNAP_PHONE_CLASS} md:contents`}>
      {/* FAQ */}
      <section className="bg-card pb-5 pt-7 md:py-20">
        <div className="container mx-auto grid max-w-6xl gap-6 px-4 md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Booking Questions Answered
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
          </div>
          <Accordion type="single" collapsible className="rounded-xl border border-mhts-stone bg-card px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-mhts-ink hover:text-mhts-red-deep">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* PREFER TO CALL */}
      <section className="bg-mhts-red pb-8 pt-6 md:py-16">
        <div className="container mx-auto grid max-w-5xl items-center gap-6 px-4 text-center md:grid-cols-[1fr_auto] md:text-left">
          <div>
            <h2 className="text-3xl text-white md:text-4xl">
              Prefer to Call?
            </h2>
            <p className="mt-4 max-w-xl font-body leading-relaxed text-white">
              Speak directly with our team to book your hair replacement
              consultation, regroom or SMP appointment.
            </p>
          </div>
          <a
            href="tel:07947878087"
            data-cta="call"
            className="inline-flex items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-body text-lg font-semibold tracking-wide text-mhts-red-deep transition-colors hover:bg-mhts-sand"
          >
            <Phone className="h-5 w-5" /> Call 07947 878087
          </a>
        </div>
      </section>
      </div>

      {/* RELATED LINKS. On a phone a line of links that shares the footer's
          screen; from md up the pills, as before. */}
      <section className={`${SNAP_BEFORE_FOOTER_CLASS} bg-mhts-deep py-4 md:py-14`}>
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2 font-body text-xs uppercase tracking-[0.2em] text-white/60 md:mb-5">
            Explore More
          </p>
          <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 font-body text-sm md:gap-3">
            {[
              { to: "/how-it-works", label: "How Hair Replacement Works" },
              { to: "/services", label: "View Our Services" },
              { to: "/gallery", label: "Before & After Gallery" },
              { to: "/faq", label: "Hair Replacement FAQs" },
            ].map((l, i) => (
              <span key={l.to} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden="true" className="text-white/40 md:hidden">·</span>}
                <Link
                  to={l.to}
                  className="text-white/85 underline underline-offset-4 transition-colors hover:border-white hover:text-white md:rounded-full md:border md:border-white/20 md:px-4 md:py-2 md:no-underline"
                >
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;
