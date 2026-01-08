import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Temporary simple components to test if build works
const TestHome = () => (
  <div style={{ padding: '40px', textAlign: 'center' }}>
    <h1 style={{ color: '#134e4a', fontSize: '48px' }}>Integrated Wellth Solutions</h1>
    <p style={{ fontSize: '20px', marginTop: '20px' }}>
      If you see this, the build is working!
    </p>
    <p style={{ color: '#666', marginTop: '40px' }}>
      Next step: Gradually add back your components one by one
    </p>
  </div>
);

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ background: '#134e4a', color: 'white', padding: '20px' }}>
        <h2>IWS Test Build</h2>
      </header>
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/home" element={<TestHome />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <footer style={{ background: '#f1f1f1', padding: '20px', textAlign: 'center' }}>
        <p>© 2024 Integrated Wellth Solutions</p>
      </footer>
    </div>
  );
}

export default App;
