import React, { useState } from 'react';
import Input from '../components/Input';
import SovereigntyScore from '../components/SovereigntyScore';

export default function WarRoom() {
  const [exposure, setExposure] = useState(0);
  const [offshore, setOffshore] = useState(0);
  
  // Logic: More exposure = lower score. More offshore = higher score.
  const baseScore = 100 - (exposure > 0 ? 40 : 0) + (offshore > 50 ? 20 : 0);
  const finalScore = Math.min(Math.max(baseScore, 5), 99);

  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        <div className="space-y-12">
          <header>
            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Exposure Audit</h2>
            <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Intelligence Terminal v1.0</p>
          </header>
          
          <div className="space-y-8">
            <Input 
              label="ZAR Asset Exposure" 
              type="number" 
              placeholder="Total value in Rands"
              onChange={(e) => setExposure(Number(e.target.value))}
            />
            <Input 
              label="Offshore Allocation (%)" 
              type="number" 
              placeholder="e.g. 20"
              onChange={(e) => setOffshore(Number(e.target.value))}
            />
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <SovereigntyScore score={finalScore} />
        </div>
      </div>
    </div>
  );
}
