import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- 1. Layout Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import FloatingCTA from './components/FloatingCTA';

// --- 2. Page Sections ---
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import Philosophy from './components/Philosophy';
import EventHighlight from './components/EventHighlight';
import Services from './components/Services';
import Audience from './components/Audience';
import FinancialHealthScore from './components/FinancialHealthScore';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

// --- 3. Full Pages ---
import Team from './Team';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';
import WhoWeHelp from './components/WhoWeHelp';

// --- 4. Audience Solutions ---
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

// --- 5. The Main Page (Scrollable) ---
const MainView = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem('hasSeenAssessment');
      if (!hasSeen) {
        setShowModal(true);
        sessionStorage.setItem('hasSeenAssessment', 'true');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fadeIn">
      {/* Sections with IDs so links can scroll to them */}
      <div id="home"><Hero /></div>
      <TrustedBy />
      <div id="philosophy"><Philosophy /></div>
      <div id="workshops"><EventHighlight /></div>
      <div id="services"><Services /></div>
      <Audience />
      <FinancialHealthScore />
      <Testimonials />
      <Gallery />
      <Contact />
      
      <FinancialHealthScore isModal={true} isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

// --- 6. Scroll Helper ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- 7. Main App Structure ---
const App: React.FC = () => {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Empty function to prevent crashes */}
      <Navbar onNavigate={() => {}} />

      <main className="flex-grow">
        <Routes>
          {/* Default Route: Shows the Scrollable Home Page */}
          <Route path="/" element={<MainView />} />
          
          {/* If the Navbar sends you to /services, we show the Main View 
              (The user will scroll to the section manually or via anchor links) */}
          <Route path="/services" element={<MainView />} />
          <Route path="/home" element={<MainView />} />
          
          {/* Specific Standalone Pages */}
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
          
          {/* Audiences */}
          <Route path="/startups" element={<StartupSolutions />} />
          <Route path="/existing-business" element={<BusinessSolutions />} />
          <Route path="/npos" element={<NPOSolutions />} />
          <Route path="/individuals" element={<IndividualSolutions />} />
          <Route path="/wellness" element={<WellnessSolutions />} />
          <Route path="/accountability" element={<AccountabilityPartnership />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <FloatingCTA />
    </div>
  );
};

export default App;
