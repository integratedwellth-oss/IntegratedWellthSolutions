import React from 'react';
import RevealOnScroll from '../RevealOnScroll';
import { PILLARS } from '../../constants';
import { Calculator, Brain, UserCheck, Briefcase, ShieldCheck, CheckCircle2, ArrowRight, Tag } from 'lucide-react';
import NewsTicker from '../NewsTicker';
import Button from '../Button';
import StrategicJourney from '../StrategicJourney';

const iconMap: Record<string, React.ReactNode> = {
  Calculator: <Calculator size={40} />,
  Brain: <Brain size={40} />,
  UserCheck: <UserCheck size={40} />,
  Briefcase: <Briefcase size={40} />,
  ShieldCheck: <ShieldCheck size={40} />,
};

const PACKAGES = [
  {
    num: '01',
    title: 'System Configuration & Setup',
    features: ['Chart of Accounts', 'Bank Account Integration', 'Invoices & Bills Setup', 'Open Balances Setup'],
    regular: 'R3,500.00',
    special: 'R2,625.00',
    saving: 'Save R875',
    note: 'Once-off setup',
  },
  {
    num: '02',
    title: 'Monthly Review & Journal Entries',
    features: ['Review monthly expenses', 'GL reconciliations', 'Process journal entries', 'Management accounts'],
    regular: 'R1,500.00',
    special: 'R1,125.00',
    saving: 'Save R375',
    note: 'Per month',
  },
  {
    num: '03',
    title: 'Monthly Bookkeeping',
    features: ['Bookkeeping services', 'Management Accounts', 'Annual Returns'],
    regular: 'R2,500.00',
    special: 'R1,875.00',
    saving: 'Save R625',
    note: 'Per month',
  },
  {
    num: '04',
    title: 'Annual Financial Statements & Returns',
    features: ['Turnover: R499k & below', 'Turnover: R500k & above', 'Annual SARS Return', 'Annual CIPC Return'],
    regular: 'R6,000.00',
    special: 'R4,500.00',
    saving: 'Save R1,500',
    note: 'Per annum',
  },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="animate-fadeIn bg-white">

      <div className="bg-brand-900 text-white pt-40 pb-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_hsla(174,84%,93%,0.2)_0,transparent_70%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <RevealOnScroll>
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12">
              <ShieldCheck size={14} className="text-brand-gold" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">The Strategic Ecosystem</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-sora font-extrabold tracking-tighter leading-[0.8] mb-12">
              PILLARS OF <br /> <span className="text-brand-gold italic">PRECISION.</span>
            </h1>
            <p className="text-xl md:text-3xl text-brand-100 max-w-4xl mx-auto font-light leading-relaxed">
              Accounting handles your history. We engineer your trajectory through multidisciplinary technical IQ and behavioral EQ.
            </p>
          </RevealOnScroll>
        </div>
      </div>

      <NewsTicker />

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/30 mb-6">
                <Tag size={14} className="text-brand-gold" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-900">April 2026 Offer — Limited Window</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter mb-4">
                Accounting <span className="text-brand-gold italic">Packages.</span>
              </h2>
              <p className="text-brand-900/60 text-xl max-w-2xl mx-auto leading-relaxed">
                Professional financial solutions for South African SMEs. Book before end of April to lock in your discounted rate.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg, index) => (
              <RevealOnScroll key={index} delay={index * 0.08} width="100%">
                <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-brand-900/5 hover:border-brand-gold hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col group">
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-3">{pkg.num}</div>
                  <h3 className="text-xl font-black text-brand-900 leading-tight mb-6 tracking-tight">{pkg.title}</h3>
                  <ul className="space-y-2 mb-8 flex-grow">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-brand-900/70 font-medium">
                        <CheckCircle2 size={15} className="text-brand-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-brand-900/10 pt-6">
                    <p className="text-xs text-brand-900/40 font-bold line-through mb-1">Regular {pkg.regular}</p>
                    <p className="text-3xl font-black text-brand-900 tracking-tighter">{pkg.special}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{pkg.saving}</span>
                      <span className="text-[10px] text-brand-900/40 font-bold">{pkg.note}</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-6 rounded-2xl py-4 font-black uppercase tracking-widest text-[10px] border-brand-900/10 group-hover:border-brand-900 group-hover:bg-brand-900 group-hover:text-white transition-all"
                      onClick={() => window.location.hash = '#contact'}
                    >
                      Book Now <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <StrategicJourney />

      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 mb-40 items-center">
            <RevealOnScroll>
              <div className="space-y-10">
                <h2 className="text-6xl font-sora font-black text-brand-900 tracking-tighter leading-tight">
                  The Multidisciplinary <span className="text-brand-gold italic">Advantage.</span>
                </h2>
                <div className="space-y-6 text-brand-900/60 text-xl leading-relaxed font-medium">
                  <p>Integrated Wellth Solutions doesn't just look at your tax returns. We look at the <strong className="text-brand-900">human factor</strong> behind the capital.</p>
                  <p>Our framework is structured to ensure that as your enterprise scales, your organizational stability and mental clarity grow in parallel. This is the only way to achieve sustainable, generational wealth.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['Sovereignty Audits', 'Resilience Coaching', 'Operational Architecture', 'Implementation Guardrails'].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-6 bg-brand-50 rounded-3xl text-brand-900 font-bold text-sm border border-brand-900/5">
                      <CheckCircle2 size={20} className="text-brand-500" /> {item}
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}>
              <div className="relative group">
                <img
                  src="https://res.cloudinary.com/dka0498ns/image/upload/v1765321879/Integrated_Wellth_War_room_mfqafl.jpg"
                  alt="Strategy Session"
                  className="rounded-[4rem] shadow-2xl relative z-10 transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute -bottom-10 -right-10 w-full h-full bg-brand-gold rounded-[4rem] -z-0 opacity-20 group-hover:opacity-40 transition-opacity"></div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PILLARS.map((pillar, index) => (
              <RevealOnScroll key={index} delay={index * 0.1} width="100%">
                <div className="bg-gray-50 rounded-[3rem] p-12 border border-brand-900/5 hover:border-brand-gold hover:bg-white hover:shadow-2xl transition-all duration-500 h-full flex flex-col group">
                  <div className="w-16 h-16 bg-white text-brand-900 rounded-2xl flex items-center justify-center mb-12 shadow-sm group-hover:bg-brand-900 group-hover:text-white transition-all transform group-hover:rotate-6 border border-brand-900/5">
                    {iconMap[pillar.iconName]}
                  </div>
                  <h3 className="text-3xl font-black text-brand-900 mb-6 uppercase tracking-tighter leading-none">{pillar.title}</h3>
                  <p className="text-brand-900/60 leading-relaxed mb-12 flex-grow text-base">{pillar.description}</p>
                  <Button
                    variant="outline"
                    className="w-full rounded-2xl py-6 font-black uppercase tracking-widest text-[10px] border-brand-900/10 group-hover:border-brand-900"
                    onClick={() => window.location.hash = '#contact'}
                  >
                    Initiate Journey <ArrowRight size={14} className="ml-2" />
                  </Button>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-brand-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <Calculator size={600} className="absolute -left-20 -bottom-20" />
        </div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <h2 className="text-5xl md:text-7xl font-sora font-black mb-10 tracking-tighter">
            THE "WAIT AND SEE" <br /> STRATEGY IS <span className="text-brand-gold italic">OBSOLETE.</span>
          </h2>
          <p className="text-xl md:text-2xl text-brand-100/60 mb-16 font-medium leading-relaxed max-w-3xl mx-auto">
            In the SARS AI Era, data triangulation is instant. We provide a defensive buffer, informing you of potential anomalies before they become audit requests.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full px-20 py-10 text-2xl font-black uppercase tracking-widest bg-brand-gold text-brand-900 hover:bg-white transition-all shadow-2xl"
            onClick={() => window.location.hash = '#assessment'}
          >
            Initialize Reset Module
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
