import React, { useState, useEffect, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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
import UserDashboard from './components/UserDashboard';

// Components
import FinancialHealthScore from './components/FinancialHealthScore';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    let popupTimer: number | undefined;
    const hasSeenEvent = sessionStorage.getItem('hasSeenIWS_Event_Immediate');
    const isSpecialPage = window.location.hash === '#my-intel';
    
    if (!hasSeenEvent && !isSpecialPage) {
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
          'privacy', 'my-intel', 'protocol'
        ];

        if (['protocol', 'services-anchor'].includes(hash)) {
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

  const openAssessment = () => setShowAssessmentModal(true);

  const renderCurrentView = () => {
    try {
      switch (currentView) {
        case 'my-intel': 
          return <UserDashboard onTriggerAssessment={openAssessment} />;
        case 'services': 
          return <ServicesPage />;
        case 'who-we-help': 
          return <WhoWeHelpPage />;
        case 'team': 
          return <Team />;
        case 'workshops': 
          return <WorkshopPage />;
        case 'blog': 
          return <BlogPage />;
        case 'contact': 
          return <ContactPage />;
        case 'privacy': 
          return <PrivacyPolicy />;
        default: 
          return <Home onOpenAssessment={openAssessment} />;
      }
    } catch (err) {
      return <Home onOpenAssessment={openAssessment} />;
    }
  };

  const isFullPageMode = currentView === 'my-intel';

  return (
    <ErrorBoundary>
      <div className={`font-sans text-brand-900 bg-white min-h-screen flex flex-col selection:bg-brand-gold/20 ${(showAssessmentModal || showEventPopup) ? 'h-screen overflow-hidden' : ''}`}>
        
        {!isFullPageMode && <Navbar onNavigate={(view) => { window.location.hash = `#${view}`; }} />}
        
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <Loader2 className="animate-spin text-brand-gold" size={48} />
            </div>
          }>
            {renderCurrentView()}
          </Suspense>
        </main>

        {!isFullPageMode && <Footer />}

        <EventPopup 
          isOpen={showEventPopup} 
          onClose={() => {
            setShowEventPopup(false); 
            sessionStorage.setItem('hasSeenIWS_Event_Immediate', 'true');
          }} 
        />
        
        <FinancialHealthScore
          isOpen={showAssessmentModal}
          onClose={() => {
            setShowAssessmentModal(false);
            if(window.location.hash === '#assessment') window.location.hash = `#${currentView}`;
          }}
        />
        
        <FloatingCTA />
        <WhatsAppButton />
        <UnifiedSupportWidget />
        <CookieConsent />
      </div>
    </ErrorBoundary>
  );
};

export default App;
