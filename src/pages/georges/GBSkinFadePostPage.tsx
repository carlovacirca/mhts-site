import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ArrowLeft,
  ChevronDown,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import RelatedVideo from "@/components/RelatedVideo";
import NewsletterSubscribeBar from "@/components/NewsletterSubscribeBar";
import GBRelatedFaqs from "@/components/GBRelatedFaqs";
import { withInjectedImages } from "@/lib/blogImageSlots";
import gbSkinFadeInline1 from "@/assets/gb-skin-fade-inline-1.jpg";
import gbSkinFadeInline2 from "@/assets/gb-skin-fade-inline-2.jpg";
import gbSkinFadeInline3 from "@/assets/gb-skin-fade-inline-3.jpg";
import gbSkinFadeInline4 from "@/assets/gb-skin-fade-inline-4.jpg";
import gbSkinFadeHero from "@/assets/gb-skin-fade-hero.jpg";

const inlineImageOverrides: string[] = [gbSkinFadeInline1, gbSkinFadeInline2, gbSkinFadeInline3, gbSkinFadeInline4];

const post = {
  slug: "skin-fade-amersham-complete-guide",
  title:
    "Skin Fade Haircuts in Amersham: The Complete Guide to Getting It Right",
  metaDescription:
    "Everything you need to know about skin fades in Amersham. What they are, the different types, how to ask for one, how long they last, and where to get the best skin fade near you.",
  date: "2026-05-25",
  readTime: "12 min read",
  author: "Georges Barbers Team",
  category: "Barbering",
  excerpt:
    "Everything you need to know about skin fades in Amersham — types, how to ask, how long they last, and where to get the best fade near you.",
  content: `The skin fade has become one of the most popular haircuts in the UK, and it is easy to see why. Clean, sharp, versatile and suitable for almost every hair type, it works just as well in the office as it does on a night out.

But getting a great skin fade depends entirely on your barber. A well-executed skin fade takes skill, precision and an eye for blending. Get it wrong and you end up with harsh lines, uneven gradients and a haircut that looks tired within a week.

At Georges Barbers in Amersham, skin fades have been a staple since long before they became a trend. Serving the local community for over 34 years, the team on Chesham Road know exactly how to deliver a clean, precise skin fade that suits your face shape, hair type and lifestyle.

This guide covers everything you need to know before booking your next skin fade in Amersham.

## What Is a Skin Fade?

A skin fade is a haircut where the hair gradually transitions from your natural length at the top down to the skin at the sides and back. The key word is gradual. A true skin fade has no visible line or sudden change. It blends smoothly from full length to completely bare skin, creating a seamless gradient effect.

[IMAGE]

The term skin fade specifically refers to the hair being cut all the way down to the skin at the lowest point. This is what distinguishes it from a regular fade or a taper, where some hair is always left at the shortest point.

Skin fades can be combined with almost any length or style on top, which is why they have become so widely popular across all ages and hair types.

The key components of a skin fade:

- The top: your chosen length and style, from a crop to longer textured hair
- The blend: the gradient transition from top length down to the sides
- The fade: the point where the hair disappears completely into the skin
- The neckline: shaped and tapered at the back to complement the overall cut

## The Different Types of Skin Fade

Not all skin fades are the same. The position of the fade on your head changes the entire look and feel of the haircut. Here are the main types:

[IMAGE]

**Low skin fade:** The fade begins just above the ear and the neckline, keeping the sides fuller. This is the most subtle option and works well for professional settings or those trying a fade for the first time. It still gives a clean, sharp finish without taking too much off.

**Mid skin fade:** The fade starts around the midpoint of the head, roughly level with the temples. This is the most popular and versatile option, sitting between the subtlety of a low fade and the boldness of a high fade. A mid skin fade suits most face shapes and styles.

**High skin fade:** The fade begins much higher up, close to the top of the sides. This creates maximum contrast between the longer hair on top and the bare skin below. It is a bold, statement look that works especially well with textured crops, quiffs or longer styles on top.

**Bald fade:** A bald fade is another name for a skin fade taken to a completely clean, smooth finish at the lowest point. Sometimes called a zero fade, it leaves no stubble whatsoever at the base.

**Drop fade:** A variation where the fade curves downward behind the ear rather than running in a horizontal line. This gives a more curved, natural shape that many people find flattering, particularly with curly or textured hair.

## Skin Fade vs Taper Fade: What Is the Difference?

This is one of the most common questions barbers get asked, and it is worth understanding before you sit in the chair.

A skin fade takes the hair all the way down to the skin at the lowest point. A taper fade leaves a small amount of hair at the bottom, it just gets progressively shorter as it goes down. Neither is better than the other. They simply create a different finished look.

[IMAGE]

Choose a skin fade if you want:

- Maximum contrast and a very clean, sharp finish
- A bold, defined look
- A haircut that photographs well and holds its shape clearly

Choose a taper fade if you want:

- A softer, more blended finish
- Something slightly less high-maintenance between cuts
- A subtler look that works in more conservative settings

If you are unsure which suits you, the team at Georges Barbers will talk you through the options before they pick up the clippers. You never have to walk in knowing exactly what you want.

## How to Ask for a Skin Fade

One of the most common issues people have is not knowing how to explain what they want. Here is exactly what to tell your barber.

[IMAGE]

**Tell them the type of fade:** Low, mid or high. If you are not sure, say so and show a reference photo on your phone.

**Tell them the top length:** Use clipper guard numbers or say short, medium or longer on top. A number two on the sides with a textured crop on top is a perfectly clear instruction.

**Tell them the blend style:** Skin fade, taper or bald. Most barbers will default to skin fade if you use that phrase.

**Bring a photo:** This removes all ambiguity. A quick Google image search for the style you want takes seconds and saves any confusion. Your barber will appreciate it.

At Georges Barbers, walk-ins are always welcome seven days a week so you can come in at a time that suits you, no planning needed.

## What Styles Work With a Skin Fade?

The skin fade works with a huge variety of styles on top. Here are the most popular combinations currently:

**Textured crop with skin fade:** One of the most popular haircuts in the UK right now. Short textured hair on top with a clean skin fade on the sides. Low maintenance, sharp and works with most hair types.

**Quiff with skin fade:** Longer hair swept upward at the front with a mid or high skin fade. A classic combination that has been around for decades for good reason.

**Buzz cut with skin fade:** Very short all over with the skin fade creating definition at the sides and back. Extremely low maintenance and clean.

**Curly hair with skin fade:** Curly and Afro-textured hair works brilliantly with a skin fade. The contrast between the natural curl on top and the clean fade below creates a sharp, defined look.

**Long hair with skin fade:** Longer hair on top, sometimes worn loose or tied back, with a high skin fade underneath. A modern style that blends casual and sharp in equal measure.

[IMAGE]

## How Long Does a Skin Fade Last?

A skin fade looks its best in the first one to two weeks after the cut. After that, as the hair at the sides starts to grow back, the gradient begins to lose its sharpness.

Most people with a skin fade visit their barber every two to four weeks to keep it looking clean. If you prefer to stretch it out a little longer, a low skin fade will hold its shape better than a high one as there is more hair at the sides to grow into.

Regular visits are the best way to keep a skin fade looking precise. The good news is that Georges Barbers is open seven days a week with no appointment needed, so fitting in a quick top-up around your schedule is straightforward.

## Does a Skin Fade Suit Every Face Shape?

Almost, yes. The skin fade is one of the most adaptable haircuts because the placement of the fade can be adjusted to complement your face shape.

**Round face:** A high fade with height on top will elongate the face and create the impression of a slimmer profile.

**Square face:** A mid fade with textured length on top softens the strong jaw and balances the overall look.

**Oval face:** Oval faces suit most fade styles. A mid skin fade with a crop or quiff works particularly well.

**Oblong face:** A low fade keeps the sides fuller and avoids adding too much height, which can make a long face appear longer.

**Diamond face:** A mid fade with some volume on top and minimal width at the sides suits this shape best.

[IMAGE]

Not sure what face shape you have or what will suit you? Come in for a chat. The barbers at Georges Barbers are happy to advise before they start cutting.

## How Much Does a Skin Fade Cost in Amersham?

Pricing varies depending on the barber, the salon and the area. At Georges Barbers in Amersham, you get a skilled, experienced barber at a price that reflects the local community they have served for over 34 years.

Cuts start at £20 for a men's dry cut, with the skin fade included as part of your chosen style. Student pricing is available at £18 with valid ID. Boys cuts start from £12.

There are no hidden extras and no upselling. You come in, you get the cut you want, you leave looking sharp.

## Why Georges Barbers Is Amersham's Go-To Skin Fade Barber

Skin fades require genuine skill. The blend has to be seamless, the gradient has to be even, and the neckline has to be precise. There is no hiding a bad fade.

[IMAGE]

Georges Barbers has been delivering precision haircuts from 11 Chesham Road, Amersham since 1991. Over 34 years of experience means the team have cut every hair type, every face shape and every variation of fade you can think of.

Walk-ins are welcome seven days a week. You do not need an appointment. Online booking is also available Monday to Friday if you prefer to plan ahead.

Customers come from across the area including Chesham, Chalfont St Giles, Great Missenden, Little Chalfont, Beaconsfield and beyond, because a great fade is worth the short drive.

## Walk In or Book Online?

Georges Barbers keeps it simple. You can walk in any day of the week with no appointment needed. If you prefer to secure a specific time Monday to Friday, online booking is available through the website.

Saturday and Sunday are walk-in only, so just turn up when it suits you.

## Take Action: Book Your Skin Fade in Amersham

Ready to get a clean, precise skin fade from one of Amersham's most experienced barbershops? Walk in any day of the week or book online Monday to Friday.

Find us at 11 Chesham Road, Amersham HP6 5HN. Call 01494 432131 or visit menshairtostay.co.uk/georges-barbers to book your appointment.

Georges Barbers. Amersham's original barbershop since 1991.`,
};


