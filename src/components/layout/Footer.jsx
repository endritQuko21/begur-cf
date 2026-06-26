import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './Footer.css';

const EMAILJS_SERVICE  = 'TU_SERVICE_ID';
const EMAILJS_TEMPLATE = 'TU_TEMPLATE_ID';
const EMAILJS_KEY      = 'TU_PUBLIC_KEY';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/plantilla', label: 'Plantilla' },
  { to: '/partidos', label: 'Partidos' },
  { to: '/temporada', label: 'Temporada' },
  { to: '/liga', label: 'Liga' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/campo', label: 'Campo' },
];

const empty = { nombre: '', apellidos: '', correo: '', telefono: '', mensaje: '' };

export default function Footer() {
  const [form, setForm]     = useState(empty);
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'error'
  const formRef = useRef();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.correo || !form.mensaje) return;
    setStatus('sending');
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, form, EMAILJS_KEY);
      setStatus('ok');
      setForm(empty);
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="footer">

      {/* BANDA SUPERIOR */}
      <div className="footer__top">
        <div className="container footer__top-inner">

          {/* COL 1 — Club */}
          <div className="footer__col footer__col--brand">
            <h3 className="footer__club-name">BEGUR C.F. A</h3>
            <p className="footer__club-desc">
              Club de Futbol del Baix Empordà<br />
              Temporada 2026 – 27
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* COL 2 — Links */}
          <div className="footer__col">
            <h4 className="footer__col-title">La web</h4>
            <ul className="footer__nav">
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer__nav-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Contacto info */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <ul className="footer__info">
              <li>
                <span className="footer__info-icon">📍</span>
                Camp Municipal de La Guarda<br />
                Begur, Baix Empordà
              </li>
              <li>
                <span className="footer__info-icon">📧</span>
                begur.cf@gmail.com
              </li>
              <li>
                <span className="footer__info-icon">⚽</span>
                Regional Preferent Girona
              </li>
            </ul>
          </div>

          {/* COL 4 — Formulario */}
          <div className="footer__col footer__col--form">
            <h4 className="footer__col-title">Escríbenos</h4>
            <form ref={formRef} className="footer__form" onSubmit={handleSubmit} noValidate>
              <div className="footer__form-row">
                <div className="footer__field">
                  <input
                    name="nombre" value={form.nombre} onChange={handleChange}
                    placeholder="Nombre" required
                  />
                </div>
                <div className="footer__field">
                  <input
                    name="apellidos" value={form.apellidos} onChange={handleChange}
                    placeholder="Apellidos"
                  />
                </div>
              </div>
              <div className="footer__field">
                <input
                  name="correo" type="email" value={form.correo} onChange={handleChange}
                  placeholder="Correo electrónico" required
                />
              </div>
              <div className="footer__field">
                <input
                  name="telefono" type="tel" value={form.telefono} onChange={handleChange}
                  placeholder="Teléfono (opcional)"
                />
              </div>
              <div className="footer__field">
                <textarea
                  name="mensaje" value={form.mensaje} onChange={handleChange}
                  placeholder="Tu mensaje..." rows={4} required
                />
              </div>

              {status === 'ok' && (
                <div className="footer__feedback footer__feedback--ok">
                  ✅ Mensaje enviado correctamente
                </div>
              )}
              {status === 'error' && (
                <div className="footer__feedback footer__feedback--error">
                  ❌ Error al enviar, inténtalo de nuevo
                </div>
              )}

              <button
                type="submit"
                className="footer__submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* BANDA INFERIOR */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span>© {new Date().getFullYear()} Begur Club de Futbol. Tots els drets reservats.</span>
          <span className="footer__bottom-sep">·</span>
          <span>Begur, Baix Empordà, Girona</span>
        </div>
      </div>

    </footer>
  );
}
