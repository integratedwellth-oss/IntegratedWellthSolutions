import React from 'react';
import { Check, Phone, Mail } from 'lucide-react';

const WorkshopFlyer: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 p-10 font-sans">
      
      {/* 1080x1350 Canvas (Exact 4:5 Aspect Ratio for High-Res Social Media) */}
      <div 
        className="w-[1080px] h-[1350px] bg-[#EADDD5] relative shadow-2xl overflow-hidden" 
        style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 2px, transparent 2px)', backgroundSize: '30px 30px' }}
      >
        
        {/* Top Red Ribbon */}
        <div className="absolute top-16 left-[-20px] right-[-20px] bg-[#9B1C1C] border-y-[6px] border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.3)] z-30 flex justify-center items-center h-24 transform -rotate-1">
           <span className="text-5xl">🔥</span>
           <h1 className="text-white font-black text-5xl tracking-widest mx-6 uppercase drop-shadow-md">Secure Your Seat For May</h1>
           <span className="text-5xl">🔥</span>
        </div>

        {/* Tree Logo */}
        <img 
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png" 
          alt="Tree Logo" 
          className="absolute top-48 left-12 w-[350px] z-10 drop-shadow-2xl" 
        />

        {/* Title Dark Green Box */}
        <div className="absolute top-[220px] right-12 w-[650px] bg-[#0A3020] border-[6px] border-[#165538] shadow-2xl z-20 p-8 flex flex-col items-center text-center">
          <h2 className="text-[#D4AF37] font-black text-[2.75rem] uppercase tracking-tighter leading-tight mb-2">Governance, Recordkeeping,</h2>
          <h3 className="text-white font-black text-[2.1rem] uppercase tracking-widest border-t-[3px] border-[#D4AF37] pt-3 mt-1">& Compliance Workshop</h3>
        </div>

        {/* Marcia Image (Right Side) */}
        <div className="absolute top-[420px] right-12 z-10">
          <div className="w-[480px] h-[620px] bg-brand-900 rounded-t-full rounded-b-[4rem] overflow-hidden border-[10px] border-white shadow-2xl">
            <img 
              src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778472133/Marcia_Kgaphola._SARS._CIPC._COMPLIANCE_e9mn4f.jpg" 
              className="w-full h-full object-cover object-top" 
              alt="Marcia Kgaphola"
            />
          </div>
          {/* Name Tag */}
          <div className="absolute -bottom-6 -left-8 bg-white px-8 py-5 rounded-2xl shadow-xl border-l-8 border-[#D4AF37]">
            <p className="font-black text-[#0A3020] text-2xl uppercase tracking-tighter">Marcia Kgaphola</p>
            <p className="font-bold text-[#0A3020]/60 text-sm uppercase tracking-widest mt-1">Principal Architect</p>
          </div>
        </div>

        {/* Checklist (Left Side) */}
        <div className="absolute top-[520px] left-16 z-20 space-y-10 w-[480px]">
          {[
            "CIPC | SARS | Labour",
            "Avoid Deregistration & Penalties",
            "Build Audit-Ready Records",
            "Secure Tenders & Funding"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-[#0A3020] flex items-center justify-center flex-shrink-0 shadow-lg">
                <Check size={36} className="text-[#D4AF37] stroke-[4]" />
              </div>
              <span className="font-black text-[1.75rem] text-[#0A3020] tracking-tight leading-tight">{item}</span>
            </div>
          ))}
        </div>

        {/* Date & Price Boxes */}
        <div className="absolute top-[900px] left-16 z-20 w-[480px]">
          <div className="bg-[#0A3020] border-[6px] border-[#165538] p-8 shadow-2xl relative rounded-xl">
            <p className="text-white font-black text-4xl tracking-wide text-center">22nd May, 18h00–20h00</p>
            <p className="text-[#D4AF37] font-bold text-center mt-3 tracking-widest text-xl">ONLINE SESSION</p>
            
            {/* Red Price Tag overlapping */}
            <div className="absolute -right-16 -bottom-14 bg-[#9B1C1C] border-[6px] border-[#D4AF37] px-12 py-6 shadow-2xl transform rotate-3 rounded-2xl">
              <p className="text-white font-black text-6xl drop-shadow-md tracking-tighter">R250.00</p>
              <p className="text-[#D4AF37] font-black text-2xl text-center tracking-widest mt-2">PER PERSON</p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Area */}
        <div className="absolute bottom-12 left-16 right-16 z-20">
          <div className="border-y-4 border-[#0A3020]/20 py-8 flex justify-between items-center px-8">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#0A3020] rounded-full flex items-center justify-center shadow-lg">
                <Mail className="text-white" size={32} />
              </div>
              <span className="font-black text-[2rem] text-[#0A3020] tracking-tighter">INTEGRATEDWELLTH</span>
            </div>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-[#0A3020] rounded-full flex items-center justify-center shadow-lg">
                <Phone className="text-white" size={32} />
              </div>
              <span className="font-black text-[2rem] text-[#0A3020] tracking-tighter">081 235 5910</span>
            </div>
          </div>
          <div className="text-center mt-8">
            <span className="font-black text-[2.5rem] text-[#0A3020] tracking-widest underline decoration-[#D4AF37] decoration-8 underline-offset-8">www.integratedwellth.co.za</span>
          </div>
        </div>

        {/* Faded Roots Watermark */}
        <img 
          src="https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png" 
          alt="Watermark"
          className="absolute -bottom-40 left-1/2 transform -translate-x-1/2 w-[800px] opacity-[0.07] rotate-180 pointer-events-none" 
        />

      </div>
    </div>
  );
};

export default WorkshopFlyer;
