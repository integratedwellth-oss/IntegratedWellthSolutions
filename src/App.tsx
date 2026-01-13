import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import WarRoom from './pages/WarRoom';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div className="bg-black min-h-screen"/>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/war-room" element={<WarRoom />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Suspense>
    </Router>
  );
}
