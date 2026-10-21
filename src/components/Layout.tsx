import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import HolidayBanner from "./HolidayBanner";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import GoogleAnalytics from "./GoogleAnalytics";
import StickyMobileCTA from "./mhts/StickyMobileCTA";
import SnapGuides from "./SnapGuides";
import StopMotion from "./StopMotion";
import BookingSheet from "./mhts/BookingSheet";
import { snapSiteClass } from "@/lib/sectionSnap";

const Layout = () => {
  // Moving to another page inside the site, the new page fades in (page
  // transitions, Oct 2026). Never on the page the reader lands on, which is
  // already on screen from the pre-render.
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = document.querySelector("main");
    if (!el) return;
    el.classList.remove("mhts-page-in");
    void el.offsetWidth; // restart the animation
    el.classList.add("mhts-page-in");
    const done = () => el.classList.remove("mhts-page-in");
    el.addEventListener("animationend", done, { once: true });
    return () => el.removeEventListener("animationend", done);
  }, [pathname]);
  return (
    // No room is reserved under the footer for the bottom bar any more: the
    // bar fades out while the footer is on screen, so the page ends on the
    // footer's dark band. The reserve was a white strip under the copyright
    // line on a phone, with the bar half over it (batch 4b fixes, PR #8).
    <div className="flex min-h-screen flex-col">
      <GoogleAnalytics />
      <HolidayBanner />
      <BrandHeader />
      {/* The section scroll on a phone keys off this class (src/lib/sectionSnap.ts). */}
      <main className={`flex-1 ${snapSiteClass()}`}>
        {/* A page's code is fetched on its first visit (App.tsx). Navigation
            runs as a transition, so the page on screen stays until the next
            is ready; this blank screen only shows if nothing is on screen. */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <SnapGuides />
      <StopMotion />
      {/* The booking calendar, one for the whole site (src/lib/booking.ts). */}
      <BookingSheet />
      {/* One fixed stack, so the sticky call to action sits above the cookie
          banner instead of underneath it. Both are bottom-anchored and both
          used to claim the same strip of screen. */}
      <div className="fixed inset-x-0 bottom-0 z-[100] flex flex-col">
        <StickyMobileCTA />
        <CookieConsentBanner />
      </div>
    </div>
  );
};

export default Layout;
