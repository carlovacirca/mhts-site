import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ChevronRight, Phone, Scissors, Users, Award } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";

const primaryArea = {
  name: "Amersham",
  desc: "Georges Barbers has been Amersham's trusted barbershop since 1991. Located at 11 Chesham Road in the heart of town, we're the original local barber for men's cuts, skin fades, beard grooming, wet shaves and professional ear piercing — walk-ins welcome 7 days a week.",
};

const areas = [
  {
    name: "Chesham",
    copy: "Just minutes from Amersham, Chesham clients trust Georges Barbers for expert haircuts, skin fades, beard trims and ear piercing. A short drive for quality barbering.",
  },
  {
    name: "High Wycombe",
    copy: "Serving High Wycombe with traditional men's cuts, modern fades, beard grooming and professional ear piercing in a friendly Amersham barbershop.",
  },
  {
    name: "Beaconsfield",
    copy: "Beaconsfield gents choose Georges Barbers for sharp haircuts, expert beard trims, classic wet shaves and safe, professional ear piercing.",
  },
  {
    name: "Chalfont St Giles",
    copy: "Quality barber near me — Chalfont St Giles clients enjoy precision haircuts, fades, beard grooming and ear piercing with our experienced team.",
  },
  {
    name: "Little Chalfont",
    copy: "A trusted local barber for Little Chalfont — men's cuts, kids' cuts, beard trim and ear piercing in Amersham, just a short journey away.",
  },
  {
    name: "Gerrards Cross",
    copy: "Gerrards Cross clients visit us for expert cuts, traditional barbering, beard grooming and professional ear piercing in a welcoming environment.",
  },
  {
    name: "Amersham (Old Town & New Town)",
    copy: "Right on your doorstep at 11 Chesham Road — haircuts, fades, beard trims, wet shaves and ear piercing for all of Amersham.",
  },
  {
    name: "Throughout Buckinghamshire",
    copy: "Welcoming clients from across Buckinghamshire for professional barbershop services, beard grooming and ear piercing — a local barber worth the trip.",
  },
];

const reasons = [
  {
    icon: Users,
    title: "Walk-ins Welcome",
    copy: "No appointment needed for haircuts, fades, beard trims or wet shaves — just pop in 7 days a week.",
  },
  {
    icon: Scissors,
    title: "Expert Barbers",
    copy: "Three decades of experience delivering precise cuts, classic styles and modern fades for every client.",
  },
  {
    icon: Award,
    title: "Professional Service",
    copy: "Clean, friendly studio offering barbering and safe, professional ear piercing by appointment.",
  },
];

const relatedLinks = [
  { to: "/georges-barbers#gb-services", label: "Services" },
  { to: "/georges-barbers#gb-gallery", label: "Gallery" },
  { to: "/georges-barbers#gb-book", label: "Book" },
  { to: "/georges-barbers/faq", label: "FAQ" },
  { to: "/georges-barbers/blog", label: "Blog" },
  { to: "/georges-barbers#gb-contact", label: "Contact" },
];

