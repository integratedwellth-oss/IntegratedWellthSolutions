import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, updateDoc, doc, addDoc } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Lock, LogOut, FileText, ShieldAlert, RefreshCcw, Eye, X, Mail, MessageSquare, ChevronRight, Loader2, Download, Ticket, CheckCircle, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [warRoomLeads, setWarRoomLeads] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments' | 'registrations'>('warroom');
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

      const regQuery = query(collection(db, 'workshop_registrations'), orderBy('timestamp', 'desc'));
      const regSnap = await getDocs(regQuery);
      setRegistrations(regSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { 
      console.error(err); 
    }
    setLoading(false);
  };

  const handleVerifyRegistration = async (reg: any) => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'workshop_registrations', reg.id), { status: 'verified' });
      
      // SURGICAL FIX: Dynamically populating the email template based on the specific event they registered for
      await addDoc(collection(db, 'mail'), {
        to: reg.email,
        message: {
          subject: `Your Exclusive Access: ${reg.eventName || 'IWS Workshop'}`,
          html: `<div style="font-family:sans-serif;color:#134e4a;padding:20px;max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;">
            <h1 style="color:#d4af37;text-transform:uppercase;letter-spacing:1px;">Registration Confirmed</h1>
            <p style="font-size:16px;">Hi ${reg.fullName},</p>
            <p style="font-size:16px;line-height:1.5;">Your payment has been successfully verified. We are excited to host you at the <strong>${reg.eventName || 'Governance, Recordkeeping & Compliance Workshop'}</strong>.</p>
            <div style="background-color:#f4f1ea;padding:15px;border-radius:8px;margin:20px 0;">
              <p style="margin:0;font-size:16px;"><strong>Session:</strong> ${reg.eventDate || '22nd May 2026, 18h00 - 20h00'}</p>
            </div>
            <p style="margin-top:30px;margin-bottom:30px;">
              <a href="${reg.eventLink || 'https://zoom.us/j/iws-workshop-link'}" style="background-color:#134e4a;color:white;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;font-size:14px;">Join Session</a>
            </p>
            <p style="font-size:14px;color:#6b7280;margin-top:20px;border-top:1px solid #e5e7eb;padding-top:20px;">Please join 5 minutes early to ensure your connection is stable.</p>
            </div>`
        }
      });
      
      fetchData();
    } catch (error) {
      console.error("Verification failed", error);
      alert("Failed to verify registration.");
    }
  };

  const renderTableData = () => {
    let data: any[] = [];
    if (activeTab === 'warroom') data = warRoomLeads;
    if (activeTab === 'assessments') data = assessments;
    if (activeTab === 'registrations') data = registrations;

    if (data.length === 0) {
      return <tr><td colSpan={5} className="text-center py-20 text-white/30 uppercase text-xs font-bold">No Data Streams for this Segment</td></tr>;
    }

    if (activeTab === 'registrations') {
      return data.map((item) => (
        <tr key={item.id} className="hover:bg-white/5">
          <td className="px-8 py-5 font-mono text-xs text-white/40">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
          <td className="px-8 py-5 font-bold text-white">{item.fullName}<br/><span className="text-[10px] text-white/50">{item.email}</span></td>
          <td className="px-8 py-5 text-white/60">
            {item.businessName}
            {/* Display which event they registered for in the dashboard */}
            <div className="text-[9px] font-bold text-brand-gold mt-1 uppercase">{item.eventName?.includes('Exclusive') ? 'June 1st Event' : 'May 22nd Event'}</div>
          </td>
          <td className="px-8 py-5">
            {item.status === 'verified' ? (
              <span className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest"><CheckCircle size={14}/> Verified</span>
            ) : (
              <span className="flex items-center gap-2 text-brand-gold font-bold text-[10px] uppercase tracking-widest"><Clock size={14}/> Pending</span>
            )}
          </td>
          <td className="px-8 py-5 text-center flex items-center justify-center gap-3">
            {item.proofOfPaymentUrl && (
              <a href={item.proofOfPaymentUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-900" title="View POP">
                <FileText size={18}/>
              </a>
            )}
            {item.status !== 'verified' && (
              <button onClick={() => handleVerifyRegistration(item)} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500 hover:text-white" title="Verify & Send Ticket">
                <Ticket size={18}/>
              </button>
            )}
          </td>
        </tr>
      ));
    }

    return data.map((item) => (
      <tr key={item.id} className="hover:bg-white/5">
        <td className="px-8 py-5 font-mono text-xs text-white/40">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
        <td className="px-8 py-5 font-bold text-white">{item.name}</td>
        <td className="px-8 py-5 text-white/60">{item.enterprise}</td>
        <td className="px-8 py-5"><span className="bg-brand-gold/10 text-brand-gold px-3 py-1 rounded-full text-[10px] font-black uppercase border border-brand-gold/20">{item.segment || item.persona}</span></td>
        <td className="px-8 py-5 text-center"><button onClick={() => setSelectedLead(item)} className="p-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-900"><Eye size={18}/></button></td>
      </tr>
    ));
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

        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => setActiveTab('warroom')} className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'warroom' ? 'bg-white/10 text-white' : 'bg-transparent text-white/50'}`}>
            <ShieldAlert size={16} /> War Room ({warRoomLeads.length})
          </button>
          <button onClick={() => setActiveTab('assessments')} className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'assessments' ? 'bg-white/10 text-white' : 'bg-transparent text-white/50'}`}>
            <FileText size={16} /> Assessments ({assessments.length})
          </button>
          <button onClick={() => setActiveTab('registrations')} className={`flex items-center gap-3 px-6 py-3 rounded-full text-xs font-bold uppercase transition-all ${activeTab === 'registrations' ? 'bg-white/10 text-white' : 'bg-transparent text-white/50'}`}>
            <Ticket size={16} /> Registrations ({registrations.length})
          </button>
        </div>

        <div className="bg-white/5 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/20 text-brand-gold text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6">Identity</th>
                  <th className="px-8 py-6">Business & Event</th>
                  <th className="px-8 py-6">Status / Segment</th>
                  <th className="px-8 py-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? <tr><td colSpan={5} className="text-center py-20"><Loader2 className="animate-spin text-white/50 mx-auto" /></td></tr> : renderTableData()}
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
                <div className="space-y-6">
                  {selectedLead.intelligence_report && Array.isArray(selectedLead.intelligence_report) ? (
                    selectedLead.intelligence_report.map((item: any, idx: number) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-xs font-bold text-brand-900/60 leading-tight">{item.q}</p>
                        <p className="text-sm font-black text-brand-900 flex items-center gap-2 mt-1"><ChevronRight size={14} className="text-brand-gold" /> {item.a}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs italic text-brand-900/40 text-center">No detailed data stream available for this entry.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
