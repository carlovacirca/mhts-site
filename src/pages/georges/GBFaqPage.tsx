import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, HelpCircle, ChevronRight, Phone, MapPin } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";

interface FAQ {
  q: string;
  a: string;
}

const faqs: FAQ[] = [
  {
    q: "Do I Need an Appointment at Georges Barbers, or Can I Just Walk In?",
    a: `Yes, absolutely! Walk-ins are always welcome at Georges Barbers. You don't need to call ahead or book a time slot—simply visit us at 11 Chesham Road in Amersham whenever it's convenient for you.

Whether you need a quick haircut during your lunch break, a fade on Saturday afternoon, or a beard trim on your way home from work, our team of experienced barbers is ready to serve you.

However, please note:
• Barbering services (haircuts, fades, beard trims, wet shaves): Walk-ins always welcome, no appointment necessary
• Piercing services (ear piercing, body piercing): Appointments are required. Please call 01494 432131 to book your piercing appointment

Why we offer walk-in service: We understand that life is busy and scheduling isn't always convenient. By offering walk-in service, we ensure that quality barbering is accessible to Amersham residents whenever you need it. No need to plan ahead—just come in when you're ready.

Our hours: Open 7 days a week, so whether it's Monday morning or Sunday afternoon, we're here and ready to serve you.`,
  },
  {
    q: "What's the Difference Between a Skin Fade and Other Types of Haircuts?",
    a: `A skin fade is a modern barbering technique that creates a seamless gradient from the longest hair on top to bare skin (or very short hair) at the sides and back of your head.

How a Skin Fade Works: Instead of a distinct line between different hair lengths, a skin fade blends gradually from the top down. The transition is smooth and professional-looking from every angle. Hair on top might be 2-3 inches long; as you move down the sides, the hair gradually gets shorter; by the sides and back, the hair fades to skin (or nearly skin); the transition between lengths is blended seamlessly, not abrupt.

Types of Skin Fades We Offer:
• Low fade: The fade line sits just above the ear, creating a subtle gradient. Good for conservative professional looks.
• Mid fade: The fade line is at mid-head level, balancing length on top with shorter sides. Popular, versatile choice.
• High fade: The sides are faded dramatically short, nearly to skin, creating a bold, modern look.
• Burst fade: The fade curves around the back of the head rather than straight across, creating a three-dimensional effect.
• Temple fade: Precise fading specifically at the temples to define and shape the hairline.

Why Choose a Skin Fade? Modern appearance, versatility across hair types and face shapes, clean professional look, low maintenance, and styling versatility on top.

How It Differs from Other Cuts:
• Regular haircut: Maintains more length throughout, less dramatic contrast.
• Undercut: Distinct line between long top and very short sides (less blending than a fade).
• Crew cut: Shorter overall, uniform length.
• Buzz cut: Very short, same length all over.

Why Professional Execution Matters: A quality skin fade requires sharp clippers, expert blending technique, understanding hair growth patterns, and an eye for detail. At Georges Barbers, our experienced barbers have refined fade techniques over years of practice.

Ready for a skin fade? Visit us at 11 Chesham Road, Amersham. Walk-ins welcome, 7 days a week.`,
  },
  {
    q: "Are Your Barbers Good With Children? How Does a Kids' Haircut Work?",
    a: `Yes, we're great with kids! One of the things parents appreciate most about Georges Barbers is our genuine skill and patience with children's haircuts. We understand that getting a haircut can be intimidating for young children, and we've created an approach that makes the experience comfortable, positive, and even enjoyable.

Why Parents Choose Georges Barbers:
• Patience and gentleness — we work slowly and deliberately with children, never rushed or aggressive.
• Child-friendly communication — we talk to children in a friendly, respectful way and explain what we're doing.
• Comfortable environment — kids are made to feel genuinely welcome.
• Professional experience — our barbers have cut the hair of countless children over our 34 years in Amersham.
• Creating positive associations — a good first haircut creates a positive association that lasts.

What to Expect: We greet your child warmly, do a quick consultation about the style you want, then move slowly through the cut—checking in, taking breaks if needed—so your child leaves looking sharp and feeling proud.

Age Considerations:
• Babies and toddlers (under 3): Some may prefer sitting with a parent.
• Preschoolers (3-5): Often a great age for first haircuts.
• School-age (6-12): Comfortable, can communicate preferences.
• Teenagers: We work with their changing style preferences.

Popular Kids' Styles: Simple trims, buzz cuts, textured crops, fades with length on top, and classic cuts.

Walk in anytime — no appointment needed. Open 7 days a week.`,
  },
  {
    q: "What Piercing Services Do You Offer, and How Do I Book?",
    a: `Georges Barbers operates a professional ear piercing and body piercing studio alongside our barbering services. We offer safe, professional piercing services in a clean, hygienic environment by experienced piercers.

Professional Ear Piercing:
• Standard lobe piercings — first, second, or additional lobe piercings.
• Upper ear piercings — Helix, Tragus, Antitragus, Conch, and Daith piercings.
• Multiple/curated piercings — we can design and execute exactly what you envision.

Why professional ear piercing matters: Professional piercers use proper technique and equipment, which differs significantly from mall piercing guns. The result is better healing, lower infection risk, more precise placement, appropriate jewellery, and expert guidance throughout healing.

Body Piercing Services: Nose (nostril, septum), lip (centre, sides), eyebrow, and other locations on request.

How It Works: Consultation about location, goals, healing and aftercare → design and planning for placement → professional piercing in a clean environment with sterilised equipment → comprehensive aftercare guidance.

How to Book: Call 01494 432131. Piercing appointments are required — we don't do walk-in piercings. This allows us to properly prepare and ensure the best possible experience.

Good to know: Pain is brief (a few seconds of sensation). Lobes typically heal in 6-8 weeks; cartilage can take 3-12 months. Minors typically require parental consent.`,
  },
  {
    q: "What Are Your Hours, and Where Are You Located in Amersham?",
    a: `Georges Barbers is located at 11 Chesham Road, Amersham, Buckinghamshire HP6 5HN. We're open 7 days a week.

Hours: Open Monday–Sunday. Bank holidays generally open — call 01494 432131 to confirm. No appointment needed for barbering; piercing appointments by call only.

How to Find Us:
• By car: We're on Chesham Road with parking available on the street and in nearby car parks.
• By public transport: Amersham train station is within easy walking distance; multiple bus stops nearby.
• From London: Metropolitan Line to Amersham, then a short walk.
• Walking or cycling: Highly accessible — right in the heart of Amersham.

What to Expect: Easy walk-in entry, friendly greeting, comfortable waiting area, clean professional atmosphere. Most haircuts take 20-40 minutes.

Contact: Phone 01494 432131 — call to ask about services or pricing, book a piercing appointment, or check holiday hours. Visit in person at 11 Chesham Road, Amersham HP6 5HN. Walk-ins always welcome for haircuts, fades, beard trims, and shaves, 7 days a week.`,
  },
];

