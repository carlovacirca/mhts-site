import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, matchPath, useLocation } from "react-router-dom";
import { lazy, useEffect, useRef, type ComponentType } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import { endFirstPaint, wasPrerendered } from "@/lib/prerender";

// Each page is its own file, fetched when it is first needed (speed check,
// Oct 2026: every page's code arrived with the first page). The page the
// reader lands on is fetched before the first render (preloadRoute, called
// from main.tsx), so the pre-rendered HTML is never swapped for a blank
// fallback; a page loaded once renders straight away from then on.
type Page = ComponentType & { preload: () => Promise<unknown> };
function page(loader: () => Promise<{ default: ComponentType }>): Page {
  let Loaded: ComponentType | null = null;
  const preload = () =>
    loader().then((m) => {
      Loaded = m.default;
      return m;
    });
  const Lazy = lazy(preload);
  const Wrapped = (() => (Loaded ? <Loaded /> : <Lazy />)) as unknown as Page;
  Wrapped.preload = preload;
  return Wrapped;
}

const MHTSLanding = page(() => import("@/pages/mhts/MHTSLanding"));
const ContactPage = page(() => import("@/pages/ContactPage"));
const FAQPage = page(() => import("@/pages/FAQPage"));
const BlogPage = page(() => import("@/pages/BlogPage"));
const BlogPostPage = page(() => import("@/pages/BlogPostPage"));
const HairSystemsPage = page(() => import("@/pages/services/HairSystemsPage"));
const ScalpMicropigmentationPage = page(() => import("@/pages/services/ScalpMicropigmentationPage"));
const HairDensityPage = page(() => import("@/pages/services/HairDensityPage"));
const HairSystemMaintenancePage = page(() => import("@/pages/services/HairSystemMaintenancePage"));
const NonSurgicalHairReplacementPage = page(() => import("@/pages/services/NonSurgicalHairReplacementPage"));
const HairReplacementServicePage = page(() => import("@/pages/services/HairReplacementServicePage"));
const InitialConsultationFittingPage = page(() => import("@/pages/services/InitialConsultationFittingPage"));
const HairSystemColouringPage = page(() => import("@/pages/services/HairSystemColouringPage"));
const HairSystemStylingPage = page(() => import("@/pages/services/HairSystemStylingPage"));
const FullSMPTreatmentPage = page(() => import("@/pages/services/FullSMPTreatmentPage"));
const SMPTouchUpPage = page(() => import("@/pages/services/SMPTouchUpPage"));
const SMPConsultationPage = page(() => import("@/pages/services/SMPConsultationPage"));
const DensityTreatmentConsultationPage = page(() => import("@/pages/services/DensityTreatmentConsultationPage"));
const ThinningHairTreatmentPage = page(() => import("@/pages/services/ThinningHairTreatmentPage"));
const CrownCoverageTreatmentPage = page(() => import("@/pages/services/CrownCoverageTreatmentPage"));
const HairSystemReattachmentPage = page(() => import("@/pages/services/HairSystemReattachmentPage"));
const HairSystemBaseCleanPage = page(() => import("@/pages/services/HairSystemBaseCleanPage"));
const HairSystemFullMaintenancePage = page(() => import("@/pages/services/HairSystemFullMaintenancePage"));
const HowItWorksPage = page(() => import("@/pages/HowItWorksPage"));
const ServicesPage = page(() => import("@/pages/ServicesPage"));
const GalleryPage = page(() => import("@/pages/GalleryPage"));
const BookPage = page(() => import("@/pages/BookPage"));
const AreasServicedPage = page(() => import("@/pages/AreasServicedPage"));
const AreaPage = page(() => import("@/pages/AreaPage"));
const PrivacyPolicyPage = page(() => import("@/pages/PrivacyPolicyPage"));
const NotFound = page(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const firstRun = useRef(true);
  useEffect(() => {
    const initial = firstRun.current;
    firstRun.current = false;
    // Entry animations are suppressed only while React catches up with the
    // pre-rendered HTML. From here on every route animates as it always has.
    if (initial) endFirstPaint();
    // On a pre-rendered page the reader can see and scroll the content a
    // second before React mounts. Resetting to the top here would jerk them
    // back up. The browser has already put them where they asked to be, and
    // named anchors now exist in the HTML so they work without JavaScript.
    if (initial && wasPrerendered()) return;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return;
        }
        window.scrollTo(0, 0);
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// The pages by path, in the order of <Routes> below, for preloadRoute.
const PAGES: [string, Page][] = [
  ["/", MHTSLanding],
  ["/contact", ContactPage],
  ["/how-it-works", HowItWorksPage],
  ["/services", ServicesPage],
  ["/gallery", GalleryPage],
  ["/book", BookPage],
  ["/faq", FAQPage],
  ["/blog", BlogPage],
  ["/areas-serviced", AreasServicedPage],
  ["/areas/:slug", AreaPage],
  ["/privacy-policy", PrivacyPolicyPage],
  ["/blog/:slug", BlogPostPage],
  ["/hair-systems", HairSystemsPage],
  ["/scalp-micropigmentation", ScalpMicropigmentationPage],
  ["/hair-density", HairDensityPage],
  ["/hair-system-maintenance", HairSystemMaintenancePage],
  ["/hair-systems/non-surgical-hair-replacement", NonSurgicalHairReplacementPage],
  ["/hair-systems/hair-replacement-service", HairReplacementServicePage],
  ["/hair-systems/initial-consultation-and-fitting", InitialConsultationFittingPage],
  ["/hair-systems/hair-system-colouring", HairSystemColouringPage],
  ["/hair-systems/hair-system-styling", HairSystemStylingPage],
  ["/scalp-micropigmentation/full-smp-treatment", FullSMPTreatmentPage],
  ["/scalp-micropigmentation/smp-touch-up-session", SMPTouchUpPage],
  ["/scalp-micropigmentation/smp-consultation", SMPConsultationPage],
  ["/hair-density/density-treatment-consultation", DensityTreatmentConsultationPage],
  ["/hair-density/thinning-hair-treatment", ThinningHairTreatmentPage],
  ["/hair-density/crown-coverage-treatment", CrownCoverageTreatmentPage],
  ["/hair-system-maintenance/hair-system-reattachment-and-restyling", HairSystemReattachmentPage],
  ["/hair-system-maintenance/hair-system-base-clean-and-reattach", HairSystemBaseCleanPage],
  ["/hair-system-maintenance/hair-system-full-maintenance-package", HairSystemFullMaintenancePage],
];

/** Fetches the code of the page at `pathname` (or the 404), before the first render. */
export const preloadRoute = (pathname: string) => {
  const hit = PAGES.find(([path]) => matchPath(path, pathname));
  return (hit ? hit[1] : NotFound).preload();
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MHTSLanding />} />
            <Route path="/mens-hair-to-stay" element={<Navigate to="/" replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/book" element={<BookPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/areas-serviced" element={<AreasServicedPage />} />
            <Route path="/areas/:slug" element={<AreaPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/blog/ultimate-guide-hair-systems-2024" element={<Navigate to="/blog/ultimate-guide-hair-systems" replace />} />
            <Route path="/blog/hair-restoration-cost-guide-2024" element={<Navigate to="/blog/hair-restoration-cost-guide" replace />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/hair-systems" element={<HairSystemsPage />} />
            <Route path="/scalp-micropigmentation" element={<ScalpMicropigmentationPage />} />
            <Route path="/hair-density" element={<HairDensityPage />} />
            <Route path="/hair-system-maintenance" element={<HairSystemMaintenancePage />} />
            <Route path="/hair-systems/non-surgical-hair-replacement" element={<NonSurgicalHairReplacementPage />} />
            <Route path="/hair-systems/hair-replacement-service" element={<HairReplacementServicePage />} />
            <Route path="/hair-systems/initial-consultation-and-fitting" element={<InitialConsultationFittingPage />} />
            <Route path="/hair-systems/hair-system-colouring" element={<HairSystemColouringPage />} />
            <Route path="/hair-systems/hair-system-styling" element={<HairSystemStylingPage />} />
            <Route path="/scalp-micropigmentation/full-smp-treatment" element={<FullSMPTreatmentPage />} />
            <Route path="/scalp-micropigmentation/smp-touch-up-session" element={<SMPTouchUpPage />} />
            <Route path="/scalp-micropigmentation/smp-consultation" element={<SMPConsultationPage />} />
            <Route path="/hair-density/density-treatment-consultation" element={<DensityTreatmentConsultationPage />} />
            <Route path="/hair-density/thinning-hair-treatment" element={<ThinningHairTreatmentPage />} />
            <Route path="/hair-density/crown-coverage-treatment" element={<CrownCoverageTreatmentPage />} />
            <Route path="/hair-system-maintenance/hair-system-reattachment-and-restyling" element={<HairSystemReattachmentPage />} />
            <Route path="/hair-system-maintenance/hair-system-base-clean-and-reattach" element={<HairSystemBaseCleanPage />} />
            <Route path="/hair-system-maintenance/hair-system-full-maintenance-package" element={<HairSystemFullMaintenancePage />} />
            {/* Inside <Layout> so a wrong URL still gets the header, footer and nav. */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
