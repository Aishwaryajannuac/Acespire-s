import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

import HomePage        from './Home';
import AboutUs         from './AboutUs';
import ProductsPage    from './Products';
import HireOn          from './Products/HireOn';
import DigiMark        from './Products/DigiMark';
import NexLead         from './Products/NexLead';
import CaseStudiesPage from './CaseStudies';
import CaseStudyDetail from './CaseStudies/caseStudyDetail';
import BlogPage        from './BlogPage';
import BlogDetail      from './BlogPage/BlogDetail';
import CareerMainPage  from './CareerMainPage';
import CareerDetail   from './CareerMainPage/CareerDetail';
import ContactUs       from './ContactUs';

import SupplyChain           from './Services/SupplyChain';
import DataIntegration       from './Services/DataIntegration';
import CloudTech             from './Services/CloudTech';
import DigitalTransformation from './Services/DigitalTransformation';
import Automation            from './Services/Automation';
import InvoiceAgent   from './Products/InvoiceAgent';
import MeetingManager from './Products/MeetingManager';
import ServiceTemplate from './Services/ServiceTemplate';
import { ContactModalProvider } from './context/ContactModalContext';



function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
       <ScrollToTop />  
       <ContactModalProvider> 
        <Navbar />


        <Routes>
          <Route path="/"                          element={<HomePage />} />
          <Route path="/about"                     element={<AboutUs />} />
          <Route path="/products"                  element={<ProductsPage />} />
          <Route path="/products/hireon"           element={<HireOn />} />
          <Route path="/products/digimark"         element={<DigiMark />} />
          <Route path="/products/nextlead"         element={<NexLead />} />
          <Route path="/products/invoice-processing-agent" element={<InvoiceAgent />} />
          <Route path="/products/meeting-manager"           element={<MeetingManager />} />
          <Route path="/case-studies"              element={<CaseStudiesPage />} />
          <Route path="/case-studies/:slug"        element={<CaseStudyDetail />} />
          <Route path="/blogs"                     element={<BlogPage />} />
          <Route path="/blogs/:slug"               element={<BlogDetail />} />
          <Route path="/careers"                   element={<CareerMainPage />} />
          <Route path="/careers/:role"             element={<CareerDetail />} />
          <Route path="/contact"                   element={<ContactUs />} />
          {/* <Route path="/services/supply-chain"          element={<SupplyChain />} />
          <Route path="/services/data-integration"      element={<DataIntegration />} />
          <Route path="/services/cloud-tech"            element={<CloudTech />} />
          <Route path="/services/digital-transformation" element={<DigitalTransformation />} />
          <Route path="/services/automation"            element={<Automation />} /> */}
          <Route path="/services/:serviceId" element={<ServiceTemplate />} />
          <Route path="*"                          element={<HomePage />} />
        </Routes>
            </ContactModalProvider>  
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;