const GBFaqPage = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useSeo({
    title: "Georges Barbers FAQ | Walk-Ins, Fades, Kids' Cuts & Piercing",
    description:
      "Answers to common questions about Georges Barbers in Amersham — walk-ins, skin fades, kids' haircuts, ear & body piercing, hours, and location.",
    canonicalPath: "/georges-barbers/faq",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Georges Barbers", path: "/georges-barbers" },
        { name: "FAQ", path: "/georges-barbers/faq" },
      ]),
    ],
  });

  return (
    <div className="gb-theme bg-gb-cream min-h-screen">
      {/* Hero */}
      <section className="relative bg-gb-green text-background py-20 md:py-24">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="text-sm mb-6 text-background/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-gb-gold transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li><Link to="/georges-barbers" className="hover:text-gb-gold transition-colors">Georges Barbers</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li aria-current="page" className="text-gb-gold">FAQ</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gb-gold mb-4 font-body">
              <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-gb-gold mb-5 leading-tight">
              Georges Barbers FAQ
            </h1>
            <p className="text-lg md:text-xl text-background/80 font-body max-w-2xl">
              Everything you need to know about visiting Amersham's trusted barbershop & piercing studio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = openIdx === i;
              return (
                <div key={i} className="bg-card rounded-lg border border-gb-gold/20 overflow-hidden">
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    className="w-full flex items-center justify-between text-left px-6 py-5 hover:bg-gb-cream transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-gb-green font-semibold text-lg pr-4">{f.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gb-gold shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-foreground/80 font-body whitespace-pre-line leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 bg-gb-green rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl text-gb-gold mb-3">Still have a question?</h2>
            <p className="text-background/80 font-body mb-6">Give us a call or pop in — we're happy to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:01494432131" className="inline-flex items-center gap-2 bg-gb-gold text-gb-green font-semibold px-6 py-3 rounded-md hover:bg-gb-gold-light transition-colors font-body">
                <Phone className="w-4 h-4" /> 01494 432131
              </a>
              <span className="inline-flex items-center gap-2 text-background/80 font-body">
                <MapPin className="w-4 h-4 text-gb-gold" /> 11 Chesham Road, Amersham HP6 5HN
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GBFaqPage;
