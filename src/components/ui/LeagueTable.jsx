import { useClasificacion } from '../../hooks/useData';
import './LeagueTable.css';

export default function LeagueTable({ maxRows }) {
  const { clasificacion } = useClasificacion();
  const rows = maxRows ? clasificacion.slice(0, maxRows) : clasificacion;

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
            <th title="Diferencia de goles" className="league-table__hide-sm">DG</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.pos} className={row.esNosotros ? 'league-table__us' : ''}>
              <td className="league-table__pos">
                <span className={`pos-badge ${row.pos <= 3 ? 'pos-badge--top' : ''} ${row.esNosotros ? 'pos-badge--us' : ''}`}>
                  {row.pos}
                </span>
              </td>
              <td className="league-table__nombre">
                {row.esNosotros && <span className="league-table__escudo">⚽</span>}
                {row.equipo}
              </td>
              <td>{row.pj}</td>
              <td>{row.g}</td>
              <td>{row.e}</td>
              <td>{row.p}</td>
              <td className="league-table__hide-sm">{row.gf - row.gc > 0 ? '+' : ''}{row.gf - row.gc}</td>
              <td className="league-table__pts">{row.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
