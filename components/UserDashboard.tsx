import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot, query, where, doc, setDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, Calculator, Receipt, Box, FileSpreadsheet, Loader2, CheckSquare, Square, TrendingUp, TrendingDown, Zap, Eye, ShieldCheck, Calendar, ArrowRight, X } from 'lucide-react';

const COMPLIANCE_CHECKLIST_ITEMS = [
  { id: 'cipc', label: 'CIPC Annual Return Filed' },
  { id: 'sars_prov', label: 'Provisional Tax Submitted (IRP6)' },
  { id: 'sars_vat', label: 'VAT Returns Up to Date' },
  { id: 'paye', label: 'PAYE/UIF Reconciliations Complete' },
];

const UPCOMING_DEADLINES_SUMMARY = [
  { date: "28 Feb", title: "Provisional Tax (IRP6)", type: "Critical" },
  { date: "31 Mar", title: "CIPC Annual Returns", type: "Critical" },
];

const IWS_OS_APPS = [
  { name: 'IWS Invoice', icon: <FileSpreadsheet size={24} />, desc: 'Client Billing', locked: true },
  { name: 'IWS Books', icon: <Calculator size={24} />, desc: 'Automated Ledger', locked: true },
  { name: 'IWS Expense', icon: <Receipt size={24} />, desc: 'Receipt Scanning', locked: true },
  { name: 'IWS Inventory', icon: <Box size={24} />, desc: 'Stock Control', locked: true },
];

