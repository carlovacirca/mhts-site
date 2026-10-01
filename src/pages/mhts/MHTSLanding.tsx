import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/lib/motion";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Clock,
  Lock,
  Mail,
  MapPin,
  Phone,
  Star,
  UserCheck,
} from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import OpeningHours from "@/components/OpeningHours";
import { blogPosts } from "@/data/blogPosts";
import ResponsiveImage from "@/components/ResponsiveImage";
import { latestPosts } from "@/lib/publishing";
import { useSeo, useJsonLd, localBusinessSchema } from "@/lib/seo";
import { useCookieConsent } from "@/lib/cookieConsent";
import { treatments } from "@/data/treatments";
import { ADDRESS_LINE, EMAIL, GOOGLE_MAPS_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { BookButton, CallButton, CtaPair } from "@/components/mhts/CtaButtons";
import BeforeAfterStrip from "@/components/mhts/BeforeAfterStrip";
import GoogleReviews from "@/components/mhts/GoogleReviews";
import BookingPanel from "@/components/mhts/BookingPanel";
import StudioMap from "@/components/mhts/StudioMap";
import { SNAP_HERO_CLASS, SNAP_PHONE_CLASS, SNAP_SECTION_CLASS, SNAP_SPLIT_CLASS, snapPageClass } from "@/lib/sectionSnap";
import mhtsHero from "@/assets/mhts-hero.jpg";
import studioWide from "@/assets/mhts-studio-wide-hero.jpg";
import mhtsBefore1 from "@/assets/mhts-before-1.jpg";
import mhtsAfter1 from "@/assets/mhts-after-1.jpg";
import mhtsBefore2 from "@/assets/mhts-before-2.jpg";
import mhtsAfter2 from "@/assets/mhts-after-2.jpg";
import mhtsBefore3 from "@/assets/mhts-before-3.jpg";
import mhtsAfter3 from "@/assets/mhts-after-3.jpg";

// Homepage, rebuilt for batch 4a.
//
// The order is the whole point. The before and after photographs used to start
// 3,359px down a phone screen, four screens below the fold, behind a trust
// strip, the services grid and a maintenance panel. For this business those
// photographs are the sale, so they now sit directly under the hero with the
// Google reviews immediately after them. See docs/DESIGN-AUDIT.md findings 1
// and 9, and Carlo's decisions of 28 September.
//
// The title, meta description, canonical and h1 are byte for byte what they
// were. Only the order, the colour and the components around them changed.

const beforeAfterPairs = [
  {
    before: mhtsBefore1,
    after: mhtsAfter1,
    beforeAlt: "Men's Hair To Stay client before a hair system fitting",
    afterAlt: "The same Men's Hair To Stay client after a hair system fitting",
    label: "Client one, hair system",
  },
  {
    before: mhtsBefore2,
    after: mhtsAfter2,
    beforeAlt: "Men's Hair To Stay client with a thinning crown before treatment",
    afterAlt: "The same Men's Hair To Stay client with full coverage after treatment",
    label: "Client two, crown coverage",
  },
  {
    before: mhtsBefore3,
    after: mhtsAfter3,
    beforeAlt: "Men's Hair To Stay client before a hair system fitting",
    afterAlt: "The same Men's Hair To Stay client after a hair system fitting",
    label: "Client three, hair system",
  },
];

// Phone: a square frame, one client at a time in the strip. Desktop: a 4:5
// frame, three across.
const BA_FRAME = "aspect-square md:aspect-[4/5]";
const BA_SIZES = "(max-width: 768px) 85vw, 290px";

const SeeAllResults = () => (
  <Link
    to="/gallery"
    className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-mhts-red-deep transition-all hover:gap-2.5"
  >
    See all results <ChevronRight className="h-4 w-4" aria-hidden="true" />
  </Link>
);

// No photographs (PR #8, third review): each treatment has its own colour
// instead, from a palette built on the logo red and the warm neutrals, so the
// four read apart at a glance and the whole section fits one phone screen.
// Every pairing of text and background is AA: white on red-deep 6.5:1, on
// terracotta 6.4:1, on the deep charcoal 18:1; ink on sand 14:1 with the
// red-deep link 5.8:1. The lighter line of text is white at 90%, 5.6:1 or more.
const CARD_TONES: Record<string, { card: string; icon: string; text: string; line: string; cta: string; glow?: string }> = {
  "hair-systems": {
    card: "bg-mhts-red-deep border-mhts-red-deep",
    icon: "bg-white/15 text-white",
    text: "text-white",
    line: "text-white/90",
    cta: "text-white",
  },
  "scalp-micropigmentation": {
    card: "bg-mhts-deep border-mhts-deep",
    icon: "bg-mhts-red text-white",
    text: "text-white",
    line: "text-white/90",
    cta: "text-white",
    glow: "bg-[radial-gradient(90%_70%_at_100%_0%,hsl(var(--mhts-red)/0.45),transparent_70%)]",
  },
  "hair-density": {
    card: "bg-[#9A4527] border-[#9A4527]",
    icon: "bg-white/15 text-white",
    text: "text-white",
    line: "text-white/90",
    cta: "text-white",
  },
  "hair-system-maintenance": {
    card: "bg-mhts-sand border-mhts-stone",
    icon: "bg-mhts-red text-white",
    text: "text-mhts-ink",
    line: "text-mhts-ink/80",
    cta: "text-mhts-red-deep",
  },
};

// The four-paragraph trust strip was 10 to 11px grey text on charcoal, which
// nobody read. Four chips, a few words each. See finding 15.
const trustChips = [
  { icon: Lock, label: "100% confidential" },
  { icon: Award, label: "Specialist trained" },
  { icon: Clock, label: "8+ years experience" },
  { icon: UserCheck, label: "By appointment only" },
];

const maintenanceTips = [
  "Regroom every 4 to 6 weeks",
  "Gentle, sulphate-free shampoo",
  "Go easy on heat styling",
  "Call us the moment something feels wrong",
];

// Four on the page, four in the schema. Google asks that marked-up questions
// are the ones the reader can actually see, so this list and the accordion
// below are the same list.
const homeFaqs = [
  {
    q: "How long does a hair system last?",
    a: "A high-quality hair system typically lasts 6 to 12 months with proper care and regular maintenance. We recommend a regroom or maintenance appointment every 4 to 6 weeks to keep your hair system looking fresh, natural, and undetectable.",
  },
  {
    q: "Is hair replacement undetectable?",
    a: "Yes, when expertly fitted and styled, our hair systems are virtually undetectable. We custom-match hair colour, density, and texture to blend seamlessly with your natural hair for a completely natural look.",
  },
  {
    q: "Is SMP painful?",
    a: "Scalp micropigmentation (SMP) is a non-invasive treatment with minimal discomfort. Most clients describe the sensation as mild and tolerable. A topical numbing agent can be applied to ensure your session is as comfortable as possible.",
  },
  {
    q: "How much does a consultation cost?",
    a: "Your initial consultation is completely free. There is no obligation. We will assess your hair loss, discuss your goals, and recommend the best hair system or SMP treatment for your needs.",
  },
];

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const areas = [
  "Amersham",
  "Chesham",
  "High Wycombe",
  "Beaconsfield",
  "Chalfont St Giles",
  "Little Chalfont",
  "Gerrards Cross",
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">{children}</p>
);

const MHTSLanding = () => {
  useSeo({
    title: "Hair Replacement Systems & SMP in Amersham | 8+ Years",
    description:
      "Professional non-surgical hair replacement systems and scalp micropigmentation (SMP) in Amersham. Free consultation. Specialist technicians. 100% confidential.",
    canonicalPath: "/",
    jsonLd: localBusinessSchema,
  });

  useJsonLd(homeFaqJsonLd);

  const cookieConsent = useCookieConsent();

  useEffect(() => {
    if (cookieConsent !== "accepted") return;
    const script = document.createElement("script");
    script.src = "https://menshairtostay.trafft.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [cookieConsent]);

  // Batch 4b: with SECTION_SNAP on (src/lib/sectionSnap.ts) every section
  // below fills one screen and a scroll moves to the next. The sections were
  // trimmed to fit 390x844 and 1280x800: treatments and the blog became
  // swipeable strips, the trust chips and the maintenance note share one
  // screen, and the old booking section is two screens, Book and Contact, with
  // the areas line moved to the closing screen. Every link that was on this
  // page is still on it.
  const S = SNAP_SECTION_CLASS;

  return (
    <div className={`mhts-theme ${snapPageClass()}`}>
      {/* ─── 1. HERO ─── */}
      <section className={`${S} ${SNAP_HERO_CLASS} relative flex min-h-[72vh] items-center overflow-clip`}>
        <ResponsiveImage
          src={mhtsHero}
          alt="Men's Hair To Stay studio"
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        {/* Lighter than it was: the studio the reader is being asked to walk
            into was almost invisible behind the old 90 per cent overlay. */}
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-deep/85 via-mhts-deep/60 to-mhts-deep/20" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_50%,hsl(var(--mhts-red)/0.18),transparent_70%)]" />
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl">
            <p className="mb-4 font-body text-sm uppercase tracking-[0.24em] text-white/70">
              Specialist Hair Replacement
            </p>
            <h1 className="mb-6 text-4xl leading-[1.05] text-white md:text-6xl">
              Your Confidence,<br />
              <span className="text-mhts-red-light">Restored.</span>
            </h1>
            <p className="mb-8 max-w-md font-body text-lg text-white/80">
              Premium hair systems &amp; scalp micropigmentation, delivered with discretion in Amersham.
            </p>
            <CtaPair size="lg" tone="dark" href="#mhts-book" />

            {/* Proof, in the first screen. No rating figure and no review count:
                neither is ours to state, and nothing here is invented. */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-body text-sm text-white/80">
              <span className="flex items-center gap-2">
                <span className="flex items-center gap-0.5" role="img" aria-label="Five stars">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-4 w-4 fill-mhts-red-light text-mhts-red-light" aria-hidden="true" />
                  ))}
                </span>
                <a href="#mhts-reviews" className="underline-offset-4 hover:underline">
                  Google reviews
                </a>
              </span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <span>8+ years</span>
              <span className="hidden h-4 w-px bg-white/25 sm:block" />
              <span>Private studio in Amersham</span>
            </div>
          </div>
        </div>
      </section>
      {/* Marks where the hero ends, so the sticky bottom bar knows when to appear. */}
      <div id="mhts-hero-end" aria-hidden="true" />

      {/* ─── 2. BEFORE AND AFTER, directly under the hero ─── */}
      {/* One frame per client that fades from Before to After; no handle and
          no instructions. On a phone the clients take turns in a swipeable
          strip like the reviews: Before 2s, After 2s, then the next client
          (BeforeAfterStrip). On a desktop the three sit in one row, each
          looping on its own, as before. */}
      <section id="mhts-gallery" className={`${S} scroll-mt-24 bg-card py-8 md:py-12`}>
        {/* display:contents from md up, so the row sits exactly as before. */}
        <div className="container mx-auto px-4 md:contents">
          <div className="mb-5 text-center md:mb-8">
            <Eyebrow>Real clients</Eyebrow>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Before and after</h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
            <p className="mx-auto mt-3 max-w-xl font-body text-sm text-muted-foreground md:text-base">
              Three of our own clients, photographed at the studio.
            </p>
          </div>
          <BeforeAfterStrip pairs={beforeAfterPairs} frameClassName={BA_FRAME} sizes={BA_SIZES} />
          <div className="mt-4 flex justify-center md:mt-8">
            <SeeAllResults />
          </div>
        </div>
      </section>

      {/* ─── 3. GOOGLE REVIEWS ─── */}
      <section id="mhts-reviews" className={`${S} scroll-mt-24 bg-mhts-sand py-10 md:py-12`}>
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center md:mb-8">
            <Eyebrow>What clients say</Eyebrow>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Reviews from Google</h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
          </div>
          <div className="mx-auto max-w-5xl">
            <GoogleReviews compact />
          </div>
        </div>
      </section>

      {/* ─── 4. TREATMENTS ─── */}
      <section id="mhts-services" className={`${S} scroll-mt-24 bg-card py-6 md:py-12`}>
        <div className="container mx-auto px-4">
          <div className="mb-4 text-center md:mb-10">
            <Eyebrow>What we do</Eyebrow>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Our treatments</h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
          </div>
          {/* Two by two on a phone and a tablet, four in a row from lg. No
              swiping: the heading and all four cards are one phone screen,
              above the bottom bar, down to 360x740. Equal heights from the
              grid's equal rows; the whole card is the link. */}
          <div className="mx-auto grid max-w-5xl auto-rows-fr grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {treatments.map((t, i) => {
              const tone = CARD_TONES[t.slug];
              return (
                <Reveal key={t.slug} delay={i * 0.06} className="h-full">
                  <Link
                    to={`/${t.slug}`}
                    data-treatment-card={t.slug}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border p-3.5 shadow-sm transition-[transform,box-shadow] duration-200 hover:shadow-lg motion-safe:hover:-translate-y-1 motion-safe:active:scale-[0.98] sm:p-5 ${tone.card}`}
                  >
                    {tone.glow && <span className={`pointer-events-none absolute inset-0 ${tone.glow}`} aria-hidden="true" />}
                    <span className={`relative mb-3 grid h-11 w-11 place-items-center rounded-xl sm:mb-4 sm:h-14 sm:w-14 ${tone.icon}`}>
                      <t.icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                    </span>
                    <h3 lang="en-GB" className={`relative mb-1 hyphens-auto break-words text-[15px] font-semibold leading-snug sm:mb-2 sm:text-lg ${tone.text}`}>
                      {t.name}
                    </h3>
                    <p className={`relative flex-1 font-body text-[13px] leading-snug sm:text-sm sm:leading-relaxed ${tone.line}`}>{t.line}</p>
                    <span className={`relative mt-3 inline-flex items-center gap-1.5 font-body text-[13px] font-semibold transition-[gap] group-hover:gap-2.5 sm:mt-4 sm:text-sm ${tone.cta}`}>
                      See treatment <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 5. WHY US AND MAINTENANCE, one screen on the dark band ─── */}
      <section className={`${S} relative overflow-clip bg-mhts-deep py-10 md:py-12`}>
        <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,hsl(var(--mhts-red)/0.22),transparent_65%)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-2.5 md:gap-4">
            {trustChips.map((chip, i) => (
              <Reveal key={chip.label} delay={i * 0.05}>
                <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-2.5 pl-2.5 pr-4 md:gap-3 md:pr-5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mhts-red-light/15">
                    <chip.icon className="h-4 w-4 text-mhts-red-light" aria-hidden="true" />
                  </span>
                  <p className="whitespace-nowrap font-body text-[13px] font-medium leading-none text-white md:text-sm">{chip.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-10 flex max-w-4xl flex-col gap-6 rounded-xl border border-mhts-stone bg-card p-7 md:mt-12 md:flex-row md:items-center md:p-8">
            <div className="md:flex-1">
              <h2 className="text-xl text-mhts-ink md:text-2xl">Maintenance and aftercare</h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                Your result is kept, not just fitted. Regular appointments are what keep a system
                undetectable and SMP even.
              </p>
            </div>
            <ul className="grid gap-3 md:flex-1 md:grid-cols-2 md:gap-2">
              {maintenanceTips.map((tip) => (
                <li key={tip} className="flex items-start gap-2 font-body text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mhts-red" aria-hidden="true" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── 6. FAQ, four questions ─── */}
      <section className={`${S} bg-card py-10 md:py-12`}>
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center md:mb-8">
            <Eyebrow>Your questions answered</Eyebrow>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">
              Frequently Asked Questions About Hair Systems &amp; SMP
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {homeFaqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i + 1}`}>
                  <AccordionTrigger className="py-5 text-left font-semibold text-mhts-ink hover:text-mhts-red-deep md:py-4">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body leading-relaxed text-foreground/80">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-8 text-center md:mt-6">
              <Link
                to="/faq"
                className="inline-flex items-center gap-2 rounded-md border border-mhts-stone-deep px-7 py-3 font-body text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
              >
                View all FAQs <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. LATEST FROM THE BLOG ─── */}
      <section className={`${S} bg-mhts-sand py-10 md:py-12`}>
        <div className="container mx-auto px-4">
          <div className="mb-6 text-center md:mb-8">
            <Eyebrow>From the blog</Eyebrow>
            <h2 className="text-2xl text-mhts-ink md:text-4xl">
              Latest Articles &amp; Expert Advice on Hair Replacement
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
          </div>
          {/* One post per swipe on a phone with the next one peeking, three
              across from md. */}
          <div className="mhts-snap-x -mx-4 flex max-w-5xl snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-auto md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {/* Live posts only. This strip showed future-dated posts early. */}
            {latestPosts(blogPosts, 3).map((post, i) => (
              <Reveal key={post.slug} as="article" delay={i * 0.06} className="w-[80%] shrink-0 snap-start snap-always md:h-full md:w-auto md:snap-align-none">
                <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-mhts-stone bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                  {post.image && (
                    <Link to={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden">
                      <ResponsiveImage
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 80vw, 380px"
                      />
                    </Link>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <time className="mb-2 font-body text-xs uppercase tracking-wider text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                    <h3 className="mb-2 text-base leading-snug text-mhts-ink md:text-lg">
                      <Link to={`/blog/${post.slug}`} className="transition-colors hover:text-mhts-red-deep">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="line-clamp-2 flex-1 font-body text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    {/* aria-label carries the post title so the link is not three
                        identical "Read More" links to a screen reader or to Google,
                        while the visible wording stays the same. Finding 25. */}
                    <Link
                      to={`/blog/${post.slug}`}
                      aria-label={`Read more: ${post.title}`}
                      className="mt-4 inline-flex items-center gap-1.5 font-body text-sm font-semibold text-mhts-red-deep transition-all hover:gap-2.5"
                    >
                      Read More <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 rounded-md border border-mhts-stone-deep px-7 py-3 font-body text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
            >
              Visit Our Blog <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 8. BOOK ─── */}
      <section id="mhts-book" className={`${S} scroll-mt-24 bg-card pt-8 md:pt-12`}>
        <div className="w-full">
          <div className="container mx-auto mb-6 px-4 text-center md:mb-8">
            <Eyebrow>Free, private, no obligation</Eyebrow>
            <h2 className="text-3xl text-mhts-ink md:text-4xl">Book a Consultation</h2>
            <div className="mx-auto mt-3 h-0.5 w-12 bg-mhts-red" />
            <p className="mx-auto mt-3 max-w-xl font-body text-muted-foreground">
              Pick a time below, or call us and we will find one for you.
            </p>
          </div>

          {cookieConsent === "accepted" ? (
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
          ) : (
            <BookingPanel compact />
          )}
        </div>
      </section>

      {/* ─── 9. CONTACT, hours and the map ─── */}
      <section id="mhts-contact" className={`${S} scroll-mt-24 bg-mhts-sand py-6 md:py-12`}>
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6">
            <div className="rounded-xl border border-mhts-stone bg-card p-5 md:p-6">
              <h3 className="mb-3 text-base text-mhts-ink md:mb-4">Contact</h3>
              <div className="space-y-3 md:space-y-4">
                <a
                  href={`tel:${PHONE_TEL}`}
                  data-cta="call"
                  className="flex items-center gap-3 font-body text-mhts-ink transition-colors hover:text-mhts-red-deep"
                >
                  <Phone className="h-5 w-5 text-mhts-red" aria-hidden="true" />
                  <span className="text-lg tracking-wide">{PHONE_DISPLAY}</span>
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 break-all font-body text-mhts-ink transition-colors hover:text-mhts-red-deep"
                >
                  <Mail className="h-5 w-5 shrink-0 text-mhts-red" aria-hidden="true" />
                  <span>{EMAIL}</span>
                </a>
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-body text-foreground/80 transition-colors hover:text-mhts-red-deep"
                >
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-mhts-red" aria-hidden="true" />
                  <span>{ADDRESS_LINE}</span>
                </a>
              </div>
              {/* The hours inside the contact card rather than a box of their
                  own: as a separate box the section did not fit a phone screen. */}
              <div className="mt-4 border-t border-mhts-stone pt-3 md:mt-5 md:pt-4">
                <OpeningHours columns />
              </div>
            </div>
            <StudioMap compact />
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA BAND, with the areas line ─── */}
      <section className={`${S} relative overflow-clip bg-mhts-deep py-10 md:py-16`}>
        <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
        <div className="mhts-fill-chain container relative mx-auto px-4 text-center">
          <h2 className="text-2xl text-white md:text-3xl">Ready when you are</h2>
          <p className="mx-auto mt-3 max-w-lg font-body text-white/75">
            The first consultation is free and takes about half an hour. Nothing is discussed
            anywhere but the studio.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BookButton size="lg" href="#mhts-book" />
            <CallButton size="lg" tone="dark" />
          </div>

          {/* Phone only: the studio the reader is being invited to, filling
              the screen between the buttons and the areas line. */}
          <ResponsiveImage
            src={studioWide}
            alt="The Men's Hair To Stay studio in Amersham"
            className="mhts-fill mt-8 aspect-[16/10] w-full rounded-xl object-cover md:hidden"
            sizes="100vw"
          />

          {/* Areas, one line of links rather than a section of its own. */}
          <div id="mhts-areas" className="mx-auto mt-8 max-w-3xl scroll-mt-24 border-t border-white/15 pt-6 md:mt-12">
            <p className="font-body text-sm leading-relaxed text-white/75">
              <span className="font-semibold text-white">Serving </span>
              {areas.map((area, i) => (
                <span key={area}>
                  <Link
                    to="/areas-serviced"
                    className="text-mhts-red-light underline-offset-4 hover:underline"
                  >
                    {area}
                  </Link>
                  {i < areas.length - 1 ? ", " : " "}
                </span>
              ))}
              and{" "}
              <Link to="/areas-serviced" className="text-mhts-red-light underline-offset-4 hover:underline">
                the rest of Buckinghamshire
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MHTSLanding;
