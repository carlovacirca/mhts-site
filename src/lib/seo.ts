import { useEffect } from "react";

export interface SeoOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object | object[];
  /** Adds <meta name="robots" content="noindex, follow">. Used by the 404 page. */
  noindex?: boolean;
}

export const SITE_URL = "https://menshairtostay.co.uk";

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

const upsertMetaProperty = (property: string, content: string) => {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
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
  // og:url and the canonical must never disagree, so they are set together.
  // Before pre-rendering nothing set og:url per page, so every URL shared the
  // homepage value from index.html and every link preview pointed at the
  // homepage. See docs/HEALTH-CHECK.md finding 1.
  const restoreOgUrl = upsertMetaProperty("og:url", href);
  return () => {
    restoreOgUrl();
    if (created) el!.remove();
    else if (prev) el!.setAttribute("href", prev);
  };
};

/**
 * og: and twitter: title and description for one page.
 *
 * Twitter reads twitter:* first and falls back to og:*, so leaving the two out
 * of step meant every share card on X showed the homepage title whatever page
 * was shared. Both are set from the same two strings here.
 */
const upsertSocialText = (title: string, description: string) => {
  const restore = [
    upsertMetaProperty("og:title", title),
    upsertMetaProperty("og:description", description),
    upsertMeta("twitter:title", title),
    upsertMeta("twitter:description", description),
  ];
  return () => restore.forEach((r) => r());
};

export const useSeo = ({ title, description, canonicalPath, jsonLd, noindex }: SeoOptions) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const restoreDesc = upsertMeta("description", description);
    const path = canonicalPath ?? window.location.pathname;
    const restoreCanonical = upsertCanonical(SITE_URL + path);
    const restoreSocial = upsertSocialText(title, description);

    // Only added when asked for, and always removed on unmount, so a noindex
    // can never leak onto a real page during client-side navigation.
    let robotsEl: HTMLMetaElement | null = null;
    if (noindex) {
      robotsEl = document.createElement("meta");
      robotsEl.name = "robots";
      robotsEl.content = "noindex, follow";
      document.head.appendChild(robotsEl);
    }

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
      restoreSocial();
      restoreCanonical();
      robotsEl?.remove();
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonicalPath, noindex, JSON.stringify(jsonLd)]);
};

// Pass null to leave the canonical alone, so a page that renders something else
// (a blog slug that matches no post) does not claim a canonical that is not its own.
export const useCanonical = (path: string | null) => {
  useEffect(() => {
    if (path === null) return;
    const restore = upsertCanonical(SITE_URL + path);
    return restore;
  }, [path]);
};

export const useOpenGraph = (title: string, description: string) => {
  useEffect(() => upsertSocialText(title, description), [title, description]);
};

export const useJsonLd = (data: object | object[]) => {
  useEffect(() => {
    const items = Array.isArray(data) ? data : [data];
    const scripts = items.map((d) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.text = JSON.stringify(d);
      document.head.appendChild(s);
      return s;
    });
    return () => {
      scripts.forEach((s) => s.remove());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);
};

// A Service block describing the page's own service. Previously each money page
// published its first pricing row instead, so /hair-systems told Google it was a
// page about "Initial Consultation & Fitting". See docs/HEALTH-CHECK.md finding 11.
export const serviceSchema = ({
  name,
  description,
  path,
  areaServed = "Amersham",
}: {
  name: string;
  description: string;
  path: string;
  areaServed?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": SITE_URL + path + "#service",
  serviceType: name,
  name,
  description,
  url: SITE_URL + path,
  areaServed,
  provider: {
    "@type": "LocalBusiness",
    name: "Men's Hair To Stay",
    url: SITE_URL,
    telephone: "+44 7947 878087",
    address: {
      "@type": "PostalAddress",
      streetAddress: "11 Chesham Road",
      addressLocality: "Amersham",
      postalCode: "HP6 5HN",
      addressRegion: "Buckinghamshire",
      addressCountry: "GB",
    },
  },
});

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
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:30", closes: "17:00" },
  ],
};
