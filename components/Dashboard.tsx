import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, Download, RefreshCcw, Eye, X } from 'lucide-react';
import { generateCSVExport } from '../services/exportService';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [warRoomLeads, setWarRoomLeads] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments'>('warroom');
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null); // For Detail Popup

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchData();
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const wrSnap = await getDocs(collection(db, 'war_room_leads'));
      setWarRoomLeads(wrSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      const assSnap = await getDocs(collection(db, 'assessments'));
      setAssessments(assSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl text-center">
          <Lock className="text-brand-gold w-12 h-12 mx-auto mb-6" />
          <button onClick={() => signInWithPopup(auth, new GoogleAuthProvider())} className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-brand-gold transition-all uppercase tracking-widest text-xs">Sign in with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div><h1 className="text-4xl font-black uppercase tracking-tighter leading-none">Intelligence Hub</h1><p className="text-brand-gold text-xs uppercase mt-2">{user.email}</p></div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="p-3 bg-white/5 rounded-full hover:bg-white/10"><RefreshCcw size={18} className={loading ? 'animate-spin' : ''} /></button>
            <button onClick={() => signOut(auth)} className="px-6 py-3 bg-rose-900/20 text-rose-500 rounded-full text-xs font-bold uppercase">Logout</button>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('warroom')} className={`px-8 py-4 rounded-2xl border transition-all ${activeTab === 'warroom' ? 'bg-white/10' : 'opacity-40 border-transparent'}`}>War Room ({warRoomLeads.length})</button>
          <button onClick={() => setActiveTab('assessments')} className={`px-8 py-4 rounded-2xl border transition-all ${activeTab === 'assessments' ? 'bg-white/10' : 'opacity-40 border-transparent'}`}>Assessments ({assessments.length})</button>
        </div>

        <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/20 text-brand-gold text-xs uppercase font-black">
              <tr>
                <th className="px-8 py-6">Identity</th>
                <th className="px-8 py-6">Business</th>
                <th className="px-8 py-6">Result</th>
                <th className="px-8 py-6 text-center">Intel Brief</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(activeTab === 'warroom' ? warRoomLeads : assessments).map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-8 py-5 font-bold text-white">{item.name || item.personal_identity || 'N/A'}</td>
                  <td className="px-8 py-5">{item.company || item.enterprise || 'N/A'}</td>
                  <td className="px-8 py-5">
                    <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase">{item.segment || item.persona}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button onClick={() => setSelectedLead(item)} className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-900 transition-all"><Eye size={18}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAIL MODAL - This shows you the raw answers */}
      {selectedLead && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-white text-brand-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl overflow-y-auto max-h-[80vh]">
            <div className="flex justify-between items-start mb-10 border-b border-brand-900/10 pb-6">
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">{selectedLead.name || 'Intel Brief'}</h3>
                <p className="text-brand-gold font-bold uppercase text-xs mt-2">{selectedLead.company || 'Enterprise'}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 bg-brand-50 rounded-full hover:bg-brand-100 transition-all text-brand-900"><X /></button>
            </div>
            
            <div className="space-y-6">
               <div className="bg-brand-50 p-6 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-900/40 mb-2">Discovery Trail (Individual Answers)</p>
                  <div className="text-sm font-medium leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedLead.raw_answers || selectedLead.results?.ai || 'No detailed data stream available.' }} />
               </div>
               <div className="grid grid-cols-2 gap-4 pt-6">
                  <a href={`mailto:${selectedLead.email}`} className="flex items-center justify-center gap-2 bg-brand-900 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Email Lead</a>
                  <a href={`https://wa.me/${selectedLead.whatsapp}`} target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">WhatsApp</a>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
