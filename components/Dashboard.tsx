import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, RefreshCcw, Eye, X, ChevronRight, Layout, Calculator, Receipt, Box, FileSpreadsheet, CreditCard, Loader2, Mail, MessageSquare } from 'lucide-react';

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
      const wrSnap = await getDocs(collection(db, 'war_room_leads'));
      setWarRoomLeads(wrSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      const assSnap = await getDocs(collection(db, 'assessments'));
      setAssessments(assSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  
  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-center font-sans">
        <div className="bg-white/5 border border-white/10 p-12 rounded-[2rem] shadow-2xl max-w-md w-full">
          <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-8">Admin Hub Access</h2>
          <button onClick={handleGoogleLogin} className="w-full bg-white text-brand-900 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-all">
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-8">
          <h1 className="text-4xl font-black uppercase tracking-tighter">Intelligence Hub</h1>
          <button onClick={() => signOut(auth)} className="px-6 py-3 bg-rose-900/20 text-rose-500 rounded-full text-xs font-bold uppercase">Logout</button>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('warroom')} className={`px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'warroom' ? 'bg-white text-brand-900' : 'bg-white/5 text-white/50'}`}>War Room ({warRoomLeads.length})</button>
          <button onClick={() => setActiveTab('assessments')} className={`px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'assessments' ? 'bg-white text-brand-900' : 'bg-white/5 text-white/50'}`}>Assessments ({assessments.length})</button>
        </div>

        <div className="bg-white/5 rounded-3xl overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/20 text-brand-gold text-[10px] uppercase font-black">
              <tr>
                <th className="p-6">Name</th>
                <th className="p-6">Business</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-center">View</th>
              </tr>
            </thead>
            <tbody>
              {(activeTab === 'warroom' ? warRoomLeads : assessments).map(lead => (
                <tr key={lead.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="p-6 font-bold">{lead.name}</td>
                  <td className="p-6">{lead.enterprise}</td>
                  <td className="p-6"><span className="bg-brand-gold/10 text-brand-gold px-2 py-1 rounded text-[9px] font-bold">{lead.persona || lead.segment}</span></td>
                  <td className="p-6 text-center">
                    <button onClick={() => setSelectedLead(lead)} className="p-2 rounded-full bg-white/10 text-white hover:bg-brand-gold hover:text-brand-900"><Eye size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl text-brand-900 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black uppercase">{selectedLead.name}</h3>
                <p className="text-brand-gold font-bold uppercase text-xs">{selectedLead.enterprise}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 rounded-full bg-brand-50 hover:bg-brand-100"><X size={20}/></button>
            </div>
            <div className="space-y-4">
              <div className="bg-brand-50 p-6 rounded-2xl">
                <p className="text-xs font-bold uppercase text-brand-900/50 mb-4">Intelligence Brief</p>
                <div className="space-y-4 text-sm">
                  {selectedLead.intelligence_report?.map((item: any, i: number) => (
                    <div key={i}>
                      <p className="font-bold text-brand-900/60">{item.q}</p>
                      <p className="font-semibold text-brand-900">- {item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href={`mailto:${selectedLead.email}`} className="flex items-center justify-center gap-2 bg-brand-900 text-white p-4 rounded-xl text-xs font-bold uppercase"><Mail size={16}/> Email</a>
                {selectedLead.whatsapp && <a href={`https://wa.me/${selectedLead.whatsapp}`} target="_blank" className="flex items-center justify-center gap-2 bg-[#25D366] text-white p-4 rounded-xl text-xs font-bold uppercase"><MessageSquare size={16}/> WhatsApp</a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
