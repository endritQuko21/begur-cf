import { Link } from 'react-router-dom';
import { partidos } from '../data/partidos';
import { noticias } from '../data/noticias';
import MatchCard from '../components/ui/MatchCard';
import NewsCard from '../components/ui/NewsCard';
import SectionTitle from '../components/ui/SectionTitle';
import './Home.css';

export default function Home() {
  const proximos = partidos.filter(p => p.tipo === 'proximo').slice(0, 2);
  const ultimasNoticias = noticias.slice(0, 3);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="hero__eyebrow">Temporada 2024 – 25</span>
          <h1 className="hero__title">BEGUR<br />C.F. A</h1>
          <p className="hero__sub">Club de Futbol · Baix Empordà · Girona</p>
          <div className="hero__actions">
            <Link to="/plantilla" className="btn btn--primary">Ver Plantilla</Link>
            <Link to="/partidos" className="btn btn--outline">Próximos partidos</Link>
          </div>
        </div>
        <div className="hero__diagonal" />
      </section>

      {/* PRÓXIMOS PARTIDOS */}
      <section className="section">
        <div className="container">
          <SectionTitle title="Próximos Partidos" subtitle="Temporada regular 2024-25" />
          <div className="home__matches">
            {proximos.map(p => <MatchCard key={p.id} partido={p} />)}
          </div>
          <Link to="/partidos" className="btn btn--primary home__link">Ver todos los partidos →</Link>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section section--red stats-band">
        <div className="container stats-band__grid">
          <div className="stat"><span className="stat__num">6</span><span className="stat__label">Jugadores</span></div>
          <div className="stat"><span className="stat__num">14</span><span className="stat__label">Partidos</span></div>
          <div className="stat"><span className="stat__num">3</span><span className="stat__label">Victorias</span></div>
          <div className="stat"><span className="stat__num">2024</span><span className="stat__label">Temporada</span></div>
        </div>
      </section>

      {/* NOTICIAS */}
      <section className="section section--gray">
        <div className="container">
          <SectionTitle title="Últimas Noticias" />
          <div className="home__news">
            {ultimasNoticias.map(n => <NewsCard key={n.id} noticia={n} />)}
          </div>
          <Link to="/noticias" className="btn btn--primary home__link">Ver todas las noticias →</Link>
        </div>
      </section>
    </div>
  );
}
