import { useEffect } from "react";
import { Sparkles, Infinity as InfinityIcon, Users, ShieldCheck, Scissors, Droplet, Zap, MapPin } from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";
import smpHero from "@/assets/smp-hero.jpg";

const pricingRows = [
  { name: "SMP Consultation", price: "Free", note: "No obligation" },
  { name: "Full SMP Treatment", price: "Contact us for pricing" },
  { name: "SMP Touch-Up Session", price: "Contact us for pricing" },
];


const benefits = [
  { icon: InfinityIcon, text: "Permanent solution with minimal top-up maintenance" },
  { icon: Sparkles, text: "Creates a realistic, natural-looking hairline" },
  { icon: Users, text: "Suitable for all skin tones and stages of hair loss" },
  { icon: ShieldCheck, text: "No surgery, no scarring, no recovery time" },
  { icon: Scissors, text: "Covers scars from previous hair transplants" },
  { icon: Droplet, text: "Low daily maintenance, just keep it moisturized" },
  { icon: Zap, text: "Immediate confidence boost after first session" },
  { icon: MapPin, text: "Locally available in Amersham" },
];

const steps = [
  {
    title: "Free SMP Consultation",
    desc: "We discuss your hair loss pattern, desired look and design your hairline together.",
  },
  {
    title: "Session One",
    desc: "Initial pigment is applied across the treatment area at a lighter density.",
  },
  {
    title: "Session Two",
    desc: "Depth and density are built up, refining the hairline and coverage.",
  },
  {
    title: "Session Three (if needed)",
    desc: "Final detailing and perfecting for a flawless result.",
  },
  {
    title: "Aftercare",
    desc: "Simple moisturizing routine and sun protection to preserve your results.",
  },
];

const faqs = [
  {
    q: "Does scalp micropigmentation look natural?",
    a: "Yes. When performed by a specialist, SMP creates incredibly realistic follicle impressions that are virtually indistinguishable from real stubble.",
  },
  {
    q: "Is SMP painful?",
    a: "Most clients describe SMP as mildly uncomfortable rather than painful. We take every step to ensure you are comfortable throughout.",
  },
  {
    q: "How long does SMP last?",
    a: "SMP is a long-term solution. Results typically last 3 to 5 years before a light touch-up session is recommended to refresh the pigment.",
  },
  {
    q: "Will it look like a tattoo?",
    a: "No. SMP uses different pigments, needle sizes and techniques to traditional tattooing, producing a natural result that does not fade to blue or green.",
  },
  {
    q: "How many sessions will I need?",
    a: "Most full SMP treatments require 2 to 3 sessions spaced 7 to 14 days apart for the best result.",
  },
  {
    q: "Do you offer SMP near High Wycombe and Chesham?",
    a: "Yes. Our Amersham studio serves clients across High Wycombe, Chesham, Beaconsfield, Rickmansworth, Gerrards Cross and all surrounding areas.",
  },
];

const ScalpMicropigmentationPage = () => {
  const category = findCategory("scalp-micropigmentation")!;

  useJsonLd([
    serviceSchema({
      name: category.name,
      description: category.intro,
      path: "/scalp-micropigmentation",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Scalp Micropigmentation", path: "/scalp-micropigmentation" },
    ]),
  ]);
  useCanonical("/scalp-micropigmentation");
  useOpenGraph(
    "Scalp Micropigmentation Amersham | SMP Treatment | Men's Hair To Stay",
    "Expert scalp micropigmentation in Amersham. Men's Hair To Stay provides full SMP treatments, touch-up sessions and consultations for men across Buckinghamshire and Hertfordshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Scalp Micropigmentation Amersham | SMP Treatment | Men's Hair To Stay";
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
      "Expert scalp micropigmentation in Amersham. Men's Hair To Stay provides full SMP treatments, touch-up sessions and consultations for men across Buckinghamshire and Hertfordshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/scalp-micropigmentation"
      category="scalp-micropigmentation"
      hero={{
        eyebrow: "Scalp Micropigmentation",
        image: smpHero,
        imageAlt: "Close-up of scalp micropigmentation result showing a defined hairline",
        title: (
          <>
            The Look of a Fresh Shave.<br />
            <span className="text-mhts-red-light">Every Single Day.</span>
          </>
        ),
        lead: (
          <>
            Scalp micropigmentation in Amersham, a permanent, low-maintenance solution for hair loss that creates the appearance of a full, closely-shaved head.
          </>
        ),
      }}
      pricing={pricingRows}
      about={{
        eyebrow: "About",
        title: <>What Is Scalp Micropigmentation?</>,
        fact: "a natural result that does not turn blue or green over time",
        body: (
          <>
            <p>
            Scalp micropigmentation, commonly known as SMP, is a specialist
            treatment that uses micro-needles to deposit pigment into the scalp,
            replicating the appearance of hair follicles. The result is a
            realistic, defined hairline and the look of a closely cropped head of
            hair, even on a completely bald scalp.
            </p>
            <p>
            Unlike tattoos, SMP uses specific pigments and techniques designed
            exclusively for the scalp, ensuring a natural result that does not
            turn blue or green over time. At Men's Hair To Stay in Amersham, our
            SMP treatments are tailored to your skin tone, head shape and desired
            hairline, serving clients across Chesham, Beaconsfield,
            Rickmansworth, High Wycombe, Gerrards Cross and beyond.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose SMP", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "a permanent, low-maintenance answer to hair loss",
        body: (
          <>
            <p>
            SMP is ideal for men who want a permanent, low-maintenance answer to
            hair loss. It suits men who prefer the shaved head look, those who have
            tried other treatments without success, and those looking to cover
            transplant scarring or patchy hair loss. If you are based in Amersham,
            Chesham, Beaconsfield, High Wycombe, Rickmansworth, Chorleywood,
            Chalfont St Giles, Chalfont St Peter, Gerrards Cross, Watford or
            Uxbridge, our specialist SMP clinic is right on your doorstep.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Explore", title: "SMP Services" }}
      cta={{
        title: <>Confident. Sharp. Permanent.</>,
        text: <>Book your free SMP consultation at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default ScalpMicropigmentationPage;
