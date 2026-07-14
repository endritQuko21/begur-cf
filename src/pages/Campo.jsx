import { useState } from 'react';
import './Campo.css';

const INSTALACIONES = [
  {
    icon: '⚽',
    titulo: 'Campo municipal de futbol de Begur',
    desc: 'Terreno de juego con gespa artificial de última generación, dimensiones reglamentarias y graderío cubierto.',
    detalles: ['Gespa artificial', '~500 espectadors', 'Il·luminació nocturna', 'Marcador electrònic'],
    color: '#C8102E',
  },
  {
    icon: '🚿',
    titulo: 'Vestuaris',
    desc: 'Vestuarios renovados para equipo local, visitante y árbitros, con duchas individuales y taquillas.',
    detalles: ['4 vestuaris', 'Dutxes calentes', 'Sala fisio', 'Taquilles'],
    color: '#003087',
  },
  {
    icon: '🅿️',
    titulo: 'Aparcament',
    desc: 'Zona de aparcamiento gratuita junto al recinto deportivo con capacidad para más de 80 vehículos.',
    detalles: ['80+ places', 'Accés directe', 'Zona bicicletes', 'Gratuït'],
    color: '#1a5c1a',
  },
  {
    icon: '🍺',
    titulo: 'Bar del Club',
    desc: 'Punt de trobada de l\'afició abans i després de cada partit. Gestionat per voluntaris del club.',
    detalles: ['Obert als partits', 'Terrassa exterior', 'Pantalla TV', 'Esdeveniments'],
    color: '#b07800',
  },
];

const CARTA = [
  {
    categoria: 'Begudes',
    icon: '🍺',
    items: [
      { nombre: 'Caña', precio: '2,00€' },
      { nombre: 'Cervesa ampolla', precio: '2,50€' },
      { nombre: 'Refresc', precio: '2,00€' },
      { nombre: 'Aigua', precio: '1,50€' },
      { nombre: 'Vi / Vermut', precio: '2,50€' },
      { nombre: 'Cafè', precio: '1,50€' },
    ],
  },
  {
    categoria: 'Per picar',
    icon: '🥪',
    items: [
      { nombre: 'Entrepà de pernil', precio: '4,00€' },
      { nombre: 'Entrepà de truita', precio: '4,00€' },
      { nombre: 'Patates braves', precio: '5,00€' },
      { nombre: 'Pa amb tomàquet', precio: '3,00€' },
      { nombre: 'Fruites seques', precio: '2,00€' },
      { nombre: 'Patates xips', precio: '2,00€' },
    ],
  },
];

