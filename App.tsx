import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieConsent from './components/CookieConsent';

// Root Pages
import Team from './Team';

// Lazy Loaded Pages (Optimizes performance)
const Home = lazy(() => import('./components/pages/Home'));
const WorkshopPage = lazy(() => import('./components/pages/WorkshopPage'));
const BlogPage = lazy(() => import('./components/pages/BlogPage'));
const ContactPage = lazy(() => import('./components/pages/Contact Page'));

// Audience Pages
const StartupSolutions = lazy(() => import('./components/audiences/StartupSolutions'));
const BusinessSolutions = lazy(() => import('./components/audiences/BusinessSolutions'));
const NPOSolutions = lazy(() => import('./components/audiences/NPOSolutions'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-white selection:bg-teal-500/30">
        <Navbar />
        
        <Suspense fallback={
          <div className="flex h-screen items-center justify-center bg-slate-950">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-teal-500 border-t-transparent"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            <Route path="/workshop" element={<WorkshopPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Audience Routes */}
            <Route path="/solutions/startup" element={<StartupSolutions />} />
            <Route path="/solutions/business" element={<BusinessSolutions />} />
            <Route path="/solutions/npo" element={<NPOSolutions />} />
          </Routes>
        </Suspense>

        <Footer />
        <WhatsAppButton />
        <CookieConsent />
      </div>
    </Router>
  );
};

export default App;
