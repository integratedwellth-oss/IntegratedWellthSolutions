import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Global Components (Checked: These exist in src/components)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustedBy from './components/TrustedBy'; 

// Pages (Checked: These exist in src/pages)
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import WarRoom from './pages/WarRoom';
import Founder from './pages/Founder';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Home Page with TrustedBy Section */}
            <Route 
              path="/" 
              element={
                <>
                  <Home />
                  <TrustedBy />
                </>
              } 
            />

            {/* Core Pages */}
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/war-room" element={<WarRoom />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Legacy redirect for old 'Who We Help' links */}
            <Route path="/who-we-help" element={<Navigate to="/solutions" replace />} />

            {/* Catch-all to prevent 404 blank screens */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
