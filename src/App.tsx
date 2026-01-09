import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WarRoom from './components/WarRoom';
import Services from './pages/Services'; 
import Team from './pages/Team'; 
import WhoWeHelp from './pages/WhoWeHelp'; 
import Contact from './pages/Contact'; 
import NeuralCFO from './components/NeuralCFO';
import Admin from './pages/Admin'; // NEW IMPORT

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* THE INTELLIGENCE LAYER */}
      <NeuralCFO /> 
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/war-room" element={<WarRoom />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} /> 
          <Route path="/who-we-help" element={<WhoWeHelp />} /> 
          <Route path="/contact" element={<Contact />} />
          
          {/* CLASSIFIED ROUTE */}
          <Route path="/command" element={<Admin />} /> 
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer className="bg-brand-dark text-white py-8 text-center text-xs font-bold uppercase tracking-widest opacity-50">
        © 2026 Integrated Wellth Command. All Systems Nominal.
      </footer>
    </div>
  );
};

export default App;
