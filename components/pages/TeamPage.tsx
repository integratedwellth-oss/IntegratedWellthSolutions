import React from 'react';
import Team from '../../Team'; 
// Fixed relative path
import Philosophy from '../Philosophy'; 
import RevealOnScroll from '../RevealOnScroll';

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <RevealOnScroll>
        <Team />
      </RevealOnScroll>
      <Philosophy />
    </div>
  );
};

export default TeamPage;
