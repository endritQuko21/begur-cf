import { useState } from 'react';
import { useNoticias } from '../../hooks/useData';
import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import './AdminPage.css';

const FIELDS = [
  { key: 'titulo', label: 'Título' },
  { key: 'resumen', label: 'Resumen', type: 'textarea' },
  { key: 'categoria', label: 'Categoría', type: 'select', options: [
    { value: 'Partido', label: 'Partido' },
    { value: 'Club', label: 'Club' },
    { value: 'Fichaje', label: 'Fichaje' },
    { value: 'Comunidad', label: 'Comunidad' },
    { value: 'Otro', label: 'Otro' },
  ]},
  { key: 'fecha', label: 'Fecha', type: 'date' },
  { key: 'imagen', label: 'URL imagen (opcional)' },
];

const COLS = [
  { key: 'titulo', label: 'Título' },
  { key: 'categoria', label: 'Categoría' },
  { key: 'fecha', label: 'Fecha' },
];

const empty = { titulo: '', resumen: '', categoria: 'Club', fecha: new Date().toISOString().split('T')[0], imagen: '' };

export default function AdminNoticias() {
  const { noticias, add, update, remove } = useNoticias();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); };
  const openEdit = (n) => { setEditing(n.id); setForm({ ...n }); };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSubmit = () => {
    editing ? update(editing, form) : add(form);
    setForm(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Noticias</h1>
          <p className="admin-page__sub">{noticias.length} noticias publicadas</p>
        </div>
        <button className="admin-btn admin-btn--edit" onClick={openAdd}>+ Nueva noticia</button>
      </div>
      <AdminTable cols={COLS} rows={noticias} onEdit={openEdit} onDelete={remove} />
      {form && (
        <AdminForm
          fields={FIELDS} values={form} onChange={handleChange}
          onSubmit={handleSubmit} onCancel={() => setForm(null)}
          submitLabel={editing ? 'Guardar cambios' : 'Publicar noticia'}
        />
      )}
    </div>
  );
}
