import { Outlet, useLocation } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import BrandHeader from "./BrandHeader";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isGB = location.pathname.startsWith("/georges-barbers");
  const isMHTS = location.pathname.startsWith("/mens-hair-to-stay");

  return (
    <div className="min-h-screen flex flex-col">
      {isHome && <HomeHeader />}
      {isGB && <BrandHeader brand="gb" />}
      {isMHTS && <BrandHeader brand="mhts" />}
      {!isHome && !isGB && !isMHTS && <BrandHeader brand="gb" />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
