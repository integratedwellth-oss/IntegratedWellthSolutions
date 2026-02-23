import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, FileText, 
  Download, Calendar, Clock, ChevronDown, CheckCircle2,
  Lock, Activity, FileCheck
} from 'lucide-react';
import Button from './Button';
import ZohoFinanceWidget from './ZohoFinanceWidget';
import { logUserActivity } from '../services/loggingService';

const COMPLIANCE_STATUS = [
  { label: 'CIPC Annual Return', status: 'compliant', date: 'Filed: 02 Feb 2026' },
  { label: 'SARS VAT', status: 'pending', date: 'Due: 25 Feb 2026' },
  { label: 'PAYE/UIF', status: 'compliant', date: 'Filed: 07 Feb 2026' },
  { label: 'Workmans Comp', status: 'warning', date: 'Action Req: Letter' }
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
  const [assessmentHistory, setAssessmentHistory] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const loadDashboardData = () => {
      try {
        const saved = localStorage.getItem('iws_health_score_results');
        if (saved) setAssessmentHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Dashboard failed to parse local data.");
      }
    };

    loadDashboardData();
    logUserActivity('Dashboard Entered', 'User viewed the Command Center');
    
    window.addEventListener('storage', loadDashboardData);
    return () => window.removeEventListener('storage', loadDashboardData);
  }, []);

  const handleDocClick = (name: string) => {
    logUserActivity('Vault Interaction', `Accessed: ${name}`);
    alert(`Accessing Encrypted Vault: ${name}. Audit log transmitted to admin.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/5 border border-brand-900/10 mb-4 text-[10px] font-black uppercase tracking-widest text-brand-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sovereignty Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tighter uppercase mb-2">Command Center</h1>
            <p className="text-brand-900/60 font-medium italic">POPIA Protected Financial Architecture.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min')}>
              <Calendar size={16} className="mr-2" /> Strategic Session
            </Button>
            <Button onClick={onTriggerAssessment}>
              <Clock size={16} className="mr-2" /> Run Health Check
            </Button>
          </div>
        </div>

        {/* POPIA Bar */}
        <div className="mb-8 bg-brand-900 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between border border-brand-gold/30 shadow-xl">
          <div className="flex items-center gap-4 text-white">
            <Lock size={20} className="text-brand-gold" />
            <p className="text-[10px] font-bold uppercase tracking-widest leading-relaxed">
              Secure Data Protocol: All records processed under South African POPI Act 4 of 2013.
            </p>
          </div>
          <FileCheck size={20} className="text-emerald-500" />
        </div>

        {/* Assessment Card */}
        {assessmentHistory ? (
          <div className="mb-12 bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full border-4 border-brand-gold flex items-center justify-center font-black text-xl text-brand-900">
                  {assessmentHistory.totalScore}%
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight">Intelligence Score</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase">Verified: {assessmentHistory.date}</p>
                </div>
              </div>
              <button onClick={() => setShowHistory(!showHistory)} className="text-xs font-black text-brand-gold uppercase tracking-widest hover:underline flex items-center gap-2">
                {showHistory ? 'Hide' : 'Breakdown'} <ChevronDown className={showHistory ? 'rotate-180' : ''} size={14} />
              </button>
            </div>
            {showHistory && (
              <div className="mt-8 pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-8 animate-fadeIn">
                <div className="space-y-3">
                  {Object.entries(assessmentHistory.sections || {}).map(([k, v]: [any, any]) => (
                    <div key={k} className="flex justify-between text-xs font-bold uppercase tracking-wider bg-gray-50 p-3 rounded-lg">
                      <span>{k}</span> <span className="text-brand-gold">{v}%</span>
                    </div>
                  ))}
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl flex items-center gap-4 border-l-4 border-brand-gold">
                  <Activity size={24} className="text-brand-gold shrink-0" />
                  <p className="text-xs leading-relaxed italic opacity-80">
                    Your architecture is {assessmentHistory.totalScore > 70 ? 'STABLE' : 'VULNERABLE'}. 
                    Review the Vault for action items.
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mb-12 bg-white rounded-[2.5rem] p-8 border border-dashed border-gray-300 text-center">
            <Activity className="mx-auto text-gray-300 mb-4" size={40} />
            <h3 className="text-brand-900 font-black uppercase tracking-tighter">Diagnostic Data Missing</h3>
            <p className="text-xs text-gray-500 mb-6 uppercase tracking-widest">Initialization required to generate Battle Readiness score.</p>
            <Button onClick={onTriggerAssessment} size="sm">Start Assessment</Button>
          </div>
        )}

        {/* Tools & Vault Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <ZohoFinanceWidget />
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
              <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight mb-6">Vault Access</h3>
              <div className="space-y-4">
                {DOCUMENTS.map((doc, idx) => (
                  <div key={idx} onClick={() => handleDocClick(doc.name)} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-brand-50 transition-all cursor-pointer group border border-transparent hover:border-brand-gold/20">
                    <div className="flex items-center gap-4">
                      <FileText size={20} className="text-brand-900" />
                      <div>
                        <p className="font-bold text-sm text-brand-900">{doc.name}</p>
                        <p className="text-[10px] uppercase font-bold text-gray-400">{doc.type} • {doc.date}</p>
                      </div>
                    </div>
                    <Download size={16} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-brand-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden h-full">
              <Shield className="text-brand-gold mb-6" size={32} />
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Compliance Hub</h3>
              <div className="space-y-6">
                {COMPLIANCE_STATUS.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <p className="text-xs font-bold uppercase">{item.label}</p>
                      <p className="text-[9px] text-brand-gold font-bold uppercase tracking-widest mt-1">{item.date}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${item.status === 'compliant' ? 'bg-emerald-500' : item.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
