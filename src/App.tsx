import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages - Standardizing imports to prevent path errors
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import WarRoom from './pages/WarRoom';
import Founder from './pages/Founder';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        
        {/* Suspense handles any loading delays that might cause a blank screen */}
        <Suspense fallback={<div className="min-h-screen bg-brand-900" />}>
          <main className="flex-grow">
            <Routes>
              {/* Main Landing */}
              <Route path="/" element={<Home />} />
              
              {/* Tactical & Solutions */}
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/war-room" element={<WarRoom />} />
              
              {/* Brand & Lead */}
              <Route path="/founder" element={<Founder />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Safety Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
