import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">BEGUR C.F. A</span>
          <span className="footer__sub">Temporada 2026 – 2027</span>
        </div>
        <p className="footer__copy">© {new Date().getFullYear()} Begur Club de Futbol. Tots els drets reservats.</p>
      </div>
    </footer>
  );
}
