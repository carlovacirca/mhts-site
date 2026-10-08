import { useEffect } from "react";
import { Sparkles, ShieldCheck, Zap, Wallet, RotateCcw, Smile, Palette, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Zap, text: "Immediate results, walk in, walk out with a full head of hair" },
  { icon: ShieldCheck, text: "No surgery, anaesthetic or recovery period" },
  { icon: Sparkles, text: "No scarring or risk of complications" },
  { icon: Wallet, text: "Fraction of the cost of a hair transplant" },
  { icon: RotateCcw, text: "Completely reversible if you change your mind" },
  { icon: Smile, text: "Results that look and feel completely natural" },
  { icon: Palette, text: "Custom matched to your exact colour and texture" },
  { icon: MapPin, text: "Ongoing support from your local Amersham specialists" },
];

const steps = [
  {
    title: "Free Consultation",
    desc: "Discuss your hair loss and goals with our specialist team.",
  },
  {
    title: "System Design",
    desc: "Custom matched to your hair profile, colour, texture and density.",
  },
  {
    title: "Professional Fitting",
    desc: "Seamlessly blended and styled to look completely natural.",
  },
  {
    title: "Aftercare Training",
    desc: "Learn how to care for your system at home for lasting results.",
  },
  {
    title: "Ongoing Maintenance",
    desc: "Regular appointments available to keep your system looking perfect.",
  },
];

const faqs = [
  {
    q: "How is non-surgical hair replacement different from a transplant?",
    a: "A transplant moves your own follicles surgically. Non-surgical replacement uses a custom hair system fitted to your scalp, no surgery, no recovery, immediate results.",
  },
  {
    q: "Will anyone be able to tell I am wearing a hair system?",
    a: "With a professional fit from Men's Hair To Stay, your system is virtually undetectable even up close.",
  },
  {
    q: "Is non-surgical hair replacement permanent?",
    a: "The system itself is long-lasting with maintenance, but it is not a permanent attachment. This also means it is fully reversible, which many clients see as a benefit.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation and we will take it from there.",
  },
];

const NonSurgicalHairReplacementPage = () => {
  const sub = findSubService("hair-systems", "non-surgical-hair-replacement")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-systems/non-surgical-hair-replacement",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Systems", path: "/hair-systems" },
      { name: sub.subService.name, path: "/hair-systems/non-surgical-hair-replacement" },
    ]),
  ]);
  useCanonical("/hair-systems/non-surgical-hair-replacement");
  useOpenGraph(
    "Non-Surgical Hair Replacement Amersham | Men's Hair To Stay",
    "Non-surgical hair replacement for men in Amersham. Get a full head of natural hair without surgery or downtime. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Non-Surgical Hair Replacement Amersham | Men's Hair To Stay";
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
      "Non-surgical hair replacement for men in Amersham. Get a full head of natural hair without surgery or downtime. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-systems/non-surgical-hair-replacement"
      category="hair-systems"
      subSlug="non-surgical-hair-replacement"
      hero={{
        back: { to: "/hair-systems", label: "Hair Systems" },
        title: (
          <>
            All the Hair.<br />
            <span className="text-mhts-red-light">None of the Surgery.</span>
          </>
        ),
        lead: (
          <>
            Non-surgical hair replacement in Amersham, the safe, effective and immediate alternative to hair transplant surgery.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Non-Surgical Hair Replacement?</>,
        fact: "zero surgery, zero scarring and zero recovery time",
        body: (
          <>
            <p>
            Non-surgical hair replacement is an umbrella term for all methods of
            restoring a full head of hair without going under the knife. At Men's
            Hair To Stay, our non-surgical approach centres on premium custom hair
            systems, real human hair units, individually matched and professionally
            fitted to give you an undetectable, natural result with zero surgery,
            zero scarring and zero recovery time.
            </p>
            <p>
            For men in Amersham, Chesham, Beaconsfield, Rickmansworth, High Wycombe
            and across Buckinghamshire and Hertfordshire, non-surgical hair
            replacement offers an immediate, life-changing result that surgery simply
            cannot match for speed or accessibility.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Non-Surgical Replacement", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "suitable for men at any stage of hair loss",
        body: (
          <>
            <p>
            Non-surgical hair replacement is suitable for men at any stage of hair
            loss, from a slightly receding hairline to complete baldness. It is
            particularly popular with men who have been advised they are not suitable
            for a transplant, those who want immediate results, and those who want to
            avoid the risk and cost of surgery. Serving men across Amersham, Chesham,
            Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe, Watford and
            Uxbridge.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Systems Services" }}
      cta={{
        title: <>Your Hair Transformation Starts Here.</>,
        text: <>Book your free non-surgical hair replacement consultation in Amersham today.</>,
      }}
    />
  );
};

export default NonSurgicalHairReplacementPage;
