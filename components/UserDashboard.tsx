import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, RefreshCcw, X, ChevronRight, Layout, Calculator, Receipt, Box, FileSpreadsheet, CreditCard } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [myAssessments, setMyAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email) {
        fetchMyData(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchMyData = async (email: string) => {
    setLoading(true);
    try {
      // Query Firebase for assessments linked to this email
      const q = query(collection(db, 'assessments'), where('email', '==', email));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by latest first
      setMyAssessments(data.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
    setLoading(false);
  };

  const UPCOMING_SERVICES = [
    { name: "IWS Books", icon: <Calculator size={28} />, desc: "Automated Ledger" },
    { name: "IWS Expense", icon: <Receipt size={28} />, desc: "Receipt Scanning" },
    { name: "IWS Inventory", icon: <Box size={28} />, desc: "Stock Control" },
    { name: "IWS Invoice", icon: <FileSpreadsheet size={28} />, desc: "Client Billing" },
    { name: "IWS Pay", icon: <CreditCard size={28} />, desc: "Payment Gateway" }
  ];

  if (!user) return (
    <div className="min-h-screen bg-[#f0fdfa] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white border border-[#134e4a]/10 p-12 rounded-[3rem] text-center shadow-2xl">
        <div className="w-20 h-20 bg-[#134e4a] text-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
           <Lock size={40} />
        </div>
        <h2 className="text-3xl font-black text-[#134e4a] mb-2 uppercase tracking-tighter">Client Portal</h2>
        <p className="text-[#134e4a]/60 mb-10 text-xs font-bold uppercase tracking-widest leading-relaxed">Secure access to your Financial Architecture.</p>
        <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-[#134e4a] text-white font-black py-5 rounded-2xl hover:bg-[#d4af37] hover:text-[#134e4a] transition-all uppercase tracking-widest text-xs shadow-lg">Sign in with Google</button>
        <button onClick={() => window.location.hash = '#home'} className="mt-6 text-[10px] font-black uppercase text-[#134e4a]/40 hover:text-[#134e4a] tracking-widest transition-colors">Back to Site</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-[#134e4a] font-sans pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-[#134e4a]/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none font-sora">My Hub</h1>
            <p className="text-[#d4af37] text-xs uppercase mt-3 font-bold tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> {user.email}
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => user?.email && fetchMyData(user.email)} className="p-4 bg-white rounded-2xl shadow-sm border border-[#134e4a]/10 hover:bg-[#134e4a] hover:text-white transition-all">
              <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => signOut(auth)} className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase border border-rose-600/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm">
              Logout
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
           
           {/* LEFT COLUMN: THEIR DATA */}
           <div className="lg:col-span-8 space-y-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter">My Diagnostics</h3>
              {loading ? (
                <div className="bg-white p-20 rounded-[3rem] text-center shadow-sm">
                   <Loader2 className="animate-spin text-[#d4af37] mx-auto mb-4" size={32} />
                   <p className="text-[#134e4a]/40 font-black uppercase tracking-[0.3em]">Syncing Records...</p>
                </div>
              ) : myAssessments.length === 0 ? (
                <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-[#134e4a]/20 shadow-sm">
                    <div className="w-16 h-16 bg-[#f0fdfa] text-[#134e4a] rounded-full flex items-center justify-center mx-auto mb-4"><FileText size={24}/></div>
                    <p className="text-[#134e4a]/60 font-black uppercase tracking-[0.2em] mb-6">No Records Found</p>
                    <button onClick={() => window.location.hash = '#assessment'} className="bg-[#134e4a] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-lg hover:bg-[#d4af37] hover:text-[#134e4a] transition-all">Take Initial Audit</button>
                </div>
              ) : (
                <div className="grid gap-6">
                  {myAssessments.map((item) => (
                    <div key={item.id} className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-[#134e4a]/10 shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                       
                       <div className="flex items-center gap-6 z-10 relative">
                         <div className="w-16 h-16 bg-[#f0fdfa] rounded-2xl flex items-center justify-center text-[#134e4a] font-black text-xl shadow-inner border border-[#134e4a]/10">
                           {item.score}
                         </div>
                         <div>
                            <h4 className="text-xs font-black text-[#d4af37] uppercase tracking-widest mb-1">
                              {item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'Recent'}
                            </h4>
                            <p className="text-xl font-black uppercase text-[#134e4a] leading-none">{item.persona}</p>
                         </div>
                       </div>

                       <button 
                         onClick={() => setSelectedResult(item)} 
                         className="w-full md:w-auto px-10 py-4 bg-[#134e4a] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-[#d4af37] hover:text-[#134e4a] transition-all shadow-lg z-10"
                       >
                         View Full Brief <ChevronRight size={14}/>
                       </button>

                       <div className="absolute -right-10 -bottom-10 text-[120px] font-black text-[#f0fdfa] opacity-50 pointer-events-none select-none">
                         {item.score}
                       </div>
                    </div>
                  ))}
                </div>
              )}
           </div>

           {/* RIGHT COLUMN: UPCOMING SAAS SERVICES */}
           <div className="lg:col-span-4 space-y-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter">Software Ecosystem</h3>
              <div className="bg-[#3E2723] rounded-[3rem] p-8 shadow-2xl relative overflow-hidden text-white border border-[#d4af37]/20">
                 <div className="absolute top-0 right-0 w-40 h-40 bg-[#d4af37]/10 blur-3xl rounded-full pointer-events-none"></div>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#d4af37] mb-6">In Development</p>
                 
                 <div className="grid grid-cols-1 gap-4">
                    {UPCOMING_SERVICES.map((srv, i) => (
                      <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#d4af37]/50 transition-all cursor-not-allowed">
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

                 <div className="mt-8 p-4 bg-[#134e4a]/50 rounded-2xl border border-[#134e4a] text-center">
                    <Lock size={16} className="mx-auto text-[#d4af37] mb-2 opacity-50" />
                    <p className="text-[9px] font-bold text-white/60 uppercase tracking-widest leading-relaxed">Modules will unlock automatically upon release for Sovereign Members.</p>
                 </div>
              </div>
           </div>

        </div>
      </div>

      {/* POPUP BRIEF */}
      {selectedResult && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-[#134e4a]/90 backdrop-blur-md">
          <div className="bg-white text-[#134e4a] w-full max-w-2xl rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] animate-fadeIn">
            <div className="flex justify-between items-start mb-8 border-b border-[#134e4a]/10 pb-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none text-[#134e4a]">{selectedResult.persona}</h3>
                <p className="text-[#d4af37] font-black uppercase text-[10px] mt-2 tracking-widest">
                  Score: {selectedResult.score} / {selectedResult.maxScore}
                </p>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-2 bg-[#f0fdfa] rounded-full hover:bg-gray-200 transition-all text-[#134e4a]"><X /></button>
            </div>

            <div className="space-y-8">
               <div className="bg-[#f0fdfa] p-6 md:p-8 rounded-3xl border border-[#134e4a]/10">
                  <p className="text-lg font-medium italic text-[#134e4a]/80 mb-6 leading-relaxed">
                    "{selectedResult.diagnosis}"
                  </p>
                  
                  <div className="space-y-6 pt-6 border-t border-[#134e4a]/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#134e4a]/40 mb-4">Your Answers</p>
                    {selectedResult.intelligence_report?.map((item: any, idx: number) => (
                       <div key={idx} className="space-y-1">
                          <p className="text-xs font-bold text-[#134e4a]/60 leading-tight">{item.q}</p>
                          <p className="text-sm font-black text-[#134e4a] flex items-center gap-2 mt-1">
                             <ChevronRight size={14} className="text-[#d4af37]" /> {item.a}
                          </p>
                       </div>
                    ))}
                  </div>
               </div>

               <div className="text-center pt-4 border-t border-[#134e4a]/10">
                 <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full bg-[#d4af37] text-[#134e4a] py-6 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl hover:scale-105 transition-all">
                   Book Strategy Review Session
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
