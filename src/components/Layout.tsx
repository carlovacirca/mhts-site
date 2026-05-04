import { Outlet, useLocation } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import BrandHeader from "./BrandHeader";
import Footer from "./Footer";


const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isGB = location.pathname.startsWith("/georges-barbers");
  const isMHTS = location.pathname.startsWith("/mens-hair-to-stay");
  const isContact = location.pathname === "/contact";
  const isFAQ = location.pathname === "/faq";
  const isBlog = location.pathname.startsWith("/blog");

  return (
    <div className="min-h-screen flex flex-col">
      {isHome && <HomeHeader />}
      {isGB && <BrandHeader brand="gb" />}
      {isMHTS && <BrandHeader brand="mhts" />}
      {isContact && <HomeHeader />}
      {isFAQ && <HomeHeader />}
      {isBlog && <HomeHeader />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      
    </div>
  );
};

export default Layout;
