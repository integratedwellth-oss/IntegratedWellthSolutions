import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import FloatingCTA from './components/FloatingCTA';
import EventPopup from './components/EventPopup'; 

// Page Hubs (Referencing src/components/pages/ per your file tree)
import Home from './components/pages/Home';
import TeamPage from './components/pages/TeamPage';
import ServicesPage from './components/pages/ServicesPage';
import ContactPage from './components/pages/ContactPage';
import WorkshopPage from './components/pages/WorkshopPage';
import WhoWeHelpPage from './components/pages/WhoWeHelpPage';
import BlogPage from './components/pages/BlogPage';
import AdminDashboard from './components/pages/AdminDashboard';
import AssessmentPage from './components/pages/AssessmentPage';
import AssessmentSuccess from './components/pages/AssessmentSuccess';

// Solution Details (Referencing src/components/audiences/)
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const [showEvent, setShowEvent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('hasSeenEvent')) {
        setShowEvent(true);
        sessionStorage.setItem('hasSeenEvent', 'true');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/workshops" element={<WorkshopPage />} />
          <Route path="/who-we-help" element={<WhoWeHelpPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/assessment-success" element={<AssessmentSuccess />} />

          {/* Solution Routes */}
          <Route path="/startups" element={<StartupSolutions />} />
          <Route path="/existing-business" element={<BusinessSolutions />} />
          <Route path="/npos" element={<NPOSolutions />} />
          <Route path="/individuals" element={<IndividualSolutions />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <FloatingCTA />
      <EventPopup isOpen={showEvent} onClose={() => setShowEvent(false)} />
    </div>
  );
};

export default App;
