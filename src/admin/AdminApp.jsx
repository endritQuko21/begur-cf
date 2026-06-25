import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import AdminHome from './pages/AdminHome';
import AdminJugadores from './pages/AdminJugadores';
import AdminStaff from './pages/AdminStaff';
import AdminPartidos from './pages/AdminPartidos';
import AdminNoticias from './pages/AdminNoticias';
import AdminClasificacion from './pages/AdminClasificacion';

const SESSION_KEY = 'bcf_admin_auth';

export default function AdminApp() {
  const [auth, setAuth] = useState(() => sessionStorage.getItem(SESSION_KEY) === 'true');
  const login = () => { sessionStorage.setItem(SESSION_KEY, 'true'); setAuth(true); };
  const logout = () => { sessionStorage.removeItem(SESSION_KEY); setAuth(false); };

  if (!auth) return <AdminLogin onLogin={login} />;

  return (
    <AdminLayout onLogout={logout}>
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="jugadores" element={<AdminJugadores />} />
        <Route path="staff" element={<AdminStaff />} />
        <Route path="partidos" element={<AdminPartidos />} />
        <Route path="noticias" element={<AdminNoticias />} />
        <Route path="clasificacion" element={<AdminClasificacion />} />
      </Routes>
    </AdminLayout>
  );
}
