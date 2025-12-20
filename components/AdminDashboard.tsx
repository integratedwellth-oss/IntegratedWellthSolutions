import React, { useState, useEffect } from 'react';
import { db, auth, googleProvider } from '../firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { LayoutDashboard, LogOut, Loader2, ChevronDown, ChevronRight, User as UserIcon, Briefcase, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'applications' | 'assessments'>('applications');
  
  // Data State
  const [applications, setApplications] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(false);

  // Authentication Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchLeads();
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Data from 'mail' collection
  const fetchLeads = async () => {
    setIsDataLoading(true);
    try {
      const q = query(collection(db, "mail")); // Fetching all mail
      const querySnapshot = await getDocs(q);
      
      const apps: any[] = [];
      const assess: any[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Sort based on which data object exists
        if (data.applicantDetails) {
          apps.push({ id: doc.id, ...data.applicantDetails });
        } else if (data.assessmentData) {
          assess.push({ id: doc.id, ...data.assessmentData });
        }
      });

      // Sort by newest first (handling different timestamp fields)
      apps.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0));
      assess.sort((a, b) => (b.submittedAt?.seconds || 0) - (a.submittedAt?.seconds || 0));

      setApplications(apps);
      setAssessments(assess);
    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Error loading data. Check console permissions.");
    } finally {
      setIsDataLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // --- RENDERING HELPERS ---

  // Group Applications by Package
  const groupApplications = () => {
    const groups: {[key: string]: any[]} = {
      'Strategic Pulse': [],
      'Growth Partner': [],
      'Founder Concierge': [],
      'Other': []
    };

    applications.forEach(app => {
      if (groups[app.package]) {
        groups[app.package].push(app);
      } else {
        groups['Other'].push(app);
      }
    });
    return groups;
  };

  // Group Assessments by Result Type
  const groupAssessments = () => {
    const groups: {[key: string]: any[]} = {
      'Results Ready': [],
      'Reset in Progress': [],
      'Reflection Needed': [],
      'Other': []
    };

    assessments.forEach(ass => {
      if (groups[ass.resultType]) {
        groups[ass.resultType].push(ass);
      } else {
        groups['Other'].push(ass);
      }
    });
    return groups;
  };

  // --- LOGIN SCREEN ---
  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-brand-500" size={40} /></div>;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="text-brand-900" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restricted Access</h2>
          <p className="text-gray-500 mb-8">Please sign in with the official administration account (integratedwellth@gmail.com)</p>
          <button 
            onClick={handleLogin}
            className="w-full bg-brand-900 text-white py-3 rounded-xl font-bold hover:bg-brand-800 transition-colors flex items-center justify-center gap-2"
          >
            <UserIcon size={18} /> Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  const appGroups = groupApplications();
  const assessGroups = groupAssessments();

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="text-brand-900" />
          <h1 className="font-bold text-xl text-gray-900">Lead Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden md:inline">{user.email}</span>
          <button onClick={handleLogout} className="text-red-500 hover:text-red-700 text-sm font-bold flex items-center gap-1">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('applications')}
            className={`pb-4 px-4 font-bold text-sm transition-colors relative ${activeTab === 'applications' ? 'text-brand-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <span className="flex items-center gap-2"><Briefcase size={18}/> Partnership Applications ({applications.length})</span>
            {activeTab === 'applications' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-900 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('assessments')}
            className={`pb-4 px-4 font-bold text-sm transition-colors relative ${activeTab === 'assessments' ? 'text-brand-900' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <span className="flex items-center gap-2"><TrendingUp size={18}/> SME Assessments ({assessments.length})</span>
            {activeTab === 'assessments' && <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-900 rounded-t-full"></div>}
          </button>
          <button onClick={fetchLeads} className="ml-auto text-brand-600 text-sm hover:underline">Refresh Data</button>
        </div>

        {isDataLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-gray-400" size={32} /></div>
        ) : (
          <div className="space-y-8">
            
            {/* --- APPLICATIONS VIEW --- */}
            {activeTab === 'applications' && (
              <div className="grid gap-6">
                {Object.entries(appGroups).map(([pkgName, items]) => (
                  <div key={pkgName} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">{pkgName}</h3>
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-500 border border-gray-200">{items.length}</span>
                    </div>
                    {items.length === 0 ? (
                      <div className="p-6 text-gray-400 text-sm italic">No applications in this category yet.</div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {items.map((lead: any) => (
                          <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors group">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-lg text-brand-900">{lead.name}</h4>
                                <p className="text-sm text-gray-600">{lead.business}</p>
                              </div>
                              <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                                {lead.submittedAt?.toDate ? lead.submittedAt.toDate().toLocaleDateString() : 'Just now'}
                              </span>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
                              <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg">
                                <span className="block text-xs font-bold uppercase opacity-70">Commitment</span>
                                {lead.commitment}
                              </div>
                              <div className="bg-green-50 text-green-800 px-3 py-2 rounded-lg">
                                <span className="block text-xs font-bold uppercase opacity-70">Contact</span>
                                {lead.email} <span className="mx-1">•</span> {lead.phone}
                              </div>
                              <div className="bg-orange-50 text-orange-800 px-3 py-2 rounded-lg md:col-span-1">
                                <span className="block text-xs font-bold uppercase opacity-70">Challenge</span>
                                <span className="line-clamp-1">{lead.challenge || "None listed"}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* --- ASSESSMENTS VIEW --- */}
            {activeTab === 'assessments' && (
              <div className="grid gap-6">
                 {Object.entries(assessGroups).map(([resultType, items]) => (
                  <div key={resultType} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className={`px-6 py-3 border-b border-gray-100 flex justify-between items-center ${
                      resultType.includes('Results') ? 'bg-green-50' : 
                      resultType.includes('Reset') ? 'bg-orange-50' : 'bg-red-50'
                    }`}>
                      <h3 className="font-bold text-gray-800">{resultType}</h3>
                      <span className="bg-white/50 px-3 py-1 rounded-full text-xs font-bold text-gray-600 border border-gray-200/50">{items.length}</span>
                    </div>
                    {items.length === 0 ? (
                      <div className="p-6 text-gray-400 text-sm italic">No assessments in this category yet.</div>
                    ) : (
                      <div className="divide-y divide-gray-50">
                        {items.map((lead: any) => (
                          <div key={lead.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h4 className="font-bold text-lg text-brand-900">{lead.enterprise}</h4>
                                <p className="text-sm text-gray-600">Contact: {lead.name}</p>
                              </div>
                              <div className="text-right">
                                <span className="block text-2xl font-bold text-brand-900">{lead.score}/16</span>
                                <span className="text-xs text-gray-400">
                                  {lead.submittedAt?.toDate ? lead.submittedAt.toDate().toLocaleDateString() : 'Just now'}
                                </span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <a href={`mailto:${lead.email}`} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">
                                {lead.email}
                              </a>
                              <a href={`tel:${lead.phone}`} className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors">
                                {lead.phone}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
