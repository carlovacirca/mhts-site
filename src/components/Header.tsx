import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import gbLogo from "@/assets/gb-logo.png";
import mhtsLogo from "@/assets/mhts-logo.png";

const gbLinks = [
  { to: "/georges-barbers", label: "About" },
  { to: "/georges-barbers/services", label: "Services" },
  { to: "/georges-barbers/pricing", label: "Pricing" },
  { to: "/georges-barbers/gallery", label: "Gallery" },
  { to: "/georges-barbers/book", label: "Book" },
];

const mhtsLinks = [
  { to: "/mens-hair-to-stay", label: "About" },
  { to: "/mens-hair-to-stay/services", label: "Services" },
  { to: "/mens-hair-to-stay/pricing", label: "Pricing" },
  { to: "/mens-hair-to-stay/gallery", label: "Gallery" },
  { to: "/mens-hair-to-stay/book", label: "Book" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isGB = location.pathname.startsWith("/georges-barbers");
  const isMHTS = location.pathname.startsWith("/mens-hair-to-stay");

  return (
    <>
      {/* Top bar */}
      <div className="bg-foreground text-background text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="tel:01494432131" className="flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Phone className="w-3 h-3" /> Georges: 01494 432131
          </a>
          <a href="tel:07947878087" className="flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Phone className="w-3 h-3" /> MHTS: 07947 878087
          </a>
          <a href="mailto:georgesbarbers1991@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Mail className="w-3 h-3" /> georgesbarbers1991@gmail.com
          </a>
        </div>
        <span className="hidden sm:block">11 Chesham Road, Amersham HP6 5HN</span>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logos */}
            <Link to="/" className="flex items-center gap-3">
              <img src={gbLogo} alt="Georges Barbers" className="h-10 w-10 object-contain" />
              <span className="text-foreground font-body text-[10px] leading-tight opacity-40 hidden sm:block">|</span>
              <img src={mhtsLogo} alt="Men's Hair To Stay" className="h-10 w-10 object-contain" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0">
              {/* GB Section */}
              <div className="flex items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-gb-green mr-2 font-display">Georges</span>
                {gbLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-2.5 py-1.5 text-sm transition-colors rounded-md ${
                      location.pathname === l.to
                        ? "bg-gb-green text-gb-gold font-semibold"
                        : "text-muted-foreground hover:text-gb-green"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <span className="mx-4 text-border">|</span>

              {/* MHTS Section */}
              <div className="flex items-center">
                <span className="text-xs font-bold uppercase tracking-widest text-mhts-charcoal mr-2">MHTS</span>
                {mhtsLinks.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-2.5 py-1.5 text-sm transition-colors rounded-md ${
                      location.pathname === l.to
                        ? "bg-mhts-charcoal text-mhts-white font-semibold"
                        : "text-muted-foreground hover:text-mhts-charcoal"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/contact"
                className={`ml-4 px-3 py-1.5 text-sm rounded-md transition-colors ${
                  location.pathname === "/contact"
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden bg-card border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* GB */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-gb-green mb-2 font-display flex items-center gap-2">
                  <img src={gbLogo} alt="" className="h-6 w-6" />
                  Georges Barbers
                </h3>
                <div className="grid grid-cols-3 gap-1">
                  {gbLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                        location.pathname === l.to
                          ? "bg-gb-green text-gb-gold"
                          : "text-muted-foreground hover:bg-gb-cream"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* MHTS */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-mhts-charcoal mb-2 flex items-center gap-2">
                  <img src={mhtsLogo} alt="" className="h-6 w-6" />
                  Men's Hair To Stay
                </h3>
                <div className="grid grid-cols-3 gap-1">
                  {mhtsLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                        location.pathname === l.to
                          ? "bg-mhts-charcoal text-mhts-white"
                          : "text-muted-foreground hover:bg-mhts-light"
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block text-center py-2 text-sm rounded-md bg-foreground text-background"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
