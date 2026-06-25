import { usePartidos } from '../hooks/useData';
import MatchCard from '../components/ui/MatchCard';
import SectionTitle from '../components/ui/SectionTitle';
import './Partidos.css';

export default function Partidos() {
  const { partidos } = usePartidos();
  const jugados = partidos.filter(p => p.tipo === 'jugado');
  const proximos = partidos.filter(p => p.tipo === 'proximo');
  return (
    <div>
      <div className="section section--dark">
        <div className="container">
          <SectionTitle title="Partidos" subtitle="Temporada 2026-27" light />
        </div>
      </div>
      <section className="section">
        <div className="container partidos__cols">
          <div>
            <SectionTitle title="Próximos" />
            <div className="partidos__list">
              {proximos.map(p => <MatchCard key={p.id} partido={p} />)}
            </div>
          </div>
          <div>
            <SectionTitle title="Resultados" />
            <div className="partidos__list">
              {jugados.map(p => <MatchCard key={p.id} partido={p} />)}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
