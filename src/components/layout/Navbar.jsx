import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/plantilla', label: 'Plantilla' },
  { to: '/partidos', label: 'Partidos' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/campo', label: 'Campo' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand">
          <div className="navbar__logo-placeholder">BCF</div>
          <span className="navbar__name">BEGUR C.F.</span>
        </NavLink>

        <button className="navbar__burger" onClick={() => setOpen(o => !o)} aria-label="Menú">
          <span /><span /><span />
        </button>

        <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
