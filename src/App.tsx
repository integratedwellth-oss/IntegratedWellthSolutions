import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustedBy from './components/TrustedBy';

// Pages
import Home from './pages/Home';
import Solutions from './pages/Solutions'; // This is your "Who We Help" page
import WarRoomPage from './pages/WarRoom';
import Founder from './pages/Founder';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* HOME ROUTE: Landing + Industry Alignment */}
            <Route 
              path="/" 
              element={
                <>
                  <Home />
                  <TrustedBy />
                </>
              } 
            />

            {/* SOLUTIONS: "Who We Help" Sector Breakdown */}
            <Route path="/solutions" element={<Solutions />} />
            
            {/* Compatibility for old link name if needed */}
            <Route path="/who-we-help" element={<Navigate to="/solutions" replace />} />

            {/* WAR ROOM: Crisis Simulation Environment */}
            <Route path="/war-room" element={<WarRoomPage />} />

            {/* FOUNDER: Marcia Kgaphola Profile */}
            <Route path="/founder" element={<Founder />} />

            {/* CONTACT: Strategic Triage */}
            <Route path="/contact" element={<Contact />} />

            {/* REDIRECT: Catch-all to prevent blank 404 pages */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
