import { useEffect } from "react";
import { Route, MessageCircle, Palette, UserCheck, HeartHandshake, Clock, MapPin, Award } from "lucide-react";
import { findCategory, findSubService } from "@/data/services";
import { useCanonical, useOpenGraph, useJsonLd, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";

const benefits = [
  { icon: Route, text: "Complete end-to-end hair replacement service" },
  { icon: MessageCircle, text: "Expert consultation included at no charge" },
  { icon: Palette, text: "Fully customized system matched to your profile" },
  { icon: UserCheck, text: "Professional fitting by trained specialists" },
  { icon: HeartHandshake, text: "Aftercare and maintenance support included" },
  { icon: Clock, text: "Flexible ongoing maintenance appointments" },
  { icon: MapPin, text: "Local service based in Amersham" },
  { icon: Award, text: "Trusted by men across Buckinghamshire and Hertfordshire" },
];

const steps = [
  {
    title: "Free Consultation",
    desc: "Hair loss assessment and goal setting with our specialist team.",
  },
  {
    title: "System Selection",
    desc: "We source and customize your perfect system matched to you.",
  },
  {
    title: "Fitting Appointment",
    desc: "Professional fitting and styling session for a seamless result.",
  },
  {
    title: "Aftercare Briefing",
    desc: "Full guidance on home care and maintenance to protect your investment.",
  },
  {
    title: "Ongoing Support",
    desc: "We are here for every maintenance appointment after your fitting.",
  },
];

const faqs = [
  {
    q: "Is the consultation really free?",
    a: "Yes, completely. No pressure, no obligation, just an honest conversation about your options.",
  },
  {
    q: "How long does the full process take from consultation to fitting?",
    a: "From your consultation to your fitting day is typically 2 to 4 weeks, depending on system customization requirements.",
  },
  {
    q: "Do you offer a service for clients who already have a hair system?",
    a: "Yes. We can take over the maintenance and care of systems fitted elsewhere.",
  },
  {
    q: "Which areas do you cover?",
    a: "We are based in Amersham and serve clients from Chesham, Beaconsfield, Rickmansworth, Gerrards Cross, High Wycombe, Chorleywood, Chalfont St Giles, Watford, Uxbridge and surrounding areas.",
  },
];

const HairReplacementServicePage = () => {
  const sub = findSubService("hair-systems", "hair-replacement-service")!;
  useJsonLd([
    serviceSchema({
      name: sub.subService.name,
      description: sub.subService.blurb,
      path: "/hair-systems/hair-replacement-service",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair Systems", path: "/hair-systems" },
      { name: sub.subService.name, path: "/hair-systems/hair-replacement-service" },
    ]),
  ]);
  useCanonical("/hair-systems/hair-replacement-service");
  useOpenGraph(
    "Hair Replacement Service Amersham | Men's Hair To Stay",
    "Professional hair replacement service for men in Amersham. Custom hair systems fitted by specialists serving Chesham, Beaconsfield, High Wycombe, Rickmansworth and surrounding areas."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Hair Replacement Service Amersham | Men's Hair To Stay";
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
      "Professional hair replacement service for men in Amersham. Custom hair systems fitted by specialists serving Chesham, Beaconsfield, High Wycombe, Rickmansworth and surrounding areas."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-systems/hair-replacement-service"
      category="hair-systems"
      subSlug="hair-replacement-service"
      hero={{
        back: { to: "/hair-systems", label: "Hair Systems" },
        title: (
          <>
            Your Complete Hair<br />
            <span className="text-mhts-red-light">Replacement Service in Amersham.</span>
          </>
        ),
        lead: (
          <>
            From consultation to fitting to aftercare, Men's Hair To Stay provides a full end-to-end hair replacement service for men across Buckinghamshire and Hertfordshire.
          </>
        ),
      }}
      about={{
        eyebrow: "About",
        title: <>What Is the Hair Replacement Service?</>,
        fact: "the complete journey from your very first consultation through to your fitting and beyond",
        body: (
          <>
            <p>
            Our hair replacement service covers the complete journey from your very
            first consultation through to your fitting and beyond. We handle every
            detail, assessing your hair loss, sourcing and customizing your system,
            professionally fitting it and providing ongoing aftercare and maintenance
            support.
            </p>
            <p>
            Men's Hair To Stay is Amersham's dedicated hair replacement specialists,
            serving clients across Chesham, Beaconsfield, Rickmansworth, Chorleywood,
            Gerrards Cross, High Wycombe, Watford and Uxbridge with a personalized,
            expert service from start to finish.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Our Service", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "everything you need under one roof.",
        body: (
          <>
            <p>
            Any man experiencing hair loss who wants a complete, managed solution from
            a trusted local specialist. Whether you are new to hair systems or looking
            to switch providers, our hair replacement service gives you everything you
            need under one roof.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Related", title: "More Hair Systems Services" }}
      cta={{
        title: <>A Service Built Around You.</>,
        text: <>Start your hair replacement journey with a free consultation at Men's Hair To Stay, Amersham.</>,
      }}
    />
  );
};

export default HairReplacementServicePage;
