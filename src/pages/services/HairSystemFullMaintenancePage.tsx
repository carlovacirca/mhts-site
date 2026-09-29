import { useEffect } from "react";
import { CalendarCheck, Droplets, ShieldCheck, Anchor, Scissors, CalendarClock, Sparkles, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Droplets, text: "Full base clean and deep treatment" },
  { icon: ShieldCheck, text: "Safe adhesive removal and scalp preparation" },
  { icon: Anchor, text: "Fresh, secure reattachment" },
  { icon: Scissors, text: "Wash, condition and style included" },
  { icon: CalendarClock, text: "Maximum lifespan for your system" },
  { icon: Sparkles, text: "Walk out looking freshly fitted" },
  { icon: CalendarCheck, text: "Everything in one convenient appointment" },
  { icon: MapPin, text: "Available in Amersham" },
];

const included = [
  "Safe system removal",
  "Full base clean and adhesive removal",
  "Scalp clean and preparation",
  "Fresh adhesive application",
  "Professional reattachment",
  "Wash and deep condition",
  "Full professional restyle",
];

const steps = [
  {
    title: "System Removal",
    desc: "Safe and careful removal by our specialists.",
  },
  {
    title: "Full Base Clean",
    desc: "Deep clean to remove all build-up and residue.",
  },
  {
    title: "Scalp Prep",
    desc: "Thorough scalp cleanse and preparation.",
  },
  {
    title: "Fresh Reattachment",
    desc: "New adhesive applied and system securely reattached.",
  },
  {
    title: "Wash, Condition & Restyle",
    desc: "System finished to its very best.",
  },
];

const faqs = [
  {
    q: "What is included in the full maintenance package?",
    a: "Everything, base clean, adhesive removal, scalp prep, fresh reattachment, wash, condition and a full restyle.",
  },
  {
    q: "How long does the full package appointment take?",
    a: "Typically between 90 minutes and 2 hours depending on the system and style.",
  },
  {
    q: "How often should I book the full maintenance package?",
    a: "We recommend the full package every 6 to 8 weeks for optimum system care and appearance.",
  },
  {
    q: "Can I book this for a system fitted elsewhere?",
    a: "Yes. We welcome all hair system clients regardless of where their system was fitted.",
  },
  {
    q: "Is this the best option for long-term system care?",
    a: "Yes. The full maintenance package is the most comprehensive way to protect the lifespan and appearance of your system.",
  },
];

const HairSystemFullMaintenancePage = () => {
  const sub = findSubService("hair-system-maintenance", "hair-system-full-maintenance-package")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-system-maintenance/hair-system-full-maintenance-package",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair System Maintenance", path: "/hair-system-maintenance" },
      { name: sub.subService.name, path: "/hair-system-maintenance/hair-system-full-maintenance-package" },
    ]),
  ]);
  useCanonical("/hair-system-maintenance/hair-system-full-maintenance-package");
  useOpenGraph(
    "Hair System Full Maintenance Package Amersham | Men's Hair To Stay",
    "Complete hair system maintenance package in Amersham. Everything your system needs in one appointment at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Full Maintenance Package Amersham | Men's Hair To Stay";
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
      "Complete hair system maintenance package in Amersham. Everything your system needs in one appointment at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-system-maintenance/hair-system-full-maintenance-package"
      category="hair-system-maintenance"
      subSlug="hair-system-full-maintenance-package"
      hero={{
        back: { to: "/hair-system-maintenance", label: "Hair System Maintenance" },
        title: (
          <>
            Everything Your System Needs.<br />
            <span className="text-mhts-red-light">One Appointment.</span>
          </>
        ),
        lead: (
          <>
            The complete hair system maintenance package at Men's Hair To Stay in Amersham, full care, professional results and a system that always looks its absolute best.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is the Full Maintenance Package?</>,
        fact: "the most comprehensive care option available for your hair system",
        body: (
          <>
            <p>
            Our hair system full maintenance package is the most comprehensive care option
            available for your hair system. In a single appointment, your system receives
            a full base clean, professional adhesive removal, scalp preparation, fresh
            reattachment, a wash and condition, and a complete professional restyle, leaving you walking out looking and feeling as if your system was just
            freshly fitted.
            </p>
            <p>
            It is the all-in-one maintenance solution for men who want to protect
            their investment and maintain the highest standard of appearance.
            Available at Men's Hair To Stay in Amersham, serving clients
            from Chesham, Beaconsfield, Rickmansworth, High Wycombe,
            Gerrards Cross, Watford, Uxbridge and all surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose This Package", title: "The Benefits", items: benefits }}
      included={{ eyebrow: "Inclusions", title: "What's Included", items: included }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "every aspect of their system is looked after in a single, thorough appointment.",
        body: (
          <>
            <p>
            Men who want the complete maintenance experience and maximum care for their
            hair system. The full package is ideal for clients who want to ensure every
            aspect of their system is looked after in a single, thorough appointment.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Maintenance Services" }}
      cta={{
        title: <>The Best Care for Your Most Important Investment.</>,
        text: <>Book your full hair system maintenance package at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairSystemFullMaintenancePage;
