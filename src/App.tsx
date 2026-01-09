import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import WarRoom from './components/WarRoom';
import Services from './pages/Services'; 
import Team from './pages/Team'; // NEW
import WhoWeHelp from './pages/WhoWeHelp'; // NEW
import Contact from './pages/Contact'; // NEW
import NeuralCFO from './components/NeuralCFO';

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
          <Route path="/team" element={<Team />} /> {/* NEW */}
          <Route path="/who-we-help" element={<WhoWeHelp />} /> {/* NEW */}
          <Route path="/contact" element={<Contact />} /> {/* NEW */}
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
