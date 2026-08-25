import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ProjectDetails from '@/pages/ProjectDetails';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/utils/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos/:slug" element={<ProjectDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
