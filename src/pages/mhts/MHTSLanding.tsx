import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Award, Clock, Phone, Mail, MapPin, Star, Quote, AlertCircle, CalendarCheck, ChevronRight, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import mhtsHero from "@/assets/mhts-hero.jpg";
import mhtsBefore1 from "@/assets/mhts-before-1.jpg";
import mhtsAfter1 from "@/assets/mhts-after-1.jpg";
import mhtsBefore2 from "@/assets/mhts-before-2.jpg";
import mhtsAfter2 from "@/assets/mhts-after-2.jpg";
import mhtsBefore3 from "@/assets/mhts-before-3.jpg";
import mhtsAfter3 from "@/assets/mhts-after-3.jpg";

const services = [
  {
    name: "Hair Systems",
    desc: "Custom-fitted hair systems matched perfectly to your hair colour, texture and style. Undetectable, natural-looking results.",
  },
  {
    name: "Scalp Micropigmentation",
    desc: "Advanced pigmentation technique that replicates natural hair follicles for a fuller, natural look. Multiple sessions for best results.",
  },
  {
    name: "Hair Density",
    desc: "Effective solutions for thinning hair and improving hair density.",
  },
  {
    name: "Hair System Maintenance",
    desc: "Regular maintenance appointments to keep your hair system looking fresh, natural and long-lasting.",
  },
];

const steps = [
  {
    number: "01",
    title: "Free Consultation",
    desc: "A confidential, no-obligation consultation to understand your needs, assess your hair loss, and discuss the best solution for you.",
  },
  {
    number: "02",
    title: "Custom Design",
    desc: "Your specialist creates a personalised treatment plan. For hair systems, precise measurements and colour matching ensure a perfect fit.",
  },
  {
    number: "03",
    title: "Fitting & Treatment",
    desc: "Your hair system is expertly fitted or your SMP treatment is carried out with precision. Immediate, natural-looking results.",
  },
  {
    number: "04",
    title: "Aftercare & Maintenance",
    desc: "Ongoing support and regular maintenance appointments keep your results looking their best for the long term.",
  },
];

const maintenanceTips = [
  "Attend regular maintenance appointments every 4–6 weeks",
  "Use recommended gentle, sulphate-free shampoos",
  "Avoid excessive heat styling on hair systems",
  "Follow your specialist's aftercare instructions carefully",
  "Contact us immediately if you notice any issues",
];

const reviews = [
  {
    name: "Leigh",
    text: "Their expertise in fitting hair replacement systems is unmatched. My new hair replacement system looks incredibly natural and has completely transformed my appearance. They are truly the gold standard in the industry.",
    rating: 5,
  },
  {
    name: "Fayaz",
    text: "I had thinning hair and got a hair system and it looks amazing. The team are so nice, supportive and understanding. Having bad hair made me feel ugly and stressed out. I can guarantee you, you'll feel so much better. Lads, do it here!",
    rating: 5,
  },
  {
    name: "Sam",
    text: "The salon is friendly and welcoming. Lexie and Carly are incredibly talented, they know how to bring the best out of my hair and make me feel comfortable throughout every visit. Highly recommend.",
    rating: 5,
  },
];

