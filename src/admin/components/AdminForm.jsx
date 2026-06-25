import './AdminForm.css';

export default function AdminForm({ fields, values, onChange, onSubmit, onCancel, submitLabel = 'Guardar' }) {
  return (
    <div className="admin-form-overlay" onClick={onCancel}>
      <div className="admin-form" onClick={e => e.stopPropagation()}>
        <h3 className="admin-form__title">{submitLabel}</h3>
        <div className="admin-form__fields">
          {fields.map(f => (
            <div key={f.key} className="admin-form__field">
              <label>{f.label}</label>
              {f.type === 'textarea' ? (
                <textarea
                  value={values[f.key] || ''}
                  onChange={e => onChange(f.key, e.target.value)}
                  rows={3}
                  placeholder={f.placeholder || ''}
                />
              ) : f.type === 'select' ? (
                <select value={values[f.key] || ''} onChange={e => onChange(f.key, e.target.value)}>
                  {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              ) : (
                <input
                  type={f.type || 'text'}
                  value={values[f.key] || ''}
                  onChange={e => onChange(f.key, e.target.value)}
                  placeholder={f.placeholder || ''}
                />
              )}
            </div>
          ))}
        </div>
        <div className="admin-form__actions">
          <button className="admin-btn admin-btn--edit" onClick={onSubmit}>{submitLabel}</button>
          <button className="admin-btn" style={{ background: '#eee', color: '#333' }} onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
