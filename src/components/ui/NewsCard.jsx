import './NewsCard.css';

export default function NewsCard({ noticia }) {
  const fecha = new Date(noticia.fecha).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
  return (
    <div className="news-card">
      <div className="news-card__img">
        {noticia.imagen
          ? <img src={noticia.imagen} alt={noticia.titulo} />
          : <div className="news-card__img-placeholder" />
        }
        <span className="news-card__cat">{noticia.categoria}</span>
      </div>
      <div className="news-card__body">
        <span className="news-card__fecha">{fecha}</span>
        <h3 className="news-card__titulo">{noticia.titulo}</h3>
        <p className="news-card__resumen">{noticia.resumen}</p>
        <button className="news-card__btn">Leer más →</button>
      </div>
    </div>
  );
}
