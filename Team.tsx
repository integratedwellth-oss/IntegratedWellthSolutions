
import React from 'react';
import { motion } from "framer-motion";
import { Mail, Target, Compass, Heart, Linkedin, Globe, ShieldCheck, Sparkles, Zap, ShieldAlert, Cpu } from "lucide-react";
import RevealOnScroll from './components/RevealOnScroll';

const OTHER_TEAM = [
  {
    name: "Thabo Leslie Motsumi",
    role: "AI & Digital Marketing Specialist",
    bio: "Expert in AI, Google My Business Profile Optimization, SEO Automation, and Smart Digital Marketing systems. Ensuring your business remains visible in an AI-driven economy.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069617/Thabo_Leslie_Motsumi._AI_Google_my_Business_profile_optimization_Search_Everywhere_Optimation_SEO_Automation_and_Smart_digital_marketing._vncyse.png",
    email: "thabo@integratedwellth.co.za"
  },
  {
    name: "Enias Mafokoane",
    role: "Executive Coach",
    bio: "Driving professional excellence and leadership development through tailored executive coaching. Focusing on mindset transformation for sustainable performance.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Enias_Mafokoane._Executive_Coach_dd47qt.jpg",
    email: "info@integratedwellth.co.za"
  },
  {
    name: "Lazarus Kaseke",
    role: "Chartered Accountant (SA)",
    bio: "Ensuring financial integrity and robust governance structures for sustainable business growth. Specializing in institutional compliance and forensic audits.",
    image: "https://res.cloudinary.com/dka0498ns/image/upload/v1766069615/Lazarus_Kaseke._CA_SA_sbcpnw.jpg",
    email: "info@integratedwellth.co.za"
  }
];

