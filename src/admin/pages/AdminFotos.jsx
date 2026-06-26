import { useRef } from 'react';
import { useFotos } from '../../hooks/useFotos';
import './AdminPage.css';
import './AdminFotos.css';

export default function AdminFotos({ partido, onClose }) {
  const { fotos, loading, uploading, progress, upload, remove } = useFotos(partido._id);
  const inputRef = useRef();

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) await upload(file);
    inputRef.current.value = '';
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    for (const file of files) await upload(file);
  };

  return (
    <div className="admin-fotos-overlay" onClick={onClose}>
      <div className="admin-fotos" onClick={e => e.stopPropagation()}>
        <div className="admin-fotos__header">
          <div>
            <h2 className="admin-page__title">Fotos del partido</h2>
            <p className="admin-page__sub">Begur C.F. A vs {partido.rival} · {partido.fecha}</p>
          </div>
          <button className="admin-fotos__close" onClick={onClose}>✕</button>
        </div>

        {/* Drop zone */}
        <div
          className="admin-fotos__dropzone"
          onDragOver={e => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
        >
          <input ref={inputRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />
          {uploading ? (
            <div className="admin-fotos__progress">
              <div className="admin-fotos__progress-bar" style={{ width: `${progress}%` }} />
              <span>Subiendo... {progress}%</span>
            </div>
          ) : (
            <>
              <span className="admin-fotos__dropicon">📷</span>
              <span>Arrastra fotos aquí o <strong>click para seleccionar</strong></span>
              <span className="admin-fotos__hint">Puedes subir varias a la vez</span>
            </>
          )}
        </div>

        {/* Grid de fotos */}
        {loading ? (
          <p style={{ color: 'var(--color-gray-text)', textAlign: 'center' }}>Cargando...</p>
        ) : fotos.length === 0 ? (
          <p style={{ color: 'var(--color-gray-text)', textAlign: 'center' }}>Sin fotos todavía</p>
        ) : (
          <div className="admin-fotos__grid">
            {fotos.map(foto => (
              <div key={foto._id} className="admin-fotos__item">
                <img src={foto.url} alt="" />
                <button className="admin-fotos__delete" onClick={() => remove(foto)}>✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
