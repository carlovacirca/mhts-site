import { useEffect } from "react";
import { MessageCircle, Search, Compass, HeartHandshake, HelpCircle, ShieldCheck, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: MessageCircle, text: "Completely free with no obligation" },
  { icon: Search, text: "Expert scalp and hair loss assessment" },
  { icon: Compass, text: "Hairline design discussion included" },
  { icon: HeartHandshake, text: "Honest advice on whether SMP is right for you" },
  { icon: HelpCircle, text: "All questions answered by a specialist" },
  { icon: ShieldCheck, text: "Relaxed, private and welcoming environment" },
  { icon: MapPin, text: "Easy access from across Buckinghamshire and Hertfordshire" },
];

const steps = [
  {
    title: "Welcome",
    desc: "A relaxed, private appointment with no pressure.",
  },
  {
    title: "Scalp Assessment",
    desc: "We assess your scalp condition and hair loss pattern.",
  },
  {
    title: "Treatment Discussion",
    desc: "We explain the SMP process in full detail.",
  },
  {
    title: "Hairline Design",
    desc: "We map out a proposed hairline design together.",
  },
  {
    title: "Q&A",
    desc: "All your questions answered honestly and thoroughly.",
  },
];

const faqs = [
  {
    q: "Is the SMP consultation genuinely free?",
    a: "Yes. There is no cost and no obligation whatsoever.",
  },
  {
    q: "How long does the consultation take?",
    a: "Approximately 30 to 45 minutes.",
  },
  {
    q: "What if I decide SMP is not for me?",
    a: "That is absolutely fine. We will suggest alternatives that may better suit your needs and goals.",
  },
  {
    q: "Do I need to prepare anything beforehand?",
    a: "No preparation is needed. Just come along with your questions and we will handle the rest.",
  },
];

const SMPConsultationPage = () => {
  const sub = findSubService("scalp-micropigmentation", "smp-consultation")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/scalp-micropigmentation/smp-consultation",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Scalp Micropigmentation", path: "/scalp-micropigmentation" },
      { name: sub.subService.name, path: "/scalp-micropigmentation/smp-consultation" },
    ]),
  ]);
  useCanonical("/scalp-micropigmentation/smp-consultation");
  useOpenGraph(
    "SMP Consultation Amersham | Free Scalp Micropigmentation Consultation | Men's Hair To Stay",
    "Free SMP consultation in Amersham. Discuss your scalp micropigmentation options with the specialists at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "SMP Consultation Amersham | Free Scalp Micropigmentation Consultation | Men's Hair To Stay";
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
      "Free SMP consultation in Amersham. Discuss your scalp micropigmentation options with the specialists at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/scalp-micropigmentation/smp-consultation"
      category="scalp-micropigmentation"
      subSlug="smp-consultation"
      hero={{
        back: { to: "/scalp-micropigmentation", label: "Scalp Micropigmentation" },
        title: (
          <>
            Find Out If SMP Is<br />
            <span className="text-mhts-red-light">Right for You.</span>
          </>
        ),
        lead: (
          <>
            A free, no-obligation SMP consultation at Men's Hair To Stay in Amersham, honest advice, expert assessment and a clear plan with no pressure.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is the SMP Consultation?</>,
        fact: "There is absolutely no obligation to proceed and no cost for the consultation.",
        body: (
          <>
            <p>
            Your SMP consultation is a dedicated appointment with one of our scalp
            micropigmentation specialists. We assess your scalp, discuss your hair
            loss pattern and talk through what SMP can realistically achieve for you.
            We also design your hairline together, discuss pigment options and ensure
            you have all the information you need to make the right decision.
            </p>
            <p>
            There is absolutely no obligation to proceed and no cost for the
            consultation. Men's Hair To Stay in Amersham provides free SMP
            consultations for men across Chesham, Beaconsfield, Rickmansworth, High
            Wycombe, Gerrards Cross and all surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Book a Consultation", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "The consultation is the ideal starting point.",
        body: (
          <>
            <p>
            Any man curious about scalp micropigmentation who wants to understand the
            process, assess suitability and make an informed decision before committing.
            The consultation is the ideal starting point.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More SMP Services" }}
      cta={{
        title: <>Your Questions Answered. No Pressure. No Cost.</>,
        text: <>Book your free SMP consultation at Men's Hair To Stay in Amersham today.</>,
      }}
    />
  );
};

export default SMPConsultationPage;
