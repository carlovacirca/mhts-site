import { useEffect } from "react";
import { ShieldCheck, PlusCircle, Scissors, Sparkles, CalendarClock, Clock, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: ShieldCheck, text: "Safe, professional adhesive removal" },
  { icon: PlusCircle, text: "Fresh adhesive application for maximum security" },
  { icon: Scissors, text: "Restyling included in every appointment" },
  { icon: Sparkles, text: "Keeps your system looking freshly fitted" },
  { icon: CalendarClock, text: "Recommended every 4 to 6 weeks" },
  { icon: Clock, text: "Quick appointment, typically 60 to 90 minutes" },
  { icon: MapPin, text: "Available from our Amersham studio" },
];

const steps = [
  {
    title: "Safe Removal",
    desc: "System carefully removed using professional solvents.",
  },
  {
    title: "Scalp Prep",
    desc: "Scalp cleaned and prepared for reattachment.",
  },
  {
    title: "Base Check",
    desc: "System base examined for condition and cleaned.",
  },
  {
    title: "Reattachment",
    desc: "Fresh adhesive applied and system securely reattached.",
  },
  {
    title: "Restyle",
    desc: "System washed, conditioned and styled to your preference.",
  },
];

const faqs = [
  {
    q: "How often should I have my system reattached?",
    a: "Every 4 to 6 weeks is standard, though this can vary based on your skin type and lifestyle.",
  },
  {
    q: "Is restyling included?",
    a: "Yes. Every reattachment appointment includes a professional restyle.",
  },
  {
    q: "Can I have my system reattached if it was not fitted by you?",
    a: "Absolutely. We welcome clients whose systems were fitted elsewhere.",
  },
];

const HairSystemReattachmentPage = () => {
  const sub = findSubService("hair-system-maintenance", "hair-system-reattachment-and-restyling")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-system-maintenance/hair-system-reattachment-and-restyling",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair System Maintenance", path: "/hair-system-maintenance" },
      { name: sub.subService.name, path: "/hair-system-maintenance/hair-system-reattachment-and-restyling" },
    ]),
  ]);
  useCanonical("/hair-system-maintenance/hair-system-reattachment-and-restyling");
  useOpenGraph(
    "Hair System Reattachment & Restyling Amersham | Men's Hair To Stay",
    "Professional hair system reattachment and restyling in Amersham. Keep your system secure and sharp at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Reattachment & Restyling Amersham | Men's Hair To Stay";
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
      "Professional hair system reattachment and restyling in Amersham. Keep your system secure and sharp at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-system-maintenance/hair-system-reattachment-and-restyling"
      category="hair-system-maintenance"
      subSlug="hair-system-reattachment-and-restyling"
      hero={{
        back: { to: "/hair-system-maintenance", label: "Hair System Maintenance" },
        title: (
          <>
            Secure. Restyled.<br />
            <span className="text-mhts-red-light">Looking Its Best Again.</span>
          </>
        ),
        lead: (
          <>
            Professional hair system reattachment and restyling in Amersham, quick, expert appointments to keep your system secure and your look sharp.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Reattachment & Restyling?</>,
        fact: "the adhesive bonding your hair system to your scalp naturally breaks down",
        body: (
          <>
            <p>
            Over time, the adhesive bonding your hair system to your scalp naturally breaks down.
            Our reattachment and restyling service removes your system safely, prepares both
            the system base and your scalp, applies fresh adhesive and reattaches your
            system securely, finishing with a professional restyle to make it look
            freshly fitted.
            </p>
            <p>
            Men's Hair To Stay provides hair system reattachment and restyling for clients
            in Amersham and across Chesham, Beaconsfield, Rickmansworth, High Wycombe,
            Gerrards Cross and all surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose This Service", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "Regular reattachment appointments are essential for maintaining the security and appearance of your system.",
        body: (
          <>
            <p>
            Any man wearing a hair system who needs their adhesive refreshed and
            their system reattached professionally. Regular reattachment appointments
            are essential for maintaining the security and appearance of your system.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Maintenance Services" }}
      cta={{
        title: <>Book Your Reattachment Appointment Today.</>,
        text: <>Professional reattachment and restyling at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairSystemReattachmentPage;
