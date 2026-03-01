import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot, query, where, doc, setDoc } from 'firebase/firestore'; // Replaced updateDoc with setDoc
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, RefreshCcw, X, ChevronRight, Layout, Calculator, Receipt, Box, FileSpreadsheet, CreditCard, Loader2, Calendar, CheckSquare, Square, TrendingUp, TrendingDown } from 'lucide-react';

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

  useEffect(() => {
    let unsubscribe: () => void = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.uid) {
        unsubscribe = fetchMyData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });
    
    return () => {
      unsubscribeAuth();
      unsubscribe();
    };
  }, []);

  const fetchMyData = (userId: string) => {
    setLoading(true);
    const qAssessments = query(collection(db, 'assessments'), where('userId', '==', userId));
    const unsubAssessments = onSnapshot(qAssessments, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyAssessments(data.sort((a: any, b: any) => (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0)));
      setLoading(false);
    });

    const complianceDocRef = doc(db, 'compliance_states', userId);
    const unsubCompliance = onSnapshot(complianceDocRef, (docSnap) => {
        if (docSnap.exists()) {
            setComplianceState(docSnap.data());
        }
    });

    return () => {
      unsubAssessments();
      unsubCompliance();
    };
  };

  const handleToggleCompliance = async (itemId: string) => {
    if (!user) return;
    const newState = { ...complianceState, [itemId]: !complianceState[itemId] };
    const complianceDocRef = doc(db, 'compliance_states', user.uid);
    // THE FIX: Use setDoc with merge option, which is the correct syntax
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

  return (
    <div className="min-h-screen bg-[#f0fdfa] text-[#134e4a] font-sans pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><p className="text-[#d4af37] text-xs uppercase font-bold tracking-widest">Client Hub Active</p></div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none font-sora">Command Center</h1>
            <p className="text-[#134e4a]/60 text-sm mt-2 font-medium">{user.displayName || user.email}</p>
          </div>
          <button onClick={() => signOut(auth)} className="px-8 py-4 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase border border-rose-600/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm">Logout</button>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
           
           <div className="lg:col-span-7 space-y-12">
              <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
                {/* RENAMED to "My Progress" */}
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">My Progress</h3>
                {loading ? <div className="flex justify-center py-10"><Loader2 className="animate-spin text-brand-gold"/></div> : myAssessments.length > 0 ? (
                  <div className="relative pt-10">
                    <div className="absolute left-4 top-[58px] bottom-0 w-1 bg-[#134e4a]/5 rounded-full"></div>
                    <div className="space-y-8">
                      {myAssessments.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-6">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg z-10 ${item.score >= 28 ? 'bg-emerald-500' : item.score >= 15 ? 'bg-brand-gold' : 'bg-rose-500'}`}>{item.score}</div>
                           <div>
                              <p className="font-black text-lg uppercase tracking-tight">{item.persona}</p>
                              <p className="text-xs text-[#134e4a]/60 font-bold uppercase">{item.timestamp?.toDate().toLocaleDateString()}</p>
                           </div>
                           {index > 0 && myAssessments[index-1] && (
                               <div className={`ml-auto flex items-center gap-2 font-bold text-xs ${item.score > myAssessments[index-1].score ? 'text-emerald-600' : 'text-rose-600'}`}>
                                  {item.score > myAssessments[index-1].score ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                                  {item.score - myAssessments[index-1].score} PTS
                               </div>
                           )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-10 border-2 border-dashed rounded-2xl">
                     <p className="font-bold text-[#134e4a]/50 uppercase tracking-widest text-xs">No assessments yet.</p>
                     <button onClick={onTriggerAssessment} className="mt-4 text-brand-gold font-black uppercase text-xs">Take your first audit</button>
                  </div>
                )}
              </div>
           </div>
           
           <div className="lg:col-span-5">
            <div className="bg-[#134e4a] p-8 rounded-[3rem] shadow-2xl text-white border-4 border-[#d4af37]/20 sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Compliance Matrix</h2>
              <div className="space-y-4">
                {COMPLIANCE_CHECKLIST_ITEMS.map(item => (
                  <button key={item.id} onClick={() => handleToggleCompliance(item.id)} className="w-full flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-2 border-transparent hover:border-brand-gold transition-all">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${complianceState[item.id] ? 'bg-emerald-500 text-white' : 'bg-white/10 text-white/30'}`}>
                      {complianceState[item.id] ? <CheckSquare size={16}/> : <Square size={16}/>}
                    </div>
                    <span className={`font-bold uppercase text-sm text-left ${complianceState[item.id] ? 'text-gray-400 line-through' : 'text-white'}`}>{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8">
                   <p className="text-xs font-black uppercase tracking-widest text-center mb-2 text-white/50">Overall Health</p>
                   <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{width: `${complianceProgress}%`}}></div>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
