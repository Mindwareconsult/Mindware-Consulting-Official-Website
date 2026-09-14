/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";

// Lazy load pages for better performance
const Services = lazy(() => import("./pages/Services").then(module => ({ default: module.Services })));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail").then(module => ({ default: module.ServiceDetail })));
const Contact = lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));
const Portfolio = lazy(() => import("./pages/Portfolio").then(module => ({ default: module.Portfolio })));
const About = lazy(() => import("./pages/About").then(module => ({ default: module.About })));
const Training = lazy(() => import("./pages/Training").then(module => ({ default: module.Training })));
const Insights = lazy(() => import("./pages/Insights").then(module => ({ default: module.Insights })));
const InsightDetail = lazy(() => import("./pages/InsightDetail").then(module => ({ default: module.InsightDetail })));

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
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/training" element={<Training />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/insights/:id" element={<InsightDetail />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
      <Analytics />
    </BrowserRouter>
  );
}






