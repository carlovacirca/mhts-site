import { useEffect } from "react";
import { Sparkles, Crosshair, ShieldCheck, Layers, Eye, Scissors, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Sparkles, text: "Creates the look of natural hair follicles" },
  { icon: Crosshair, text: "Defines a sharp, tailored hairline" },
  { icon: Layers, text: "Adds the appearance of fuller density" },
  { icon: Eye, text: "Conceals scars, scalp marks and patches" },
  { icon: ShieldCheck, text: "Non-surgical with no downtime" },
  { icon: Scissors, text: "Suits shaved, buzzed and short styles" },
  { icon: MapPin, text: "Local to Amersham" },
];

const steps = [
  {
    title: "Consultation",
    desc: "We discuss your goals, assess your scalp and design a treatment plan tailored to you.",
  },
  {
    title: "Hairline Design",
    desc: "Together we agree on the perfect hairline shape, density and pigment depth.",
  },
  {
    title: "Session One",
    desc: "The first layer of pigment is applied, building a soft foundation across the treatment area.",
  },
  {
    title: "Session Two",
    desc: "Density is built up, the hairline is refined and any uneven areas are corrected.",
  },
  {
    title: "Session Three",
    desc: "Final pigment depth is added, edges are sharpened and the look is fully defined.",
  },
  {
    title: "Aftercare",
    desc: "Simple aftercare guidance to protect your results and keep your SMP looking its best.",
  },
];

const faqs = [
  {
    q: "How many sessions does a full SMP treatment take?",
    a: "A full SMP treatment is typically completed across 2 to 3 sessions, spaced a couple of weeks apart to allow the scalp to settle between visits.",
  },
  {
    q: "Is the treatment painful?",
    a: "Most clients describe SMP as mildly uncomfortable rather than painful. Sensation varies depending on the area being treated and individual tolerance.",
  },
  {
    q: "How long do the results last?",
    a: "Full SMP results typically last between 3 and 5 years before a touch-up is needed, depending on skin type, lifestyle and sun exposure.",
  },
  {
    q: "Is treatment available near Chesham and High Wycombe?",
    a: "Yes. Our Amersham studio is easily accessible from Chesham, High Wycombe, Beaconsfield, Rickmansworth and surrounding areas.",
  },
];

const FullSMPTreatmentPage = () => {
  const sub = findSubService("scalp-micropigmentation", "full-smp-treatment")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/scalp-micropigmentation/full-smp-treatment",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Scalp Micropigmentation", path: "/scalp-micropigmentation" },
      { name: sub.subService.name, path: "/scalp-micropigmentation/full-smp-treatment" },
    ]),
  ]);
  useCanonical("/scalp-micropigmentation/full-smp-treatment");
  useOpenGraph(
    "Full SMP Treatment Amersham | Scalp Micropigmentation | Men's Hair To Stay",
    "Full scalp micropigmentation treatment in Amersham. A complete multi-session SMP programme at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Full SMP Treatment Amersham | Scalp Micropigmentation | Men's Hair To Stay";
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
      "Full scalp micropigmentation treatment in Amersham. A complete multi-session SMP programme at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/scalp-micropigmentation/full-smp-treatment"
      category="scalp-micropigmentation"
      subSlug="full-smp-treatment"
      hero={{
        back: { to: "/scalp-micropigmentation", label: "Scalp Micropigmentation" },
        title: (
          <>
            A Complete SMP Programme.<br />
            <span className="text-mhts-red-light">Defined. Natural. Yours.</span>
          </>
        ),
        lead: (
          <>
            Full scalp micropigmentation treatment in Amersham, a complete multi-session programme designed to recreate the look of natural hair follicles and a sharp, tailored hairline.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Full SMP Treatment?</>,
        fact: "delivered across multiple sessions to build depth, density and a defined hairline gradually",
        body: (
          <>
            <p>
            Scalp micropigmentation is a non-surgical treatment that uses
            specialist pigment to replicate the appearance of natural hair
            follicles on the scalp. A full SMP treatment is delivered across
            multiple sessions to build depth, density and a defined hairline
            gradually, creating a result that looks completely natural.
            </p>
            <p>
            Whether you're concealing thinning, hiding scars or shaping a
            clean, modern shaved style, full SMP gives you a finish that's
            sharp, low-maintenance and built around you. Men's Hair To Stay
            offers full SMP treatment in Amersham, serving clients across
            Chesham, Beaconsfield, High Wycombe and surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Full SMP", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "Full SMP suits all skin types and hair colours.",
        body: (
          <>
            <p>
            Men experiencing hair loss, thinning, a receding hairline, scarring
            from surgical procedures, or anyone wanting to enhance the
            appearance of a shaved or short-cropped look. Full SMP suits all
            skin types and hair colours.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More SMP Services" }}
      cta={{
        title: <>Ready to Take the Next Step?</>,
        text: <>Book your free full SMP treatment consultation at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default FullSMPTreatmentPage;
