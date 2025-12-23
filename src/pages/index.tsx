import React from 'react';
import Navbar from '../components/navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import ProjectsSection from '../components/sections/ProjectsSection';



const Home: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />

      </main>
    </div>
  );
};

export default Home;

