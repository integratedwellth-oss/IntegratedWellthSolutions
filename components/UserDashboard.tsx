import React, { useState, useEffect } from 'react';
import { 
  Shield, AlertTriangle, FileText, 
  Download, Calendar, Clock, ChevronDown, CheckCircle2,
  Lock, Activity, FileCheck, Eye
} from 'lucide-react';
import Button from './Button';
import ZohoFinanceWidget from './ZohoFinanceWidget';
import { logUserActivity } from '../services/loggingService';

const DOCUMENTS = [
  { id: 'm-01', name: 'Feb 2026 Management Accounts.pdf', date: '12 Feb', type: 'Financials', size: '1.2MB' },
  { id: 't-02', name: 'Tax Clearance Certificate.pdf', date: '10 Jan', type: 'Compliance', size: '0.4MB' },
  { id: 'g-03', name: 'Director Resolution_004.pdf', date: '15 Dec', type: 'Governance', size: '0.8MB' }
];

interface UserDashboardProps {
  onTriggerAssessment: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onTriggerAssessment }) => {
  const [assessmentHistory, setAssessmentHistory] = useState<any>(null);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('iws_health_score_results');
    if (saved) setAssessmentHistory(JSON.parse(saved));
    logUserActivity('Dashboard View', 'Secure session initiated');
  }, []);

  const handleVaultAction = (docName: string, action: 'view' | 'download') => {
    logUserActivity(`Vault ${action}`, `Document: ${docName}`);
    alert(`POPIA Protocol: ${action === 'view' ? 'Opening Secure Viewer' : 'Generating Encrypted Download'} for ${docName}.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fadeIn">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-900/5 border border-brand-900/10 mb-4 text-[10px] font-black uppercase tracking-widest text-brand-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sovereignty Hub Active
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-900 tracking-tighter uppercase mb-2">Command Center</h1>
            <p className="text-brand-900/60 font-medium italic">POPIA Compliant Environment.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min')}>
              <Calendar size={16} className="mr-2" /> Book Strategy
            </Button>
            <Button onClick={onTriggerAssessment}>
              <Clock size={16} className="mr-2" /> Refresh Score
            </Button>
          </div>
        </div>

        {/* --- ASSESSMENT SUMMARY --- */}
        {assessmentHistory && (
          <div className="mb-12 bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full border-4 border-brand-gold flex items-center justify-center font-black text-2xl text-brand-900">
                  {assessmentHistory.totalScore}%
                </div>
                <div>
                  <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight">Intelligence Rating</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Calculated: {assessmentHistory.date}</p>
                </div>
              </div>
              <button onClick={() => setShowHistory(!showHistory)} className="px-6 py-2 bg-gray-50 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold transition-all">
                {showHistory ? 'Hide Details' : 'View Breakdown'}
              </button>
            </div>
            
            {showHistory && (
              <div className="mt-8 pt-8 border-t border-gray-100 grid md:grid-cols-2 gap-8 animate-fadeIn">
                <div className="space-y-3">
                  {Object.entries(assessmentHistory.sections || {}).map(([k, v]: [any, any]) => (
                    <div key={k} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-xs font-black uppercase text-brand-900">{k}</span>
                      <span className="text-brand-gold font-black">{v}%</span>
                    </div>
                  ))}
                </div>
                <div className="bg-brand-900 text-white p-6 rounded-2xl border-l-4 border-brand-gold">
                  <h4 className="text-brand-gold text-[10px] font-black uppercase tracking-widest mb-2">Architect's Note</h4>
                  <p className="text-xs leading-relaxed italic opacity-80">
                    Your architecture is {assessmentHistory.totalScore > 75 ? 'Optimal' : 'Needs Intervention'}. 
                    Focus on the {Object.keys(assessmentHistory.sections)[0]} pillar this month.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            {/* IWS INVOICE TOOL */}
            <ZohoFinanceWidget />

            {/* VAULT ACCESS */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-brand-900/5">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight">Strategic Vault</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">End-to-End Encrypted Storage</p>
                </div>
                <Lock size={20} className="text-brand-gold" />
              </div>

              <div className="space-y-4">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-transparent hover:border-brand-gold/20 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-900 shadow-sm">
                        <FileText size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-brand-900">{doc.name}</p>
                        <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleVaultAction(doc.name, 'view')}
                        className="p-3 bg-white text-gray-400 hover:text-brand-900 rounded-xl transition-all shadow-sm"
                      >
                        <Eye size={18} />
                      </button>
                      <button 
                        onClick={() => handleVaultAction(doc.name, 'download')}
                        className="p-3 bg-brand-900 text-brand-gold rounded-xl transition-all shadow-sm hover:scale-105"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COMPLIANCE HUB SIDEBAR */}
          <div className="lg:col-span-4">
            <div className="bg-brand-900 rounded-[2.5rem] p-8 text-white h-full relative overflow-hidden border border-brand-gold/20">
              <Shield className="text-brand-gold mb-6" size={32} />
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Compliance Matrix</h3>
              <div className="space-y-8">
                {['CIPC Annual', 'SARS VAT', 'PAYE/UIF', 'COIDA'].map((label, idx) => (
                  <div key={label} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-1">{label}</p>
                      <p className="text-xs font-bold opacity-60">Status: Verified</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${idx === 3 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                  </div>
                ))}
              </div>
              <div className="mt-12 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                 <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60 mb-2 text-brand-gold">POPIA Data Protection</p>
                 <p className="text-[8px] opacity-40 leading-relaxed uppercase">Your data is stored in localized SA servers following absolute privacy standards.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
