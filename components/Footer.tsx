import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

// Custom TikTok Icon
const TikTokIcon = ({ size = 24 }: { size?: number }) => (
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
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-bold mb-4">Integrated<span className="text-yellow-500">Wellth</span></div>
            <p className="text-gray-400 text-sm">
              Transforming lives through emotional, financial and personal wellness.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#home" className="hover:text-yellow-500">Home</a></li>
              <li><a href="#services" className="hover:text-yellow-500">Services</a></li>
              <li><a href="#upcoming-event" className="hover:text-yellow-500">Workshops</a></li>
              <li><a href="#blog" onClick={() => window.location.hash = '#blog'} className="hover:text-yellow-500">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#privacy" onClick={() => window.location.hash = '#privacy'} className="hover:text-yellow-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-yellow-500">Terms of Service</a></li>
              <li><a href="#" className="hover:text-yellow-500">PAIA Manual</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/17SByrB4zi/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-brand-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/integratedwellth" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-brand-600 transition-colors">
                <Instagram size={20} />
              </a>
               <a href="https://www.tiktok.com/@prestigemarciak?_r=1&_t=ZS-92596TEURxE" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:bg-brand-600 transition-colors">
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Integrated Wellth Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;