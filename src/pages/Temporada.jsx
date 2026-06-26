import { usePartidos } from '../hooks/useData';
import SectionTitle from '../components/ui/SectionTitle';
import './Temporada.css';

function getResultado(partido) {
  if (!partido.resultado) return null;
  const [g1, g2] = partido.resultado.split('-').map(Number);
  const esLocal = partido.lugar === 'Casa';
  const golesBegur = esLocal ? g1 : g2;
  const golesRival = esLocal ? g2 : g1;
  if (golesBegur > golesRival) return 'victoria';
  if (golesBegur < golesRival) return 'derrota';
  return 'empate';
}

const LABEL = {
  victoria: { texto: 'Victoria', color: '#1a5c1a', bg: 'rgba(26,92,26,0.15)', icon: '✅' },
  derrota:  { texto: 'Derrota',  color: '#C8102E', bg: 'rgba(200,16,46,0.15)', icon: '❌' },
  empate:   { texto: 'Empate',   color: '#b07800', bg: 'rgba(176,120,0,0.15)', icon: '🟡' },
};

function Stats({ partidos }) {
  const jugados = partidos.filter(p => p.resultado);
  const v = jugados.filter(p => getResultado(p) === 'victoria').length;
  const e = jugados.filter(p => getResultado(p) === 'empate').length;
  const d = jugados.filter(p => getResultado(p) === 'derrota').length;
  const pts = v * 3 + e;

  return (
    <div className="temporada__stats">
      <div className="temporada__stat">
        <span className="temporada__stat-num" style={{ color: '#fff' }}>{jugados.length}</span>
        <span className="temporada__stat-label">Jugados</span>
      </div>
      <div className="temporada__stat">
        <span className="temporada__stat-num" style={{ color: '#4caf50' }}>{v}</span>
        <span className="temporada__stat-label">Victorias</span>
      </div>
      <div className="temporada__stat">
        <span className="temporada__stat-num" style={{ color: '#b07800' }}>{e}</span>
        <span className="temporada__stat-label">Empates</span>
      </div>
      <div className="temporada__stat">
        <span className="temporada__stat-num" style={{ color: '#C8102E' }}>{d}</span>
        <span className="temporada__stat-label">Derrotas</span>
      </div>
      <div className="temporada__stat temporada__stat--pts">
        <span className="temporada__stat-num" style={{ color: '#fff' }}>{pts}</span>
        <span className="temporada__stat-label">Puntos</span>
      </div>
    </div>
  );
}

function RachaBar({ partidos }) {
  const jugados = partidos.filter(p => p.resultado).slice(-10);
  return (
    <div className="racha">
      <span className="racha__label">Últimos {jugados.length} partidos</span>
      <div className="racha__bar">
        {jugados.map((p, i) => {
          const r = getResultado(p);
          const color = r === 'victoria' ? '#4caf50' : r === 'derrota' ? '#C8102E' : '#b07800';
          const letra = r === 'victoria' ? 'V' : r === 'derrota' ? 'D' : 'E';
          return (
            <div key={i} className="racha__item" style={{ background: color }} title={`${p.rival} ${p.resultado}`}>
              {letra}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Temporada() {
  const { partidos } = usePartidos();
  const sorted = [...partidos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const jugados = sorted.filter(p => p.resultado);
  const proximos = sorted.filter(p => !p.resultado);

  return (
    <div className="temporada">
      <div className="section section--dark">
        <div className="container">
          <SectionTitle title="Temporada 2024-25" subtitle="Seguimiento completo de la temporada" light />
        </div>
      </div>

      {/* STATS + RACHA */}
      <section className="temporada__hero">
        <div className="container">
          <Stats partidos={partidos} />
          <RachaBar partidos={sorted} />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="container">
          <SectionTitle title="Timeline" subtitle="Todos los partidos de la temporada" />
          <div className="timeline">

            {sorted.map((partido, i) => {
              const r = partido.resultado ? getResultado(partido) : null;
              const info = r ? LABEL[r] : null;
              const fecha = new Date(partido.fecha).toLocaleDateString('es-ES', {
                weekday: 'short', day: 'numeric', month: 'short'
              });
              const esProximo = !partido.resultado;

              return (
                <div key={partido._id || i} className={`timeline__item ${esProximo ? 'timeline__item--next' : ''}`}>

                  {/* LÍNEA + DOT */}
                  <div className="timeline__dot-wrap">
                    <div
                      className="timeline__dot"
                      style={{ background: info ? info.color : 'rgba(255,255,255,0.2)', borderColor: info ? info.color : 'rgba(255,255,255,0.3)' }}
                    >
                      {info ? info.icon : '🕐'}
                    </div>
                    {i < sorted.length - 1 && <div className="timeline__line" />}
                  </div>

                  {/* CARD */}
                  <div
                    className="timeline__card"
                    style={{ background: info ? info.bg : 'rgba(255,255,255,0.03)', borderColor: info ? info.color : 'rgba(255,255,255,0.1)' }}
                  >
                    <div className="timeline__card-top">
                      <span className="timeline__fecha">{fecha}</span>
                      <span className="timeline__lugar" style={{ color: partido.lugar === 'Casa' ? '#6ab0ff' : '#ffaa6a' }}>
                        {partido.lugar === 'Casa' ? '🏠 Local' : '✈️ Fuera'}
                      </span>
                      {info && (
                        <span className="timeline__badge" style={{ background: info.color }}>
                          {info.texto}
                        </span>
                      )}
                      {esProximo && (
                        <span className="timeline__badge timeline__badge--next">Próximo</span>
                      )}
                    </div>

                    <div className="timeline__match">
                      <span className="timeline__team">Begur C.F. A</span>
                      {partido.resultado
                        ? <span className="timeline__score">{partido.resultado}</span>
                        : <span className="timeline__vs">VS</span>
                      }
                      <span className="timeline__team">{partido.rival}</span>
                    </div>

                    <div className="timeline__card-footer">
                      <span className="timeline__hora">🕐 {partido.hora}h</span>
                    </div>
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>
    </div>
  );
}
