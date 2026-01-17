import React, { useState, useEffect } from 'react';
// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';

// Pages
import Team from './Team';
import Home from './components/pages/Home';
import WorkshopPage from './components/pages/WorkshopPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import WhoWeHelpPage from './components/pages/WhoWeHelpPage'; // Added this

// Audiences
import StartupSolutions from './components/audiences/StartupSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      
      // If the link is a section on the home page (protocol, services), we keep the view as 'home'
      // but let the browser handle the scroll.
      if (['protocol', 'services', 'warroom'].includes(hash)) {
        setCurrentView('home');
        // Small delay to allow Home to render before scrolling
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        // For actual separate pages, we switch the view and scroll to top
        setCurrentView(hash);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHash);
    // Trigger once on load
    handleHash();

    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'team': return <Team />;
      case 'workshops': return <WorkshopPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      case 'who-we-help': return <WhoWeHelpPage />; // Fixed: This page was missing!
      
      // Audience Specific Pages
      case 'startups': return <StartupSolutions />;
      case 'npos': return <NPOSolutions />;
      case 'existing-business': return <BusinessSolutions />;
      case 'individuals': return <IndividualSolutions />;
      case 'wellness': return <WellnessSolutions />;
      case 'accountability': return <AccountabilityPartnership />;
      
      default: return <Home onOpenAssessment={() => window.location.hash = '#warroom'} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentView} />
      <main className="flex-grow">{renderView()}</main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
    </div>
  );
};

export default App;
