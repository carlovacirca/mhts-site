import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight, type LucideIcon } from "lucide-react";
import { Reveal } from "@/lib/motion";
import ResponsiveImage from "@/components/ResponsiveImage";
import ServicePricing, { type PricingRow } from "@/components/ServicePricing";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { findCategory } from "@/data/services";
import { treatments } from "@/data/treatments";
import { cardPhotoFor, servicePhotos, type Photo } from "@/data/servicePhotos";

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
    /** Category pages have a full-bleed hero photograph. */
    image?: string;
    imageAlt?: string;
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

const Hero = ({ hero, photo }: { hero: ServicePageProps["hero"]; photo?: Photo }) => {
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
    </>
  );

  // Category pages: their own photograph, full bleed, as before but lighter.
  if (hero.image) {
    return (
      <section className="relative flex min-h-[64vh] items-center overflow-hidden bg-mhts-deep">
        <ResponsiveImage
          src={hero.image}
          alt={hero.imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover object-left"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mhts-deep/90 via-mhts-deep/65 to-mhts-deep/10" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_10%_60%,hsl(var(--mhts-red)/0.2),transparent_70%)]" />
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl">{intro}</div>
        </div>
      </section>
    );
  }

  // Sub-service pages had a flat charcoal block. They now split: the words on
  // the dark band, and from md up a photograph in a frame. On a phone the frame
  // is not rendered at all (display none, lazy), so it costs the first screen
  // nothing.
  return (
    <section className="relative overflow-hidden bg-mhts-deep">
      <div className="absolute inset-0 bg-[radial-gradient(55%_80%_at_0%_100%,hsl(var(--mhts-red)/0.22),transparent_70%)]" />
      <div className="container relative z-10 mx-auto grid items-center gap-10 px-4 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div>{intro}</div>
        {photo && (
        <div className="relative hidden md:block">
          <div className="absolute -right-3 -top-3 h-24 w-24 rounded-tr-2xl border-r-4 border-t-4 border-mhts-red" aria-hidden="true" />
          <ResponsiveImage
            src={photo.src}
            alt={photo.alt}
            className="aspect-[4/5] w-full rounded-2xl object-cover shadow-2xl"
            sizes="40vw"
          />
        </div>
        )}
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
}: {
  id: string;
  block: TextBlock;
  photo: Photo;
  flip?: boolean;
  tone: "white" | "sand";
}) => (
  <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${tone === "sand" ? "bg-mhts-sand" : "bg-card"}`}>
    <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:gap-14">
      <Reveal className={flip ? "md:order-2" : undefined}>
        <Eyebrow>{block.eyebrow}</Eyebrow>
        <h2 className="mb-6 text-3xl leading-tight text-mhts-ink md:text-4xl">{block.title}</h2>
        <div className="space-y-5 font-body leading-relaxed text-foreground/80">{block.body}</div>
      </Reveal>
      <Reveal as="figure" from={flip ? "left" : "right"} className={`relative ${flip ? "md:order-1" : ""}`}>
        <ResponsiveImage
          src={photo.src}
          alt={photo.alt}
          className={`aspect-[4/3] w-full rounded-2xl object-cover ${photo.wide ? "" : "md:aspect-[5/6]"}`}
          sizes="(max-width: 768px) 100vw, 560px"
        />
        {/* The key fact. It repeats a line of the text beside it, so it is
            hidden from screen readers rather than read out twice. */}
        <figcaption
          aria-hidden="true"
          className={`relative -mt-10 mx-4 rounded-xl border-l-4 border-mhts-red bg-card p-5 shadow-xl md:absolute md:bottom-6 md:mx-0 md:mt-0 md:max-w-[80%] ${
            flip ? "md:-right-6" : "md:-left-6"
          }`}
        >
          <p className="text-lg font-semibold leading-snug text-mhts-ink">{block.fact}</p>
        </figcaption>
      </Reveal>
    </div>
  </section>
);

const Benefits = ({ benefits }: { benefits: ServicePageProps["benefits"] }) => {
  const [first, ...rest] = benefits.items;
  return (
    <section id="benefits" className="relative scroll-mt-24 overflow-hidden bg-mhts-deep py-16 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_100%_0%,hsl(var(--mhts-red)/0.18),transparent_70%)]" />
      <div className="container relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <Eyebrow dark>{benefits.eyebrow}</Eyebrow>
            <h2 className="mb-8 text-3xl text-white md:text-4xl">{benefits.title}</h2>
            {first && (
              <div className="rounded-2xl bg-mhts-red p-7 md:p-8">
                <first.icon className="mb-5 h-8 w-8 text-white" aria-hidden="true" />
                <p className="text-2xl font-semibold leading-snug text-white md:text-[1.7rem]">{first.text}</p>
              </div>
            )}
          </Reveal>
          <ul className="grid content-center gap-x-8 gap-y-6 sm:grid-cols-2">
            {rest.map((b, i) => (
              <Reveal as="li" key={b.text} delay={i * 0.05} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-mhts-red-light/15">
                  <b.icon className="h-5 w-5 text-mhts-red-light" aria-hidden="true" />
                </span>
                <p className="pt-2 font-body text-[15px] leading-relaxed text-white/85">{b.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Included = ({ included }: { included: NonNullable<ServicePageProps["included"]> }) => (
  <section id="included" className="scroll-mt-24 bg-card py-16 md:py-20">
    <div className="container mx-auto max-w-5xl px-4">
      <div className="mb-10 max-w-2xl">
        <Eyebrow>{included.eyebrow}</Eyebrow>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">{included.title}</h2>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {included.items.map((item, i) => (
          <Reveal as="li" key={item} delay={i * 0.04} className="flex items-center gap-3 rounded-xl border border-mhts-stone bg-mhts-sand p-4">
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
  <section id="process" className="scroll-mt-24 bg-card py-16 md:py-24">
    <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Eyebrow>{steps.eyebrow}</Eyebrow>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">{steps.title}</h2>
        <div className="mt-6 h-1 w-16 rounded-full bg-mhts-red" />
      </div>
      <ol className="relative">
        {/* The rule the numbers hang on. */}
        <span className="absolute bottom-6 left-[1.4rem] top-6 w-0.5 bg-mhts-stone" aria-hidden="true" />
        {steps.items.map((step, i) => (
          <Reveal as="li" key={step.title} delay={i * 0.06} className="relative flex gap-6 pb-9 last:pb-0">
            <span className="relative z-[1] grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mhts-red font-body text-sm font-bold text-white ring-4 ring-card">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-2.5">
              <h3 className="mb-1.5 text-lg text-mhts-ink">{step.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground md:text-[15px]">{step.desc}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

const Faq = ({ faq }: { faq: ServicePageProps["faq"] }) => (
  <section id="faq" className="scroll-mt-24 bg-mhts-sand py-16 md:py-24">
    <div className="container mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div>
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <h2 className="text-3xl text-mhts-ink md:text-4xl">{faq.title}</h2>
      </div>
      <div className="space-y-3">
        {faq.items.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-mhts-stone bg-card p-5 transition-colors open:border-mhts-red md:p-6"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
              <span className="font-body font-semibold text-mhts-ink">{f.q}</span>
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
  const others = treatments.filter((t) => t.slug !== category);
  return (
    <section id="related" className="scroll-mt-24 bg-card py-16 md:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-10">
          <Eyebrow>{related.eyebrow}</Eyebrow>
          <h2 className="text-3xl text-mhts-ink md:text-4xl">{related.title}</h2>
        </div>
        {/* Three across at most. Five in a row made each card 180px wide. */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subs.map((sub, i) => {
            const path = `/${cat.slug}/${sub.slug}`;
            const photo = cardPhotoFor(path);
            return (
              <Reveal key={sub.slug} delay={i * 0.06}>
                <Link
                  to={path}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-mhts-stone bg-card transition-all hover:-translate-y-1 hover:border-mhts-red hover:shadow-lg"
                >
                  {photo && (
                    <div className="aspect-[16/9] overflow-hidden">
                      <ResponsiveImage
                        src={photo.src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 text-lg text-mhts-ink">{sub.name}</h3>
                    <p className="mb-5 flex-1 font-body text-sm leading-relaxed text-muted-foreground">{sub.blurb}</p>
                    <span className="inline-flex items-center gap-1 font-body text-sm font-semibold text-mhts-red-deep transition-all group-hover:gap-2">
                      Learn more <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        {/* The other three treatments, so every page ends somewhere to go. */}
        <div className="mt-12 grid gap-3 border-t border-mhts-stone pt-8 sm:grid-cols-3">
          {others.map((t) => {
            const photo = cardPhotoFor(`/${t.slug}`);
            return (
              <Link
                key={t.slug}
                to={`/${t.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-mhts-stone bg-mhts-sand p-3 pr-4 transition-colors hover:border-mhts-red"
              >
                {photo && (
                  <ResponsiveImage
                    src={photo.src}
                    alt=""
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                    sizes="64px"
                  />
                )}
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
    </section>
  );
};

const Closing = ({ cta }: { cta: ServicePageProps["cta"] }) => (
  <section className="relative overflow-hidden bg-mhts-deep py-16 md:py-20">
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
  return (
    <div className="mhts-theme">
      <Hero hero={props.hero} photo={photos.hero} />
      {props.pricing && <ServicePricing rows={props.pricing} />}
      <Split id="about" block={props.about} photo={photos.about} tone="white" />
      <Benefits benefits={props.benefits} />
      {props.included && <Included included={props.included} />}
      <Split id="who" block={props.who} photo={photos.who} flip tone="sand" />
      <Steps steps={props.steps} />
      <Faq faq={props.faq} />
      <Related related={props.related} category={props.category} subSlug={props.subSlug} />
      <Closing cta={props.cta} />
    </div>
  );
};

export default ServicePage;
