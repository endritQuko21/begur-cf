import { useState } from 'react';
import { useNoticias } from '../hooks/useData';
import NoticiaModal from '../components/ui/NoticiaModal';
import './Noticias.css';

const CAT = {
  Partido:   { color: '#C8102E', emoji: '⚽' },
  Club:      { color: '#003087', emoji: '🔵' },
  Fichaje:   { color: '#1a8c1a', emoji: '✍️' },
  Comunidad: { color: '#b07800', emoji: '🤝' },
  Otro:      { color: '#666',    emoji: '📌' },
};

const fmt = (f, opts) => new Date(f).toLocaleDateString('es-ES', opts);
const fmtShort = f => fmt(f, { day: 'numeric', month: 'short' });
const fmtFull  = f => fmt(f, { day: 'numeric', month: 'long', year: 'numeric' });

/* ── Card grande (featured) ── */
function FeaturedCard({ n, onClick }) {
  const cat = CAT[n.categoria] || CAT.Otro;
  return (
    <article className="nf" onClick={onClick} style={{ '--cc': cat.color }}>
      <div className="nf__img">
        {n.imagen
          ? <img src={n.imagen} alt={n.titulo} />
          : <div className="nf__ph" />
        }
        <div className="nf__img-overlay" />
      </div>
      <div className="nf__body">
        <div className="nf__top">
          <span className="nf__cat">{cat.emoji} {n.categoria}</span>
          <span className="nf__fecha">{fmtFull(n.fecha)}</span>
        </div>
        <h2 className="nf__titulo">{n.titulo}</h2>
        <p className="nf__resumen">{n.resumen}</p>
        <span className="nf__cta">Leer noticia completa →</span>
      </div>
    </article>
  );
}

/* ── Card horizontal (secundaria) ── */
function HCard({ n, onClick }) {
  const cat = CAT[n.categoria] || CAT.Otro;
  return (
    <article className="nh" onClick={onClick} style={{ '--cc': cat.color }}>
      <div className="nh__img">
        {n.imagen ? <img src={n.imagen} alt={n.titulo} /> : <div className="nh__ph" />}
      </div>
      <div className="nh__body">
        <span className="nh__cat">{n.categoria}</span>
        <h3 className="nh__titulo">{n.titulo}</h3>
        <div className="nh__foot">
          <span className="nh__fecha">{fmtShort(n.fecha)}</span>
          <span className="nh__arrow">→</span>
        </div>
      </div>
    </article>
  );
}

/* ── Card pequeña (lista) ── */
function ListCard({ n, idx, onClick }) {
  const cat = CAT[n.categoria] || CAT.Otro;
  return (
    <article className="nl" onClick={onClick} style={{ '--cc': cat.color, '--ni': idx }}>
      <div className="nl__num">{String(idx + 1).padStart(2, '0')}</div>
      <div className="nl__img">
        {n.imagen ? <img src={n.imagen} alt={n.titulo} /> : <div className="nl__ph" />}
      </div>
      <div className="nl__body">
        <div className="nl__top">
          <span className="nl__cat">{n.categoria}</span>
          <span className="nl__fecha">{fmtShort(n.fecha)}</span>
        </div>
        <h3 className="nl__titulo">{n.titulo}</h3>
      </div>
      <span className="nl__arrow">›</span>
    </article>
  );
}

export default function Noticias() {
  const { noticias, loading } = useNoticias();
  const [selected, setSelected] = useState(null);
  const [filtro, setFiltro] = useState('Todas');

  console.log(noticias)

  const sorted = [...noticias].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const featured = sorted[0];
  const secondary = sorted.slice(1, 3);
  const rest = sorted.slice(3);

  const categorias = ['Todas', ...new Set(noticias.map(n => n.categoria).filter(Boolean))];
  const filtradas = filtro === 'Todas' ? rest : rest.filter(n => n.categoria === filtro);

  if (loading) return (
    <div className="np">
      <div className="np-loading">
        <div className="np-loading__dot" /><div className="np-loading__dot" /><div className="np-loading__dot" />
      </div>
    </div>
  );

  return (
    <div className="np">

      {/* ── HERO HEADER ── */}
      <header className="np-header">
        <div className="np-header__bg" />
        <img src="/escudo.png" alt="" className="np-header__wm" aria-hidden="true" />
        <div className="container np-header__inner">
          <div className="np-header__left">
            <span className="np-eyebrow">Actualitat · Begur C.F. A</span>
            <h1 className="np-header__title">Notícies</h1>
          </div>
          <div className="np-header__right">
            <div className="np-header__count">
              <span>{noticias.length}</span>
              <small>notícies publicades</small>
            </div>
          </div>
        </div>
      </header>

      {/* ── LAYOUT PRINCIPAL ── */}
      {sorted.length === 0 ? (
        <div className="container np-empty">
          <p>Encara no hi ha notícies. Torna aviat!</p>
        </div>
      ) : (
        <>
          {/* BLOQUE HERO: featured + 2 secundarias */}
          <section className="np-top">
            <div className="container np-top__grid">
              {featured && (
                <FeaturedCard n={featured} onClick={() => setSelected(featured)} />
              )}
              {secondary.length > 0 && (
                <div className="np-top__side">
                  {secondary.map(n => (
                    <HCard key={n._id} n={n} onClick={() => setSelected(n)} />
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* FILTROS + LISTA */}
          {rest.length > 0 && (
            <section className="np-rest">
              <div className="container">

                <div className="np-filters">
                  <span className="np-filters__label">Filtrar per:</span>
                  <div className="np-filters__pills">
                    {categorias.map(cat => {
                      const meta = CAT[cat];
                      return (
                        <button
                          key={cat}
                          className={`np-pill ${filtro === cat ? 'np-pill--on' : ''}`}
                          onClick={() => setFiltro(cat)}
                          style={filtro === cat && meta ? { borderColor: meta.color, color: meta.color } : {}}
                        >
                          {meta ? `${meta.emoji} ` : ''}{cat}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {filtradas.length === 0 ? (
                  <p className="np-empty">Cap notícia en aquesta categoria.</p>
                ) : (
                  <div className="np-list">
                    {filtradas.map((n, i) => (
                      <ListCard key={n._id} n={n} idx={i} onClick={() => setSelected(n)} />
                    ))}
                  </div>
                )}

              </div>
            </section>
          )}
        </>
      )}

      {selected && (
        <NoticiaModal noticia={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
