import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Phone, MapPin, Calendar, Scissors } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import gbHero from "@/assets/gb-hero.jpg";

const sections: { heading?: string; subheading?: string; paragraphs?: string[]; bullets?: string[] }[] = [
  {
    paragraphs: [
      "Welcome to Georges Barbers, Amersham's most trusted barbershop for over three decades. Since 1991, we've been the go-to destination for quality men's grooming, expert haircuts, and professional ear piercing services right here on Chesham Road in the heart of Amersham.",
      "Whether you're looking for a classic barber haircut, a sharp skin fade, a precise beard trim, or a professional wet shave, our experienced barbers have the skill and expertise to deliver exactly what you need. Better yet, we don't require appointments—walk-ins are always welcome at our Amersham barbershop.",
      "Let's explore why Georges Barbers has become Amersham's original and most beloved barbershop for generations of local men and their families.",
    ],
  },
  {
    heading: "Why Choose Georges Barbers: Amersham's Premium Barbershop",
    subheading: "Over 34 Years of Barbering Excellence",
    paragraphs: [
      "When you visit Georges Barbers on Chesham Road, you're not just getting a haircut—you're experiencing nearly three and a half decades of barbering tradition and expertise. Since 1991, our barbershop has been a cornerstone of the Amersham community, earning the trust of countless customers through consistent quality, professional service, and genuine care for every client who walks through our doors.",
      "Our longevity in Amersham's competitive barbering market isn't accidental. It's the result of:",
    ],
    bullets: [
      "Expert barbers who genuinely care about their craft",
      "Consistent quality across every service",
      "Welcoming atmosphere that keeps customers returning",
      "Community commitment to serving Amersham residents",
      "Proven track record spanning three decades",
    ],
  },
  {
    subheading: "Walk-Ins Always Welcome – No Appointment Necessary",
    paragraphs: [
      "Life is busy. We understand that scheduling an appointment isn't always convenient. That's why at Georges Barbers, walk-ins are always welcome.",
      "You don't need to plan ahead or call ahead. Whether you're passing by on Chesham Road, have an unexpected grooming need, or simply prefer the flexibility of dropping in when it suits you, our team of expert barbers is ready to serve you.",
      "No appointment required. No waiting lists. Just quality barbering whenever you need it.",
    ],
  },
  {
    subheading: "Open 7 Days a Week for Your Convenience",
    paragraphs: [
      "We know that convenience matters. Whether you prefer weekend barbering, need a weekday trim during a lunch break, or want flexibility in your schedule, Georges Barbers is open seven days a week.",
    ],
    bullets: [
      "Monday through Friday: Professional barbering for working professionals and families",
      "Saturday: The busiest day for our Amersham barbershop—perfect for weekend grooming",
      "Sunday: Yes, we're open Sundays too, because we understand that grooming doesn't fit into traditional hours",
    ],
  },
  {
    heading: "Our Complete Barbering Services",
    subheading: "Expert Haircuts for Every Style",
    paragraphs: [
      "Our barbers specialise in delivering the exact haircut you're looking for, whether that's classic, contemporary, or completely custom.",
    ],
    bullets: [
      "Classic barber haircuts with clean lines and professional finish",
      "Modern cuts with contemporary styling and texture",
      "Custom cuts tailored to your face shape, hair type, and personal preference",
      "Precision tapering for seamless blending",
      "Children's haircuts — we're great with kids",
      "Senior haircuts — respectful, patient service for older clients",
    ],
  },
  {
    subheading: "Sharp Skin Fades: The Modern Barbershop Essential",
    paragraphs: [
      "Skin fades are one of the most popular modern barbering techniques, and at Georges Barbers, we've perfected the art. A skin fade creates a seamless gradient from the longest hair on top to bare skin at the sides and back, with the transition blended to perfection.",
    ],
    bullets: [
      "Low fades — subtle graduation ending just above the ear",
      "Mid fades — classic fade line at mid-head level",
      "High fades — dramatic fade clearing the sides completely",
      "Burst fades — curved fading around the back of the head",
      "Temple fades — precise fading at the temples for definition",
    ],
  },
  {
    subheading: "Precision Beard Trims: Sculpting Your Look",
    paragraphs: [
      "A beard is a statement, and keeping it looking sharp requires expertise. Our barbers specialise in professional beard trimming that maintains the shape you want while keeping your beard healthy and impressive.",
    ],
    bullets: [
      "Beard trims — maintaining shape and length",
      "Beard shaping — sculpting a new beard into the desired style",
      "Cheek line definition — precise cleanup for a clean appearance",
      "Neck line sculpting — sharp neckline definition",
      "Moustache trimming — standalone moustache care",
      "Beard conditioning treatments — keeping your beard healthy",
    ],
  },
  {
    subheading: "Classic Wet Shaves: The Barbershop Experience",
    paragraphs: [
      "There's something distinctly luxurious about a professional wet shave. At Georges Barbers, we offer the traditional barbershop experience of a proper wet shave—part grooming service, part genuine pampering.",
    ],
    bullets: [
      "Hot towel treatment — opening pores and softening whiskers",
      "Premium shaving cream application — rich lather for smooth shaving",
      "Expert razor work — precise technique for the closest shave",
      "Aftershave balm — soothing and conditioning the skin",
      "Complete relaxation — taking time to enjoy the experience",
    ],
  },
  {
    subheading: "Services for All Ages: From Babies to Seniors",
    paragraphs: [
      "One of the things that sets Georges Barbers apart is our commitment to serving customers of all ages. We're not just a barbershop for young professionals—we're Amersham's barbershop for everyone: babies, children, teenagers, working professionals, and seniors. Customers from 6 months old to 90+ years old feel welcome and cared for here.",
    ],
  },
  {
    heading: "Professional Ear Piercing and Body Piercing Studio",
    paragraphs: [
      "Beyond barbering, Georges Barbers operates a professional ear piercing and body piercing studio. If you're considering piercings in Amersham, our experienced, professional team provides safe, clean, and hygienic piercing services.",
    ],
    bullets: [
      "Standard lobe piercings — the classic ear piercing location",
      "Upper ear piercings — helix, tragus, and other cartilage locations",
      "Multiple piercings — creating curated ear configurations",
      "Body piercings — nose, lip, eyebrow, and other locations",
      "Sterilised equipment meeting professional standards",
      "Quality jewellery and thorough aftercare guidance",
    ],
  },
  {
    heading: "Located on Chesham Road in the Heart of Amersham",
    paragraphs: [
      "Georges Barbers, 11 Chesham Road, Amersham, Buckinghamshire HP6 5HN. Our Chesham Road location puts us right in the heart of Amersham, easily accessible whether you're local or visiting—on foot, by bike, by car, or by public transport. Amersham train station is within easy walking distance.",
      "Our three decades in Amersham means we're genuinely embedded in the community. We're not a chain barbershop or a newcomer—we're a local institution that's served generations of Amersham families.",
    ],
  },
  {
    heading: "The Georges Barbers Experience: What to Expect",
    paragraphs: [
      "When you walk into Georges Barbers on Chesham Road, you'll be greeted warmly by our team. Our barbers will ask what you're looking for, listen carefully, and offer professional recommendations based on your hair type, face shape, and personal preference.",
      "Whether you're in the chair for 15 minutes for a quick trim or 45 minutes for a complete wet shave experience, you'll receive full attention and professional expertise. You'll leave looking and feeling your best—the consistent, impressive results that have kept customers coming back for 34 years.",
    ],
  },
  {
    heading: "Quick Facts About Georges Barbers",
    bullets: [
      "Established: 1991",
      "Location: 11 Chesham Road, Amersham, Buckinghamshire HP6 5HN",
      "Years of service: Over 34 years",
      "Hours: Open 7 days a week",
      "Walk-ins: Always welcome for barbering services",
      "Services: Haircuts, skin fades, beard trims, wet shaves, ear & body piercing",
      "Phone: 01494 432131",
      "Parking: Available on Chesham Road and nearby streets",
    ],
  },
];

