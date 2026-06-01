import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Button from '../Button';
import { Monitor, Tag, ChevronRight, Calculator, TrendingUp, BrainCircuit, XCircle } from 'lucide-react';

const FOUNDER_URL = "https://res.cloudinary.com/dkyg07qvv/image/upload/v1778472133/Marcia_Kgaphola._SARS._CIPC._COMPLIANCE_e9mn4f.jpg";
const TREE_LOGO_URL = "https://res.cloudinary.com/dka0498ns/image/upload/v1765747786/favicon_ofkkb1.png";

const ExclusiveWorkshopPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" className="bg-white selection:bg-brand-gold/20 font-sans overflow-hidden">
      
      <div ref={containerRef} className="bg-[#f4f1ea] text-brand-900 pt-32 pb-20 px-6 relative border-b-8 border-brand-900">
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#134e4a 1px, transparent 1px), linear-gradient(90deg, #134e4a 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={staggerContainer} className="space-y-8">
            <motion.div variants={fadeUp} className="flex justify-start mb-6">
              <img src={TREE_LOGO_URL} alt="IWS Logo" className="w-32 h-32 object-contain" />
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-sora font-black tracking-tighter uppercase leading-[1.1] text-brand-900">
              Governance & <br className="hidden md:block"/> <span className="text-brand-900">Compliance</span>
            </motion.h1>
            
            <motion.div variants={fadeUp} className="flex items-center gap-4 font-black tracking-widest uppercase text-lg md:text-2xl text-brand-900">
              <span>CIPC</span><span className="text-brand-gold">|</span><span>SARS</span><span className="text-brand-gold">|</span><span>Labour</span>
            </motion.div>

            <motion.div variants={fadeUp} whileHover={{ scale: 1.02 }} className="bg-brand-900 text-white p-6 rounded-r-3xl rounded-l-md shadow-2xl inline-block mt-8 border-l-8 border-brand-gold relative overflow-hidden">
              <div className="absolute -right-10 -top-10 opacity-10"><Calculator size={120} /></div>
              <div className="relative z-10">
                <div className="inline-flex bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
                  Registration Closed
                </div>
                <p className="text-2xl md:text-3xl font-black tracking-tight mb-2 opacity-50 line-through">1st June, 18h00–19h00</p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-bold tracking-widest uppercase text-brand-gold mt-4">
                  <span className="flex items-center gap-2"><Monitor size={16} /> Online Session</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block"></span>
                  <span className="flex items-center gap-2 text-red-400"><XCircle size={16} /> Fully Booked</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-8">
              <Button onClick={() => { document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' }); }} className="rounded-full py-5 px-10 text-sm font-black uppercase tracking-widest bg-brand-gold text-brand-900 hover:bg-brand-900 hover:text-white shadow-xl transition-all flex items-center">
                View Alternatives <ChevronRight size={18} className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white">
            <motion.img style={{ y: imageY, scale: 1.1 }} src={FOUNDER_URL} alt="Marcia Kgaphola" className="w-full h-full object-cover origin-bottom" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-900 to-transparent p-8 pt-32">
              <p className="text-white font-black uppercase tracking-widest text-xl">Marcia Kgaphola</p>
              <p className="text-brand-gold font-bold text-xs uppercase tracking-widest">Principal Architect</p>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="py-24 bg-brand-900 text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10">
          <motion.p variants={fadeUp} className="text-2xl md:text-4xl font-sora font-medium leading-relaxed tracking-tight">
            <span className="font-black italic text-brand-gold">Governance</span> sets the direction, proper accounting provides the evidence, and financial psychology secures your growth.
          </motion.p>
          <motion.div variants={fadeUp} className="w-24 h-1 bg-brand-gold/30 mx-auto rounded-full"></motion.div>
          <motion.div variants={fadeUp} className="space-y-6">
            <p className="text-xl md:text-2xl font-bold leading-relaxed text-white/90">Can't participate in tenders or excluded from funding?</p>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-brand-gold">Master the triad of compliance to secure your business opportunities.</p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="py-24 bg-white border-y border-brand-900/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-sora font-black text-brand-900 tracking-tighter mb-4">Workshop Curriculum</h2>
            <p className="text-lg text-brand-900/60 font-medium">Actionable intelligence bridging finance, accounting, and behavior.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Calculator size={32} />, title: "Accounting & Structure", subtitle: "CIPC Navigation", desc: "Mastering Annual Returns and Beneficial Ownership. We structure your accounting foundation to protect your entity from deregistration." },
              { icon: <TrendingUp size={32} />, title: "Financial Architecture", subtitle: "SARS Intelligence", desc: "Understanding Provisional Tax and VAT thresholds. Build audit-proof ledgers that turn raw financial data into strategic leverage." },
              { icon: <BrainCircuit size={32} />, title: "Organizational Psychology", subtitle: "Labour Dynamics", desc: "Structuring PAYE, UIF, and SDL. We align your payroll compliance with human behavior to protect your workforce and prevent compounding penalties." }
            ].map((module, idx) => (
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -10 }} className="bg-gray-50 p-10 rounded-[2.5rem] shadow-sm border border-brand-900/5 hover:shadow-xl hover:border-brand-gold transition-all duration-300 relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500 text-brand-900">{module.icon}</div>
                <div className="w-16 h-16 bg-brand-900 text-brand-gold rounded-2xl flex items-center justify-center mb-6 shadow-md">{module.icon}</div>
                <h3 className="text-xl font-black text-brand-900 uppercase tracking-tight mb-1">{module.title}</h3>
                <p className="text-brand-gold font-bold text-xs uppercase tracking-widest mb-4">{module.subtitle}</p>
                <p className="text-brand-900/70 leading-relaxed font-medium text-sm relative z-10">{module.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Replaced Registration Form with Sold Out State */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="py-32 bg-[#f4f1ea]" id="registration">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-sora font-black text-brand-900 tracking-tighter uppercase">Workshop <br/> <span className="text-brand-gold italic">Sold Out.</span></h2>
            <p className="text-lg text-brand-900/60 mt-6 font-medium max-w-2xl mx-auto">All available seats for this exclusive session have been filled. Group registration is now officially closed.</p>
          </div>
          
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl text-center border-t-8 border-brand-900 max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-rose-100">
                <XCircle size={40} className="text-rose-500" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-brand-900 uppercase tracking-tighter mb-4">Maximum Capacity Reached</h3>
              <p className="text-brand-900/60 font-medium leading-relaxed mb-10 max-w-xl mx-auto text-lg">
                We strictly cap these sessions to ensure high-fidelity strategic interaction. While you missed this cohort, you don't have to put your compliance on hold. Secure your blueprint through a private, 1-on-1 strategy session.
              </p>
              <Button onClick={() => window.open('https://calendly.com/marcia-kgaphola/new-meeting', '_blank')} size="lg" className="rounded-full px-12 py-6 bg-brand-900 text-white font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-900 transition-all shadow-xl">
                Book Private 1-on-1 Session
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
};

export default ExclusiveWorkshopPage;
