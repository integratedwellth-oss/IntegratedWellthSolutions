import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore'; // Removed query/orderBy to avoid index errors
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, Download, RefreshCcw } from 'lucide-react';
import { generateCSVExport } from '../services/exportService';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [warRoomLeads, setWarRoomLeads] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments'>('warroom');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchData();
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch War Room Leads (Simple fetch, no sorting to avoid Firebase Index errors)
      const warRoomSnap = await getDocs(collection(db, 'war_room_leads'));
      const wrData = warRoomSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort manually in JavaScript
      setWarRoomLeads(wrData.sort((a:any, b:any) => b.timestamp?.seconds - a.timestamp?.seconds));

      // Fetch Assessments
      const assessSnap = await getDocs(collection(db, 'assessments'));
      const assData = assessSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort manually in JavaScript
      setAssessments(assData.sort((a:any, b:any) => b.timestamp?.seconds - a.timestamp?.seconds));

    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch data: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError('Login Failed');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl text-center">
          <Lock className="text-brand-gold w-12 h-12 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-widest">Admin Authentication</h2>
          <button onClick={handleGoogleLogin} className="w-full bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-brand-gold transition-all uppercase tracking-widest text-xs">
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter">Intelligence Hub</h1>
            <p className="text-brand-gold text-xs uppercase mt-2">{user.email}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={fetchData} className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all">
              <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <button onClick={() => signOut(auth)} className="px-6 py-3 bg-rose-900/20 text-rose-500 rounded-full text-xs font-bold uppercase border border-rose-500/20">Logout</button>
          </div>
        </div>

        {error && <p className="bg-rose-500/20 text-rose-400 p-4 rounded-xl mb-8 text-sm border border-rose-500/20">{error}</p>}

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab('warroom')} className={`px-8 py-4 rounded-2xl border transition-all ${activeTab === 'warroom' ? 'bg-white/10 border-white/20' : 'opacity-40 border-transparent'}`}>
            War Room ({warRoomLeads.length})
          </button>
          <button onClick={() => setActiveTab('assessments')} className={`px-8 py-4 rounded-2xl border transition-all ${activeTab === 'assessments' ? 'bg-white/10 border-white/20' : 'opacity-40 border-transparent'}`}>
            Assessments ({assessments.length})
          </button>
        </div>

        <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/20 text-brand-gold text-xs uppercase font-black">
              <tr>
                <th className="px-8 py-6">Date</th>
                <th className="px-8 py-6">Name</th>
                <th className="px-8 py-6">Business</th>
                <th className="px-8 py-6">Result</th>
                <th className="px-8 py-6">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(activeTab === 'warroom' ? warRoomLeads : assessments).map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 text-white/40">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'New'}</td>
                  <td className="px-8 py-5 font-bold">{item.name || item.personal_identity || 'N/A'}</td>
                  <td className="px-8 py-5">{item.company || item.enterprise || 'N/A'}</td>
                  <td className="px-8 py-5">
                    <span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {item.segment || item.persona || 'View'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <a href={`mailto:${item.email}`} className="text-brand-gold hover:underline">{item.email}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
