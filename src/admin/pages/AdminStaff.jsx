import { useState } from 'react';
import { useStaff } from '../../hooks/useData';
import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import './AdminPage.css';

const FIELDS = [
  { key: 'nombre', label: 'Nombre completo' },
  { key: 'rol', label: 'Rol', type: 'textarea' },
];

const COLS = [
  { key: 'nombre', label: '#' },
  { key: 'rol', label: 'Nombre' },
];

const empty = { nombre: '', rol: '' };

export default function AdminStaff() {
  const { staff, add, update, remove } = useStaff();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); };
  const openEdit = (s) => {
    setEditing(s._id);
  };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSubmit = () => {
    const data = { ...form };
    editing ? update(editing, data) : add(data);
    setForm(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Staff</h1>
          <p className="admin-page__sub">{staff.length} staff en plantilla</p>
        </div>
        <button className="admin-btn admin-btn--edit" onClick={openAdd}>+ Añadir staff</button>
      </div>
      <AdminTable cols={COLS} rows={staff} onEdit={openEdit} onDelete={remove} />
      {form && (
        <AdminForm
          fields={FIELDS} values={form} onChange={handleChange}
          onSubmit={handleSubmit} onCancel={() => setForm(null)}
          submitLabel={editing ? 'Guardar cambios' : 'Añadir staff'}
        />
      )}
    </div>
  );
}
