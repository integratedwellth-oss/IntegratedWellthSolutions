import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Global Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages - Consolidated Imports
import Home from './components/pages/Home';
import TeamPage from './components/pages/TeamPage';
import ServicesPage from './components/pages/ServicesPage';
import ContactPage from './components/pages/ContactPage';
import WorkshopPage from './components/pages/WorkshopPage';
import WhoWeHelpPage from './components/pages/WhoWeHelpPage';
import BlogPage from './components/pages/BlogPage';
import AssessmentPage from './components/pages/AssessmentPage';
import AssessmentSuccess from './components/pages/AssessmentSuccess';
import AdminDashboard from './components/pages/AdminDashboard';

const App: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/workshops" element={<WorkshopPage />} />
          <Route path="/who-we-help" element={<WhoWeHelpPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/assessment-success" element={<AssessmentSuccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
