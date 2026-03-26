import { motion } from "framer-motion";
import { Scissors, Flame, CircleDot, Phone, Mail, MapPin, Users, Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import gbHero from "@/assets/gb-hero.jpg";
import gbGallery1 from "@/assets/gb-gallery-1.jpg";
import gbGallery2 from "@/assets/gb-gallery-2.jpg";
import gbGallery3 from "@/assets/gb-gallery-3.jpg";
import gbGallery4 from "@/assets/gb-gallery-4.jpg";
import gbGallery5 from "@/assets/gb-gallery-5.jpg";
import gbGallery6 from "@/assets/gb-gallery-6.jpg";

const services = [
  {
    icon: Scissors,
    name: "Men's Dry Cut",
    desc: "Classic cuts, fades, scissor work — tailored to your style.",
    price: "£20",
  },
  {
    icon: Scissors,
    name: "Seniors 65+",
    desc: "Quality cuts for our senior community. £15 Mon–Fri, £14.50 Wed.",
    price: "From £14.50",
  },
  {
    icon: Scissors,
    name: "Students 15–25",
    desc: "Great value cuts for students with valid ID.",
    price: "£18",
  },
  {
    icon: Scissors,
    name: "Boys Cuts",
    desc: "Ages 12–14 £16.50, 5–11 £15, up to 4 £12.",
    price: "From £12",
  },
  {
    icon: Scissors,
    name: "Flat Tops",
    desc: "Precision flat top cuts styled to perfection.",
    price: "£25.50",
  },
  {
    icon: Scissors,
    name: "Beard Trim & Reshape",
    desc: "Expert beard grooming — trim £8.50, reshape £10.50.",
    price: "From £8.50",
  },
  {
    icon: Scissors,
    name: "Ladies Dry Cuts",
    desc: "Professional ladies cuts in a relaxed setting.",
    price: "From £23.50",
  },
  {
    icon: Scissors,
    name: "Skin Fades",
    desc: "Sharp, clean skin fades — add-on to any cut.",
    price: "+£5",
  },
  {
    icon: CircleDot,
    name: "Ear Piercing",
    desc: "Professional piercing in a clean, sterile environment.",
    price: "£30",
  },
];

const reviews = [
  {
    name: "Paolo",
    text: "Parking is easy nearby, prices are good and I never wait long either.",
    rating: 5,
  },
  {
    name: "Peter",
    text: "People working there are lovely, very good hairdressers, one of a kind!",
    rating: 5,
  },
  {
    name: "Lesley",
    text: "Great haircut, friendly staff",
    rating: 5,
  },
];

const GBLanding = () => (
  <div className="gb-theme">
    {/* ─── HERO ─── */}
    <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden">
      <img src={gbHero} alt="Georges Barbers interior" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gb-green/75" />
      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-5xl md:text-7xl font-display text-gb-gold mb-4 leading-tight">
            Georges Barbers
          </h1>
          <p className="text-background/90 text-lg md:text-xl max-w-lg mx-auto font-body mb-8">
            Traditional gents barbershop & ear piercing studio — proudly serving the Amersham community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#gb-services"
              className="inline-block bg-gb-gold text-gb-green font-semibold px-8 py-3 rounded-md hover:bg-gb-gold-light transition-colors font-body"
            >
              Our Services
            </a>
            <a
              href="#gb-book"
              className="inline-block border-2 border-gb-gold text-gb-gold px-8 py-3 rounded-md hover:bg-gb-gold hover:text-gb-green transition-colors font-body"
            >
              Book a Visit
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── ABOUT (warm intro, no nav item) ─── */}
    <section className="py-16 bg-gb-cream">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-display text-gb-green mb-4">Welcome to Georges</h2>
          <div className="w-16 h-0.5 bg-gb-gold mx-auto mb-6" />
          <p className="text-foreground/80 font-body text-lg leading-relaxed">
            Georges Barbers has been a cornerstone of the Amersham community, offering classic cuts, hot towel shaves, and professional ear piercing in a warm, welcoming atmosphere. Walk-ins are always welcome — no appointment needed.
          </p>
        </motion.div>
      </div>
    </section>

    {/* ─── SERVICES (with pricing) ─── */}
    <section id="gb-services" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Services & Pricing" subtitle="Honest pricing, no hidden extras" brand="gb" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-gb-cream rounded-lg p-5 border border-gb-gold/20 hover:border-gb-gold/50 transition-colors text-center"
            >
              <s.icon className="w-7 h-7 text-gb-gold mx-auto mb-3" />
              <h3 className="font-display text-gb-green font-semibold mb-1">{s.name}</h3>
              <p className="text-muted-foreground text-xs font-body mb-3">{s.desc}</p>
              <span className="inline-block bg-gb-green text-gb-gold font-display font-semibold text-lg px-4 py-1 rounded-md">
                {s.price}
              </span>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-8 font-body">Walk-ins welcome • No appointment needed</p>
      </div>
    </section>

    {/* ─── GALLERY (with reviews) ─── */}
    <section id="gb-gallery" className="py-20 bg-gb-cream scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Gallery" subtitle="Cuts, fades & piercings from the chair" brand="gb" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
           <div className="aspect-square rounded-lg overflow-hidden border border-gb-gold/20">
             <img src={gbGallery1} alt="Gents haircut at Georges Barbers" className="w-full h-full object-cover object-top" />
           </div>
           <div className="aspect-square rounded-lg overflow-hidden border border-gb-gold/20">
             <img src={gbGallery6} alt="Gents haircut at Georges Barbers" className="w-full h-full object-cover object-top" />
           </div>
           <div className="aspect-square rounded-lg overflow-hidden border border-gb-gold/20">
             <img src={gbGallery2} alt="Gents haircut at Georges Barbers" className="w-full h-full object-cover object-top" />
           </div>
           <div className="aspect-square rounded-lg overflow-hidden border border-gb-gold/20">
             <img src={gbGallery3} alt="Ear piercing at Georges Barbers" className="w-full h-full object-cover object-center" />
           </div>
           <div className="aspect-square rounded-lg overflow-hidden border border-gb-gold/20">
             <img src={gbGallery5} alt="Piercing jewellery at Georges Barbers" className="w-full h-full object-cover object-center" />
           </div>
           <div className="aspect-square rounded-lg overflow-hidden border border-gb-gold/20">
             <img src={gbGallery4} alt="Ear piercing at Georges Barbers" className="w-full h-full object-cover object-center" />
           </div>
        </div>
        <p className="text-center text-muted-foreground text-sm mb-12 font-body">
          Follow us on Instagram for our latest work
        </p>

        {/* Reviews */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-display text-gb-green text-center mb-8">What Our Clients Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-lg p-6 border border-gb-gold/20"
              >
                <Quote className="w-6 h-6 text-gb-gold mb-3" />
                <p className="text-foreground/80 text-sm font-body mb-4 italic">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-gb-green font-semibold text-sm">{r.name}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }, (_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-gb-gold text-gb-gold" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ─── BOOK ─── */}
    <section id="gb-book" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Book a Visit" subtitle="Walk-ins welcome — or book ahead for your convenience" brand="gb" />
        <div className="max-w-2xl mx-auto">
          <div className="bg-gb-cream rounded-xl p-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Users className="w-7 h-7 text-gb-green" />
              <h3 className="font-display text-xl text-gb-green font-semibold">Walk-In Friendly</h3>
            </div>
            <p className="text-foreground/80 font-body mb-8 max-w-md mx-auto">
              No appointment? No problem. Georges Barbers operates on a walk-in basis — just pop in and take a seat. For busier times, you can book ahead below.
            </p>
            <div className="bg-card rounded-lg border border-gb-gold/20 p-10">
              <p className="text-muted-foreground text-sm font-body mb-2">Booking widget</p>
              <p className="text-xs text-muted-foreground font-body">
                Google Appointment Setter or HubSpot Meeting link will be embedded here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ─── CONTACT (with opening hours) ─── */}
    <section id="gb-contact" className="py-20 bg-gb-cream scroll-mt-20">
      <div className="container mx-auto px-4">
        <SectionHeading title="Find Us" subtitle="11 Chesham Road, Amersham HP6 5HN" brand="gb" />
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact details */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-gb-gold/20">
              <div className="space-y-4">
                <a href="tel:01494432131" className="flex items-center gap-3 text-gb-green hover:text-gb-gold transition-colors font-body">
                  <Phone className="w-5 h-5" />
                  <span className="text-lg font-semibold">01494 432131</span>
                </a>
                <a href="mailto:info@georgesbarbers.co.uk" className="flex items-center gap-3 text-gb-green hover:text-gb-gold transition-colors font-body">
                  <Mail className="w-5 h-5" />
                  <span>info@georgesbarbers.co.uk</span>
                </a>
                <div className="flex items-start gap-3 text-foreground/80 font-body">
                  <MapPin className="w-5 h-5 shrink-0 text-gb-green" />
                  <span>11 Chesham Road, Amersham HP6 5HN</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden border border-gb-gold/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.5!2d-0.607!3d51.674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s11+Chesham+Road+Amersham+HP6+5HN!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Georges Barbers location"
              />
            </div>
          </div>

          {/* Opening Hours */}
          <OpeningHours brand="gb" />
        </div>
      </div>
    </section>
  </div>
);

export default GBLanding;
