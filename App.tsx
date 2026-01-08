import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/pages/Home';
import TeamPage from './components/pages/TeamPage';
import AssessmentSuccess from './components/pages/AssessmentSuccess';
import AdminDashboard from './components/pages/AdminDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/assessment-success" element={<AssessmentSuccess />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* Fallback to Home if path is wrong */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
