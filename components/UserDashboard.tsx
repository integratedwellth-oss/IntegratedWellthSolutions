import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, RefreshCcw, X, ChevronRight, Layout, Calculator, Receipt, Box, FileSpreadsheet, CreditCard, Loader2, Calendar, FileType, DollarSign, Building } from 'lucide-react';

export interface UserDashboardProps {
  onTriggerAssessment?: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onTriggerAssessment }) => {
  const [user, setUser] = useState<any>(null);
  const [myAssessments, setMyAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeApp, setActiveApp] = useState('invoice');

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
    const q = query(collection(db, 'assessments'), where('email', '==', email), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyAssessments(data);
      setLoading(false);
    });
    return () => unsubscribe();
  };

  const IWS_OS_APPS = [
    { id: 'invoice', name: 'IWS Invoice', icon: <FileSpreadsheet size={24} /> },
    { id: 'books', name: 'IWS Books', icon: <Calculator size={24} /> },
    { id: 'inventory', name: 'IWS Inventory', icon: <Box size={24} /> },
    { id: 'expense', name: 'IWS Expense', icon: <Receipt size={24} /> },
  ];

  const COMPLIANCE_ITEMS = [
    { name: 'CIPC Annual', status: 'Verified', date: 'Mar 31, 2026' },
    { name: 'SARS VAT', status: 'Verified', date: 'Feb 25, 2026' },
    { name: 'PAYE/UIF', status: 'Verified', date: 'Monthly' },
    { name: 'COIDA', status: 'Action Required', date: 'Apr 30, 2026' },
  ];

  if (!user) return (
    <div className="min-h-screen bg-[#f0fdfa] flex items-center justify-center p-6 text-center">
      <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full">
        <div className="w-20 h-20 bg-[#134e4a] text-[#d4af37] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl"><Lock size={40} /></div>
        <h2 className="text-3xl font-black text-[#134e4a] mb-2 uppercase">Client Portal</h2>
        <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-[#134e4a] text-white font-black py-5 rounded-2xl hover:bg-[#d4af37] hover:text-[#134e4a] transition-all uppercase text-xs shadow-lg mt-8">Sign in with Google</button>
        <button onClick={() => window.location.hash = '#home'} className="mt-6 text-[10px] font-black uppercase text-[#134e4a]/40 hover:text-[#134e4a]">Back to Site</button>
      </div>
    </div>
  );
  
  const latestAssessment = myAssessments[0];

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
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none font-sora">Command Center</h1>
            <p className="text-[#134e4a]/60 text-sm mt-2 font-medium">POPIA Compliant Environment.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="px-6 py-4 bg-white rounded-2xl shadow-sm border border-[#134e4a]/10 text-xs font-black uppercase tracking-widest hover:bg-[#134e4a] hover:text-white transition-all flex items-center gap-2"><Calendar size={16}/> Book Strategy</button>
            <button onClick={() => user?.email && fetchMyData(user.email)} className="p-4 bg-white rounded-2xl shadow-sm border border-[#134e4a]/10 hover:bg-[#134e4a] hover:text-white transition-all"><RefreshCcw size={18} className={loading ? 'animate-spin' : ''} /></button>
            <button onClick={() => signOut(auth)} className="px-6 py-4 bg-white text-rose-600 rounded-2xl text-xs font-black uppercase border border-rose-600/20 hover:bg-rose-600 hover:text-white transition-all shadow-sm">Logout</button>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* LEFT: IWS FINANCE OS & STRATEGIC VAULT */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* IWS Finance OS */}
            <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">IWS Finance OS</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {IWS_OS_APPS.map(app => (
                  <button 
                    key={app.id} 
                    onClick={() => setActiveApp(app.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-center ${activeApp === app.id ? 'bg-[#d4af37]/20 border-[#d4af37]' : 'bg-brand-50/50 border-transparent hover:border-[#134e4a]/20'}`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${activeApp === app.id ? 'bg-[#134e4a] text-[#d4af37]' : 'bg-white text-[#134e4a]'}`}>{app.icon}</div>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${activeApp === app.id ? 'text-[#134e4a]' : 'text-[#134e4a]/60'}`}>{app.name}</p>
                  </button>
                ))}
              </div>
              <div className="bg-brand-50/50 p-6 rounded-2xl flex items-center justify-between shadow-inner">
                <p className="text-sm font-bold text-[#134e4a]/70">Ready for IWS Invoice Action.</p>
                <button className="px-6 py-3 bg-[#134e4a] text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-[#3E2723] transition-all">Launch Dashboard</button>
              </div>
            </div>

            {/* Strategic Vault */}
            <div className="bg-white p-8 rounded-[3rem] shadow-lg border border-[#134e4a]/10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Strategic Vault</h2>
                <Lock size={16} className="text-[#d4af37]"/>
              </div>
              <div className="bg-brand-50/50 p-6 rounded-2xl shadow-inner text-center">
                <p className="text-sm font-bold text-[#134e4a]/70">End-to-End Encrypted Storage Coming Soon...</p>
              </div>
            </div>
          </div>
          
          {/* RIGHT: COMPLIANCE MATRIX */}
          <div className="lg:col-span-4">
            <div className="bg-[#134e4a] p-8 rounded-[3rem] shadow-2xl text-white border-4 border-[#d4af37]/20 sticky top-32">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center text-brand-gold">
                  <ShieldCheck size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Compliance Matrix</h2>
              </div>

              <div className="space-y-6">
                {COMPLIANCE_ITEMS.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/10">
                    <div>
                      <p className="font-black uppercase text-sm tracking-wide">{item.name}</p>
                      <p className={`text-xs font-bold ${item.status === 'Verified' ? 'text-emerald-400' : 'text-rose-400'}`}>Status: {item.status}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${item.status === 'Verified' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></div>
                  </div>
                ))}
              </div>
              
              {/* LATEST ASSESSMENT SCORE */}
              <div className="mt-10 bg-black/20 p-6 rounded-2xl border border-white/10">
                 {latestAssessment ? (
                    <div>
                        <p className="text-xs font-black uppercase text-brand-gold tracking-widest mb-2">Latest Diagnostic</p>
                        <p className="text-2xl font-black uppercase leading-none">{latestAssessment.persona}</p>
                        <p className="text-sm text-white/50 font-bold">Score: {latestAssessment.score} / {latestAssessment.maxScore}</p>
                    </div>
                 ) : (
                    <div>
                        <p className="text-xs font-black uppercase text-white/50 tracking-widest">No Assessment Data</p>
                        <button onClick={() => onTriggerAssessment && onTriggerAssessment()} className="text-brand-gold font-bold mt-2 hover:underline">Take your audit now</button>
                    </div>
                 )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
