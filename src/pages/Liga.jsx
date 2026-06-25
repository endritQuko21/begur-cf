import LeagueTable from '../components/ui/LeagueTable';
import SectionTitle from '../components/ui/SectionTitle';
import './Liga.css';

export default function Liga() {
  return (
    <div>
      <div className="section section--dark">
        <div className="container">
          <SectionTitle title="Clasificación" subtitle="Temporada 2026-27 · Regional Preferent Girona" light />
        </div>
      </div>
      <section className="section">
        <div className="container liga__inner">
          <LeagueTable />
          <div className="liga__legend">
            <div className="liga__legend-item">
              <span className="pos-badge pos-badge--top">1</span> Zona de ascenso
            </div>
            <div className="liga__legend-item">
              <span className="pos-badge pos-badge--us">4</span> Begur C.F. A
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
