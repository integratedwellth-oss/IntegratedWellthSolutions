import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Core Components
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

// Audience Solutions
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

// Pages & UI
import Team from './Team';
import AdminDashboard from './components/AdminDashboard';
import FloatingCTA from './components/FloatingCTA';

// Helper component to manage the Assessment Modal logic
const ScrollToTopAndModal = ({ setModal }: { setModal: (val: boolean) => void }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (hash === '#assessment') {
      setModal(true);
    }
  }, [pathname, hash, setModal]);

  return null;
};

const App: React.FC = () => {
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);

  return (
    // 🔥 THE FIX: basename tells React it lives in the subfolder
    <BrowserRouter basename="/IntegratedWellthSolutions">
      <ScrollToTopAndModal setModal={setShowAssessmentModal} />
      
      <div className={`font-sans text-gray-900 bg-gray-50 min-h-screen flex flex-col ${showAssessmentModal ? 'overflow-hidden' : ''}`}>
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Home Page Route */}
            <Route path="/" element={
              <>
                <div id="home"><Hero /></div>
                <TrustedBy />
                <Philosophy />
                <EventHighlight />
                <Services />
                <Audience />
                <FinancialHealthScore 
                  isModal={true} 
                  isOpen={showAssessmentModal} 
                  onClose={() => setShowAssessmentModal(false)} 
                />
                <Testimonials />
                <Gallery />
                <Contact />
              </>
            } />

            {/* Sub-Pages */}
            <Route path="/team" element={<Team />} />
            <Route path="/who-we-help" element={<WhoWeHelp />} />
            <Route path="/startups" element={<StartupSolutions />} />
            <Route path="/existing-business" element={<BusinessSolutions />} />
            <Route path="/npos" element={<NPOSolutions />} />
            <Route path="/individuals" element={<IndividualSolutions />} />
            <Route path="/wellness" element={<WellnessSolutions />} />
            <Route path="/accountability" element={<AccountabilityPartnership />} />
            <Route path="/blog" element={<BlogPost />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppButton />
        <CookieConsent />
        <FloatingCTA />
      </div>
    </BrowserRouter>
  );
};

export default App;
