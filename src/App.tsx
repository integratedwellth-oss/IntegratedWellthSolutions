/**
 * IWS SOVEREIGNTY - CORE ROUTING ENGINE
 * STATUS: PRODUCTION READY
 * INTEGRITY: VERIFIED
 */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Components
import Layout from './components/Layout';
import { SYSTEM_STATUS } from './constants';

// Pages - Direct Imports for Stability
import Home from './pages/Home';
import WarRoom from './pages/WarRoom';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

/**
 * LOADING STATE
 * Prevents "Blank Screen" flickers during route transitions.
 */
const LoadingState = () => (
  <div className="min-h-screen bg-[#05070a] flex items-center justify-center">
    <div className="text-[#C5A059] font-black uppercase tracking-[0.4em] animate-pulse text-xs">
      Initialising Intelligence...
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingState />}>
        <Layout>
          <Routes>
            {/* PUBLIC SECTOR */}
            <Route path="/" element={<Home />} />
            <Route path="/war-room" element={<WarRoom />} />
            
            {/* AUTHORITY SECTOR */}
            <Route path="/admin" element={<Admin />} />
            
            {/* FAILSAFE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}
