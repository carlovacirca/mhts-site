import { useEffect } from "react";
import { Scissors, Merge, Sparkles, RefreshCw, Flame, BookOpen, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Scissors, text: "Expert cutting and styling to suit your face shape" },
  { icon: Merge, text: "Blended with your natural hair for a seamless finish" },
  { icon: Sparkles, text: "Styling included with every fitting and maintenance appointment" },
  { icon: RefreshCw, text: "Available as a standalone styling refresh" },
  { icon: Flame, text: "Heat styling and finishing available" },
  { icon: BookOpen, text: "Advice on home styling between appointments" },
  { icon: MapPin, text: "Local to Amersham, serving the wider Buckinghamshire area" },
];

const steps = [
  {
    title: "Style Consultation",
    desc: "We discuss your preferred style and what works for your face shape.",
  },
  {
    title: "Cutting & Blending",
    desc: "Your system is cut and blended with your natural hairline.",
  },
  {
    title: "Styling",
    desc: "Finished with professional products to achieve your desired look.",
  },
  {
    title: "Home Care Advice",
    desc: "We show you how to maintain your style at home.",
  },
];

const faqs = [
  {
    q: "Can I choose my own hairstyle?",
    a: "Absolutely. We work to your brief and advise on what will look most natural given your hair system and natural hairline.",
  },
  {
    q: "Is styling included in maintenance appointments?",
    a: "Yes. A style refresh is included in all of our maintenance appointments.",
  },
  {
    q: "Can I have a different style each visit?",
    a: "Yes. We are happy to adjust and refresh your style at any appointment.",
  },
];

const HairSystemStylingPage = () => {
  const sub = findSubService("hair-systems", "hair-system-styling")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-systems/hair-system-styling",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Systems", path: "/hair-systems" },
      { name: sub.subService.name, path: "/hair-systems/hair-system-styling" },
    ]),
  ]);
  useCanonical("/hair-systems/hair-system-styling");
  useOpenGraph(
    "Hair System Styling Amersham | Hair Unit Styling Service | Men's Hair To Stay",
    "Professional hair system styling in Amersham. Get the cut, style and finish you want from Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding Buckinghamshire areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Styling Amersham | Hair Unit Styling Service | Men's Hair To Stay";
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
      "Professional hair system styling in Amersham. Get the cut, style and finish you want from Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding Buckinghamshire areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-systems/hair-system-styling"
      category="hair-systems"
      subSlug="hair-system-styling"
      hero={{
        back: { to: "/hair-systems", label: "Hair Systems" },
        title: (
          <>
            Styled to Suit You.<br />
            <span className="text-mhts-red-light">Cut to Perfection.</span>
          </>
        ),
        lead: (
          <>
            Professional hair system styling in Amersham, expert cutting, styling and finishing so your system looks exactly the way you want it.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Hair System Styling?</>,
        fact: "A great hair system is only as good as the styling that goes with it.",
        body: (
          <>
            <p>
            A great hair system is only as good as the styling that goes with it.
            Our hair system styling service ensures your unit is cut, shaped and
            finished to suit your face shape, personal style and the way your hair
            naturally grows, creating a result that is entirely your own.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, styling is available as part of your
            initial fitting, as a maintenance add-on or as a standalone appointment
            whenever you want to refresh your look. We serve clients across Chesham,
            Beaconsfield, Rickmansworth, High Wycombe, Gerrards Cross and surrounding
            areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Professional Styling", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "Every man wearing a hair system.",
        body: (
          <>
            <p>
            Every man wearing a hair system. Whether you are being fitted for the
            first time or want to refresh your style at a maintenance visit,
            professional styling ensures your system always looks sharp and intentional.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Systems Services" }}
      cta={{
        title: <>Look Sharp. Feel Confident.</>,
        text: <>Book your hair system styling appointment at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairSystemStylingPage;
