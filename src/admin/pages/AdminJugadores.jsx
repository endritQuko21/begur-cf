import { useState } from 'react';
import { useJugadores } from '../../hooks/useData';
import AdminTable from '../components/AdminTable';
import AdminForm from '../components/AdminForm';
import './AdminPage.css';

const FIELDS = [
  { key: 'nombre', label: 'Nombre completo' },
  { key: 'dorsal', label: 'Dorsal', type: 'number' },
  { key: 'posicion', label: 'Posición principal', type: 'select', options: [
    { value: 'Portero', label: 'Portero' },
    { value: 'Defensa', label: 'Defensa' },
    { value: 'Centrocampista', label: 'Centrocampista' },
    { value: 'Delantero', label: 'Delantero' },
  ]},
  { key: 'posicionesStr', label: 'Posiciones (separadas por coma: DFC, MC, DC...)', placeholder: 'ej: CB, LB' },
  { key: 'edad', label: 'Edad', type: 'number' },
  { key: 'nacionalidad', label: 'Nacionalidad' },
  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
];

const COLS = [
  { key: 'dorsal', label: '#' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'posicion', label: 'Posición' },
  { key: 'edad', label: 'Edad' },
];

const empty = { nombre: '', dorsal: '', posicion: 'Portero', posicionesStr: '', edad: '', nacionalidad: 'España', descripcion: '' };

export default function AdminJugadores() {
  const { jugadores, add, update, remove } = useJugadores();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); };
  const openEdit = (j) => {
    setEditing(j._id);
    setForm({ ...j, posicionesStr: (j.posiciones || []).join(', ') });
  };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSubmit = () => {
    const data = { ...form, posiciones: form.posicionesStr.split(',').map(s => s.trim()).filter(Boolean), dorsal: Number(form.dorsal), edad: Number(form.edad) };
    editing ? update(editing, data) : add(data);
    setForm(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Jugadores</h1>
          <p className="admin-page__sub">{jugadores.length} jugadores en plantilla</p>
        </div>
        <button className="admin-btn admin-btn--edit" onClick={openAdd}>+ Añadir jugador</button>
      </div>
      <AdminTable cols={COLS} rows={jugadores} onEdit={openEdit} onDelete={remove} />
      {form && (
        <AdminForm
          fields={FIELDS} values={form} onChange={handleChange}
          onSubmit={handleSubmit} onCancel={() => setForm(null)}
          submitLabel={editing ? 'Guardar cambios' : 'Añadir jugador'}
        />
      )}
    </div>
  );
}
