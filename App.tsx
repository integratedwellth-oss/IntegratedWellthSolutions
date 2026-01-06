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
import WhoWeHelp from './components/WhoWeHelp'; // Import the missing section
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';

// --- 4. Audience Solutions ---
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/Accountability Partnership';

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
      {/* SYNCED IDs: We removed redundant div wrappers because the 
        components internally already have the correct IDs. 
      */}
      <div id="home"><Hero /></div>
      <TrustedBy />
      
      {/* 1. Added WhoWeHelp (Matches Navbar #who-we-help) */}
      <WhoWeHelp /> 

      {/* 2. Philosophy (Internal ID #philosophy matches Navbar) */}
      <Philosophy /> 

      {/* 3. Workshops (Renamed workshop wrapper to upcoming-event to match Navbar) */}
      <div id="upcoming-event">
        <EventHighlight />
      </div>

      {/* 4. Services (Internal ID #services matches Navbar) */}
      <Services /> 

      <Audience />
      <FinancialHealthScore />
      <Testimonials />
      <Gallery />

      {/* 5. Contact (Internal ID #contact matches Navbar) */}
      <Contact /> 

      <FinancialHealthScore 
        isModal={true} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </div>
  );
};

// --- 6. Scroll Helper ---
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // If there's no hash (like #contact), scroll to top. 
    // If there is a hash, the browser handles it automatically.
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

// --- 7. Main App Structure ---
const App: React.FC = () => {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Navbar onNavigate empty function prevents standard link crashes */}
      <Navbar onNavigate={() => {}} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/home" element={<MainView />} />
          <Route path="/services" element={<MainView />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
          
          {/* Audience Routes */}
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
