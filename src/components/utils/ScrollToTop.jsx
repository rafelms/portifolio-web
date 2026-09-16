import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ao trocar de rota, volta ao topo — ou rola até a âncora (ex.: "/#projects")
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Aguarda a página renderizar antes de procurar a seção
    const frame = requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
