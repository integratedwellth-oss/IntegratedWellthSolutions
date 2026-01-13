import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#05070a] border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">
          © 2026 Integrated Wellth Solutions. All Rights Reserved.
        </div>
        <div className="flex gap-6 text-[9px] text-gray-500 font-bold uppercase tracking-widest">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/terms" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  );
}
