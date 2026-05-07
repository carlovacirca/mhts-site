import { useEffect } from "react";

export interface SeoOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object | object[];
}

const SITE_URL = "https://menshairtostay.co.uk";

const upsertMeta = (name: string, content: string) => {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (prev !== null) el!.setAttribute("content", prev);
  };
};

const upsertCanonical = (href: string) => {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  const created = !el;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("href");
  el.setAttribute("href", href);
  return () => {
    if (created) el!.remove();
    else if (prev) el!.setAttribute("href", prev);
  };
};

export const useSeo = ({ title, description, canonicalPath, jsonLd }: SeoOptions) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const restoreDesc = upsertMeta("description", description);
    const path = canonicalPath ?? window.location.pathname;
    const restoreCanonical = upsertCanonical(SITE_URL + path);

    const scripts: HTMLScriptElement[] = [];
    if (jsonLd) {
      const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      items.forEach((data) => {
        const s = document.createElement("script");
        s.type = "application/ld+json";
        s.text = JSON.stringify(data);
        document.head.appendChild(s);
        scripts.push(s);
      });
    }

    return () => {
      document.title = prevTitle;
      restoreDesc();
      restoreCanonical();
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonicalPath, JSON.stringify(jsonLd)]);
};

export const breadcrumbSchema = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: SITE_URL + it.path,
  })),
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Men's Hair To Stay",
  image: SITE_URL + "/og-image.jpg",
  url: SITE_URL,
  telephone: "+44 7947 878087",
  email: "georgesbarbers1991@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "11 Chesham Road",
    addressLocality: "Amersham",
    postalCode: "HP6 5HN",
    addressRegion: "Buckinghamshire",
    addressCountry: "GB",
  },
  areaServed: ["Amersham", "Chesham", "High Wycombe", "Beaconsfield", "Buckinghamshire"],
  priceRange: "££",
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "17:00" },
  ],
};
