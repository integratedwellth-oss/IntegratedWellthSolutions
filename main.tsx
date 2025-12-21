import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // Using HashRouter for GitHub Pages
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 🔥 CRITICAL FIX: HashRouter handles the sub-folder path automatically */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);