export interface UserDashboardProps {
  onTriggerAssessment?: () => void;
}

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
        const qAssessments = query(collection(db, 'assessments'), where('userId', '==', currentUser.uid));
        const unsubAssessments = onSnapshot(qAssessments, (snap) => {
          const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMyAssessments(data.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
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
    const currentVal = !!complianceState[itemId];
    const newVal = !currentVal;
    setComplianceState(prev => ({ ...prev, [itemId]: newVal }));
    try {
      const complianceDocRef = doc(db, 'compliance_states', user.uid);
      await setDoc(complianceDocRef, { [itemId]: newVal }, { merge: true });
    } catch (error) {
      setComplianceState(prev => ({ ...prev, [itemId]: currentVal }));
    }
  };

  const complianceProgress = (Object.values(complianceState).filter(Boolean).length / COMPLIANCE_CHECKLIST_ITEMS.length) * 100 || 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0fdfa] flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full animate-fadeIn">
          <div className="w-20 h-20 bg-[#134e4a] text-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
          <h2 className="text-3xl font-black text-[#134e4a] mb-2 uppercase tracking-tighter">Client Portal</h2>
          <p className="text-[#64748b] font-medium text-sm">Access your personalized security and progress reports.</p>
          <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-[#134e4a] text-white font-black py-5 rounded-2xl hover:bg-[#d4af37] hover:text-[#134e4a] transition-all uppercase tracking-widest text-xs shadow-lg mt-8">Secure Login</button>
        </div>
      </div>
    );
  }

  const latestAssessment = myAssessments[0];
  const previousAssessment = myAssessments[1];
  const scoreDifference = latestAssessment && previousAssessment ? latestAssessment.score - previousAssessment.score : null;

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-[#134e4a] font-sans pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[#d4af37] text-xs uppercase font-bold tracking-widest">Sovereignty Hub Active</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none font-sora">Quarterly Business Review</h1>
          </div>
          <button onClick={() => signOut(auth)} className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase tracking-widest border border-rose-600/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm">Logout</button>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10 relative overflow-hidden">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Strategic Progress</h3>
              {loading ? (
                <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#d4af37]" size={32} /></div>
              ) : myAssessments.length === 0 ? (
                <div className="text-center p-10 border-2 border-dashed border-[#134e4a]/20 rounded-3xl bg-[#f0fdfa]/50">
                  <ShieldCheck size={40} className="mx-auto text-[#134e4a]/30 mb-4" />
                  <p className="font-bold text-[#134e4a]/50 uppercase tracking-widest text-xs">No Diagnostics Found</p>
                  <button onClick={onTriggerAssessment} className="mt-6 px-8 py-4 bg-[#134e4a] text-white rounded-xl text-[10px] tracking-widest hover:bg-[#d4af37] hover:text-[#134e4a] transition-colors font-black uppercase shadow-lg">Initiate Baseline Audit</button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                  {previousAssessment ? (
                    <div className="opacity-60 hover:opacity-100 transition-opacity flex flex-col h-full">
                      <h4 className="text-xs font-black uppercase tracking-widest mb-3 text-[#134e4a]/60">Previous Quarter</h4>
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 flex-grow flex flex-col">
                        <p className="text-4xl font-black text-[#134e4a]/50 font-sora">{previousAssessment.score}</p>
                        <p className="font-bold text-[#134e4a]/60 uppercase text-xs mt-2">{previousAssessment.persona}</p>
                        <p className="text-[10px] text-[#64748b] font-bold mt-1 mb-4">{previousAssessment.timestamp?.toDate().toLocaleDateString()}</p>
                        <button onClick={() => setSelectedResult(previousAssessment)} className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-white rounded-xl text-xs font-bold text-[#134e4a] hover:bg-gray-200 transition-colors border border-gray-200 shadow-sm"><Eye size={14} /> View Brief</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center text-center p-6 border-2 border-dashed border-gray-200 rounded-3xl opacity-50">
                      <p className="text-sm font-bold text-[#134e4a] uppercase tracking-widest">Initial Audit Baseline Set</p>
                    </div>
                  )}
                  <div className="p-6 rounded-3xl shadow-xl border-2 flex flex-col h-full border-[#d4af37] bg-white">
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
                    <button onClick={() => setSelectedResult(latestAssessment)} className="mt-auto flex items-center justify-center gap-2 w-full py-3 bg-[#134e4a] text-white rounded-xl text-xs font-bold hover:bg-[#d4af37] hover:text-[#134e4a] transition-colors shadow-lg"><Eye size={14} /> View Full Brief</button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
              <div className="flex justify-between items-end mb-8">
                <h3 className="text-2xl font-black uppercase tracking-tighter">Compliance Hub</h3>
                <button onClick={() => window.location.hash = '#compliance-calendar'} className="text-[10px] font-black uppercase tracking-widest text-[#d4af37] hover:text-[#134e4a] flex items-center gap-1 transition-colors">View Full Calendar <ArrowRight size={12} /></button>
              </div>
              <div className="space-y-3 mb-8">
                <p className="text-xs font-bold text-[#134e4a]/60 uppercase tracking-widest mb-2">My Task List</p>
                {COMPLIANCE_CHECKLIST_ITEMS.map(item => (
                  <button key={item.id} onClick={() => handleToggleCompliance(item.id)} type="button" className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${complianceState[item.id] ? 'bg-emerald-50 border-emerald-500/20' : 'bg-gray-50 hover:border-[#d4af37]/50 border-transparent'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 shadow-sm ${complianceState[item.id] ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200 text-gray-400'}`}>{complianceState[item.id] ? <CheckSquare size={16} /> : <Square size={16} />}</div>
                    <span className={`font-bold uppercase text-xs md:text-sm text-left tracking-wide ${complianceState[item.id] ? 'text-emerald-700 line-through opacity-70' : 'text-[#134e4a]'}`}>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#134e4a]/40">Task Completion</p>
                  <p className={`text-xs font-black ${complianceProgress === 100 ? 'text-emerald-600' : 'text-[#134e4a]'}`}>{Math.round(complianceProgress)}%</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-1000 ease-out ${complianceProgress === 100 ? 'bg-emerald-500' : 'bg-[#d4af37]'}`} style={{ width: `${complianceProgress}%` }}></div>
                </div>
              </div>
              <div className="bg-brand-900/5 rounded-2xl p-6 border border-brand-900/5">
                <div className="flex justify-between items-center mb-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-900/40">Upcoming Deadlines</p>
                  <Calendar size={14} className="text-brand-900/40" />
                </div>
                <div className="space-y-3">
                  {UPCOMING_DEADLINES_SUMMARY.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-brand-900/5 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#134e4a]/10 text-[#134e4a] px-2 py-1 rounded text-[10px] font-black uppercase">{item.date}</div>
                        <p className="text-xs font-bold text-[#134e4a]">{item.title}</p>
                      </div>
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">{item.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#134e4a] p-8 md:p-10 rounded-[3rem] shadow-2xl text-white border-4 border-[#d4af37]/20 sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Finance OS Roadmap</h2>
              <p className="text-white/60 text-sm font-medium leading-relaxed mb-8">Features unlocked as your Sovereign Membership scales.</p>
              <div className="grid grid-cols-1 gap-4">
                {IWS_OS_APPS.map((srv, i) => (
                  <div key={i} className="group relative flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-not-allowed overflow-hidden">
                    <div className="flex items-center gap-4 relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-white shadow-inner">{srv.icon}</div>
                      <div>
                        <h4 className="font-black text-sm uppercase tracking-wider text-white/80">{srv.name}</h4>
                        <p className="text-[10px] text-[#d4af37] uppercase tracking-widest">{srv.desc}</p>
                      </div>
                    </div>
                    {srv.locked && <div className="relative z-10 bg-black/30 p-2 rounded-lg text-white/40"><Lock size={16} /></div>}
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-[#d4af37]/20 to-transparent rounded-2xl border border-[#d4af37]/30 text-center relative overflow-hidden">
                <Zap size={24} className="absolute -right-2 -top-2 text-[#d4af37] opacity-20" />
                <p className="text-[10px] font-black text-white uppercase tracking-widest leading-relaxed">Upgrade to automate <br /><span className="text-[#d4af37]">Sovereign State</span></p>
                <button onClick={() => window.open('https://calendly.com/marcia-kgaphola/new-meeting', '_blank')} className="mt-4 px-6 py-2 bg-[#d4af37] text-[#134e4a] font-black text-[9px] uppercase tracking-widest rounded-full hover:bg-white transition-colors">Request Access</button>
              </div>
            </div>
          </div>
        </div>

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
                <button onClick={() => setSelectedResult(null)} className="absolute top-8 right-8 p-3 bg-[#f0fdfa] rounded-full hover:bg-gray-200 transition-all text-[#134e4a] hover:rotate-90 duration-300"><X size={20} /></button>
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
                          <ArrowRight size={16} className="text-[#d4af37] flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-black text-[#134e4a] leading-tight">{item.a}</p>
                        </div>
                      </div>
                    ))}
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
