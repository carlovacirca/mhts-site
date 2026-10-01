import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/lib/motion";
import ResponsiveImage from "@/components/ResponsiveImage";
import ServicePricing, { type PricingRow } from "@/components/ServicePricing";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { findCategory } from "@/data/services";
import { treatments } from "@/data/treatments";
import { servicePhotos, type Photo } from "@/data/servicePhotos";
import { SNAP_PHONE_CLASS, SNAP_SPLIT_CLASS } from "@/lib/sectionSnap";

// The layout behind all 18 treatment pages, batch 4b.
//
// Each page used to be 360 to 415 lines of the same centred eyebrow, thin
// heading, short grey rule and grey card, section after section, with the text
// in a 700px column and nothing beside it. The words are unchanged: every page
// still owns its own copy, h1, title, meta, canonical and schema, and passes the
// copy in here. What changed is the layout around it.
//
//   - A photograph beside each block of text, alternating sides.
//   - One key fact pulled out of each block, quoted word for word from the
//     text next to it (a test holds this), so nothing new is claimed.
//   - The first benefit set large on the dark band, the rest as a list.
//   - The process as a numbered timeline with a red rule.
//   - Related treatment cards at the end, three across at most, never five.
//   - Book and Call together in the hero and the closing band.
//
// Motion: photographs slide in from the side they sit on, text rises. All of
// it goes through src/lib/motion.tsx, so none of it runs for a reader with
// reduced motion or during the pre-render.

export interface ServicePageProps {
  /** The page's own path, which picks its photographs. */
  path: string;
  /** Category slug, for the related cards. */
  category: string;
  /** The sub-service slug, so it is not linked to itself. Omitted on the four category pages. */
  subSlug?: string;
  hero: {
    /** Category pages: the small line above the h1. */
    eyebrow?: string;
    /** Sub-service pages: the link back to the category. */
    back?: { to: string; label: string };
    title: ReactNode;
    lead: ReactNode;
  };
  pricing?: PricingRow[];
  about: TextBlock;
  benefits: { eyebrow: string; title: string; items: { icon: LucideIcon; text: string }[] };
  included?: { eyebrow: string; title: string; items: string[] };
  who: TextBlock;
  steps: { eyebrow: string; title: string; items: { title: string; desc: string }[] };
  related: { eyebrow: string; title: string };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  cta: { title: ReactNode; text: ReactNode };
}

export interface TextBlock {
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  /** Quoted verbatim from `body`. Shown large beside it. */
  fact: string;
}

const Eyebrow = ({ children, dark = false }: { children: ReactNode; dark?: boolean }) => (
  <p
    className={`mb-3 font-body text-xs font-semibold uppercase tracking-[0.18em] ${
      dark ? "text-mhts-red-light" : "text-mhts-red-deep"
    }`}
  >
    {children}
  </p>
);

