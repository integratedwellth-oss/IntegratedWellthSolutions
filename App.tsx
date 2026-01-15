import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

// Layout (inside components/)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';

// Root level files
import Team from './Team';

// Pages (inside components/pages/)
import Home from './components/pages/Home';
import WorkshopPage from './components/pages/WorkshopPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';

// Audiences (inside components/audiences/)
import StartupSolutions from './components/audiences/StartupSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentView(hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case 'team': return <Team />;
      case 'workshops': return <WorkshopPage />;
      case 'blog': return <BlogPage />;
      case 'contact': return <ContactPage />;
      case 'startups': return <StartupSolutions />;
      case 'npos': return <NPOSolutions />;
      default: return <Home onOpenAssessment={() => {}} />;
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
