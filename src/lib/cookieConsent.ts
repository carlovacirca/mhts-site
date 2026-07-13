import { useEffect, useState } from "react";

const STORAGE_KEY = "mhts-cookie-consent";
const EVENT_NAME = "mhts-cookie-consent-change";

export type ConsentValue = "accepted" | "declined" | null;

export const getCookieConsent = (): ConsentValue => {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
};

export const setCookieConsent = (value: "accepted" | "declined") => {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
};

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentValue>(() => getCookieConsent());

  useEffect(() => {
    const handleChange = () => setConsent(getCookieConsent());
    window.addEventListener(EVENT_NAME, handleChange);
    window.addEventListener("storage", handleChange);
    return () => {
      window.removeEventListener(EVENT_NAME, handleChange);
      window.removeEventListener("storage", handleChange);
    };
  }, []);

  return consent;
};
