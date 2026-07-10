import { useState } from 'react';
import './AdminLogin.css';

const PASSWORD = 'admin';

export default function AdminLogin({ onLogin }) {
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (pass === PASSWORD) { onLogin(); setError(false); }
    else { setError(true); setPass(''); }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__box">
        <div className="admin-login__logo">BCF</div>
        <h1 className="admin-login__title">Panel Admin</h1>
        <p className="admin-login__sub">Begur C.F. A · temporada 2026-27</p>
        <div className="admin-login__field">
          <label>Contraseña</label>
          <input
            type="password"
            value={pass}
            onChange={e => { setPass(e.target.value); setError(false); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="••••••••"
            autoFocus
          />
        </div>
        {error && <p className="admin-login__error">Contraseña incorrecta</p>}
        <button className="admin-login__btn" onClick={handleSubmit}>Entrar</button>
      </div>
    </div>
  );
}