const GBAreasServicedPage = () => {
  useSeo({
    title: "Barbershop & Ear Piercing Services Across Buckinghamshire | Georges Barber",
    description:
      "Professional barbershop services in Amersham, Chesham, High Wycombe, Beaconsfield, and throughout Buckinghamshire. Men's cuts, beard grooming, ear piercing.",
    canonicalPath: "/georges-barbers/areas-serviced",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Georges Barbers",
        image: "https://menshairtostay.co.uk/og-image.jpg",
        url: "https://menshairtostay.co.uk/georges-barbers",
        telephone: "+44 1494 432131",
        email: "georgesbarbers1991@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "11 Chesham Road",
          addressLocality: "Amersham",
          postalCode: "HP6 5HN",
          addressRegion: "Buckinghamshire",
          addressCountry: "GB",
        },
        areaServed: [
          "Amersham",
          "Chesham",
          "High Wycombe",
          "Beaconsfield",
          "Chalfont St Giles",
          "Little Chalfont",
          "Gerrards Cross",
          "Buckinghamshire",
        ],
        priceRange: "££",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "09:00",
            closes: "18:00",
          },
        ],
      },
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Georges Barbers", path: "/georges-barbers" },
        { name: "Areas Serviced", path: "/georges-barbers/areas-serviced" },
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
              <li aria-current="page" className="text-gb-gold">Areas Serviced</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gb-gold mb-4 font-body">
              <MapPin className="w-4 h-4" /> Service Areas
            </span>
            <h1 className="text-4xl md:text-6xl font-display text-gb-gold mb-5 leading-tight">
              Quality Barbershop Services Across Amersham & Buckinghamshire
            </h1>
            <p className="text-lg md:text-xl text-background/80 font-body max-w-2xl">
              Georges Barbers proudly serves Amersham and the wider Buckinghamshire area with
              expert haircuts, beard grooming and professional ear piercing. Walk-ins welcome
              7 days a week at 11 Chesham Road.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Primary area */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl text-gb-green font-semibold mb-4">
            Your Local Barber in {primaryArea.name}
          </h2>
          <div className="w-16 h-0.5 bg-gb-gold mb-6" />
          <p className="text-foreground/80 font-body leading-relaxed mb-6">{primaryArea.desc}</p>
          <p className="text-foreground/80 font-body leading-relaxed">
            Whether you're searching for a "barber near me" in Amersham, a sharp skin fade,
            a classic wet shave or safe, professional ear piercing, our experienced team
            delivers expert cuts and friendly service every visit.
          </p>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-display text-3xl md:text-4xl text-gb-green font-semibold text-center mb-3">
            Areas We Serve
          </h2>
          <div className="w-16 h-0.5 bg-gb-gold mx-auto mb-12" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {areas.map((a) => (
              <div key={a.name} className="bg-gb-cream rounded-lg p-6 border border-gb-gold/20 hover:border-gb-gold/60 transition-colors">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gb-gold mt-1 shrink-0" />
                  <div>
                    <h3 className="font-display text-xl text-gb-green font-semibold mb-2">{a.name}</h3>
                    <p className="text-foreground/80 font-body text-sm leading-relaxed">{a.copy}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose Georges */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-display text-3xl md:text-4xl text-gb-green font-semibold text-center mb-3">
            Why Choose Georges Barbers
          </h2>
          <div className="w-16 h-0.5 bg-gb-gold mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="bg-card rounded-lg p-8 border border-gb-gold/20 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gb-green mb-4">
                  <r.icon className="w-7 h-7 text-gb-gold" />
                </div>
                <h3 className="font-display text-xl text-gb-green font-semibold mb-2">{r.title}</h3>
                <p className="text-foreground/80 font-body text-sm leading-relaxed">{r.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gb-green rounded-xl p-10 text-center">
            <h2 className="font-display text-3xl text-gb-gold mb-3">Ready to Visit?</h2>
            <p className="text-background/80 font-body mb-6">
              Pop in to 11 Chesham Road, Amersham — walk-ins welcome 7 days a week. Piercing by appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/georges-barbers#gb-book"
                className="inline-flex items-center gap-2 bg-gb-gold text-gb-green font-semibold px-6 py-3 rounded-md hover:bg-gb-gold-light transition-colors font-body"
              >
                Book Now
              </Link>
              <a
                href="tel:01494432131"
                className="inline-flex items-center gap-2 text-background hover:text-gb-gold transition-colors font-body"
              >
                <Phone className="w-4 h-4" /> 01494 432131
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-2xl text-gb-green font-semibold text-center mb-6">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-4 py-2 rounded-md border border-gb-gold/40 text-gb-green hover:bg-gb-green hover:text-gb-gold transition-colors font-body text-sm"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GBAreasServicedPage;
