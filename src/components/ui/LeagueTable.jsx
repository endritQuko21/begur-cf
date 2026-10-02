import { useFCFClasificacion } from "../../hooks/useFCFClasificacion";
import "./LeagueTable.css";

const FORMA_COLOR = { G: "#4caf50", E: "#ffc107", P: "#C8102E" };
const FORMA_LABEL = { G: "V", E: "E", P: "D" };

export default function LeagueTable({ maxRows }) {
  const { clasificacion, loading, error } = useFCFClasificacion();
  const rows = maxRows ? clasificacion.slice(0, maxRows) : clasificacion;

  if (loading)
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          color: "rgba(255,255,255,0.3)",
          fontSize: "0.85rem",
        }}
      >
        Cargando clasificación...
      </div>
    );

  if (error)
    return (
      <div
        style={{
          padding: "24px",
          textAlign: "center",
          color: "#ff8080",
          fontSize: "0.85rem",
        }}
      >
        ⚠️ Error cargando datos de la FCF
      </div>
    );

  return (
    <div className="league-table">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th className="league-table__equipo-col">Equipo</th>
            <th title="Partidos jugados">PJ</th>
            <th title="Ganados">G</th>
            <th title="Empatados">E</th>
            <th title="Perdidos">P</th>
            <th title="Diferencia de goles" className="league-table__hide-sm">
              DG
            </th>
            <th>Pts</th>
            <th className="league-table__hide-sm" title="Últimos 5">
              Forma
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.pos}
              className={row.esNosotros ? "league-table__us" : ""}
            >
              <td className="league-table__pos">
                <span
                  className={`pos-badge ${row.pos <= 3 ? "pos-badge--top" : ""} ${row.esNosotros ? "pos-badge--us" : ""}`}
                >
                  {row.pos}
                </span>
              </td>
              <td className="league-table__nombre">
                {row.esNosotros ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {row.logo && (
                      <img
                        src={row.logo}
                        alt=""
                        style={{ width: 20, height: 20, objectFit: "contain" }}
                      />
                    )}
                    <strong>{row.equipo}</strong>
                  </span>
                ) : (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {row.logo && (
                      <img
                        src={row.logo}
                        alt=""
                        style={{
                          width: 18,
                          height: 18,
                          objectFit: "contain",
                          opacity: 0.7,
                        }}
                      />
                    )}
                    {row.equipo}
                  </span>
                )}
              </td>
              <td>{row.pj}</td>
              <td>{row.g}</td>
              <td>{row.e}</td>
              <td>{row.p}</td>
              <td className="league-table__hide-sm">
                {row.gf - row.gc > 0 ? "+" : ""}
                {row.gf - row.gc}
              </td>
              <td className="league-table__pts">{row.pts}</td>
              <td className="league-table__hide-sm">
                <div style={{ display: "flex", gap: "3px" }}>
                  {(row.forma || []).slice(0, 5).map((r, i) => (
                    <span
                      key={i}
                      style={{
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: FORMA_COLOR[r],
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6rem",
                        fontWeight: 800,
                        color: "white",
                      }}
                    >
                      {FORMA_LABEL[r]}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
