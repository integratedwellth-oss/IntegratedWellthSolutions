import React from 'react';
import Hero from '../Hero';
import TrustedBy from '../TrustedBy';
import WhoWeHelp from '../WhoWeHelp';
import Philosophy from '../Philosophy';
import EventHighlight from '../EventHighlight';
import Services from '../Services';
import Audience from '../Audience';
import Testimonials from '../Testimonials';
import Gallery from '../Gallery';
import Contact from '../Contact';

interface HomeProps {
  onOpenAssessment: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenAssessment }) => {
  return (
    <div className="animate-fadeIn">
      <Hero />
      <TrustedBy />
      <WhoWeHelp />
      <Philosophy />
      <div id="services-anchor"><Services /></div>
      <Audience />
      <Testimonials />
      <Gallery />
      <Contact />
    </div>
  );
};

export default Home;