const Hero = ({ hero, photo, fact }: { hero: ServicePageProps["hero"]; photo?: Photo; fact: string }) => {
  const intro = (
    <>
      {hero.back ? (
        <Link
          to={hero.back.to}
          className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 font-body text-sm text-white/80 transition-colors hover:border-white/50 hover:text-white"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> {hero.back.label}
        </Link>
      ) : (
        <p className="mb-4 font-body text-sm font-semibold uppercase tracking-[0.24em] text-mhts-red-light">
          {hero.eyebrow}
        </p>
      )}
      <h1 className="mb-6 text-4xl leading-[1.08] text-white md:text-5xl lg:text-6xl">{hero.title}</h1>
      <p className="mb-8 max-w-xl font-body text-lg text-white/80">{hero.lead}</p>
      {/* Call sits beside Book on every call to action on the site. */}
      <CtaPair size="lg" tone="dark" href="/#mhts-book" />
      {/* Phone only: the key fact of "What is it" joins the first screen,
          rather than standing alone on a screen of its own (Carlo, after the
          4b fixes preview). From md up it stays beside the text it quotes. */}
      <div aria-hidden="true" className="mt-10 border-l-4 border-mhts-red-light pl-5 md:hidden">
        {/* A short fact gets the large quote mark too, so the screen is not
            left half empty; a long one already fills it. */}
        {fact.length < 60 && (
          <span className="mb-1 block font-body text-5xl font-bold leading-none text-mhts-red-light">&ldquo;</span>
        )}
        <p className="text-[1.4rem] font-semibold leading-snug text-white">{fact}</p>
      </div>
    </>
  );

  // Treatment (pillar) pages: the page's `service` photograph, full bleed.
  if (photo) {
    return (
      <section className="relative flex min-h-[64vh] items-center overflow-clip bg-mhts-deep">
        <ResponsiveImage
          src={photo.src}
          alt={photo.alt}
          className="absolute inset-0 h-full w-full object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-deep/90 via-mhts-deep/70 to-mhts-deep/20" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_10%_60%,hsl(var(--mhts-red)/0.2),transparent_70%)]" />
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl">{intro}</div>
        </div>
      </section>
    );
  }

  // Sub-service pages: the words on the dark band. The framed photograph that
  // sat beside them in 4b is gone (Carlo's two-photograph rule); the page's
  // `service` photograph is beside "What is it" instead.
  return (
    <section className="relative overflow-clip bg-mhts-deep">
      <div className="absolute inset-0 bg-[radial-gradient(55%_80%_at_0%_100%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
      <div className="container relative z-10 mx-auto px-4 py-14 md:py-20">
        <div className="max-w-3xl">{intro}</div>
      </div>
    </section>
  );
};

/** Text on one side, a photograph and the key fact on the other. */
const Split = ({
  id,
  block,
  photo,
  flip,
  tone,
  together = false,
}: {
  id: string;
  block: TextBlock;
  /** Omitted on a treatment page's "What is it": its photograph is the hero. */
  photo?: Photo;
  flip?: boolean;
  tone: "white" | "sand";
  /**
   * Phone: the words and the photograph share one screen, the photograph
   * taking whatever height the words leave ("Who it's for"). Otherwise the
   * words are one screen and the photograph fills the next ("What is it",
   * whose key fact has moved up to the hero on a phone).
   */
  together?: boolean;
}) => (
  <section
    id={id}
    className={`${together ? "" : SNAP_SPLIT_CLASS} scroll-mt-24 md:py-24 ${together ? "py-8" : ""} ${tone === "sand" ? "bg-mhts-sand" : "bg-card"}`}
  >
    <div className={`container mx-auto grid max-w-6xl items-center px-4 md:grid-cols-2 md:gap-14 ${together ? "mhts-fill-chain gap-6" : ""}`}>
      <Reveal className={`${together ? "" : `${SNAP_PHONE_CLASS} py-10`} md:py-0 ${flip ? "md:order-2" : ""}`}>
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h2 className="mb-6 text-3xl leading-tight text-mhts-ink md:text-4xl">{block.title}</h2>
        <div className="space-y-6 font-body leading-[1.7] text-foreground/80 md:space-y-5 md:leading-relaxed">{block.body}</div>
      </Reveal>
      {photo ? (
      <Reveal
        as="figure"
        from={flip ? "left" : "right"}
        className={`${together ? "mhts-fill-chain" : `${SNAP_PHONE_CLASS} py-10`} relative md:py-0 ${flip ? "md:order-1" : ""}`}
      >
        {/* On a phone the photograph grows to fill its screen (mhts-fill). */}
        <ResponsiveImage
          src={photo.src}
          alt={photo.alt}
          className={`mhts-fill aspect-[4/3] w-full rounded-2xl object-cover ${photo.wide ? "" : "md:aspect-[5/6]"}`}
          sizes="(max-width: 768px) 100vw, 560px"
        />
        {/* The key fact. It repeats a line of the text beside it, so it is
            hidden from screen readers rather than read out twice. When the
            photograph has a screen of its own on a phone, the fact is in the
            hero instead. */}
        <figcaption
          aria-hidden="true"
          className={`relative -mt-10 mx-4 rounded-xl border-l-4 border-mhts-red bg-card p-5 shadow-xl md:absolute md:bottom-6 md:mx-0 md:mt-0 md:block md:max-w-[80%] ${
            flip ? "md:-right-6" : "md:-left-6"
          } ${together ? "" : "hidden"}`}
        >
          <p className="text-lg font-semibold leading-snug text-mhts-ink">{block.fact}</p>
        </figcaption>
      </Reveal>
      ) : (
      // No photograph: the key fact alone, set large, as a pull quote. From
      // md up only; on a phone it is in the hero.
      <Reveal as="figure" from={flip ? "left" : "right"} className={`hidden md:block md:py-0 ${flip ? "md:order-1" : ""}`}>
        <div className="border-l-4 border-mhts-red pl-6">
          <span aria-hidden="true" className="mb-2 block font-body text-5xl font-bold leading-none text-mhts-red">&ldquo;</span>
          <figcaption aria-hidden="true">
            <p className="text-2xl font-semibold leading-snug text-mhts-ink md:text-3xl">{block.fact}</p>
          </figcaption>
        </div>
      </Reveal>
      )}
    </div>
  </section>
);

