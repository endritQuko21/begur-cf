import { useState } from 'react';
import { useClasificacion } from '../../hooks/useData';
import { usePartidos } from '../../hooks/useData';
import AdminForm from '../components/AdminForm';
import './AdminPage.css';
import './AdminClasificacion.css';

const FIELDS = [
  { key: 'equipo', label: 'Nombre del equipo' },
  { key: 'pj', label: 'Partidos jugados', type: 'number' },
  { key: 'g',  label: 'Ganados', type: 'number' },
  { key: 'e',  label: 'Empatados', type: 'number' },
  { key: 'p',  label: 'Perdidos', type: 'number' },
  { key: 'gf', label: 'Goles a favor', type: 'number' },
  { key: 'gc', label: 'Goles en contra', type: 'number' },
  { key: 'pts', label: 'Puntos', type: 'number' },
];

const emptyEquipo = { equipo: '', pj: 0, g: 0, e: 0, p: 0, gf: 0, gc: 0, pts: 0 };

export default function AdminClasificacion() {
  const { clasificacion, add, update, remove } = useClasificacion();
  const { partidos, add: addPartido, remove: removePartido } = usePartidos();
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [generating, setGenerating] = useState(false);

  const openAdd = () => { setEditing(null); setForm({ ...emptyEquipo }); };
  const openEdit = (row) => { setEditing(row._id); setForm({ ...row }); };
  const handleChange = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (editing) {
      await update(editing, form);
    } else {
      await add(form);
    }
    setForm(null);
    setEditing(null);
  };

  // Generar partidos automáticamente contra todos los rivales
  const generarPartidos = async () => {
    setGenerating(true);

    // Rivales = todos los equipos que NO son Begur
    const rivales = clasificacion.filter(c => !c.esNosotros);

    // Partidos existentes generados automáticamente
    const partidosAuto = partidos.filter(p => p.generado);

    // Borrar los partidos auto anteriores
    for (const p of partidosAuto) {
      await removePartido(p._id);
    }

    // Crear nuevos — casa y fuera contra cada rival
    for (const rival of rivales) {
      await addPartido({
        rival: rival.equipo,
        fecha: '2025-01-01',
        hora: '17:00',
        lugar: 'Casa',
        tipo: 'proximo',
        resultado: null,
        generado: true,
      });
      await addPartido({
        rival: rival.equipo,
        fecha: '2025-01-01',
        hora: '17:00',
        lugar: 'Fuera',
        tipo: 'proximo',
        resultado: null,
        generado: true,
      });
    }

    setGenerating(false);
    setConfirm(null);
  };

  const handleDelete = async (id) => {
    await remove(id);
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <h1 className="admin-page__title">Clasificación</h1>
          <p className="admin-page__sub">{clasificacion.length} equipos · ordenados por puntos</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="admin-btn admin-btn--edit" onClick={openAdd}>
            + Añadir equipo
          </button>
          <button
            className="admin-btn"
            style={{ background: '#6c47ff', color: 'white' }}
            onClick={() => setConfirm(true)}
          >
            ⚽ Generar partidos
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="admin-clas-table-wrap">
        <table className="admin-clas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Equipo</th>
              <th>PJ</th>
              <th>G</th>
              <th>E</th>
              <th>P</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
              <th>Pts</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clasificacion.map(row => (
              <tr key={row._id} className={row.esNosotros ? 'admin-clas-table__us' : ''}>
                <td>{row.pos}</td>
                <td>{row.equipo}{row.esNosotros ? ' ⚽' : ''}</td>
                <td>{row.pj}</td>
                <td>{row.g}</td>
                <td>{row.e}</td>
                <td>{row.p}</td>
                <td>{row.gf}</td>
                <td>{row.gc}</td>
                <td>{(row.gf - row.gc) > 0 ? '+' : ''}{row.gf - row.gc}</td>
                <td><strong>{row.pts}</strong></td>
                <td style={{ display: 'flex', gap: '6px' }}>
                  <button className="admin-btn admin-btn--edit" onClick={() => openEdit(row)}>
                    Editar
                  </button>
                  {!row.esNosotros && (
                    <button className="admin-btn admin-btn--delete" onClick={() => handleDelete(row._id)}>
                      Eliminar
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {clasificacion.length === 0 && (
              <tr>
                <td colSpan={11} style={{ textAlign: 'center', color: 'var(--color-gray-text)', padding: '24px' }}>
                  Sin equipos. Añade el primero.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* FORM */}
      {form && (
        <AdminForm
          fields={FIELDS}
          values={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => { setForm(null); setEditing(null); }}
          submitLabel={editing ? 'Guardar cambios' : 'Añadir equipo'}
        />
      )}

      {/* CONFIRM GENERAR PARTIDOS */}
      {confirm && (
        <div className="admin-confirm-backdrop" onClick={() => setConfirm(null)}>
          <div className="admin-confirm" onClick={e => e.stopPropagation()}>
            <h3>⚽ Generar partidos automáticamente</h3>
            <p>
              Se crearán <strong>{(clasificacion.filter(c => !c.esNosotros).length) * 2} partidos</strong> (casa + fuera contra cada rival).
              Los partidos generados anteriormente se eliminarán.
            </p>
            <p style={{ color: '#ff8080', fontSize: '0.82rem' }}>
              ⚠️ Recuerda actualizar las fechas y horas de cada partido después.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                className="admin-btn admin-btn--edit"
                onClick={generarPartidos}
                disabled={generating}
              >
                {generating ? 'Generando...' : 'Sí, generar partidos'}
              </button>
              <button
                className="admin-btn"
                style={{ background: '#eee', color: '#333' }}
                onClick={() => setConfirm(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
