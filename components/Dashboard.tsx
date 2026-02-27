import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, RefreshCcw, Eye, X, Mail, MessageSquare, ChevronRight, Loader2 } from 'lucide-react';
import { generateCSVExport } from '../services/exportService';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [warRoomLeads, setWarRoomLeads] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments'>('warroom');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const wrQuery = query(collection(db, 'war_room_leads'), orderBy('timestamp', 'desc'));
      const wrSnap = await getDocs(wrQuery);
      setWarRoomLeads(wrSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const assQuery = query(collection(db, 'assessments'), orderBy('timestamp', 'desc'));
      const assSnap = await getDocs(assQuery);
      setAssessments(assSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white/5 border border-white/10 p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full">
          <Lock className="text-brand-gold w-12 h-12 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8">Admin Hub Access</h2>
          <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-brand-gold transition-all uppercase tracking-widest text-xs">Sign in with Google</button>
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
          <button onClick={() => setActiveTab('warroom')} className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'warroom' ? 'bg-white/10 text-white' : 'bg-transparent text-white/50'}`}>
            <ShieldAlert size={16} /> War Room Leads ({warRoomLeads.length})
          </button>
          <button onClick={() => setActiveTab('assessments')} className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'assessments' ? 'bg-white/10 text-white' : 'bg-transparent text-white/50'}`}>
            <FileText size={16} /> Assessments ({assessments.length})
          </button>
        </div>

        <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/20 text-brand-gold text-[10px] uppercase font-black tracking-widest">
                <tr><th className="px-8 py-6">Date</th><th className="px-8 py-6">Identity</th><th className="px-8 py-6">Business</th><th className="px-8 py-6">Status</th><th className="px-8 py-6 text-center">Intel Brief</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(loading) ? (
                  <tr><td colSpan={5} className="text-center py-20"><Loader2 className="animate-spin text-white/50 mx-auto" /></td></tr>
                ) : (activeTab === 'warroom' ? warRoomLeads : assessments).length === 0 ? (
                  <tr><td colSpan={5} className="text-center py-20 text-white/30 uppercase text-xs font-bold">No Data Streams for this Segment</td></tr>
                ) : (activeTab === 'warroom' ? warRoomLeads : assessments).map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-8 py-5 font-mono text-xs text-white/40">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
                    <td className="px-8 py-5 font-bold text-white">{item.name}</td>
                    <td className="px-8 py-5 text-white/60">{item.enterprise}</td>
                    <td className="px-8 py-5"><span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-black uppercase border border-brand-gold/20">{item.segment || item.persona}</span></td>
                    <td className="px-8 py-5 text-center"><button onClick={() => setSelectedLead(item)} className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-900 transition-all"><Eye size={18}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white text-brand-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[85vh] animate-fadeIn">
            <div className="flex justify-between items-start mb-8 border-b border-brand-900/10 pb-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedLead.name}</h3>
                <p className="text-brand-gold font-black uppercase text-[10px] mt-2 tracking-widest">{selectedLead.enterprise}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 bg-brand-50 rounded-full hover:bg-brand-100 transition-all text-brand-900"><X /></button>
            </div>
            <div className="space-y-6">
               <div className="bg-brand-50 p-8 rounded-3xl border border-brand-900/5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-900/40 mb-6 border-b border-brand-900/5 pb-2">Full Discovery Brief</p>
                  
                  {/* DYNAMICALLY RENDER BRIEF BASED ON TYPE */}
                  <div className="space-y-6">
                    {selectedLead.intelligence_report && Array.isArray(selectedLead.intelligence_report) ? (
                        selectedLead.intelligence_report.map((item: any, idx: number) => (
                           <div key={idx} className="space-y-1">
                              <p className="text-xs font-bold text-brand-900/60 leading-tight">{item.q}</p>
                              <p className="text-sm font-black text-brand-900 flex items-center gap-2 mt-1"><ChevronRight size={14} className="text-brand-gold" /> {item.a}</p>
                           </div>
                        ))
                    ) : selectedLead.data ? (
                           <div className="space-y-4">
                              <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-900/5"><p className="text-[10px] font-black text-brand-900/30 uppercase mb-1">Risk Status</p><p className="font-black text-brand-900">{selectedLead.data.risk_level}</p></div>
                              <div className="p-4 bg-white rounded-2xl shadow-sm border border-brand-900/5"><p className="text-[10px] font-black text-brand-900/30 uppercase mb-1">Critical Threat</p><p className="font-bold text-rose-600">{selectedLead.data.pain_point}</p></div>
                              <div className="p-4 bg-brand-900 rounded-2xl shadow-sm"><p className="text-[10px] font-black text-white/30 uppercase mb-1">Required Solution</p><p className="font-black text-brand-gold uppercase">{selectedLead.data.recommended_solution}</p></div>
                           </div>
                        ) : <p className="text-xs italic text-brand-900/40 text-center">No detailed data stream available for this entry.</p>
                    }
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center justify-center gap-3 bg-brand-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all"><Mail size={16}/> Email Lead</a>
                  {selectedLead.whatsapp && <a href={`https://wa.me/${selectedLead.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:opacity-90 transition-all"><MessageSquare size={16}/> WhatsApp</a>}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
