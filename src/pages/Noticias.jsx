import { useState } from 'react';
import { useNoticias } from '../hooks/useData';
import NoticiaModal from '../components/ui/NoticiaModal';
import './Noticias.css';

const CATEGORIA_COLOR = {
  Partido: '#C8102E',
  Club: '#003087',
  Fichaje: '#1a5c1a',
  Comunidad: '#b07800',
  Otro: '#555',
};

function formatFecha(fecha) {
  return new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function Noticias() {
  const { noticias, loading } = useNoticias();
  const [selected, setSelected] = useState(null);
  const [filtro, setFiltro] = useState('Todas');

  const sorted = [...noticias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const destacada = sorted[0];
  const resto = sorted.slice(1);

  const categorias = ['Todas', ...new Set(noticias.map(n => n.categoria))];
  const filtradas = filtro === 'Todas' ? resto : resto.filter(n => n.categoria === filtro);

  return (
    <div className="noticias-page">

      {/* HERO */}
      <div className="noticias-hero">
        <img src="/escudo.png" alt="" className="noticias-hero__escudo" aria-hidden="true" />
        <div className="container">
          <span className="noticias-hero__eyebrow">Actualidad</span>
          <h1 className="noticias-hero__title">Noticias</h1>
          <p className="noticias-hero__sub">Todo lo que pasa en el Begur C.F. A</p>
        </div>
      </div>

      {loading && <p className="noticias-empty">Cargando noticias...</p>}

      {/* NOTICIA DESTACADA */}
      {!loading && destacada && (
        <section className="noticias-featured-wrap">
          <div className="container">
            <div
              className="noticias-featured"
              onClick={() => setSelected(destacada)}
              style={{ '--cat-color': CATEGORIA_COLOR[destacada.categoria] || '#555' }}
            >
              <div className="noticias-featured__img">
                {destacada.imagen
                  ? <img src={destacada.imagen} alt={destacada.titulo} />
                  : <div className="noticias-featured__placeholder" />
                }
                <div className="noticias-featured__gradient" />
              </div>
              <div className="noticias-featured__content">
                <span className="noticias-featured__badge">⭐ Destacada</span>
                <span className="noticias-featured__cat">{destacada.categoria}</span>
                <h2 className="noticias-featured__title">{destacada.titulo}</h2>
                <p className="noticias-featured__resumen">{destacada.resumen}</p>
                <div className="noticias-featured__footer">
                  <span className="noticias-featured__fecha">{formatFecha(destacada.fecha)}</span>
                  <span className="noticias-featured__cta">Leer noticia →</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FILTROS */}
      {!loading && resto.length > 0 && (
        <div className="noticias-filters">
          <div className="container noticias-filters__inner">
            {categorias.map(cat => (
              <button
                key={cat}
                className={`noticias-filter ${filtro === cat ? 'noticias-filter--active' : ''}`}
                onClick={() => setFiltro(cat)}
                style={filtro === cat && CATEGORIA_COLOR[cat] ? { borderColor: CATEGORIA_COLOR[cat], color: CATEGORIA_COLOR[cat] } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* GRID */}
      <section className="noticias-grid-wrap">
        <div className="container">
          <div className="noticias-grid">
            {filtradas.map(n => {
              const color = CATEGORIA_COLOR[n.categoria] || '#555';
              return (
                <div
                  key={n._id}
                  className="ncard"
                  onClick={() => setSelected(n)}
                  style={{ '--ncard-color': color }}
                >
                  <div className="ncard__img">
                    {n.imagen
                      ? <img src={n.imagen} alt={n.titulo} />
                      : <div className="ncard__placeholder" />
                    }
                    <span className="ncard__cat">{n.categoria}</span>
                  </div>
                  <div className="ncard__body">
                    <span className="ncard__fecha">{formatFecha(n.fecha)}</span>
                    <h3 className="ncard__titulo">{n.titulo}</h3>
                    <p className="ncard__resumen">{n.resumen}</p>
                    <span className="ncard__cta">Leer más <span className="ncard__arrow">→</span></span>
                  </div>
                </div>
              );
            })}
          </div>
          {!loading && filtradas.length === 0 && (
            <p className="noticias-empty">No hay noticias en esta categoría.</p>
          )}
        </div>
      </section>

      {selected && (
        <NoticiaModal noticia={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
