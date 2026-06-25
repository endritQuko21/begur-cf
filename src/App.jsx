import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Plantilla from './pages/Plantilla';
import Partidos from './pages/Partidos';
import Noticias from './pages/Noticias';
import Campo from './pages/Campo';
import Liga from './pages/Liga';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plantilla" element={<Plantilla />} />
          <Route path="/partidos" element={<Partidos />} />
          <Route path="/liga" element={<Liga />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/campo" element={<Campo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
