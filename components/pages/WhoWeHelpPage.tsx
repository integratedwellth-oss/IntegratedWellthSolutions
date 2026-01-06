import React from 'react';
import WhoWeHelp from '../WhoWeHelp';
import Audience from '../Audience';

const WhoWeHelpPage: React.FC = () => {
  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      <WhoWeHelp />
      <Audience />
    </div>
  );
};

export default WhoWeHelpPage;
