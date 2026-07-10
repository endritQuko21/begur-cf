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
  { to: '/temporada', label: 'Temporada' },
  { to: '/liga', label: 'Liga' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/campo', label: 'Campo' },
];

const empty = { nombre: '', apellidos: '', correo: '', telefono: '', mensaje: '' };

export default function Footer() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState(null);
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

      {/* ── CTA BAND ── */}
      <div className="footer__cta-band">
        <div className="container footer__cta-inner">
          <div className="footer__cta-text">
            <span className="footer__cta-eyebrow">Temporada 2024 – 25</span>
            <h2 className="footer__cta-title">Tots som Begur</h2>
          </div>
          <div className="footer__cta-actions">
            <Link to="/temporada" className="footer__cta-btn footer__cta-btn--primary">Ver calendario</Link>
            <Link to="/campo" className="footer__cta-btn footer__cta-btn--outline">Cómo llegar</Link>
          </div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className="footer__main">
        <div className="footer__main-bg" />
        <div className="container footer__main-inner">

          {/* BRAND */}
          <div className="footer__brand">
            <img src="/escudo.png" alt="Begur CF" className="footer__brand-escudo" />
            <div className="footer__brand-text">
              <span className="footer__brand-name">BEGUR C.F. A</span>
              <span className="footer__brand-league">Regional Preferent Girona</span>
            </div>
            <p className="footer__brand-desc">
              Club de Futbol del Baix Empordà, defensor dels colors roig i blau des de fa dècades.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
                </svg>
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div className="footer__col">
            <h4 className="footer__col-title">
              <span className="footer__col-title-bar" />
              Seccions
            </h4>
            <ul className="footer__nav">
              {links.map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="footer__nav-link">
                    <span className="footer__nav-arrow">→</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* INFO */}
          <div className="footer__col">
            <h4 className="footer__col-title">
              <span className="footer__col-title-bar" />
              On som
            </h4>
            <ul className="footer__info">
              <li className="footer__info-item">
                <div className="footer__info-icon-wrap">📍</div>
                <div>
                  <strong>Camp de La Guarda</strong>
                  <span>Carrer de la Guarda, s/n<br />17255 Begur, Girona</span>
                </div>
              </li>
              <li className="footer__info-item">
                <div className="footer__info-icon-wrap">🕐</div>
                <div>
                  <strong>Entrenaments</strong>
                  <span>Dimarts i Dijous<br />19:00 – 21:00h</span>
                </div>
              </li>
              <li className="footer__info-item">
                <div className="footer__info-icon-wrap">📧</div>
                <div>
                  <strong>Contacte</strong>
                  <span>begur.cf@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>

          {/* FORM */}
          <div className="footer__col footer__col--form">
            <h4 className="footer__col-title">
              <span className="footer__col-title-bar" />
              Escriu-nos
            </h4>
            <form ref={formRef} className="footer__form" onSubmit={handleSubmit} noValidate>
              <div className="footer__form-row">
                <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nom" required className="footer__input" />
                <input name="apellidos" value={form.apellidos} onChange={handleChange} placeholder="Cognoms" className="footer__input" />
              </div>
              <input name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="Correu electrònic" required className="footer__input" />
              <input name="telefono" type="tel" value={form.telefono} onChange={handleChange} placeholder="Telèfon (opcional)" className="footer__input" />
              <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="El teu missatge..." rows={3} required className="footer__input footer__input--textarea" />

              {status === 'ok' && <div className="footer__feedback footer__feedback--ok">✅ Missatge enviat correctament</div>}
              {status === 'error' && <div className="footer__feedback footer__feedback--error">❌ Error en l'enviament, torna-ho a intentar</div>}

              <button type="submit" className="footer__submit" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <span className="footer__submit-sending">Enviant...</span>
                ) : (
                  <>Enviar missatge <span>→</span></>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── BOTTOM ── */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <div className="footer__bottom-left">
            <img src="/escudo.png" alt="" className="footer__bottom-escudo" />
            <span>© {new Date().getFullYear()} Begur Club de Futbol · Tots els drets reservats</span>
          </div>
          <span className="footer__bottom-right">Begur · Baix Empordà · Girona</span>
        </div>
      </div>

    </footer>
  );
}
