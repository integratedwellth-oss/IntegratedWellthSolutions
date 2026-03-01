import React, { useState, useEffect, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ErrorBoundary from './components/ErrorBoundary';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnifiedSupportWidget from './components/UnifiedSupportWidget';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import EventPopup from './components/EventPopup';
import FloatingCTA from './components/FloatingCTA';
import FinancialHealthScore from './components/FinancialHealthScore';

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

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessment, setShowAssessment] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'assessment') {
        setShowAssessment(true);
      } else if (['my-intel', 'home', 'services', 'team', 'workshops', 'blog', 'contact', 'privacy', 'summit'].includes(hash)) {
        setCurrentView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const triggerAssessment = () => setShowAssessment(true);

  const renderView = () => {
    switch (currentView) {
      case 'my-intel': return <UserDashboard onTriggerAssessment={triggerAssessment} />;
      case 'services': return <ServicesPage />;
      case 'who-we-help': return <WhoWeHelpPage />;
      case 'team': return <Team />;
      case 'workshops': return <WorkshopPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      case 'privacy': return <PrivacyPolicy />;
      case 'summit': return <SummitPage />;
      default: return <Home onOpenAssessment={triggerAssessment} />;
    }
  };

  const isFullPage = ['summit', 'my-intel'].includes(currentView);

  return (
    <ErrorBoundary>
      <div className={`min-h-screen flex flex-col ${showAssessment ? 'h-screen overflow-hidden' : ''}`}>
        {!isFullPage && <Navbar onNavigate={(v) => { window.location.hash = `#${v}`; }} />}
        
        <main className="flex-grow">
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white">
              <Loader2 className="animate-spin text-brand-gold" size={48} />
            </div>
          }>
            {renderView()}
          </Suspense>
        </main>

        {!isFullPage && <Footer />}
        
        <EventPopup isOpen={showEventPopup} onClose={() => setShowEventPopup(false)} />
        
        {/* Assessment Logic */}
        <FinancialHealthScore 
          isOpen={showAssessment} 
          onClose={() => {
            setShowAssessment(false);
            if (window.location.hash === '#assessment') window.location.hash = `#${currentView}`;
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
