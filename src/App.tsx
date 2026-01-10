import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Global Components (From src/components)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustedBy from './components/TrustedBy'; // Correct path

// Pages (From src/pages)
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import WarRoom from './pages/WarRoom'; // Corrected path after move
import Founder from './pages/Founder';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* HOME ROUTE */}
            <Route 
              path="/" 
              element={
                <>
                  <Home />
                  <TrustedBy />
                </>
              } 
            />

            {/* SOLUTIONS ROUTE */}
            <Route path="/solutions" element={<Solutions />} />
            
            {/* Redirect old path if users bookmark it */}
            <Route path="/who-we-help" element={<Navigate to="/solutions" replace />} />

            {/* WAR ROOM ROUTE */}
            <Route path="/war-room" element={<WarRoom />} />

            {/* FOUNDER ROUTE */}
            <Route path="/founder" element={<Founder />} />

            {/* CONTACT ROUTE */}
            <Route path="/contact" element={<Contact />} />

            {/* 404 FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
