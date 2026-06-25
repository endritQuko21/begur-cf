import { useState } from 'react';
import { usePartidos } from '../../hooks/useData';
import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import './AdminPage.css';

const FIELDS = [
  { key: 'rival', label: 'Equipo rival' },
  { key: 'fecha', label: 'Fecha', type: 'date' },
  { key: 'hora', label: 'Hora (ej: 17:00)' },
  { key: 'lugar', label: 'Lugar', type: 'select', options: [
    { value: 'Casa', label: 'Casa (Local)' },
    { value: 'Fuera', label: 'Fuera (Visitante)' },
  ]},
  { key: 'tipo', label: 'Estado', type: 'select', options: [
    { value: 'proximo', label: 'Próximo' },
    { value: 'jugado', label: 'Jugado' },
  ]},
  { key: 'resultado', label: 'Resultado (ej: 2-1, dejar vacío si no jugado)' },
];

const COLS = [
  { key: 'rival', label: 'Rival' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'hora', label: 'Hora' },
  { key: 'lugar', label: 'Lugar' },
  { key: 'tipo', label: 'Estado', render: r => r.tipo === 'proximo' ? '🟡 Próximo' : '✅ Jugado' },
  { key: 'resultado', label: 'Resultado', render: r => r.resultado || '—' },
];

const empty = { rival: '', fecha: '', hora: '17:00', lugar: 'Casa', tipo: 'proximo', resultado: '' };

export default function AdminPartidos() {
  const { partidos, add, update, remove } = usePartidos();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); };
  const openEdit = (p) => { setEditing(p._id); setForm({ ...p }); };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSubmit = () => {
    editing ? update(editing, form) : add(form);
    setForm(null);
  };

  const sorted = [...partidos].sort((a, b) => new Date(a.fecha) - new Date(b.fecha));

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Partidos</h1>
          <p className="admin-page__sub">{partidos.length} partidos en temporada</p>
        </div>
        <button className="admin-btn admin-btn--edit" onClick={openAdd}>+ Añadir partido</button>
      </div>
      <AdminTable cols={COLS} rows={sorted} onEdit={openEdit} onDelete={remove} />
      {form && (
        <AdminForm
          fields={FIELDS} values={form} onChange={handleChange}
          onSubmit={handleSubmit} onCancel={() => setForm(null)}
          submitLabel={editing ? 'Guardar cambios' : 'Añadir partido'}
        />
      )}
    </div>
  );
}
