import { useJugadores, useStaff, usePartidos, useNoticias } from '../../hooks/useData';
import { Link } from 'react-router-dom';
import './AdminPage.css';
import './AdminHome.css';

export default function AdminHome() {
  const { jugadores } = useJugadores();
  const { staff } = useStaff();
  const { partidos } = usePartidos();
  const { noticias } = useNoticias();
  const proximos = partidos.filter(p => p.tipo === 'proximo').length;

  const cards = [
    { label: 'Jugadores', value: jugadores.length, to: '/admin/jugadores', color: 'var(--color-blue)' },
    { label: 'Staff', value: staff.length, to: '/admin/staff', color: 'var(--color-red)' },
    { label: 'Próximos partidos', value: proximos, to: '/admin/partidos', color: '#eed233' },
    { label: 'Noticias', value: noticias.length, to: '/admin/noticias', color: '#1a5c1a' },
    { label: 'Clasificación', value: partidos.length, to: '/admin/clasificacion', color: '#b07800' },
  ];

  return (
    <div className="admin-page">
      <div>
        <h1 className="admin-page__title">Panel de Control</h1>
        <p className="admin-page__sub">Temporada 2026-27 · Begur C.F. A</p>
      </div>
      <div className="admin-home__cards">
        {cards.map(c => (
          <Link key={c.label} to={c.to} className="admin-stat-card">
            <span className="admin-stat-card__val" style={{ color: c.color }}>{c.value}</span>
            <span className="admin-stat-card__label">{c.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
