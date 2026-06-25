import { jugadores, staff } from '../data/jugadores';
import PlayerCard from '../components/ui/PlayerCard';
import SectionTitle from '../components/ui/SectionTitle';
import './Plantilla.css';

export default function Plantilla() {
  return (
    <div className="plantilla">
      <div className="plantilla__hero section--dark section">
        <div className="container">
          <SectionTitle title="Plantilla 2024-25" subtitle="Primera equipación A" light />
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle title="Jugadores" />
          <div className="plantilla__grid">
            {jugadores.map(j => <PlayerCard key={j.id} jugador={j} />)}
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container">
          <SectionTitle title="Cuerpo Técnico" />
          <div className="plantilla__staff">
            {staff.map(s => (
              <div key={s.id} className="staff-card">
                <div className="staff-card__avatar">👤</div>
                <span className="staff-card__nombre">{s.nombre}</span>
                <span className="staff-card__rol">{s.rol}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
