import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, RefreshCcw, Eye, X, Mail, MessageSquare, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [warRoomLeads, setWarRoomLeads] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments'>('warroom');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Allow only your specific admin email
      if (currentUser && currentUser.email === 'integratedwellth@gmail.com') {
        setUser(currentUser);
        fetchData();
      } else {
        setUser(null);
        setLoading(false);
        if (currentUser) {
          setError("Access Denied. This account is not authorized for admin access.");
          signOut(auth);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const wrSnap = await getDocs(collection(db, 'war_room_leads'));
      setWarRoomLeads(wrSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      
      const assSnap = await getDocs(collection(db, 'assessments'));
      setAssessments(assSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err: any) {
      setError("Failed to fetch data: " + err.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err: any) {
      setError('Authentication Failed.');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl text-center shadow-2xl">
          <Lock className="text-brand-gold w-12 h-12 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-widest">Admin Hub</h2>
          <p className="text-white/40 mb-8 text-xs uppercase tracking-widest">Secure Login Required</p>
          {error && <p className="mb-4 p-3 bg-rose-500/10 text-rose-400 text-xs font-bold rounded-lg border border-rose-500/20">{error}</p>}
          <button onClick={handleGoogleLogin} className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-brand-gold transition-all uppercase tracking-widest text-xs">
            Authenticate with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div><h1 className="text-4xl font-black uppercase tracking-tighter">Intelligence Hub</h1><p className="text-brand-gold text-xs uppercase mt-2 font-bold">{user.email}</p></div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="p-3 bg-white/5 rounded-full hover:bg-white/10"><RefreshCcw size={18} className={loading ? 'animate-spin' : ''} /></button>
            <button onClick={() => signOut(auth)} className="px-6 py-3 bg-rose-900/20 text-rose-500 rounded-full text-xs font-black uppercase">Logout</button>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('warroom')} className={`px-8 py-4 rounded-2xl border transition-all font-black text-xs uppercase ${activeTab === 'warroom' ? 'bg-white/10 border-white/20' : 'opacity-40 border-transparent'}`}>War Room ({warRoomLeads.length})</button>
          <button onClick={() => setActiveTab('assessments')} className={`px-8 py-4 rounded-2xl border transition-all font-black text-xs uppercase ${activeTab === 'assessments' ? 'bg-white/10 border-white/20' : 'opacity-40 border-transparent'}`}>Assessments ({assessments.length})</button>
        </div>

        <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/20 text-brand-gold text-[10px] uppercase font-black tracking-widest">
                <tr><th className="px-8 py-6">Date</th><th className="px-8 py-6">Identity</th><th className="px-8 py-6">Business</th><th className="px-8 py-6">Status</th><th className="px-8 py-6 text-center">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === 'warroom' ? warRoomLeads : assessments).map((item) => (
                  <tr key={item.id} className="hover:bg-white/5">
                    <td className="px-8 py-5 font-mono text-xs">{item.timestamp?.toDate().toLocaleDateString()}</td>
                    <td className="px-8 py-5 font-bold">{item.name}</td>
                    <td className="px-8 py-5">{item.enterprise}</td>
                    <td className="px-8 py-5"><span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-black uppercase">{item.segment || item.persona}</span></td>
                    <td className="px-8 py-5 text-center"><button onClick={() => setSelectedLead(item)} className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-900"><Eye size={18}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white text-brand-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[85vh]">
            <div className="flex justify-between items-start mb-8 border-b pb-6">
              <div>
                <h3 className="text-3xl font-black uppercase">{selectedLead.name}</h3>
                <p className="text-brand-gold font-black uppercase text-[10px] mt-2">{selectedLead.enterprise}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 bg-brand-50 rounded-full hover:bg-brand-100"><X /></button>
            </div>
            <div className="space-y-6">
               <div className="bg-brand-50 p-8 rounded-3xl border">
                  <p className="text-[10px] font-black uppercase text-brand-900/40 mb-6 border-b pb-2">Diagnostic Brief</p>
                  <div className="space-y-6">
                    {selectedLead.intelligence_report?.map((item: any, idx: number) => (
                       <div key={idx} className="space-y-1">
                          <p className="text-xs font-bold text-brand-900/60">{item.q}</p>
                          <p className="text-sm font-black text-brand-900 flex items-center gap-2 mt-1"><ChevronRight size={14} className="text-brand-gold" /> {item.a}</p>
                       </div>
                    ))}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl font-black uppercase text-xs"><Mail size={16}/> Email Lead</a>
                  {selectedLead.whatsapp && <a href={`https://wa.me/${selectedLead.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase text-xs"><MessageSquare size={16}/> WhatsApp</a>}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
