import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { serviceCategories } from "@/data/services";
import { useSeo, breadcrumbSchema } from "@/lib/seo";
import { Reveal } from "@/lib/motion";
import ResponsiveImage from "@/components/ResponsiveImage";
import { CtaPair } from "@/components/mhts/CtaButtons";
import { cardPhotoFor } from "@/data/servicePhotos";
import { SNAP_PHONE_CLASS, SNAP_STOP_CLASS } from "@/lib/sectionSnap";

const ServicesPage = () => {
  useSeo({
    title: "Our Services | Hair Systems, SMP & Maintenance",
    description:
      "Hair systems, scalp micropigmentation, hair density treatments and ongoing maintenance from Men's Hair To Stay in Amersham. Explore all our services.",
    canonicalPath: "/services",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  });

  // Batch 4b. Four grey boxes with a name and a line each became four large
  // photo tiles, two by two, each with its treatments listed under it, so the
  // overview is a real way in to all eighteen treatment pages.
  return (
    <div className="mhts-theme">
      <section className="relative overflow-hidden bg-mhts-deep py-14 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(50%_90%_at_50%_0%,hsl(var(--mhts-red)/0.25),transparent_70%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <p className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">What We Offer</p>
          <h1 className="text-4xl text-white md:text-5xl">Our Services</h1>
          <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-mhts-red" />
        </div>
      </section>
      <section className="bg-mhts-sand py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 md:gap-6">
            {serviceCategories.map((c, i) => {
              const photo = cardPhotoFor(`/${c.slug}`);
              return (
                // On a phone each treatment is a screen of its own.
                <div key={c.slug} className={SNAP_PHONE_CLASS}>
                <Reveal from="scale" delay={(i % 2) * 0.08} className="flex h-full flex-col overflow-hidden rounded-2xl border border-mhts-stone bg-card">
                  <Link to={`/${c.slug}`} className="group relative block aspect-[16/9] overflow-hidden">
                    {photo && (
                      <ResponsiveImage
                        src={photo.src}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 560px"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-mhts-deep via-mhts-deep/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h2 className="mb-1 text-2xl text-white">{c.name}</h2>
                      <p className="font-body text-sm text-white/85">{c.tagline}</p>
                    </div>
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <ul className="flex-1 divide-y divide-mhts-stone/70">
                      {c.subServices.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            to={`/${c.slug}/${sub.slug}`}
                            className="flex items-center justify-between gap-2 py-2.5 font-body text-sm text-foreground/80 transition-colors hover:text-mhts-red-deep"
                          >
                            {sub.name}
                            <ChevronRight className="h-4 w-4 shrink-0 text-mhts-red" aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={`/${c.slug}`}
                      className="mt-5 inline-flex items-center gap-1 font-body text-sm font-semibold text-mhts-red-deep transition-all hover:gap-2"
                    >
                      {/* The name, for screen readers and search engines, so the four
                          links are not four identical "Learn more"s. */}
                      Learn more<span className="sr-only"> about {c.name}</span> <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
                </div>
              );
            })}
          </div>
          <CtaPair className={`mt-4 justify-center md:mt-12 ${SNAP_STOP_CLASS}`} size="lg" />
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
