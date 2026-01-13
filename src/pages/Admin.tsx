import React, { useState } from 'react';
import { useLeads } from '../hooks/useLeads';
import LeadCard from '../components/LeadCard';
import { Lock, Download } from 'lucide-react';
import { exportLeadsToCSV } from '../utils/csvExport';

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pass, setPass] = useState('');
  const { leads, loading } = useLeads();

  if (!authenticated) {
    return (
      <div className="max-w-md mx-auto py-40 px-6">
        <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] text-center">
          <Lock className="mx-auto text-[#C5A059] mb-6" size={40} />
          <h2 className="text-white font-black uppercase tracking-widest mb-6 text-sm">Authority Access Only</h2>
          <input 
            type="password" 
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-white mb-4 outline-none focus:border-[#C5A059]"
            placeholder="Security Key"
            onChange={(e) => setPass(e.target.value)}
          />
          <button 
            onClick={() => pass === 'IWS2026' && setAuthenticated(true)}
            className="w-full bg-[#C5A059] text-black font-black uppercase py-3 rounded-xl text-xs"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none text-brand-gold">Intelligence Vault</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Active Leads: {leads.length}</p>
        </div>
        <button 
          onClick={() => exportLeadsToCSV(leads)}
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#C5A059] hover:text-black transition-all"
        >
          <Download size={14} /> Export CSV
        </button>
      </div>

      {loading ? (
        <div className="text-gray-500 animate-pulse font-bold uppercase tracking-widest text-xs">Accessing Records...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </div>
  );
}
