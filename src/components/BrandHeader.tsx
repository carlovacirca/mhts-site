import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Mail, Home } from "lucide-react";
import gbLogoFull from "@/assets/gb-logo-full.jpeg";
import mhtsLogoFull from "@/assets/mhts-logo-full.jpeg";

const gbLinks = [
  { to: "#gb-services", label: "Services" },
  { to: "#gb-gallery", label: "Gallery" },
  { to: "#gb-book", label: "Book" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
  { to: "#gb-contact", label: "Contact" },
];

const mhtsLinks = [
  { to: "#mhts-services", label: "Services" },
  { to: "#mhts-how-it-works", label: "How It Works" },
  { to: "#mhts-gallery", label: "Gallery" },
  { to: "#mhts-book", label: "Book" },
  { to: "/faq", label: "FAQ" },
  { to: "/blog", label: "Blog" },
  { to: "#mhts-contact", label: "Contact" },
];

interface BrandHeaderProps {
  brand: "gb" | "mhts";
}

const BrandHeader = ({ brand }: BrandHeaderProps) => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isGB = brand === "gb";
  const links = isGB ? gbLinks : mhtsLinks;
  const logo = isGB ? gbLogoFull : mhtsLogoFull;
  const brandName = isGB ? "Georges Barbers" : "Men's Hair To Stay";

  const activeClass = isGB
    ? "bg-gb-gold/20 text-gb-gold font-semibold"
    : "bg-mhts-charcoal text-mhts-white font-semibold";
  const hoverClass = isGB
    ? "text-background/80 hover:text-gb-gold"
    : "text-muted-foreground hover:text-mhts-charcoal";

  // GB nav bar: black bg with white/gold text
  const navBg = isGB
    ? "bg-gb-black border-b border-gb-black"
    : "bg-card/95 backdrop-blur-md border-b border-border shadow-sm";

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = links.map((l) => l.to.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection("#" + entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links]);

  const handleAnchorClick = (hash: string) => {
    setOpen(false);
    if (!hash.startsWith("#")) return;
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-foreground text-background text-xs py-1.5 px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href={isGB ? "tel:01494432131" : "tel:07947878087"} className="flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Phone className="w-3 h-3" /> {isGB ? "01494 432131" : "07947 878087"}
          </a>
          <a href="mailto:georgesbarbers1991@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-gb-gold transition-colors">
            <Mail className="w-3 h-3" /> georgesbarbers1991@gmail.com
          </a>
        </div>
        <span className="hidden sm:block">11 Chesham Road, Amersham HP6 5HN</span>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 ${navBg}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo + Home link */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className={`p-2 rounded-md transition-colors ${isGB ? "hover:bg-background/10 text-background/70" : "hover:bg-muted text-muted-foreground"}`}
                aria-label="Back to home"
              >
                <Home className="w-5 h-5" />
              </Link>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2"
              >
                <img src={logo} alt={brandName} className="h-14 md:h-20 object-contain" />
              </button>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) =>
                l.to.startsWith("#") ? (
                  <button
                    key={l.to}
                    onClick={() => handleAnchorClick(l.to)}
                    className={`px-3 py-1.5 text-sm transition-colors rounded-md ${
                      activeSection === l.to ? activeClass : hoverClass
                    }`}
                  >
                    {l.label}
                  </button>
                ) : (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`px-3 py-1.5 text-sm transition-colors rounded-md ${hoverClass}`}
                  >
                    {l.label}
                  </Link>
                )
              )}
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className={`md:hidden p-2 rounded-md transition-colors ${isGB ? "hover:bg-background/10 text-background" : "hover:bg-muted"}`}
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className={`md:hidden border-t animate-fade-in ${isGB ? "bg-gb-black border-background/10" : "bg-card border-border"}`}>
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-3 gap-1">
                {links.map((l) =>
                  l.to.startsWith("#") ? (
                    <button
                      key={l.to}
                      onClick={() => handleAnchorClick(l.to)}
                      className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                        activeSection === l.to
                          ? activeClass
                          : isGB
                          ? "text-background/70 hover:bg-background/10"
                          : "text-muted-foreground hover:bg-mhts-light"
                      }`}
                    >
                      {l.label}
                    </button>
                  ) : (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`px-3 py-2 text-sm rounded-md text-center transition-colors ${
                        isGB
                          ? "text-background/70 hover:bg-background/10"
                          : "text-muted-foreground hover:bg-mhts-light"
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default BrandHeader;
