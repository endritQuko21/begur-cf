import { useState } from 'react';
import { useFotos } from '../../hooks/useFotos';
import './Gallery.css';

export default function Gallery({ partidoId }) {
  const { fotos, loading } = useFotos(partidoId);
  const [selected, setSelected] = useState(null);

  if (loading || fotos.length === 0) return null;

  const idx = fotos.findIndex(f => f._id === selected?._id);

  return (
    <div className="gallery">
      <p className="gallery__label">📷 {fotos.length} foto{fotos.length !== 1 ? 's' : ''}</p>
      <div className="gallery__grid">
        {fotos.slice(0, 6).map((foto, i) => (
          <div key={foto._id} className="gallery__thumb" onClick={() => setSelected(foto)}>
            <img src={foto.url} alt={`Foto ${i + 1}`} />
            {i === 5 && fotos.length > 6 && (
              <div className="gallery__more">+{fotos.length - 6}</div>
            )}
          </div>
        ))}
      </div>

      {selected && (
        <div className="gallery__lightbox" onClick={() => setSelected(null)}>
          <button className="gallery__lb-close" onClick={() => setSelected(null)}>✕</button>
          <button className="gallery__lb-prev" onClick={e => { e.stopPropagation(); setSelected(fotos[idx - 1] || fotos[fotos.length - 1]); }}>‹</button>
          <img src={selected.url} alt="" onClick={e => e.stopPropagation()} />
          <button className="gallery__lb-next" onClick={e => { e.stopPropagation(); setSelected(fotos[idx + 1] || fotos[0]); }}>›</button>
          <span className="gallery__lb-counter">{idx + 1} / {fotos.length}</span>
        </div>
      )}
    </div>
  );
}
