import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Reusable Sections
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustedBy from './components/TrustedBy';

// Full Page Views
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import WarRoom from './pages/WarRoom'; // Correct: Looking in pages
import Founder from './pages/Founder';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Home />
                  <TrustedBy />
                </>
              } 
            />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/war-room" element={<WarRoom />} />
            <Route path="/founder" element={<Founder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
