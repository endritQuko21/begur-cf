import './MatchCard.css';

export default function MatchCard({ partido }) {
  const fecha = new Date(partido.fecha).toLocaleDateString('es-ES', {
    weekday: 'short', day: 'numeric', month: 'short'
  });
  const esLocal = partido.lugar === 'Casa';

  return (
    <div className={`match-card ${partido.tipo === 'proximo' ? 'match-card--next' : ''}`}>
      <div className="match-card__meta">
        <span className="match-card__fecha">{fecha} · {partido.hora}</span>
        <span className={`match-card__lugar ${esLocal ? 'local' : 'fuera'}`}>
          {partido.lugar}
        </span>
      </div>
      <div className="match-card__teams">
        <span className="match-card__team">Begur C.F. A</span>
        {partido.resultado
          ? <span className="match-card__result">{partido.resultado}</span>
          : <span className="match-card__vs">VS</span>
        }
        <span className="match-card__team">{partido.rival}</span>
      </div>
    </div>
  );
}
