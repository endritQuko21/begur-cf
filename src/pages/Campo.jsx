import { useState } from 'react';
import './Campo.css';

const INSTALACIONES = [
  {
    icon: '⚽',
    titulo: 'Camp de La Guarda',
    desc: 'Terreno de juego con gespa artificial de última generación, dimensiones reglamentarias y graderío cubierto.',
    detalles: ['Gespa artificial', '~500 espectadores', 'Iluminación nocturna', 'Marcador electrónico'],
  },
  {
    icon: '🚿',
    titulo: 'Vestuarios',
    desc: 'Vestuarios renovados para equipo local, visitante y árbitros, con duchas individuales y taquillas.',
    detalles: ['4 vestuarios', 'Duchas calientes', 'Sala fisioterapia', 'Taquillas individuales'],
  },
  {
    icon: '🅿️',
    titulo: 'Aparcamiento',
    desc: 'Zona de aparcamiento gratuita junto al recinto deportivo con capacidad para más de 80 vehículos.',
    detalles: ['80+ plazas', 'Acceso directo', 'Zona bicicletas', 'Gratuito'],
  },
  {
    icon: '🍻',
    titulo: 'Bar del Club',
    desc: 'Punto de encuentro de la afición antes y después de cada partido. Gestionado por voluntarios del club.',
    detalles: ['Abierto en partidos', 'Terraza exterior', 'Pantalla TV', 'Eventos del club'],
  },
];

const CARTA = [
  {
    categoria: 'Bebidas',
    icon: '🍺',
    items: [
      { nombre: 'Caña', precio: '2,00€' },
      { nombre: 'Cerveza botella', precio: '2,50€' },
      { nombre: 'Refresco', precio: '2,00€' },
      { nombre: 'Agua', precio: '1,50€' },
      { nombre: 'Vino / Vermut', precio: '2,50€' },
      { nombre: 'Café', precio: '1,50€' },
    ],
  },
  {
    categoria: 'Para picar',
    icon: '🥪',
    items: [
      { nombre: 'Bocadillo de jamón', precio: '4,00€' },
      { nombre: 'Bocadillo de tortilla', precio: '4,00€' },
      { nombre: 'Patatas bravas', precio: '5,00€' },
      { nombre: 'Pa amb tomàquet', precio: '3,00€' },
      { nombre: 'Frutos secos', precio: '2,00€' },
      { nombre: 'Patatas chips', precio: '2,00€' },
    ],
  },
];

function InstalacionCard({ inst }) {
  return (
    <div className="inst-card">
      <span className="inst-card__icon">{inst.icon}</span>
      <h3 className="inst-card__title">{inst.titulo}</h3>
      <p className="inst-card__desc">{inst.desc}</p>
      <div className="inst-card__tags">
        {inst.detalles.map(d => (
          <span key={d} className="inst-card__tag">{d}</span>
        ))}
      </div>
    </div>
  );
}

export default function Campo() {
  const [tab, setTab] = useState('Bebidas');

  return (
    <div className="campo-page">

      {/* HERO */}
      <div className="campo-hero">
        <img src="/escudo.png" alt="" className="campo-hero__escudo" aria-hidden="true" />
        <div className="container">
          <span className="campo-hero__eyebrow">El club</span>
          <h1 className="campo-hero__title">Instalaciones</h1>
          <p className="campo-hero__sub">Camp de La Guarda · Begur, Baix Empordà</p>
        </div>
      </div>

      {/* GRID INSTALACIONES */}
      <section className="campo-section">
        <div className="container">
          <div className="campo-grid">
            {INSTALACIONES.map(inst => <InstalacionCard key={inst.titulo} inst={inst} />)}
          </div>
        </div>
      </section>

      {/* MAPA + INFO */}
      <section className="campo-section campo-section--alt">
        <div className="container campo-map-layout">

          <div className="campo-map-info">
            <h2 className="campo-section-title">Cómo llegar</h2>
            <div className="campo-info-list">
              <div className="campo-info-item">
                <span className="campo-info-icon">📍</span>
                <div>
                  <strong>Dirección</strong>
                  <p>Carrer de la Guarda, s/n<br />17255 Begur, Girona</p>
                </div>
              </div>
              <div className="campo-info-item">
                <span className="campo-info-icon">🕐</span>
                <div>
                  <strong>Horario de entrenamientos</strong>
                  <p>Martes y jueves: 19:00 – 21:00<br />Partidos: según calendario</p>
                </div>
              </div>
              <div className="campo-info-item">
                <span className="campo-info-icon">🚗</span>
                <div>
                  <strong>Cómo llegar</strong>
                  <p>A 5 min del centro de Begur.<br />Aparcamiento gratuito junto al campo.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="campo-map">
            <iframe
              title="Campo municipal de fútbol de Begur"
              src="https://www.google.com/maps?q=Campo+municipal+de+futbol+de+Begur&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>

        </div>
      </section>

      {/* BAR / CARTA */}
      <section className="campo-section campo-bar">
        <div className="container">
          <div className="campo-bar__header">
            <span className="campo-bar__icon">🍻</span>
            <div>
              <h2 className="campo-section-title">Bar del Club</h2>
              <p className="campo-bar__sub">Antes y después de cada partido, la afición se reúne aquí.</p>
            </div>
          </div>

          <div className="campo-bar__tabs">
            {CARTA.map(c => (
              <button
                key={c.categoria}
                className={`campo-bar__tab ${tab === c.categoria ? 'campo-bar__tab--active' : ''}`}
                onClick={() => setTab(c.categoria)}
              >
                {c.icon} {c.categoria}
              </button>
            ))}
          </div>

          <div className="campo-bar__menu">
            {CARTA.find(c => c.categoria === tab).items.map(item => (
              <div key={item.nombre} className="campo-bar__item">
                <span className="campo-bar__item-name">{item.nombre}</span>
                <span className="campo-bar__item-dots" />
                <span className="campo-bar__item-price">{item.precio}</span>
              </div>
            ))}
          </div>

          <p className="campo-bar__nota">💛 Toda la recaudación del bar se destina íntegramente al club.</p>
        </div>
      </section>

    </div>
  );
}
