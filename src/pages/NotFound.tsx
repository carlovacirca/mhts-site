import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { useSeo } from "@/lib/seo";

// Rendered inside <Layout>, so this page now has the site header and footer.
// It used to sit outside the layout and was a dead end with one link.
// See docs/HEALTH-CHECK.md findings 2 and 22.
const NotFound = () => {
  const location = useLocation();

  useSeo({
    title: "Page Not Found | Men's Hair To Stay",
    description:
      "That page does not exist. Find hair systems, scalp micropigmentation, hair density treatment and hair system maintenance in Amersham.",
    noindex: true,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const links = [
    { to: "/services", label: "All Services" },
    { to: "/hair-systems", label: "Hair Systems" },
    { to: "/scalp-micropigmentation", label: "Scalp Micropigmentation" },
    { to: "/hair-density", label: "Hair Density" },
    { to: "/hair-system-maintenance", label: "Hair System Maintenance" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <div className="mhts-theme">
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <p className="text-mhts-slate uppercase tracking-[0.3em] text-xs mb-4 font-body">
            Error 404
          </p>
          <h1 className="text-3xl md:text-4xl text-mhts-charcoal font-light tracking-wide">
            We could not find that page
          </h1>
          <div className="w-12 h-px bg-mhts-charcoal mx-auto my-6" />
          <p className="text-foreground/75 font-body leading-relaxed">
            The link may be out of date, or the address may have a typo in it.
            Everything below is a good place to pick up from.
          </p>

          <nav className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="border border-border rounded-sm px-5 py-4 font-body text-sm text-mhts-charcoal hover:border-mhts-charcoal transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 bg-mhts-charcoal text-mhts-white px-6 py-3 rounded-sm hover:bg-mhts-navy transition-colors font-body text-sm"
            >
              <CalendarCheck className="w-4 h-4" /> Book a Free Consultation
            </Link>
            <a
              href="tel:07947878087"
              className="inline-flex items-center justify-center gap-2 border border-mhts-charcoal text-mhts-charcoal px-6 py-3 rounded-sm hover:bg-mhts-light transition-colors font-body text-sm"
            >
              <Phone className="w-4 h-4" /> Call 07947 878087
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
