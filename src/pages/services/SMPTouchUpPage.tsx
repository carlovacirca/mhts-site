import { useEffect } from "react";
import { Sparkles, Crosshair, Clock, Users, Wallet, Zap, MapPin } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Sparkles, text: "Restores pigment density and definition" },
  { icon: Crosshair, text: "Sharpens hairline and edges" },
  { icon: Clock, text: "Shorter session than original treatment" },
  { icon: Users, text: "Available for our clients and those treated elsewhere" },
  { icon: Wallet, text: "Extends the life of your original investment" },
  { icon: Zap, text: "Quick and straightforward appointment" },
  { icon: MapPin, text: "Local to Amersham" },
];

const steps = [
  {
    title: "Assessment",
    desc: "We evaluate your existing SMP and identify areas requiring attention.",
  },
  {
    title: "Pigment Matching",
    desc: "We match the refresh pigment to your original treatment.",
  },
  {
    title: "Touch-Up Application",
    desc: "Pigment is refreshed across affected areas.",
  },
  {
    title: "Finishing",
    desc: "Hairline and edges are redefined as needed.",
  },
  {
    title: "Aftercare",
    desc: "Same simple aftercare routine as your original treatment.",
  },
];

const faqs = [
  {
    q: "How often will I need a touch-up?",
    a: "Most clients benefit from a touch-up every 3 to 5 years depending on skin type, lifestyle and sun exposure.",
  },
  {
    q: "Can you touch up SMP done elsewhere?",
    a: "Yes. We are experienced in refreshing and correcting SMP from other providers.",
  },
  {
    q: "How long does a touch-up session take?",
    a: "Touch-up sessions typically take 1 to 2 hours depending on the area requiring attention.",
  },
];

const SMPTouchUpPage = () => {
  const sub = findSubService("scalp-micropigmentation", "smp-touch-up-session")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/scalp-micropigmentation/smp-touch-up-session",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Scalp Micropigmentation", path: "/scalp-micropigmentation" },
      { name: sub.subService.name, path: "/scalp-micropigmentation/smp-touch-up-session" },
    ]),
  ]);
  useCanonical("/scalp-micropigmentation/smp-touch-up-session");
  useOpenGraph(
    "SMP Touch Up Session Amersham | Scalp Micropigmentation Refresh | Men's Hair To Stay",
    "SMP touch-up sessions in Amersham. Refresh and maintain your scalp micropigmentation results at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "SMP Touch Up Session Amersham | Scalp Micropigmentation Refresh | Men's Hair To Stay";
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
      "SMP touch-up sessions in Amersham. Refresh and maintain your scalp micropigmentation results at Men's Hair To Stay. Serving Chesham, Beaconsfield, High Wycombe and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/scalp-micropigmentation/smp-touch-up-session"
      category="scalp-micropigmentation"
      subSlug="smp-touch-up-session"
      hero={{
        back: { to: "/scalp-micropigmentation", label: "Scalp Micropigmentation" },
        title: (
          <>
            Keep Your SMP Looking<br />
            <span className="text-mhts-red-light">Fresh and Sharp.</span>
          </>
        ),
        lead: (
          <>
            SMP touch-up sessions in Amersham, refresh your scalp micropigmentation and restore that just-treated definition whenever you need it.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is an SMP Touch-Up Session?</>,
        fact: "Touch-up sessions are typically shorter than the original treatment",
        body: (
          <>
            <p>
            Over time, scalp micropigmentation pigment naturally fades as part of
            the body's healing process and exposure to sunlight and the elements. A
            touch-up session refreshes and restores your SMP to its original
            sharpness, maintaining the density, hairline definition and overall
            appearance of your treatment.
            </p>
            <p>
            Touch-up sessions are typically shorter than the original treatment and
            focus on refreshing the areas where pigment has lightened most. Men's
            Hair To Stay offers SMP touch-up sessions for existing clients and for
            men who have had SMP performed elsewhere, serving clients across
            Amersham, Chesham, Beaconsfield, High Wycombe and surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose a Touch-Up Session", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "Most clients require a touch-up every 3 to 5 years",
        body: (
          <>
            <p>
            Men who have had a full SMP treatment and are noticing fading, reduced
            density or a softening of their hairline. Most clients require a touch-up
            every 3 to 5 years, though this varies based on skin type and sun exposure.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More SMP Services" }}
      cta={{
        title: <>Refresh Your Results. Book a Touch-Up.</>,
        text: <>SMP touch-up sessions available at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default SMPTouchUpPage;
