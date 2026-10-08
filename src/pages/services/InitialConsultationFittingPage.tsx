import { useEffect } from "react";
import { MessageCircle, Search, HeartHandshake, UserCheck, Scissors, BookOpen, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: MessageCircle, text: "Completely free, no-obligation consultation" },
  { icon: Search, text: "Expert assessment of your hair loss pattern and scalp" },
  { icon: HeartHandshake, text: "Honest recommendations. We only suggest what is right for you" },
  { icon: UserCheck, text: "Professional fitting by trained hair system specialists" },
  { icon: Scissors, text: "Same-day styling included in your fitting appointment" },
  { icon: BookOpen, text: "Friendly, private and welcoming environment" },
  { icon: MapPin, text: "Local to Amersham with easy access from surrounding areas" },
];

const steps = [
  {
    title: "Welcome & Assessment",
    desc: "We take the time to understand your hair loss and what you want to achieve.",
  },
  {
    title: "Honest Recommendations",
    desc: "We walk you through your options clearly and honestly.",
  },
  {
    title: "System Design",
    desc: "If you proceed, we map out your custom system specifications.",
  },
  {
    title: "Fitting Day",
    desc: "Your system is fitted, blended and styled to perfection.",
  },
  {
    title: "Aftercare Walkthrough",
    desc: "We ensure you leave knowing exactly how to care for your system.",
  },
];

const faqs = [
  {
    q: "Is the consultation really free with no obligation?",
    a: "Yes. There is absolutely no pressure to proceed and no cost for your consultation.",
  },
  {
    q: "How long does the initial consultation take?",
    a: "Consultations typically last between 30 and 45 minutes.",
  },
  {
    q: "What should I bring to your consultation?",
    a: "Just yourself. We handle everything from assessment onwards.",
  },
  {
    q: "How soon after my consultation can I be fitted?",
    a: "Fitting appointments are typically arranged within 2 to 4 weeks of your consultation, once your system has been customized.",
  },
];

const InitialConsultationFittingPage = () => {
  const sub = findSubService("hair-systems", "initial-consultation-and-fitting")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-systems/initial-consultation-and-fitting",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Systems", path: "/hair-systems" },
      { name: sub.subService.name, path: "/hair-systems/initial-consultation-and-fitting" },
    ]),
  ]);
  useCanonical("/hair-systems/initial-consultation-and-fitting");
  useOpenGraph(
    "Hair System Consultation & Fitting Amersham | Men's Hair To Stay",
    "Book your free hair system consultation and fitting in Amersham. Men's Hair To Stay serves men across Chesham, Beaconsfield, High Wycombe, Rickmansworth and Buckinghamshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair System Consultation & Fitting Amersham | Men's Hair To Stay";
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
      "Book your free hair system consultation and fitting in Amersham. Men's Hair To Stay serves men across Chesham, Beaconsfield, High Wycombe, Rickmansworth and Buckinghamshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-systems/initial-consultation-and-fitting"
      category="hair-systems"
      subSlug="initial-consultation-and-fitting"
      hero={{
        back: { to: "/hair-systems", label: "Hair Systems" },
        title: (
          <>
            It All Starts With<br />
            <span className="text-mhts-red-light">a Free Conversation.</span>
          </>
        ),
        lead: (
          <>
            Your initial consultation and fitting at Men's Hair To Stay, no pressure, no obligation, just honest expert advice and a plan built around you.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is the Initial Consultation &amp; Fitting?</>,
        fact: "completely pressure-free",
        body: (
          <>
            <p>
            Your initial consultation is the first step in your hair restoration
            journey. During this appointment, our specialists assess your hair loss
            pattern, discuss your lifestyle and goals, and recommend the most suitable
            solution. Once you are ready to proceed, your fitting appointment is where
            the transformation happens. Your custom system is professionally applied
            and styled to create a seamless, natural result.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we make this process relaxed,
            informative and completely pressure-free for every client who visits us
            from Chesham, Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe
            and beyond.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Us", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "You do not need to have made any decisions before attending",
        body: (
          <>
            <p>
            Any man who is considering a hair system or wants to explore their hair
            restoration options. You do not need to have made any decisions before
            attending, the consultation is designed to help you make the right choice
            with confidence and clarity.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Systems Services" }}
      cta={{
        title: <>Take the First Step Today.</>,
        text: <>Book your free consultation and fitting assessment at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default InitialConsultationFittingPage;
