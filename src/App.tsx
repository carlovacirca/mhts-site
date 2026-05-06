import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import GBLanding from "@/pages/georges/GBLanding";
import MHTSLanding from "@/pages/mhts/MHTSLanding";
import ContactPage from "@/pages/ContactPage";
import FAQPage from "@/pages/FAQPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import ServiceCategoryPage from "@/pages/services/ServiceCategoryPage";
import SubServicePage from "@/pages/services/SubServicePage";
import HairSystemsPage from "@/pages/services/HairSystemsPage";
import ScalpMicropigmentationPage from "@/pages/services/ScalpMicropigmentationPage";
import HairDensityPage from "@/pages/services/HairDensityPage";
import HairSystemMaintenancePage from "@/pages/services/HairSystemMaintenancePage";
import NonSurgicalHairReplacementPage from "@/pages/services/NonSurgicalHairReplacementPage";
import HairReplacementServicePage from "@/pages/services/HairReplacementServicePage";
import InitialConsultationFittingPage from "@/pages/services/InitialConsultationFittingPage";
import HairSystemColouringPage from "@/pages/services/HairSystemColouringPage";
import HairSystemStylingPage from "@/pages/services/HairSystemStylingPage";
import SMPTouchUpPage from "@/pages/services/SMPTouchUpPage";
import SMPConsultationPage from "@/pages/services/SMPConsultationPage";
import DensityTreatmentConsultationPage from "@/pages/services/DensityTreatmentConsultationPage";
import ThinningHairTreatmentPage from "@/pages/services/ThinningHairTreatmentPage";
import CrownCoverageTreatmentPage from "@/pages/services/CrownCoverageTreatmentPage";
import HairSystemReattachmentPage from "@/pages/services/HairSystemReattachmentPage";
import HairSystemBaseCleanPage from "@/pages/services/HairSystemBaseCleanPage";
import { serviceCategories } from "@/data/services";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/georges-barbers" element={<GBLanding />} />
            <Route path="/mens-hair-to-stay" element={<MHTSLanding />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/blog" element={<BlogPage />} />
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
            <Route path="/scalp-micropigmentation/smp-touch-up-session" element={<SMPTouchUpPage />} />
            <Route path="/scalp-micropigmentation/smp-consultation" element={<SMPConsultationPage />} />
            <Route path="/hair-density/density-treatment-consultation" element={<DensityTreatmentConsultationPage />} />
            <Route path="/hair-density/thinning-hair-treatment" element={<ThinningHairTreatmentPage />} />
            <Route path="/hair-density/crown-coverage-treatment" element={<CrownCoverageTreatmentPage />} />
            <Route path="/hair-system-maintenance/hair-system-reattachment-and-restyling" element={<HairSystemReattachmentPage />} />
            <Route path="/hair-system-maintenance/hair-system-base-clean-and-reattach" element={<HairSystemBaseCleanPage />} />
            {serviceCategories.flatMap((c) => [
              <Route key={c.slug} path={`/${c.slug}`} element={<ServiceCategoryPage />} />,
              <Route key={`${c.slug}-sub`} path={`/${c.slug}/:sub`} element={<SubServicePage />} />,
            ])}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
