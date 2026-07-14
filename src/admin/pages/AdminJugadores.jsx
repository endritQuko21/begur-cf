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
  { key: 'posicionesStr', label: 'Posiciones (separadas por coma: GK, CB, LB...)', placeholder: 'ej: CB, LB' },
  { key: 'edad', label: 'Edad', type: 'number' },
  { key: 'nacionalidad', label: 'Nacionalidad' },
  { key: 'descripcion', label: 'Descripción', type: 'textarea' },
  { key: 'stats_partidos',     label: '📊 Partidos jugados', type: 'number' },
  { key: 'stats_goles',        label: '⚽ Goles', type: 'number' },
  { key: 'stats_asistencias',  label: '🎯 Asistencias', type: 'number' },
  { key: 'stats_tarjetasA',    label: '🟨 Tarjetas amarillas', type: 'number' },
  { key: 'stats_tarjetasR',    label: '🟥 Tarjetas rojas', type: 'number' },
  { key: 'stats_porteriaCero', label: '🧤 Porterías a cero (porteros)', type: 'number' },
];

const COLS = [
  { key: 'dorsal', label: '#' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'posicion', label: 'Posición' },
  { key: 'edad', label: 'Edad' },
];

const empty = {
  nombre: '', dorsal: '', posicion: 'Portero', posicionesStr: '',
  edad: '', nacionalidad: 'España', descripcion: '',
  stats_partidos: 0, stats_goles: 0, stats_asistencias: 0,
  stats_tarjetasA: 0, stats_tarjetasR: 0, stats_porteriaCero: 0,
};

export default function AdminJugadores() {
  const { jugadores, add, update, remove } = useJugadores();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);

  const openAdd = () => { setEditing(null); setForm({ ...empty }); };

  const openEdit = (j) => {
    setEditing(j._id);
    setForm({
      ...j,
      posicionesStr: (j.posiciones || []).join(', '),
      stats_partidos:     j.stats?.partidos     ?? 0,
      stats_goles:        j.stats?.goles        ?? 0,
      stats_asistencias:  j.stats?.asistencias  ?? 0,
      stats_tarjetasA:    j.stats?.tarjetasA    ?? 0,
      stats_tarjetasR:    j.stats?.tarjetasR    ?? 0,
      stats_porteriaCero: j.stats?.porteriaCero ?? 0,
    });
  };

  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    const data = {
      ...form,
      posiciones: form.posicionesStr.split(',').map(s => s.trim()).filter(Boolean),
      dorsal: Number(form.dorsal),
      edad: Number(form.edad),
      stats: {
        partidos:     Number(form.stats_partidos)     || 0,
        goles:        Number(form.stats_goles)        || 0,
        asistencias:  Number(form.stats_asistencias)  || 0,
        tarjetasA:    Number(form.stats_tarjetasA)    || 0,
        tarjetasR:    Number(form.stats_tarjetasR)    || 0,
        porteriaCero: Number(form.stats_porteriaCero) || 0,
      },
    };
    // Limpiar claves planas
    delete data.stats_partidos;
    delete data.stats_goles;
    delete data.stats_asistencias;
    delete data.stats_tarjetasA;
    delete data.stats_tarjetasR;
    delete data.stats_porteriaCero;

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