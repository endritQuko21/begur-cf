import { useEffect } from 'react';
import './NoticiaModal.css';

const CATEGORIA_COLOR = {
  Partido: '#C8102E',
  Club: '#003087',
  Fichaje: '#1a5c1a',
  Comunidad: '#b07800',
  Otro: '#555',
};

export default function NoticiaModal({ noticia, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const color = CATEGORIA_COLOR[noticia.categoria] || '#555';
  const fecha = new Date(noticia.fecha).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });

  // Si en el futuro añades un campo "contenido" largo, aquí se mostraría completo.
  // Por ahora usamos el resumen expandido como cuerpo del artículo.
  const cuerpo = noticia.contenido || noticia.resumen;

  return (
    <div className="nmodal-backdrop" onClick={onClose}>
      <article className="nmodal" onClick={e => e.stopPropagation()}>

        {/* IMAGEN HEADER */}
        <div className="nmodal__hero">
          {noticia.imagen
            ? <img src={noticia.imagen} alt={noticia.titulo} />
            : <div className="nmodal__hero-placeholder" style={{ background: `linear-gradient(135deg, ${color}, #161616)` }} />
          }
          <div className="nmodal__hero-gradient" />
          <button className="nmodal__close" onClick={onClose}>✕</button>
          <span className="nmodal__cat" style={{ background: color }}>{noticia.categoria}</span>
        </div>

        {/* CONTENIDO */}
        <div className="nmodal__body">
          <span className="nmodal__fecha">{fecha}</span>
          <h1 className="nmodal__titulo">{noticia.titulo}</h1>

          <div className="nmodal__divider" />

          <p className="nmodal__lead">{noticia.resumen}</p>

          {noticia.contenido && (
            <div className="nmodal__content">
              {noticia.contenido.split('\n').filter(Boolean).map((parrafo, i) => (
                <p key={i}>{parrafo}</p>
              ))}
            </div>
          )}

          <div className="nmodal__footer">
            <span className="nmodal__footer-brand">⚽ Begur C.F. A</span>
            <button className="nmodal__share" onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
            }}>
              🔗 Copiar enlace
            </button>
          </div>
        </div>

      </article>
    </div>
  );
}
