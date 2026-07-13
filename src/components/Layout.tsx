import { Outlet } from "react-router-dom";
import BrandHeader from "./BrandHeader";
import Footer from "./Footer";
import CookieConsentBanner from "./CookieConsentBanner";
import GoogleAnalytics from "./GoogleAnalytics";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <GoogleAnalytics />
      <BrandHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
    </div>
  );
};

export default Layout;
