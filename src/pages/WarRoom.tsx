import React, { useState } from 'react';
import Input from '../components/Input';
import SovereigntyScore from '../components/SovereigntyScore';
import ZarChart from '../components/ZarChart';
import StatCard from '../components/StatCard';
import TriageForm from '../components/TriageForm';
import { calculateSovereignty, getRequirement } from '../utils/calculations';
import { formatCurrency } from '../utils/formatters';

export default function WarRoom() {
  const [exposure, setExposure] = useState(0);
  const [offshore, setOffshore] = useState(0);
  
  const score = calculateSovereignty(exposure, offshore);
  const requirement = getRequirement(exposure);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <header>
            <h2 className="text-6xl font-black text-white uppercase italic tracking-tighter leading-none">Exposure<br/>Audit</h2>
            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em] mt-4">Sovereignty Intelligence Terminal v1.2</p>
          </header>
          
          <div className="space-y-6">
            <Input label="ZAR Asset Value" type="number" onChange={(e) => setExposure(Number(e.target.value))} />
            <Input label="Offshore Liquidity (%)" type="number" onChange={(e) => setOffshore(Number(e.target.value))} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Shielding Requirement" value={formatCurrency(requirement)} trend="45% Minimum Recommended" />
            <StatCard label="Current Exposure" value={exposure > 1000000 ? 'EXCESSIVE' : 'STABLE'} />
          </div>
        </div>
        
        <div className="space-y-8">
          <SovereigntyScore score={score} />
          <ZarChart />
        </div>
      </div>

      <div className="max-w-xl mx-auto pt-20 border-t border-white/5">
        <div className="text-center mb-12">
          <h3 className="text-white font-black uppercase tracking-widest text-sm mb-2">Request Structural Shielding</h3>
          <p className="text-gray-500 text-xs font-bold uppercase">Our auditors will contact you within 24 hours.</p>
        </div>
        <TriageForm />
      </div>
    </div>
  );
}
