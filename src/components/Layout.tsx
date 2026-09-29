import { Outlet } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import HolidayBanner from "./HolidayBanner";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import GoogleAnalytics from "./GoogleAnalytics";
import StickyMobileCTA from "./mhts/StickyMobileCTA";

const Layout = () => {
  return (
    // The bottom padding on phones is permanent, not added when the sticky bar
    // appears. Reserving the space up front is what stops the bar covering the
    // last of the footer without ever shifting the layout.
    <div className="flex min-h-screen flex-col pb-[4.5rem] md:pb-0">
      <GoogleAnalytics />
      <HolidayBanner />
      <BrandHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
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
