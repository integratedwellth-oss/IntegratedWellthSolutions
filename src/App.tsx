import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TrustedBy from './components/TrustedBy';

// Pages
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import WarRoomPage from './pages/WarRoom'; // Using the page wrapper we established
import Founder from './pages/Founder';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navigation remains constant across all routes */}
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* HOME ROUTE: Includes the TrustedBy Section */}
            <Route 
              path="/" 
              element={
                <>
                  <Home />
                  <TrustedBy />
                </>
              } 
            />

            {/* SOLUTIONS ROUTE: The "Who We Help" Page */}
            <Route path="/solutions" element={<Solutions />} />

            {/* WAR ROOM ROUTE: Tactical Command Center */}
            <Route path="/war-room" element={<WarRoomPage />} />

            {/* FOUNDER ROUTE: Marcia's Profile */}
            <Route path="/founder" element={<Founder />} />

            {/* CONTACT ROUTE: Strategic Triage Request */}
            <Route path="/contact" element={<Contact />} />

            {/* CATCH-ALL REDIRECT: Prevents "Blank Page" on 404 errors */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
