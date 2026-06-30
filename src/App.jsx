import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Plantilla from './pages/Plantilla';
import Noticias from './pages/Noticias';
import Campo from './pages/Campo';
import Liga from './pages/Liga';
import Temporada from './pages/Temporada';
import AdminApp from './admin/AdminApp';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin — sin Layout público */}
        <Route path="/admin/*" element={<AdminApp />} />

        {/* Web pública */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plantilla" element={<Plantilla />} />
              <Route path="/temporada" element={<Temporada />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/campo" element={<Campo />} />
              <Route path="/liga" element={<Liga />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
