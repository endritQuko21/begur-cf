import './AdminTable.css';

export default function AdminTable({ cols, rows, onEdit, onDelete, onFotos }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>{cols.map(c => <th key={c.key}>{c.label}</th>)}<th>Acciones</th></tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan={cols.length + 1} className="admin-table__empty">Sin datos</td></tr>
          )}
          {rows.map(row => (
            <tr key={row._id}>
              {cols.map(c => <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>)}
              <td className="admin-table__actions">
                {onFotos && (
                  <button className="admin-btn" style={{ background: '#6c47ff', color: 'white' }} onClick={() => onFotos(row)}>
                    📷 Fotos
                  </button>
                )}
                <button className="admin-btn admin-btn--edit" onClick={() => onEdit(row)}>Editar</button>
                <button className="admin-btn admin-btn--delete" onClick={() => onDelete(row._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}