import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { usePartidos, useNoticias, useClasificacion, useJugadores } from '../hooks/useData';
import LeagueTable from '../components/ui/LeagueTable';
import PlayerCard from '../components/ui/PlayerCard';
import PlayerModal from '../components/ui/PlayerModal';
import NoticiaModal from '../components/ui/NoticiaModal';
import './Home.css';

const CATEGORIA_COLOR = {
  Partido: '#C8102E', Club: '#003087', Fichaje: '#1a5c1a', Comunidad: '#b07800', Otro: '#888',
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

const RESULT_META = {
  victoria: { color: '#4caf50', bg: 'rgba(76,175,80,0.1)', letra: 'V', label: 'Victoria' },
  derrota:  { color: '#C8102E', bg: 'rgba(200,16,46,0.1)',  letra: 'D', label: 'Derrota' },
  empate:   { color: '#ffc107', bg: 'rgba(255,193,7,0.1)',  letra: 'E', label: 'Empate' },
};

// Countdown hook
function useCountdown(fecha, hora) {
  const calc = () => {
    if (!fecha) return null;
    const diff = new Date(`${fecha}T${hora || '17:00'}:00`) - new Date();
    if (diff <= 0) return null;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    if (!fecha) return;
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [fecha]);
  return time;
}

// Ticker de noticias animado
function NewsTicker({ noticias, onSelect }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!noticias.length) return;
    const t = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % noticias.length);
        setAnimating(false);
      }, 400);
    }, 4000);
    return () => clearInterval(t);
  }, [noticias.length]);

  if (!noticias.length) return null;
  const n = noticias[current];
  const color = CATEGORIA_COLOR[n.categoria] || '#888';

  return (
    <div className="ticker" onClick={() => onSelect(n)}>
      <span className="ticker__label" style={{ background: color }}>
        {n.categoria}
      </span>
      <span className={`ticker__text ${animating ? 'ticker__text--out' : 'ticker__text--in'}`}>
        {n.titulo}
      </span>
      <span className="ticker__arrow">→</span>
    </div>
  );
}

