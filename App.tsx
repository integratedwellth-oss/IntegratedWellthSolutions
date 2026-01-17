import React, { useState, useEffect, Suspense } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

// Defensive Utilities
import ErrorBoundary from './components/ErrorBoundary';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnifiedSupportWidget from './components/UnifiedSupportWidget';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import EventPopup from './components/EventPopup';
import FloatingCTA from './components/FloatingCTA';

// Pages
import Home from './components/pages/Home';
import ServicesPage from './components/pages/ServicesPage';
import WhoWeHelpPage from './components/pages/WhoWeHelpPage';
import Team from './Team'; 
import WorkshopPage from './components/pages/WorkshopPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';

// Solution Detail Pages
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';
import ComplianceTracker from './components/ComplianceTracker';
import WarRoom from './components/WarRoom';
import StrategicJourney from './components/StrategicJourney';
import FinancialHealthScore from './components/FinancialHealthScore';

// Constants
import { CONTACT_INFO } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    let popupTimer: number | undefined;
    const hasSeenEvent = sessionStorage.getItem('hasSeenIWS_Event_Immediate');
    const isWarRoom = window.location.hash === '#warroom';
    
    if (!hasSeenEvent && !isWarRoom) {
      popupTimer = window.setTimeout(() => setShowEventPopup(true), 800);
    }

    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        
        if (hash === 'assessment') {
          setShowAssessmentModal(true);
          return;
        }

        const validViews = [
          'home', 'services', 'who-we-help', 'team', 'workshops', 'blog', 'contact', 
          'privacy', 'startups', 'existing-business', 'npos', 'individuals', 
          'wellness', 'accountability', 'tracker', 'warroom', 'protocol'
        ];

        // FIXED: 'warroom' removed from scroll logic, now handled as a distinct page
        if (['protocol', 'services'].includes(hash)) {
           setCurrentView('home');
           setTimeout(() => {
             const element = document.getElementById(hash);
             if (element) element.scrollIntoView({ behavior: 'smooth' });
           }, 100);
        } else if (validViews.includes(hash)) {
          setCurrentView(hash);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          setCurrentView('home');
        }
      } catch (e) {
        console.error("Navigation error:", e);
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      if (popupTimer) window.clearTimeout(popupTimer);
    };
  }, []);

  const handleCloseEventPopup = () => {
    setShowEventPopup(false);
    sessionStorage.setItem('hasSeenIWS_Event_Immediate', 'true');
  };

  const renderCurrentView = () => {
    try {
      switch (currentView) {
        case 'services': return <ServicesPage />;
        case 'who-we-help': return <WhoWeHelpPage />;
        case 'team': return <Team />;
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
        case 'tracker': return <ComplianceTracker />;
        case 'warroom': return <WarRoom />; // This is now a dedicated page
        case 'protocol': return <StrategicJourney />;
        default: return <Home onOpenAssessment={() => setShowAssessmentModal(true)} />;
      }
    } catch (err) {
      console.error("View Render Error:", err);
      return <Home onOpenAssessment={() => setShowAssessmentModal(true)} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className={`font-sans text-brand-900 bg-white min-h-screen flex flex-col selection:bg-brand-gold/20 ${(showAssessmentModal || showEventPopup) ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar onNavigate={(view) => { window.location.hash = `#${view}`; }} />
        
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <Loader2 className="animate-spin text-brand-gold" size={48} />
            </div>
          }>
            {renderCurrentView()}
          </Suspense>
        </main>

        {currentView !== 'warroom' && <Footer />}
        
        {currentView !== 'warroom' && (
          <div className="fixed bottom-0 left-0 w-full bg-brand-gold z-[40] px-6 py-4 flex items-center justify-between shadow-[0_-10px_40px_rgba(212,175,55,0.2)] animate-fadeIn">
            <div className="flex items-center gap-4">
              <div className="bg-brand-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest hidden md:block">Upcoming</div>
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
        )}

        <EventPopup isOpen={showEventPopup} onClose={handleCloseEventPopup} />
        <FinancialHealthScore isModal={true} isOpen={showAssessmentModal} onClose={() => setShowAssessmentModal(false)} />
        <FloatingCTA />
        <WhatsAppButton />
        <UnifiedSupportWidget />
        <CookieConsent />
      </div>
    </ErrorBoundary>
  );
};

export default App;
