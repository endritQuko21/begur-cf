import { useEffect } from 'react';
import FootballPitch from './FootballPitch';
import './PlayerModal.css';

const posicionColor = {
  Portero: '#C8102E',
  Defensa: '#003087',
  Centrocampista: '#1a5c1a',
  Delantero: '#b07800',
};

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
