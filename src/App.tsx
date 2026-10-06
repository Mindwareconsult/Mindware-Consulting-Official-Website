/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";

// Lazy load pages for better performance
const Services = lazy(() => import("./pages/Services").then(module => ({ default: module.Services })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(module => ({ default: module.ServiceDetail })));
const Contact = lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));
const Portfolio = lazy(() => import("./pages/Portfolio").then(module => ({ default: module.Portfolio })));
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const MissionVisionValues = lazy(() => import("./pages/MissionVisionValues").then(module => ({ default: module.MissionVisionValues })));
const LeadershipManagement = lazy(() => import("./pages/LeadershipManagement").then(module => ({ default: module.LeadershipManagement })));
const Training = lazy(() => import("./pages/Training").then(module => ({ default: module.Training })));
const DigitalSkillsTraining = lazy(() => import("./pages/DigitalSkillsTraining").then(module => ({ default: module.DigitalSkillsTraining })));
const ProfessionalDevelopmentTraining = lazy(() => import("./pages/ProfessionalDevelopmentTraining").then(module => ({ default: module.ProfessionalDevelopmentTraining })));
const Pricing = lazy(() => import("./pages/Pricing").then(module => ({ default: module.Pricing })));
const CaseStudies = lazy(() => import("./pages/CaseStudies").then(module => ({ default: module.CaseStudies })));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail").then(module => ({ default: module.CaseStudyDetail })));
const Insights = lazy(() => import("./pages/Insights").then(module => ({ default: module.Insights })));
const InsightDetail = lazy(() => import("./pages/InsightDetail").then(module => ({ default: module.InsightDetail })));
const Careers = lazy(() => import("./pages/Careers").then(module => ({ default: module.Careers })));
const CareersCVBuilder = lazy(() => import("./pages/CareersCVBuilder").then(module => ({ default: module.CareersCVBuilder })));
const CareersJobs = lazy(() => import("./pages/CareersJobs").then(module => ({ default: module.CareersJobs })));
const CareersEmployers = lazy(() => import("./pages/CareersEmployers").then(module => ({ default: module.CareersEmployers })));
const Testimonials = lazy(() => import("./pages/Testimonials").then(module => ({ default: module.Testimonials })));
const AcademyTestimonials = lazy(() => import("./pages/AcademyTestimonials").then(module => ({ default: module.AcademyTestimonials })));
const TrainingGallery = lazy(() => import("./pages/TrainingGallery").then(module => ({ default: module.TrainingGallery })));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas").then(module => ({ default: module.ServiceAreas })));
const ServiceAreaDetail = lazy(() => import("./pages/ServiceAreaDetail").then(module => ({ default: module.ServiceAreaDetail })));
const Industries = lazy(() => import("./pages/Industries").then(module => ({ default: module.Industries })));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail").then(module => ({ default: module.IndustryDetail })));

// Loading fallback
function PageLoader() {
  return (
    <div className="pt-32 pb-24 min-h-[70vh] container mx-auto px-6 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-mw-orange animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/training" element={<Training />} />
            <Route path="/training/digital-skills" element={<DigitalSkillsTraining />} />
            <Route path="/training/professional-development" element={<ProfessionalDevelopmentTraining />} />
            <Route path="/training/employability-skills" element={<Navigate to="/training/professional-development" replace />} />
            <Route path="/training/testimonials" element={<AcademyTestimonials />} />
            <Route path="/training/reviews" element={<Navigate to="/training/testimonials" replace />} />
            <Route path="/training/video-testimonials" element={<Navigate to="/training/testimonials" replace />} />
            <Route path="/training/graduate-testimonials" element={<Navigate to="/training/testimonials" replace />} />
            <Route path="/training/gallery" element={<TrainingGallery />} />
            <Route path="/training/training-gallery" element={<Navigate to="/training/gallery" replace />} />
            <Route path="/training/photos" element={<Navigate to="/training/gallery" replace />} />
            <Route path="/training/pictures" element={<Navigate to="/training/gallery" replace />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/careers/cv-builder" element={<CareersCVBuilder />} />
            <Route path="/careers/ai-cv-builder" element={<Navigate to="/careers/cv-builder" replace />} />
            <Route path="/careers/jobs" element={<CareersJobs />} />
            <Route path="/careers/explore-jobs" element={<Navigate to="/careers/jobs" replace />} />
            <Route path="/careers/employers" element={<CareersEmployers />} />
            <Route path="/careers/connect-employers" element={<Navigate to="/careers/employers" replace />} />
            <Route path="/careers/talent-match" element={<Navigate to="/careers/employers" replace />} />
            <Route path="/careers/talent-network" element={<Navigate to="/careers/employers" replace />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/service-areas/:stateSlug" element={<ServiceAreaDetail />} />
            <Route path="/locations" element={<Navigate to="/service-areas" replace />} />
            <Route path="/locations/:stateSlug" element={<Navigate to="/service-areas/:stateSlug" replace />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/industries/:industrySlug" element={<IndustryDetail />} />
            <Route path="/service-industries" element={<Navigate to="/industries" replace />} />
            <Route path="/service-industries/:industrySlug" element={<Navigate to="/industries/:industrySlug" replace />} />
            <Route path="/sectors" element={<Navigate to="/industries" replace />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}






