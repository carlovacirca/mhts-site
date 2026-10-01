import { Outlet } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import HolidayBanner from "./HolidayBanner";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import GoogleAnalytics from "./GoogleAnalytics";
import StickyMobileCTA from "./mhts/StickyMobileCTA";
import SnapGuides from "./SnapGuides";
import { snapSiteClass } from "@/lib/sectionSnap";

const Layout = () => {
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
        <Outlet />
      </main>
      <Footer />
      <SnapGuides />
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
