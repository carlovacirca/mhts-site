import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "@/lib/motion";
import { Calendar, Clock, ChevronRight, Share2, Facebook, Twitter, Linkedin, Mail, ArrowLeft, ChevronDown, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import NewsletterSubscribeBar from "@/components/NewsletterSubscribeBar";
import { useCanonical, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import { blogPosts } from "@/data/blogPosts";
import ResponsiveImage from "@/components/ResponsiveImage";
import { BookButton, CallButton } from "@/components/mhts/CtaButtons";
import { getPicture } from "@/lib/images";
import { relatedPosts, isPublished, isPreviewRequest } from "@/lib/publishing";
import NotFound from "@/pages/NotFound";
import { computeImageSlots } from "@/lib/blogImageSlots";
import blogPlaceholderIllustration from "@/assets/blog-placeholder-illustration.jpg";
import blogNonSurgicalInline1 from "@/assets/blog-non-surgical-inline-1.jpg";
import blogNonSurgicalInline2 from "@/assets/blog-non-surgical-inline-2.jpg";
import blogNonSurgicalInline3 from "@/assets/blog-non-surgical-inline-3.jpg";
import blogHairTransplantAltInline1 from "@/assets/blog-hair-transplant-alt-inline-1.jpg";
import blogHairTransplantAltInline2 from "@/assets/blog-hair-transplant-alt-inline-2.jpg";
import blogHairTransplantAltInline3 from "@/assets/blog-hair-transplant-alt-inline-3.jpg";
import blogHairTransplantAltInline4 from "@/assets/blog-hair-transplant-alt-inline-4.jpg";
import blogHairSystemBondComparison from "@/assets/blog-hair-system-bond-comparison.jpg";
import blogHairDensityComparison from "@/assets/blog-hair-density-comparison.jpg";
import blogHairSystemFittingComparison from "@/assets/blog-hair-system-fitting-comparison.jpg";
import mhtsHairSystemBeforeAfterInline from "@/assets/mhts-hair-system-before-after-inline.jpg";

const inlineImageOverrides: Record<string, string[]> = {
  "non-surgical-hair-replacement-men-uk": [blogNonSurgicalInline1, blogNonSurgicalInline2, blogNonSurgicalInline3],
  "best-hair-transplant-alternatives-non-surgical-solutions": [blogHairTransplantAltInline1, blogHairTransplantAltInline2, blogHairTransplantAltInline3, blogHairTransplantAltInline4],
};

// Posts that mark an exact inline-image position in their content with a bare
// `[IMAGE]` line (parsed into a `{ type: "img" }` block) use this map instead
// of the auto-distributed 4-slot system above.
const explicitInlineImages: Record<string, { src: string; alt: string }> = {
  "does-a-hair-system-look-natural": {
    src: mhtsHairSystemBeforeAfterInline,
    alt: "Side by side comparison of a thinning crown before and full density after a hair system fitting",
  },
  "hair-system-maintenance-4-to-6-weeks": {
    src: blogHairSystemBondComparison,
    alt: "Comparison of a failing hair system bond versus a freshly maintained bond",
  },
  "hair-density-treatment-for-thinning-hair": {
    src: blogHairDensityComparison,
    alt: "Side by side comparison of thinning hair and fuller density after treatment at Men's Hair To Stay",
  },
  "modern-hair-system-vs-surgery": {
    src: blogHairSystemFittingComparison,
    alt: "Side by side comparison of a receding hairline before and a full restored hairline after a hair system at Men's Hair To Stay",
  },
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
  type: "h2" | "h3" | "p" | "ul" | "ol" | "img";
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
    if (line === "[IMAGE]") {
      flushList();
      blocks.push({ type: "img" });
    } else if (line.startsWith("## ")) {
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
  const previewMode = isPreviewRequest();
  const match = blogPosts.find((p) => p.slug === slug);
  // A post scheduled for a future date is treated exactly like a slug that does
  // not exist: 404, noindex, nothing rendered. Its URL used to work the moment
  // it was merged, days before its date. See docs/HEALTH-CHECK.md finding 8.
  // ?preview=1 still opens it, which is what the PR preview approval step uses.
  const post = match && (previewMode || isPublished(match.date)) ? match : undefined;
  const [progress, setProgress] = useState(0);


  const blocks = useMemo(() => (post ? parseContent(post.content) : []), [post]);
  const toc = blocks.filter((b) => b.type === "h2") as Required<Pick<Block, "text" | "id">>[];

  useCanonical(post ? `/blog/${post.slug}` : null);

  useEffect(() => {
    if (!post) return;
    document.title = `${post.title} | Men's Hair To Stay`;
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute("content", post.metaDescription);
    if (!meta.parentNode) document.head.appendChild(meta);

    // Open Graph and Twitter. Both are set, because Twitter reads twitter:*
    // first and would otherwise show the homepage card for every post.
    const setMetaBy = (key: "property" | "name", prop: string, content: string) => {
      let el = document.querySelector(`meta[${key}="${prop}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, prop);
        document.head.appendChild(el);
      }
      el.content = content;
    };
    const setOg = (prop: string, content: string) => setMetaBy("property", prop, content);
    const setTw = (prop: string, content: string) => setMetaBy("name", prop, content);
    setOg("og:title", post.title);
    setOg("og:description", post.metaDescription);
    setOg("og:type", "article");
    setOg("og:url", `${SITE_URL}/blog/${post.slug}`);
    setOg("article:published_time", post.date);
    setTw("twitter:title", post.title);
    setTw("twitter:description", post.metaDescription);
    // The post's own hero becomes the share image. Until pre-rendering there
    // was no point setting it, because no crawler ran the JavaScript that did.
    if (post.image) {
      const heroUrl = new URL(post.image, SITE_URL).href;
      const pic = getPicture(post.image);
      setOg("og:image", heroUrl);
      setOg("og:image:alt", post.featuredImageAlt);
      setOg("og:image:type", heroUrl.toLowerCase().includes(".png") ? "image/png" : "image/jpeg");
      setTw("twitter:image", heroUrl);
      setTw("twitter:image:alt", post.featuredImageAlt);
      if (pic) {
        setOg("og:image:width", String(pic.width));
        setOg("og:image:height", String(pic.height));
      }
    }

    // BlogPosting schema. Was "Article" with no image and no dateModified, which
    // the /blog listing already contradicted by calling the same posts BlogPosting.
    // See docs/HEALTH-CHECK.md finding 33.
    const postUrl = `${SITE_URL}/blog/${post.slug}`;
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "article-jsonld";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      author: { "@type": "Organization", name: post.author || "Men's Hair To Stay" },
      publisher: {
        "@type": "Organization",
        name: "Men's Hair To Stay",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.jpg` },
      },
      datePublished: post.date,
      // No post has been edited since publication, so modified equals published.
      // A made up date here would be worse than an honest one.
      dateModified: post.date,
      ...(post.image ? { image: new URL(post.image, SITE_URL).href } : {}),
      url: postUrl,
      mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    });
    document.getElementById("article-jsonld")?.remove();
    document.head.appendChild(ld);

    // BreadcrumbList. The page has always shown visible breadcrumbs but never
    // published them as structured data. See docs/HEALTH-CHECK.md finding 12.
    const crumbLd = document.createElement("script");
    crumbLd.type = "application/ld+json";
    crumbLd.id = "breadcrumb-jsonld";
    crumbLd.text = JSON.stringify(
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
        { name: post.title, path: `/blog/${post.slug}` },
      ])
    );
    document.getElementById("breadcrumb-jsonld")?.remove();
    document.head.appendChild(crumbLd);

    // FAQPage schema
    let faqLd: HTMLScriptElement | null = null;
    if (post.faqs && post.faqs.length > 0) {
      faqLd = document.createElement("script");
      faqLd.type = "application/ld+json";
      faqLd.id = "faq-jsonld";
      faqLd.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
      document.getElementById("faq-jsonld")?.remove();
      document.head.appendChild(faqLd);
    }

    return () => {
      document.getElementById("article-jsonld")?.remove();
      document.getElementById("faq-jsonld")?.remove();
      document.getElementById("breadcrumb-jsonld")?.remove();
    };
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

  // No such slug, or the post is not published yet. Both render the 404 page,
  // which carries noindex. A bad slug used to fall through to the /blog listing
  // with a 200. See docs/HEALTH-CHECK.md findings 2 and 8.
  if (!post) return <NotFound />;

  // Live posts only. Related posts used to link to articles that were not
  // published yet, which is how a future post leaked out of /blog.
  const fallbackRelated = relatedPosts(blogPosts, post, 3, { preview: previewMode });

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    // Batch 4b, layout only: the post content is untouched. The title now sits
    // in a card that overlaps the foot of the photograph, the article is set
    // to a reading width of about 70 characters, headings carry a red rule, the
    // contents box and the sidebar pick up the brand, and related articles sit
    // on their own sand band.
    <div className="mhts-theme min-h-screen bg-background">
      {/* Reading progress */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
        <div
          className="h-full bg-mhts-red transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero image */}
      <section className="bg-background">
        {post.image ? (
          <ResponsiveImage
            src={post.image}
            alt={post.featuredImageAlt}
            className="h-[40vh] w-full object-cover md:h-[56vh]"
            sizes="100vw"
            priority
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
      <div className="container mx-auto grid gap-8 px-4 pt-6 lg:grid-cols-[1fr_280px]">
        <section className="relative bg-card md:-mt-28 md:rounded-2xl md:border md:border-t-4 md:border-mhts-stone md:border-t-mhts-red md:p-10 md:shadow-xl">
          <div className="mb-4">
            <Link to="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Back to blog
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-3xl leading-tight text-mhts-ink md:text-5xl"
          >
            {post.title}
          </motion.h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-5">
            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            {post.author && <span>By {post.author}</span>}
          </div>
          <p className="border-l-4 border-mhts-red pl-4 text-lg italic leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

        </section>
        <div className="hidden lg:block" />
      </div>


      <div className="container mx-auto px-4 pb-20 grid lg:grid-cols-[1fr_280px] gap-8">


        {/* Article */}
        <article className="prose prose-slate max-w-[70ch] pt-4">
          {/* Collapsible Table of Contents */}
          {toc.length > 0 && (
            <Collapsible defaultOpen className="not-prose mb-10 rounded-xl border border-mhts-stone border-l-4 border-l-mhts-red bg-mhts-sand">
              <CollapsibleTrigger className="group flex w-full items-center justify-between p-4 text-left">
                <span className="text-sm font-semibold uppercase tracking-wider text-mhts-red-deep">
                  Table of Contents
                </span>
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ol className="list-decimal space-y-1.5 pb-4 pl-10 pr-4 text-sm marker:font-semibold marker:text-mhts-red-deep">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} className="text-foreground/80 transition-colors hover:text-mhts-red-deep">
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </CollapsibleContent>
            </Collapsible>
          )}

          {(() => {
            const renderBlock = (b: Block, key: string) => {
              if (b.type === "h2")
                return (
                  <h2 id={b.id} key={key} className="mb-4 mt-12 scroll-mt-24 border-t-2 border-mhts-red pt-5 text-2xl text-mhts-ink md:text-3xl">
                    {b.text}
                  </h2>
                );
              if (b.type === "h3")
                return (
                  <h3 id={b.id} key={key} className="mb-3 mt-7 scroll-mt-24 text-xl text-mhts-ink">
                    {b.text}
                  </h3>
                );
              if (b.type === "ul")
                return (
                  <ul key={key} className="my-4 list-disc space-y-1.5 pl-6 text-foreground/90 marker:text-mhts-red">
                    {b.items!.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
                  </ul>
                );
              if (b.type === "ol")
                return (
                  <ol key={key} className="my-4 list-decimal space-y-1.5 pl-6 text-foreground/90 marker:font-semibold marker:text-mhts-red-deep">
                    {b.items!.map((it, j) => <li key={j}>{renderInline(it)}</li>)}
                  </ol>
                );
              if (b.type === "img") {
                const explicit = explicitInlineImages[post.slug];
                if (!explicit) return null;
                return (
                  <div
                    key={key}
                    className="not-prose my-8 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl bg-muted"
                  >
                    <ResponsiveImage
                      src={explicit.src}
                      alt={explicit.alt}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                );
              }
              return (
                <p key={key} className="my-4 leading-relaxed text-foreground/90">
                  {renderInline(b.text!)}
                </p>
              );
            };

            const ImagePlaceholder = ({ k, src }: { k: string; src: string }) => (
              <div
                key={k}
                className="not-prose my-8 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl bg-muted"
              >
                <ResponsiveImage
                  src={src}
                  alt="Illustration"
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            );

            const allowImages = post.slug in inlineImageOverrides;
            const overrides = inlineImageOverrides[post.slug] ?? [];
            const slotIndices = allowImages ? computeImageSlots(blocks) : [];
            const slotSet = new Set(slotIndices);
            const slotOrder = new Map<number, number>();
            slotIndices.forEach((idx, n) => slotOrder.set(idx, n));

            const nodes: JSX.Element[] = [];
            blocks.forEach((b, bi) => {
              nodes.push(renderBlock(b, `b-${bi}`));
              if (slotSet.has(bi)) {
                const n = slotOrder.get(bi)!;
                const src = overrides[n] ?? blogPlaceholderIllustration;
                nodes.push(<ImagePlaceholder key={`img-${bi}`} k={`img-${bi}`} src={src} />);
              }
            });
            return nodes;
          })()}

          {post.sources && post.sources.length > 0 && (
            <section aria-labelledby="sources" className="mt-12 rounded-xl bg-mhts-sand p-6">
              <h2 id="sources" className="mb-4 text-xl text-mhts-ink">Sources</h2>
              <ol className="list-decimal pl-6 space-y-3 text-sm text-foreground/90">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <span className="block">{s.title}</span>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="break-all text-mhts-red-deep underline hover:no-underline">
                      {s.url}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </article>


        {/* Right sidebar, Related FAQs + CTA */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start hidden lg:block">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-3">
              <Share2 className="w-3 h-3" /> Share
            </p>
            <div className="flex flex-row gap-2">
              <a target="_blank" rel="noopener" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} className="p-3.5 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a target="_blank" rel="noopener" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} className="p-3.5 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a target="_blank" rel="noopener" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} className="p-3.5 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`} className="p-3.5 rounded-md border border-border hover:bg-mhts-light transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Category</p>
            <Link
              to={categoryRoutes[post.category] || "/services"}
              className="inline-block rounded-full bg-mhts-red-tint px-3 py-1 text-xs font-semibold text-mhts-red-deep transition-colors hover:bg-mhts-red hover:text-white"
            >
              {post.category}
            </Link>
          </div>
          {post.faqs && post.faqs.length > 0 && (
            <div>
              <h4 className="font-bold mb-3 text-mhts-charcoal text-sm uppercase tracking-wider">
                Related FAQs
              </h4>
              <Accordion type="single" collapsible className="rounded-xl border border-mhts-stone bg-mhts-sand px-3">
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
          <div className="bg-mhts-deep text-white p-5 rounded-lg">
            <h4 className="font-bold mb-2">Book a free consultation</h4>
            <p className="text-sm text-white/80 mb-4">
              Discuss your hair restoration goals with our specialists.
            </p>
            {/* Call sits beside Book on every call to action on the site. */}
            <div className="grid gap-2">
              <BookButton size="sm" href="/#mhts-book" className="w-full" />
              <CallButton size="sm" tone="dark" className="w-full" />
            </div>
          </div>
        </aside>

      </div>



      {/* Related */}
      <section className="bg-mhts-sand py-12 md:py-16">
        <div className="container mx-auto px-4">
        <h2 className="mb-6 text-2xl text-mhts-ink md:text-3xl">Related articles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {fallbackRelated.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`}>
              <Card className="group h-full overflow-hidden border-mhts-stone transition-all hover:-translate-y-1 hover:border-mhts-red hover:shadow-lg">
                {p.image ? (
                  <ResponsiveImage src={p.image} alt={p.featuredImageAlt} className="aspect-[16/10] w-full object-cover" sizes="(max-width: 768px) 100vw, 300px" />
                ) : (
                  <div className="aspect-[16/10] bg-gradient-to-br from-mhts-navy to-mhts-charcoal flex items-center justify-center">
                    <span className="text-mhts-white/20 text-2xl font-bold">MHTS</span>
                  </div>
                )}
                <CardContent className="p-5">
                  <span className="mb-2 inline-block rounded-full bg-mhts-red-tint px-2.5 py-0.5 text-xs font-semibold text-mhts-red-deep">
                    {p.category}
                  </span>
                  <h3 className="mb-2 line-clamp-2 text-mhts-ink transition-colors group-hover:text-mhts-red-deep">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        </div>
      </section>

      {/* Newsletter subscribe bar */}
      <NewsletterSubscribeBar />


    </div>
  );
};

export default BlogPostPage;
