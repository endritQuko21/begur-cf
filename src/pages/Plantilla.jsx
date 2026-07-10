import { useState } from 'react';
import { useJugadores, useStaff } from '../hooks/useData';
import PlayerCard from '../components/ui/PlayerCard';
import PlayerModal from '../components/ui/PlayerModal';
import './Plantilla.css';

const ORDEN_POS = ['Portero', 'Defensa', 'Centrocampista', 'Delantero'];
const POS_META = {
  Portero:         { icon: '🧤', label: 'Porteros',        color: '#C8102E' },
  Defensa:         { icon: '🛡️', label: 'Defensas',        color: '#003087' },
  Centrocampista:  { icon: '⚙️', label: 'Centrocampistas', color: '#1a5c1a' },
  Delantero:       { icon: '⚡', label: 'Delanteros',       color: '#b07800' },
};

function HeroStats({ jugadores, staff }) {
  const edadMedia = jugadores.length
    ? Math.round(jugadores.reduce((a, j) => a + Number(j.edad || 0), 0) / jugadores.length)
    : 0;
  const stats = [
    { num: jugadores.length, label: 'Jugadores' },
    { num: staff.length, label: 'Cuerpo técnico' },
    { num: edadMedia, label: 'Edad media' },
    { num: '2026-27', label: 'Temporada' },
  ];
  return (
    <div className="plantilla-hero__stats">
      {stats.map(s => (
        <div key={s.label} className="plantilla-hero__stat">
          <span className="plantilla-hero__stat-num">{s.num}</span>
          <span className="plantilla-hero__stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Plantilla() {
  const { jugadores, loading } = useJugadores();
  const { staff } = useStaff();
  const [selected, setSelected] = useState(null);
  const [filtroPos, setFiltroPos] = useState('Todos');

  const grupos = ORDEN_POS
    .map(pos => ({ pos, jugadores: jugadores.filter(j => j.posicion === pos) }))
    .filter(g => g.jugadores.length > 0);

  const visibles = filtroPos === 'Todos' ? grupos : grupos.filter(g => g.pos === filtroPos);

  return (
    <div className="plantilla-page">

      {/* HERO */}
      <div className="plantilla-hero">
        <img src="/escudo.png" alt="" className="plantilla-hero__escudo" aria-hidden="true" />
        <div className="container">
          <span className="plantilla-hero__eyebrow">Temporada 2026 – 27</span>
          <h1 className="plantilla-hero__title">La Plantilla</h1>
          <p className="plantilla-hero__sub">Conoce a los jugadores que defienden los colores del Begur C.F. A</p>
          {!loading && <HeroStats jugadores={jugadores} staff={staff} />}
        </div>
      </div>

      {/* FILTROS POR POSICIÓN */}
      <div className="plantilla-filters">
        <div className="container plantilla-filters__inner">
          {['Todos', ...ORDEN_POS].map(pos => {
            const meta = POS_META[pos];
            const count = pos === 'Todos' ? jugadores.length : jugadores.filter(j => j.posicion === pos).length;
            if (pos !== 'Todos' && count === 0) return null;
            return (
              <button
                key={pos}
                className={`plantilla-filter ${filtroPos === pos ? 'plantilla-filter--active' : ''}`}
                onClick={() => setFiltroPos(pos)}
                style={filtroPos === pos && meta ? { borderColor: meta.color, color: meta.color } : {}}
              >
                {meta ? `${meta.icon} ${meta.label}` : '⭐ Todos'}
                <span className="plantilla-filter__count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* GRUPOS DE JUGADORES */}
      <section className="plantilla-body">
        <div className="container">
          {loading && <p className="plantilla-empty">Cargando plantilla...</p>}

          {!loading && visibles.map(grupo => {
            const meta = POS_META[grupo.pos];
            return (
              <div key={grupo.pos} className="plantilla-grupo">
                <div className="plantilla-grupo__header">
                  <span className="plantilla-grupo__icon" style={{ background: meta.color }}>{meta.icon}</span>
                  <h2 className="plantilla-grupo__title">{meta.label}</h2>
                  <span className="plantilla-grupo__line" style={{ background: meta.color }} />
                  <span className="plantilla-grupo__count">{grupo.jugadores.length}</span>
                </div>
                <div className="plantilla-grupo__grid">
                  {grupo.jugadores
                    .sort((a, b) => a.dorsal - b.dorsal)
                    .map(j => (
                      <PlayerCard key={j._id} jugador={j} onClick={() => setSelected(j)} />
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STAFF */}
      {!loading && staff.length > 0 && (
        <section className="plantilla-staff">
          <div className="container">
            <div className="plantilla-grupo__header">
              <span className="plantilla-grupo__icon" style={{ background: 'var(--color-blue)' }}>👔</span>
              <h2 className="plantilla-grupo__title">Cuerpo Técnico</h2>
              <span className="plantilla-grupo__line" style={{ background: 'var(--color-blue)' }} />
            </div>
            <div className="staff-grid">
              {staff.map(s => (
                <div key={s._id} className="staff-card">
                  <div className="staff-card__avatar">
                    {s.foto ? <img src={s.foto} alt={s.nombre} /> : <span>{s.nombre.split(' ').map(n => n[0]).join('')}</span>}
                  </div>
                  <span className="staff-card__nombre">{s.nombre}</span>
                  <span className="staff-card__rol">{s.rol}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {selected && (
        <PlayerModal jugador={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
