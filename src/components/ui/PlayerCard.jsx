import './PlayerCard.css';

const posicionColor = {
  Portero: '#C8102E',
  Defensa: '#003087',
  Centrocampista: '#1a5c1a',
  Delantero: '#b07800',
};

export default function PlayerCard({ jugador }) {
  const color = posicionColor[jugador.posicion] || '#333';
  return (
    <div className="player-card">
      <div className="player-card__dorsal" style={{ background: color }}>
        {jugador.dorsal}
      </div>
      <div className="player-card__avatar">
        {jugador.foto
          ? <img src={jugador.foto} alt={jugador.nombre} />
          : <div className="player-card__placeholder">👤</div>
        }
      </div>
      <div className="player-card__info">
        <span className="player-card__nombre">{jugador.nombre}</span>
        <span className="player-card__pos" style={{ color }}>{jugador.posicion}</span>
        <span className="player-card__edad">{jugador.edad} años</span>
      </div>
    </div>
  );
}
