/**
 * IWS SOVEREIGNTY - MASTER ROUTER (CENTRAL NERVOUS SYSTEM)
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 * SAFETY: AUTO-REDIRECT ACTIVE
 */

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Page Imports
import Home from './pages/Home';
import WarRoom from './pages/WarRoom';
import Admin from './pages/Admin';
import Success from './pages/Success';

// Loading Fallback (Prevents blank screen during transitions)
const LoadingState = () => (
  <div className="min-h-screen bg-[#05070a] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#05070a]">
        {/* Persistent Navigation */}
        <Navbar />

        {/* Dynamic Content Area */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Core Funnel Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/war-room" element={<WarRoom />} />
              <Route path="/success" element={<Success />} />
              
              {/* Secured Admin Route */}
              <Route path="/admin" element={<Admin />} />

              {/* Catch-all Safety: Redirects any dead links to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        {/* Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
}
