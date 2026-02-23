import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, FileText, 
  ArrowRight, Download, Calendar, Clock, ChevronDown, CheckCircle2,
  XCircle, TrendingUp
} from 'lucide-react';
import Button from './Button';
import ZohoFinanceWidget from './ZohoFinanceWidget';

// Mock Data for Compliance Status
const COMPLIANCE_STATUS = [
  { label: 'CIPC Annual Return', status: 'compliant', date: 'Filed: 02 Feb 2026' },
  { label: 'SARS VAT', status: 'pending', date: 'Due: 25 Feb 2026' },
  { label: 'PAYE/UIF', status: 'compliant', date: 'Filed: 07 Feb 2026' },
  { label: 'Workmans Comp', status: 'warning', date: 'Action Req: Letter of Good Standing' }
];

// Mock Data for Vault Documents
const DOCUMENTS = [
  { name: 'Feb 2026 Management Accounts.pdf', date: '12 Feb', type: 'Financials' },
  { name: 'Tax Clearance Certificate.pdf', date: '10 Jan', type: 'Compliance' },
  { name: 'Director Resolution_004.pdf', date: '15 Dec', type: 'Governance' }
];

interface UserDashboardProps {
  onTriggerAssessment: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onTriggerAssessment }) => {
  // State to hold assessment history
  const [assessmentHistory, setAssessmentHistory] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Load assessment results from localStorage on mount
  useEffect(() => {
    const savedResults = localStorage.getItem('iws_health_score_results');
    if (savedResults) {
      try {
        setAssessmentHistory(JSON.parse(savedResults));
      } catch (e) {
        console.error("Failed to parse assessment history");
      }
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-emerald-500';
      case 'pending': return 'bg-yellow-500';
      case 'warning': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
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
              Welcome back. Your financial architecture is stable.
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

        {/* --- ASSESSMENT REVIEW SECTION --- */}
        {/* Only shows if user has taken the quiz */}
        {assessmentHistory && (
          <div className="mb-12 bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5 animate-slideInRight">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="40" cy="40" r="36"
                      fill="transparent"
                      stroke="#f3f4f6"
                      strokeWidth="8"
                    />
                    <circle
                      cx="40" cy="40" r="36"
                      fill="transparent"
                      stroke={assessmentHistory.totalScore >= 80 ? '#059669' : assessmentHistory.totalScore >= 50 ? '#d97706' : '#dc2626'}
                      strokeWidth="8"
                      strokeDasharray={`${assessmentHistory.totalScore * 2.26} 226`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center font-black text-lg text-brand-900">
                    {assessmentHistory.totalScore}%
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight">
                    Financial Health Status
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Last check: Today
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                <button 
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2 text-xs font-bold text-brand-900 uppercase tracking-widest hover:text-brand-gold transition-colors"
                >
                  {showHistory ? 'Close Review' : 'See Breakdown'} 
                  <ChevronDown className={`transition-transform duration-300 ${showHistory ? 'rotate-180' : ''}`} size={16} />
                </button>
                
                {/* DYNAMIC CTA BASED ON SCORE */}
                {assessmentHistory.totalScore < 50 ? (
                   <Button size="sm" className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white border-0" onClick={() => window.location.hash = '#contact'}>
                      <AlertTriangle size={16} className="mr-2" /> Critical: Book Urgent Review
                   </Button>
                ) : assessmentHistory.totalScore < 80 ? (
                   <Button size="sm" variant="secondary" className="w-full md:w-auto" onClick={() => window.location.hash = '#contact'}>
                      <TrendingUp size={16} className="mr-2" /> Improve Score: Strategy Call
                   </Button>
                ) : (
                   <Button size="sm" className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 border-0" onClick={() => window.location.hash = '#contact'}>
                      <CheckCircle2 size={16} className="mr-2" /> Score High: Discuss Expansion
                   </Button>
                )}
              </div>
            </div>

            {/* EXPANDABLE HISTORY VIEW */}
            {showHistory && (
              <div className="mt-8 pt-8 border-t border-gray-100 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Detailed Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-brand-900 uppercase tracking-wider text-xs mb-4">
                      Section Performance
                    </h4>
                    {assessmentHistory.sections && Object.entries(assessmentHistory.sections).map(([key, score]: [string, any]) => (
                      <div key={key} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                        <span className="text-sm font-bold text-brand-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span className={`font-black ${getScoreColor(score)}`}>{score}/100</span>
                      </div>
                    ))}
                  </div>

                  {/* Strategic Insight */}
                  <div className="bg-brand-900 text-white rounded-2xl p-6 flex flex-col justify-center">
                    <h4 className="font-bold uppercase tracking-wider text-xs mb-4 text-brand-gold flex items-center gap-2">
                      <Shield size={14} /> Intelligence Report
                    </h4>
                    <p className="text-sm leading-relaxed opacity-90 mb-4">
                      Your business architecture is currently in the 
                      <strong> {assessmentHistory.totalScore < 50 ? 'VULNERABLE PHASE' : assessmentHistory.totalScore < 80 ? 'STABILIZATION PHASE' : 'OPTIMIZATION PHASE'}</strong>.
                    </p>
                    <p className="text-sm leading-relaxed opacity-90">
                      {assessmentHistory.totalScore < 50 
                        ? "Immediate intervention is required to decouple your personal assets from business risk. Your structural sovereignty is compromised." 
                        : assessmentHistory.totalScore < 80 
                        ? "You have a solid foundation, but operational friction is slowing you down. Automation and tighter compliance loops are your next step."
                        : "You are operating at peak efficiency. The focus now shifts from 'protection' to 'multiplication' and asset acquisition."}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (8 cols) - Finance & Operations */}
          <div className="lg:col-span-8 space-y-8 animate-slideInRight" style={{ animationDelay: '100ms' }}>
            
            {/* 1. IWS FINANCE WIDGET (REBRANDED) */}
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

            {/* 2. Mini Score Widget (Only shows simple score here, detailed view is above) */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5 text-center">
              <h3 className="text-lg font-black text-brand-900 uppercase tracking-tight mb-2">
                Operational Pulse
              </h3>
              <p className="text-xs text-gray-500 mb-6">Real-time business vitality</p>
              
              <div className="inline-flex items-center justify-center p-6 bg-brand-50 rounded-full mb-4">
                 <CheckCircle2 size={32} className={assessmentHistory?.totalScore >= 80 ? 'text-emerald-600' : 'text-brand-900'} />
              </div>
              
              <div className="space-y-2">
                <button 
                  onClick={onTriggerAssessment}
                  className="w-full py-3 bg-brand-900 text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all"
                >
                  Recalculate
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
