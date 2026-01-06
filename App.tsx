import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import FloatingCTA from './components/FloatingCTA';
import EventPopup from './components/EventPopup'; // NEW IMPORT

// --- Page Sections ---
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
import WhoWeHelp from './components/WhoWeHelp';

// --- Full Pages & Solutions ---
import Team from './Team';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

const MainView = () => {
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    // 1. Timer for the Financial Health Assessment (3 seconds)
    const healthTimer = setTimeout(() => {
      if (!sessionStorage.getItem('hasSeenAssessment')) {
        setShowHealthModal(true);
        sessionStorage.setItem('hasSeenAssessment', 'true');
      }
    }, 3000);

    // 2. Timer for the NEW Event Popup (6 seconds - staggered so they don't overlap)
    const eventTimer = setTimeout(() => {
      if (!sessionStorage.getItem('hasSeenEventPopup')) {
        setShowEventPopup(true);
        sessionStorage.setItem('hasSeenEventPopup', 'true');
      }
    }, 6000);

    return () => {
      clearTimeout(healthTimer);
      clearTimeout(eventTimer);
    };
  }, []);

  return (
    <div className="animate-fadeIn">
      <div id="home"><Hero /></div>
      <TrustedBy />
      <WhoWeHelp /> 
      <Philosophy /> 

      {/* Syncing ID with Navbar link #upcoming-event */}
      <div id="upcoming-event">
        <EventHighlight />
      </div>

      <Services /> 
      <Audience />
      <FinancialHealthScore />
      <Testimonials />
      <Gallery />
      <Contact /> 

      {/* MODALS */}
      <FinancialHealthScore 
        isModal={true} 
        isOpen={showHealthModal} 
        onClose={() => setShowHealthModal(false)} 
      />

      <EventPopup 
        isOpen={showEventPopup} 
        onClose={() => setShowEventPopup(false)} 
      />
    </div>
  );
};

// Scroll Helper
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);
  return null;
};

const App: React.FC = () => {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar onNavigate={() => {}} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/home" element={<MainView />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
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
