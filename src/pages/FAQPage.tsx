import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import {
  Search,
  ChevronDown,
  Printer,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
  CalendarCheck,
  HelpCircle,
} from "lucide-react";

type Category = "Hair Systems" | "SMP" | "General";

interface FAQ {
  q: string;
  a: string;
  category: Category;
}

const faqs: FAQ[] = [
  {
    category: "Hair Systems",
    q: "What is a hair system and how does it work?",
    a: "A hair system, also known as a hair replacement system or non-surgical hair replacement, is a custom-designed hairpiece that provides a natural-looking solution for hair loss. Hair systems work by attaching a base material containing real or synthetic hair to the scalp using medical-grade adhesives or tapes. Our premium hair replacement systems are virtually undetectable and offer immediate results for men and women experiencing male pattern baldness, female pattern hair loss, alopecia, or thinning hair.",
  },
  {
    category: "Hair Systems",
    q: "How long do hair systems last?",
    a: "The lifespan of a hair system depends on the quality, maintenance, and daily wear. Our premium human hair systems typically last 6–12 months with proper care and regular maintenance appointments. Synthetic hair systems generally last 3–6 months. Factors affecting longevity include adhesive quality, cleaning routine, styling habits, and environmental exposure. We recommend monthly maintenance visits to ensure your hair replacement system remains secure, natural-looking, and in optimal condition.",
  },
  {
    category: "Hair Systems",
    q: "Are hair systems detectable or do they look natural?",
    a: "Modern hair systems are virtually undetectable when professionally fitted and maintained. Our custom hair replacement solutions feature ultra-thin base materials, hand-tied hair strands, and natural hairlines that mimic real hair growth patterns. The key to an undetectable hair system is customisation — we match hair colour, texture, density, and wave pattern to your existing hair. With proper application by our trained hair restoration specialists, even close inspection won't reveal you're wearing a hair system.",
  },
  {
    category: "Hair Systems",
    q: "Can I swim, shower, and exercise with a hair system?",
    a: "Yes! You can maintain an active lifestyle with a hair system. Our non-surgical hair replacement solutions are designed for daily wear through swimming, showering, exercising, and sleeping. We use waterproof, sweat-resistant adhesives and tapes that secure your hair system during physical activities. However, chlorine, saltwater, and excessive sweating can affect the adhesive bond and hair quality, so we recommend using protective leave-in conditioners and scheduling regular maintenance to ensure your hair replacement system stays secure and looking its best.",
  },
  {
    category: "Hair Systems",
    q: "How much does a hair system cost?",
    a: "Hair system cost varies based on customisation, hair type, base material, and maintenance requirements. Initial investment for a custom hair replacement system ranges from £400–£2,400, with monthly maintenance costs between £80–£240. While this may seem significant, compared to hair transplant surgery costing £3,000–£12,000, hair systems offer an affordable, non-invasive alternative with immediate results. We offer financing options and package deals for long-term clients seeking ongoing hair restoration solutions.",
  },
  {
    category: "Hair Systems",
    q: "What's the difference between a hair system and a wig?",
    a: "Hair systems differ significantly from traditional wigs. While wigs are removable hairpieces worn temporarily, hair systems are semi-permanent hair replacement solutions that attach securely to the scalp for weeks at a time. Hair systems feature thinner, more natural-looking base materials, custom hairlines, and allow for styling versatility. Unlike wigs, you can sleep, shower, and exercise while wearing a hair system. Our custom hair replacement systems are specifically designed to match your natural hair characteristics, providing a more realistic and undetectable solution for hair loss.",
  },
  {
    category: "Hair Systems",
    q: "How is a hair system attached to my head?",
    a: "Hair system attachment uses medical-grade adhesives, tapes, or a combination of both methods. The attachment process involves thorough scalp preparation, including cleaning and removing oils, followed by precise application of bonding agents to ensure a secure hold lasting 2–6 weeks. Our hair restoration specialists select the appropriate attachment method based on your scalp condition, lifestyle, and wearing preferences. Some clients prefer liquid adhesives for maximum hold, while others choose tape for easier removal and reapplication during maintenance appointments.",
  },
  {
    category: "Hair Systems",
    q: "Can I style and colour my hair system?",
    a: "Human hair systems can be cut, styled, coloured, and heat-styled just like natural hair. You can use hair dryers, straighteners, curling irons, and styling products to achieve your desired look. Our hair replacement specialists recommend using heat protectants and sulphate-free products to extend the lifespan of your hair system. Synthetic hair systems have limited styling capabilities and cannot be coloured or heat-styled. For maximum versatility, we recommend premium human hair systems that allow complete styling freedom while maintaining a natural appearance.",
  },
  {
    category: "Hair Systems",
    q: "How often do I need maintenance for my hair system?",
    a: "Regular hair system maintenance is essential for optimal appearance and longevity. We recommend professional maintenance appointments every 3–4 weeks, which include cleaning the scalp, removing residual adhesive, reattaching the hair system with fresh bonding agents, trimming, styling, and blending with your natural hair. Between appointments, daily home care involves gentle washing, conditioning, and minimal heat styling. Consistent maintenance ensures your non-surgical hair replacement remains secure, comfortable, and undetectable while preventing scalp issues and extending the hair system's lifespan.",
  },
  {
    category: "Hair Systems",
    q: "Will wearing a hair system damage my existing hair?",
    a: "When properly fitted and maintained, hair systems do not damage existing hair. Our hair restoration specialists ensure the base material doesn't cover areas with healthy hair growth. The adhesives we use are specifically formulated to bond with the scalp without harming hair follicles. However, improper removal, using harsh chemicals, or neglecting maintenance can potentially cause damage. We provide comprehensive education on proper hair system care and professional removal services to protect your natural hair and scalp health throughout your hair replacement journey.",
  },
  {
    category: "SMP",
    q: "What is scalp micropigmentation (SMP)?",
    a: "Scalp micropigmentation (SMP) is a non-surgical hair loss treatment that uses specialised micro-needles to deposit pigment into the scalp's dermal layer, creating the appearance of natural hair follicles. This innovative hair restoration technique effectively treats male pattern baldness, female hair loss, alopecia, thinning hair, and scalp scarring. SMP provides the illusion of a fuller head of hair, defined hairline, or closely-shaved hairstyle. Unlike temporary solutions, scalp micropigmentation offers long-lasting results, typically lasting 3–5 years before requiring touch-ups.",
  },
  {
    category: "SMP",
    q: "How long does scalp micropigmentation last?",
    a: "Scalp micropigmentation results typically last 3–5 years before fading requires touch-up sessions. Longevity depends on factors including skin type, sun exposure, skincare routine, and pigment quality. Unlike tattoos that turn blue or green, our specialised SMP pigments are formulated to fade naturally without colour change. Most clients schedule touch-up appointments every 3–4 years to maintain optimal density and colour saturation. Proper aftercare, including sun protection and gentle cleansing, significantly extends the lifespan of your scalp micropigmentation treatment.",
  },
  {
    category: "SMP",
    q: "Is scalp micropigmentation painful?",
    a: "Scalp micropigmentation discomfort is minimal and well-tolerated by most clients. The sensation is often described as light scratching or tingling rather than pain. Our SMP technicians use specialised micro-needles that penetrate only the dermal layer, making the procedure less painful than traditional tattooing. Most clients rate discomfort at 2–4 on a 10-point scale. We offer topical numbing agents for sensitive individuals. The scalp micropigmentation procedure is performed over 2–3 sessions, allowing your scalp to rest between treatments and ensuring your comfort throughout the hair restoration process.",
  },
  {
    category: "SMP",
    q: "How many sessions does SMP require?",
    a: "Complete scalp micropigmentation treatment typically requires 2–3 sessions spaced 10–14 days apart. The first session establishes the hairline, density pattern, and base layer of pigmentation. The second session adds depth, density, and blending. A third session may be scheduled for perfecting details and achieving optimal results. This gradual approach allows proper healing between treatments and ensures natural-looking results. Each SMP session lasts 2–4 hours depending on the treatment area size. Our hair restoration specialists customise the number of sessions based on your hair loss pattern, desired density, and skin characteristics.",
  },
  {
    category: "SMP",
    q: "Can SMP work for women experiencing hair loss?",
    a: "Scalp micropigmentation is highly effective for women with thinning hair, female pattern hair loss, or alopecia. Unlike men who often choose the shaved head appearance, women typically receive SMP density treatment that creates the illusion of thicker hair by filling gaps between existing hair strands. This technique adds the appearance of fuller, denser hair without altering your hairstyle. SMP for women works exceptionally well for widening parts, thinning crowns, and areas of diffuse hair loss. Our female hair restoration specialists customise pigment colour and density patterns to complement your natural hair and achieve seamless, undetectable results.",
  },
  {
    category: "SMP",
    q: "What's the difference between SMP and a hair tattoo?",
    a: "Scalp micropigmentation differs significantly from traditional hair tattoos. SMP uses specialised pigments formulated to match natural hair follicle appearance and fade naturally without colour change, while tattoo ink often turns blue or green over time. SMP technicians employ specific needle depths, dot patterns, and application techniques that create realistic hair follicle impressions, whereas tattoos penetrate deeper skin layers with different artistic goals. SMP equipment, training, and artistic approach are specifically designed for hair restoration, resulting in natural-looking results that seamlessly blend with existing hair.",
  },
  {
    category: "SMP",
    q: "How much does scalp micropigmentation cost?",
    a: "Scalp micropigmentation cost varies based on treatment area size, hair loss extent, and session number required. Complete SMP treatment typically ranges from £1,200–£3,200. Hairline restoration may cost £1,200–£2,000, while full scalp coverage for advanced baldness ranges £2,400–£3,200. Compared to hair transplant surgery costing £3,000–£12,000 with variable results, SMP offers an affordable, predictable, non-surgical alternative. We provide free consultations with detailed pricing based on your specific hair restoration needs. Many clients find SMP the most cost-effective long-term solution for hair loss concerns.",
  },
  {
    category: "SMP",
    q: "What is the recovery time after SMP?",
    a: "Scalp micropigmentation recovery is minimal with most clients resuming normal activities immediately. The scalp may appear slightly red for 2–3 days post-treatment, similar to mild sunburn. We recommend avoiding intense exercise, swimming, saunas, and direct sun exposure for 4–5 days following each SMP session. The pigmented area should not be scratched or picked during healing. Complete healing occurs within 7–10 days. Unlike hair transplant surgery requiring weeks of recovery, SMP allows you to maintain your regular schedule with minimal disruption while achieving natural-looking hair restoration results.",
  },
  {
    category: "SMP",
    q: "Can SMP cover scars from hair transplants or injuries?",
    a: "Scalp micropigmentation excels at camouflaging various types of scalp scarring, including hair transplant scars (FUT/strip scars), burn scars, accident injuries, and surgical scars. SMP scar camouflage involves carefully applying pigment to match surrounding skin tone and hair follicle patterns, making scars virtually invisible. This technique works particularly well for linear scars from hair transplant procedures. Our SMP specialists assess scar tissue type, colour, and texture during consultation to determine the most effective approach. Many clients combine SMP with hair systems or transplants for comprehensive hair restoration solutions.",
  },
  {
    category: "General",
    q: "Can I combine hair systems with scalp micropigmentation?",
    a: "Combining hair systems with scalp micropigmentation creates optimal hair restoration results for many clients. SMP provides a realistic scalp appearance beneath thinner hair system base materials, enhancing the illusion of natural hair growth. This combination works excellently for clients wanting flexibility — wearing a hair system for length and volume while having SMP provide coverage when the system is removed. SMP also creates a defined hairline that guides hair system placement and improves overall naturalness. Our hair restoration specialists can design a customised treatment plan combining both solutions for maximum effectiveness.",
  },
];

