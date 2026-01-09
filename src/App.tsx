import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import WarRoom from './components/WarRoom';
import Services from './pages/Services'; 
import Team from './pages/Team'; 
import WhoWeHelp from './pages/WhoWeHelp'; 
import Contact from './pages/Contact'; 
import Gallery from './pages/Gallery'; // NEW IMPORT
import NeuralCFO from './components/NeuralCFO';
import Admin from './pages/Admin'; 

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <NeuralCFO /> 
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/war-room" element={<WarRoom />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} /> 
          <Route path="/who-we-help" element={<WhoWeHelp />} /> 
          <Route path="/gallery" element={<Gallery />} /> {/* NEW ROUTE */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/command" element={<Admin />} /> 
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
