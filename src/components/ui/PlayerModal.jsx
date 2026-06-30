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
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="modal-stat__bar-track">
      <div className="modal-stat__bar-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function PlayerStats({ stats, posicion, color }) {
  const esPortero = posicion === 'Portero';
  const items = esPortero ? [
    { label: 'Partidos', value: stats.partidos || 0, max: 30 },
    { label: 'Porterías a cero', value: stats.porteriaCero || 0, max: 20 },
    { label: 'Tarjetas amarillas', value: stats.tarjetasA || 0, max: 10 },
  ] : [
    { label: 'Partidos', value: stats.partidos || 0, max: 30 },
    { label: 'Goles', value: stats.goles || 0, max: 15 },
    { label: 'Asistencias', value: stats.asistencias || 0, max: 15 },
    { label: 'Tarjetas amarillas', value: stats.tarjetasA || 0, max: 10 },
  ];

  return (
    <div className="modal-stats">
      {items.map(({ label, value, max }) => (
        <div key={label} className="modal-stat">
          <div className="modal-stat__row">
            <span className="modal-stat__label">{label}</span>
            <span className="modal-stat__value">{value}</span>
          </div>
          <StatBar value={value} max={max} color={color} />
        </div>
      ))}
    </div>
  );
}

export default function PlayerModal({ jugador, onClose }) {
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
  const iniciales = jugador.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div className="pmodal-backdrop" onClick={onClose}>
      <div className="pmodal" onClick={e => e.stopPropagation()} style={{ '--pmodal-color': color }}>

        {/* HEADER */}
        <div className="pmodal__header">
          <div className="pmodal__header-bg" />
          <button className="pmodal__close" onClick={onClose}>✕</button>

          <span className="pmodal__dorsal-bg">{jugador.dorsal}</span>

          <div className="pmodal__header-content">
            <div className="pmodal__avatar">
              {jugador.foto
                ? <img src={jugador.foto} alt={jugador.nombre} />
                : <span>{iniciales}</span>
              }
            </div>
            <div className="pmodal__header-text">
              <span className="pmodal__pos-badge">{jugador.posicion}</span>
              <h2 className="pmodal__nombre">{jugador.nombre}</h2>
              <div className="pmodal__quick-info">
                <span>#{jugador.dorsal}</span>
                <span className="pmodal__dot">•</span>
                <span>{jugador.edad} años</span>
                {jugador.nacionalidad && (
                  <>
                    <span className="pmodal__dot">•</span>
                    <span>{jugador.nacionalidad}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="pmodal__body">

          {/* COL IZQUIERDA: descripción + stats */}
          <div className="pmodal__col">
            {jugador.descripcion && (
              <div className="pmodal__section">
                <h3 className="pmodal__section-title">Sobre el jugador</h3>
                <p className="pmodal__desc">{jugador.descripcion}</p>
              </div>
            )}

            {jugador.stats && (
              <div className="pmodal__section">
                <h3 className="pmodal__section-title">Estadísticas de temporada</h3>
                <PlayerStats stats={jugador.stats} posicion={jugador.posicion} color={color} />
              </div>
            )}
          </div>

          {/* COL DERECHA: posiciones */}
          <div className="pmodal__col pmodal__col--pitch">
            <h3 className="pmodal__section-title pmodal__section-title--center">Posiciones</h3>
            <FootballPitch posiciones={jugador.posiciones || []} primaryPosition={primaryPos} />
            <div className="pmodal__badges">
              {jugador.posiciones?.map(p => (
                <span key={p} className="pmodal__pos-pill" style={{ borderColor: color, color }}>
                  {p}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
