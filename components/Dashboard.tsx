import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, Download } from 'lucide-react';
import { generateCSVExport } from '../services/exportService';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const warRoomQ = query(collection(db, 'war_room_leads'), orderBy('timestamp', 'desc'));
      const warRoomSnap = await getDocs(warRoomQ);
      setWarRoomLeads(warRoomSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const assessQ = query(collection(db, 'assessments'), orderBy('timestamp', 'desc'));
      const assessSnap = await getDocs(assessQ);
      setAssessments(assessSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid Command Credentials');
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
        <div className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
          <div className="flex justify-center mb-8">
            <Lock className="text-brand-gold w-12 h-12" />
          </div>
          <h2 className="text-2xl font-black text-white text-center mb-2 tracking-widest uppercase">Restricted Access</h2>
          <p className="text-white/40 text-center mb-8 text-xs uppercase tracking-[0.2em]">Command Level Authorization Required</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="email" 
              placeholder="Admin ID" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-brand-gold outline-none"
            />
            <input 
              type="password" 
              placeholder="Security Key" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:border-brand-gold outline-none"
            />
            {error && <p className="text-rose-500 text-xs text-center">{error}</p>}
            <button type="submit" className="w-full bg-brand-gold text-brand-900 font-black py-4 rounded-xl hover:bg-white transition-all uppercase tracking-widest text-xs">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">Intelligence Hub</h1>
            <p className="text-brand-gold text-xs uppercase tracking-[0.3em]">Live Data Stream</p>
          </div>
          <div className="flex gap-4">
            <button onClick={exportData} className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
              <Download size={14} /> Export CSV
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 bg-rose-900/20 hover:bg-rose-900/40 text-rose-500 rounded-full text-xs font-bold uppercase tracking-widest transition-all border border-rose-900/50">
              <LogOut size={14} /> Terminate
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('warroom')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all ${activeTab === 'warroom' ? 'bg-brand-gold text-brand-900 border-brand-gold' : 'bg-white/5 border-white/5 text-white/50'}`}
          >
            <ShieldAlert size={18} />
            <span className="font-black text-xs uppercase tracking-widest">War Room Leads</span>
            <span className="bg-black/20 px-2 py-0.5 rounded text-[10px]">{warRoomLeads.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('assessments')}
            className={`flex items-center gap-3 px-8 py-4 rounded-2xl border transition-all ${activeTab === 'assessments' ? 'bg-brand-gold text-brand-900 border-brand-gold' : 'bg-white/5 border-white/5 text-white/50'}`}
          >
            <FileText size={18} />
            <span className="font-black text-xs uppercase tracking-widest">Assessments</span>
            <span className="bg-black/20 px-2 py-0.5 rounded text-[10px]">{assessments.length}</span>
          </button>
        </div>

        <div className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/70">
              <thead className="bg-black/40 text-xs uppercase font-black text-brand-gold">
                <tr>
                  <th className="px-6 py-6 tracking-widest">Date</th>
                  <th className="px-6 py-6 tracking-widest">Identity</th>
                  <th className="px-6 py-6 tracking-widest">Business</th>
                  <th className="px-6 py-6 tracking-widest">{activeTab === 'warroom' ? 'Risk Level' : 'Score'}</th>
                  <th className="px-6 py-6 tracking-widest">Details</th>
                  <th className="px-6 py-6 tracking-widest">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(activeTab === 'warroom' ? warRoomLeads : assessments).map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-white">{item.name || item.personal_identity}</td>
                    <td className="px-6 py-4">{item.company || item.enterprise || item.enterprise_identity}</td>
                    <td className="px-6 py-4">
                      {activeTab === 'warroom' ? (
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.segment?.includes('CRITICAL') ? 'bg-rose-500/20 text-rose-400' : 'bg-brand-gold/20 text-brand-gold'}`}>
                          {item.segment || item.data?.risk_level}
                        </span>
                      ) : (
                        <span className="font-mono text-white">{item.score} / {item.maxScore}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-xs">
                      {activeTab === 'warroom' ? item.data?.pain_point : item.persona}
                    </td>
                    <td className="px-6 py-4">
                      <a href={`mailto:${item.email || item.secure_email}`} className="text-brand-gold hover:underline">{item.email || item.secure_email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
