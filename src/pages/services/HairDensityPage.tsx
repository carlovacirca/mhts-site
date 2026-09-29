import { useEffect } from "react";
import { Leaf, Crosshair, ShieldCheck, Sparkles, UserCog, Activity, Zap, MapPin } from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";
import hairDensityHero from "@/assets/hair-density-hero.jpg";

const pricingRows = [
  { name: "Density Treatment Consultation", price: "Free", note: "No obligation" },
  { name: "Thinning Hair Treatment", price: "Contact us for pricing" },
  { name: "Crown Coverage Treatment", price: "Contact us for pricing" },
];


const benefits = [
  { icon: Leaf, text: "Works with your existing natural hair" },
  { icon: Crosshair, text: "Targeted treatment for thinning and crown loss" },
  { icon: ShieldCheck, text: "No surgery or lengthy recovery" },
  { icon: Sparkles, text: "Natural-looking fullness and volume" },
  { icon: UserCog, text: "Personalized to your exact hair loss pattern" },
  { icon: Activity, text: "Suitable for early to moderate stages of hair loss" },
  { icon: Zap, text: "Immediate visible improvement" },
  { icon: MapPin, text: "Ongoing support from local Amersham specialists" },
];

const steps = [
  {
    title: "Density Treatment Consultation",
    desc: "We assess your scalp, hair density and loss pattern in detail.",
  },
  {
    title: "Treatment Plan",
    desc: "A personalized plan is created targeting your specific areas of concern.",
  },
  {
    title: "Treatment Session",
    desc: "Your chosen density treatment is carried out by our specialist team.",
  },
  {
    title: "Review",
    desc: "We assess results and determine whether further sessions or complementary treatments are needed.",
  },
  {
    title: "Aftercare",
    desc: "Guidance on home care to maintain and support your results.",
  },
];

const faqs = [
  {
    q: "What is the difference between hair density treatment and a hair system?",
    a: "A hair system replaces hair entirely. A density treatment enhances and works with the natural hair you already have, adding fullness and coverage without replacement.",
  },
  {
    q: "Is hair density treatment suitable for me?",
    a: "It is most effective for men in the early to moderate stages of hair loss who still have a reasonable amount of natural hair to work with.",
  },
  {
    q: "How quickly will I see results?",
    a: "Many clients notice an immediate difference after their first treatment session.",
  },
  {
    q: "Do I need multiple sessions?",
    a: "This depends on the degree of thinning. We will outline a full treatment plan during your free consultation.",
  },
  {
    q: "Do you serve men outside Amersham?",
    a: "Yes. We welcome clients from Chesham, Beaconsfield, High Wycombe, Rickmansworth, Gerrards Cross, Watford, Uxbridge and all nearby areas.",
  },
];

const HairDensityPage = () => {
  const category = findCategory("hair-density")!;

  useJsonLd([
    serviceSchema({
      name: category.name,
      description: category.intro,
      path: "/hair-density",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Density", path: "/hair-density" },
    ]),
  ]);
  useCanonical("/hair-density");
  useOpenGraph(
    "Hair Density Treatment Amersham | Thinning Hair Solutions | Men's Hair To Stay",
    "Struggling with thinning hair? Men's Hair To Stay in Amersham offers specialist hair density treatments for men including crown coverage and thinning hair solutions across Buckinghamshire and Hertfordshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Hair Density Treatment Amersham | Thinning Hair Solutions | Men's Hair To Stay";
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
      "Struggling with thinning hair? Men's Hair To Stay in Amersham offers specialist hair density treatments for men including crown coverage and thinning hair solutions across Buckinghamshire and Hertfordshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-density"
      category="hair-density"
      hero={{
        eyebrow: "Hair Density",
        image: hairDensityHero,
        imageAlt: "Close-up of natural-looking hair density result",
        title: (
          <>
            Thicker Hair. Fuller Coverage.<br />
            <span className="text-mhts-red-light">Real Confidence.</span>
          </>
        ),
        lead: (
          <>
            Specialist hair density treatments for men in Amersham, targeted solutions for thinning hair, crown coverage and everything in between.
          </>
        ),
      }}
      pricing={pricingRows}
      about={{
        eyebrow: "About",
        title: <>What Is Hair Density Treatment?</>,
        fact: "density treatments work with what you have",
        body: (
          <>
            <p>
            Hair density treatments are specialist solutions designed for men who
            still have natural hair but are experiencing thinning, reduced volume
            or patchy coverage, particularly around the crown. Rather than
            replacing your hair entirely, density treatments work with what you
            have, enhancing fullness and coverage for a natural, thicker result.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we assess your individual hair
            loss pattern and recommend the most effective density solution, whether that is a targeted thinning hair treatment, crown coverage or
            a full density consultation to map out your options. We serve men
            across Amersham, Chesham, Beaconsfield, Rickmansworth, Gerrards Cross
            and High Wycombe.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Density Treatment", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "a density treatment is the perfect starting point.",
        body: (
          <>
            <p>
            Hair density treatments are ideal for men who are in the early to
            moderate stages of hair loss, particularly those noticing thinning at
            the crown, a widening parting or reduced volume overall. If you are not
            yet ready for a full hair system or SMP but want to address your
            thinning hair now, a density treatment is the perfect starting point.
            Available to men across Amersham, Chesham, High Wycombe, Rickmansworth,
            Beaconsfield, Chorleywood, Chalfont St Giles, Gerrards Cross, Watford
            and Uxbridge.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Explore", title: "Hair Density Services" }}
      cta={{
        title: <>Stop Hiding Your Hair. Start Loving It.</>,
        text: <>Book your free hair density consultation at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairDensityPage;
