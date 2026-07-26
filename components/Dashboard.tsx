import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';

const ADMIN_EMAILS: string[] = [
  'enquiries@integratedwellth.co.za',
  'marcia@integratedwellth.co.za',
];

interface LeadItem {
  id: string;
  timestamp?: { toDate: () => Date };
  name?: string;
  fullName?: string;
  enterprise?: string;
  businessName?: string;
  email?: string;
  segment?: string;
  persona?: string;
  eventName?: string;
  status?: string;
  proofOfPaymentUrl?: string;
  intelligence_report?: Array<{ q: string; a: string }>;
}

const Dashboard: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [warRoomLeads, setWarRoomLeads] = useState<LeadItem[]>([]);
  const [assessments, setAssessments] = useState<LeadItem[]>([]);
  const [registrations, setRegistrations] = useState<LeadItem[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments' | 'registrations'>('warroom');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email || '')) {
        setIsAdmin(true);
        void fetchData();
      } else {
        setIsAdmin(false);
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
      setWarRoomLeads(wrSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as LeadItem));
      const assQuery = query(collection(db, 'assessments'), orderBy('timestamp', 'desc'));
      const assSnap = await getDocs(assQuery);
      setAssessments(assSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as LeadItem));
      const regQuery = query(collection(db, 'workshop_registrations'), orderBy('timestamp', 'desc'));
      const regSnap = await getDocs(regQuery);
      setRegistrations(regSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as LeadItem));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const handleVerifyRegistration = async (reg: LeadItem) => {
    if (!db || !reg.id) return;
    try {
      await updateDoc(doc(db, 'workshop_registrations', reg.id), { status: 'verified' });
      await addDoc(collection(db, 'mail'), {
        to: reg.email,
        message: {
          subject: 'Your Exclusive Access: IntegratedWellth Governance & Compliance',
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#134e4a;">Registration Confirmed</h2><p>Hi ${reg.fullName || reg.name},</p><p>Your payment has been successfully verified.</p><p><strong>Date:</strong> Monday, June 1</p><p><strong>Time:</strong> 4:00 – 5:00pm (UTC)</p><a href="https://meet.google.com/your-meeting-link" style="display:inline-block;background:#134e4a;color:#d4af37;padding:12px 24px;text-decoration:none;border-radius:6px;margin-top:16px;">Join Google Meet Session</a></div>`
        }
      });
      void fetchData();
    } catch (error) { console.error('Verification failed', error); alert('Failed to verify registration.'); }
  };

  const renderTableData = () => {
    let data: LeadItem[] = [];
    if (activeTab === 'warroom') data = warRoomLeads;
    if (activeTab === 'assessments') data = assessments;
    if (activeTab === 'registrations') data = registrations;
    if (data.length === 0) return <tr><td colSpan={5} className="p-6 text-center text-gray-500">No Data Streams for this Segment</td></tr>;
    if (activeTab === 'registrations') {
      return data.map((item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
          <td className="p-3 text-sm">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
          <td className="p-3 text-sm font-medium">{item.fullName || item.name}</td>
          <td className="p-3 text-sm">{item.email}</td>
          <td className="p-3 text-sm">{item.businessName || item.enterprise}</td>
          <td className="p-3 text-sm">{item.eventName || 'June 1st Event'}</td>
          <td className="p-3 text-sm">{item.status === 'verified' ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">Verified</span> : <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">Pending</span>}</td>
          <td className="p-3 text-sm">{item.proofOfPaymentUrl && <a href={item.proofOfPaymentUrl} target="_blank" rel="noopener noreferrer" className="text-[#134e4a] hover:underline text-xs">View POP</a>}{item.status !== 'verified' && <button onClick={() => handleVerifyRegistration(item)} className="ml-2 text-xs bg-[#134e4a] text-[#d4af37] px-2 py-1 rounded hover:bg-[#0f3d3a]">Verify</button>}</td>
        </tr>
      ));
    }
    return data.map((item) => (
      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLead(item)}>
        <td className="p-3 text-sm">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
        <td className="p-3 text-sm font-medium">{item.name || item.fullName}</td>
        <td className="p-3 text-sm">{item.enterprise || item.businessName}</td>
        <td className="p-3 text-sm">{item.segment || item.persona}</td>
        <td className="p-3 text-sm"><button className="text-[#134e4a] hover:text-[#d4af37] text-xs font-medium uppercase tracking-wider">View</button></td>
      </tr>
    ));
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center"><div className="w-8 h-8 border-2 border-[#134e4a] border-t-transparent rounded-full animate-spin mx-auto mb-4" /><p className="text-[#134e4a] font-medium">Verifying credentials...</p></div></div>;
  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md"><h2 className="text-2xl font-bold text-[#134e4a]">Admin Hub Access</h2><p className="mt-4 text-gray-600">Please sign in to continue.</p></div></div>;
  if (!isAdmin) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md border border-rose-100"><h2 className="text-2xl font-bold text-rose-600">Access Denied</h2><p className="mt-4 text-gray-600">You do not have permission to view the Intelligence Hub.</p><p className="mt-2 text-sm text-gray-400">Signed in as: {user.email}</p></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div><h2 className="text-3xl font-bold text-[#134e4a]">Intelligence Hub</h2><p className="text-sm text-gray-500 mt-1">{user.email}</p></div>
          <div className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /><span className="text-xs text-gray-500 uppercase tracking-widest">Live Data</span></div>
        </div>
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {(['warroom', 'assessments', 'registrations'] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-sm font-medium uppercase tracking-wider transition-colors ${activeTab === tab ? 'text-[#134e4a] border-b-2 border-[#d4af37]' : 'text-gray-400 hover:text-gray-600'}`}>{tab === 'warroom' ? 'War Room' : tab === 'assessments' ? 'Assessments' : 'Registrations'}</button>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left"><thead className="bg-gray-50 border-b border-gray-100"><tr><th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th><th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Identity</th><th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business & Event</th><th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status / Segment</th><th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th></tr></thead><tbody className="divide-y divide-gray-50">{renderTableData()}</tbody></table>
        </div>
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-[#134e4a]">{selectedLead.name || selectedLead.fullName}</h3><button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button></div>
              <p className="text-sm text-gray-500 mb-4">{selectedLead.enterprise || selectedLead.businessName}</p>
              <h4 className="text-sm font-bold text-[#134e4a] uppercase tracking-wider mb-2">Full Discovery Brief</h4>
              {selectedLead.intelligence_report && Array.isArray(selectedLead.intelligence_report) ? (
                <div className="space-y-3">{selectedLead.intelligence_report.map((item, idx) => (<div key={idx} className="bg-gray-50 p-3 rounded-lg"><p className="text-xs font-semibold text-[#134e4a] mb-1">{item.q}</p><p className="text-sm text-gray-700">{item.a}</p></div>))}</div>
              ) : (<p className="text-sm text-gray-500 italic">No detailed data stream available for this entry.</p>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
