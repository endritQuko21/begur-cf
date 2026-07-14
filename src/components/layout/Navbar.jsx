import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/', label: { es: 'Inicio', ca: 'Inici' } },
  { to: '/plantilla', label: { es: 'Plantilla', ca: 'Plantilla' } },
  { to: '/temporada', label: { es: 'Temporada', ca: 'Temporada' } },
  { to: '/liga', label: { es: 'Liga', ca: 'Lliga' } },
  { to: '/noticias', label: { es: 'Noticias', ca: 'Notícies' } },
  { to: '/campo', label: { es: 'Campo', ca: 'Camp' } },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('bcf_theme') !== 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('bcf_lang') || 'es');
  const location = useLocation();

  // Aplicar tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    localStorage.setItem('bcf_theme', dark ? 'dark' : 'light');
  }, [dark]);

  // Guardar idioma
  useEffect(() => {
    localStorage.setItem('bcf_lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

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
      <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${dark ? '' : 'nav--light'}`}>
        <nav className="nav__links">
          {links.map(l => (
            <NavLink
              key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--on' : ''}`}
            >
              {l.label[lang]}
            </NavLink>
          ))}
        </nav>

        {/* CONTROLES */}
        <div className="nav__controls">
          {/* IDIOMA */}
          <div className="nav__lang">
            <button
              className={`nav__lang-btn ${lang === 'es' ? 'nav__lang-btn--on' : ''}`}
              onClick={() => setLang('es')}
            >ES</button>
            <span className="nav__lang-sep">|</span>
            <button
              className={`nav__lang-btn ${lang === 'ca' ? 'nav__lang-btn--on' : ''}`}
              onClick={() => setLang('ca')}
            >CA</button>
          </div>

          {/* TEMA */}
          <button
            className="nav__theme"
            onClick={() => setDark(d => !d)}
            aria-label={dark ? 'Modo claro' : 'Modo oscuro'}
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* FAB MÓVIL */}
      <button
        className={`fab ${open ? 'fab--open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>

      {/* MENÚ MÓVIL PANTALLA COMPLETA */}
      <div className={`fullmenu ${open ? 'fullmenu--open' : ''} ${dark ? '' : 'fullmenu--light'}`}>
        {/* Controles dentro del menú móvil */}
        <div className="fullmenu__controls">
          <div className="nav__lang">
            <button
              className={`nav__lang-btn ${lang === 'es' ? 'nav__lang-btn--on' : ''}`}
              onClick={() => setLang('es')}
            >ES</button>
            <span className="nav__lang-sep">|</span>
            <button
              className={`nav__lang-btn ${lang === 'ca' ? 'nav__lang-btn--on' : ''}`}
              onClick={() => setLang('ca')}
            >CA</button>
          </div>
          <button className="nav__theme" onClick={() => setDark(d => !d)}>
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        <nav className="fullmenu__nav">
          {links.map((l, i) => (
            <NavLink
              key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) => `fullmenu__link ${isActive ? 'fullmenu__link--on' : ''}`}
              style={{ '--i': i }}
            >
              {l.label[lang]}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}