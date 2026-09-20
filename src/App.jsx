import { Routes, Route, Outlet } from 'react-router-dom';
import Home from '@/pages/Home';
import ProjectDetails from '@/pages/ProjectDetails';
import NotFound from '@/pages/NotFound';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/utils/ScrollToTop';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

function MainLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollToTop />
      <LanguageSwitcher />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projetos/:slug" element={<ProjectDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;


