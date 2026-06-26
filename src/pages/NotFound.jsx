import { Link } from 'react-router-dom';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__escudo">
        <img src="/escudo.png" alt="Begur CF" />
      </div>
      <div className="notfound__num">4<span>0</span>4</div>
      <h1 className="notfound__title">Fuera de juego</h1>
      <p className="notfound__sub">Esta página no existe o ha sido eliminada.<br />Vuelve al campo.</p>
      <Link to="/" className="notfound__btn">← Volver al inicio</Link>
    </div>
  );
}
