import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Home } from "lucide-react";
import gbLogo from "@/assets/gb-logo.png";
import mhtsLogo from "@/assets/mhts-logo.png";

const gbLinks = [
  { to: "/georges-barbers", label: "About" },
  { to: "/georges-barbers/services", label: "Services" },
  { to: "/georges-barbers/pricing", label: "Pricing" },
  { to: "/georges-barbers/gallery", label: "Gallery" },
  { to: "/georges-barbers/book", label: "Book" },
  { to: "/contact", label: "Contact" },
];

const mhtsLinks = [
  { to: "/mens-hair-to-stay", label: "About" },
  { to: "/mens-hair-to-stay/services", label: "Services" },
  { to: "/mens-hair-to-stay/pricing", label: "Pricing" },
  { to: "/mens-hair-to-stay/gallery", label: "Gallery" },
  { to: "/mens-hair-to-stay/book", label: "Book" },
  { to: "/contact", label: "Contact" },
];

interface BrandHeaderProps {
  brand: "gb" | "mhts";
}

const BrandHeader = ({ brand }: BrandHeaderProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isGB = brand === "gb";
  const links = isGB ? gbLinks : mhtsLinks;
  const logo = isGB ? gbLogo : mhtsLogo;
  const brandName = isGB ? "Georges Barbers" : "Men's Hair To Stay";

  const activeClass = isGB
    ? "bg-gb-green text-gb-gold font-semibold"
    : "bg-mhts-charcoal text-mhts-white font-semibold";
  const hoverClass = isGB
    ? "text-muted-foreground hover:text-gb-green"
    : "text-muted-foreground hover:text-mhts-charcoal";
  const brandColor = isGB ? "text-gb-green" : "text-mhts-charcoal";

  return (
    <>
      {/* Top bar */}
      <div className="bg-foreground text-background text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="tel:01234567890" className="flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Phone className="w-3 h-3" /> 01234 567 890
          </a>
          <a href="mailto:info@georgesbarbers.co.uk" className="hidden sm:flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Mail className="w-3 h-3" /> info@georgesbarbers.co.uk
          </a>
        </div>
        <span className="hidden sm:block">11 Chesham Road, Amersham HP6 5HN</span>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Home link */}
            <div className="flex items-center gap-3">
              <Link to="/" className="p-2 rounded-md hover:bg-muted transition-colors" aria-label="Back to home">
                <Home className="w-5 h-5 text-muted-foreground" />
              </Link>
              <Link to={links[0].to} className="flex items-center gap-2">
                <img src={logo} alt={brandName} className="h-10 w-10 object-contain" />
                <span className={`font-semibold ${brandColor} ${isGB ? "font-display" : "font-light tracking-wide"}`}>
                  {brandName}
                </span>
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-1.5 text-sm transition-colors rounded-md ${
                    location.pathname === l.to ? activeClass : hoverClass
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-card border-t border-border animate-fade-in">
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-3 gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                      location.pathname === l.to
                        ? activeClass
                        : isGB
                        ? "text-muted-foreground hover:bg-gb-cream"
                        : "text-muted-foreground hover:bg-mhts-light"
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default BrandHeader;
