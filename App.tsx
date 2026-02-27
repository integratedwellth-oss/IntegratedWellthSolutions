import React, { useState, useEffect, Suspense } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ErrorBoundary from './components/ErrorBoundary';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UnifiedSupportWidget from './components/UnifiedSupportWidget';
import CookieConsent from './components/CookieConsent';
import WhatsAppButton from './components/WhatsAppButton';
import EventPopup from './components/EventPopup';
import FloatingCTA from './components/FloatingCTA';

// Pages
import Home from './components/pages/Home';
import ServicesPage from './components/pages/ServicesPage';
import WhoWeHelpPage from './components/pages/WhoWeHelpPage';
import Team from './Team'; 
import WorkshopPage from './components/pages/WorkshopPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import Dashboard from './components/Dashboard'; 
import UserDashboard from './components/UserDashboard'; 
import SummitPage from './components/pages/SummitPage';

// Audiences
import StartupSolutions from './components/audiences/StartupSolutions';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';
import ComplianceTracker from './components/ComplianceTracker';
import WarRoom from './components/WarRoom';
import StrategicJourney from './components/StrategicJourney';
import FinancialHealthScore from './components/FinancialHealthScore';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);

  useEffect(() => {
    let popupTimer: number | undefined;
    const hasSeenEvent = sessionStorage.getItem('hasSeenIWS_Event_Immediate');
    const isSpecialPage = ['#warroom', '#intel', '#summit', '#my-intel'].includes(window.location.hash);
    
    if (!hasSeenEvent && !isSpecialPage) {
      popupTimer = window.setTimeout(() => setShowEventPopup(true), 800);
    }

    const handleHashChange = () => {
      try {
        const hash = window.location.hash.replace('#', '');
        
        if (hash === 'assessment') {
          setShowAssessmentModal(true);
          return;
        }

        const validViews = [
          'home', 'services', 'who-we-help', 'team', 'workshops', 'blog', 'contact', 
          'privacy', 'startups', 'existing-business', 'npos', 'individuals', 
          'wellness', 'accountability', 'tracker', 'warroom', 'protocol', 'intel', 'summit', 'my-intel'
        ];

        if (['protocol', 'services'].includes(hash)) {
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

  const renderCurrentView = () => {
    try {
      switch (currentView) {
        case 'my-intel': return <UserDashboard onTriggerAssessment={() => setShowAssessmentModal(true)} />;
        case 'summit': return <SummitPage />;
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
        case 'tracker': return <ComplianceTracker
