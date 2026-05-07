import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Phone, CalendarCheck, Clock, PoundSterling } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const appointments = [
  {
    title: "Free Hair Replacement Consultation",
    duration: "30 minutes",
    cost: "Free",
    desc: "A confidential, no-obligation consultation with a specialist technician to assess hair loss, discuss hair systems, SMP and thinning hair options, and answer your questions.",
    keywords: "Free consultation · Hair replacement assessment · Specialist advice",
  },
  {
    title: "Regroom Services (Reattachment & Restyle)",
    duration: "60–90 minutes",
    cost: "From £55",
    desc: "Professional hair system reattachment with quick regroom (1x adhesive) or full regroom (2x adhesive), including base clean, fresh adhesive application, and restyle to your preferred look.",
    keywords: "Hair system regroom · Reattachment · Adhesive · Restyle",
  },
  {
    title: "Full Maintenance Package",
    duration: "120 minutes",
    cost: "From £95",
    desc: "Complete hair system full maintenance package: deep base clean, full reattachment with two adhesive applications, colour refresh and professional styling for long-lasting wear.",
    keywords: "Hair system maintenance · Base clean · Colour · Styling",
  },
  {
    title: "SMP Treatments (Scalp Micropigmentation)",
    duration: "2–4 hours per session",
    cost: "From £350 per session",
    desc: "Full SMP treatment, SMP touch-up sessions and SMP consultations to create realistic hair follicle density for thinning hair, crown coverage, or full scalp micropigmentation.",
    keywords: "Scalp micropigmentation · SMP touch-up · Crown coverage",
  },
  {
    title: "Specialized Treatments",
    duration: "60–90 minutes",
    cost: "From £75",
    desc: "Targeted thinning hair treatments, crown coverage treatments and density treatment consultations designed to address specific hair loss concerns with discreet, natural-looking results.",
    keywords: "Thinning hair · Crown coverage · Density treatment",
  },
];

const faqs = [
  {
    q: "How much does a hair replacement appointment cost?",
    a: "Initial hair replacement consultations are completely free. Regroom services start from £55, full maintenance packages from £95, and SMP treatments from £350 per session. Final pricing depends on your hair system, treatment type and time required — confirmed at your free consultation.",
  },
  {
    q: "How long does each appointment take?",
    a: "A free consultation takes around 30 minutes. A standard regroom (reattachment) takes 60–90 minutes. A full maintenance package takes around 2 hours. Scalp micropigmentation (SMP) sessions take 2–4 hours depending on coverage area.",
  },
  {
    q: "What's the difference between a quick regroom and a full regroom?",
    a: "A quick regroom uses one adhesive application and is ideal for clients with stable hair systems needing a fast refresh. A full regroom uses two adhesive applications with a thorough base clean for maximum hold and longevity — recommended every 4–6 weeks for daily wearers.",
  },
  {
    q: "Is scalp micropigmentation (SMP) painful?",
    a: "Most clients describe SMP as a mild, tolerable sensation similar to a light tattoo. We use ultra-fine needles and pause whenever needed. Numbing options can be discussed at your SMP consultation.",
  },
  {
    q: "I'm not sure which service I need — what should I book?",
    a: "Book the free hair replacement consultation. Our specialist will assess your hair loss, explain hair system, SMP, thinning hair and crown coverage options, and recommend the right treatment — with no obligation to proceed.",
  },
  {
    q: "Can I reschedule or cancel my appointment?",
    a: "Yes. You can reschedule or cancel through your booking confirmation email up to 24 hours before your appointment, or call us on 01494 432426 and we'll arrange a new time that suits you.",
  },
];