const MHTSLanding = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      const d = e.data || {};
      if (d.type === "height" && iframeRef.current) {
        iframeRef.current.style.height = d.data + "px";
      }
      if (d.type === "scroll" && iframeRef.current) {
        iframeRef.current.scrollIntoView();
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="mhts-theme">
    {/* ─── HERO ─── */}
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <img src={mhtsHero} alt="Men's Hair To Stay studio" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-mhts-charcoal/90 via-mhts-charcoal/70 to-mhts-charcoal/40" />
      <div className="container mx-auto px-4 relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl"
        >
          <p className="text-mhts-white/60 uppercase tracking-[0.3em] text-sm mb-4 font-body">Specialist Hair Replacement</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-mhts-white mb-6 leading-tight">
            Your Confidence,<br />
            <span className="font-normal">Restored.</span>
          </h1>
          <p className="text-mhts-white/70 text-lg max-w-md mb-10 font-body">
            Premium hair systems & scalp micropigmentation — delivered with discretion in Amersham.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#mhts-book"
              className="inline-block bg-mhts-white text-mhts-charcoal font-medium px-8 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body tracking-wide"
            >
              Book Consultation
            </a>
            <a
              href="#mhts-services"
              className="inline-block border border-mhts-white/40 text-mhts-white px-8 py-3 rounded-sm hover:border-mhts-white hover:bg-mhts-white/10 transition-colors font-body tracking-wide"
            >
              View Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ─── TRUST STRIP ─── */}
    <section className="py-10 bg-mhts-charcoal">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto text-center">
          {[
            { icon: Shield, label: "100% Confidential" },
            { icon: Award, label: "Specialist Trained" },
            { icon: Clock, label: "By Appointment Only" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-center gap-3 text-mhts-white/80">
              <item.icon className="w-5 h-5 text-mhts-white/50" />
              <span className="text-sm tracking-wide font-body">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── SERVICES (with pricing) ─── */}
    <section id="mhts-services" className="py-20 bg-mhts-light scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">What We Offer</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Our Services</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-sm p-7 border border-border hover:border-mhts-slate/30 transition-colors relative flex flex-col h-full"
            >
              <h3 className="text-lg font-medium text-mhts-charcoal mb-3 tracking-wide whitespace-nowrap">{s.name}</h3>
              <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-10 font-body">
          All treatments begin with a free consultation. Contact us to discuss your needs.
        </p>
      </div>
    </section>

    {/* ─── HOW IT WORKS ─── */}
    <section id="mhts-how-it-works" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Your Journey</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">How It Works</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
        </div>
        <div className="max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex gap-6 mb-10 last:mb-0"
            >
              <div className="shrink-0 w-14 h-14 rounded-full border-2 border-mhts-charcoal flex items-center justify-center">
                <span className="text-mhts-charcoal font-body text-sm font-semibold">{step.number}</span>
              </div>
              <div className="pt-2">
                <h3 className="text-lg text-mhts-charcoal tracking-wide mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="w-px h-8 bg-border ml-0 mt-4" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ─── MAINTENANCE ─── */}
    <section className="py-16 bg-mhts-light">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Long-Term Care</p>
            <h2 className="text-2xl md:text-3xl text-mhts-charcoal font-light tracking-wide">Maintenance & Aftercare</h2>
            <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
          </div>
          <div className="bg-card rounded-sm p-8 border border-border">
            <p className="text-foreground/80 font-body mb-6 text-center leading-relaxed">
              Your hair system or SMP treatment is an investment. Regular maintenance keeps your results looking natural and long-lasting. Our specialist provides ongoing support tailored to your treatment.
            </p>
            <ul className="space-y-3">
              {maintenanceTips.map((tip) => (
                <li key={tip} className="flex items-start gap-3 text-sm font-body text-foreground/80">
                  <CheckCircle2 className="w-4 h-4 text-mhts-charcoal shrink-0 mt-0.5" />
                  {tip}
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <a
                href="#mhts-book"
                className="inline-flex items-center gap-2 text-mhts-charcoal font-body text-sm tracking-wide hover:text-mhts-slate transition-colors"
              >
                Book a maintenance appointment <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ─── GALLERY & TRANSFORMATIONS (with reviews) ─── */}
    <section id="mhts-gallery" className="py-20 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Real Results</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Gallery & Transformations</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
        </div>

        {/* Before/After grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto mb-16">
          {/* Left */}
          <div className="bg-mhts-light rounded-sm overflow-hidden border border-border">
            <div className="grid grid-cols-2">
              <div className="aspect-square overflow-hidden">
                <img src={mhtsBefore2} alt="Before hair system" className="w-full h-full object-cover object-top" />
              </div>
              <div className="aspect-square overflow-hidden border-l border-border">
                <img src={mhtsAfter2} alt="After hair system" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="p-3 text-center grid grid-cols-2">
              <span className="text-mhts-slate text-xs font-body uppercase tracking-wider">Before</span>
              <span className="text-mhts-slate text-xs font-body uppercase tracking-wider">After</span>
            </div>
          </div>
          {/* Previously left - now middle */}
          <div className="bg-mhts-light rounded-sm overflow-hidden border border-border">
            <div className="grid grid-cols-2">
              <div className="aspect-square overflow-hidden">
                <img src={mhtsBefore1} alt="Before hair system" className="w-full h-full object-cover object-top" />
              </div>
              <div className="aspect-square overflow-hidden border-l border-border">
                <img src={mhtsAfter1} alt="After hair system" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="p-3 text-center grid grid-cols-2">
              <span className="text-mhts-slate text-xs font-body uppercase tracking-wider">Before</span>
              <span className="text-mhts-slate text-xs font-body uppercase tracking-wider">After</span>
            </div>
          </div>
          {/* Right */}
          <div className="bg-mhts-light rounded-sm overflow-hidden border border-border">
            <div className="grid grid-cols-2">
              <div className="aspect-square overflow-hidden">
                <img src={mhtsBefore3} alt="Before hair system" className="w-full h-full object-cover object-top" />
              </div>
              <div className="aspect-square overflow-hidden border-l border-border">
                <img src={mhtsAfter3} alt="After hair system" className="w-full h-full object-cover object-top" />
              </div>
            </div>
            <div className="p-3 text-center grid grid-cols-2">
              <span className="text-mhts-slate text-xs font-body uppercase tracking-wider">Before</span>
              <span className="text-mhts-slate text-xs font-body uppercase tracking-wider">After</span>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-center text-mhts-slate uppercase tracking-[0.2em] text-xs mb-8 font-body">Client Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {reviews.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-mhts-light rounded-sm p-6 border border-border"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: r.rating }, (_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-mhts-charcoal text-mhts-charcoal" />
                  ))}
                </div>
                <p className="text-foreground/80 text-sm font-body mb-5 leading-relaxed">"{r.text}"</p>
                <span className="text-mhts-charcoal text-sm font-medium tracking-wide font-body">{r.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ─── BOOK ─── */}
    <section id="mhts-book" className="py-20 bg-mhts-charcoal scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-mhts-white/50 uppercase tracking-[0.2em] text-xs mb-3 font-body">Get Started</p>
          <h2 className="text-3xl md:text-4xl text-mhts-white font-light tracking-wide">Book a Consultation</h2>
          <div className="w-12 h-px bg-mhts-white/30 mx-auto mt-5" />
        </div>
        <div className="max-w-lg mx-auto">


          <div className="rounded-sm overflow-hidden border border-mhts-slate/30">
            <iframe
              src="https://carlo56fm.setmore.com/lexie"
              width="100%"
              height="500"
              style={{ border: 0 }}
              title="MHTS Booking"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    {/* ─── CONTACT (with opening hours) ─── */}
    <section id="mhts-contact" className="py-20 bg-mhts-light scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Contact</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5" />
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="space-y-6">
            <div className="bg-card rounded-sm p-6 border border-border">
              <div className="space-y-5">
                <a href="tel:07947878087" className="flex items-center gap-3 text-mhts-charcoal hover:text-mhts-slate transition-colors font-body">
                  <Phone className="w-5 h-5" />
                  <span className="text-lg tracking-wide">07947 878087</span>
                </a>
                <a href="mailto:info@georgesbarbers.co.uk" className="flex items-center gap-3 text-mhts-charcoal hover:text-mhts-slate transition-colors font-body">
                  <Mail className="w-5 h-5" />
                  <span className="font-body">info@georgesbarbers.co.uk</span>
                </a>
                <div className="flex items-start gap-3 text-foreground/80 font-body">
                  <MapPin className="w-5 h-5 shrink-0 text-mhts-charcoal" />
                  <span>11 Chesham Road, Amersham HP6 5HN</span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-sm overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.5!2d-0.607!3d51.674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s11+Chesham+Road+Amersham+HP6+5HN!5e0!3m2!1sen!2suk!4v1"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Men's Hair To Stay location"
              />
            </div>
          </div>

          {/* Opening Hours */}
          <OpeningHours brand="mhts" />
        </div>
      </div>
    </section>
  </div>
);

export default MHTSLanding;
