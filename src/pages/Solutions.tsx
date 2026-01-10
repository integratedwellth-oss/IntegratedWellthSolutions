import React from 'react';
import { 
  Building2, 
  Rocket, 
  HeartHandshake, 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  Target, 
  CheckCircle2,
  BarChart4
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Solutions = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'existing',
      title: 'Established Entities',
      subtitle: 'Operational Fortification',
      icon: <Building2 className="text-brand-gold" size={24} />,
      description: 'For businesses with established revenue but fragmented governance. We bridge the gap between technical accounting and executive leadership psychology.',
      features: ['Internal Control Engineering', 'Behavioral Fiscal Audits', 'Tax Sovereign Strategy'],
      color: 'border-brand-gold'
    },
    {
      id: 'startups',
      title: 'High-Growth Startups',
      subtitle: 'Foundation Engineering',
      icon: <Rocket className="text-brand-gold" size={24} />,
      description: 'Scaling requires more than capital; it requires a structural DNA that survives growth. We implement military-grade systems for rapid-scale founders.',
      features: ['Burn-Rate Optimization', 'Compliance Roadmap', 'Investor-Ready Governance'],
      color: 'border-slate-400'
    },
    {
      id: 'ngo',
      title: 'NGOs & NPOs',
      subtitle: 'Institutional Integrity',
      icon: <HeartHandshake className="text-brand-gold" size={24} />,
      description: 'Translating social impact into financial transparency. We ensure your organization meets the highest global standards of fiscal accountability.',
      features: ['Donor-Grade Reporting', 'Statutory Alignment', 'Sustainability Modeling'],
      color: 'border-brand-gold'
    },
    {
      id: 'youth',
      title: 'Teens & Youth',
      subtitle: 'Behavioral Legacy',
      icon: <GraduationCap className="text-brand-gold" size={24} />,
      description: 'The "Integrated Wellth" approach applied to the next generation. Engineering financial IQ and wealth psychology before bad habits take root.',
      features: ['Wealth Psychology 101', 'Practical Fiscal Literacy', 'Legacy Mindset Training'],
      color: 'border-slate-400'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 font-inter">
      {/* HEADER SECTION */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="max-w-3xl">
          <span className="text-brand-gold font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Strategic Alignment</span>
          <h1 className="text-4xl md:text-6xl font-black text-brand-900 font-sora tracking-tighter leading-tight mb-6">
            Who We <span className="text-brand-gold text-slate-400 italic">Serve.</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            We do not offer "accounting services." We engineer financial sovereignty for specific tiers of leadership. Select your sector to view the deployment protocol.
          </p>
        </div>
      </section>

      {/* QUADRANT GRID */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        {categories.map((item) => (
          <div 
            key={item.id}
            className={`group bg-white border-t-4 ${item.color} p-10 rounded-br-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}
          >
            {/* Background Accent */}
            <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
              {item.icon}
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-brand-900 group-hover:text-white transition-colors duration-500">
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest block">{item.subtitle}</span>
                  <span className="text-[10px] font-bold text-emerald-600 flex items-center justify-end gap-1 uppercase tracking-tighter">
                    <ShieldCheck size={12} /> Priority Access
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-brand-900 font-sora uppercase tracking-tight mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  {item.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 border-t border-slate-100 pt-6 mb-8">
                {item.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs font-bold text-brand-900">
                    <CheckCircle2 size={14} className="text-brand-gold" />
                    {feature}
                  </div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/contact')}
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-900 group-hover:text-brand-gold transition-colors"
              >
                Request Consultation <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* METHODOLOGY TEASER (Accounting + Psychology) */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="bg-brand-900 rounded-[3rem] p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-gold/5 pointer-events-none skew-x-12 transform translate-x-20"></div>
          
          <div className="lg:max-w-xl space-y-6 relative z-10">
            <h2 className="text-3xl font-black font-sora leading-tight">The IWS Unified <br/><span className="text-brand-gold">Architecture.</span></h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Regardless of sector, every client undergoes our proprietary **"War Room Triage."** We measure your Behavioral EQ against your Financial IQ to identify the "Blind Spots" costing you sovereignty.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">
                <BarChart4 size={14} className="text-brand-gold" /> Data Rigor
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest">
                <Target size={14} className="text-brand-gold" /> Strategic Intent
              </div>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => navigate('/war-room')}
              className="px-12 py-6 bg-brand-gold text-brand-900 font-black uppercase text-xs tracking-[0.2em] rounded-full hover:scale-105 transition-all shadow-xl"
            >
              Run Diagnostic
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
