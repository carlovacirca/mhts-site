import { useEffect } from "react";
import { Sparkles, Eye, HeartPulse, UserCheck, CheckCircle, CalendarClock, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Sparkles, text: "Works with your natural hair" },
  { icon: Eye, text: "Immediate visible improvement in density and volume" },
  { icon: HeartPulse, text: "Non-surgical with no recovery time" },
  { icon: UserCheck, text: "Personalized to your hair loss pattern" },
  { icon: CheckCircle, text: "Natural-looking fuller appearance" },
  { icon: CalendarClock, text: "Ongoing treatment plans available" },
  { icon: MapPin, text: "Locally available in Amersham" },
];

const steps = [
  {
    title: "Assessment",
    desc: "Hair and scalp assessment to understand your thinning pattern.",
  },
  {
    title: "Treatment Plan",
    desc: "A personalized plan targeting your specific areas of concern.",
  },
  {
    title: "Treatment Session",
    desc: "Specialist density treatment applied by our team.",
  },
  {
    title: "Review",
    desc: "Results assessed and further sessions planned if needed.",
  },
  {
    title: "Aftercare",
    desc: "Guidance on maintaining and supporting your results at home.",
  },
];

const faqs = [
  {
    q: "How quickly will I see a difference?",
    a: "Most clients notice an immediate improvement after their first session.",
  },
  {
    q: "How many sessions will I need?",
    a: "This depends on the extent of your thinning. We will outline a full plan at your free consultation.",
  },
  {
    q: "Is this a permanent solution?",
    a: "Results are long-lasting with the right aftercare and maintenance appointments.",
  },
  {
    q: "Is it suitable for all hair types?",
    a: "Yes. We adapt our approach to suit your specific hair texture and type.",
  },
];

const ThinningHairTreatmentPage = () => {
  const sub = findSubService("hair-density", "thinning-hair-treatment")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-density/thinning-hair-treatment",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Density", path: "/hair-density" },
      { name: sub.subService.name, path: "/hair-density/thinning-hair-treatment" },
    ]),
  ]);
  useCanonical("/hair-density/thinning-hair-treatment");
  useOpenGraph(
    "Thinning Hair Treatment Amersham | Hair Density Solutions for Men | Men's Hair To Stay",
    "Thinning hair treatment for men in Amersham. Men's Hair To Stay provides specialist density solutions for thinning hair across Chesham, Beaconsfield, High Wycombe and Buckinghamshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Thinning Hair Treatment Amersham | Hair Density Solutions for Men | Men's Hair To Stay";
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
      "Thinning hair treatment for men in Amersham. Men's Hair To Stay provides specialist density solutions for thinning hair across Chesham, Beaconsfield, High Wycombe and Buckinghamshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-density/thinning-hair-treatment"
      category="hair-density"
      subSlug="thinning-hair-treatment"
      hero={{
        back: { to: "/hair-density", label: "Hair Density" },
        title: (
          <>
            Thicker, Fuller Hair<br />
            <span className="text-mhts-red-light">Without the Wait.</span>
          </>
        ),
        lead: (
          <>
            Specialist thinning hair treatment for men in Amersham, targeted solutions that add real density and restore confidence from your very first appointment.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is Thinning Hair Treatment?</>,
        fact: "Rather than replacing your hair, we enhance what you have",
        body: (
          <>
            <p>
            Our thinning hair treatment is a targeted density solution for men who are
            experiencing reduced hair volume, a more visible scalp or a general loss of
            fullness, but who still have enough natural hair to work with. Rather than
            replacing your hair, we enhance what you have, creating the appearance of
            significantly thicker, fuller hair using specialist techniques matched to your
            individual hair profile.
            </p>
            <p>
            Men's Hair To Stay provides thinning hair treatment in Amersham for clients
            across Chesham, Beaconsfield, Rickmansworth, High Wycombe, Gerrards Cross and
            all surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose This Treatment", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "without moving to a full hair system",
        body: (
          <>
            <p>
            Men in the early to moderate stages of hair thinning who want to address reduced
            density without moving to a full hair system. Ideal for those who want a natural
            enhancement of their existing hair.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Density Services" }}
      cta={{
        title: <>Fuller Hair Is Closer Than You Think.</>,
        text: <>Book your free thinning hair treatment consultation at Men's Hair To Stay, Amersham.</>,
      }}
    />
  );
};

export default ThinningHairTreatmentPage;
