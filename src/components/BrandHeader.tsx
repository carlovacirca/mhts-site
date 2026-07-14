import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin, Home, ChevronDown, CalendarCheck } from "lucide-react";
import { serviceCategories } from "@/data/services";
import mhtsLogoFull from "@/assets/mhts-logo-full.jpeg";

const primaryLinks = [
  { to: "/services", label: "Services" },
  { to: "/areas-serviced", label: "Areas Serviced" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const servicesMenuExtras = [
  { to: "/how-it-works", label: "How It Works" },
  { to: "/gallery", label: "Gallery" },
];

const BrandHeader = () => {
  const [open, setOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const links = primaryLinks;
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  const activeClass = "bg-mhts-charcoal text-mhts-white font-semibold";
  const hoverClass = "text-muted-foreground hover:text-mhts-charcoal";
  const navBg = "bg-card/95 backdrop-blur-md border-b border-border shadow-sm";

  const brandPath = "/";
  const onBrandPage = location.pathname === brandPath;

  // Track active section via IntersectionObserver — only on the home page
  useEffect(() => {
    if (!onBrandPage) {
      setActiveSection("");
      return;
    }
    const anchorIds = links
      .filter((l) => l.to.startsWith("#"))
      .map((l) => l.to.slice(1));
    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let bestId = "";
        let bestRatio = -1;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveSection(bestId ? "#" + bestId : "");
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    anchorIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [links, onBrandPage, location.pathname]);

  // Close the Services mega-menu on outside click/tap or Escape
  useEffect(() => {
    if (!servicesMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesMenuRef.current && !servicesMenuRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [servicesMenuOpen]);

  const handleAnchorClick = (hash: string) => {
    setOpen(false);
    if (!hash.startsWith("#")) return;
    if (!onBrandPage) {
      navigate(`${brandPath}${hash}`);
      return;
    }
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
          <a href="tel:07947878087" className="flex items-center gap-1 hover:text-mhts-slate transition-colors">
            <Phone className="w-3 h-3" /> 07947 878087
          </a>
          <a href="mailto:georgesbarbers1991@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-mhts-slate transition-colors">
            <Mail className="w-3 h-3" /> georgesbarbers1991@gmail.com
          </a>
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=11+Chesham+Road%2C+Amersham+HP6+5HN"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 hover:text-mhts-slate transition-colors"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" /> 11 Chesham Road, Amersham HP6 5HN
        </a>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 ${navBg}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Logo + Home link */}
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="p-2 rounded-md transition-colors hover:bg-muted text-muted-foreground"
                aria-label="Back to home"
              >
                <Home className="w-5 h-5" />
              </Link>
              <Link
                to={brandPath}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="flex items-center gap-2"
                aria-label="Men's Hair To Stay home"
              >
                <img src={mhtsLogoFull} alt="Men's Hair To Stay" className="h-14 md:h-20 object-contain" />
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {links.map((l) => {
                if (l.label === "Services") {
                  return (
                    <div key={l.to} className="relative" ref={servicesMenuRef}>
                      <button
                        onClick={() => setServicesMenuOpen((v) => !v)}
                        aria-haspopup="true"
                        aria-expanded={servicesMenuOpen}
                        className={`px-3 py-1.5 text-sm transition-colors rounded-md inline-flex items-center gap-1 ${
                          activeSection === l.to || servicesMenuOpen ? activeClass : hoverClass
                        }`}
                      >
                        {l.label}
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${servicesMenuOpen ? "rotate-180" : ""}`} />
                      </button>
                      {servicesMenuOpen && (
                        <div className="absolute left-0 top-full pt-2 z-50">
                          <div className="bg-card border border-border rounded-md shadow-lg py-4 px-4 min-w-[440px] grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[11px] uppercase tracking-[0.15em] text-mhts-slate font-body px-2 mb-1">
                                Our Services
                              </p>
                              {serviceCategories.map((c) => (
                                <Link
                                  key={c.slug}
                                  to={`/${c.slug}`}
                                  onClick={() => setServicesMenuOpen(false)}
                                  className="block px-2 py-2 text-sm font-body text-mhts-charcoal hover:bg-mhts-light rounded-md transition-colors"
                                >
                                  {c.name}
                                </Link>
                              ))}
                            </div>
                            <div className="border-l border-border pl-4">
                              <p className="text-[11px] uppercase tracking-[0.15em] text-mhts-slate font-body px-2 mb-1">
                                Learn More
                              </p>
                              {servicesMenuExtras.map((extra) => (
                                <Link
                                  key={extra.to}
                                  to={extra.to}
                                  onClick={() => setServicesMenuOpen(false)}
                                  className="block px-2 py-2 text-sm font-body text-mhts-charcoal hover:bg-mhts-light rounded-md transition-colors"
                                >
                                  {extra.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return l.to.startsWith("#") ? (
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
                    className={`px-3 py-1.5 text-sm transition-colors rounded-md ${
                      location.pathname === l.to ? activeClass : hoverClass
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-2">
              <Link
                to="/book"
                className="hidden md:inline-flex items-center gap-1.5 bg-mhts-charcoal text-mhts-white px-5 py-2.5 rounded-sm text-sm font-body tracking-wide hover:bg-mhts-slate transition-colors whitespace-nowrap"
              >
                <CalendarCheck className="w-4 h-4" />
                Book Free Consultation
              </Link>
              <button
                onClick={() => setOpen(!open)}
                className="md:hidden p-2.5 rounded-md transition-colors hover:bg-muted"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile-only full-width CTA row */}
          <div className="md:hidden pb-3">
            <Link
              to="/book"
              className="flex items-center justify-center gap-1.5 w-full bg-mhts-charcoal text-mhts-white px-4 py-3 rounded-sm text-sm font-body tracking-wide hover:bg-mhts-slate transition-colors"
            >
              <CalendarCheck className="w-4 h-4" />
              Book Free Consultation
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t animate-fade-in bg-card border-border">
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
                        location.pathname === l.to
                          ? activeClass
                          : "text-muted-foreground hover:bg-mhts-light"
                      }`}
                    >
                      {l.label}
                    </Link>
                  )
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-[0.2em] text-mhts-slate font-body mb-2 px-1">Service Categories</p>
                <div className="grid grid-cols-2 gap-1">
                  {serviceCategories.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-center text-mhts-charcoal hover:bg-mhts-light transition-colors font-body"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs uppercase tracking-[0.2em] text-mhts-slate font-body mb-2 px-1">Learn More</p>
                <div className="grid grid-cols-2 gap-1">
                  {servicesMenuExtras.map((extra) => (
                    <Link
                      key={extra.to}
                      to={extra.to}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2 text-sm rounded-md text-center text-mhts-charcoal hover:bg-mhts-light transition-colors font-body"
                    >
                      {extra.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default BrandHeader;
