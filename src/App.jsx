import React from 'react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import TechTicker from './components/TechTicker';
import ProjectShowcase from './components/ProjectShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <main>
        <Hero />
        <TechTicker />
        <Timeline />
        <ProjectShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;