const Benefits = ({ benefits }: { benefits: ServicePageProps["benefits"] }) => {
  const [first, ...rest] = benefits.items;
  // On a phone the heading, the first benefit and the list are one screen: a
  // list of short lines gets more room between them so the screen is full.
  const restChars = rest.reduce((n, b) => n + b.text.length, 0);
  const listGap = restChars < 230 ? "gap-y-6" : restChars < 330 ? "gap-y-5" : "gap-y-4";
  return (
    <section id="benefits" className="relative scroll-mt-24 overflow-clip bg-mhts-deep py-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,hsl(var(--mhts-red)/0.18),transparent_70%)]" />
      <div className="container relative mx-auto max-w-6xl px-4">
        {/* Phone: the heading, the first benefit and the list are one screen
            (a heading always shares its screen with what it heads). */}
        <div className="grid gap-5 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow dark>{benefits.eyebrow}</Eyebrow>
            <h2 className="mb-6 text-3xl text-white md:mb-8 md:text-4xl">{benefits.title}</h2>
            {first && (
              <div className="rounded-2xl bg-mhts-red p-5 md:p-8">
                <first.icon className="mb-3 h-6 w-6 text-white md:mb-5 md:h-8 md:w-8" aria-hidden="true" />
                <p className="text-xl font-semibold leading-snug text-white md:text-[1.7rem]">{first.text}</p>
              </div>
            )}
          </Reveal>
          <ul className={`grid content-center gap-x-8 sm:grid-cols-2 md:gap-y-6 ${listGap}`}>
            {rest.map((b, i) => (
              <Reveal as="li" key={b.text} delay={i * 0.05} className="flex items-start gap-3 md:gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mhts-red-light/15 md:h-10 md:w-10">
                  <b.icon className="h-4 w-4 text-mhts-red-light md:h-5 md:w-5" aria-hidden="true" />
                </span>
                <p className="pt-1 font-body text-[15px] leading-snug text-white/85 md:pt-2 md:leading-relaxed">{b.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Included = ({ included }: { included: NonNullable<ServicePageProps["included"]> }) => (
  <section id="included" className="scroll-mt-24 bg-card py-8 md:py-20">
    <div className="container mx-auto max-w-5xl px-4">
      <div className="mb-5 max-w-2xl md:mb-10">
        <Eyebrow>{included.eyebrow}</Eyebrow>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">{included.title}</h2>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {included.items.map((item, i) => (
          <Reveal as="li" key={item} delay={i * 0.04} className="flex items-center gap-3 rounded-xl border border-mhts-stone bg-mhts-sand p-3 md:p-4">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mhts-red text-white">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="font-body text-sm font-medium text-mhts-ink">{item}</span>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

const Steps = ({ steps }: { steps: ServicePageProps["steps"] }) => (
  <section id="process" className="scroll-mt-24 bg-card py-8 md:py-24">
    <div className="container mx-auto grid max-w-6xl gap-6 px-4 md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Eyebrow>{steps.eyebrow}</Eyebrow>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">{steps.title}</h2>
        <div className="mt-4 h-1 w-16 rounded-full bg-mhts-red md:mt-6" />
      </div>
      <ol className="relative">
        {/* The rule the numbers hang on. */}
        <span className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 bg-mhts-stone" aria-hidden="true" />
        {steps.items.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 0.06}
            // On a phone the process is one screen: fewer steps get more room
            // between them, six get less, so it is full but not over.
            className={`relative flex gap-4 last:pb-0 md:gap-6 md:pb-9 ${
              steps.items.length > 5 ? "pb-5" : steps.items.length < 5 ? "pb-8" : "pb-7"
            }`}
          >
            <span className="relative z-[1] grid h-11 w-11 shrink-0 place-items-center rounded-full bg-mhts-red font-body text-sm font-bold text-white ring-4 ring-card md:h-12 md:w-12">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-2 md:pt-2.5">
              <h3 className="mb-1 text-base text-mhts-ink md:mb-1.5 md:text-lg">{step.title}</h3>
              <p className="font-body text-sm leading-snug text-muted-foreground md:text-[15px] md:leading-relaxed">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

// On a phone the questions share a screen with the related services, so a
// long list sits a little tighter than a short one.
const Faq = ({ faq }: { faq: ServicePageProps["faq"] }) => (
  <section id="faq" className="scroll-mt-24 bg-mhts-sand pb-4 pt-6 md:py-24">
    <div className="container mx-auto grid max-w-6xl gap-3 px-4 md:gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">{faq.title}</h2>
      </div>
      <div className={`md:space-y-3 ${faq.items.length > 3 ? "space-y-2" : "space-y-3"}`}>
        {faq.items.map((f) => (
          <details
            key={f.q}
            className={`group rounded-xl border border-mhts-stone bg-card px-4 transition-colors open:border-mhts-red md:p-6 ${
              faq.items.length > 4 ? "py-2.5" : faq.items.length > 3 ? "py-3.5" : "py-4"
            }`}
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="font-body text-[15px] font-semibold text-mhts-ink md:text-base">{f.q}</span>
              <ChevronRight
                className="mt-0.5 h-5 w-5 shrink-0 text-mhts-red transition-transform group-open:rotate-90"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground md:text-[15px]">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  </section>
);

const Related = ({
  related,
  category,
  subSlug,
}: {
  related: ServicePageProps["related"];
  category: string;
  subSlug?: string;
}) => {
  const cat = findCategory(category)!;
  const subs = cat.subServices.filter((s) => s.slug !== subSlug);
  return (
    <section id="related" className="scroll-mt-24 bg-card pb-6 pt-4 md:pb-0 md:pt-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div>
        <div className="mb-4 md:mb-10">
          <Eyebrow>{related.eyebrow}</Eyebrow>
          <h2 className="text-2xl text-mhts-ink md:text-4xl">{related.title}</h2>
        </div>
        {/* Three across at most. Five in a row made each card 180px wide. The
            cards carry no photographs: a service page shows two, its own. On a
            phone they are a swipeable strip, one card per swipe with the next
            peeking, so they share a screen with the questions above. */}
        <div className="mhts-snap-x -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-5 lg:grid-cols-3">
          {subs.map((sub, i) => {
            const path = `/${cat.slug}/${sub.slug}`;
            return (
              <Reveal key={sub.slug} delay={i * 0.06} className="w-[80%] shrink-0 snap-start snap-always sm:w-auto sm:snap-align-none">
                <Link
                  to={path}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-mhts-stone bg-card transition-all hover:-translate-y-1 hover:border-mhts-red hover:shadow-lg"
                >
                  <div className="flex flex-1 flex-col p-4 md:p-6">
                    <h3 className="mb-1 flex items-center justify-between gap-2 text-base text-mhts-ink md:mb-2 md:text-lg">
                      {sub.name}
                      <ChevronRight className="h-4 w-4 shrink-0 text-mhts-red md:hidden" aria-hidden="true" />
                    </h3>
                    <p className="flex-1 font-body text-sm leading-snug text-muted-foreground md:mb-5 md:leading-relaxed">{sub.blurb}</p>
                    <span className="hidden items-center gap-1 font-body text-sm font-semibold text-mhts-red-deep transition-all group-hover:gap-2 md:inline-flex">
                      Learn more <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        </div>
      </div>
    </section>
  );
};

/**
 * The other three treatments, so every page ends somewhere to go. From md up
 * it reads as the end of the related section (same band, same rule above it).
 * On a phone it follows the closing call to action, on the same screen: the
 * dark band starts its own screen (batch 4b fixes, PR #8: the last card was
 * cut in half by the dark band sharing its screen), and this band ends with
 * padding of its own. Rendered once for each layout; the one not in use is
 * display:none, as the footer's social links are.
 */
const OtherTreatments = ({ category, className = "" }: { category: string; className?: string }) => {
  const others = treatments.filter((t) => t.slug !== category);
  return (
    <div className={`bg-card pb-8 pt-8 md:pb-24 md:pt-0 ${className}`}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid content-center gap-3 border-mhts-stone sm:grid-cols-3 md:mt-12 md:border-t md:pt-8">
          {others.map((t) => {
            return (
              <Link
                key={t.slug}
                to={`/${t.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-mhts-stone bg-mhts-sand px-4 py-5 transition-colors hover:border-mhts-red md:p-3 md:pr-4"
              >
                <span className="min-w-0">
                  <span className="block font-body text-sm font-semibold text-mhts-ink group-hover:text-mhts-red-deep">
                    {t.name}
                  </span>
                  <span className="block font-body text-xs leading-snug text-muted-foreground">{t.line}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Closing = ({ cta }: { cta: ServicePageProps["cta"] }) => (
  <section className="relative overflow-clip bg-mhts-deep py-10 md:py-20">
    <div className="absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_100%,hsl(var(--mhts-red)/0.25),transparent_65%)]" />
    <div className="container relative mx-auto px-4 text-center">
      <h2 className="mb-4 text-3xl text-white md:text-4xl">{cta.title}</h2>
      <p className="mx-auto mb-8 max-w-xl font-body text-white/75">{cta.text}</p>
      {/* Call sits beside Book on every call to action on the site. */}
      <CtaPair size="lg" tone="dark" href="/#mhts-book" className="justify-center" />
    </div>
  </section>
);

const ServicePage = (props: ServicePageProps) => {
  const photos = servicePhotos[props.path];
  const isPillar = !props.subSlug;
  return (
    <div className="mhts-theme">
      {/* Two photographs per page (src/data/servicePhotos.ts). A treatment
          page: `service` in the hero, `studio` beside "Who it's for". A
          sub-service page: `service` beside "What is it", `studio` beside
          "Who it's for". */}
      {/* On a phone each block below is a screen (src/index.css). The two
          wrappers group short blocks into one full screen on a phone and are
          display:contents from md up, so the desktop is exactly as it was:
          the questions share a screen with the related services, and the
          other treatments with the closing call to action. */}
      <Hero hero={props.hero} photo={isPillar ? photos.service : undefined} fact={props.about.fact} />
      {props.pricing && <ServicePricing rows={props.pricing} />}
      <Split id="about" block={props.about} photo={isPillar ? undefined : photos.service} tone="white" />
      <Benefits benefits={props.benefits} />
      {props.included && <Included included={props.included} />}
      <Split id="who" block={props.who} photo={photos.studio} flip tone="sand" together />
      <Steps steps={props.steps} />
      <div className={`${SNAP_PHONE_CLASS} md:contents`}>
        <Faq faq={props.faq} />
        <Related related={props.related} category={props.category} subSlug={props.subSlug} />
      </div>
      <OtherTreatments category={props.category} className="hidden md:block" />
      <div className={`${SNAP_PHONE_CLASS} md:contents`}>
        <Closing cta={props.cta} />
        <OtherTreatments category={props.category} className="grow md:hidden" />
      </div>
    </div>
  );
};

export default ServicePage;
