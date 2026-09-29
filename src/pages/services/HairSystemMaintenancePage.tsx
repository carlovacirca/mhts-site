import { useEffect } from "react";
import { CalendarCheck, Clock, Sparkles, ShieldCheck, Droplet, Scissors, MapPin, Users } from "lucide-react";
import { findCategory } from "@/data/services";
import { useJsonLd, useCanonical, useOpenGraph, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import ServicePage from "@/components/mhts/ServicePage";
import hairSystemMaintenanceHero from "@/assets/hair-system-maintenance-hero.jpg";

const pricingRows = [
  { name: "Hair System Reattachment & Restyling", price: "Quoted at your consultation", note: "Regroom · 1x adhesive" },
  { name: "Hair System Base Clean & Reattach", price: "Quoted at your consultation", note: "Regroom · 2x adhesive, includes base clean" },
  { name: "Hair System Full Maintenance Package", price: "Contact us for pricing" },
];


const benefits = [
  { icon: Clock, text: "Extends the lifespan of your hair system" },
  { icon: Sparkles, text: "Keeps your system looking freshly fitted" },
  { icon: ShieldCheck, text: "Professional adhesive removal and reapplication" },
  { icon: Droplet, text: "Deep cleaning to remove product and adhesive build-up" },
  { icon: Scissors, text: "Restyling to keep your look sharp and current" },
  { icon: CalendarCheck, text: "Regular appointments available to suit your schedule" },
  { icon: MapPin, text: "Locally based in Amersham for convenience" },
  { icon: Users, text: "Expert care from your original fitting specialists" },
];

const steps = [
  {
    title: "Assessment",
    desc: "We check the condition of your system, adhesive and base at every visit.",
  },
  {
    title: "Safe Removal",
    desc: "Your system is carefully removed using professional-grade adhesive solvents.",
  },
  {
    title: "Base Clean",
    desc: "The system base and your scalp are thoroughly cleaned and prepared.",
  },
  {
    title: "Reattachment",
    desc: "Fresh adhesive is applied and your system is professionally reattached.",
  },
  {
    title: "Restyle",
    desc: "Your system is washed, conditioned and styled to look its absolute best.",
  },
];

const faqs = [
  {
    q: "How often should I have my hair system maintained?",
    a: "We recommend a professional maintenance appointment every 4 to 6 weeks to keep your system secure, clean and looking its best.",
  },
  {
    q: "Can you maintain a system that was not fitted by you?",
    a: "Yes. We are happy to take on maintenance for systems fitted elsewhere and will always treat your system with the same level of care.",
  },
  {
    q: "What happens if I skip maintenance appointments?",
    a: "Adhesive breaks down over time, which can cause your system to lift, look unnatural or even become damaged. Regular maintenance protects your investment.",
  },
  {
    q: "Do you offer maintenance packages?",
    a: "Yes. Our Hair System Full Maintenance Package covers everything your system needs in a single comprehensive appointment.",
  },
  {
    q: "How long does a maintenance appointment take?",
    a: "A standard maintenance appointment typically takes between 60 and 90 minutes depending on the services required.",
  },
];

const HairSystemMaintenancePage = () => {
  const category = findCategory("hair-system-maintenance")!;

  useJsonLd([
    serviceSchema({
      name: category.name,
      description: category.intro,
      path: "/hair-system-maintenance",
    }),
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: "Hair System Maintenance", path: "/hair-system-maintenance" },
    ]),
  ]);
  useCanonical("/hair-system-maintenance");
  useOpenGraph(
    "Hair System Maintenance Amersham | Hair System Aftercare | Men's Hair To Stay",
    "Professional hair system maintenance in Amersham. Men's Hair To Stay offers reattachment, base cleans and full maintenance packages to keep your hair system looking perfect. Serving Buckinghamshire and Hertfordshire."
  );

  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      "Hair System Maintenance Amersham | Hair System Aftercare | Men's Hair To Stay";
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
      "Professional hair system maintenance in Amersham. Men's Hair To Stay offers reattachment, base cleans and full maintenance packages to keep your hair system looking perfect. Serving Buckinghamshire and Hertfordshire."
    );
    return () => {
      document.title = prevTitle;
      if (prevDesc) meta.setAttribute("content", prevDesc);
    };
  }, []);

  return (
    <ServicePage
      path="/hair-system-maintenance"
      category="hair-system-maintenance"
      hero={{
        eyebrow: "Hair System Maintenance",
        image: hairSystemMaintenanceHero,
        imageAlt: "Stylist performing hair system maintenance on a client",
        title: (
          <>
            Keep Your System Looking<br />
            <span className="text-mhts-red-light">Its Best.</span>
          </>
        ),
        lead: (
          <>
            Professional hair system maintenance in Amersham, reattachment, cleaning, restyling and full maintenance packages to protect your investment.
          </>
        ),
      }}
      pricing={pricingRows}
      about={{
        eyebrow: "About",
        title: <>What Is Hair System Maintenance?</>,
        fact: "keep your system looking freshly fitted at all times",
        body: (
          <>
            <p>
            A hair system is an investment, and like any investment, it needs
            regular professional care to perform at its best. Hair system
            maintenance covers everything from reattachment and restyling through
            to deep base cleans and full maintenance packages that keep your
            system looking freshly fitted at all times.
            </p>
            <p>
            At Men's Hair To Stay in Amersham, we offer a complete range of
            maintenance services to suit every client and every system. Whether
            you need a quick reattach, a thorough base clean or a comprehensive
            maintenance session, our team keeps your hair system in perfect
            condition, serving clients across Chesham, Beaconsfield,
            Rickmansworth, High Wycombe, Gerrards Cross and surrounding areas.
            </p>
          </>
        ),
      }}
      benefits={{ eyebrow: "Why Choose Professional Maintenance", title: "The Benefits", items: benefits }}
      who={{
        eyebrow: "Suitability",
        title: <>Who It's For</>,
        fact: "We recommend maintenance appointments every 4 to 6 weeks depending on your system type and lifestyle.",
        body: (
          <>
            <p>
            Hair system maintenance is essential for every man wearing a hair
            system. Whether you had your system fitted with us or elsewhere, our
            Amersham maintenance team will care for it professionally and keep it
            performing at its best. We recommend maintenance appointments every 4
            to 6 weeks depending on your system type and lifestyle. Available to
            clients across Amersham, Chesham, Beaconsfield, High Wycombe,
            Rickmansworth, Chorleywood, Chalfont St Giles, Chalfont St Peter,
            Gerrards Cross, Watford and Uxbridge.
            </p>
          </>
        ),
      }}
      steps={{ eyebrow: "The Process", title: "What to Expect", items: steps }}
      faq={{ eyebrow: "Questions", title: "Frequently Asked", items: faqs }}
      related={{ eyebrow: "Explore", title: "Maintenance Services" }}
      cta={{
        title: <>Protect Your Investment. Book a Maintenance Appointment.</>,
        text: <>Professional hair system maintenance at Men's Hair To Stay in Amersham.</>,
      }}
    />
  );
};

export default HairSystemMaintenancePage;
