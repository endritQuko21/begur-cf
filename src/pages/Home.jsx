import { Link } from 'react-router-dom';
import { partidos } from '../data/partidos';
import { noticias } from '../data/noticias';
import MatchCard from '../components/ui/MatchCard';
import NewsCard from '../components/ui/NewsCard';
import SectionTitle from '../components/ui/SectionTitle';
import Countdown from '../components/ui/Countdown';
import LeagueTable from '../components/ui/LeagueTable';
import './Home.css';

function HeroCard() {
  const hoy = new Date().toISOString().split('T')[0];
  const partidoHoy = partidos.find(p => p.fecha === hoy);
  const proximoPartido = partidos.find(p => p.tipo === 'proximo');
  const noticiaDestacada = noticias.find(n => n.destacada) || noticias[0];

  if (partidoHoy) {
    return (
      <div className="hero-card hero-card--live">
        <span className="hero-card__badge hero-card__badge--live">🔴 EN DIRECTO</span>
        <div className="hero-card__match">
          <span className="hero-card__team">Begur C.F. A</span>
          <span className="hero-card__score">{partidoHoy.resultado || '0 – 0'}</span>
          <span className="hero-card__team">{partidoHoy.rival}</span>
        </div>
        <Link to="/partidos" className="hero-card__link">Ver partido →</Link>
      </div>
    );
  }

  if (proximoPartido) {
    const fecha = new Date(proximoPartido.fecha).toLocaleDateString('es-ES', {
      weekday: 'long', day: 'numeric', month: 'long'
    });
    return (
      <div className="hero-card hero-card--next">
        <span className="hero-card__badge">Próximo partido</span>
        <div className="hero-card__match">
          <span className="hero-card__team">Begur C.F. A</span>
          <span className="hero-card__vs">VS</span>
          <span className="hero-card__team">{proximoPartido.rival}</span>
        </div>
        <div className="hero-card__meta">
          <span>📅 {fecha}</span>
          <span>🕐 {proximoPartido.hora}</span>
          <span>{proximoPartido.lugar === 'Casa' ? '🏠 Local' : '✈️ Fuera'}</span>
        </div>
        <Link to="/partidos" className="hero-card__link">Ver todos los partidos →</Link>
      </div>
    );
  }

  return (
    <div className="hero-card hero-card--news">
      <span className="hero-card__badge">Destacado</span>
      <div className="hero-card__news-img" />
      <h3 className="hero-card__news-title">{noticiaDestacada.titulo}</h3>
      <p className="hero-card__news-text">{noticiaDestacada.resumen}</p>
      <Link to="/noticias" className="hero-card__link">Leer más →</Link>
    </div>
  );
}

export default function Home() {
  const proximos = partidos.filter(p => p.tipo === 'proximo').slice(0, 2);
  const proximoConFecha = partidos.find(p => p.tipo === 'proximo');
  const ultimasNoticias = noticias.slice(0, 3);

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <div className="hero__left">
            <span className="hero__eyebrow">Temporada 2026 – 27</span>
            <h1 className="hero__title">BEGUR<br />C.F. A</h1>
            <p className="hero__sub">Club de Futbol · Baix Empordà · Girona</p>
            <div className="hero__actions">
              <Link to="/plantilla" className="btn btn--primary">Ver Plantilla</Link>
              <Link to="/partidos" className="btn btn--outline">Próximos partidos</Link>
            </div>
          </div>
          <div className="hero__right">
            <HeroCard />
          </div>
        </div>
        <div className="hero__diagonal" />
      </section>

      {/* COUNTDOWN */}
      {proximoConFecha && <Countdown partido={proximoConFecha} />}

      {/* CLASIFICACIÓN */}
      <section className="section section--gray">
        <div className="container">
          <SectionTitle title="Clasificación" subtitle="Regional Preferent Girona" />
          <LeagueTable maxRows={5} />
          <Link to="/liga" className="btn btn--primary home__link" style={{ marginTop: '20px' }}>
            Ver clasificación completa →
          </Link>
        </div>
      </section>

      {/* PRÓXIMOS PARTIDOS */}
      <section className="section">
        <div className="container">
          <SectionTitle title="Próximos Partidos" subtitle="Temporada regular 2026-27" />
          <div className="home__matches">
            {proximos.map(p => <MatchCard key={p.id} partido={p} />)}
          </div>
          <Link to="/partidos" className="btn btn--primary home__link">Ver todos los partidos →</Link>
        </div>
      </section>

      {/* STATS BAND */}
      <section className="section section--red stats-band">
        <div className="container stats-band__grid">
          <div className="stat"><span className="stat__num">23</span><span className="stat__label">Jugadores</span></div>
          <div className="stat"><span className="stat__num">0</span><span className="stat__label">Partidos jugados</span></div>
          <div className="stat"><span className="stat__num">0</span><span className="stat__label">Victorias</span></div>
          <div className="stat"><span className="stat__num">26/27</span><span className="stat__label">Temporada</span></div>
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
