import React from 'react';
import Team from '../../Team'; 
import Philosophy from '../Philosophy'; // Corrected relative path

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Team />
      <Philosophy />
    </div>
  );
};

export default TeamPage;
