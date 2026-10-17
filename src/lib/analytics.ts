// Google Analytics events. GA4 loads only after the reader accepts cookies
// (src/components/GoogleAnalytics.tsx); before that, and in the pre-render,
// every call here does nothing.

type Gtag = (...args: unknown[]) => void;

/** Sends one GA4 event, if GA4 is loaded. */
export const track = (name: string, params: Record<string, string | number> = {}) => {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
};

/**
 * What a click on this element means, if anything worth counting: a call, an
 * email, or a way to book (Carlo, Oct 2026: see which pages bring clients).
 */
export const ctaFor = (el: Element): { event: string; label: string } | null => {
  const target = el.closest("a, button");
  if (!target) return null;
  const label = (target.getAttribute("aria-label") || target.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
  const href = target.getAttribute("href") || "";
  if (href.startsWith("tel:")) return { event: "click_call", label };
  if (href.startsWith("mailto:")) return { event: "click_email", label };
  if (/^\/book(\/|$|#|\?)/.test(href) || href.endsWith("#mhts-book") || /\bbook/i.test(label)) return { event: "click_book", label };
  return null;
};
