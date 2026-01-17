import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
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
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Critical System Failure:", error, errorInfo);
  }

  private handleReset = () => {
    window.location.hash = '#home';
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-900 flex items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-2xl space-y-8 animate-fadeIn">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <ShieldAlert size={40} />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-black text-brand-900 uppercase tracking-tighter">Protocol Interrupted</h2>
              <p className="text-brand-900/60 font-medium leading-relaxed text-sm">
                A technical anomaly occurred in the UI layer. We have isolated the fault to protect your data.
              </p>
            </div>
            <div className="grid gap-3">
              <button 
                onClick={this.handleReset}
                className="w-full flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl"
              >
                <RefreshCcw size={16} /> Restore Connection
              </button>
              <button 
                onClick={() => { window.location.hash = '#home'; window.location.reload(); }}
                className="w-full text-brand-900/40 font-black uppercase tracking-widest text-[10px] hover:text-brand-900 transition-colors"
              >
                Return to Command Center
              </button>
            </div>
            <div className="pt-6 border-t border-brand-900/5">
              <p className="text-[8px] font-mono text-brand-900/20 uppercase tracking-tighter break-all">
                Error Log: {this.state.error?.message || "Unknown Runtime Exception"}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
