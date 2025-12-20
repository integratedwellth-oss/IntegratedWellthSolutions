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
import ChatWidget from './components/ChatWidget';
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

// 🔥 IMPORT THE NEW ACCOUNTABILITY PAGE
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

// ⭐ CORRECTED IMPORT: No curly braces. This matches 'export default Team'
import Team from './Team';

// Import the Admin Dashboard
import AdminDashboard from './components/AdminDashboard';

// 🎈 IMPORT THE NEW FLOATING BUBBLE
import FloatingCTA from './components/FloatingCTA';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      // Explicitly check for assessment hash to trigger modal
      if (hash === 'assessment') {
        setShowAssessmentModal(true);
      }

      // Check for valid views
      if (['blog', 'privacy', 'who-we-help', 'startups', 'existing-business', 'npos', 'individuals', 'wellness', 'accountability', 'admin', 'team'].includes(hash)) {
        setCurrentView(hash);
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
        // If it's a section hash, scroll to it after rendering home
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

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Trigger modal on first load automatically
  useEffect(() => {
    // If user comes to homepage (no hash) or specifically to assessment
    const hash = window.location.hash;
    
    // Do NOT trigger the popup if we are on secondary pages
    if (currentView === 'home' && (!hash || hash === '#assessment') && currentView !== 'admin') {
        const timer = setTimeout(() => {
           setShowAssessmentModal(true);
        }, 1000); 
        return () => clearTimeout(timer);
    }
  }, [currentView]);

  // Secret Admin Door
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
            
            {/* On-page section version */}
            <FinancialHealthScore />
            
            {/* Popup modal version */}
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

        {/* Render the Team page */}
        {currentView === 'team' && <Team />}

        {currentView === 'who-we-help' && <WhoWeHelp />}
        {currentView === 'startups' && <StartupSolutions />}
        {currentView === 'existing-business' && <BusinessSolutions />}
        {currentView === 'npos' && <NPOSolutions />}
        {currentView === 'individuals' && <IndividualSolutions />}
        {currentView === 'wellness' && <WellnessSolutions />}
        
        {/* Render Accountability Page */}
        {currentView === 'accountability' && <AccountabilityPartnership />}
        
        {currentView === 'blog' && <BlogPost />}
        {currentView === 'privacy' && <PrivacyPolicy />}
      </main>

      <Footer />
      
      {/* Interactive Elements */}
      <ChatWidget currentView={currentView} />
      <WhatsAppButton />
      <CookieConsent />
      
      {/* The New Sticky Bubble */}
      <FloatingCTA />
    </div>
  );
};

export default App;
