import { useEffect } from "react";
import { useCookieConsent } from "@/lib/cookieConsent";

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

  return null;
};

export default GoogleAnalytics;