export default function Campo() {
  const [tab, setTab] = useState('Begudes');
  const [activeInst, setActiveInst] = useState(0);

  return (
    <div className="cp">

      {/* ── HERO ── */}
      <section className="cp-hero">
        <div className="cp-hero__bg">
          <div className="cp-hero__gradient" />
          <img src="/escudo.png" alt="" className="cp-hero__watermark" aria-hidden="true" />
        </div>
        <div className="cp-hero__content container">
          <div className="cp-hero__left">
            <span className="cp-eyebrow">El Club · Begur</span>
            <h1 className="cp-hero__title">Campo municipal de<br /><span className="cp-hero__title-red">futbol de Begur</span></h1>
            <p className="cp-hero__sub">Les nostres instal·lacions al Baix Empordà</p>
            <div className="cp-hero__stats">
              <div className="cp-hero__stat"><span>~500</span><small>Espectadors</small></div>
              <div className="cp-hero__stat-sep" />
              <div className="cp-hero__stat"><span>4</span><small>Vestuaris</small></div>
              <div className="cp-hero__stat-sep" />
              <div className="cp-hero__stat"><span>80+</span><small>Aparcament</small></div>
            </div>
          </div>
          <div className="cp-hero__right">
            <div className="cp-hero__pitch">
              {/* SVG camp de futbol */}
              <svg viewBox="0 0 300 200" className="cp-pitch-svg" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="#1a4a1a" rx="8"/>
                {[0,1,2,3,4].map(i => (
                  <rect key={i} x="0" y={i*40} width="300" height="20"
                    fill={i%2===0 ? '#1a4a1a' : '#1e521e'} rx="0"/>
                ))}
                <rect x="6" y="6" width="288" height="188" fill="none"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" rx="4"/>
                <line x1="6" y1="100" x2="294" y2="100"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                <circle cx="150" cy="100" r="28" fill="none"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                <circle cx="150" cy="100" r="2" fill="rgba(255,255,255,0.7)"/>
                <rect x="6" y="62" width="44" height="76" fill="none"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                <rect x="250" y="62" width="44" height="76" fill="none"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                <rect x="6" y="80" width="20" height="40" fill="none"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                <rect x="274" y="80" width="20" height="40" fill="none"
                  stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
                <circle cx="50" cy="100" r="2" fill="rgba(255,255,255,0.5)"/>
                <circle cx="250" cy="100" r="2" fill="rgba(255,255,255,0.5)"/>
              </svg>
              <div className="cp-pitch-label">Campo municipal de futbol de Begur</div>
            </div>
          </div>
        </div>
        <div className="cp-hero__fade" />
      </section>

      {/* ── INSTALACIONES INTERACTIVAS ── */}
      <section className="cp-inst">
        <div className="container cp-inst__inner">
          <div className="cp-inst__tabs">
            {INSTALACIONES.map((inst, i) => (
              <button
                key={inst.titulo}
                className={`cp-inst__tab ${activeInst === i ? 'cp-inst__tab--active' : ''}`}
                onClick={() => setActiveInst(i)}
                style={{ '--ic': inst.color }}
              >
                <span className="cp-inst__tab-icon">{inst.icon}</span>
                <span className="cp-inst__tab-label">{inst.titulo}</span>
              </button>
            ))}
          </div>
          <div className="cp-inst__panel">
            {INSTALACIONES.map((inst, i) => (
              <div
                key={inst.titulo}
                className={`cp-inst__content ${activeInst === i ? 'cp-inst__content--active' : ''}`}
                style={{ '--ic': inst.color }}
              >
                <div className="cp-inst__content-icon">{inst.icon}</div>
                <div className="cp-inst__content-body">
                  <h2 className="cp-inst__content-title">{inst.titulo}</h2>
                  <p className="cp-inst__content-desc">{inst.desc}</p>
                  <div className="cp-inst__content-tags">
                    {inst.detalles.map(d => (
                      <span key={d} className="cp-inst__tag">✓ {d}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO LLEGAT + MAPA ── */}
      <section className="cp-map-sec">
        <div className="container cp-map-layout">
          <div className="cp-map-info">
            <span className="cp-eyebrow">Ubicación</span>
            <h2 className="cp-map-title">Como llegar</h2>
            <div className="cp-map-items">
              {[
                { icon: '📍', label: 'Adreça', val: 'Carrer de la Guarda, s/n\n17255 Begur, Girona' },
                { icon: '🕐', label: 'Entrenaments', val: 'Dimarts i dijous: 19:00 – 21:00\nPartits: segons calendari' },
                { icon: '🚗', label: 'Accés', val: 'A 5 min del centre de Begur\nAparcament gratuït al costat' },
                { icon: '🚌', label: 'Transport', val: 'Bus L-251 parada Begur Centre\nTaxi disponible al municipi' },
              ].map(item => (
                <div key={item.label} className="cp-map-item">
                  <div className="cp-map-item__icon">{item.icon}</div>
                  <div>
                    <strong>{item.label}</strong>
                    {item.val.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="cp-map-frame">
            <div className="cp-map-frame__inner">
              <iframe
                title="Campo municipal de futbol de Begur"
                src="https://www.google.com/maps?q=Camp+municipal+de+futbol+Begur&output=embed"
                width="100%" height="100%"
                style={{ border: 0 }} allowFullScreen loading="lazy"
              />
            </div>
            <div className="cp-map-frame__label">
              <span>📍</span> Campo municipal de futbol de Begur
            </div>
          </div>
        </div>
      </section>

      {/* ── BAR ── */}
      <section className="cp-bar">
        <div className="container">
          <div className="cp-bar__top">
            <div>
              <span className="cp-eyebrow">Punt de trobada</span>
              <h2 className="cp-bar__title">Bar del Club</h2>
              <p className="cp-bar__sub">Abans i després de cada partit, l'afició es reuneix aquí. Gestionat per voluntaris del club.</p>
            </div>
            <div className="cp-bar__badge">
              <span>💛</span>
              <span>Tots els beneficis van al club</span>
            </div>
          </div>

          <div className="cp-bar__body">
            <div className="cp-bar__tabs">
              {CARTA.map(c => (
                <button
                  key={c.categoria}
                  className={`cp-bar__tab ${tab === c.categoria ? 'cp-bar__tab--on' : ''}`}
                  onClick={() => setTab(c.categoria)}
                >
                  <span>{c.icon}</span>
                  <span>{c.categoria}</span>
                </button>
              ))}
            </div>

            <div className="cp-bar__menu">
              {CARTA.find(c => c.categoria === tab)?.items.map((item, i) => (
                <div key={item.nombre} className="cp-bar__row" style={{ '--ri': i }}>
                  <span className="cp-bar__row-name">{item.nombre}</span>
                  <span className="cp-bar__row-line" />
                  <span className="cp-bar__row-price">{item.precio}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
