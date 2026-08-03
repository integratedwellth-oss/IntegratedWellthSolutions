import type { FC } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth, db, functions } from '../firebaseConfig';
import {
  collection,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { RefreshCw, Shield, Users, FileText, Calendar, X, Eye } from 'lucide-react';

// ─── Secure callable functions ───
const getMyClaims = httpsCallable(functions, 'getMyClaims');
const getAdminData = httpsCallable(functions, 'getAdminData');

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

type TabKey = 'warroom' | 'assessments' | 'registrations';

const TAB_CONFIG: { key: TabKey; label: string; icon: typeof Users }[] = [
  { key: 'warroom', label: 'War Room', icon: Users },
  { key: 'assessments', label: 'Assessments', icon: FileText },
  { key: 'registrations', label: 'Registrations', icon: Calendar },
];

const Dashboard: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const [warRoomLeads, setWarRoomLeads] = useState<LeadItem[]>([]);
  const [assessments, setAssessments] = useState<LeadItem[]>([]);
  const [registrations, setRegistrations] = useState<LeadItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('warroom');
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);

  // ─── Check auth state ───
  useEffect(() => {
    if (!auth) { setCheckingAdmin(false); setLoading(false); return; }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setCheckingAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // ─── Verify admin claims ───
  useEffect(() => {
    if (!user) return;

    const verifyAdmin = async () => {
      try {
        const result = (await getMyClaims({})) as {
          data: { admin: boolean; email: string | null };
        };
        setIsAdmin(result.data.admin === true);
      } catch (err) {
        console.error('Failed to verify admin claims:', err);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    void verifyAdmin();
  }, [user]);

  // ─── Fetch data via secure endpoint ───
  const fetchData = useCallback(async () => {
    if (!isAdmin || !functions) return;
    setLoading(true);

    try {
      const [wrResult, assResult, regResult] = await Promise.all([
        getAdminData({ collection: 'war_room_leads', limit: 200 }),
        getAdminData({ collection: 'assessments', limit: 200 }),
        getAdminData({ collection: 'workshop_registrations', limit: 200 }),
      ]);

      setWarRoomLeads((wrResult.data as any).data || []);
      setAssessments((assResult.data as any).data || []);
      setRegistrations((regResult.data as any).data || []);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }

    setLoading(false);
  }, [isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      void fetchData();
    }
  }, [isAdmin, fetchData]);

  const handleVerifyRegistration = async (reg: LeadItem) => {
    if (!db || !reg.id) return;
    try {
      await updateDoc(doc(db, 'workshop_registrations', reg.id), {
        status: 'verified',
      });
      await addDoc(collection(db, 'mail'), {
        to: reg.email,
        message: {
          subject: 'Your Exclusive Access: IntegratedWellth Governance & Compliance',
          html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;"><h2 style="color:#134e4a;">Registration Confirmed</h2><p>Hi ${reg.fullName || reg.name},</p><p>Your payment has been successfully verified.</p><p><strong>Date:</strong> Monday, June 1</p><p><strong>Time:</strong> 4:00 – 5:00pm (UTC)</p><a href="https://meet.google.com/your-meeting-link" style="display:inline-block;background:#134e4a;color:#d4af37;padding:12px 24px;text-decoration:none;border-radius:6px;margin-top:16px;">Join Google Meet Session</a></div>`,
        },
      });
      void fetchData(); // Refresh after verification
    } catch (error) {
      console.error('Verification failed', error);
      alert('Failed to verify registration.');
    }
  };

  const getActiveData = (): LeadItem[] => {
    switch (activeTab) {
      case 'warroom':
        return warRoomLeads;
      case 'assessments':
        return assessments;
      case 'registrations':
        return registrations;
    }
  };

  const renderTableData = () => {
    const data = getActiveData();

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={activeTab === 'registrations' ? 7 : 5} className="p-6 text-center text-gray-500">
            No Data Streams for this Segment
          </td>
        </tr>
      );
    }

    if (activeTab === 'registrations') {
      return data.map((item) => (
        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
          <td className="p-3 text-sm">
            {item.timestamp?.toDate
              ? item.timestamp.toDate().toLocaleDateString()
              : 'N/A'}
          </td>
          <td className="p-3 text-sm font-medium">{item.fullName || item.name}</td>
          <td className="p-3 text-sm">{item.email}</td>
          <td className="p-3 text-sm">{item.businessName || item.enterprise}</td>
          <td className="p-3 text-sm">{item.eventName || 'June 1st Event'}</td>
          <td className="p-3 text-sm">
            {item.status === 'verified' ? (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                Verified
              </span>
            ) : (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                Pending
              </span>
            )}
          </td>
          <td className="p-3 text-sm">
            {item.proofOfPaymentUrl && (
              <a
                href={item.proofOfPaymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#134e4a] hover:underline text-xs"
              >
                View POP
              </a>
            )}
            {item.status !== 'verified' && (
              <button
                onClick={() => handleVerifyRegistration(item)}
                className="ml-2 text-xs bg-[#134e4a] text-[#d4af37] px-2 py-1 rounded hover:bg-[#0f3d3a]"
              >
                Verify
              </button>
            )}
          </td>
        </tr>
      ));
    }

    return data.map((item) => (
      <tr
        key={item.id}
        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
        onClick={() => setSelectedLead(item)}
      >
        <td className="p-3 text-sm">
          {item.timestamp?.toDate
            ? item.timestamp.toDate().toLocaleDateString()
            : 'N/A'}
        </td>
        <td className="p-3 text-sm font-medium">{item.name || item.fullName}</td>
        <td className="p-3 text-sm">{item.enterprise || item.businessName}</td>
        <td className="p-3 text-sm">{item.segment || item.persona}</td>
        <td className="p-3 text-sm">
          <button className="text-[#134e4a] hover:text-[#d4af37] text-xs font-medium uppercase tracking-wider">
            View
          </button>
        </td>
      </tr>
    ));
  };

  const getTableHeaders = () => {
    if (activeTab === 'registrations') {
      return ['Date', 'Identity', 'Email', 'Business', 'Event', 'Status', 'Action'];
    }
    return ['Date', 'Identity', 'Business & Event', 'Status / Segment', 'Action'];
  };

  // ─── Loading state ───
  if (checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#134e4a] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#134e4a] font-medium">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-[#134e4a]">Admin Hub Access</h2>
          <p className="mt-4 text-gray-600">Please sign in to continue.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-10 rounded-2xl shadow-lg max-w-md border border-rose-100">
          <Shield className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-rose-600">Access Denied</h2>
          <p className="mt-4 text-gray-600">
            You do not have permission to view the Intelligence Hub.
          </p>
          <p className="mt-2 text-sm text-gray-400">Signed in as: {user.email}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-[#134e4a]">Intelligence Hub</h2>
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => fetchData()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-500 uppercase tracking-widest">Live Data</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {TAB_CONFIG.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium uppercase tracking-wider transition-colors flex items-center gap-2 ${
                activeTab === tab.key
                  ? 'text-[#134e4a] border-b-2 border-[#d4af37]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {getTableHeaders().map((h) => (
                  <th
                    key={h}
                    className="p-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {renderTableData()}
            </tbody>
          </table>
        </div>

        {selectedLead && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedLead(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#134e4a]">
                  {selectedLead.name || selectedLead.fullName}
                </h3>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {selectedLead.enterprise || selectedLead.businessName}
              </p>
              <h4 className="text-sm font-bold text-[#134e4a] uppercase tracking-wider mb-2">
                Full Discovery Brief
              </h4>
              {selectedLead.intelligence_report &&
              Array.isArray(selectedLead.intelligence_report) ? (
                <div className="space-y-3">
                  {selectedLead.intelligence_report.map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs font-semibold text-[#134e4a] mb-1">{item.q}</p>
                      <p className="text-sm text-gray-700">{item.a}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  No detailed data stream available for this entry.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
