import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot, query, where, doc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, FileText, RefreshCcw, X, ChevronRight, Layout, Calculator, Receipt, Box, FileSpreadsheet, CreditCard, Loader2, CheckSquare, Square, TrendingUp, TrendingDown, Zap, Eye, ShieldCheck } from 'lucide-react';

export interface UserDashboardProps {
  onTriggerAssessment?: () => void;
}

const COMPLIANCE_CHECKLIST_ITEMS = [
  { id: 'cipc', label: 'CIPC Annual Return Filed' },
  { id: 'sars_prov', label: 'Provisional Tax Submitted (IRP6)' },
  { id: 'sars_vat', label: 'VAT Returns Up to Date' },
  { id: 'paye', label: 'PAYE/UIF Reconciliations Complete' },
];

const UserDashboard: React.FC<UserDashboardProps> = ({ onTriggerAssessment }) => {
  const [user, setUser] = useState<any>(null);
  const [myAssessments, setMyAssessments] = useState<any[]>([]);
  const [complianceState, setComplianceState] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.uid) {
        // Real-time listeners for Continuous Relationship
        const qAssessments = query(collection(db, 'assessments'), where('userId', '==', currentUser.uid));
        const unsubAssessments = onSnapshot(qAssessments, (snap) => {
          const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMyAssessments(data.sort((a: any, b: any) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0)));
          setLoading(false);
        });

        const complianceDocRef = doc(db, 'compliance_states', currentUser.uid);
        const unsubCompliance = onSnapshot(complianceDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setComplianceState(docSnap.data());
          } else {
            setComplianceState(COMPLIANCE_CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}));
          }
        });

        unsubscribe = () => { unsubAssessments(); unsubCompliance(); };
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleToggleCompliance = async (itemId: string) => {
    if (!user) return;
    const newState = { ...complianceState, [itemId]: !complianceState[itemId] };
    const complianceDocRef = doc(db, 'compliance_states', user.uid);
    await setDoc(complianceDocRef, newState, { merge: true });
  };

  const complianceProgress = (Object.values(complianceState).filter(Boolean).length / COMPLIANCE_CHECKLIST_ITEMS.length) * 100;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0fdfa] flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full animate-fadeIn">
          <div className="w-20 h-20 bg-[#134e4a] text-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
          <h2 className="text-3xl font-black text-[#134e4a] mb-2 uppercase tracking-tighter">Client Portal</h2>
          <p className="text-[#64748b] font-medium text-sm">Access your personalized security and progress reports.</p>
          <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-[#134e4a] text-white font-black py-5 rounded-2xl hover:bg-[#d4af37] hover:text-[#134e4a] transition-all uppercase tracking-widest text-xs shadow-lg mt-8">
            Secure Login
          </button>
        </div>
      </div>
    );
  }

  // Goal 1: Validate Past Efforts (Progress Tracking)
  const latestAssessment = myAssessments[myAssessments.length - 1];
  const previousAssessment = myAssessments[myAssessments.length - 2];
  const scoreDifference = latestAssessment && previousAssessment ? latestAssessment.score - previousAssessment.score : null;

  // Goal 3: Showcase Future Value (Upsell/Retention)
  const IWS_OS_APPS = [
    { name: 'IWS Invoice', icon: <FileSpreadsheet size={24} />, desc: 'Client Billing', locked: true },
    { name: 'IWS Books', icon: <Calculator size={24} />, desc: 'Automated Ledger', locked: true },
    { name: 'IWS Expense', icon: <Receipt size={24} />, desc: 'Receipt Scanning', locked: true },
    { name: 'IWS Inventory', icon: <Box size={24} />, desc: 'Stock Control', locked: true },
  ];

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-[#134e4a] font-sans pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[#d4af37] text-xs uppercase font-bold tracking-widest">Sovereignty Hub Active</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none font-sora">Quarterly Business Review</h1>
          </div>
          <button onClick={() => signOut(auth)} className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-rose-600/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
            Logout
          </button>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: PROGRESS & COMPLIANCE */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* PROGRESS TRACKING */}
            <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10 relative overflow-hidden">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Strategic Progress</h3>
              
              {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#d4af37]" size={32}/></div> : myAssessments.length === 0 ? (
                <div className="text-center p-10 border-2 border-dashed border-[#134e4a]/20 rounded-3xl bg-[#f0fdfa]/50">
                  <ShieldCheck size={40} className="mx-auto text-[#134e4a]/30 mb-4" />
                  <p className="font-bold text-[#134e4a]/50 uppercase tracking-widest text-xs">No Diagnostics Found</p>
                  <button onClick={onTriggerAssessment} className="mt-6 px-8 py-4 bg-[#134e4a] text-white rounded-xl text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-[#134e4a] transition-colors font-black uppercase shadow-lg">Initiate Baseline Audit</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  
                  {/* PREVIOUS REPORT */}
                  {previousAssessment ? (
                    <div className="opacity-60 hover:opacity-100 transition-opacity flex flex-col h-full">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-3 text-[#134e4a]/60">Previous Quarter</h4>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 flex-grow flex flex-col">
                        <p className="text-4xl font-black text-[#134e4a]/50 font-sora">{previousAssessment.score}</p>
                        <p className="font-bold text-[#134e4a]/60 uppercase text-xs mt-2">{previousAssessment.persona}</p>
                        <p className="text-[10px] text-[#64748b] font-bold mt-1 mb-4">{previousAssessment.timestamp?.toDate().toLocaleDateString()}</p>
                        {/* THE MISSING EYE BUTTON */}
                        <button onClick={() => setSelectedResult(previousAssessment)} className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-white rounded-xl text-xs font-bold text-[#134e4a] hover:bg-gray-200 transition-colors border border-gray-200 shadow-sm">
                          <Eye size={14} /> View Brief
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-gray-200 rounded-3xl opacity-50">
                      <p className="text-sm font-bold text-[#134e4a] uppercase tracking-widest">Initial Audit Baseline Set</p>
                    </div>
                  )}

                  {/* LATEST REPORT */}
                  <div className={`p-6 rounded-3xl shadow-xl border-2 flex flex-col h-full ${latestAssessment.score > (previousAssessment?.score || 0) ? 'border-emerald-500 bg-emerald-50/30' : latestAssessment.score < (previousAssessment?.score || 0) ? 'border-rose-500 bg-rose-50/30' : 'border-[#d4af37] bg-white'} transition-all duration-500`}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xs font-black uppercase tracking-widest text-[#134e4a]">Current Status</h4>
                      {scoreDifference !== null && (
                        <div className={`flex items-center gap-1 font-black px-3 py-1 rounded-full text-[10px] ${scoreDifference >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {scoreDifference >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                          {Math.abs(scoreDifference)} PTS
                        </div>
                      )}
                    </div>
                    <p className="text-5xl font-black text-[#134e4a] font-sora my-2">{latestAssessment.score}</p>
                    <p className="font-bold text-[#d4af37] uppercase text-sm">{latestAssessment.persona}</p>
                    <p className="text-[10px] text-[#64748b] font-bold mt-1 mb-6">Generated {latestAssessment.timestamp?.toDate().toLocaleDateString()}</p>
                    {/* THE MISSING EYE BUTTON */}
                    <button onClick={() => setSelectedResult(latestAssessment)} className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-[#134e4a] text-white rounded-xl text-xs font-bold hover:bg-[#d4af37] hover:text-[#134e4a] transition-colors shadow-lg">
                      <Eye size={14} /> View Full Brief
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* Goal 2: COMPLIANCE MATRIX */}
            <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Compliance Matrix</h3>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] bg-[#d4af37]/10 px-3 py-1 rounded-full">Real-Time Sync</span>
              </div>
              
              <div className="space-y-3">
                {COMPLIANCE_CHECKLIST_ITEMS.map(item => (
                  <button key={item.id} onClick={() => handleToggleCompliance(item.id)} className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${complianceState[item.id] ? 'bg-emerald-50 border-emerald-500/20' : 'bg-gray-50 hover:border-[#d4af37]/50 border-transparent'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-sm ${complianceState[item.id] ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>
                      {complianceState[item.id] ? <CheckSquare size={16}/> : <Square size={16}/>}
                    </div>
                    <span className={`font-bold uppercase text-xs md:text-sm text-left tracking-wide ${complianceState[item.id] ? 'text-emerald-700 line-through opacity-70' : 'text-[#134e4a]'}`}>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 bg-gray-50 p-6 rounded-2xl">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-black uppercase tracking-widest text-[#134e4a]/60">Operational Health</p>
                  <p className={`text-sm font-black ${complianceProgress === 100 ? 'text-emerald-600' : 'text-[#134e4a]'}`}>{Math.round(complianceProgress)}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                  <div className={`h-full rounded-full transition-all duration-1000 ease-out ${complianceProgress === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]' : 'bg-[#d4af37]'}`} style={{width: `${complianceProgress}%`}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Goal 3: SHOWCASE FUTURE VALUE (SOFTWARE ECOSYSTEM) */}
          <div className="lg:col-span-5">
            <div className="bg-[#134e4a] p-8 md:p-10 rounded-[3rem] shadow-2xl text-white border-4 border-[#d4af37]/20 sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Finance OS Roadmap</h2>
              <p className="text-white/60 text-sm font-medium leading-relaxed mb-8">Features unlocked as your Sovereign Membership scales.</p>
              
              <div className="grid grid-cols-1 gap-4">
                {IWS_OS_APPS.map((srv, i) => (
                  <div key={i} className="group relative flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-not-allowed overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-white shadow-inner">
                        {srv.icon}
                      </div>
                      <div>
                        <h4 className="font-black text-sm uppercase tracking-wider text-white/80">{srv.name}</h4>
                        <p className="text-[10px] text-[#d4af37] uppercase tracking-widest">{srv.desc}</p>
                      </div>
                    </div>
                    {/* Lock Icon representing Upsell/Future state */}
                    {srv.locked && (
                      <div className="relative z-10 bg-black/30 p-2 rounded-lg text-white/40">
                         <Lock size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-2xl border border-[#d4af37]/30 text-center relative overflow-hidden">
                <Zap size={24} className="absolute -right-2 -top-2 text-[#d4af37] opacity-20" />
                <p className="text-[10px] font-black text-white uppercase tracking-widest leading-relaxed">Upgrade to automate <br/><span className="text-[#d4af37]">Sovereign State</span></p>
                <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="mt-4 px-6 py-2 bg-[#d4af37] text-[#134e4a] font-black text-[9px] uppercase tracking-widest rounded-full hover:bg-white transition-colors">Request Access</button>
              </div>
            </div>
          </div>
        </div>

        {/* Goal 4: DEEP DIVE INTELLIGENCE (MODAL) */}
        {selectedResult && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
            <div className="bg-white text-[#134e4a] w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] relative">
              
              <div className="flex justify-between items-start mb-8 border-b border-[#134e4a]/10 pb-6 pr-10">
                <div>
                  <p className="text-[#d4af37] font-black uppercase text-[10px] mb-2 tracking-[0.3em]">Historical Record: {selectedResult.timestamp?.toDate().toLocaleDateString()}</p>
                  <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-[#134e4a]">{selectedResult.persona}</h3>
                  <div className="mt-4 inline-flex items-center gap-2 bg-[#134e4a]/5 px-3 py-1.5 rounded-lg border border-[#134e4a]/10">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#64748b]">Total Score:</span>
                    <span className="text-lg font-black text-[#134e4a]">{selectedResult.score} / {selectedResult.maxScore || '24'}</span>
                  </div>
                </div>
                <button onClick={() => setSelectedResult(null)} className="absolute top-8 right-8 p-3 bg-[#f0fdfa] rounded-full hover:bg-gray-200 transition-all text-[#134e4a] hover:rotate-90 duration-300">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-[#134e4a] p-6 md:p-8 rounded-3xl border border-[#134e4a]/10 text-white shadow-inner">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-2">Strategic Diagnosis</p>
                  <p className="text-base font-medium leading-relaxed">{selectedResult.diagnosis}</p>
                </div>

                <div className="space-y-4 pt-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#134e4a]/50 px-2">Raw Assessment Data (Q&A)</p>
                  <div className="grid gap-3">
                    {selectedResult.intelligence_report?.map((item: any, idx: number) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                        <p className="text-xs font-bold text-[#134e4a]/70 mb-2 leading-tight">{item.q}</p>
                        <div className="flex items-start gap-2">
                          <ChevronRight size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" /> 
                          <p className="text-sm font-black text-[#134e4a] leading-tight">{item.a}</p>
                        </div>
                      </div>
                    ))}
                    {!selectedResult.intelligence_report && (
                       <p className="text-sm italic text-gray-500 text-center p-4">Detailed answers not recorded for this legacy entry.</p>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#134e4a]/10 text-center">
                   <button onClick={() => setSelectedResult(null)} className="text-[10px] font-black uppercase tracking-widest text-[#134e4a]/50 hover:text-[#134e4a] transition-colors">Close Record</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
