import { useFCFClasificacion } from "../hooks/useFCFClasificacion";
import LeagueTable from "../components/ui/LeagueTable";
import "./Liga.css";

function LigaStats({ clasificacion }) {
  const nosotros = clasificacion.find((c) => c.esNosotros);
  if (!nosotros) return null;

  const stats = [
    { num: `#${nosotros.pos}`, label: "Posición" },
    { num: nosotros.pts, label: "Puntos" },
    { num: nosotros.pj, label: "Jugados" },
    {
      num: `${nosotros.gf - nosotros.gc > 0 ? "+" : ""}${nosotros.gf - nosotros.gc}`,
      label: "Dif. goles",
    },
  ];

  return (
    <div className="liga-hero__stats">
      {stats.map((s) => (
        <div key={s.label} className="liga-hero__stat">
          <span className="liga-hero__stat-num">{s.num}</span>
          <span className="liga-hero__stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Liga() {
  const { clasificacion, loading, error } = useFCFClasificacion();
  const nosotros = clasificacion.find((c) => c.esNosotros);

  return (
    <div className="liga-page">
      {/* HERO */}
      <div className="liga-hero">
        <img
          src="/escudo.png"
          alt=""
          className="liga-hero__escudo"
          aria-hidden="true"
        />
        <div className="container">
          <span className="liga-hero__eyebrow">Temporada 2026 – 27</span>
          <h1 className="liga-hero__title">Clasificacio</h1>
          <p className="liga-hero__sub">Segona Catalana · Grupo 3</p>
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
                <h2 className="liga-table-card__title">Taula completa</h2>
                <span className="liga-table-card__sub">
                  {clasificacion.length} equips
                </span>
              </div>
              <LeagueTable />
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="liga-sidebar">
            <div className="liga-card">
              <h3 className="liga-card__title">Llegenda</h3>
              <div className="liga-legend">
                <div className="liga-legend__item">
                  <span
                    className="liga-legend__dot"
                    style={{ background: "var(--color-blue)" }}
                  />
                  <span>Zona d'ascens</span>
                </div>
                <div className="liga-legend__item">
                  <span
                    className="liga-legend__dot"
                    style={{ background: "var(--color-red)" }}
                  />
                  <span>Begur C.F. A</span>
                </div>
                <div className="liga-legend__item">
                  <span
                    className="liga-legend__dot"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  />
                  <span>Resta d'equips</span>
                </div>
              </div>
            </div>

            {nosotros && (
              <div className="liga-card liga-card--highlight">
                <h3 className="liga-card__title">Begur C.F. A</h3>
                <div className="liga-mini-stats">
                  <div className="liga-mini-stat">
                    <span>Posicio</span>
                    <strong>{nosotros.pos}º</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Guanyats</span>
                    <strong style={{ color: "#4caf50" }}>{nosotros.g}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Empatats</span>
                    <strong style={{ color: "#ffc107" }}>{nosotros.e}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Perduts</span>
                    <strong style={{ color: "#C8102E" }}>{nosotros.p}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Gols a favor</span>
                    <strong>{nosotros.gf}</strong>
                  </div>
                  <div className="liga-mini-stat">
                    <span>Gols en contra</span>
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
