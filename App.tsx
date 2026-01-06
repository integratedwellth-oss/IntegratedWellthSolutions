import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// --- Components ---
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';
import FloatingCTA from './components/FloatingCTA';
import EventPopup from './components/EventPopup'; 

// --- Sections ---
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import EventHighlight from './components/EventHighlight';
import Services from './components/Services';
import Contact from './components/Contact';
import WhoWeHelp from './components/WhoWeHelp';

// --- Solutions ---
import Team from './Team';
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

const MainView = () => {
  const [showEvent, setShowEvent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('hasSeenEvent')) {
        setShowEvent(true);
        sessionStorage.setItem('hasSeenEvent', 'true');
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="animate-fadeIn">
      <div id="home"><Hero /></div>
      
      {/* Navbar Link: #who-we-help */}
      <WhoWeHelp /> 

      {/* Navbar Link: #philosophy */}
      <Philosophy /> 

      {/* Navbar Link: #upcoming-event */}
      <div id="upcoming-event">
        <EventHighlight />
      </div>

      {/* Navbar Link: #services */}
      <Services /> 

      {/* Navbar Link: #contact */}
      <Contact /> 

      <EventPopup isOpen={showEvent} onClose={() => setShowEvent(false)} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex flex-col">
      <Navbar onNavigate={() => {}} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/team" element={<Team />} />
          <Route path="/startups" element={<StartupSolutions />} />
          <Route path="/existing-business" element={<BusinessSolutions />} />
          <Route path="/npos" element={<NPOSolutions />} />
          <Route path="/individuals" element={<IndividualSolutions />} />
          <Route path="/wellness" element={<WellnessSolutions />} />
          <Route path="/accountability" element={<AccountabilityPartnership />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <FloatingCTA />
    </div>
  );
};

export default App;
