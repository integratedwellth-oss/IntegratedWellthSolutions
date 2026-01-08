import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import TeamPage from './components/pages/TeamPage';
import AssessmentSuccess from './components/pages/AssessmentSuccess';
import AdminDashboard from './components/pages/AdminDashboard';
import AssessmentPage from './components/pages/AssessmentPage';
import ContactPage from './components/pages/ContactPage';
import BlogPage from './components/pages/BlogPage';
import ServicesPage from './components/pages/ServicesPage';
import AccountabilityPartnership from './components/audiences/AccountabilityPartnership';
import BusinessSolutions from './components/audiences/BusinessSolutions';
import IndividualSolutions from './components/audiences/IndividualSolutions';
import NPOSolutions from './components/audiences/NPOSolutions';
import StartupSolutions from './components/audiences/StartupSolutions';
import WellnessSolutions from './components/audiences/WellnessSolutions';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/assessment-success" element={<AssessmentSuccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/accountability" element={<AccountabilityPartnership />} />
          <Route path="/startups" element={<StartupSolutions />} />
          <Route path="/existing-business" element={<BusinessSolutions />} />
          <Route path="/npos" element={<NPOSolutions />} />
          <Route path="/individuals" element={<IndividualSolutions />} />
          <Route path="/wellness" element={<WellnessSolutions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
