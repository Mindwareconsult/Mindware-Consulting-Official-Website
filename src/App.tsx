/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { initExternalAnalytics } from "./lib/analytics";

// Lazy load pages for better performance
const Solutions = lazy(() => import("./pages/Solutions").then(module => ({ default: module.Solutions })));
const Services = lazy(() => import("./pages/Services").then(module => ({ default: module.Services })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(module => ({ default: module.ServiceDetail })));
const Contact = lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));
const Portfolio = lazy(() => import("./pages/Portfolio").then(module => ({ default: module.Portfolio })));
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const MissionVisionValues = lazy(() => import("./pages/MissionVisionValues").then(module => ({ default: module.MissionVisionValues })));
const LeadershipManagement = lazy(() => import("./pages/LeadershipManagement").then(module => ({ default: module.LeadershipManagement })));
const Pricing = lazy(() => import("./pages/Pricing").then(module => ({ default: module.Pricing })));
const CaseStudies = lazy(() => import("./pages/CaseStudies").then(module => ({ default: module.CaseStudies })));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail").then(module => ({ default: module.CaseStudyDetail })));
const Insights = lazy(() => import("./pages/Insights").then(module => ({ default: module.Insights })));
const InsightDetail = lazy(() => import("./pages/InsightDetail").then(module => ({ default: module.InsightDetail })));
const Careers = lazy(() => import("./pages/Careers").then(module => ({ default: module.Careers })));
const Testimonials = lazy(() => import("./pages/Testimonials").then(module => ({ default: module.Testimonials })));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas").then(module => ({ default: module.ServiceAreas })));
const ServiceAreaDetail = lazy(() => import("./pages/ServiceAreaDetail").then(module => ({ default: module.ServiceAreaDetail })));
const Industries = lazy(() => import("./pages/Industries").then(module => ({ default: module.Industries })));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail").then(module => ({ default: module.IndustryDetail })));
const BusinessGrowthSeason = lazy(() => import("./pages/BusinessGrowthSeason").then(module => ({ default: module.BusinessGrowthSeason })));
const Privacy = lazy(() => import("./pages/Privacy").then(module => ({ default: module.Privacy })));
const NotFound = lazy(() => import("./pages/NotFound").then(module => ({ default: module.NotFound })));

// Loading fallback
function PageLoader() {
  return (
    <div className="pt-32 pb-24 min-h-[70vh] container mx-auto px-6 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-mw-orange animate-spin" />
    </div>
  );
}

export default function App() {
  useEffect(() => {
    initExternalAnalytics();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/mission-vision" element={<MissionVisionValues />} />
            <Route path="/about/mission-vision-values" element={<MissionVisionValues />} />
            <Route path="/about/philosophy" element={<Navigate to="/about/mission-vision" replace />} />
            <Route path="/about/values" element={<Navigate to="/about/mission-vision" replace />} />
            <Route path="/about/leadership" element={<LeadershipManagement />} />
            <Route path="/about/leadership-and-management" element={<LeadershipManagement />} />
            <Route path="/about/management" element={<Navigate to="/about/leadership" replace />} />
            <Route path="/about/team" element={<Navigate to="/about/leadership" replace />} />
            <Route path="/about/testimonials" element={<Testimonials />} />
            <Route path="/about/video-testimonials" element={<Navigate to="/about/testimonials" replace />} />
            <Route path="/about/reviews" element={<Navigate to="/about/testimonials" replace />} />
            <Route path="/testimonials" element={<Navigate to="/about/testimonials" replace />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/case-studies" element={<CaseStudies />} />
            <Route path="/portfolio/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/case-studies" element={<Navigate to="/portfolio/case-studies" replace />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/service-areas/:stateSlug" element={<ServiceAreaDetail />} />
            <Route path="/locations" element={<Navigate to="/service-areas" replace />} />
            <Route path="/locations/:stateSlug" element={<Navigate to="/service-areas/:stateSlug" replace />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:industrySlug" element={<IndustryDetail />} />
            <Route path="/service-industries" element={<Navigate to="/industries" replace />} />
            <Route path="/service-industries/:industrySlug" element={<Navigate to="/industries/:industrySlug" replace />} />
            <Route path="/sectors" element={<Navigate to="/industries" replace />} />
            <Route path="/business-growth-season" element={<BusinessGrowthSeason />} />
            <Route path="/campaigns/business-growth-season-2026" element={<BusinessGrowthSeason />} />
            <Route path="/campaign" element={<Navigate to="/business-growth-season" replace />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
