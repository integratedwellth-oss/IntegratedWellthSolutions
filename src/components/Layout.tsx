import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import { HelmetProvider } from 'react-helmet-async';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <HelmetProvider>
      {/* This 'bg-[#05070a]' is the direct fix for the white screen issue */}
      <div className="min-h-screen flex flex-col bg-[#05070a] text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </HelmetProvider>
  );
}
