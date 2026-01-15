import React from 'react';
import { Facebook, Instagram, ArrowRight, Users } from 'lucide-react';

// Custom TikTok Icon
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  const navigateTo = (hash: string) => {
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="space-y-6">
            <div className="text-3xl font-bold tracking-tighter">
              Integrated<span className="text-brand-gold">Wellth</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              Transforming lives through emotional, financial and personal wellness.
            </p>
          </div>

          {/* Quick Links Navigation */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white tracking-tight">Quick Links</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li>
                <button onClick={() => navigateTo('#home')} className="hover:text-brand-gold transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => navigateTo('#services')} className="hover:text-brand-gold transition-colors">Services</button>
              </li>
              <li>
                <button onClick={() => navigateTo('#workshops')} className="hover:text-brand-gold transition-colors">Workshops</button>
              </li>
              <li>
                <button onClick={() => navigateTo('#blog')} className="hover:text-brand-gold transition-colors">Blog</button>
              </li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div>
            <h4 className="font-bold text-xl mb-6 text-white tracking-tight">Legal</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-bold">
              <li>
                <button onClick={() => navigateTo('#privacy')} className="hover:text-brand-gold transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button className="hover:text-brand-gold transition-colors">Terms of Service</button>
              </li>
              <li>
                <button className="hover:text-brand-gold transition-colors">PAIA Manual</button>
              </li>
            </ul>
          </div>

          {/* Social & CTA Integration */}
          <div className="space-y-8">
            <h4 className="font-bold text-xl mb-6 text-white tracking-tight">Connect</h4>
            <div className="flex space-x-5">
              <a href="https://www.facebook.com/share/17SByrB4zi/" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/integratedwellth" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@prestigemarciak?_r=1&_t=ZS-92596TEURxE" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-3 rounded-full hover:bg-brand-gold hover:text-brand-900 transition-all">
                <TikTokIcon size={20} />
              </a>
            </div>

            {/* Embedded CTA Matching Screenshot Style */}
            <button 
              onClick={() => navigateTo('#accountability')}
              className="group flex items-center gap-4 bg-brand-gold text-brand-900 px-6 py-4 rounded-full shadow-[0_15px_40px_rgba(212,175,55,0.2)] hover:scale-105 transition-all w-fit"
            >
              <div className="w-10 h-10 bg-brand-900/10 rounded-full flex items-center justify-center">
                <Users size={20} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 leading-none mb-1">Founders</p>
                <p className="font-sora font-extrabold text-sm leading-none whitespace-nowrap">
                  The "Lonely Journey" Ends Here
                </p>
              </div>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Global Copyright */}
        <div className="border-t border-white/5 pt-10 text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Integrated Wellth Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;