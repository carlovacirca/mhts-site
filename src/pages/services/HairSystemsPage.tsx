import { useEffect } from "react";
import { Sparkles, Palette, ShieldCheck, Waves, Zap, Clock, Smile, MapPin } from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const pricingRows = [
  { name: "Initial Consultation & Fitting", price: "Free", note: "No obligation" },
  { name: "Non-Surgical Hair Replacement", price: "Contact us for pricing" },
  { name: "Hair Replacement Service", price: "Contact us for pricing" },
  { name: "Hair System Colouring", price: "Contact us for pricing" },
  { name: "Hair System Styling", price: "Contact us for pricing" },
];


const benefits = [
  { icon: Sparkles, text: "100% human hair for a completely natural look and feel" },
  { icon: Palette, text: "Custom matched to your exact colour, texture and density" },
  { icon: ShieldCheck, text: "No surgery, no downtime, no risk" },
  { icon: Waves, text: "Swim, gym and sleep in your system with the right maintenance" },
  { icon: Zap, text: "Immediate results from your very first fitting" },
  { icon: Clock, text: "Long-lasting with regular professional maintenance" },
  { icon: Smile, text: "Confidence-boosting results from day one" },
  { icon: MapPin, text: "Locally available in Amersham with ongoing support" },
];

const steps = [
  {
    title: "Free Consultation",
    desc: "We assess your hair loss, discuss your goals and recommend the right system for you.",
  },
  {
    title: "Custom Design",
    desc: "Your system is matched to your hair colour, density, texture and base size.",
  },
  {
    title: "Fitting Day",
    desc: "Your system is professionally fitted and styled to blend seamlessly with your natural hair.",
  },
  {
    title: "Aftercare Guidance",
    desc: "We walk you through home care and maintenance routines.",
  },
  {
    title: "Ongoing Support",
    desc: "Regular maintenance appointments keep your system looking perfect.",
  },
];

const faqs = [
  {
    q: "Are hair systems noticeable?",
    a: "Modern hair systems are virtually undetectable. Our systems use ultra-thin lace or skin bases that sit flush against your scalp, making them impossible to spot even up close.",
  },
  {
    q: "How long does a hair system last?",
    a: "With professional maintenance, a well-looked-after hair system typically lasts between 3 to 6 months before needing to be replaced.",
  },
  {
    q: "Can I wash and style my hair system normally?",
    a: "Yes. You can wash, style, and even use heat tools on your hair system just like natural hair.",
  },
  {
    q: "Do you serve areas outside Amersham?",
    a: "Yes. We serve clients across Chesham, Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe, Watford, Uxbridge and the surrounding areas.",
  },
  {
    q: "What is the first step?",
    a: "Book a free consultation. We will assess your hair loss, answer all your questions and create a plan tailored to you.",
  },
];

const HairSystemsPage = () => {
  const category = findCategory("hair-systems")!;

  useJsonLd([
    serviceSchema({
      name: category.name,
      description: category.intro,
      path: "/hair-systems",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Systems", path: "/hair-systems" },
    ]),
  ]);
  useCanonical("/hair-systems");
  useOpenGraph(
    "Hair Systems Amersham | Non-Surgical Hair Replacement | Men's Hair To Stay",
    "Discover premium hair systems in Amersham. Men's Hair To Stay offers natural-looking, non-surgical hair replacement for men across Amersham, Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Hair Systems Amersham | Non-Surgical Hair Replacement | Men's Hair To Stay";
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
      "Discover premium hair systems in Amersham. Men's Hair To Stay offers natural-looking, non-surgical hair replacement for men across Amersham, Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-systems"
      category="hair-systems"
      hero={{
        eyebrow: "Hair Systems",
        title: (
          <>
            Real Hair. Natural Results.<br />
            <span className="text-mhts-red-light">Zero Surgery.</span>
          </>
        ),
        lead: (
          <>
            Premium hair systems for men in Amersham and across Buckinghamshire. Look and feel like yourself again, without going under the knife.
          </>
        ),
      }}
      pricing={pricingRows}
      about={{
        eyebrow: "About",
        title: <>What Is a Hair System?</>,
        fact: "no two systems are ever the same",
        body: (
          <>
            <p>
            Hair systems are the most advanced form of non-surgical hair replacement
            available today. Also known as hair pieces or hair units, modern hair
            systems are crafted from real human hair and fitted to a virtually
            undetectable base that sits against your scalp. The result is a full,
            natural head of hair that you can style, wash and live your life in with
            complete confidence.
            </p>
            <p>
            At Men's Hair To Stay, we custom-fit every hair system to your head shape,
            hair colour, texture and density, so no two systems are ever the same.
            Serving men across Amersham, Chesham, Beaconsfield, Rickmansworth,
            Gerrards Cross and High Wycombe, we are the local specialists in hair
            systems that truly look and feel real.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose a Hair System", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "from a receding hairline to complete baldness",
        body: (
          <>
            <p>
            Hair systems are ideal for men who are experiencing any stage of hair loss, from a receding hairline to complete baldness. Whether your hair loss is
            caused by genetics, alopecia, medical treatment or any other reason, a hair
            system can restore your full head of hair without surgery. If you live in or
            around Amersham, Chesham, Beaconsfield, High Wycombe, Rickmansworth,
            Chorleywood, Chalfont St Giles, Chalfont St Peter, Gerrards Cross, Watford
            or Uxbridge and want a permanent non-surgical solution to hair loss, Men's
            Hair To Stay is your local expert.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Explore", title: "Hair Systems Services" }}
      cta={{
        title: <>Ready to Get Your Hair Back?</>,
        text: <>Book your free no-obligation consultation with Men's Hair To Stay in Amersham today.</>,
      }}
    />
  );
};

export default HairSystemsPage;