const categories: ("All" | Category)[] = ["All", "Hair Systems", "SMP", "General"];

const slug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const FAQPage = () => {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<"All" | Category>("All");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  // SEO
  useSeo({
    title: "Hair Replacement FAQs | Hair Systems & SMP Questions",
    description:
      "Answers to common questions about hair systems, scalp micropigmentation (SMP), maintenance, and non-surgical hair replacement from Amersham specialists.",
    canonicalPath: "/faq",
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
        { name: "FAQ", path: "/faq" },
      ]),
    ],
  });

  // Smooth scroll for hash on load
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, []);

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      const matchesCat = activeCat === "All" || f.category === activeCat;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [activeCat, query]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = "Hair Systems & SMP FAQ — Men's Hair To Stay";

  return (
    <div className="bg-mhts-light min-h-screen print:bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mhts-charcoal via-mhts-navy to-mhts-slate text-mhts-white">
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, hsl(var(--gb-gold)) 0, transparent 40%), radial-gradient(circle at 80% 60%, hsl(var(--mhts-white)) 0, transparent 40%)",
          }}
        />
        <div className="container mx-auto px-4 py-20 md:py-28 relative">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm mb-6 text-mhts-white/70">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-gb-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link
                  to="/mens-hair-to-stay"
                  className="hover:text-gb-gold transition-colors"
                >
                  Men's Hair To Stay
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li aria-current="page" className="text-gb-gold">
                FAQ
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gb-gold mb-4">
              <HelpCircle className="w-4 h-4" /> Knowledge Base
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
              Frequently Asked <span className="text-gb-gold">Questions</span>
            </h1>
            <p className="text-lg md:text-xl text-mhts-white/80 max-w-2xl">
              Everything you need to know about hair systems, scalp
              micropigmentation, and non-surgical hair restoration.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-10 max-w-2xl"
          >
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-mhts-slate" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions (e.g. cost, recovery, women)"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-mhts-white text-mhts-charcoal placeholder:text-mhts-slate/60 focus:outline-none focus:ring-2 focus:ring-gb-gold shadow-lg"
                aria-label="Search FAQs"
              />
            </div>
          </motion.div>

          {/* Jump nav */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCat === c
                    ? "bg-gb-gold text-mhts-charcoal shadow-md"
                    : "bg-mhts-white/10 text-mhts-white hover:bg-mhts-white/20"
                }`}
              >
                {c === "All" ? "All Questions" : c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-mhts-slate">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-40" />
              <p className="text-lg">No questions match your search.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCat("All");
                }}
                className="mt-4 text-gb-gold hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <ul className="space-y-3">
              {filtered.map((f, i) => {
                const id = slug(f.q);
                const isOpen = openIdx === i;
                return (
                  <div key={id}>
                    <motion.li
                      id={id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                      className="bg-mhts-white rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : i)}
                        className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
                        aria-expanded={isOpen}
                        aria-controls={`${id}-content`}
                      >
                        <div className="flex-1">
                          <span className="inline-block text-[10px] uppercase tracking-wider text-gb-gold font-semibold mb-1.5">
                            {f.category}
                          </span>
                          <h3 className="text-base md:text-lg font-semibold text-mhts-charcoal">
                            {f.q}
                          </h3>
                        </div>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-mhts-light flex items-center justify-center"
                        >
                          <ChevronDown className="w-4 h-4 text-mhts-charcoal" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`${id}-content`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 md:px-6 pb-6 text-mhts-slate leading-relaxed">
                              {f.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>

                    {/* CTA every 5 questions */}
                    {(i + 1) % 5 === 0 && i !== filtered.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="my-6 rounded-xl p-6 md:p-8 bg-gradient-to-r from-mhts-charcoal to-mhts-navy text-mhts-white flex flex-col md:flex-row items-center gap-4 md:gap-6"
                      >
                        <CalendarCheck className="w-10 h-10 text-gb-gold flex-shrink-0" />
                        <div className="flex-1 text-center md:text-left">
                          <h4 className="font-semibold text-lg">
                            Ready to take the next step?
                          </h4>
                          <p className="text-sm text-mhts-white/75">
                            Book a free, confidential consultation with our specialists.
                          </p>
                        </div>
                        <Link
                          to="/mens-hair-to-stay#mhts-book"
                          className="bg-gb-gold text-mhts-charcoal px-6 py-3 rounded-lg font-semibold hover:bg-gb-gold-light transition-colors whitespace-nowrap"
                        >
                          Book Consultation
                        </Link>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </ul>
          )}

          {/* Share + print */}
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 print:hidden">
            <div className="flex items-center gap-3 text-sm text-mhts-slate">
              <Share2 className="w-4 h-4" /> Share this page:
              <a
                aria-label="Share on Facebook"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                className="p-2 rounded-full bg-mhts-white border border-border hover:bg-mhts-light transition-colors"
              >
                <Facebook className="w-4 h-4 text-mhts-charcoal" />
              </a>
              <a
                aria-label="Share on Twitter"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                className="p-2 rounded-full bg-mhts-white border border-border hover:bg-mhts-light transition-colors"
              >
                <Twitter className="w-4 h-4 text-mhts-charcoal" />
              </a>
              <a
                aria-label="Share on LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                className="p-2 rounded-full bg-mhts-white border border-border hover:bg-mhts-light transition-colors"
              >
                <Linkedin className="w-4 h-4 text-mhts-charcoal" />
              </a>
              <a
                aria-label="Share by email"
                href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`}
                className="p-2 rounded-full bg-mhts-white border border-border hover:bg-mhts-light transition-colors"
              >
                <Mail className="w-4 h-4 text-mhts-charcoal" />
              </a>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 text-sm text-mhts-charcoal hover:text-gb-gold transition-colors"
            >
              <Printer className="w-4 h-4" /> Print this page
            </button>
          </div>
        </div>
      </section>

      {/* Still have questions? */}
      <section className="bg-mhts-white border-t border-border py-16 md:py-20 print:hidden">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-mhts-charcoal mb-3">
              Still have questions?
            </h2>
            <p className="text-mhts-slate">
              Send us a message and our hair restoration team will get back to you.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const data = new FormData(form);
              const name = data.get("name");
              const email = data.get("email");
              const message = data.get("message");
              window.location.href = `mailto:georgesbarbers1991@gmail.com?subject=${encodeURIComponent(
                `FAQ enquiry from ${name}`
              )}&body=${encodeURIComponent(`From: ${name} <${email}>\n\n${message}`)}`;
            }}
            className="grid gap-4 bg-mhts-light p-6 md:p-8 rounded-xl border border-border"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                name="name"
                placeholder="Your name"
                className="px-4 py-3 rounded-lg bg-mhts-white border border-border focus:outline-none focus:ring-2 focus:ring-gb-gold"
              />
              <input
                required
                type="email"
                name="email"
                placeholder="Email address"
                className="px-4 py-3 rounded-lg bg-mhts-white border border-border focus:outline-none focus:ring-2 focus:ring-gb-gold"
              />
            </div>
            <textarea
              required
              name="message"
              rows={5}
              placeholder="Your question…"
              className="px-4 py-3 rounded-lg bg-mhts-white border border-border focus:outline-none focus:ring-2 focus:ring-gb-gold resize-y"
            />
            <button
              type="submit"
              className="bg-mhts-charcoal text-mhts-white px-6 py-3 rounded-lg font-semibold hover:bg-mhts-navy transition-colors inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Related */}
      <section className="bg-mhts-light py-16 print:hidden">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-bold text-mhts-charcoal mb-8 text-center">
            Explore more
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                title: "Our Services",
                desc: "Hair systems, SMP, density treatments and more.",
                to: "/mens-hair-to-stay#mhts-services",
              },
              {
                title: "Before & After Gallery",
                desc: "Real client results and transformations.",
                to: "/mens-hair-to-stay#mhts-gallery",
              },
              {
                title: "Book a Consultation",
                desc: "Free, confidential and no obligation.",
                to: "/mens-hair-to-stay#mhts-book",
              },
            ].map((c) => (
              <Link
                key={c.title}
                to={c.to}
                className="group bg-mhts-white rounded-xl p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <h3 className="font-semibold text-mhts-charcoal mb-2 group-hover:text-gb-gold transition-colors">
                  {c.title}
                </h3>
                <p className="text-sm text-mhts-slate mb-3">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm text-gb-gold font-medium">
                  Learn more <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
