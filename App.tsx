import React, { useState, useEffect, Suspense } from 'react';
import { ArrowRight, Loader2, Lock, ShieldCheck } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ErrorBoundary from './components/ErrorBoundary';

// Layout & Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnifiedSupportWidget from './components/UnifiedSupportWidget';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import EventPopup from './components/EventPopup';
import FloatingCTA from './components/FloatingCTA';
import FinancialHealthScore from './components/FinancialHealthScore';

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
import SummitPage from './components/pages/SummitPage';

// Firebase Config Check
import { auth } from './firebaseConfig';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isFirebaseDisabled, setIsFirebaseDisabled] = useState(false);

  useEffect(() => {
    // 1. Check if Firebase is actually connected
    const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    if (!apiKey || apiKey === "undefined" || apiKey === "dummy") {
      console.warn("IWS: Firebase Keys Missing. Entering Bypass Mode.");
      setIsFirebaseDisabled(true);
      setIsAuthenticating(false);
    } else {
      // Monitor Auth state
      const unsubscribe = auth.onAuthStateChanged(() => {
        setIsAuthenticating(false);
      });
      return () => unsubscribe();
    }
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'assessment') {
        setShowAssessmentModal(true);
        return;
      }
      
      const validViews = [
        'home', 'services', 'who-we-help', 'team', 'workshops', 'blog', 'contact',
        'privacy', 'startups', 'existing-business', 'npos', 'individuals',
        'wellness', 'accountability', 'my-intel', 'summit'
      ];

      if (validViews.includes(hash)) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Run on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'my-intel': return <UserDashboard onTriggerAssessment={() => setShowAssessmentModal(true)} />;
      case 'summit': return <SummitPage />;
      case 'services': return <ServicesPage />;
      case 'who-we-help': return <WhoWeHelpPage />;
      case 'team': return <Team />;
      case 'workshops': return <WorkshopPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPolicy />;
      default: return <Home onOpenAssessment={() => setShowAssessmentModal(true)} />;
    }
  };

  // --- THE AUTH WALL BYPASS ---
  // If we are on 'my-intel' or 'assessment' and Firebase is broken, we let them through.
  if (isAuthenticating && !isFirebaseDisabled) {
    return (
      <div className="min-h-screen bg-brand-900 flex items-center justify-center p-6 text-center">
        <div className="max-w-sm w-full bg-white rounded-[2.5rem] p-12 shadow-2xl animate-fadeIn">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-900">
             <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-brand-900 uppercase tracking-tighter mb-2">Protocol Sync</h2>
          <p className="text-gray-500 text-sm mb-8 font-medium italic">Verifying security clearances...</p>
          <div className="flex justify-center">
            <Loader2 className="animate-spin text-brand-gold" size={32} />
          </div>
        </div>
      </div>
    );
  }

  const isFullPageMode = ['summit', 'my-intel'].includes(currentView);

  return (
    <ErrorBoundary>
      <div className={`font-sans text-brand-900 bg-white min-h-screen flex flex-col ${(showAssessmentModal || showEventPopup) ? 'h-screen overflow-hidden' : ''}`}>
        
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
        
        {/* Components triggered by state */}
        <EventPopup isOpen={showEventPopup} onClose={() => setShowEventPopup(false)} />
        
        <FinancialHealthScore 
          isOpen={showAssessmentModal} 
          onClose={() => {
            setShowAssessmentModal(false);
            if(window.location.hash === '#assessment') window.location.hash = '#home';
          }} 
        />

        <FloatingCTA />
        <WhatsAppButton />
        <UnifiedSupportWidget />
        <CookieConsent />

        {/* Offline Badge */}
        {isFirebaseDisabled && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-brand-gold text-brand-900 px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg flex items-center gap-2 border border-brand-900/10">
            <ShieldCheck size={10} /> Limited Connection Mode
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
