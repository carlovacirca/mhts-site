import { useEffect } from "react";
import { Droplets, RefreshCw, CalendarClock, Anchor, Sparkles, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Droplets, text: "Thorough removal of adhesive and product build-up" },
  { icon: RefreshCw, text: "Restores base condition and integrity" },
  { icon: CalendarClock, text: "Extends the lifespan of your system" },
  { icon: Anchor, text: "Improves adhesive bond and security after reattachment" },
  { icon: Sparkles, text: "Keeps your system looking and feeling fresh" },
  { icon: MapPin, text: "Available in Amersham with easy access from surrounding areas" },
];

const steps = [
  {
    title: "System Removal",
    desc: "Safe removal using professional solvents.",
  },
  {
    title: "Base Soak & Clean",
    desc: "Deep clean of the system base to remove all adhesive and build-up.",
  },
  {
    title: "Scalp Preparation",
    desc: "Thorough scalp clean and preparation.",
  },
  {
    title: "Base Inspection",
    desc: "Condition of the base assessed and noted.",
  },
  {
    title: "Reattachment",
    desc: "Fresh adhesive applied and system professionally reattached.",
  },
];

const faqs = [
  {
    q: "How is this different from a standard reattachment?",
    a: "A base clean and reattach includes a thorough deep clean of your system base to remove all adhesive residue and product build-up, not just a standard surface clean.",
  },
  {
    q: "How often should I book a base clean?",
    a: "We recommend a full base clean every 6 to 8 weeks as part of a regular maintenance routine.",
  },
  {
    q: "Will it damage my system?",
    a: "No. We use professional products specifically designed to clean system bases without causing damage.",
  },
];

const HairSystemBaseCleanPage = () => {
  const sub = findSubService("hair-system-maintenance", "hair-system-base-clean-and-reattach")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-system-maintenance/hair-system-base-clean-and-reattach",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair System Maintenance", path: "/hair-system-maintenance" },
      { name: sub.subService.name, path: "/hair-system-maintenance/hair-system-base-clean-and-reattach" },
    ]),
  ]);
  useCanonical("/hair-system-maintenance/hair-system-base-clean-and-reattach");
  useOpenGraph(
    "Hair System Base Clean & Reattach Amersham | Men's Hair To Stay",
    "Professional hair system base cleaning and reattachment in Amersham at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding Buckinghamshire areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Base Clean & Reattach Amersham | Men's Hair To Stay";
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
      "Professional hair system base cleaning and reattachment in Amersham at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding Buckinghamshire areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-system-maintenance/hair-system-base-clean-and-reattach"
      category="hair-system-maintenance"
      subSlug="hair-system-base-clean-and-reattach"
      hero={{
        back: { to: "/hair-system-maintenance", label: "Hair System Maintenance" },
        title: (
          <>
            Deep Clean. Fresh Start.<br />
            <span className="text-mhts-red-light">Perfect Reattach.</span>
          </>
        ),
        lead: (
          <>
            Professional hair system base cleaning and reattachment in Amersham, a thorough service that removes build-up, restores your base and reattaches your system to perfection.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Base Clean & Reattach?</>,
        fact: "goes deeper than a standard reattachment",
        body: (
          <>
            <p>
            Over time, adhesive residue, product build-up and natural oils accumulate
            on your hair system base, which can affect both the look and longevity
            of your system. Our base clean and reattach service goes deeper than
            a standard reattachment, thoroughly cleaning and restoring your system
            base before professionally reattaching it for a fresh, secure and natural-looking result.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we recommend a base clean and reattach
            as part of a regular maintenance routine for all hair system clients
            across Chesham, Beaconsfield, Rickmansworth, High Wycombe and surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose This Service", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "a deeper level of maintenance for their hair system",
        body: (
          <>
            <p>
            Men who want a deeper level of maintenance for their hair system, particularly those who
            have noticed adhesive build-up, a compromised bond or reduced freshness in their system.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Maintenance Services" }}
      cta={{
        title: <>Give Your System the Deep Clean It Deserves.</>,
        text: <>Book your base clean and reattach appointment at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairSystemBaseCleanPage;
