import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustedBy from './components/TrustedBy';
import EventHighlight from './components/EventHighlight';
import Philosophy from './components/Philosophy';
import Services from './components/Services';
import Audience from './components/Audience';
import FinancialHealthScore from './components/FinancialHealthScore';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import BlogPost from './components/BlogPost';
import PrivacyPolicy from './components/PrivacyPolicy';
import CookieConsent from './components/CookieConsent';
import WhoWeHelp from './components/WhoWeHelp';
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';

// NEW PAGE IMPORTS
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';
import Team from './Team';
import AdminDashboard from './components/AdminDashboard';
import FloatingCTA from './components/FloatingCTA';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      if (hash === 'assessment') {
        setShowAssessmentModal(true);
      }

      if (['blog', 'privacy', 'who-we-help', 'startups', 'existing-business', 'npos', 'individuals', 'wellness', 'accountability', 'admin', 'team'].includes(hash)) {
        setCurrentView(hash);
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
        if (hash && hash !== 'home' && hash !== 'assessment') {
           setTimeout(() => {
               const el = document.getElementById(hash);
               if (el) el.scrollIntoView({ behavior: 'smooth' });
           }, 100);
        } else if (!hash) {
            window.scrollTo(0, 0);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (currentView === 'home' && (!hash || hash === '#assessment') && currentView !== 'admin') {
        const timer = setTimeout(() => {
           setShowAssessmentModal(true);
        }, 1000); 
        return () => clearTimeout(timer);
    }
  }, [currentView]);

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className={`font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col ${showAssessmentModal ? 'overflow-hidden' : ''}`}>
      <Navbar onNavigate={(view) => setCurrentView(view)} />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <div id="home"><Hero /></div>
            <TrustedBy />
            <Philosophy />
            <EventHighlight />
            <Services />
            <Audience />
            
            <FinancialHealthScore />
            
            <FinancialHealthScore 
              isModal={true} 
              isOpen={showAssessmentModal} 
              onClose={() => setShowAssessmentModal(false)} 
            />

            <Testimonials />
            <Gallery />
            <Contact />
          </>
        )}

        {currentView === 'team' && <Team />}
        {currentView === 'who-we-help' && <WhoWeHelp />}
        {currentView === 'startups' && <StartupSolutions />}
        {currentView === 'existing-business' && <BusinessSolutions />}
        {currentView === 'npos' && <NPOSolutions />}
        {currentView === 'individuals' && <IndividualSolutions />}
        {currentView === 'wellness' && <WellnessSolutions />}
        {currentView === 'accountability' && <AccountabilityPartnership />}
        {currentView === 'blog' && <BlogPost />}
        {currentView === 'privacy' && <PrivacyPolicy />}
      </main>

      <Footer />
      
      <WhatsAppButton />
      <CookieConsent />
      <FloatingCTA />
    </div>
  );
};

export default App;
