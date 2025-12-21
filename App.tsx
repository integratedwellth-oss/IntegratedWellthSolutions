import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- 1. Layout Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import FloatingCTA from './components/FloatingCTA';

// --- 2. Page Sections (For Home) ---
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
import AdminDashboard from './components/AdminDashboard';

// --- 4. Audience Solutions ---
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

// --- 5. Home Page View ---
const Home = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Auto-open assessment for new visitors
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
      <Hero />
      <TrustedBy />
      <Philosophy />
      <EventHighlight />
      <Services />
      <Audience />
      <FinancialHealthScore />
      <Testimonials />
      <Gallery />
      <Contact />
      
      <FinancialHealthScore isModal={true} isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

// --- 6. Scroll Helper (Scrolls to top on page change) ---
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
      {/* Passing an empty function to Navbar since we use real routing now */}
      <Navbar onNavigate={() => {}} />

      <main className="flex-grow">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* Solution Pages */}
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
