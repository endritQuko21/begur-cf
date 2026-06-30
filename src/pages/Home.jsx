import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePartidos, useNoticias, useClasificacion, useJugadores } from '../hooks/useData';
import LeagueTable from '../components/ui/LeagueTable';
import PlayerCard from '../components/ui/PlayerCard';
import PlayerModal from '../components/ui/PlayerModal';
import NoticiaModal from '../components/ui/NoticiaModal';
import Countdown from '../components/ui/Countdown';
import './Home.css';

const CATEGORIA_COLOR = {
  Partido: '#C8102E', Club: '#003087', Fichaje: '#1a5c1a', Comunidad: '#b07800', Otro: '#555',
};

function getResultado(p) {
  if (!p.resultado) return null;
  const [g1, g2] = p.resultado.split('-').map(Number);
  const esLocal = p.lugar === 'Casa';
  const gb = esLocal ? g1 : g2, gr = esLocal ? g2 : g1;
  if (gb > gr) return 'victoria';
  if (gb < gr) return 'derrota';
  return 'empate';
}
const RESULT_COLOR = { victoria: '#4caf50', derrota: '#C8102E', empate: '#ffc107' };

export default function Home() {
  const { partidos, loading: lp } = usePartidos();
  const { noticias, loading: ln } = useNoticias();
  const { clasificacion, loading: lc } = useClasificacion();
  const { jugadores, loading: lj } = useJugadores();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const sortedPartidos = [...partidos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const proximo = sortedPartidos.find(p => !p.resultado);
  const ultimosJugados = sortedPartidos.filter(p => p.resultado).slice(-5);
  const sortedNoticias = [...noticias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const ultimasNoticias = sortedNoticias.slice(0, 3);
  const nosotros = clasificacion.find(c => c.esNosotros);
  const destacados = jugadores.slice(0, 4);

  const v = sortedPartidos.filter(p => getResultado(p) === 'victoria').length;
  const jugadosCount = sortedPartidos.filter(p => p.resultado).length;

  return (
    <div className="home">

      {/* ════════ HERO ════════ */}
      <section className="hh">
        <img src="/escudo.png" alt="" className="hh__escudo" aria-hidden="true" />
        <div className="hh__overlay" />
        <div className="container hh__content">
          <div className="hh__left">
            <span className="hh__eyebrow">⚽ Temporada 2024 – 25</span>
            <h1 className="hh__title">BEGUR<br />C.F. A</h1>
            <p className="hh__sub">Club de Futbol · Baix Empordà · Girona</p>
            <div className="hh__actions">
              <Link to="/plantilla" className="btn btn--primary">Ver Plantilla</Link>
              <Link to="/temporada" className="btn btn--outline">Ver Temporada</Link>
            </div>
          </div>

          <div className="hh__right">
            {!lp && proximo ? (
              <div className="hh-card">
                <span className="hh-card__badge">Próximo partido</span>
                <div className="hh-card__match">
                  <span>Begur C.F. A</span>
                  <span className="hh-card__vs">VS</span>
                  <span>{proximo.rival}</span>
                </div>
                <div className="hh-card__meta">
                  <span>📅 {new Date(proximo.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                  <span>🕐 {proximo.hora}h</span>
                  <span>{proximo.lugar === 'Casa' ? '🏠 Local' : '✈️ Fuera'}</span>
                </div>
                <Link to="/temporada" className="hh-card__link">Ver calendario completo →</Link>
              </div>
            ) : (
              <div className="hh-card">
                <span className="hh-card__badge">Bienvenido</span>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Sigue toda la actualidad del Begur C.F. A: plantilla, resultados, clasificación y noticias del club.
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="hh__diagonal" />
      </section>

      {/* ════════ COUNTDOWN ════════ */}
      {!lp && proximo && <Countdown partido={proximo} />}

      {/* ════════ QUICK STATS ════════ */}
      {!lc && nosotros && (
        <section className="qs">
          <div className="container qs__grid">
            <Link to="/liga" className="qs__item">
              <span className="qs__num">#{nosotros.pos}</span>
              <span className="qs__label">Posición liga</span>
            </Link>
            <Link to="/liga" className="qs__item">
              <span className="qs__num">{nosotros.pts}</span>
              <span className="qs__label">Puntos</span>
            </Link>
            <Link to="/temporada" className="qs__item">
              <span className="qs__num" style={{ color: '#4caf50' }}>{v}</span>
              <span className="qs__label">Victorias</span>
            </Link>
            <Link to="/plantilla" className="qs__item">
              <span className="qs__num">{jugadores.length}</span>
              <span className="qs__label">Jugadores</span>
            </Link>
          </div>
        </section>
      )}

      {/* ════════ ÚLTIMOS RESULTADOS ════════ */}
      {!lp && ultimosJugados.length > 0 && (
        <section className="hsection">
          <div className="container">
            <div className="hsection__header">
              <div>
                <span className="hsection__eyebrow">Resultados</span>
                <h2 className="hsection__title">Últimos partidos</h2>
              </div>
              <Link to="/temporada" className="hsection__link">Ver temporada completa →</Link>
            </div>
            <div className="results-strip">
              {ultimosJugados.map((p, i) => {
                const r = getResultado(p);
                return (
                  <div key={p._id || i} className="result-chip" style={{ '--rc': RESULT_COLOR[r] }}>
                    <span className="result-chip__letter">{r === 'victoria' ? 'V' : r === 'derrota' ? 'D' : 'E'}</span>
                    <div className="result-chip__info">
                      <span className="result-chip__rival">{p.rival}</span>
                      <span className="result-chip__score">{p.resultado}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════ CLASIFICACIÓN ════════ */}
      {!lc && clasificacion.length > 0 && (
        <section className="hsection hsection--alt">
          <div className="container">
            <div className="hsection__header">
              <div>
                <span className="hsection__eyebrow">Liga</span>
                <h2 className="hsection__title">Clasificación</h2>
              </div>
              <Link to="/liga" className="hsection__link">Ver clasificación completa →</Link>
            </div>
            <div className="home-table-card">
              <LeagueTable maxRows={5} />
            </div>
          </div>
        </section>
      )}

      {/* ════════ PLANTILLA DESTACADA ════════ */}
      {!lj && destacados.length > 0 && (
        <section className="hsection">
          <div className="container">
            <div className="hsection__header">
              <div>
                <span className="hsection__eyebrow">Equipo</span>
                <h2 className="hsection__title">Plantilla</h2>
              </div>
              <Link to="/plantilla" className="hsection__link">Ver plantilla completa →</Link>
            </div>
            <div className="home-players">
              {destacados.map(j => (
                <PlayerCard key={j._id} jugador={j} onClick={() => setSelectedPlayer(j)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════ NOTICIAS ════════ */}
      {!ln && ultimasNoticias.length > 0 && (
        <section className="hsection hsection--alt">
          <div className="container">
            <div className="hsection__header">
              <div>
                <span className="hsection__eyebrow">Actualidad</span>
                <h2 className="hsection__title">Últimas noticias</h2>
              </div>
              <Link to="/noticias" className="hsection__link">Ver todas las noticias →</Link>
            </div>
            <div className="home-news">
              {ultimasNoticias.map(n => {
                const color = CATEGORIA_COLOR[n.categoria] || '#555';
                return (
                  <div key={n._id} className="hn-card" style={{ '--hn-color': color }} onClick={() => setSelectedNews(n)}>
                    <div className="hn-card__img">
                      {n.imagen ? <img src={n.imagen} alt={n.titulo} /> : <div className="hn-card__placeholder" />}
                      <span className="hn-card__cat">{n.categoria}</span>
                    </div>
                    <div className="hn-card__body">
                      <span className="hn-card__fecha">
                        {new Date(n.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}
                      </span>
                      <h3 className="hn-card__titulo">{n.titulo}</h3>
                      <span className="hn-card__cta">Leer más →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ════════ CTA FINAL ════════ */}
      <section className="hcta">
        <img src="/escudo.png" alt="" className="hcta__escudo" aria-hidden="true" />
        <div className="container hcta__content">
          <h2 className="hcta__title">Únete a la afición del Begur</h2>
          <p className="hcta__sub">No te pierdas ningún partido. Síguenos en cada jornada de la temporada.</p>
          <div className="hcta__actions">
            <Link to="/temporada" className="btn btn--primary">Ver calendario</Link>
            <Link to="/campo" className="btn btn--outline">Cómo llegar al campo</Link>
          </div>
        </div>
      </section>

      {selectedPlayer && <PlayerModal jugador={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      {selectedNews && <NoticiaModal noticia={selectedNews} onClose={() => setSelectedNews(null)} />}
    </div>
  );
}
