/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { Contact } from "./pages/Contact";
import { Portfolio } from "./pages/Portfolio";
import { About } from "./pages/About";
import { Training } from "./pages/Training";
import { Insights } from "./pages/Insights";

// Placeholder components for other pages
function Placeholder({ title }: { title: string }) {
  return (
    <div className="pt-32 pb-24 min-h-[70vh] container mx-auto px-6">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-white/60">This section is currently being built.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/training" element={<Training />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}






