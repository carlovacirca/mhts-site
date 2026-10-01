import { useEffect } from "react";
import { Crosshair, Sparkles, Eye, HeartPulse, CheckCircle, UserCheck, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Crosshair, text: "Specifically targets crown thinning and coverage" },
  { icon: Sparkles, text: "Works with your existing natural hair" },
  { icon: Eye, text: "Immediate improvement in crown coverage" },
  { icon: HeartPulse, text: "Non-surgical with no recovery time" },
  { icon: CheckCircle, text: "Natural-looking results" },
  { icon: UserCheck, text: "Personalized to your exact crown loss pattern" },
  { icon: MapPin, text: "Locally available in Amersham" },
];

const steps = [
  {
    title: "Crown Assessment",
    desc: "Detailed examination of your crown, density and loss pattern.",
  },
  {
    title: "Treatment Plan",
    desc: "Personalized plan targeting your crown coverage requirements.",
  },
  {
    title: "Treatment Session",
    desc: "Crown coverage treatment applied with precision.",
  },
  {
    title: "Review",
    desc: "Results checked and further sessions arranged if needed.",
  },
  {
    title: "Aftercare",
    desc: "Home care guidance to maintain your results.",
  },
];

const faqs = [
  {
    q: "Can crown coverage treatment stop my hair loss progressing?",
    a: "Our treatments focus on enhancing existing coverage rather than halting loss. We will always give you honest guidance on realistic outcomes.",
  },
  {
    q: "How visible are crown coverage results?",
    a: "Most clients see an immediate and significant improvement in crown coverage after their first session.",
  },
  {
    q: "Is treatment available near Chesham and High Wycombe?",
    a: "Yes. Our Amersham studio is easily accessible from Chesham, High Wycombe, Beaconsfield, Rickmansworth and all surrounding areas.",
  },
];

const CrownCoverageTreatmentPage = () => {
  const sub = findSubService("hair-density", "crown-coverage-treatment")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-density/crown-coverage-treatment",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Density", path: "/hair-density" },
      { name: sub.subService.name, path: "/hair-density/crown-coverage-treatment" },
    ]),
  ]);
  useCanonical("/hair-density/crown-coverage-treatment");
  useOpenGraph(
    "Crown Coverage Treatment Amersham | Crown Hair Loss Solutions | Men's Hair To Stay",
    "Crown coverage treatment for men in Amersham. Specialist solutions for crown hair loss and thinning at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Crown Coverage Treatment Amersham | Crown Hair Loss Solutions | Men's Hair To Stay";
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
      "Crown coverage treatment for men in Amersham. Specialist solutions for crown hair loss and thinning at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-density/crown-coverage-treatment"
      category="hair-density"
      subSlug="crown-coverage-treatment"
      hero={{
        back: { to: "/hair-density", label: "Hair Density" },
        title: (
          <>
            Cover Your Crown.<br />
            <span className="text-mhts-red-light">Restore Your Confidence.</span>
          </>
        ),
        lead: (
          <>
            Specialist crown coverage treatment in Amersham, targeted density solutions for the area men worry about most.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Crown Coverage Treatment?</>,
        fact: "Crown hair loss is one of the most common and noticeable forms of hair thinning in men.",
        body: (
          <>
            <p>
            Crown hair loss is one of the most common and noticeable forms of hair thinning
            in men. Our crown coverage treatment is a targeted density solution that addresses
            thinning and loss specifically at the crown, using specialist techniques to restore
            fullness, coverage and a natural appearance in the area that matters most.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we assess your crown in detail, understand your
            current density and deliver a personalized treatment that achieves the best possible
            coverage for your individual situation. Serving men across Chesham, Beaconsfield,
            Rickmansworth, High Wycombe, Gerrards Cross and surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose This Treatment", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "Suitable for early to moderate stages of crown hair loss.",
        body: (
          <>
            <p>
            Men experiencing thinning or balding specifically at the crown who want to restore
            coverage and density to that area. Suitable for early to moderate stages of crown
            hair loss.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Density Services" }}
      cta={{
        title: <>No More Worrying About Your Crown.</>,
        text: <>Book your free crown coverage consultation at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default CrownCoverageTreatmentPage;
