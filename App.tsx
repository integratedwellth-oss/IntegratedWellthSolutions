import React, { useState, useEffect, Suspense } from 'react';
import { ArrowRight, Loader2, X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import EventPopup from './components/EventPopup';

const Home = React.lazy(() => import('./components/pages/Home'));
const LandingPage = React.lazy(() => import('./components/pages/LandingPage'));
const ServicesPage = React.lazy(() => import('./components/pages/ServicesPage'));
const WhoWeHelpPage = React.lazy(() => import('./components/pages/WhoWeHelpPage'));
const Team = React.lazy(() => import('./components/pages/TeamPage'));
const WorkshopPage = React.lazy(() => import('./components/pages/WorkshopPage'));
const BlogPage = React.lazy(() => import('./components/pages/BlogPage'));
const ContactPage = React.lazy(() => import('./components/pages/ContactPage'));
const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const UserDashboard = React.lazy(() => import('./components/UserDashboard'));
const ComplianceCalendarPage = React.lazy(() => import('./components/pages/ComplianceCalendarPage'));

const StartupSolutions = React.lazy(() => import('./components/audiences/StartupSolutions'));
const BusinessSolutions = React.lazy(() => import('./components/audiences/BusinessSolutions'));
const NPOSolutions = React.lazy(() => import('./components/audiences/NPOSolutions'));
const IndividualSolutions = React.lazy(() => import('./components/audiences/IndividualSolutions'));
const WellnessSolutions = React.lazy(() => import('./components/audiences/WellnessSolutions'));
const AccountabilityPartnership = React.lazy(() => import('./components/audiences/AccountabilityPartnership'));
const ComplianceTracker = React.lazy(() => import('./components/ComplianceTracker'));
const WarRoom = React.lazy(() => import('./components/WarRoom'));
const StrategicJourney = React.lazy(() => import('./components/StrategicJourney'));
const FinancialHealthScore = React.lazy(() => import('./components/FinancialHealthScore'));
const UnifiedSupportWidget = React.lazy(() => import('./components/UnifiedSupportWidget'));

// SURGICAL FIX: Import the Flyer component
const WorkshopFlyer = React.lazy(() => import('./components/WorkshopFlyer'));

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [hideAlertBar, setHideAlertBar] = useState(false);

  useEffect(() => {
    let popupTimer: number | undefined;
    const hasSeenEvent = localStorage.getItem('iws_popup_seen');
    const dismissedAlert = localStorage.getItem('iws_alert_dismissed') === 'true';
    
    // SURGICAL FIX: Added '#poster' to special pages to prevent popups covering it
    const isSpecialPage = ['#warroom', '#intel', '#my-intel', '#landing', '#compliance-calendar', '#poster'].includes(window.location.hash);
    
    setHideAlertBar(dismissedAlert);

    if (!hasSeenEvent && !isSpecialPage) {
      popupTimer = window.setTimeout(() => setShowEventPopup(true), 8000);
    }

    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '') || 'home';
        if (hash === 'assessment') {
          setShowAssessmentModal(true);
          return;
        }

        // SURGICAL FIX: Added 'poster' to valid views so it doesn't redirect to Home
        const validViews = ['home', 'landing', 'services', 'who-we-help', 'team', 'workshops', 'blog', 
        'contact', 'privacy', 'startups', 'existing-business', 'npos', 'individuals', 'wellness', 'accountability', 
        'tracker', 'warroom', 'protocol', 'intel', 'my-intel', 'compliance-calendar', 'roadmap', 'gallery', 'poster'];

        if (['protocol', 'roadmap', 'gallery'].includes(hash)) {
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

  const dismissAlertBar = () => {
    setHideAlertBar(true);
    localStorage.setItem('iws_alert_dismissed', 'true');
  };

  const renderCurrentView = () => {
    try {
      switch (currentView) {
        // SURGICAL FIX: Mount the Flyer Component
        case 'poster': return <WorkshopFlyer />; 
        case 'landing': return <LandingPage onOpenAssessment={() => setShowAssessmentModal(true)} />;
        case 'my-intel': return <UserDashboard onTriggerAssessment={() => setShowAssessmentModal(true)} />;
        case 'compliance-calendar': return <ComplianceCalendarPage />;
        case 'intel': return <Dashboard />;
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
        case 'warroom': return <WarRoom />;
        case 'protocol': return <StrategicJourney />;
        case 'roadmap': return <StrategicJourney />;
        default: return <Home onOpenAssessment={() => setShowAssessmentModal(true)} />;
      }
    } catch (err) {
      return <Home onOpenAssessment={() => setShowAssessmentModal(true)} />;
    }
  };

  // SURGICAL FIX: Hide Navbar, Footer, and Floating widgets on the poster page
  const isFullPageMode = ['warroom', 'intel', 'my-intel', 'poster'].includes(currentView);
  const shouldHideNavbar = ['intel', 'my-intel', 'landing', 'poster'].includes(currentView);
  const shouldHideFloatingBar = isFullPageMode || currentView === 'landing' || currentView === 'compliance-calendar' || hideAlertBar;

  return (
    <ErrorBoundary>
      <div className={`font-sans text-brand-900 bg-white min-h-screen flex flex-col selection:bg-brand-gold/20 ${(showAssessmentModal || showEventPopup) ? 'h-screen overflow-hidden' : ''}`}>
        
        {!shouldHideNavbar && (
          <Navbar onNavigate={(view) => { window.location.hash = `#${view}`; }} />
        )}

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

        {!shouldHideFloatingBar && (
          <div className="fixed bottom-0 left-0 w-full bg-brand-gold z-[40] px-4 md:px-6 py-3 flex items-center justify-between shadow-[0_-10px_40px_rgba(212,175,55,0.2)]">
            <div className="flex items-center gap-3">
              <div className="bg-brand-900 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest hidden md:block">Compliance Alert</div>
              <p className="text-brand-900 font-bold text-xs md:text-sm tracking-tight truncate max-w-[200px] md:max-w-none">
                2026 Deadlines active.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <a 
                href="#compliance-calendar"
                className="flex items-center gap-2 text-brand-900 font-black uppercase tracking-widest text-[10px] md:text-xs hover:translate-x-1 transition-transform"
              >
                Schedule <ArrowRight size={14} className="hidden sm:block" />
              </a>
              <button onClick={dismissAlertBar} className="p-1 text-brand-900/60 hover:text-brand-900">
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Hide widgets if on poster view */}
        {currentView !== 'intel' && currentView !== 'poster' && (
          <>
            <EventPopup 
              isOpen={showEventPopup} 
              onClose={() => {
                setShowEventPopup(false);
                localStorage.setItem('iws_popup_seen', 'true');
              }} 
            />
            <Suspense fallback={null}>
              <FinancialHealthScore 
                isOpen={showAssessmentModal} 
                onClose={() => {
                  setShowAssessmentModal(false);
                  if(window.location.hash === '#assessment') {
                    window.history.pushState("", document.title, window.location.pathname + window.location.search);
                  }
                }} 
              />
              <UnifiedSupportWidget />
            </Suspense>
          </>
        )}
        
        {currentView !== 'poster' && <CookieConsent />}
      </div>
    </ErrorBoundary>
  );
};

export default App;
