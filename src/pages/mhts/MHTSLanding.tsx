import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Award, Clock, Phone, Mail, MapPin, Star, Quote, AlertCircle, CalendarCheck, ChevronRight, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import SectionHeading from "@/components/SectionHeading";
import OpeningHours from "@/components/OpeningHours";
import { blogPosts } from "@/data/blogPosts";
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
    slug: "hair-systems",
    desc: "Custom-fitted hair systems matched perfectly to your hair colour, texture and style. Undetectable, natural-looking results.",
  },
  {
    name: "Scalp Micropigmentation",
    slug: "scalp-micropigmentation",
    desc: "Advanced pigmentation technique that replicates natural hair follicles for a fuller, natural look. Multiple sessions for best results.",
  },
  {
    name: "Hair Density",
    slug: "hair-density",
    desc: "Effective solutions for thinning hair and improving hair density.",
  },
  {
    name: "Hair System Maintenance",
    slug: "hair-system-maintenance",
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
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://menshairtostay.trafft.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
    <section className="py-14 bg-mhts-charcoal">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: Shield,
              title: "100% Confidential",
              desc: "Discreet, judgement-free service. Your privacy is protected at every stage of consultation and treatment.",
            },
            {
              icon: Award,
              title: "Specialist Trained",
              desc: "Expert specialists in hair systems, SMP (scalp micropigmentation), and ongoing maintenance.",
            },
            {
              icon: CalendarCheck,
              title: "8+ Years Experience",
              desc: "Proven expertise in hair loss solutions and non-surgical hair replacement, delivered professionally.",
            },
            {
              icon: Clock,
              title: "By Appointment Only",
              desc: "Private one-to-one consultations at our Amersham studio — never rushed, always tailored to you.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-mhts-charcoal/40 border border-mhts-white/10 rounded-sm p-5 text-center md:text-left"
            >
              <item.icon className="w-6 h-6 text-mhts-white/70 mb-3 mx-auto md:mx-0" />
              <h3 className="text-mhts-white text-sm font-medium tracking-wide font-body mb-2">
                {item.title}
              </h3>
              <p className="text-mhts-white/60 text-xs font-body leading-relaxed">{item.desc}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/${s.slug}`}
                className="group bg-card rounded-sm p-7 border border-border hover:border-mhts-slate/40 transition-colors relative flex flex-col h-full"
              >
                <h3 className="text-lg font-medium text-mhts-charcoal mb-3 tracking-wide whitespace-nowrap">{s.name}</h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body mt-5 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-sm mt-10 font-body">
          All treatments begin with a free consultation. Contact us to discuss your needs.
        </p>
      </div>
    </section>

    {/* HOW IT WORKS — moved to dedicated /how-it-works page */}

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

    {/* ─── FAQ PREVIEW ─── */}
    <section className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Your Questions Answered</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Frequently Asked Questions About Hair Systems &amp; SMP</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5 mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Everything you need to know about our hair replacement, maintenance, and scalp micropigmentation services.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left font-medium text-mhts-charcoal">
                How long does a hair system last?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                A high-quality hair system typically lasts 6–12 months with proper care and regular maintenance. We recommend a regroom or maintenance appointment every 4–6 weeks to keep your hair system looking fresh, natural, and undetectable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-left font-medium text-mhts-charcoal">
                Is hair replacement undetectable?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                Yes — when expertly fitted and styled, our hair systems are virtually undetectable. We custom-match hair colour, density, and texture to blend seamlessly with your natural hair for a completely natural look.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-left font-medium text-mhts-charcoal">
                Is SMP painful?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                Scalp micropigmentation (SMP) is a non-invasive treatment with minimal discomfort. Most clients describe the sensation as mild and tolerable. A topical numbing agent can be applied to ensure your session is as comfortable as possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger className="text-left font-medium text-mhts-charcoal">
                How much does a consultation cost?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                Your initial consultation is completely free. There is no obligation — we will assess your hair loss, discuss your goals, and recommend the best hair system or SMP treatment for your needs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q5">
              <AccordionTrigger className="text-left font-medium text-mhts-charcoal">
                How often does a hair system need maintenance?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                We recommend booking a maintenance or regroom appointment every 4–6 weeks. Regular upkeep ensures your hair system remains secure, clean, and styled perfectly — extending its lifespan and keeping it undetectable.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q6">
              <AccordionTrigger className="text-left font-medium text-mhts-charcoal">
                Is SMP permanent?
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 font-body leading-relaxed">
                SMP is considered semi-permanent. The results typically last 3–5 years before a touch-up is needed. It is a long-lasting, non-invasive solution for thinning hair and receding hairlines, requiring minimal ongoing maintenance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-10 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white px-8 py-3 rounded-sm hover:bg-mhts-slate transition-colors font-body tracking-wide"
            >
              View All FAQs <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* ─── BLOG PREVIEW ─── */}
    <section className="py-20 bg-mhts-light scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">From The Blog</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">Latest Articles &amp; Expert Advice on Hair Replacement</h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5 mb-4" />
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            Insights, guides, and expert advice on hair systems, scalp micropigmentation (SMP), maintenance, and non-surgical hair replacement.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[...blogPosts]
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 3)
            .map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-sm border border-border overflow-hidden flex flex-col hover:border-mhts-slate/40 transition-colors"
              >
                {post.image && (
                  <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <time className="text-xs text-mhts-slate uppercase tracking-wider font-body mb-3">
                    {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <h3 className="text-lg font-medium text-mhts-charcoal mb-3 leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-mhts-slate transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground text-sm font-body leading-relaxed flex-1 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-mhts-charcoal text-sm font-body mt-5 hover:gap-2 transition-all"
                  >
                    Read More <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white px-8 py-3 rounded-sm hover:bg-mhts-slate transition-colors font-body tracking-wide"
          >
            Visit Our Blog <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* ─── BOOK ─── */}
    <section id="mhts-book" className="pt-20 pb-4 bg-mhts-light scroll-mt-20">
      <div className="w-full">
        <div className="text-center mb-10 px-4">
          <h2 className="font-display text-3xl md:text-4xl text-mhts-charcoal tracking-wide mb-3">Book a Consultation</h2>
          <p className="text-mhts-slate font-body text-base md:text-lg max-w-xl mx-auto">Select a date and time below to book your free consultation with our specialist team.</p>
        </div>
        <div
          className="embedded-booking w-full"
          data-url="https://menshairtostay.trafft.com"
          data-query="&t=s&uuid=848c1e33-c5d4-4dc8-a7de-94102b7c344b"
          data-lang="en"
          data-autoresize="1"
          data-showsidebar="1"
          data-showservices="0"
          style={{ minWidth: "320px", width: "100%" }}
        />
      </div>
    </section>

    {/* ─── AREAS SERVICED PREVIEW ─── */}
    <section id="mhts-areas" className="py-16 bg-card">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <p className="text-mhts-slate uppercase tracking-[0.2em] text-xs mb-3 font-body">Where We Serve</p>
          <h2 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
            Service Areas Across Buckinghamshire
          </h2>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto mt-5 mb-6" />
          <p className="text-foreground/80 font-body max-w-3xl mx-auto">
            We serve clients across Amersham and surrounding areas. Whether you're in Chesham,
            High Wycombe, Beaconsfield, or anywhere in Buckinghamshire, our specialist technicians
            are ready to help with professional hair replacement systems and scalp micropigmentation (SMP) solutions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            "Amersham",
            "Chesham",
            "High Wycombe",
            "Beaconsfield",
            "Chalfont St Giles",
            "Little Chalfont",
            "Gerrards Cross",
            "Throughout Buckinghamshire",
          ].map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-mhts-light text-mhts-charcoal text-sm font-body"
            >
              <MapPin className="w-3.5 h-3.5" />
              {area}
            </span>
          ))}
        </div>
        <div className="text-center">
          <Link
            to="/areas-serviced"
            className="inline-flex items-center gap-2 bg-mhts-charcoal text-mhts-white px-8 py-3 rounded-sm hover:bg-mhts-slate transition-colors font-body tracking-wide"
          >
            Explore All Service Areas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>

    {/* ─── CONTACT (with opening hours) ─── */}
    <section id="mhts-contact" className="pt-8 pb-20 bg-mhts-light scroll-mt-20">
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
                <a href="mailto:georgesbarbers1991@gmail.com" className="flex items-center gap-3 text-mhts-charcoal hover:text-mhts-slate transition-colors font-body">
                  <Mail className="w-5 h-5" />
                  <span className="font-body">georgesbarbers1991@gmail.com</span>
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
};

export default MHTSLanding;