const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
      <Link key={i} to={href} className="text-mhts-charcoal underline hover:no-underline">
        {lt}
      </Link>
    ) : (
      <a
        key={i}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-mhts-charcoal underline hover:no-underline"
      >
        {lt}
      </a>
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

const GBSkinFadePostPage = () => {
  const [progress, setProgress] = useState(0);


  const blocks = useMemo(
    () => withInjectedImages(parseContent(post.content), () => ({ type: "img" } as Block)),
    [],
  );
  const toc = blocks.filter((b) => b.type === "h2") as Required<
    Pick<Block, "text" | "id">
  >[];

  useEffect(() => {
    document.title = `${post.title} | Georges Barbers Amersham`;
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute("content", post.metaDescription);
    if (!meta.parentNode) document.head.appendChild(meta);

    const setOg = (prop: string, content: string) => {
      let el = document.querySelector(
        `meta[property="${prop}"]`
      ) as HTMLMetaElement | null;
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
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgress(total > 0 ? Math.min(100, (h.scrollTop / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <div className="w-full h-[40vh] md:h-[60vh] overflow-hidden">
          <img
            src={gbSkinFadeHero}
            alt="Barber performing a precise skin fade haircut at Georges Barbers in Amersham"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 pt-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="inline w-3 h-3 mx-1" />
        <Link to="/georges-barbers/blog" className="hover:text-foreground">
          Blog
        </Link>
        <ChevronRight className="inline w-3 h-3 mx-1" />
        <span className="text-foreground line-clamp-1 inline">{post.title}</span>
      </div>

      {/* Title block */}
      <div className="container mx-auto px-4 pt-6 grid lg:grid-cols-[1fr_280px] gap-8">
        <section>
          <div className="mb-4">
            <Link
              to="/georges-barbers/blog"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
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
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
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
          {/* Collapsible TOC */}
          {toc.length > 0 && (
            <Collapsible
              defaultOpen
              className="not-prose mb-10 border border-border rounded-lg bg-mhts-light/40"
            >
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
                      <a
                        href={`#${h.id}`}
                        className="text-muted-foreground hover:text-mhts-charcoal transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </CollapsibleContent>
            </Collapsible>
          )}

          {(() => {
            let imgIdx = 0;
            return blocks.map((b, i) => {
            const key = `b-${i}`;
            if (b.type === "h2")
              return (
                <h2
                  id={b.id}
                  key={key}
                  className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-mhts-charcoal scroll-mt-24"
                >
                  {b.text}
                </h2>
              );
            if (b.type === "h3")
              return (
                <h3
                  id={b.id}
                  key={key}
                  className="text-xl font-semibold mt-6 mb-3 text-mhts-charcoal scroll-mt-24"
                >
                  {b.text}
                </h3>
              );
            if (b.type === "ul")
              return (
                <ul
                  key={key}
                  className="list-disc pl-6 my-4 space-y-1.5 text-foreground/90"
                >
                  {b.items!.map((it, j) => (
                    <li key={j}>{renderInline(it)}</li>
                  ))}
                </ul>
              );
            if (b.type === "ol")
              return (
                <ol
                  key={key}
                  className="list-decimal pl-6 my-4 space-y-1.5 text-foreground/90"
                >
                  {b.items!.map((it, j) => (
                    <li key={j}>{renderInline(it)}</li>
                  ))}
                </ol>
              );
            if (b.type === "img") {
              const override = inlineImageOverrides[imgIdx++];
              if (override)
                return (
                  <div
                    key={key}
                    className="not-prose my-8 aspect-[16/9] w-full rounded-lg overflow-hidden border border-border bg-mhts-light/50"
                  >
                    <img
                      src={override}
                      alt="Skin fade haircut at Georges Barbers Amersham"
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                );
              return (
                <div
                  key={key}
                  className="not-prose my-8 aspect-[16/9] w-full rounded-lg border-2 border-dashed border-border bg-mhts-light/50 flex items-center justify-center text-muted-foreground"
                >
                  <div className="flex flex-col items-center gap-2 text-sm">
                    <ImageIcon className="w-8 h-8" />
                    <span>Image placeholder</span>
                  </div>
                </div>
              );
            }
            return (
              <p key={key} className="my-4 leading-relaxed text-foreground/90">
                {renderInline(b.text!)}
              </p>
            );
            });
          })()}
        </article>


        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start hidden lg:block">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-3">
              <Share2 className="w-3 h-3" /> Share
            </p>
            <div className="flex flex-row gap-2">
              <a
                target="_blank"
                rel="noopener"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener"
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                target="_blank"
                rel="noopener"
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                className="p-2 rounded-md border border-border hover:bg-mhts-light transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Category
            </p>
            <Link
              to="/georges-barbers"
              className="inline-block px-3 py-1 bg-mhts-light text-mhts-charcoal text-xs rounded-full hover:bg-mhts-charcoal hover:text-mhts-white transition-colors"
            >
              {post.category}
            </Link>
          </div>
          <div className="bg-mhts-charcoal text-mhts-white p-5 rounded-lg">
            <h4 className="font-bold mb-2">Book your skin fade</h4>
            <p className="text-sm text-mhts-white/80 mb-4">
              Walk in any day or book online Mon–Fri at Georges Barbers Amersham.
            </p>
            <Link to="/georges-barbers#gb-book">
              <Button className="w-full bg-mhts-white text-mhts-charcoal hover:bg-mhts-white/90">
                Book a Visit
              </Button>
            </Link>
          </div>
          <GBRelatedFaqs tags={["fade", "haircut"]} />
        </aside>

      </div>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 pb-12">
        <div className="bg-mhts-charcoal text-mhts-white rounded-xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Book your skin fade in Amersham
          </h2>
          <p className="text-mhts-white/80 max-w-2xl mx-auto mb-6">
            Walk in any day of the week, or book online Monday to Friday. 11
            Chesham Road, Amersham HP6 5HN.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:01494432131">
              <Button
                size="lg"
                className="bg-mhts-white text-mhts-charcoal hover:bg-mhts-white/90"
              >
                Call 01494 432131
              </Button>
            </a>
            <Link to="/georges-barbers#gb-book">
              <Button
                size="lg"
                variant="outline"
                className="border-mhts-white text-mhts-white hover:bg-mhts-white hover:text-mhts-charcoal"
              >
                Book Online
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Video */}
      <RelatedVideo
        videoId="CipXbhzvuUo"
        thumbnail="https://i.ytimg.com/vi/CipXbhzvuUo/maxresdefault.jpg"
        title="Perfect fade in 4 minutes | How to cut mens hair"
        url="https://www.youtube.com/watch?v=CipXbhzvuUo"
      />

      {/* Newsletter subscribe bar */}
      <NewsletterSubscribeBar />

    </div>
  );
};

export default GBSkinFadePostPage;