const GBBlogPage = () => {
  useSeo({
    title: "Georges Barbers Amersham | Original Barbershop Since 1991",
    description:
      "Georges Barbers — Amersham's original gents barbershop since 1991. Expert haircuts, fades, beard trims, wet shaves & ear piercing. Walk-ins welcome, open 7 days.",
    canonicalPath: "/georges-barbers/blog",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Georges Barbers", path: "/georges-barbers" },
        { name: "Blog", path: "/georges-barbers/blog" },
      ]),
    ],
  });

  return (
    <div className="gb-theme bg-gb-cream min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <img src={gbHero} alt="Georges Barbers Amersham" className="absolute inset-0 w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gb-green/85" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          <nav aria-label="Breadcrumb" className="text-sm mb-6 text-background/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="hover:text-gb-gold transition-colors">Home</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li><Link to="/georges-barbers" className="hover:text-gb-gold transition-colors">Georges Barbers</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li aria-current="page" className="text-gb-gold">Blog</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gb-gold mb-4 font-body">
              <Scissors className="w-4 h-4" /> From the Barbershop
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-gb-gold mb-5 leading-tight">
              Georges Barbers Amersham — Original Barbershop Since 1991
            </h1>
            <p className="text-lg md:text-xl text-background/80 font-body max-w-2xl">
              Expert haircuts, fades, beard trims, wet shaves & ear piercing on Chesham Road. Walk-ins welcome, open 7 days.
            </p>
            <div className="flex items-center gap-4 mt-6 text-background/70 text-sm font-body">
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Updated 2026</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> 11 Chesham Road, Amersham</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <article className="space-y-10">
            {sections.map((s, i) => (
              <div key={i} className="space-y-4">
                {s.heading && (
                  <h2 className="text-3xl font-display text-gb-green border-b border-gb-gold/30 pb-3">{s.heading}</h2>
                )}
                {s.subheading && (
                  <h3 className="text-xl font-display text-gb-green font-semibold">{s.subheading}</h3>
                )}
                {s.paragraphs?.map((p, j) => (
                  <p key={j} className="text-foreground/85 font-body leading-relaxed">{p}</p>
                ))}
                {s.bullets && (
                  <ul className="space-y-2 pl-1">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-foreground/85 font-body leading-relaxed">
                        <span className="text-gb-gold mt-1.5 shrink-0">◆</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>

          {/* CTA */}
          <div className="mt-14 bg-gb-green rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl text-gb-gold mb-3">Visit Amersham's Original Barbershop</h2>
            <p className="text-background/80 font-body mb-6 max-w-xl mx-auto">
              Walk in any day for haircuts, fades, beard trims and wet shaves. Call ahead for piercing appointments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="tel:01494432131" className="inline-flex items-center gap-2 bg-gb-gold text-gb-green font-semibold px-6 py-3 rounded-md hover:bg-gb-gold-light transition-colors font-body">
                <Phone className="w-4 h-4" /> 01494 432131
              </a>
              <Link to="/georges-barbers#gb-book" className="inline-flex items-center gap-2 border-2 border-gb-gold text-gb-gold px-6 py-3 rounded-md hover:bg-gb-gold hover:text-gb-green transition-colors font-body">
                Book a Visit
              </Link>
            </div>
            <p className="text-background/70 text-sm font-body mt-5 inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gb-gold" /> 11 Chesham Road, Amersham HP6 5HN — Open 7 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GBBlogPage;
