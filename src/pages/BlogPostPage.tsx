import { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ChevronRight, Share2, Facebook, Twitter, Linkedin, Mail, ArrowLeft, ChevronDown, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import RelatedVideo from "@/components/RelatedVideo";
import NewsletterSubscribeBar from "@/components/NewsletterSubscribeBar";
import { blogPosts } from "@/data/blogPosts";
import blogPlaceholderIllustration from "@/assets/blog-placeholder-illustration.jpg";
import blogNonSurgicalInline1 from "@/assets/blog-non-surgical-inline-1.jpg";

const inlineImageOverrides: Record<string, string[]> = {
  "non-surgical-hair-replacement-men-uk": [blogNonSurgicalInline1],
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });

const categoryRoutes: Record<string, string> = {
  "Hair Systems": "/hair-systems",
  "Scalp Micropigmentation": "/scalp-micropigmentation",
  "Hair Loss Solutions": "/hair-density",
  "Maintenance & Care": "/hair-system-maintenance",
  "Expert Tips": "/services",
  "Before & After": "/gallery",
};

interface Block {
  type: "h2" | "h3" | "p" | "ul" | "ol";
  text?: string;
  id?: string;
  items?: string[];
}

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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
      <Link key={i} to={href} className="text-mhts-charcoal underline hover:no-underline">{lt}</Link>
    ) : (
      <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-mhts-charcoal underline hover:no-underline">{lt}</a>
    );
  });
};

