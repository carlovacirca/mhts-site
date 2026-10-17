import { useEffect } from "react";
import { useCookieConsent } from "@/lib/cookieConsent";
import { ctaFor, track } from "@/lib/analytics";

const GA4_MEASUREMENT_ID = "G-N1Z0J45SW7";

const GoogleAnalytics = () => {
  const cookieConsent = useCookieConsent();

  useEffect(() => {
    if (cookieConsent !== "accepted") return;

    const loaderScript = document.createElement("script");
    loaderScript.async = true;
    loaderScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(loaderScript);

    const inlineScript = document.createElement("script");
    inlineScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA4_MEASUREMENT_ID}');
    `;
    document.head.appendChild(inlineScript);

    return () => {
      if (loaderScript.parentNode) document.head.removeChild(loaderScript);
      if (inlineScript.parentNode) document.head.removeChild(inlineScript);
    };
  }, [cookieConsent]);

  // Moving between pages inside the site is counted by GA4's enhanced
  // measurement ("page changes based on browser history events"), so no page
  // view is sent here: it would count every page twice.

  // Calls, emails and every way to book, with the page they were clicked on.
  useEffect(() => {
    if (cookieConsent !== "accepted") return;
    const onClick = (e: MouseEvent) => {
      const hit = e.target instanceof Element ? ctaFor(e.target) : null;
      if (hit) track(hit.event, { link_text: hit.label, page_path: window.location.pathname });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [cookieConsent]);

  return null;
};

export default GoogleAnalytics;
