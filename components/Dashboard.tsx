import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, getDocs, doc, updateDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

// ==================== ADMIN CONFIG ====================
// P0: Hardcoded whitelist. P1: Migrate to Firebase Custom Claims.
const ADMIN_EMAILS = [
  'marcia@integratedwellth.co.za',
  'enquiries@integratedwellth.co.za',
  // Add additional admin emails here
];

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [warRoomLeads, setWarRoomLeads] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'warroom' | 'assessments' | 'registrations'>('warroom');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && ADMIN_EMAILS.includes(currentUser.email || '')) {
        setIsAdmin(true);
        fetchData();
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

      await addDoc(collection(db, 'mail'), {
        to: reg.email,
        message: {
          subject: `Your Exclusive Access: IntegratedWellth Governance & Compliance`,
          html: `
            <h2>Registration Confirmed</h2>
            <p>Hi ${reg.fullName},</p>
            <p>Your payment has been successfully verified. We are excited to host you at the <strong>IntegratedWellth Governance & Compliance</strong> workshop.</p>
            <p><strong>Date:</strong> Monday, June 1</p>
            <p><strong>Time:</strong> 4:00 – 5:00pm (UTC)</p>
            <p><a href="https://meet.google.com/your-meet-link">Join Google Meet Session</a></p>
            <p>Please join 5 minutes early to ensure your connection is stable.</p>
          `
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
      return <tr><td colSpan={5} className="p-4 text-center text-gray-500">No Data Streams for this Segment</td></tr>;
    }

    if (activeTab === 'registrations') {
      return data.map((item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
          <td className="p-3 text-sm">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
          <td className="p-3 text-sm font-medium">{item.fullName}</td>
          <td className="p-3 text-sm">{item.email}<br/><span className="text-xs text-gray-500">{item.businessName}</span></td>
          <td className="p-3 text-sm">{item.eventName || 'June 1st Event'}</td>
          <td className="p-3 text-sm">
            {item.status === 'verified' ? (
              <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-bold">Verified</span>
            ) : (
              <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-xs font-bold">Pending</span>
            )}
          </td>
          <td className="p-3 text-sm">
            {item.proofOfPaymentUrl && (
              <a href={item.proofOfPaymentUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-xs">View POP</a>
            )}
            {item.status !== 'verified' && (
              <button onClick={() => handleVerifyRegistration(item)} className="ml-2 px-3 py-1 bg-[#134e4a] text-white text-xs rounded hover:bg-[#0d3b38]">Verify</button>
            )}
          </td>
        </tr>
      ));
    }

    return data.map((item) => (
      <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLead(item)}>
        <td className="p-3 text-sm">{item.timestamp?.toDate ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</td>
        <td className="p-3 text-sm font-medium">{item.name || item.fullName}</td>
        <td className="p-3 text-sm">{item.enterprise || item.businessName}</td>
        <td className="p-3 text-sm">{item.segment || item.persona}</td>
        <td className="p-3 text-sm">—</td>
      </tr>
    ));
  };

  // ==================== AUTH GUARDS ====================
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-[#134e4a]">Verifying credentials...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold text-[#134e4a]">Admin Hub Access</h2>
        <p className="mt-4 text-gray-600">Please sign in to continue.</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10">
        <h2 className="text-3xl font-bold text-rose-600">Access Denied</h2>
        <p className="mt-4 text-gray-600">You do not have permission to view this page.</p>
        <p className="mt-2 text-sm text-gray-400">Contact your system administrator if you believe this is an error.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#134e4a] mb-2">Intelligence Hub</h2>
        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

        <div className="flex gap-2 mb-6">
          {(['warroom', 'assessments', 'registrations'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                activeTab === tab ? 'bg-[#134e4a] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Identity</th>
                <th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Business & Event</th>
                <th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status / Segment</th>
                <th className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderTableData()}
            </tbody>
          </table>
        </div>

        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-[#134e4a] mb-1">{selectedLead.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{selectedLead.enterprise}</p>
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700">Full Discovery Brief</h4>
                {selectedLead.intelligence_report && Array.isArray(selectedLead.intelligence_report) ? (
                  selectedLead.intelligence_report.map((item: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-bold text-gray-500 uppercase">{item.q}</p>
                      <p className="text-sm text-gray-800 mt-1">{item.a}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No detailed data stream available for this entry.</p>
                )}
              </div>
              <button onClick={() => setSelectedLead(null)} className="mt-6 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
