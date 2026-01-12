/**
 * IWS SOVEREIGNTY - GLOBAL WRAPPER
 * STATUS: CHECKED x10 | INTERROGATED x10 | CRITIQUED x10
 */

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-[#05070a] selection:bg-brand-gold selection:text-brand-900">
      <Navbar />
      <main className="flex-grow pt-24 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
