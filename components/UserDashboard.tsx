import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot, query, where, doc, setDoc, getDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, RefreshCcw, X, ChevronRight, Layout, Calculator, Receipt, Box, FileSpreadsheet, CreditCard, Loader2, Calendar, CheckSquare, Square, TrendingUp, TrendingDown, Zap } from 'lucide-react';

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
        // Set up real-time listeners for both collections
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
                // Initialize if doesn't exist
                setComplianceState(COMPLIANCE_CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.id]: false }), {}));
            }
        });

        setLoading(false);
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
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-[#134e4a] text-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
          <h2 className="text-3xl font-black text-[#134e4a] mb-2 uppercase">Client Portal</h2>
          <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-[#134e4a] text-white font-black py-5 rounded-2xl hover:bg-[#d4af37] hover:text-[#134e4a] transition-all uppercase text-xs shadow-lg mt-8">Sign in with Google</button>
        </div>
      </div>
    );
  }

  const latestAssessment = myAssessments[myAssessments.length - 1];
  const previousAssessment = myAssessments[myAssessments.length - 2];
  const scoreDifference = latestAssessment && previousAssessment ? latestAssessment.score - previousAssessment.score : null;

  const IWS_OS_APPS = [
    { name: 'IWS Invoice', icon: <FileSpreadsheet size={28} />, desc: 'Automated Ledger' },
    { name: 'IWS Expense', icon: <Receipt size={28} />, desc: 'Receipt Scanning' },
    { name: 'IWS Inventory', icon: <Box size={28} />, desc: 'Stock Control' },
    { name: 'IWS Billing', icon: <CreditCard size={28} />, desc: 'Client Billing' },
  ];

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-[#134e4a] font-sans pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><p className="text-[#d4af37] text-xs uppercase font-bold tracking-widest">Sovereignty Hub Active</p></div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none font-sora">Command Center</h1>
          </div>
          <button onClick={() => signOut(auth)} className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase border border-rose-600/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm">Logout</button>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
           
           {/* LEFT COLUMN: MY PROGRESS & CHECKLIST */}
           <div className="lg:col-span-7 space-y-12">
              
              {/* MY PROGRESS: THEN VS NOW */}
              <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">My Progress</h3>
                
                {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-brand-gold" size={32}/></div> : myAssessments.length === 0 ? (
                  <div className="text-center p-10 border-2 border-dashed rounded-2xl">
                     <p className="font-bold text-[#134e4a]/50 uppercase tracking-widest text-xs">No Assessments Found</p>
                     <button onClick={onTriggerAssessment} className="mt-4 text-brand-gold font-black uppercase text-xs">Take Audit</button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* PREVIOUS REPORT */}
                    {previousAssessment ? (
                      <div className="opacity-70">
                        <h4 className="text-xs font-black uppercase tracking-widest mb-2 text-[#134e4a]/60">Previous Report</h4>
                        <div className="bg-gray-100 p-6 rounded-2xl shadow-inner text-center border border-gray-200">
                          <p className="text-4xl font-black text-[#134e4a]/50">{previousAssessment.score}</p>
                          <p className="font-bold text-[#134e4a]/50 uppercase text-xs">{previousAssessment.persona}</p>
                          <p className="text-[10px] text-[#64748b] font-bold mt-1">{previousAssessment.timestamp?.toDate().toLocaleDateString()}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="md:col-span-2 text-center">
                         <p className="text-xl font-bold text-[#134e4a]">Initial Assessment Taken</p>
                      </div>
                    )}
                    
                    {/* LATEST REPORT (Highlighted) */}
                    <div className={`p-6 rounded-3xl shadow-xl border-2 ${latestAssessment.score > (previousAssessment?.score || 0) ? 'border-emerald-500 bg-emerald-50' : latestAssessment.score < (previousAssessment?.score || 0) ? 'border-rose-500 bg-rose-50' : 'border-[#d4af37] bg-white'} transition-all duration-500`}>
                       <div className="flex justify-between items-center">
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#134e4a]/70">Latest Report</h4>
                          {scoreDifference !== null && (
                            <div className={`flex items-center gap-1 font-bold text-sm ${scoreDifference >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                               {scoreDifference >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={14} />}
                               {Math.abs(scoreDifference)} PTS
                            </div>
                         )}
                       </div>
                       <p className="text-4xl font-black text-[#134e4a] font-sora my-2">{latestAssessment.score}</p>
                       <p className="font-bold text-[#d4af37] uppercase text-sm">{latestAssessment.persona}</p>
                       <p className="text-[10px] text-[#64748b] mt-1">{latestAssessment.timestamp?.toDate().toLocaleDateString()}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* COMPLIANCE MATRIX - INTERACTIVE */}
              <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Compliance Matrix</h3>
                <div className="space-y-4">
                  {COMPLIANCE_CHECKLIST_ITEMS.map(item => (
                    <button key={item.id} onClick={() => handleToggleCompliance(item.id)} className="w-full flex items-center gap-4 p-4 bg-brand-50/50 rounded-2xl border-2 border-transparent hover:border-[#d4af37]/50 transition-all duration-300">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${complianceState[item.id] ? 'bg-emerald-500 text-white' : 'bg-white/50 text-gray-400'}`}>
                        {complianceState[item.id] ? <CheckSquare size={16}/> : <Square size={16}/>}
                      </div>
                      <span className={`font-bold uppercase text-sm text-left ${complianceState[item.id] ? 'text-[#134e4a]/50 line-through' : 'text-[#134e4a]'}`}>{item.label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-8">
                   <p className="text-xs font-black uppercase tracking-widest text-center mb-2 text-[#134e4a]/50">Overall Health</p>
                   <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden border border-gray-300">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{width: `${complianceProgress}%`}}></div>
                   </div>
                </div>
            </div>
           </div>
           
           {/* RIGHT COLUMN: SOFTWARE ECOSYSTEM */}
           <div className="lg:col-span-5">
            <div className="bg-[#134e4a] p-8 rounded-[3rem] shadow-2xl text-white border-4 border-[#d4af37]/20 sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Finance OS Roadmap</h2>
              
              <div className="grid grid-cols-1 gap-4">
                    {[
                       { name: 'IWS Invoice', icon: <FileSpreadsheet size={24} />, desc: 'Client Billing' },
                       { name: 'IWS Books', icon: <Calculator size={24} />, desc: 'Automated Ledger' },
                       { name: 'IWS Expense', icon: <Receipt size={24} />, desc: 'Receipt Scanning' },
                       { name: 'IWS Inventory', icon: <Box size={24} />, desc: 'Stock Control' },
                    ].map((srv, i) => (
                      <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#d4af37]/50 transition-all cursor-not-allowed">
                         <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-white group-hover:text-[#d4af37] group-hover:scale-110 transition-all shadow-inner">
                            {srv.icon}
                         </div>
                         <div>
                            <h4 className="font-black text-sm uppercase tracking-wider">{srv.name}</h4>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest">{srv.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>

                 <div className="mt-8 p-4 bg-brand-gold/10 rounded-2xl border border-[#d4af37]/20 text-center">
                    <Zap size={16} className="mx-auto text-[#d4af37] mb-2 opacity-80" />
                    <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">This is your future: Fully integrated, automated Sovereign State.</p>
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* DETAIL MODAL */}
      {selectedResult && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white text-[#134e4a] w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] animate-fadeIn">
            <div className="flex justify-between items-start mb-8 border-b border-[#134e4a]/10 pb-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-[#134e4a]">{selectedResult.persona}</h3>
                <p className="text-[#d4af37] font-black uppercase text-[10px] mt-2 tracking-widest">{selectedResult.timestamp?.toDate().toLocaleDateString()}</p>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-2 bg-[#f0fdfa] rounded-full hover:bg-gray-200 transition-all text-[#134e4a] hover:rotate-90 duration-300"><X /></button>
            </div>
            <div className="space-y-6">
               <div className="bg-[#f0fdfa] p-6 md:p-8 rounded-3xl border border-[#134e4a]/10">
                  <p className="text-lg font-medium italic text-[#134e4a]/80 mb-6 leading-relaxed">{selectedResult.diagnosis}</p>
                  
                  <div className="space-y-6 pt-6 border-t border-[#134e4a]/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#134e4a]/40 mb-4">Discovery Trail</p>
                    {selectedResult.intelligence_report?.map((item: any, idx: number) => (
                       <div key={idx} className="space-y-1">
                          <p className="text-xs font-bold text-[#134e4a]/60">{item.q}</p>
                          <p className="text-sm font-black text-[#134e4a] flex items-center gap-2 mt-1"><ChevronRight size={14} className="text-[#d4af37]" /> {item.a}</p>
                       </div>
                    ))}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href={`mailto:${selectedResult.email}`} className="flex items-center justify-center gap-3 bg-[#134e4a] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#d4af37] hover:text-[#134e4a] transition-all"><Mail size={16}/> Email</a>
                  {selectedResult.whatsapp && <a href={`https://wa.me/${selectedResult.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase text-xs hover:opacity-90 transition-all"><MessageSquare size={16}/> WhatsApp</a>}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
