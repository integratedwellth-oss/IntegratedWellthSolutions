import React, { useState } from 'react';
import { 
  Shield, AlertTriangle, CheckCircle2, FileText, 
  ArrowRight, Download, Calendar, Clock 
} from 'lucide-react';
import Button from './Button';
import ZohoFinanceWidget from './ZohoFinanceWidget';

// Mock Data for the Dashboard
const COMPLIANCE_STATUS = [
  { label: 'CIPC Annual Return', status: 'compliant', date: 'Filed: 02 Feb 2026' },
  { label: 'SARS VAT', status: 'pending', date: 'Due: 25 Feb 2026' },
  { label: 'PAYE/UIF', status: 'compliant', date: 'Filed: 07 Feb 2026' },
  { label: 'Workmans Comp', status: 'warning', date: 'Action Req: Letter of Good Standing' }
];

const DOCUMENTS = [
  { name: 'Feb 2026 Management Accounts.pdf', date: '12 Feb', type: 'Financials' },
  { name: 'Tax Clearance Certificate.pdf', date: '10 Jan', type: 'Compliance' },
  { name: 'Director Resolution_004.pdf', date: '15 Dec', type: 'Governance' }
];

interface UserDashboardProps {
  onTriggerAssessment: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onTriggerAssessment }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-emerald-500';
      case 'pending': return 'bg-yellow-500';
      case 'warning': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/5 border border-brand-900/10 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-900">
                System Operational
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tighter uppercase mb-2">
              Command Center
            </h1>
            <p className="text-brand-900/60 font-medium">
              Welcome back, <span className="text-brand-gold font-bold">Thabo</span>. Your financial architecture is stable.
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')}
            >
              <Calendar size={16} className="mr-2" />
              Strategic Session
            </Button>
            <Button onClick={onTriggerAssessment}>
              <Clock size={16} className="mr-2" />
              Run Health Check
            </Button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (8 cols) - Finance & Operations */}
          <div className="lg:col-span-8 space-y-8 animate-slideInRight" style={{ animationDelay: '100ms' }}>
            
            {/* 1. ZOHO FINANCE WIDGET (The Core Feature) */}
            <ZohoFinanceWidget />

            {/* 2. Recent Documents */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight">
                  Vault Access
                </h3>
                <button className="text-xs font-bold text-brand-gold uppercase tracking-widest hover:text-brand-900 transition-colors">
                  View All
                </button>
              </div>
              
              <div className="space-y-4">
                {DOCUMENTS.map((doc, idx) => (
                  <div key={idx} className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-brand-50 transition-colors border border-transparent hover:border-brand-900/10 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-900 shadow-sm">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-900 text-sm group-hover:text-brand-600 transition-colors">
                          {doc.name}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                          {doc.type} • {doc.date}
                        </p>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-brand-900 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <Download size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (4 cols) - Compliance & Risk */}
          <div className="lg:col-span-4 space-y-8 animate-slideInRight" style={{ animationDelay: '200ms' }}>
            
            {/* 1. Compliance Traffic Lights */}
            <div className="bg-brand-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <Shield className="text-brand-gold" size={24} />
                <h3 className="text-xl font-black uppercase tracking-tight">
                  Compliance
                </h3>
              </div>

              <div className="space-y-6 relative z-10">
                {COMPLIANCE_STATUS.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white mb-1">{item.label}</p>
                      <p className="text-[10px] text-brand-100/60 uppercase tracking-widest font-medium">
                        {item.date}
                      </p>
                    </div>
                    <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${getStatusColor(item.status)}`}></div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 bg-red-500/20 border border-red-500/30 p-4 rounded-2xl">
                  <AlertTriangle className="text-red-500 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-xs font-bold text-white uppercase tracking-wide">Action Required</p>
                    <p className="text-[10px] text-white/70 mt-1">Submit Letter of Good Standing documents.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Financial Health Mini-Score */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
              <h3 className="text-lg font-black text-brand-900 uppercase tracking-tight mb-2">
                Battle Readiness
              </h3>
              <p className="text-xs text-gray-500 mb-6">Last assessment: 15 Jan 2026</p>
              
              <div className="flex items-center justify-center py-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="3"
                      strokeDasharray="85, 100"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-900">
                    <span className="text-3xl font-black">85</span>
                    <span className="text-[8px] font-bold uppercase tracking-widest opacity-50">Score</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm font-bold text-brand-900">Optimize Cash Flow</p>
                <button 
                  onClick={onTriggerAssessment}
                  className="text-[10px] text-brand-gold font-black uppercase tracking-widest mt-2 hover:underline"
                >
                  Recalculate Strategy
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
