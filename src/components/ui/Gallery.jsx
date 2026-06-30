import { useState, useEffect } from 'react';
import { useFotos } from '../../hooks/useFotos';
import './Gallery.css';

function Lightbox({ fotos, startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIdx(i => (i - 1 + fotos.length) % fotos.length);
      if (e.key === 'ArrowRight') setIdx(i => (i + 1) % fotos.length);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [fotos.length, onClose]);

  if (!fotos[idx]) return null;

  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + fotos.length) % fotos.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % fotos.length); };

  return (
    <div className="gallery__lightbox" onClick={onClose}>
      <button className="gallery__lb-close" onClick={onClose}>✕</button>
      {fotos.length > 1 && <button className="gallery__lb-prev" onClick={prev}>‹</button>}
      <img src={fotos[idx].url} alt="" onClick={e => e.stopPropagation()} />
      {fotos.length > 1 && <button className="gallery__lb-next" onClick={next}>›</button>}
      <span className="gallery__lb-counter">{idx + 1} / {fotos.length}</span>
    </div>
  );
}

function GalleryModal({ partidoId, rival, onClose }) {
  const { fotos, loading, error } = useFotos(partidoId);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const [brokenImgs, setBrokenImgs] = useState({});

  const handleImgError = (id) => {
    setBrokenImgs(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="gallery__modal-backdrop" onClick={onClose}>
      <div className="gallery__modal" onClick={e => e.stopPropagation()}>
        <div className="gallery__modal-header">
          <div>
            <h3 className="gallery__modal-title">📷 Fotos del partido</h3>
            <p className="gallery__modal-sub">Begur C.F. A vs {rival}</p>
          </div>
          <button className="gallery__modal-close" onClick={onClose}>✕</button>
        </div>

        {loading && <p className="gallery__empty">Cargando fotos...</p>}

        {error && (
          <p className="gallery__empty gallery__empty--error">
            ⚠️ Error cargando fotos: {error}
          </p>
        )}

        {!loading && !error && fotos.length === 0 && (
          <p className="gallery__empty">Sin fotos todavía</p>
        )}

        {!loading && !error && fotos.length > 0 && (
          <div className="gallery__grid">
            {fotos.map((foto, i) => (
              <div key={foto._id} className="gallery__thumb" onClick={() => !brokenImgs[foto._id] && setLightboxIdx(i)}>
                {brokenImgs[foto._id] ? (
                  <div className="gallery__thumb-broken">⚠️ Error</div>
                ) : (
                  <>
                    <img
                      src={foto.url}
                      alt={`Foto ${i + 1}`}
                      loading="lazy"
                      onError={() => handleImgError(foto._id)}
                    />
                    <div className="gallery__thumb-overlay">🔍</div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox fotos={fotos} startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </div>
  );
}

export default function Gallery({ partidoId, rival }) {
  const { fotos, loading, error } = useFotos(partidoId);
  const [open, setOpen] = useState(false);

  // No mostrar el botón si está cargando, hay error, o no hay fotos
  if (loading || error || fotos.length === 0) return null;

  return (
    <>
      <button className="gallery__trigger" onClick={() => setOpen(true)}>
        <span className="gallery__trigger-icon">📷</span>
        Ver fotos <span className="gallery__trigger-count">{fotos.length}</span>
      </button>

      {open && (
        <GalleryModal partidoId={partidoId} rival={rival} onClose={() => setOpen(false)} />
      )}
    </>
  );
}
