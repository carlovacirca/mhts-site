import { useEffect } from "react";
import { MessageCircle, Search, Eye, HeartHandshake, ShieldCheck, BookOpen, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: MessageCircle, text: "Free and completely no-obligation" },
  { icon: Search, text: "In-depth scalp and density assessment" },
  { icon: Eye, text: "Identification of thinning patterns" },
  { icon: HeartHandshake, text: "Personalized treatment recommendations" },
  { icon: ShieldCheck, text: "Honest advice with no hard sell" },
  { icon: BookOpen, text: "Clear explanation of all available options" },
  { icon: MapPin, text: "Local to Amersham" },
];

const steps = [
  {
    title: "Scalp & Density Assessment",
    desc: "We examine your scalp and existing hair density in detail.",
  },
  {
    title: "Pattern Analyzis",
    desc: "We identify your thinning pattern and likely progression.",
  },
  {
    title: "Treatment Options",
    desc: "We walk you through all relevant density treatment options.",
  },
  {
    title: "Personalized Plan",
    desc: "A tailored treatment plan is recommended based on your assessment.",
  },
  {
    title: "Q&A",
    desc: "All questions answered openly and honestly.",
  },
];

const faqs = [
  {
    q: "Is the density consultation free?",
    a: "Yes, completely free with no obligation.",
  },
  {
    q: "How long does it take?",
    a: "Approximately 30 to 45 minutes.",
  },
  {
    q: "Will you tell me honestly if density treatment is not suitable for me?",
    a: "Always. We will recommend alternative solutions if a density treatment is not the right fit.",
  },
];

const DensityTreatmentConsultationPage = () => {
  const sub = findSubService("hair-density", "density-treatment-consultation")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-density/density-treatment-consultation",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Density", path: "/hair-density" },
      { name: sub.subService.name, path: "/hair-density/density-treatment-consultation" },
    ]),
  ]);
  useCanonical("/hair-density/density-treatment-consultation");
  useOpenGraph(
    "Hair Density Consultation Amersham | Thinning Hair Assessment | Men's Hair To Stay",
    "Free hair density consultation in Amersham. Get expert advice on thinning hair and density treatments at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair Density Consultation Amersham | Thinning Hair Assessment | Men's Hair To Stay";
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
      "Free hair density consultation in Amersham. Get expert advice on thinning hair and density treatments at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-density/density-treatment-consultation"
      category="hair-density"
      subSlug="density-treatment-consultation"
      hero={{
        back: { to: "/hair-density", label: "Hair Density" },
        title: (
          <>
            Understand Your Hair Loss.<br />
            <span className="text-mhts-red-light">Find Your Solution.</span>
          </>
        ),
        lead: (
          <>
            A free density treatment consultation in Amersham, expert assessment of your thinning hair and a personalized plan to restore fullness and confidence.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is the Density Treatment Consultation?</>,
        fact: "we provide free, honest density consultations",
        body: (
          <>
            <p>
            A density treatment consultation is your starting point if you are
            concerned about thinning hair, reduced volume or patchy coverage. Our
            specialist will conduct a thorough assessment of your scalp and remaining
            hair density, identify the pattern and cause of your thinning, and
            recommend the most effective treatment approach for your specific situation.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we provide free, honest density
            consultations for men across Chesham, Beaconsfield, Rickmansworth, High
            Wycombe, Gerrards Cross and surrounding Buckinghamshire and Hertfordshire
            areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Book a Consultation", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "professional guidance on what to do next",
        body: (
          <>
            <p>
            Men who are noticing their hair thinning, a widening parting, reduced volume
            or crown coverage concerns, and who want professional guidance on what to do
            next.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Density Services" }}
      cta={{
        title: <>The Right Solution Starts With the Right Conversation.</>,
        text: <>Book your free density treatment consultation at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default DensityTreatmentConsultationPage;
