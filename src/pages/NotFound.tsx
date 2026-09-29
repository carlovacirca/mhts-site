import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { CtaPair } from "@/components/mhts/CtaButtons";
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

  // Batch 4b. The 404 keeps its words and its links, and gains a face: a
  // large 404 set in outline on the dark band, the six ways back as tiles, and
  // Book and Call together as they are everywhere else.
  return (
    <div className="mhts-theme">
      <section className="relative overflow-hidden bg-mhts-deep py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_0%,hsl(var(--mhts-red)/0.25),transparent_70%)]" />
        <div className="container relative mx-auto px-4 max-w-2xl text-center">
          <p
            className="select-none font-body text-[7rem] font-bold leading-none text-transparent md:text-[10rem]"
            style={{ WebkitTextStroke: "2px hsl(var(--mhts-red-light))" }}
            aria-hidden="true"
          >
            404
          </p>
          <p className="mb-4 mt-2 font-body text-xs font-semibold uppercase tracking-[0.3em] text-mhts-red-light">
            Error 404
          </p>
          <h1 className="text-3xl text-white md:text-4xl">
            We could not find that page
          </h1>
          <div className="mx-auto my-6 h-1 w-14 rounded-full bg-mhts-red" />
          <p className="font-body leading-relaxed text-white/80">
            The link may be out of date, or the address may have a typo in it.
            Everything below is a good place to pick up from.
          </p>
        </div>
      </section>

      <section className="bg-mhts-sand py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="group flex items-center justify-between rounded-xl border border-mhts-stone bg-card px-5 py-4 font-body text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 text-mhts-red transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <CtaPair className="mt-10 justify-center" label="Book a Free Consultation" />
        </div>
      </section>
    </div>
  );
};

export default NotFound;
