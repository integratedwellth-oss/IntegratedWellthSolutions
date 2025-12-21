import React, { useState, useEffect } from 'react';

// --- 1. EXISTING COMPONENTS (Based on your file list) ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingCTA from './components/FloatingCTA';

// Core Sections
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

// Detail Views
import WhoWeHelp from './components/WhoWeHelp';
import Team from './Team'; 
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';

// Audience Solutions
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

// --- 2. HOME VIEW (Built here because we deleted Home.tsx) ---
const HomeView = ({ onOpenAssessment }: { onOpenAssessment: () => void }) => (
  <div className="animate-fadeIn">
    <div id="home"><Hero /></div>
    <TrustedBy />
    <Philosophy />
    <EventHighlight />
    <Services />
    <Audience />
    
    <FinancialHealthScore />
    
    <Testimonials />
    <Gallery />
    <Contact />
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      // Modal trigger
      if (hash === 'assessment') {
        setShowAssessmentModal(true);
      }

      // Views that replace the whole page
      const validViews = [
        'home', 'services', 'who-we-help', 'team', 'blog', 'contact', 
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

  // --- 3. VIEW ROUTING ---
  const renderView = () => {
    switch (currentView) {
      case 'who-we-help': return <WhoWeHelp />;
      case 'team': return <Team />;
      case 'blog': return <BlogPost />;
      case 'privacy': return <PrivacyPolicy />;
      
      // Solutions
      case 'startups': return <StartupSolutions />;
      case 'existing-business': return <BusinessSolutions />;
      case 'npos': return <NPOSolutions />;
      case 'individuals': return <IndividualSolutions />;
      case 'wellness': return <WellnessSolutions />;
      case 'accountability': return <AccountabilityPartnership />;
      
      // Re-use components for pages
      case 'services': return <div className="pt-20"><Services /></div>;
      case 'contact': return <div className="pt-20"><Contact /></div>;

      // Default to Home
      default: return <HomeView onOpenAssessment={() => setShowAssessmentModal(true)} />;
    }
  };

  return (
    <div className={`font-sans text-gray-900 bg-white min-h-screen flex flex-col ${showAssessmentModal ? 'h-screen overflow-hidden' : ''}`}>
      <Navbar onNavigate={(view) => setCurrentView(view)} />

      <main className="flex-grow pt-0">
        {renderView()}
      </main>

      <Footer />
      
      <FinancialHealthScore 
        isModal={true} 
        isOpen={showAssessmentModal} 
        onClose={() => setShowAssessmentModal(false)} 
      />

      <WhatsAppButton />
      <CookieConsent />
      <FloatingCTA />
    </div>
  );
};

export default App;
