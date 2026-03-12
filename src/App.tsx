import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import GBAbout from "@/pages/georges/GBAbout";
import GBServices from "@/pages/georges/GBServices";
import GBPricing from "@/pages/georges/GBPricing";
import GBGallery from "@/pages/georges/GBGallery";
import GBBook from "@/pages/georges/GBBook";
import MHTSAbout from "@/pages/mhts/MHTSAbout";
import MHTSServices from "@/pages/mhts/MHTSServices";
import MHTSPricing from "@/pages/mhts/MHTSPricing";
import MHTSGallery from "@/pages/mhts/MHTSGallery";
import MHTSBook from "@/pages/mhts/MHTSBook";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/georges-barbers" element={<GBAbout />} />
            <Route path="/georges-barbers/services" element={<GBServices />} />
            <Route path="/georges-barbers/pricing" element={<GBPricing />} />
            <Route path="/georges-barbers/gallery" element={<GBGallery />} />
            <Route path="/georges-barbers/book" element={<GBBook />} />
            <Route path="/mens-hair-to-stay" element={<MHTSAbout />} />
            <Route path="/mens-hair-to-stay/services" element={<MHTSServices />} />
            <Route path="/mens-hair-to-stay/pricing" element={<MHTSPricing />} />
            <Route path="/mens-hair-to-stay/gallery" element={<MHTSGallery />} />
            <Route path="/mens-hair-to-stay/book" element={<MHTSBook />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
