import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- Layout & Global Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import FloatingCTA from './components/FloatingCTA';
import EventPopup from './components/EventPopup';
import UnifiedSupportWidget from './components/UnifiedSupportWidget';
import { ArrowRight } from 'lucide-react';

// --- Page Shell Components (from your components/pages/ folder) ---
import Home from './components/pages/Home';
import ServicesPage from './components/pages/ServicesPage';
import WhoWeHelpPage from './components/pages/WhoWeHelpPage';
import TeamPage from './components/pages/TeamPage';
import WorkshopPage from './components/pages/WorkshopPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';

// --- Solution Detail Pages ---
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';
import FinancialHealthScore from './components/FinancialHealthScore';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    // 1. Landing Gate Logic: Show Event Popup after 800ms if not seen
    const hasSeenEvent = sessionStorage.getItem('hasSeenIWS_Event_Immediate');
    if (!hasSeenEvent) {
      const timer = setTimeout(() => setShowEventPopup(true), 800);
      return () => clearTimeout(timer);
    }

    // 2. Hash Change Listener for Navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === 'assessment') {
        setShowAssessmentModal(true);
        return;
      }

      const validViews = [
        'home', 'services', 'who-we-help', 'team', 'workshops', 'blog', 'contact', 
        'privacy', 'startups', 'existing-business', 'npos', 'individuals', 
        'wellness', 'accountability'
      ];

      if (validViews.includes(hash)) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCloseEventPopup = () => {
    setShowEventPopup(false);
    sessionStorage.setItem('hasSeenIWS_Event_Immediate', 'true');
  };

  // Switch between the main scrollable home and the dedicated page files
  const renderCurrentView = () => {
    switch (currentView) {
      case 'services': return <ServicesPage />;
      case 'who-we-help': return <WhoWeHelpPage />;
      case 'team': return <TeamPage />;
      case 'workshops': return <WorkshopPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPolicy />;
      case 'startups': return <StartupSolutions />;
      case 'existing-business': return <BusinessSolutions />;
      case 'npos': return <NPOSolutions />;
      case 'individuals': return <IndividualSolutions />;
      case 'wellness': return <WellnessSolutions />;
      case 'accountability': return <AccountabilityPartnership />;
      default: return <Home onOpenAssessment={() => setShowAssessmentModal(true)} />;
    }
  };

  return (
    <div className={`font-sans text-brand-900 bg-white min-h-screen flex flex-col selection:bg-brand-gold/20 ${(showAssessmentModal || showEventPopup) ? 'h-screen overflow-hidden' : ''}`}>
      
      {/* Navbar with logic to update the currentView state */}
      <Navbar onNavigate={(view) => setCurrentView(view)} />

      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      <Footer />
      
      {/* Sticky Bottom Workshop Banner */}
      <div className="fixed bottom-0 left-0 w-full bg-brand-gold z-[40] px-6 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(212,175,55,0.2)]">
        <div className="flex items-center gap-4">
          <div className="bg-brand-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest hidden md:block">
            Upcoming
          </div>
          <p className="text-brand-900 font-bold text-sm md:text-base tracking-tight">
            Financial Clarity Workshop - <span className="font-black">Feb 28, 2026</span>
          </p>
        </div>
        <button 
          onClick={() => window.open('https://www.quicket.co.za/events/352598-financial-clarity-for-non-financial-business-owners/#/', '_blank')}
          className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-[10px] md:text-xs hover:translate-x-1 transition-transform"
        >
          Register Now <ArrowRight size={16} />
        </button>
      </div>

      {/* Global Modals & Widgets */}
      <EventPopup isOpen={showEventPopup} onClose={handleCloseEventPopup} />

      <FinancialHealthScore 
        isModal={true} 
        isOpen={showAssessmentModal} 
        onClose={() => {
          setShowAssessmentModal(false);
          if (window.location.hash === '#assessment') {
             history.replaceState(null, "", " ");
          }
        }} 
      />

      <FloatingCTA />
      <WhatsAppButton />
      <UnifiedSupportWidget />
      <CookieConsent />
    </div>
  );
};

export default App;
