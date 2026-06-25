import { NavLink, useNavigate } from 'react-router-dom';
import './AdminLayout.css';

const links = [
  { to: '/admin', label: '🏠 Inicio', end: true },
  { to: '/admin/jugadores', label: '👤 Jugadores' },
  { to: '/admin/staff', label: '👤 Staff' },
  { to: '/admin/partidos', label: '⚽ Partidos' },
  { to: '/admin/noticias', label: '📰 Noticias' },
  { to: '/admin/clasificacion', label: '🏆 Clasificación' },
];

export default function AdminLayout({ children, onLogout }) {
  const navigate = useNavigate();
  const handleLogout = () => { onLogout(); navigate('/'); };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <div className="admin-sidebar__logo">BCF</div>
          <div>
            <div className="admin-sidebar__name">Admin Panel</div>
            <div className="admin-sidebar__sub">Begur C.F. A</div>
          </div>
        </div>
        <nav className="admin-sidebar__nav">
          {links.map(l => (
            <NavLink
              key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => `admin-nav-link ${isActive ? 'admin-nav-link--active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-sidebar__logout" onClick={handleLogout}>
          ← Volver a la web
        </button>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
