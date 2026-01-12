/**
 * IWS SOVEREIGNTY - SYSTEM IGNITION
 * STATUS: 100% ARCHITECTURE COMPLETE
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// 1. Initialize the root container
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("IWS Critical Failure: Root container not found. Check index.html.");
}

// 2. Launch the Sovereign Engine
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
