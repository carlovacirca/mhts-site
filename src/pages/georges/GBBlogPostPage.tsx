import { useMemo } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, Clock, ArrowLeft, Phone, MapPin, Scissors } from "lucide-react";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { gbBlogPosts } from "@/data/gbBlogPosts";
import gbHero from "@/assets/gb-hero.jpg";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

interface Block {
  type: "h2" | "h3" | "p" | "ul";
  text?: string;
  items?: string[];
}

const parseContent = (md: string): Block[] => {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let listItems: string[] = [];
  const flush = () => {
    if (listItems.length) {
      blocks.push({ type: "ul", items: listItems });
      listItems = [];
    }
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith("## ")) { flush(); blocks.push({ type: "h2", text: line.slice(3) }); }
    else if (line.startsWith("### ")) { flush(); blocks.push({ type: "h3", text: line.slice(4) }); }
    else if (line.startsWith("- ")) { listItems.push(line.slice(2)); }
    else { flush(); blocks.push({ type: "p", text: line }); }
  }
  flush();
  return blocks;
};

type InlinePart = string | { bold: string } | { link: { text: string; href: string } };
const renderInline = (text: string) => {
  const parts: InlinePart[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) parts.push({ bold: m[1] });
    else parts.push({ link: { text: m[2], href: m[3] } });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.map((p, i) => {
    if (typeof p === "string") return <span key={i}>{p}</span>;
    if ("bold" in p) return <strong key={i}>{p.bold}</strong>;
    const { text: lt, href } = p.link;
    const isInternal = href.startsWith("/");
    return isInternal ? (
      <Link key={i} to={href} className="text-gb-green underline underline-offset-2 hover:text-gb-gold transition-colors">{lt}</Link>
    ) : (
      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-gb-green underline underline-offset-2 hover:text-gb-gold transition-colors">{lt}</a>
    );
  });
};

const GBBlogPostPage = () => {
  const { slug } = useParams();
  const post = gbBlogPosts.find((p) => p.slug === slug);

  useSeo({
    title: post ? `${post.title} | Georges Barbers Amersham` : "Blog | Georges Barbers",
    description: post?.metaDescription ?? "",
    canonicalPath: `/georges-barbers/blog/${slug ?? ""}`,
    jsonLd: post
      ? [
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Georges Barbers", path: "/georges-barbers" },
            { name: "Blog", path: "/georges-barbers/blog" },
            { name: post.title, path: `/georges-barbers/blog/${post.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            author: { "@type": "Organization", name: "Georges Barbers" },
            datePublished: post.date,
          },
        ]
      : [],
  });

  const blocks = useMemo(() => (post ? parseContent(post.content) : []), [post]);

  if (!post) return <Navigate to="/georges-barbers/blog" replace />;

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
              <li><Link to="/georges-barbers/blog" className="hover:text-gb-gold transition-colors">Blog</Link></li>
              <li><ChevronRight className="w-3.5 h-3.5" /></li>
              <li aria-current="page" className="text-gb-gold line-clamp-1">{post.title}</li>
            </ol>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-gb-gold mb-4 font-body">
              <Scissors className="w-4 h-4" /> From the Barbershop
            </span>
            <h1 className="text-4xl md:text-5xl font-display text-gb-gold mb-5 leading-tight">{post.title}</h1>
            <div className="flex items-center gap-4 text-background/70 text-sm font-body">
              <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link to="/georges-barbers/blog" className="inline-flex items-center gap-1.5 text-gb-green hover:text-gb-gold transition-colors font-body text-sm mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>

          <article className="space-y-5">
            {blocks.map((b, i) => {
              if (b.type === "h2")
                return <h2 key={i} className="text-3xl font-display text-gb-green border-b border-gb-gold/30 pb-3 mt-8">{b.text}</h2>;
              if (b.type === "h3")
                return <h3 key={i} className="text-xl font-display text-gb-green font-semibold mt-6">{b.text}</h3>;
              if (b.type === "ul")
                return (
                  <ul key={i} className="space-y-2 pl-1">
                    {b.items!.map((it, j) => (
                      <li key={j} className="flex gap-3 text-foreground/85 font-body leading-relaxed">
                        <span className="text-gb-gold mt-1.5 shrink-0">◆</span>
                        <span>{renderInline(it)}</span>
                      </li>
                    ))}
                  </ul>
                );
              return <p key={i} className="text-foreground/85 font-body leading-relaxed">{renderInline(b.text!)}</p>;
            })}
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

export default GBBlogPostPage;