const parseContent = (md: string): Block[] => {
  const lines = md.split("\n");
  const blocks: Block[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];
  const flushList = () => {
    if (listType && listItems.length) {
      blocks.push({ type: listType, items: listItems });
    }
    listType = null;
    listItems = [];
  };
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      const text = line.slice(3);
      blocks.push({ type: "h2", text, id: slugify(text) });
    } else if (line.startsWith("### ")) {
      flushList();
      const text = line.slice(4);
      blocks.push({ type: "h3", text, id: slugify(text) });
    } else if (line.startsWith("- ")) {
      if (listType !== "ul") flushList();
      listType = "ul";
      listItems.push(line.slice(2));
    } else if (/^\d+\.\s/.test(line)) {
      if (listType !== "ol") flushList();
      listType = "ol";
      listItems.push(line.replace(/^\d+\.\s/, ""));
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  }
  flushList();
  return blocks;
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);


  const blocks = useMemo(() => (post ? parseContent(post.content) : []), [post]);
  const toc = blocks.filter((b) => b.type === "h2") as Required<Pick<Block, "text" | "id">>[];

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Men's Hair To Stay`;
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute("content", post.metaDescription);
    if (!meta.parentNode) document.head.appendChild(meta);

    // Open Graph
    const setOg = (prop: string, content: string) => {
      let el = document.querySelector(`meta[property="${prop}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", prop);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    setOg("og:title", post.title);
    setOg("og:description", post.metaDescription);
    setOg("og:type", "article");
    setOg("og:url", window.location.href);

    // Article schema
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "article-jsonld";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      author: { "@type": "Organization", name: post.author },
      datePublished: post.date,
      mainEntityOfPage: window.location.href,
    });
    document.getElementById("article-jsonld")?.remove();
    document.head.appendChild(ld);
    return () => document.getElementById("article-jsonld")?.remove();
  }, [post]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated =
    related.length < 3
      ? [...related, ...blogPosts.filter((p) => p.slug !== post.slug && !related.includes(p))].slice(0, 3)
      : related;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="bg-background min-h-screen">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div
          className="h-full bg-mhts-charcoal transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero image */}
      <section className="bg-background">
        {post.image ? (
          <img
            src={post.image}
            alt={post.featuredImageAlt}
            className="w-full h-[40vh] md:h-[60vh] object-cover"
          />
        ) : (
          <div className="w-full h-[40vh] md:h-[60vh] bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
            <ImageIcon className="w-16 h-16 text-mhts-white/30" />
          </div>
        )}
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="inline w-3 h-3 mx-1" />
        <Link to="/blog" className="hover:text-foreground">Blog</Link>
        <ChevronRight className="inline w-3 h-3 mx-1" />
        <span className="text-foreground line-clamp-1 inline">{post.title}</span>
      </div>

      {/* Title block */}
      <div className="container mx-auto px-4 pt-6 grid lg:grid-cols-[1fr_280px] gap-8">
        <section>
          <div className="mb-4">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4 text-mhts-charcoal"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-5">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            <span>By {post.author}</span>
          </div>
          <p className="italic text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

        </section>
        <div className="hidden lg:block" />
      </div>


      <div className="container mx-auto px-4 pb-20 grid lg:grid-cols-[1fr_280px] gap-8">


        {/* Article */}
        <article className="prose prose-slate max-w-none">
          {/* Collapsible Table of Contents */}
          {toc.length > 0 && (
            <Collapsible defaultOpen className="not-prose mb-10 border border-border rounded-lg bg-mhts-light/40">
              <CollapsibleTrigger className="group flex w-full items-center justify-between p-4 text-left">
                <span className="font-semibold text-mhts-charcoal uppercase tracking-wider text-sm">
                  Table of Contents
                </span>
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ol className="list-decimal pl-10 pr-4 pb-4 space-y-1.5 text-sm">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-muted-foreground hover:text-mhts-charcoal transition-colors">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </CollapsibleContent>
            </Collapsible>
          )}

          {(() => {
            // Group blocks into H2 sections so we can inject an image placeholder
            // after the second H3 of each section.
            const sections: Block[][] = [];
            let current: Block[] = [];
            for (const b of blocks) {
              if (b.type === "h2") {
                if (current.length) sections.push(current);
                current = [b];
              } else {
                if (!current.length) current = [];
                current.push(b);
              }
            }
            if (current.length) sections.push(current);

            const renderBlock = (b: Block, key: string) => {
              if (b.type === "h2")
                return (
                  <h2 id={b.id} key={key} className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-mhts-charcoal scroll-mt-24">
                    {b.text}
                  </h2>
                );
              if (b.type === "h3")
                return (
                  <h3 id={b.id} key={key} className="text-xl font-semibold mt-6 mb-3 text-mhts-charcoal scroll-mt-24">
                    {b.text}
                  </h3>
                );
              if (b.type === "ul")
                return (
                  <ul key={key} className="list-disc pl-6 my-4 space-y-1.5 text-foreground/90">
                    {b.items!.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
                  </ul>
                );
              if (b.type === "ol")
                return (
                  <ol key={key} className="list-decimal pl-6 my-4 space-y-1.5 text-foreground/90">
                    {b.items!.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
                  </ol>
                );
              return (
                <p key={key} className="my-4 leading-relaxed text-foreground/90">
                  {renderInline(b.text!)}
                </p>
              );
            };

            const ImagePlaceholder = ({ k, src }: { k: string; src: string }) => (
              <div
                key={k}
                className="not-prose my-8 aspect-[16/9] w-full rounded-lg border border-border bg-muted flex items-center justify-center overflow-hidden"
              >
                <img
                  src={src}
                  alt="Illustration"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            );

            const overrides = inlineImageOverrides[post.slug] ?? [];
            let inlineImgIndex = 0;

            return sections.map((section, si) => {
              const hasH3 = section.some((b) => b.type === "h3");
              const totalP = section.filter((b) => b.type === "p").length;
              const nodes: JSX.Element[] = [];
              let h3Count = 0;
              let pCount = 0;
              let imageInserted = false;
              section.forEach((b, bi) => {
                nodes.push(renderBlock(b, `${si}-${bi}`));
                if (b.type === "h3") h3Count += 1;
                if (b.type === "p") pCount += 1;
                const trigger = hasH3 ? h3Count === 2 : pCount === 2 && totalP >= 3;
                if (!imageInserted && trigger) {
                  const src = overrides[inlineImgIndex] ?? blogPlaceholderIllustration;
                  nodes.push(<ImagePlaceholder key={`${si}-img`} k={`${si}-img`} src={src} />);
                  inlineImgIndex += 1;
                  imageInserted = true;
                }
              });
              return <section key={si}>{nodes}</section>;
            });
          })()}
        </article>


        {/* Right sidebar — Related FAQs + CTA */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start hidden lg:block">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-3">
              <Share2 className="w-3 h-3" /> Share
            </p>
            <div className="flex flex-row gap-2">
              <a target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a target="_blank" rel="noopener" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Category</p>
            <Link
              to={categoryRoutes[post.category] || "/services"}
              className="inline-block px-3 py-1 bg-mhts-light text-mhts-charcoal text-xs rounded-full hover:bg-mhts-charcoal hover:text-mhts-white transition-colors"
            >
              {post.category}
            </Link>
          </div>
          {post.faqs && post.faqs.length > 0 && (
            <div>
              <h4 className="font-bold mb-3 text-mhts-charcoal text-sm uppercase tracking-wider">
                Related FAQs
              </h4>
              <Accordion type="single" collapsible className="border border-border rounded-lg bg-mhts-light/40 px-3">
                {post.faqs.map((f, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="text-sm text-left text-mhts-charcoal hover:no-underline py-3">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
          <div className="bg-mhts-charcoal text-mhts-white p-5 rounded-lg">
            <h4 className="font-bold mb-2">Book a free consultation</h4>
            <p className="text-sm text-mhts-white/80 mb-4">
              Discuss your hair restoration goals with our specialists.
            </p>
            <Link to="/mens-hair-to-stay#mhts-book">
              <Button className="w-full bg-mhts-white text-mhts-charcoal hover:bg-mhts-white/90">
                Book Consultation
              </Button>
            </Link>
          </div>
        </aside>

      </div>

      {/* Related Video */}
      <RelatedVideo title={post.title} />

      {/* Related */}
      <section className="container mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-mhts-charcoal mb-6">Related articles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {fallbackRelated.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                {p.image ? (
                  <img src={p.image} alt={p.featuredImageAlt} className="aspect-[16/10] w-full object-cover" loading="lazy" />
                ) : (
                  <div className="aspect-[16/10] bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
                    <span className="text-mhts-white/20 text-2xl font-bold">MHTS</span>
                  </div>
                )}
                <CardContent className="p-5">
                  <span className="inline-block px-2 py-0.5 bg-mhts-light text-mhts-charcoal text-xs rounded-full mb-2">
                    {p.category}
                  </span>
                  <h3 className="font-semibold mb-2 line-clamp-2 text-mhts-charcoal">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter subscribe bar */}
      <NewsletterSubscribeBar />


    </div>
  );
};

export default BlogPostPage;
