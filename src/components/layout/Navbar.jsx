import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/plantilla', label: 'Plantilla' },
  { to: '/partidos', label: 'Partidos' },
  { to: '/temporada', label: 'Temporada' },
  { to: '/liga', label: 'Liga' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/campo', label: 'Campo' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bloquear scroll cuando menú abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* BRAND */}
          <NavLink to="/" className="navbar__brand" onClick={() => setOpen(false)}>
            <img src="/escudo.png" alt="Begur CF" className="navbar__escudo" />
            <div className="navbar__brand-text">
              <span className="navbar__brand-name">BEGUR C.F.</span>
              <span className="navbar__brand-sub">Baix Empordà</span>
            </div>
          </NavLink>

          {/* LINKS desktop */}
          <ul className="navbar__links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink
                  to={l.to} end={l.to === '/'}
                  className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* BURGER */}
          <button
            className={`navbar__burger ${open ? 'navbar__burger--open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Menú"
          >
            <span /><span /><span />
          </button>

        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${open ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          <div className="mobile-menu__brand">
            <img src="/escudo.png" alt="Begur CF" className="mobile-menu__escudo" />
            <div>
              <div className="mobile-menu__name">BEGUR C.F.</div>
              <div className="mobile-menu__sub">Temporada 2024-25</div>
            </div>
          </div>
          <nav className="mobile-menu__nav">
            {links.map((l, i) => (
              <NavLink
                key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) => `mobile-menu__link ${isActive ? 'mobile-menu__link--active' : ''}`}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {l.label}
                <span className="mobile-menu__arrow">→</span>
              </NavLink>
            ))}
          </nav>
          <div className="mobile-menu__footer">
            <span>Club de Futbol · Begur · Girona</span>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {open && <div className="mobile-menu__overlay" onClick={() => setOpen(false)} />}
    </>
  );
}
