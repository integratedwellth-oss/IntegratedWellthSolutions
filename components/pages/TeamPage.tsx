import React from 'react';
import Team from '../../Team'; 
// FIX: Changed path from './components/Philosophy' to '../Philosophy'
import Philosophy from '../Philosophy'; 

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Team />
      <Philosophy />
    </div>
  );
};

export default TeamPage;