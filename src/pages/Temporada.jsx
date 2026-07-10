import { useState } from 'react';
import { usePartidos } from '../hooks/useData';
import { useFotos } from '../hooks/useFotos';
import Gallery from '../components/ui/Gallery';
import SectionTitle from '../components/ui/SectionTitle';
import './Temporada.css';

// ─── Helpers ────────────────────────────────────────────
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

const META = {
  victoria: { texto: 'Victoria', color: '#22863a', bg: 'rgba(34,134,58,0.12)', icon: '✅' },
  derrota:  { texto: 'Derrota',  color: '#C8102E', bg: 'rgba(200,16,46,0.12)', icon: '❌' },
  empate:   { texto: 'Empate',   color: '#b07800', bg: 'rgba(176,120,0,0.12)', icon: '🟡' },
};

// ─── Stats globales ──────────────────────────────────────
function GlobalStats({ partidos }) {
  const jugados = partidos.filter(p => p.resultado);
  const v = jugados.filter(p => getResultado(p) === 'victoria').length;
  const e = jugados.filter(p => getResultado(p) === 'empate').length;
  const d = jugados.filter(p => getResultado(p) === 'derrota').length;
  const pts = v * 3 + e;
  const pct = jugados.length ? Math.round((v / jugados.length) * 100) : 0;

  return (
    <div className="gs">
      {[
        { num: jugados.length, label: 'Jugados',   color: 'rgba(255,255,255,0.9)' },
        { num: v,              label: 'Victorias', color: '#4caf50' },
        { num: e,              label: 'Empates',   color: '#ffc107' },
        { num: d,              label: 'Derrotas',  color: '#C8102E' },
        { num: pts,            label: 'Puntos',    color: '#fff', highlight: true },
        { num: `${pct}%`,      label: '% victorias', color: '#6ab0ff' },
      ].map(s => (
        <div key={s.label} className={`gs__stat ${s.highlight ? 'gs__stat--pts' : ''}`}>
          <span className="gs__num" style={{ color: s.color }}>{s.num}</span>
          <span className="gs__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Barra de racha ─────────────────────────────────────
function RachaBar({ partidos }) {
  const jugados = partidos.filter(p => p.resultado).slice(-10);
  if (!jugados.length) return null;
  return (
    <div className="racha">
      <span className="racha__label">Racha · últimos {jugados.length}</span>
      <div className="racha__bar">
        {jugados.map((p, i) => {
          const r = getResultado(p);
          const color = r === 'victoria' ? '#4caf50' : r === 'derrota' ? '#C8102E' : '#ffc107';
          const letra = r === 'victoria' ? 'V' : r === 'derrota' ? 'D' : 'E';
          return (
            <div key={i} className="racha__chip" style={{ background: color }} title={`${p.rival} ${p.resultado}`}>
              {letra}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Card de partido en el timeline ─────────────────────
function TimelineCard({ partido, index, total }) {
  const r = partido.resultado ? getResultado(partido) : null;
  const meta = r ? META[r] : null;
  const esProximo = !partido.resultado;
  const fecha = new Date(partido.fecha).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  });
  const esLocal = partido.lugar === 'Casa';

  return (
    <div className="tl__item">
      {/* DOT + LINE */}
      <div className="tl__aside">
        <div className="tl__dot" style={{
          background: meta ? meta.color : esProximo ? 'var(--color-blue)' : '#444',
          boxShadow: meta ? `0 0 12px ${meta.color}55` : 'none',
        }}>
          <span>{meta ? meta.icon : '🕐'}</span>
        </div>
        {index < total - 1 && <div className="tl__line" />}
      </div>

      {/* CARD */}
      <div className="tl__card" style={{
        borderColor: meta ? `${meta.color}40` : esProximo ? 'rgba(100,150,255,0.25)' : 'rgba(255,255,255,0.07)',
        background: meta ? meta.bg : esProximo ? 'rgba(0,48,135,0.15)' : 'rgba(255,255,255,0.03)',
      }}>
        {/* Header */}
        <div className="tl__card-header">
          <div className="tl__meta-row">
            <span className="tl__fecha">{fecha} · {partido.hora}h</span>
            <span className="tl__lugar" style={{ color: esLocal ? '#6ab0ff' : '#ffaa6a' }}>
              {esLocal ? '🏠 Local' : '✈️ Fuera'}
            </span>
          </div>
          {meta && (
            <span className="tl__badge" style={{ background: meta.color }}>
              {meta.texto}
            </span>
          )}
          {esProximo && (
            <span className="tl__badge tl__badge--next">Próximo</span>
          )}
        </div>

        {/* Match */}
        <div className="tl__match">
          <div className="tl__team-block">
            <span className="tl__team-name">Begur C.F. A</span>
            <span className="tl__team-sub">Local</span>
          </div>
          {partido.resultado
            ? <div className="tl__score-block">
                <span className="tl__score">{partido.resultado}</span>
              </div>
            : <div className="tl__score-block">
                <span className="tl__vs">VS</span>
                <span className="tl__date-mini">{new Date(partido.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}</span>
              </div>
          }
          <div className="tl__team-block tl__team-block--right">
            <span className="tl__team-name">{partido.rival}</span>
            <span className="tl__team-sub">Visitante</span>
          </div>
        </div>

        {/* Fotos */}
        {!esProximo && partido._id && (
          <div className="tl__card-footer">
            <Gallery partidoId={partido._id} rival={partido.rival} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Página principal ────────────────────────────────────
export default function Temporada() {
  const { partidos, loading } = usePartidos();
  const [filtro, setFiltro] = useState('todos');

  const sorted = [...partidos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  const filtrados = sorted.filter(p => {
    if (filtro === 'todos') return true;
    if (filtro === 'proximos') return !p.resultado;
    if (filtro === 'jugados') return !!p.resultado;
    return getResultado(p) === filtro;
  });

  return (
    <div className="temporada">

      {/* HERO */}
      <div className="temporada__hero">
        <div className="container">
          <SectionTitle title="Temporada 2024-25" subtitle="Seguimiento completo · Segona Catalana - Grup 1" light />
          {!loading && <GlobalStats partidos={sorted} />}
          {!loading && <RachaBar partidos={sorted} />}
        </div>
      </div>

      {/* TIMELINE */}
      <section className="temporada__body">
        <div className="container temporada__layout">

          {/* FILTROS */}
          <aside className="temporada__filters">
            <p className="filters__title">Filtrar</p>
            {[
              { key: 'todos',    label: 'Todos' },
              { key: 'proximos', label: '🕐 Próximos' },
              { key: 'jugados',  label: '⚽ Jugados' },
              { key: 'victoria', label: '✅ Victorias' },
              { key: 'empate',   label: '🟡 Empates' },
              { key: 'derrota',  label: '❌ Derrotas' },
            ].map(f => (
              <button
                key={f.key}
                className={`filter__btn ${filtro === f.key ? 'filter__btn--active' : ''}`}
                onClick={() => setFiltro(f.key)}
              >
                {f.label}
                <span className="filter__count">
                  {f.key === 'todos' ? sorted.length
                    : f.key === 'proximos' ? sorted.filter(p => !p.resultado).length
                    : f.key === 'jugados' ? sorted.filter(p => !!p.resultado).length
                    : sorted.filter(p => getResultado(p) === f.key).length}
                </span>
              </button>
            ))}
          </aside>

          {/* TIMELINE */}
          <div className="tl">
            {loading && <p className="tl__loading">Cargando partidos...</p>}
            {!loading && filtrados.length === 0 && (
              <p className="tl__empty">No hay partidos con este filtro.</p>
            )}
            {filtrados.map((p, i) => (
              <TimelineCard key={p._id || i} partido={p} index={i} total={filtrados.length} />
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
