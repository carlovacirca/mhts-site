import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarCheck, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { treatments } from "@/data/treatments";
import mhtsLogoFull from "@/assets/mhts-logo-full.jpeg";
import ResponsiveImage from "@/components/ResponsiveImage";
import { EMAIL, GOOGLE_MAPS_URL, ADDRESS_LINE, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

// The menu repeated itself: a home icon and a logo that both went home, a
// Services link with a dropdown that listed the same services again and then a
// second column of things that were not services at all, "Areas Serviced"
// wrapping on to two lines, and an 11-link three-column grid on phones with no
// way to call. See docs/DESIGN-AUDIT.md finding 4.
//
// What is here now: one Treatments dropdown over the four money pages, then
// Results, Blog and Contact, and the two calls to action on the right. How It
// Works, FAQ, Areas Serviced and the Services overview all moved to the footer,
// where every one of them is still linked, so no page lost an internal link.

const mainLinks = [
  { to: "/gallery", label: "Results" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

/** Phone only. FAQ is in here as well as the footer; it is a common question page. */
const panelLinks = [
  { to: "/gallery", label: "Results" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const BrandHeader = () => {
  const [open, setOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const location = useLocation();
  const treatmentsRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isTreatmentPath = treatments.some((t) => location.pathname.startsWith(`/${t.slug}`));

  // Close both menus whenever the route changes, including a click on the link
  // that is already current.
  useEffect(() => {
    setOpen(false);
    setTreatmentsOpen(false);
  }, [location.pathname]);

  // Desktop dropdown: outside click and Escape.
  useEffect(() => {
    if (!treatmentsOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (treatmentsRef.current && !treatmentsRef.current.contains(e.target as Node)) {
        setTreatmentsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setTreatmentsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [treatmentsOpen]);

  // Phone panel: Escape closes it, the page behind cannot scroll, and focus is
  // trapped inside until it closes, then handed back to the button that opened
  // it. A full-height overlay that leaks focus to the page underneath is a
  // keyboard trap in the other direction.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Everything inside the panel is visible by construction, so there is no
    // hidden-element filter here. offsetParent, the usual one, is null for
    // every element in jsdom and would silently empty this list under test.
    const focusables = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (current === first || !panelRef.current?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const firstItem = focusables()[0];
    firstItem?.focus();

    // Captured now, not read in the cleanup: by the time the cleanup runs the
    // ref may already point somewhere else, and the focus would go with it.
    const toggle = toggleRef.current;

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      toggle?.focus();
    };
  }, [open]);

  const desktopLink = (to: string, label: string) => (
    <Link
      key={to}
      to={to}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        location.pathname === to
          ? "bg-mhts-red-tint text-mhts-red-deep"
          : "text-mhts-ink/75 hover:text-mhts-red-deep"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between bg-mhts-ink px-4 py-1.5 text-xs text-white/80">
        <div className="flex items-center gap-4">
          <a href={`tel:${PHONE_TEL}`} data-cta="call" className="flex items-center gap-1.5 transition-colors hover:text-white">
            <Phone className="h-3 w-3" aria-hidden="true" /> {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="hidden items-center gap-1.5 transition-colors hover:text-white sm:flex">
            <Mail className="h-3 w-3" aria-hidden="true" /> {EMAIL}
          </a>
        </div>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 transition-colors hover:text-white sm:flex"
        >
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {ADDRESS_LINE}
        </a>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-50 border-b border-mhts-stone bg-card/95 shadow-sm backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between gap-4 md:h-24">
            {/* One route home, not two. The home icon that sat beside the logo
                did the same job as the logo. */}
            {/* Always lands on the homepage hero. From another page the route
                change scrolls to the top (ScrollToTop in App.tsx); on the
                homepage itself the route does not change, so this does it. */}
            <Link
              to="/"
              onClick={() => {
                if (location.pathname === "/") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
              }}
              className="flex shrink-0 items-center"
              aria-label="Men's Hair To Stay home"
            >
              <ResponsiveImage
                src={mhtsLogoFull}
                alt="Men's Hair To Stay"
                className="h-12 w-auto object-contain md:h-16"
                sizes="160px"
                priority
              />
            </Link>

            {/* Desktop nav. lg, not md: at 768 to 1023 the nav plus both
                buttons is wider than the bar and used to wrap. */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              <div className="relative" ref={treatmentsRef}>
                <button
                  type="button"
                  onClick={() => setTreatmentsOpen((v) => !v)}
                  aria-haspopup="true"
                  aria-expanded={treatmentsOpen}
                  className={`inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    treatmentsOpen || isTreatmentPath
                      ? "bg-mhts-red-tint text-mhts-red-deep"
                      : "text-mhts-ink/75 hover:text-mhts-red-deep"
                  }`}
                >
                  Treatments
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${treatmentsOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {treatmentsOpen && (
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="w-[360px] rounded-xl border border-mhts-stone bg-card p-2 shadow-xl">
                      {treatments.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/${t.slug}`}
                          onClick={() => setTreatmentsOpen(false)}
                          className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-mhts-sand"
                        >
                          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mhts-red-tint">
                            <t.icon className="h-4 w-4 text-mhts-red" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-mhts-ink group-hover:text-mhts-red-deep">
                              {t.name}
                            </span>
                            <span className="block font-body text-xs leading-snug text-muted-foreground">
                              {t.line}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {mainLinks.map((l) => desktopLink(l.to, l.label))}
            </nav>

            {/* Call sits beside Book, here and everywhere else on the site. */}
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={`tel:${PHONE_TEL}`}
                data-cta="call"
                className="hidden items-center gap-2 whitespace-nowrap rounded-md border border-mhts-stone-deep px-4 py-2.5 text-sm font-semibold text-mhts-ink transition-colors hover:border-mhts-red hover:text-mhts-red-deep lg:inline-flex"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
              <Link
                to="/book"
                className="mhts-shine hidden items-center gap-2 whitespace-nowrap rounded-md bg-mhts-red px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mhts-red-deep lg:inline-flex"
              >
                <CalendarCheck className="relative z-[2] h-4 w-4" aria-hidden="true" />
                <span className="relative z-[2]">Book free consultation</span>
              </Link>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="rounded-md p-2.5 transition-colors hover:bg-mhts-sand lg:hidden"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mhts-mobile-menu"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Phone panel. Full height, one left-aligned column, 48px targets. */}
      {/* Phone panel sits above the fixed bottom stack (z-100), so an open menu
          covers the cookie banner rather than having its buttons cut in half. */}
      {open && (
        <div className="fixed inset-0 z-[110] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          {/* The scrim. Not a button: it would be a tab stop outside the trap
              below, and the panel already has a Close button and answers to
              Escape. */}
          <div
            data-testid="menu-overlay"
            className="absolute inset-0 bg-mhts-ink/60"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="mhts-mobile-menu"
            ref={panelRef}
            className="absolute inset-y-0 right-0 flex w-[88%] max-w-sm animate-menu-in flex-col bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-mhts-stone px-4 py-3">
              <ResponsiveImage
                src={mhtsLogoFull}
                alt="Men's Hair To Stay"
                className="h-10 w-auto object-contain"
                sizes="120px"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-12 w-12 place-items-center rounded-md transition-colors hover:bg-mhts-sand"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-3" aria-label="Menu">
              <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mhts-red-deep">
                Treatments
              </p>
              {treatments.map((t) => (
                <Link
                  key={t.slug}
                  to={`/${t.slug}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center gap-3 rounded-lg px-3 text-base font-medium text-mhts-ink transition-colors hover:bg-mhts-sand"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-mhts-red-tint">
                    <t.icon className="h-4 w-4 text-mhts-red" aria-hidden="true" />
                  </span>
                  {t.name}
                </Link>
              ))}

              <div className="my-3 border-t border-mhts-stone" />

              {panelLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-mhts-ink transition-colors hover:bg-mhts-sand"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="grid gap-2 border-t border-mhts-stone p-4">
              <a
                href={`tel:${PHONE_TEL}`}
                data-cta="call"
                className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md border border-mhts-stone-deep text-base font-semibold text-mhts-ink"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call {PHONE_DISPLAY}
              </a>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="mhts-shine inline-flex min-h-[52px] items-center justify-center gap-2 rounded-md bg-mhts-red text-base font-semibold text-white"
              >
                <CalendarCheck className="relative z-[2] h-5 w-5" aria-hidden="true" />
                <span className="relative z-[2]">Book free consultation</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BrandHeader;
