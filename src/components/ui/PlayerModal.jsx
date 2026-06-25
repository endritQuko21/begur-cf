import { useEffect } from 'react';
import FootballPitch from './FootballPitch';
import './PlayerModal.css';

const posicionColor = {
  Portero: '#C8102E',
  Defensa: '#003087',
  Centrocampista: '#1a5c1a',
  Delantero: '#b07800',
};

function StatBar({ value, max, color }) {
  return (
    <div style={{ background: '#f0f0f0', borderRadius: '2px', height: '4px', width: '100%' }}>
      <div style={{
        width: `${Math.min((value / max) * 100, 100)}%`,
        height: '100%',
        background: color,
        borderRadius: '2px',
        transition: 'width 0.6s ease'
      }} />
    </div>
  );
}

function PlayerStats({ stats, posicion }) {
  const color = { Portero: '#C8102E', Defensa: '#003087', Centrocampista: '#1a5c1a', Delantero: '#b07800' }[posicion] || '#333';
  const esPortero = posicion === 'Portero';

  const items = esPortero ? [
    { label: 'Partidos', value: stats.partidos, max: 30, show: true },
    { label: 'Porterías a cero', value: stats.porteriaCero, max: 20, show: true },
    { label: 'Tarjetas amarillas', value: stats.tarjetasA, max: 10, show: true },
  ] : [
    { label: 'Partidos', value: stats.partidos, max: 30, show: true },
    { label: 'Goles', value: stats.goles, max: 15, show: true },
    { label: 'Asistencias', value: stats.asistencias, max: 15, show: true },
    { label: 'Tarjetas amarillas', value: stats.tarjetasA, max: 10, show: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
      {items.map(({ label, value, max }) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
            <span style={{ color: '#666', fontWeight: 500 }}>{label}</span>
            <span style={{ fontWeight: 700, color: '#0a0a0a' }}>{value}</span>
          </div>
          <StatBar value={value} max={max} color={color} />
        </div>
      ))}
    </div>
  );
}

export default function PlayerModal({ jugador, onClose }) {
  // Cerrar con Escape
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const color = posicionColor[jugador.posicion] || '#333';
  const primaryPos = jugador.posiciones?.[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>

        {/* Header coloreado */}
        <div className="modal__header" style={{ background: `linear-gradient(135deg, ${color} 0%, var(--color-blue-dark) 100%)` }}>
          <button className="modal__close" onClick={onClose}>✕</button>
          <div className="modal__dorsal">#{jugador.dorsal}</div>
          <div className="modal__avatar">
            {jugador.foto
              ? <img src={jugador.foto} alt={jugador.nombre} />
              : <div className="modal__avatar-placeholder">
                  <span>{jugador.nombre.split(' ').map(n => n[0]).join('')}</span>
                </div>
            }
          </div>
        </div>

        {/* Body */}
        <div className="modal__body">

          {/* Info principal */}
          <div className="modal__info">
            <h2 className="modal__nombre">{jugador.nombre}</h2>
            <span className="modal__posicion" style={{ color }}>{jugador.posicion}</span>

            <div className="modal__stats">
              <div className="modal__stat">
                <span className="modal__stat-val">{jugador.dorsal}</span>
                <span className="modal__stat-key">Dorsal</span>
              </div>
              <div className="modal__stat">
                <span className="modal__stat-val">{jugador.edad}</span>
                <span className="modal__stat-key">Edad</span>
              </div>
              <div className="modal__stat">
                <span className="modal__stat-val">{jugador.nacionalidad || '—'}</span>
                <span className="modal__stat-key">Nación</span>
              </div>
            </div>

            {jugador.descripcion && (
              <p className="modal__desc">{jugador.descripcion}</p>
            )}

            {jugador.stats && <PlayerStats stats={jugador.stats} posicion={jugador.posicion} />}

            <div className="modal__badges">
              {jugador.posiciones?.map(p => (
                <span key={p} className="modal__badge" style={{ borderColor: color, color }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Campo */}
          <div className="modal__pitch">
            <p className="modal__pitch-label">Posiciones en el campo</p>
            <FootballPitch posiciones={jugador.posiciones || []} primaryPosition={primaryPos} />
          </div>

        </div>
      </div>
    </div>
  );
}