export default function Home() {
  const { partidos, loading: lp } = usePartidos();
  const { noticias, loading: ln } = useNoticias();
  const { clasificacion, loading: lc } = useClasificacion();
  const { jugadores, loading: lj } = useJugadores();

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const sorted = [...partidos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  const proximo = sorted.find(p => !p.resultado);
  const ultimosJugados = sorted.filter(p => p.resultado).slice(-5);
  const sortedNoticias = [...noticias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const ultimasNoticias = sortedNoticias.slice(0, 4);
  const nosotros = clasificacion.find(c => c.esNosotros);
  const destacados = jugadores.slice(0, 12);

  const v = sorted.filter(p => getResultado(p) === 'victoria').length;
  const e = sorted.filter(p => getResultado(p) === 'empate').length;
  const d = sorted.filter(p => getResultado(p) === 'derrota').length;

  const countdown = useCountdown(proximo?.fecha, proximo?.hora);
  const pad = n => String(n).padStart(2, '0');

  const proxFecha = proximo
    ? new Date(proximo.fecha).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  return (
    <div className="home">

      {/* ══════════════════════════════════════
          HERO PRINCIPAL
      ══════════════════════════════════════ */}
      <section className="hero">

        {/* CAPAS DE FONDO */}
        <div className="hero__bg">
          <div className="hero__bg-base" />
          <div className="hero__bg-noise" />
          <div className="hero__bg-glow-red" />
          <div className="hero__bg-glow-blue" />
          <div className="hero__bg-lines" />
        </div>

        {/* ESCUDO DE FONDO GRANDE */}
        <img src="/escudo.png" alt="" className="hero__watermark" aria-hidden="true" />

        <div className={`hero__inner ${heroVisible ? 'hero__inner--visible' : ''}`}>

          {/* TOP BAR */}
          <div className="hero__topbar">
            <div className="hero__topbar-brand">
              <img src="/escudo.png" alt="Begur CF" className="hero__topbar-escudo" />
              <div>
                <span className="hero__topbar-name">BEGUR C.F.</span>
                <span className="hero__topbar-league">Segona Catalana - Grup 1</span>
              </div>
            </div>
            <div className="hero__topbar-right">
              <span className="hero__topbar-season">
                <span className="hero__topbar-dot" />
                Temporada 2024 – 25
              </span>
            </div>
          </div>

          {/* CUERPO PRINCIPAL */}
          <div className="hero__body">

            {/* TÍTULO IZQUIERDA */}
            <div className="hero__title-block">
              <div className="hero__pretitle">Club de Futbol · Baix Empordà</div>
              <h1 className="hero__title">
                <span className="hero__title-word hero__title-word--1">BEG</span>
                <span className="hero__title-word hero__title-word--2">UR</span>
                <br />
                <span className="hero__title-word hero__title-word--3">C.F.</span>
                <span className="hero__title-word hero__title-word--4 hero__title-a"> A</span>
              </h1>

              {/* FORMA RECIENTE */}
              {ultimosJugados.length > 0 && (
                <div className="hero__forma">
                  <span className="hero__forma-label">Forma</span>
                  {ultimosJugados.slice(-5).map((p, i) => {
                    const r = getResultado(p);
                    const m = RESULT_META[r];
                    return (
                      <div key={i} className="hero__forma-chip"
                        style={{ background: m.color, boxShadow: `0 0 10px ${m.color}55` }}
                        title={`${p.rival} ${p.resultado}`}
                      >
                        {m.letra}
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="hero__btns">
                <Link to="/plantilla" className="hero__btn hero__btn--red">
                  Ver Plantilla →
                </Link>
                <Link to="/temporada" className="hero__btn hero__btn--ghost">
                  Temporada
                </Link>
              </div>
            </div>

            {/* PARTIDO DERECHA */}
            <div className="hero__match-block">
              {!lp && proximo ? (
                <div className="hero__pcard">
                  <div className="hero__pcard-shine" />

                  <div className="hero__pcard-top">
                    <span className="hero__pcard-badge">
                      <span className="hero__pcard-pulse" />
                      Próximo partido
                    </span>
                    {proximo.lugar === 'Casa'
                      ? <span className="hero__pcard-venue hero__pcard-venue--home">🏠 Local</span>
                      : <span className="hero__pcard-venue hero__pcard-venue--away">✈️ Fuera</span>
                    }
                  </div>

                  <div className="hero__pcard-date">
                    {proxFecha} · {proximo.hora}h
                  </div>

                  <div className="hero__pcard-match">
                    <div className="hero__pcard-team">
                      <div className="hero__pcard-shield">
                        <img src="/escudo.png" alt="Begur CF" />
                      </div>
                      <span>Begur C.F. A</span>
                    </div>

                    <div className="hero__pcard-divider">
                      <span className="hero__pcard-vs">VS</span>
                      {countdown && (
                        <div className="hero__pcard-countdown">
                          {[
                            { v: countdown.d, l: 'd' },
                            { v: countdown.h, l: 'h' },
                            { v: countdown.m, l: 'm' },
                            { v: countdown.s, l: 's' },
                          ].map(({ v, l }) => (
                            <div key={l} className="hero__pcard-cunit">
                              <span className="hero__pcard-cnum">{pad(v)}</span>
                              <span className="hero__pcard-clabel">{l}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="hero__pcard-team hero__pcard-team--right">
                      <div className="hero__pcard-shield hero__pcard-shield--rival">
                        <span>{proximo.rival.slice(0, 3).toUpperCase()}</span>
                      </div>
                      <span>{proximo.rival}</span>
                    </div>
                  </div>

                  <Link to="/temporada" className="hero__pcard-link">
                    Ver calendario completo →
                  </Link>
                </div>
              ) : (
                <div className="hero__pcard hero__pcard--empty">
                  <img src="/escudo.png" alt="" style={{ width: 72, opacity: 0.3 }} />
                  <p>Sigue toda la actualidad del Begur C.F. A en cada jornada.</p>
                  <Link to="/noticias" className="hero__pcard-link">Ver noticias →</Link>
                </div>
              )}
            </div>

          </div>

          {/* TICKER DE NOTICIAS */}
          {!ln && ultimasNoticias.length > 0 && (
            <div className="hero__ticker-wrap">
              <span className="hero__ticker-prefix">🔴 EN DIRECTO</span>
              <NewsTicker noticias={ultimasNoticias} onSelect={setSelectedNews} />
            </div>
          )}

        </div>

        <div className="hero__fade-bottom" />
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      {!lc && nosotros && (
        <div className="sbar">
          <div className="container sbar__row">
            {[
              { to: '/liga', num: `${nosotros.pos}º`, label: 'Clasificación', color: 'white' },
              { to: '/liga', num: nosotros.pts, label: 'Puntos', color: 'white' },
              { to: '/temporada', num: v, label: 'Victorias', color: '#4caf50' },
              { to: '/temporada', num: e, label: 'Empates', color: '#ffc107' },
              { to: '/temporada', num: d, label: 'Derrotas', color: '#C8102E' },
              { to: '/plantilla', num: jugadores.length, label: 'Jugadores', color: 'white' },
            ].map((s, i) => (
              <Link key={i} to={s.to} className="sbar__item">
                <span className="sbar__num" style={{ color: s.color }}>{s.num}</span>
                <span className="sbar__label">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          ÚLTIMOS RESULTADOS
      ══════════════════════════════════════ */}
      {!lp && ultimosJugados.length > 0 && (
        <section className="hsec">
          <div className="container">
            <div className="hsec__head">
              <div>
                <span className="hsec__eye">Resultados</span>
                <h2 className="hsec__title">Últimos partidos</h2>
              </div>
              <Link to="/temporada" className="hsec__more">Ver temporada →</Link>
            </div>
            <div className="rstrip">
              {ultimosJugados.map((p, i) => {
                const r = getResultado(p);
                const m = RESULT_META[r];
                return (
                  <div key={p._id || i} className="rchip" style={{ '--rc': m.color, '--rcbg': m.bg }}>
                    <div className="rchip__letter">{m.letra}</div>
                    <div className="rchip__info">
                      <span className="rchip__rival">{p.rival}</span>
                      <span className="rchip__score">{p.resultado}</span>
                    </div>
                    <span className="rchip__label">{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          TABLA + NOTICIAS
      ══════════════════════════════════════ */}
      {!lc && clasificacion.length > 0 && (
        <section className="hsec hsec--alt">
          <div className="container split">
            <div className="split__main">
              <div className="hsec__head">
                <div>
                  <span className="hsec__eye">Liga</span>
                  <h2 className="hsec__title">Clasificación</h2>
                </div>
                <Link to="/liga" className="hsec__more">Ver completa →</Link>
              </div>
              <div className="htable">
                <LeagueTable maxRows={6} />
              </div>
            </div>
            {!ln && ultimasNoticias.length > 0 && (
              <aside className="split__aside">
                <div className="hsec__head">
                  <div>
                    <span className="hsec__eye">Actualidad</span>
                    <h2 className="hsec__title">Noticias</h2>
                  </div>
                  <Link to="/noticias" className="hsec__more">Ver todas →</Link>
                </div>
                <div className="anews">
                  {ultimasNoticias.map(n => {
                    const color = CATEGORIA_COLOR[n.categoria] || '#888';
                    return (
                      <div key={n._id} className="anews__item" onClick={() => setSelectedNews(n)} style={{ '--nc': color }}>
                        <div className="anews__img">
                          {n.imagen ? <img src={n.imagen} alt={n.titulo} /> : <div className="anews__ph" />}
                        </div>
                        <div className="anews__body">
                          <span className="anews__cat">{n.categoria}</span>
                          <p className="anews__titulo">{n.titulo}</p>
                        </div>
                        <span className="anews__arr">→</span>
                      </div>
                    );
                  })}
                </div>
              </aside>
            )}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          PLANTILLA
      ══════════════════════════════════════ */}
      {!lj && destacados.length > 0 && (
        <section className="hsec">
          <div className="container">
            <div className="hsec__head">
              <div>
                <span className="hsec__eye">El equipo</span>
                <h2 className="hsec__title">Plantilla</h2>
              </div>
              <Link to="/plantilla" className="hsec__more">Ver completa →</Link>
            </div>
            <div className="hplayers">
              {destacados.map(j => (
                <PlayerCard key={j._id} jugador={j} onClick={() => setSelectedPlayer(j)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════
          CTA
      ══════════════════════════════════════ */}
      <section className="hcta">
        <div className="hcta__bg" />
        <img src="/escudo.png" alt="" className="hcta__esc" aria-hidden="true" />
        <div className="container hcta__content">
          <span className="hcta__eye">Begur C.F. A · Baix Empordà</span>
          <h2 className="hcta__title">Tots som Begur</h2>
          <p className="hcta__sub">Vine al camp, viu els partits i forma part de la història del club.</p>
          <div className="hcta__btns">
            <Link to="/temporada" className="hero__btn hero__btn--red">Ver calendario</Link>
            <Link to="/campo" className="hero__btn hero__btn--ghost">Cómo llegar</Link>
          </div>
        </div>
      </section>

      {selectedPlayer && <PlayerModal jugador={selectedPlayer} onClose={() => setSelectedPlayer(null)} />}
      {selectedNews && <NoticiaModal noticia={selectedNews} onClose={() => setSelectedNews(null)} />}
    </div>
  );
}
