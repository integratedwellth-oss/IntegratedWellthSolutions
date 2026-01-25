import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, Download, LogIn } from 'lucide-react';
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
    try {
      // Fetch War Room Leads
      const warRoomQ = query(collection(db, 'war_room_leads'), orderBy('timestamp', 'desc'));
      const warRoomSnap = await getDocs(warRoomQ);
      setWarRoomLeads(warRoomSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Assessments
      const assessQ = query(collection(db, 'assessments'), orderBy('timestamp', 'desc'));
      const assessSnap = await getDocs(assessQ);
      setAssessments(assessSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error("Access Denied: You might not be an admin.", err);
      setError("Access Denied. Ensure your account has admin privileges in Firestore Rules.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error(err);
      setError('Login Failed: ' + err.message);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const exportData = () => {
    const data = activeTab === 'warroom' ? warRoomLeads : assessments;
    generateCSVExport(data, `IWS_${activeTab}_export.csv`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-12 rounded-[2.5rem] backdrop-blur-xl shadow-2xl text-center">
          <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-brand-gold/20">
            <Lock className="text-brand-gold w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tighter uppercase">Command Center</h2>
          <p className="text-white/40 mb-10 text-xs uppercase tracking-[0.2em] font-medium">Restricted Intelligence Access</p>
          
          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-bold">
              {error}
            </div>
          )}

          <button 
            onClick={handleGoogleLogin} 
            className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-black py-4 rounded-xl hover:bg-brand-gold hover:scale-[1.02] transition-all uppercase tracking-widest text-xs shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335" />
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-12 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Intelligence Hub</h1>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <p className="text-white/40 text-xs uppercase tracking-[0.3em]">{user.email}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button onClick={exportData} className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-900 hover:bg-white rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:scale-105">
              <Download size={14} /> Export Data
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-rose-500/10 hover:bg-rose-500 text-white rounded-full text-xs font-black uppercase tracking-widest transition-all border border-rose-500/20 hover:border-rose-500">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('warroom')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all ${activeTab === 'warroom' ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-transparent text-white/30 hover:text-white hover:bg-white/5'}`}
          >
            <ShieldAlert size={18} />
            <span className="font-black text-xs uppercase tracking-widest">War Room Leads</span>
            <span className="bg-brand-gold text-brand-900 px-2 py-0.5 rounded text-[10px] font-bold">{warRoomLeads.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all ${activeTab === 'assessments' ? 'bg-white/10 border-white/20 text-white shadow-inner' : 'bg-transparent border-transparent text-white/30 hover:text-white hover:bg-white/5'}`}
          >
            <FileText size={18} />
            <span className="font-black text-xs uppercase tracking-widest">Assessments</span>
            <span className="bg-brand-gold text-brand-900 px-2 py-0.5 rounded text-[10px] font-bold">{assessments.length}</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-black/20 text-xs uppercase font-black text-brand-gold border-b border-white/5">
                <tr>
                  <th className="px-8 py-6 tracking-widest opacity-60">Date</th>
                  <th className="px-8 py-6 tracking-widest opacity-60">Identity</th>
                  <th className="px-8 py-6 tracking-widest opacity-60">Business</th>
                  <th className="px-8 py-6 tracking-widest opacity-60">{activeTab === 'warroom' ? 'Risk Level' : 'Score'}</th>
                  <th className="px-8 py-6 tracking-widest opacity-60">Insight</th>
                  <th className="px-8 py-6 tracking-widest opacity-60">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === 'warroom' ? warRoomLeads : assessments).length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-8 py-12 text-center text-white/30 uppercase tracking-widest text-xs">No Data Streams Detected</td>
                    </tr>
                ) : (
                    (activeTab === 'warroom' ? warRoomLeads : assessments).map((item) => (
                      <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-5 font-mono text-xs text-white/40">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
                        <td className="px-8 py-5 font-bold text-white">{item.name || item.personal_identity}</td>
                        <td className="px-8 py-5 text-white/80">{item.company || item.enterprise || item.enterprise_identity}</td>
                        <td className="px-8 py-5">
                          {activeTab === 'warroom' ? (
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.segment?.includes('CRITICAL') || item.data?.risk_level?.includes('CATASTROPHIC') ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                              {item.segment || item.data?.risk_level}
                            </span>
                          ) : (
                            <span className="font-mono text-brand-gold font-bold">{item.score} / {item.maxScore}</span>
                          )}
                        </td>
                        <td className="px-8 py-5 max-w-xs truncate text-xs text-white/50 group-hover:text-white/80 transition-colors">
                          {activeTab === 'warroom' ? item.data?.pain_point : item.persona}
                        </td>
                        <td className="px-8 py-5">
                          <a href={`mailto:${item.email || item.secure_email}`} className="text-brand-gold font-bold text-xs hover:underline decoration-brand-gold/50 underline-offset-4">{item.email || item.secure_email}</a>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
