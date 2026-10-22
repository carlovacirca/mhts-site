import { Link } from "react-router-dom";
import { Reveal } from "@/lib/motion";
import { SNAP_BEFORE_FOOTER_CLASS, SNAP_PHONE_CLASS } from "@/lib/sectionSnap";
import BookingStage from "@/components/mhts/BookingStage";
import { requestBooking } from "@/lib/booking";
import { Phone, CalendarCheck } from "lucide-react";
import { useSeo, useJsonLd, breadcrumbSchema } from "@/lib/seo";
import { CallButton } from "@/components/mhts/CtaButtons";
import ServicePricing from "@/components/ServicePricing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    offers: { "@type": "Offer", name: "Regroom (1x Adhesive)", price: "60", priceCurrency: "GBP" },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Regroom (2x Adhesive)",
    serviceType: "Regroom (2x Adhesive)",
    provider: { "@type": "LocalBusiness", name: "Men's Hair To Stay" },
    areaServed: "Amersham",
    offers: { "@type": "Offer", name: "Regroom (2x Adhesive)", price: "65", priceCurrency: "GBP" },
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

  // Every Book button on the page opens the calendar with consent, or takes
  // the reader to the booking stop and its consent face without it.
  const book = (source: "book_prices" | "book_types", serviceUuid?: string) =>
    requestBooking({ source, serviceUuid, stopId: "trafft-booking" });

  const pricingRows = [
    { name: "Regroom (1x Adhesive)", price: "£60", onClick: () => book("book_prices", TRAFFT_REGROOM_1X_SERVICE_UUID) },
    { name: "Regroom (2x Adhesive)", price: "£65", onClick: () => book("book_prices", TRAFFT_REGROOM_2X_SERVICE_UUID) },
    { name: "Initial Consultation", price: "Free", onClick: () => book("book_prices", TRAFFT_CONSULTATION_SERVICE_UUID) },
  ];

  return (
    // Batch 4b. The booking page is a desk, not a brochure: the heading and
    // both ways to book on the dark band, the prices beside their note, the
    // calendar (or its panel when cookies are off) on sand, the five
    // appointment types three across instead of five cramped in a row, and the
    // phone number large on its own band for the reader who would rather call.
    <div className="mhts-theme">
      {/* THE BOOKING STOP, the page's first screen (Carlo, Oct 2026: "the
          booking page needs to shout that there is a booking calendar"). */}
      <BookingStage
        id="trafft-booking"
        className="scroll-mt-24"
        source="book_stop"
        eyebrow="Reserve Your Appointment"
        titleAs="h1"
        longTitle
        title="Book Your Hair Replacement Consultation & Appointment"
        lede="Free consultation, regroom, maintenance or SMP. Pick a time online in about a minute."
      />

      {/* From md up the prices and the appointment types are one stop where
          the window is tall enough (Carlo, Oct 2026: the prices alone were a
          half empty stop); on a short laptop window SnapGuides splits them. */}
      <div className="mhts-snap-desk">
      {/* PRICING */}
      <ServicePricing rows={pricingRows} />

      {/* APPOINTMENT TYPES */}
      <section className="bg-mhts-sand py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* From lg the Book and Call buttons sit beside the heading, so the
              heading, the five types and the buttons are always one stop
              (Carlo, Oct 2026: on a shorter laptop window the heading and the
              buttons each ended up on a stop of their own). */}
          <div className="mx-auto mb-6 max-w-6xl md:mb-8 lg:flex lg:max-w-7xl lg:items-end lg:justify-between lg:gap-10">
            <div>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Appointment Types
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
            <p className="mt-4 max-w-2xl font-body text-foreground/75 md:mt-5">
              From your first free consultation to ongoing hair system
              maintenance and SMP, choose the right appointment for you.
            </p>
            </div>
            <div className="hidden shrink-0 gap-3 lg:flex">
              <button
                onClick={() => book("book_types")}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-mhts-red px-6 py-3 font-body font-semibold tracking-wide text-white transition-colors hover:bg-mhts-red-deep"
              >
                <CalendarCheck className="h-4 w-4" /> Book Free Consultation
              </button>
              <CallButton />
            </div>
          </div>
          {/* All five in one row from lg, so the types are one stop (Carlo,
              Oct 2026: not a row of three and a row of two). On
              a phone the five are a swipeable strip, one card per swipe with
              the next peeking, so the heading, the cards and the buttons are
              one screen. */}
          <div className="mhts-snap-x -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-auto sm:grid sm:max-w-6xl sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5 lg:max-w-7xl lg:grid-cols-5">
            {appointments.map((a, i) => (
              <Reveal
                as="article"
                key={a.title}
                delay={(i % 3) * 0.06}
                className={`flex w-[82%] shrink-0 snap-start snap-always flex-col rounded-xl border bg-card p-6 sm:w-auto lg:p-5 sm:snap-align-none ${a.isFree ? "border-mhts-red border-t-4" : "border-mhts-stone"}`}
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
                <p className="text-foreground/80 font-body text-sm leading-relaxed mt-4 flex-1 lg:mt-3 lg:leading-snug">
                  {a.desc}
                </p>
                <p className="mt-4 border-t border-mhts-stone pt-4 font-body text-xs text-mhts-slate lg:mt-3 lg:pt-3">
                  {a.keywords}
                </p>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row md:mt-8 lg:hidden">
            <button
              onClick={() => book("book_types")}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-mhts-red px-7 py-3.5 font-body font-semibold tracking-wide text-white transition-colors hover:bg-mhts-red-deep"
            >
              <CalendarCheck className="w-4 h-4" /> Book Free Consultation
            </button>
            {/* Call sits beside Book on every call to action on the site. */}
            <CallButton size="lg" />
          </div>
        </div>
      </section>
      </div>

      {/* From md up the questions, "Prefer to call?" and the related links
          are one grouped screen (Carlo, Oct 2026). On a phone this wrapper is
          display: contents. */}
      <div className="mhts-snap-desk">
      {/* Phone: the booking questions and "Prefer to call?" are one screen. */}
      <div className={`${SNAP_PHONE_CLASS} md:contents`}>
      {/* FAQ */}
      <section className="bg-card pb-5 pt-7 md:py-8">
        <div className="container mx-auto grid max-w-6xl gap-6 px-4 md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Booking Questions Answered
            </h2>
            <div className="mt-4 h-1 w-14 rounded-full bg-mhts-red md:mt-5" />
            {/* From lg up "Prefer to call?" sits here, under the heading, not
                as a red band with a screen of its own (Carlo, Oct 2026). */}
            <div className="mt-8 hidden rounded-2xl bg-mhts-red p-6 text-white lg:block">
              <p className="text-2xl font-semibold">Prefer to Call?</p>
              <p className="mt-2 font-body text-sm leading-relaxed text-white/90">
                Speak directly with our team to book your hair replacement
                consultation, regroom or SMP appointment.
              </p>
              <a
                href="tel:07947878087"
                data-cta="call"
                className="mt-5 inline-flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-3 font-body font-semibold tracking-wide text-mhts-red-deep transition-colors hover:bg-mhts-sand"
              >
                <Phone className="h-5 w-5" aria-hidden="true" /> Call 07947 878087
              </a>
            </div>
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
          {/* Phone: one line, not a red band; the bar below also has Call. */}
          <div className="-mt-1 text-center md:hidden">
            <p className="font-body text-sm text-foreground/80">Prefer to call?</p>
            <a
              href="tel:07947878087"
              data-cta="call"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-mhts-red px-5 py-3 font-body font-semibold text-mhts-red-deep"
            >
              <Phone className="h-5 w-5" aria-hidden="true" /> Call 07947 878087
            </a>
          </div>
        </div>
      </section>

      {/* PREFER TO CALL, a tablet only band: from lg up it is in the
          questions' left column, on a phone a line under them. */}
      <section className="hidden bg-mhts-red pb-8 pt-6 md:block md:py-10 lg:hidden">
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
      <section className={`${SNAP_BEFORE_FOOTER_CLASS} bg-mhts-deep py-4 md:py-8`}>
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
    </div>
  );
};

export default BookPage;
