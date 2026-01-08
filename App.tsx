import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Simple placeholder components that CANNOT crash
const SafeHome = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-teal-900 text-white p-4 text-center">
    <h1 className="text-4xl font-bold mb-4">Integrated Wellth Solutions</h1>
    <div className="p-6 bg-white/10 rounded-xl border border-white/20">
      <p className="text-xl font-bold text-yellow-400">System Status: ONLINE</p>
      <p className="mt-2">The Strategic Intelligence Platform is initializing...</p>
    </div>
    <p className="mt-8 text-sm opacity-50">Safe Mode Protocol Active</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<SafeHome />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
