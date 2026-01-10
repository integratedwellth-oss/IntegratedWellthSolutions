/**
 * IWS SOVEREIGNTY - HULL BREACH PROTOCOL (ERROR BOUNDARY)
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCcw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Here we log the error to your console for debugging
    console.error("IWS CRITICAL UI FAILURE:", error, errorInfo);
    // In production, you could push this error to Firebase here
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#05070a] flex items-center justify-center p-6 font-mono text-white">
          <div className="max-w-md w-full text-center space-y-8 bg-[#0a0c12] border border-red-900/20 p-10 rounded-3xl">
            <div className="flex justify-center">
              <div className="p-4 bg-red-500/10 rounded-full">
                <ShieldAlert className="text-red-500" size={48} />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-black uppercase tracking-tighter">System Variance Detected</h2>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">A localized UI failure has been contained.</p>
            </div>

            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <p className="text-[10px] text-red-400 font-mono break-all">
                {this.state.error?.message || "Internal Engine Error"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
              >
                <RefreshCcw size={14} /> Reset
              </button>
              <a 
                href="/"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-gold text-brand-900 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all"
              >
                <Home size={14} /> Exit
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.children;
  }
}

export default ErrorBoundary;
