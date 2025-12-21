import React from 'react';
import ReactDOM from 'react-dom/client';
// 🔥 CRITICAL FIX: HashRouter is required for GitHub Pages
import { HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
