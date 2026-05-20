import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, MapPin, Scissors, ArrowRight } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { gbBlogPosts } from "@/data/gbBlogPosts";
import gbHero from "@/assets/gb-hero.jpg";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const GBBlogPage = () => {
  useSeo({
    title: "Georges Barbers Blog | Amersham Barbershop Since 1991",
    description:
      "News, guides and stories from Georges Barbers — Amersham's original gents barbershop on Chesham Road since 1991.",
    canonicalPath: "/georges-barbers/blog",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Georges Barbers", path: "/georges-barbers" },
        { name: "Blog", path: "/georges-barbers/blog" },
      ]),
    ],
  });

  const posts = [...gbBlogPosts].sort((a, b) => b.date.localeCompare(a.date));

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
              Georges Barbers Blog
            </h1>
            <p className="text-lg md:text-xl text-background/80 font-body max-w-2xl">
              Stories, guides and updates from Amersham's original gents barbershop on Chesham Road.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid gap-8">
            {posts.map((p) => (
              <Link
                key={p.slug}
                to={`/georges-barbers/blog/${p.slug}`}
                className="group block bg-background rounded-xl border border-gb-gold/20 hover:border-gb-gold transition-colors p-6 md:p-8 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/60 font-body mb-3">
                  <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gb-gold" /> {formatDate(p.date)}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4 text-gb-gold" /> {p.readTime}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-display text-gb-green mb-3 group-hover:text-gb-green/80 transition-colors">
                  {p.title}
                </h2>
                <p className="text-foreground/80 font-body leading-relaxed mb-4">{p.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-gb-green font-semibold font-body group-hover:gap-3 transition-all">
                  Read article <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 bg-gb-green rounded-xl p-8 text-center">
            <h2 className="font-display text-2xl text-gb-gold mb-3">Visit Amersham's Original Barbershop</h2>
            <p className="text-background/80 font-body mb-6 max-w-xl mx-auto">
              Walk in any day for haircuts, fades, beard trims and wet shaves. Call ahead for piercing appointments.
            </p>
            <p className="text-background/70 text-sm font-body inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gb-gold" /> 11 Chesham Road, Amersham HP6 5HN — Open 7 days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GBBlogPage;
