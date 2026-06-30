import { useClasificacion } from '../hooks/useData';
import LeagueTable from '../components/ui/LeagueTable';
import './Liga.css';

function LigaStats({ clasificacion }) {
  const nosotros = clasificacion.find(c => c.esNosotros);
  if (!nosotros) return null;

  const stats = [
    { num: `#${nosotros.pos}`, label: 'Posición' },
    { num: nosotros.pts, label: 'Puntos' },
    { num: nosotros.pj, label: 'Jugados' },
    { num: `${nosotros.gf - nosotros.gc > 0 ? '+' : ''}${nosotros.gf - nosotros.gc}`, label: 'Dif. goles' },
  ];

  return (
    <div className="liga-hero__stats">
      {stats.map(s => (
        <div key={s.label} className="liga-hero__stat">
          <span className="liga-hero__stat-num">{s.num}</span>
          <span className="liga-hero__stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Liga() {
  const { clasificacion, loading } = useClasificacion();
  const nosotros = clasificacion.find(c => c.esNosotros);

  return (
    <div className="liga-page">

      {/* HERO */}
      <div className="liga-hero">
        <img src="/escudo.png" alt="" className="liga-hero__escudo" aria-hidden="true" />
        <div className="container">
          <span className="liga-hero__eyebrow">Temporada 2024 – 25</span>
          <h1 className="liga-hero__title">Clasificación</h1>
          <p className="liga-hero__sub">Regional Preferent Girona · Grupo 3</p>
          {!loading && <LigaStats clasificacion={clasificacion} />}
        </div>
      </div>

      {/* TABLA */}
      <section className="liga-body">
        <div className="container liga-layout">

          {/* TABLA PRINCIPAL */}
          <div className="liga-main">
            <div className="liga-table-card">
              <div className="liga-table-card__header">
                <h2 className="liga-table-card__title">Tabla completa</h2>
                <span className="liga-table-card__sub">{clasificacion.length} equipos</span>
              </div>
              <LeagueTable />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="liga-sidebar">

            <div className="liga-card">
              <h3 className="liga-card__title">Leyenda</h3>
              <div className="liga-legend">
                <div className="liga-legend__item">
                  <span className="liga-legend__dot" style={{ background: 'var(--color-blue)' }} />
                  <span>Zona de ascenso</span>
                </div>
                <div className="liga-legend__item">
                  <span className="liga-legend__dot" style={{ background: 'var(--color-red)' }} />
                  <span>Begur C.F. A</span>
                </div>
                <div className="liga-legend__item">
                  <span className="liga-legend__dot" style={{ background: 'rgba(255,255,255,0.15)' }} />
                  <span>Resto de equipos</span>
                </div>
              </div>
            </div>

            {nosotros && (
              <div className="liga-card liga-card--highlight">
                <h3 className="liga-card__title">Begur C.F. A</h3>
                <div className="liga-mini-stats">
                  <div className="liga-mini-stat">
                    <span>Posición</span>
                    <strong>{nosotros.pos}º</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Ganados</span>
                    <strong style={{ color: '#4caf50' }}>{nosotros.g}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Empatados</span>
                    <strong style={{ color: '#ffc107' }}>{nosotros.e}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Perdidos</span>
                    <strong style={{ color: '#C8102E' }}>{nosotros.p}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Goles a favor</span>
                    <strong>{nosotros.gf}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Goles en contra</span>
                    <strong>{nosotros.gc}</strong>
                  </div>
                </div>
              </div>
            )}

          </aside>

        </div>
      </section>
    </div>
  );
}