const BookPage = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Book Hair Replacement Appointment | Free Consultation | Men's Hair To Stay";
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
      "Schedule your free hair replacement consultation or maintenance appointment. Hair systems, SMP, thinning hair treatments. Flexible booking in Amersham."
    );

    const script = document.createElement("script");
    script.src = "https://menshairtostay.trafft.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://menshairtostay.co.uk/" },
        { "@type": "ListItem", position: 2, name: "Book", item: "https://menshairtostay.co.uk/book" },
      ],
    });
    document.head.appendChild(ld);

    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
      if (script.parentNode) document.body.removeChild(script);
      if (ld.parentNode) document.head.removeChild(ld);
    };
  }, []);

  const scrollToWidget = () => {
    document.getElementById("trafft-booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mhts-theme">
      {/* HERO */}
      <section className="bg-mhts-charcoal py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-xs mb-4 font-body">
            Reserve Your Appointment
          </p>
          <h1 className="text-3xl md:text-5xl font-light tracking-wide text-mhts-white leading-tight">
            Book Your Hair Replacement Consultation &amp; Appointment
          </h1>
          <div className="w-12 h-px bg-mhts-white/40 mx-auto my-6" />
          <p className="text-mhts-white/70 font-body leading-relaxed">
            Schedule a free hair replacement consultation, hair system regroom,
            full maintenance, scalp micropigmentation (SMP) or specialized
            thinning hair and crown coverage treatment with our specialist team
            in Amersham.
          </p>
          <div className="mt-8">
            <button
              onClick={scrollToWidget}
              className="inline-flex items-center gap-2 bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Now
            </button>
          </div>
        </div>
      </section>

      {/* TRAFFT WIDGET */}
      <section id="trafft-booking" className="py-16 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl text-mhts-charcoal font-light tracking-wide">
              Choose a Date &amp; Time
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-4" />
            <p className="text-foreground/75 font-body mt-4 max-w-xl mx-auto">
              Select your service and time below to confirm your appointment.
            </p>
          </div>
          <div
            className="embedded-booking w-full"
            data-url="https://menshairtostay.trafft.com"
            data-query="&t=s&uuid=848c1e33-c5d4-4dc8-a7de-94102b7c344b"
            data-lang="en"
            data-autoresize="0"
            data-showsidebar="1"
            data-showservices="0"
            style={{ minWidth: "320px", minHeight: "1000px", width: "100%" }}
          />
        </div>
      </section>

      {/* APPOINTMENT TYPES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Appointment Types
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
            <p className="text-foreground/75 font-body mt-5 max-w-2xl mx-auto">
              From your first free consultation to ongoing hair system
              maintenance and SMP — choose the right appointment for you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {appointments.map((a) => (
              <article
                key={a.title}
                className="bg-card border border-border rounded-sm p-6 flex flex-col"
              >
                <h3 className="text-lg text-mhts-charcoal font-medium tracking-wide">
                  {a.title}
                </h3>
                <div className="flex flex-wrap gap-4 mt-3 text-xs uppercase tracking-[0.15em] text-mhts-slate font-body">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {a.duration}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <PoundSterling className="w-3.5 h-3.5" /> {a.cost}
                  </span>
                </div>
                <p className="text-foreground/80 font-body text-sm leading-relaxed mt-4 flex-1">
                  {a.desc}
                </p>
                <p className="text-mhts-slate text-xs font-body mt-4 pt-4 border-t border-border">
                  {a.keywords}
                </p>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToWidget}
              className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white font-medium px-8 py-3 rounded-sm hover:bg-mhts-navy transition-colors font-body tracking-wide"
            >
              <CalendarCheck className="w-4 h-4" /> Book Your Appointment
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-mhts-light">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
              Booking Questions Answered
            </h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <Accordion type="single" collapsible className="bg-card border border-border rounded-sm px-6">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-left text-mhts-charcoal font-medium tracking-wide">
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
      <section className="py-16">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
            Prefer to Call?
          </h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          <p className="text-foreground/80 font-body mt-5 leading-relaxed">
            Speak directly with our team to book your hair replacement
            consultation, regroom or SMP appointment.
          </p>
          <a
            href="tel:01494432426"
            className="inline-flex items-center gap-2 mt-8 bg-mhts-charcoal text-mhts-white font-medium px-8 py-3 rounded-sm hover:bg-mhts-navy transition-colors font-body tracking-wide"
          >
            <Phone className="w-4 h-4" /> Call 01494 432426
          </a>
        </div>
      </section>

      {/* RELATED LINKS */}
      <section className="py-16 bg-mhts-charcoal">
        <div className="container mx-auto px-4 text-center">
          <p className="text-mhts-white/50 uppercase tracking-[0.2em] text-xs mb-5 font-body">
            Explore More
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-body">
            <Link to="/how-it-works" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
              How Hair Replacement Works
            </Link>
            <Link to="/services" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
              View Our Services
            </Link>
            <Link to="/gallery" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
              Before &amp; After Gallery
            </Link>
            <Link to="/faq" className="text-mhts-white/80 hover:text-mhts-white transition-colors">
              Hair Replacement FAQs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookPage;
