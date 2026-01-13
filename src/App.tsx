import React from 'react';
import Layout from './components/Layout';

export default function App() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-[#C5A059] text-5xl font-black uppercase tracking-[0.3em] mb-4">
          Phase 2 Active
        </h1>
        <p className="text-gray-500 font-mono text-sm uppercase">Navigation Systems Online</p>
      </div>
    </Layout>
  );
}
