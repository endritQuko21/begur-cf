import { useNoticias } from '../hooks/useData';
import NewsCard from '../components/ui/NewsCard';
import SectionTitle from '../components/ui/SectionTitle';
import './Noticias.css';

export default function Noticias() {
  const { noticias } = useNoticias();

  return (
    <div>
      <div className="section section--dark">
        <div className="container">
          <SectionTitle title="Noticias" subtitle="Últimas novedades del club" light />
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="noticias__grid">
            {noticias.map(n => <NewsCard key={n.id} noticia={n} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
