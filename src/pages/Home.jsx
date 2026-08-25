import React from 'react';
import Hero from '@/components/layout/Hero';
import Timeline from '@/components/layout/Timeline';
import TechTicker from '@/components/layout/TechTicker';
import ProjectShowcase from '@/components/layout/ProjectShowcase';

export default function Home() {
  return (
    <main>
      <Hero />
      <TechTicker />
      <Timeline />
      <ProjectShowcase />
    </main>
  );
}