const Team = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Principal Architect Section - Featured Bio */}
        <section className="mb-40">
           <RevealOnScroll>
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 {/* Portrait with Tactical Feel */}
                 <div className="lg:w-1/2 relative">
                    <div className="absolute -inset-4 border-2 border-brand-gold/20 rounded-[4rem] -rotate-2 z-0"></div>
                    <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] aspect-[4/5] bg-brand-900/5">
                       <img 
                          src="https://res.cloudinary.com/dka0498ns/image/upload/v1768022744/Marcia_Kgaphola._The_founder_of_Integrated_Wellth_Solution_giving_a_keynote_speech_at_a_women_business_conference_rr55ol.jpg" 
                          alt="Marcia Kgaphola" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                       />
                       {/* Operational Stats Overlay */}
                       <div className="absolute bottom-10 left-10 right-10 flex gap-2">
                          {[
                            { label: "Strategy", val: "15+ Years" },
                            { label: "Status", val: "Active Sentinel" },
                            { label: "Focus", val: "Decoupling" }
                          ].map((stat, i) => (
                            <div key={i} className="flex-1 bg-brand-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center">
                               <p className="text-[7px] font-black uppercase tracking-widest text-brand-gold mb-1">{stat.label}</p>
                               <p className="text-[10px] font-bold text-white uppercase">{stat.val}</p>
                            </div>
                          ))}
                       </div>
                    </div>
                 </div>

                 {/* Architect Text Context */}
                 <div className="lg:w-1/2 space-y-10">
                    <div className="space-y-4">
                       <div className="inline-flex items-center gap-2 text-brand-gold font-black uppercase tracking-[0.5em] text-[10px]">
                          <Zap size={14} className="animate-pulse" />
                          <span>Principal Architect & Founder</span>
                       </div>
                       <h1 className="text-6xl md:text-8xl font-sora font-extrabold text-brand-900 tracking-tighter leading-none">
                          MARCIA <br/> <span className="text-brand-gold italic">KGAPHOLA.</span>
                       </h1>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                       <div className="space-y-4">
                          <p className="text-[10px] font-black text-brand-900/30 uppercase tracking-[0.4em]">The Vision</p>
                          <p className="text-sm text-brand-900/60 leading-relaxed font-medium">
                             Marcia Kgaphola is the driving force behind IWS. With a background merging deep financial acumen with psychological insights, she founded IWS to solve the <strong>"Founder's Paradox"</strong>: the reality that as a business grows, the creator often becomes its most exhausted servant.
                          </p>
                       </div>
                       <div className="space-y-4">
                          <p className="text-[10px] font-black text-brand-900/30 uppercase tracking-[0.4em]">The Methodology</p>
                          <p className="text-sm text-brand-900/60 leading-relaxed font-medium">
                             Marcia specializes in <strong>Structural Intervention</strong>. She looks beyond the balance sheet to identify "human bottlenecks," applying her unique <strong>Sovereignty Doctrine</strong> to help founders decouple their identity from operations.
                          </p>
                       </div>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-brand-50 border border-brand-900/5 space-y-6">
                       <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Strategic Pillars</p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex gap-4">
                             <ShieldAlert className="text-brand-900 flex-shrink-0" size={18} />
                             <div>
                                <p className="text-xs font-black uppercase text-brand-900 tracking-tight">Strategic Architecture</p>
                                <p className="text-[10px] text-brand-900/50 mt-1">Designing legal Fortresses that protect wealth from erosion.</p>
                             </div>
                          </div>
                          <div className="flex gap-4">
                             <Cpu className="text-brand-900 flex-shrink-0" size={18} />
                             <div>
                                <p className="text-xs font-black uppercase text-brand-900 tracking-tight">Behavioral Economics</p>
                                <p className="text-[10px] text-brand-900/50 mt-1">Identifying psychological patterns that lead to founder-dependency.</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <p className="text-xl md:text-2xl text-brand-900 font-medium italic leading-relaxed">
                          "True 'Wellth' is not just the accumulation of capital, but the <strong>reclamation of time</strong>."
                       </p>
                       <div className="flex items-center justify-between pt-6 border-t border-brand-900/5">
                          <div className="font-serif text-3xl text-brand-gold tracking-widest italic opacity-60">
                             Marcia Kgaphola
                          </div>
                          <a href="mailto:marcia@integratedwellth.co.za" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-brand-900 hover:text-brand-gold transition-all">
                             Consult Leadership <Mail size={16} />
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
           </RevealOnScroll>
        </section>

        {/* The Executive Council Directory */}
        <RevealOnScroll>
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-[0.4em] text-xs mb-4">
               <Target size={14} />
               <span>Technical Command</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-sora font-extrabold text-brand-900 tracking-tighter mb-8 leading-none uppercase">
              The Strategic <span className="text-brand-gold italic">Council.</span>
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {OTHER_TEAM.map((member, idx) => (
            <RevealOnScroll key={idx} delay={idx * 0.1}>
              <div className="group relative flex flex-col h-full bg-gray-50 rounded-[2.5rem] overflow-hidden border border-brand-900/5 hover:border-brand-gold transition-all duration-700">
                <div className="relative aspect-[3/4] overflow-hidden bg-brand-900/5">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                     <a href={`mailto:${member.email}`} className="w-12 h-12 rounded-xl bg-brand-gold text-brand-900 flex items-center justify-center hover:bg-white transition-colors shadow-2xl">
                        <Mail size={20} />
                     </a>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-brand-900 leading-tight mb-2 uppercase tracking-tighter">{member.name}</h3>
                  <p className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-6">{member.role}</p>
                  <p className="text-brand-900/60 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Foundations Matrix */}
        <div className="grid lg:grid-cols-3 gap-12">
           {[
             { title: "The Vision", icon: <Globe />, content: "To be the leading holistic empowerment partner in Africa, driving financial confidence, emotional resilience, and professional excellence." },
             { title: "The Mission", icon: <Compass />, content: "To empower clients with integrated solutions that blend high-tech financial management, behavioral intelligence, and professional development." },
             { title: "Core Strategy", icon: <ShieldCheck />, content: "Leveraging local insights and AI innovation to bridge the gap between technical expertise and human mindset for long-term stability." }
           ].map((card, i) => (
             <RevealOnScroll key={i} delay={i * 0.1}>
               <div className="bg-brand-900 p-12 rounded-[3.5rem] text-white h-full relative overflow-hidden group border border-white/5 shadow-2xl">
                  <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform">
                     {React.cloneElement(card.icon as React.ReactElement<any>, { size: 80, className: "text-brand-gold" })}
                  </div>
                  <h4 className="text-2xl font-black mb-6 text-brand-gold uppercase tracking-tighter">{card.title}</h4>
                  <p className="text-brand-100/70 leading-relaxed text-base font-medium">{card.content}</p>
               </div>
             </RevealOnScroll>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
