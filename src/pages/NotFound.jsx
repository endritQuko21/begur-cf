import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__escudo">
        <img src="/escudo.png" alt="Begur CF" />
      </div>
      <div className="notfound__num">
        4<span>0</span>4
      </div>
      <h1 className="notfound__title">Fora de joc</h1>
      <p className="notfound__sub">
        Aquesta pagina no existeix o ha sigut eliminada.
        <br />
        Tornar al camp.
      </p>
      <Link to="/" className="notfound__btn">
        ← Tornar al inici
      </Link>
    </div>
  );
}
