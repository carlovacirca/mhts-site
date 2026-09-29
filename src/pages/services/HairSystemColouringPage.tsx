import { useEffect } from "react";
import { Palette, Blend, Eye, Sparkles, Clock, UserCheck, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Palette, text: "Precise colour matching to your natural hair" },
  { icon: Blend, text: "Grey blending and tonal variation included" },
  { icon: Eye, text: "Keeps your system looking undetectable" },
  { icon: Sparkles, text: "Available as part of a new fitting or as a standalone service" },
  { icon: Clock, text: "Extends the life and appearance of your system" },
  { icon: UserCheck, text: "Applied by experienced hair system specialists" },
  { icon: MapPin, text: "Available to clients across Amersham and surrounding areas" },
];

const steps = [
  {
    title: "Colour Assessment",
    desc: "We analyze your natural hair colour, including any grey and tonal variation.",
  },
  {
    title: "Colour Mixing",
    desc: "Bespoke colour is mixed to match your exact profile.",
  },
  {
    title: "Application",
    desc: "Colour is applied to your system with precision.",
  },
  {
    title: "Toning & Finishing",
    desc: "Final toning ensures a perfect, seamless match.",
  },
  {
    title: "Review",
    desc: "We check the result against your natural hair in all lighting conditions.",
  },
];

const faqs = [
  {
    q: "Can you match grey hair or mixed tones?",
    a: "Yes. We specialize in blending grey and matching complex, multi-tonal natural hair colours.",
  },
  {
    q: "How often will I need my system colour refreshed?",
    a: "This depends on how your system wears and your personal preference. We typically recommend a colour refresh every 3 to 6 months.",
  },
  {
    q: "Is colouring included in my initial fitting?",
    a: "Yes. Colour matching and application is part of our standard fitting process.",
  },
];

const HairSystemColouringPage = () => {
  const sub = findSubService("hair-systems", "hair-system-colouring")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-systems/hair-system-colouring",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Systems", path: "/hair-systems" },
      { name: sub.subService.name, path: "/hair-systems/hair-system-colouring" },
    ]),
  ]);
  useCanonical("/hair-systems/hair-system-colouring");
  useOpenGraph(
    "Hair System Colouring Amersham | Hair Unit Colour Matching | Men's Hair To Stay",
    "Professional hair system colouring in Amersham. Expert colour matching and toning for hair systems serving men across Chesham, Beaconsfield, High Wycombe and Buckinghamshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Colouring Amersham | Hair Unit Colour Matching | Men's Hair To Stay";
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
      "Professional hair system colouring in Amersham. Expert colour matching and toning for hair systems serving men across Chesham, Beaconsfield, High Wycombe and Buckinghamshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-systems/hair-system-colouring"
      category="hair-systems"
      subSlug="hair-system-colouring"
      hero={{
        back: { to: "/hair-systems", label: "Hair Systems" },
        title: (
          <>
            The Perfect Colour Match.<br />
            <span className="text-mhts-red-light">Every Time.</span>
          </>
        ),
        lead: (
          <>
            Professional hair system colouring in Amersham, expert colour matching, toning and blending so your system looks completely natural against your own hair.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Hair System Colouring?</>,
        fact: "including any grey, highlights or subtle tonal variation",
        body: (
          <>
            <p>
            Getting the colour right is one of the most critical factors in making a
            hair system look completely natural. Our hair system colouring service
            ensures your unit is precisely matched to your natural hair colour, including any grey, highlights or subtle tonal variation, so there is no
            visible difference between your system and your own hair.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we offer professional colouring for new
            systems as part of the initial fitting process, as well as standalone colour
            refresh and toning services for existing systems. Serving clients across
            Chesham, Beaconsfield, Rickmansworth, High Wycombe and surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Professional Colouring", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "blend seamlessly with their natural hair or skin tone",
        body: (
          <>
            <p>
            Men who want their hair system to blend seamlessly with their natural hair
            or skin tone, and those whose system colour has faded and needs refreshing.
            Also ideal for clients who have experienced changes to their natural hair
            colour over time.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Systems Services" }}
      cta={{
        title: <>Colour That Looks Completely Natural.</>,
        text: <>Book your hair system colouring appointment at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairSystemColouringPage;
