import React, { useState, useEffect } from 'react';
import { db, auth, googleProvider } from '../firebaseConfig';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Download, Lock, RefreshCw, ShieldCheck, Phone, Mail, Building, User as UserIcon, LogOut } from 'lucide-react';
import Button from './Button';

// ✅ UPDATED: This now matches the email you are using to log in
const ALLOWED_EMAIL = "integratedwellth@gmail.com";

const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Check login status on load
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === ALLOWED_EMAIL) {
        setIsAuthorized(true);
        fetchLeads(); // Auto-load data if authorized
      } else {
        setIsAuthorized(false);
        setLeads([]);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      
      if (email !== ALLOWED_EMAIL) {
        await signOut(auth);
        setError(`Access Denied. The email ${email} is not authorized.`);
        setIsAuthorized(false);
      }
    } catch (err) {
      console.error("Login failed", err);
      setError("Login popup closed or failed. Please try again.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuthorized(false);
    setUser(null);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const leadsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
    } catch (err) {
      console.error("Error fetching leads:", err);
      // Fallback if indexing is missing
      try {
        const querySnapshot = await getDocs(collection(db, "leads"));
        const leadsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setLeads(leadsData);
      } catch (retryErr) {
        setError('Could not load data. Check Firebase permissions.');
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = ["Name,Enterprise,Email,Phone,Score,Result,Date\n"];
    const rows = leads.map(lead => {
      const date = lead.timestamp ? new Date(lead.timestamp.seconds * 1000).toLocaleDateString() : 'N/A';
      return `"${lead.name}","${lead.enterprise}","${lead.email}","${lead.phone || ''}","${lead.score}","${lead.resultType}","${date}"`;
    });

    const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "IWS_Leads.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 🔄 LOADING SCREEN
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RefreshCw className="animate-spin text-brand-500 w-8 h-8" />
      </div>
    );
  }

  // 🔒 LOGIN SCREEN (If not logged in OR not authorized)
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
          <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-white w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Restricted Access</h2>
          <p className="text-gray-500 mb-6">
            Please sign in with the official administration account<br/>
            (integratedwellth@gmail.com)
          </p>
          
          <Button onClick={handleLogin} className="w-full justify-center flex gap-2">
            <ShieldCheck size={18} /> Sign in with Google
          </Button>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 📊 DASHBOARD SCREEN (Only visible if authorized)
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-900 flex items-center gap-2">
              <ShieldCheck className="text-brand-500" /> Lead Dashboard
            </h1>
            <p className="text-gray-500">
              Welcome, {user?.displayName}. Secure connection established.
            </p>
          </div>
          
          <div className="flex gap-3">
             <button 
              onClick={fetchLeads} 
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> Refresh
            </button>
            <button 
              onClick={downloadCSV} 
              className="flex items-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors shadow-md"
            >
              <Download size={18} /> Export CSV
            </button>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-gray-500 text-sm font-bold uppercase mb-1">Total Leads</div>
            <div className="text-4xl font-bold text-brand-900">{leads.length}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="text-gray-500 text-sm font-bold uppercase mb-1">Results Ready (High)</div>
             <div className="text-4xl font-bold text-green-600">
               {leads.filter(l => l.score >= 12).length}
             </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <div className="text-gray-500 text-sm font-bold uppercase mb-1">Needs Reset (Low/Med)</div>
             <div className="text-4xl font-bold text-orange-500">
               {leads.filter(l => l.score < 12).length}
             </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-bold text-gray-600 text-sm">Date</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Name & Enterprise</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Contact Details</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Score</th>
                  <th className="p-4 font-bold text-gray-600 text-sm">Result Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm text-gray-500 whitespace-nowrap">
                      {lead.timestamp ? new Date(lead.timestamp.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-gray-900 flex items-center gap-2">
                        <UserIcon size={16} className="text-gray-400" /> {lead.name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Building size={14} className="text-gray-400" /> {lead.enterprise}
                      </div>
                    </td>
                    <td className="p-4">
                       <div className="text-sm text-gray-900 flex items-center gap-2">
                        <Mail size={14} className="text-gray-400" /> <a href={`mailto:${lead.email}`} className="hover:text-brand-600">{lead.email}</a>
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Phone size={14} className="text-gray-400" /> <a href={`tel:${lead.phone}`} className="hover:text-brand-600">{lead.phone || 'No phone'}</a>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${lead.score >= 12 ? 'bg-green-100 text-green-700' : lead.score >= 8 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                        {lead.score} / 16
                      </span>
                    </td>
                    <td className="p-4 text-sm text-gray-700">
                      {lead.resultType}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {leads.length === 0 && !loading && (
            <div className="p-12 text-center text-gray-500">
              No leads found yet. Wait for someone to take the assessment!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
