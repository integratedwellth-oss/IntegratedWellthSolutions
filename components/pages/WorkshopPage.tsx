import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Menu, X, Calendar, Clock, MapPin, CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';
import RevealOnScroll from '../RevealOnScroll';
import Button from '../Button';
import WorkshopRegistrationForm from '../WorkshopRegistrationForm';

const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 256 256" fill="currentColor" {...props}>
    <path d="M 128.005 191.173 C 128.448 156.208 156.93 128 192 128 L 192 64 L 128 64 C 128 99.346 99.346 128 64 128 L 64 192 L 128 192 Z M 192 256 L 64 256 C 28.654 256 0 227.346 0 192 L 0 64 L 64 64 L 64 0 L 192 0 C 227.346 0 256 28.654 256 64 L 256 192 L 192 192 Z" />
  </svg>
);

const BRAND_STYLES: Record<string, React.CSSProperties> = {
  Stripe: { fontFamily: "Georgia, serif", fontWeight: 700, letterSpacing: "-0.02em", fontSize: "15px" },
  Coinbase: { fontFamily: "Arial, sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "13px", textTransform: "uppercase" },
  Uniswap: { fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, letterSpacing: "0.01em", fontSize: "15px", fontStyle: "italic" },
  Aave: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.12em", fontSize: "13px", textTransform: "uppercase" },
  Compound: { fontFamily: "Palatino, 'Book Antiqua', serif", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "16px" },
  MakerDAO: { fontFamily: "Impact, 'Arial Narrow', sans-serif", fontWeight: 400, letterSpacing: "0.04em", fontSize: "14px" },
  Chainlink: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "-0.03em", fontSize: "13px" }
};

const BACKER_STYLES: Record<string, React.CSSProperties> = {
  "Fundamental Labs": { fontFamily: "'Times New Roman', serif", fontWeight: 400, letterSpacing: "0.02em", fontSize: "14px" },
  KUCOIN: { fontFamily: "'Arial Black', sans-serif", fontWeight: 900, letterSpacing: "0.08em", fontSize: "16px" },
  NGC: { fontFamily: "Impact, sans-serif", fontWeight: 700, letterSpacing: "0.05em", fontSize: "18px" },
  NxGen: { fontFamily: "Georgia, serif", fontWeight: 600, letterSpacing: "-0.02em", fontSize: "17px" },
  "Matter Labs": { fontFamily: "Helvetica, sans-serif", fontWeight: 700, letterSpacing: "-0.01em", fontSize: "15px" },
  DEXTools: { fontFamily: "Verdana, sans-serif", fontWeight: 700, letterSpacing: "0.06em", fontSize: "14px", textTransform: "uppercase" },
  NGRAVE: { fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: "0.18em", fontSize: "14px" },
  Polychain: { fontFamily: "Palatino, serif", fontWeight: 500, letterSpacing: "0.03em", fontSize: "15px" }
};

const ASSESSMENT_QUESTIONS = [
  {
    q: "Do you have separate bank accounts for business and personal use?",
    options: [
      { text: "Yes, strictly separated", score: 10 },
      { text: "Mostly, but they sometimes mix", score: 5 },
      { text: "No, everything goes into one account", score: 0 }
    ]
  },
  {
    q: "Are your tax returns (SARS/VAT/PAYE) fully up to date?",
    options: [
      { text: "Yes, 100% compliant", score: 10 },
      { text: "I think so, but I am unsure", score: 5 },
      { text: "No, I have an active backlog", score: 0 }
    ]
  },
  {
    q: "Is your CIPC Annual Return paid and current?",
    options: [
      { text: "Yes, filed on time", score: 10 },
      { text: "I am not sure", score: 2 },
      { text: "No, might be deregistered", score: 0 }
    ]
  }
];

const WorkshopPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const brandItems = ["Stripe", "Coinbase", "Uniswap", "Aave", "Compound", "MakerDAO", "Chainlink"];
  const backerItems = ["Fundamental Labs", "KUCOIN", "NGC", "NxGen", "Matter Labs", "DEXTools", "NGRAVE", "Polychain"];

  const getFirstMondayDate = () => {
    const now = new Date();
    const startEvent = new Date(2026, 6, 6, 18, 0, 0, 0); // July 6, 2026
    if (now.getTime() <= startEvent.getTime()) return "Monday, 6 July 2026";
    const getFirstMonday = (y: number, m: number) => {
      const d = new Date(y, m, 1);
      while (d.getDay() !== 1) d.setDate(d.getDate() + 1);
      d.setHours(18, 0, 0, 0);
      return d;
    };
    let target = getFirstMonday(now.getFullYear(), now.getMonth());
    if (now.getTime() > target.getTime()) target = getFirstMonday(now.getFullYear(), now.getMonth() + 1);
    return new Intl.DateTimeFormat('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(target);
  };

  const nextEventDate = getFirstMondayDate();

  const handleAnswer = (points: number) => {
    const nextScore = score + points;
    setScore(nextScore);
    if (currentStep < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const getRiskProfile = (finalScore: number) => {
    if (finalScore >= 25) return { label: "LOW RISK", color: "text-emerald-500", desc: "Your basic compliance is solid. Book a free discovery call to audit your setup." };
    if (finalScore >= 12) return { label: "MODERATE RISK", color: "text-brand-gold", desc: "Critical administrative gaps exist. Let's trace and clean them up." };
    return { label: "HIGH RISK", color: "text-rose-500", desc: "Your entity is exposed to penalties. Immediate action is required." };
  };

  return (
    <div className="flex flex-col bg-[#F5F5F5] font-sans text-brand-900 selection:bg-brand-gold/20 antialiased min-h-screen">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marquee 22s linear infinite; }
        .backers-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
        .marquee-track:hover, .backers-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="h-screen flex flex-col overflow-hidden relative">
        <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5 bg-transparent">
          <div className="max-w-[88rem] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.location.hash = '#home'}>
              <LogoIcon className="w-7 h-7 text-brand-900" />
              <span className="text-2xl font-semibold tracking-tight text-brand-900 uppercase">Halo</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              {['Network', 'Ecosystem', 'Rewards', 'Help', 'News'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-base text-brand-900/70 hover:text-brand-900 font-medium transition-colors duration-200 uppercase tracking-wider text-[11px]">{link}</a>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-4">
              <button onClick={() => window.location.hash = '#registration'} className="bg-brand-900 text-white text-base font-medium px-7 py-2.5 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-colors duration-200 uppercase tracking-widest text-xs">Open Wallet</button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden p-2 text-brand-900" aria-label="Open Menu"><Menu size={28} /></button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] bg-brand-900 flex flex-col p-8 overflow-y-auto animate-fadeIn">
            <button onClick={() => setIsMobileMenuOpen(false)} className="self-end text-white mb-8" aria-label="Close Menu"><X size={32} /></button>
            <div className="flex flex-col gap-6">
              {['Network', 'Ecosystem', 'Rewards', 'Help', 'News'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-black uppercase text-left tracking-tight hover:text-brand-gold transition-colors">{link}</a>
              ))}
              <button onClick={() => { setIsMobileMenuOpen(false); window.location.hash = '#registration'; }} className="flex items-center justify-center bg-brand-gold text-brand-900 px-6 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all mt-4">Open Wallet</button>
            </div>
          </div>
        )}

        <section className="flex-1 px-6 pt-20 pb-6 flex items-end relative z-10">
          <div className="max-w-[88rem] mx-auto w-full">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl" style={{ height: 'calc(100vh - 96px)' }}>
              <video autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F5F5F5]/90 via-[#F5F5F5]/60 to-transparent z-0" />
              <div className="relative z-10 flex flex-col items-start justify-start h-full p-12 pt-36 max-w-2xl">
                <h1 className="text-brand-900 text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-4 uppercase tracking-tighter" style={{ letterSpacing: '-0.04em' }}>Your Wealth<br/>Works</h1>
                <p className="text-brand-900/80 text-base md:text-lg mb-8 leading-relaxed font-medium max-w-md">An automated, reward-powered digital dollar built for native passive earnings and effortless connection into DeFi protocols.</p>
                <button onClick={() => { document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-3 bg-brand-900 text-white text-base md:text-lg font-semibold pl-8 pr-2 py-2 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all duration-200 group shadow-lg">
                  <span className="uppercase tracking-widest text-xs font-bold">Join us</span>
                  <div className="bg-white rounded-full p-2 group-hover:bg-brand-900 transition-colors"><ArrowRight className="w-5 h-5 text-brand-900 group-hover:text-white transition-colors" /></div>
                </button>
                <div className="mt-24 w-full max-w-md overflow-hidden border-t border-brand-900/10 pt-6">
                  <div className="marquee-track">
                    {brandItems.concat(brandItems).map((item, idx) => (
                      <span key={idx} className="mx-7 shrink-0 text-brand-900/60 whitespace-nowrap transition-colors hover:text-brand-gold cursor-default" style={BRAND_STYLES[item]}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute bottom-12 right-12 hidden lg:block z-20">
                <div className="p-6 rounded-3xl border border-brand-900/10 bg-white/80 backdrop-blur-md shadow-2xl max-w-[320px]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-900 text-brand-gold flex items-center justify-center shadow-inner"><ShieldCheck size={24} /></div>
                    <div className="flex flex-col">
                      <span className="text-[9px] font-black text-brand-900/40 uppercase tracking-[0.2em] leading-none">Security Status</span>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">Audit Shield Active</span>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-brand-900 leading-snug">Predictive Capital Tracking<br/><span className="text-brand-gold font-black italic text-sm">Automated Governance Core</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[#F5F5F5] px-6 py-24 border-t border-brand-900/5">
        <div className="max-w-[88rem] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
            <RevealOnScroll>
              <div>
                <h2 className="text-brand-900 text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8 uppercase tracking-tighter" style={{ letterSpacing: '-0.03em' }}>Meet USD Halo.</h2>
                <button onClick={() => { document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-3 bg-brand-900 text-white text-base font-semibold pl-8 pr-2 py-2 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all duration-200 group shadow-md">
                  <span className="uppercase tracking-widest text-xs font-bold">Discover it</span>
                  <div className="bg-white rounded-full p-2 group-hover:bg-brand-900 transition-colors"><ArrowRight className="w-4 h-4 text-brand-900 group-hover:text-white transition-colors" /></div>
                </button>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.2}><p className="text-brand-900/70 text-2xl md:text-3xl leading-relaxed font-light">USD Halo is a reward-earning dollar coin that lets your savings grow securely while remaining perfectly anchored to the U.S. dollar.</p></RevealOnScroll>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <RevealOnScroll width="100%" className="sm:col-span-2 lg:col-span-2">
              <div className="rounded-2xl overflow-hidden shadow-xl p-7 min-h-80 flex flex-col justify-between relative border border-brand-900/5" style={{ backgroundImage: "url('https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260423_164207_f243351d-ed59-48ec-83a0-a5e996bdbe3c.png&w=1280&q=85')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-0" />
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[260px] w-full">
                  <h4 className="text-brand-900 text-2xl font-semibold leading-snug uppercase tracking-tight" style={{ letterSpacing: '-0.02em' }}>Savings that bloom</h4>
                  <p className="text-brand-900/70 text-base max-w-xs font-medium leading-relaxed">Gain steady returns as your dollar tokens are routed dynamically into top-performing DeFi strategies.</p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll width="100%">
              <div className="bg-brand-900 rounded-2xl p-7 min-h-80 flex flex-col justify-between shadow-xl border border-white/10 relative overflow-hidden group hover:border-brand-gold transition-colors">
                <h4 className="text-white text-2xl font-semibold leading-tight uppercase tracking-tight">Always fluid,<br/>always pegged.</h4>
                <p className="text-brand-100/60 text-base font-medium leading-relaxed">Keep fully dollar-anchored with on-demand access to your capital framework — no artificial lockups or waits.</p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll width="100%">
              <div className="bg-brand-900 rounded-2xl p-7 min-h-80 flex flex-col justify-between shadow-xl border border-white/10 relative overflow-hidden group hover:border-brand-gold transition-colors">
                <h4 className="text-brand-gold text-2xl font-semibold leading-tight uppercase tracking-tight">Fully<br/>automated</h4>
                <p className="text-brand-100/60 text-base font-medium leading-relaxed">Skip the manual task of rebalancing capital positions yourself. USD Halo operations run securely in the background.</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-12 border-b border-brand-900/5">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
          <div className="md:col-span-1"><p className="text-brand-900/70 text-base leading-relaxed font-bold uppercase tracking-wide text-xs">Funded by premier partners<br/>and forward-thinking leaders.</p></div>
          <div className="md:col-span-3 overflow-hidden py-4">
            <div className="backers-track">
              {backerItems.concat(backerItems).map((item, idx) => (
                <span key={idx} className="mx-10 shrink-0 text-brand-900/50 whitespace-nowrap transition-colors hover:text-brand-gold cursor-default" style={BACKER_STYLES[item]}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 60-Second Compliance Audit Integration */}
      <section className="py-24 bg-brand-900 text-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold uppercase tracking-tighter text-brand-gold">60-Second Compliance Check</h2>
            <p className="text-brand-100 max-w-2xl mx-auto text-base">Check your entity standing instantly, then book a free discovery call to secure your operational blueprint.</p>
          </div>
          <div className="bg-white text-brand-900 p-8 md:p-12 rounded-[2.5rem] shadow-2xl">
            {!showResults ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Step {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}</span>
                  <HelpCircle size={20} className="text-brand-gold" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight">{ASSESSMENT_QUESTIONS[currentStep].q}</h3>
                <div className="grid gap-4">
                  {ASSESSMENT_QUESTIONS[currentStep].options.map((opt, idx) => (
                    <button key={idx} onClick={() => handleAnswer(opt.score)} className="group p-5 text-left rounded-xl border-2 border-brand-900/5 hover:border-brand-gold bg-[#F5F5F5] hover:bg-white transition-all flex justify-between items-center font-bold text-sm">
                      <span>{opt.text}</span>
                      <ArrowRight size={16} className="text-brand-900/20 group-hover:text-brand-gold transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center space-y-8 py-4">
                <AlertTriangle size={64} className="text-brand-gold mx-auto animate-bounce" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Assessment Complete</h3>
                  <p className="text-lg font-bold">Your Entity standing is:</p>
                  <span className={`inline-block text-2xl font-black ${getRiskProfile(score).color}`}>{getRiskProfile(score).label}</span>
                </div>
                <p className="text-gray-600 max-w-md mx-auto">{getRiskProfile(score).desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="font-bold text-brand-900 mb-6 uppercase tracking-wider">Book Your Free Discovery Call</h4>
                  <Button onClick={() => window.open('https://calendly.com/marcia-kgaphola/new-meeting', '_blank')} size="lg" className="rounded-full py-4 px-12 bg-brand-900 text-white hover:bg-brand-gold hover:text-brand-900 transition-all font-black uppercase tracking-widest text-xs shadow-lg">
                    Book Free Consultation
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] px-6 py-24">
        <div className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="md:pr-12 md:pt-2 space-y-6">
            <div>
              <span className="text-brand-gold text-sm font-black uppercase tracking-[0.3em] block mb-2">USD Halo in Practice</span>
              <h2 className="text-brand-900 text-5xl md:text-6xl lg:text-7xl font-semibold leading-none uppercase tracking-tighter" style={{ letterSpacing: '-0.04em' }}>Use modes</h2>
            </div>
            <p className="text-brand-900/60 text-base leading-relaxed max-w-sm font-medium">USD Halo powers a wide range of secure integration modes for builders, corporate enterprises, and treasuries looking for strategic asset sovereignty.</p>
            <div className="pt-10 space-y-4">
              {['Institutional Yield Buffers', 'Frictionless Payroll Gateways', 'Error-Free Data Trails'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-brand-900/5 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span className="text-sm font-bold uppercase tracking-wide text-brand-900">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden min-h-[720px] shadow-2xl border border-brand-900/10 flex flex-col justify-end group">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover absolute inset-0" src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_183428_ab5e672a-f608-4dcb-b319-f3e040f02e2d.mp4" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/40 to-transparent z-0" />
            <div className="relative z-10 p-10 md:p-12 text-white">
              <h3 className="text-white text-4xl md:text-5xl font-semibold leading-tight mb-5 uppercase tracking-tighter" style={{ letterSpacing: '-0.03em' }}>Commerce</h3>
              <p className="text-brand-100/80 text-base max-w-md mb-8 font-medium leading-relaxed">Lift customer retention by offering USD Halo, a trusted dollar-backed stablecoin with strong yields, letting your patrons earn with zero effort on your platform.</p>
              <a href="#registration" className="inline-flex items-center gap-4 group/link">
                <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur flex items-center justify-center group-hover/link:bg-brand-gold transition-colors"><ArrowRight className="w-4 h-4 text-brand-900" /></div>
                <span className="text-xs font-black uppercase tracking-widest text-white group-hover/link:text-brand-gold transition-colors">Know more</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-brand-900/5">
        <div className="max-w-[88rem] mx-auto px-6">
          <RevealOnScroll width="100%">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-semibold text-brand-900 tracking-tighter uppercase">Workshop Curriculum</h2>
              <p className="text-lg text-brand-900/60 font-medium mt-2">Actionable system architecture for modern fintech integrations.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Stablecoin Architecture", desc: "Mastering the mechanics of USD Halo, liquidity endpoints, and programmatic asset protections from protocol vulnerabilities." },
                { title: "Automated Yield Routing", desc: "Understanding background routing parameters, ledger balancing, and audit-proof financial data triangulation." },
                { title: "Sovereign Integration", desc: "Deploying frictionless commerce checkouts and building custom corporate treasury guardrails safely." }
              ].map((module, idx) => (
                <div key={idx} className="bg-gray-50 p-10 rounded-[2.5rem] shadow-sm border border-brand-900/5 hover:-translate-y-2 hover:shadow-xl hover:border-brand-gold transition-all duration-300">
                  <div className="w-12 h-12 bg-brand-900 text-brand-gold rounded-xl flex items-center justify-center font-bold text-xl mb-6">{idx + 1}</div>
                  <h3 className="text-xl font-semibold text-brand-900 uppercase tracking-tight mb-4">{module.title}</h3>
                  <p className="text-brand-900/70 leading-relaxed font-medium text-sm">{module.desc}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F5]" id="registration">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-semibold text-brand-900 tracking-tighter uppercase">Secure Your <br/> <span className="text-brand-gold italic">Seat.</span></h2>
            <p className="text-lg text-brand-900/60 mt-6 font-medium max-w-2xl mx-auto">Complete the tracking profile registration below to reserve your workshop token credentials.</p>
          </div>
          <RevealOnScroll width="100%">
            <WorkshopRegistrationForm 
              eventName="USD Halo Yield & Compliance Integration Intensive"
              eventDate={`${nextEventDate}, 18h00 - 20h00`}
              eventLink="https://calendly.com/marcia-kgaphola/new-meeting"
            />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

export default WorkshopPage;
