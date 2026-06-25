import { useState } from 'react';
import { useClasificacion } from '../../hooks/useData';
import AdminForm from '../components/AdminForm';
import './AdminPage.css';
import './AdminClasificacion.css';

const FIELDS = [
  { key: 'equipo', label: 'Nombre del equipo' },
  { key: 'pj', label: 'Partidos jugados', type: 'number' },
  { key: 'g', label: 'Ganados', type: 'number' },
  { key: 'e', label: 'Empatados', type: 'number' },
  { key: 'p', label: 'Perdidos', type: 'number' },
  { key: 'gf', label: 'Goles a favor', type: 'number' },
  { key: 'gc', label: 'Goles en contra', type: 'number' },
  { key: 'pts', label: 'Puntos', type: 'number' },
];

export default function AdminClasificacion() {
  const { clasificacion, update } = useClasificacion();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);

  const openEdit = (row) => { setEditing(row.pos); setForm({ ...row }); };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const handleSubmit = () => {
    const data = { ...form, pj: +form.pj, g: +form.g, e: +form.e, p: +form.p, gf: +form.gf, gc: +form.gc, pts: +form.pts };
    update(editing, data);
    setForm(null);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Clasificación</h1>
          <p className="admin-page__sub">Actualiza los datos de cada equipo</p>
        </div>
      </div>
      <div className="admin-clas-table-wrap">
        <table className="admin-clas-table">
          <thead>
            <tr><th>#</th><th>Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>Pts</th><th></th></tr>
          </thead>
          <tbody>
            {clasificacion.map(row => (
              <tr key={row.pos} className={row.esNosotros ? 'admin-clas-table__us' : ''}>
                <td>{row.pos}</td>
                <td>{row.equipo}{row.esNosotros ? ' ⚽' : ''}</td>
                <td>{row.pj}</td><td>{row.g}</td><td>{row.e}</td><td>{row.p}</td>
                <td>{row.gf}</td><td>{row.gc}</td>
                <td><strong>{row.pts}</strong></td>
                <td><button className="admin-btn admin-btn--edit" onClick={() => openEdit(row)}>Editar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {form && (
        <AdminForm
          fields={FIELDS} values={form} onChange={handleChange}
          onSubmit={handleSubmit} onCancel={() => setForm(null)}
          submitLabel="Guardar datos"
        />
      )}
    </div>
  );
}
