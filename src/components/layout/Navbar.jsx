import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/plantilla', label: 'Plantilla' },
  { to: '/temporada', label: 'Temporada' },
  { to: '/liga', label: 'Liga' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/campo', label: 'Campo' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open) setOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* DESKTOP — barra centrada */}
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
        <nav className="nav__links">
          {links.map(l => (
            <NavLink
              key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--on' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* MÓVIL — botón flotante */}
      <button
        className={`fab ${open ? 'fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>

      {/* MÓVIL — menú pantalla completa */}
      <div className={`fullmenu ${open ? 'fullmenu--open' : ''}`}>
        <nav className="fullmenu__nav">
          {links.map((l, i) => (
            <NavLink
              key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `fullmenu__link ${isActive ? 'fullmenu__link--on' : ''}`}
              style={{ '--i': i }}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}
