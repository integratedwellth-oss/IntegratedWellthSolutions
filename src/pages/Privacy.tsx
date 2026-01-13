import React from 'react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-gray-400 space-y-8">
      <h1 className="text-white text-4xl font-black uppercase italic tracking-tighter">Privacy Protocol</h1>
      <section className="space-y-4">
        <h2 className="text-[#C5A059] font-bold uppercase text-xs tracking-widest">Data Sovereignty</h2>
        <p className="text-sm leading-relaxed">
          IWS Sovereignty utilizes high-level encryption for all structural audit data. Your financial exposure metrics are never stored on public servers; they are sequestered within our private Firebase vault.
        </p>
      </section>
      <section className="space-y-4 pt-8 border-t border-white/5">
        <h2 className="text-[#C5A059] font-bold uppercase text-xs tracking-widest">Information Collection</h2>
        <p className="text-sm leading-relaxed">
          We collect only the intelligence necessary to perform structural shielding audits. This includes name, contact details, and self-reported asset values.
        </p>
      </section>
    </div>
  );
}
