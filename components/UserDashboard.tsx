import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, Activity, RefreshCcw, Eye, X, ChevronRight, Layout } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [myAssessments, setMyAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchMyData(currentUser.email);
    });
    return () => unsubscribe();
  }, []);

  const fetchMyData = async (email: string) => {
    setLoading(true);
    try {
      // Fetch only records matching the logged-in email
      const q = query(collection(db, 'assessments'), where('email', '==', email));
      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMyAssessments(data.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  if (!user) return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white border border-brand-900/10 p-12 rounded-[3rem] text-center shadow-2xl">
        <div className="w-20 h-20 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl">
           <Layout size={40} />
        </div>
        <h2 className="text-3xl font-black text-brand-900 mb-2 uppercase tracking-tighter">Client Portal</h2>
        <p className="text-brand-900/40 mb-10 text-xs font-bold uppercase tracking-widest leading-relaxed">Login to track your financial vitals and sovereignty progress.</p>
        <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-brand-900 text-white font-black py-5 rounded-2xl hover:bg-brand-gold hover:text-brand-900 transition-all uppercase tracking-widest text-xs shadow-lg">Sign in with Google</button>
        <button onClick={() => window.location.hash = '#home'} className="mt-6 text-[10px] font-black uppercase text-brand-900/40 hover:text-brand-900 tracking-widest transition-colors">Back to Site</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-50 text-brand-900 font-sans pt-12 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-brand-900/10 pb-8">
          <div><h1 className="text-4xl font-black uppercase tracking-tighter leading-none">My Intelligence</h1><p className="text-brand-gold text-xs uppercase mt-2 font-bold tracking-widest">Sovereign Profile: {user.email}</p></div>
          <div className="flex gap-4">
            <button onClick={() => fetchMyData(user.email)} className="p-3 bg-white rounded-full border border-brand-900/10 hover:bg-brand-900 hover:text-white transition-all"><RefreshCcw size={18} className={loading ? 'animate-spin' : ''} /></button>
            <button onClick={() => signOut(auth)} className="px-6 py-3 bg-white text-brand-900 rounded-full text-xs font-black uppercase border border-brand-900/10 hover:bg-rose-500 hover:text-white transition-all">Logout</button>
          </div>
        </div>

        <div className="grid gap-6">
           {myAssessments.length === 0 ? (
             <div className="bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-brand-900/10">
                <p className="text-brand-900/40 font-black uppercase tracking-[0.3em]">No Assessments Saved</p>
                <button onClick={() => window.location.hash = '#assessment'} className="mt-6 text-brand-gold font-black uppercase text-xs hover:underline underline-offset-8">Take your first Audit</button>
             </div>
           ) : (
             myAssessments.map((item) => (
               <div key={item.id} className="bg-white p-8 rounded-[2.5rem] border border-brand-900/5 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-900 font-black text-xl shadow-inner">{item.score}</div>
                     <div>
                        <h4 className="text-xs font-black text-brand-gold uppercase tracking-widest mb-1">{item.timestamp?.toDate().toLocaleDateString()}</h4>
                        <p className="text-xl font-black uppercase text-brand-900 leading-none">{item.persona}</p>
                     </div>
                  </div>
                  <button onClick={() => setSelectedResult(item)} className="w-full md:w-auto px-10 py-4 bg-brand-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-brand-gold hover:text-brand-900 transition-all">
                    View Full Brief <ChevronRight size={14}/>
                  </button>
               </div>
             ))
           )}
        </div>
      </div>

      {selectedResult && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-md">
          <div className="bg-white text-brand-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[85vh] animate-fadeIn">
            <div className="flex justify-between items-start mb-8 border-b border-brand-900/10 pb-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Intelligence Brief</h3>
                <p className="text-brand-gold font-black uppercase text-[10px] mt-2 tracking-widest">{selectedResult.timestamp?.toDate().toLocaleDateString()}</p>
              </div>
              <button onClick={() => setSelectedResult(null)} className="p-2 bg-brand-50 rounded-full hover:bg-brand-100 transition-all"><X /></button>
            </div>
            <div className="space-y-6">
               <div className="bg-brand-50 p-8 rounded-3xl">
                  <div className="space-y-6">
                    {selectedResult.intelligence_report?.map((item: any, idx: number) => (
                       <div key={idx} className="space-y-1">
                          <p className="text-[10px] font-black text-brand-900/30 uppercase">Metric 0{idx + 1}</p>
                          <p className="text-sm font-bold text-brand-900/80 leading-tight">{item.q}</p>
                          <p className="text-sm font-black text-brand-900 flex items-center gap-2 mt-1">
                             <ChevronRight size={14} className="text-brand-gold" /> {item.a}
                          </p>
                       </div>
                    ))}
                  </div>
               </div>
               <button onClick={() => window.open('https://calendly.com/enquiries-integratedwellth/30min', '_blank')} className="w-full bg-brand-gold text-brand-900 py-6 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Book Strategy Review Session</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
