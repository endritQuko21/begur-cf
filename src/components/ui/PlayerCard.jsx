import './PlayerCard.css';

const posicionColor = {
  Portero: '#C8102E',
  Defensa: '#003087',
  Centrocampista: '#1a5c1a',
  Delantero: '#b07800',
};
const posicionAbrev = {
  Portero: 'POR',
  Defensa: 'DEF',
  Centrocampista: 'CEN',
  Delantero: 'DEL',
};

export default function PlayerCard({ jugador, onClick }) {
  const color = posicionColor[jugador.posicion] || '#333';
  const iniciales = jugador.nombre.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <div
      className="pcard"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ '--pcard-color': color }}
    >
      <div className="pcard__top">
        <span className="pcard__dorsal">{jugador.dorsal}</span>
        <span className="pcard__pos-tag">{posicionAbrev[jugador.posicion]}</span>
      </div>

      <div className="pcard__avatar">
        {jugador.foto
          ? <img src={jugador.foto} alt={jugador.nombre} />
          : <span className="pcard__initials">{iniciales}</span>
        }
        <div className="pcard__avatar-glow" />
      </div>

      <div className="pcard__info">
        <span className="pcard__nombre">{jugador.nombre}</span>
        <span className="pcard__edad">{jugador.edad} años</span>
      </div>

      <div className="pcard__footer">
        <span>Ver perfil</span>
        <span className="pcard__arrow">→</span>
      </div>
    </div>
  );
}
