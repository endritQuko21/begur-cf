import SectionTitle from '../components/ui/SectionTitle';
import './Campo.css';

export default function Campo() {
  return (
    <div>
      <div className="section section--dark">
        <div className="container">
          <SectionTitle title="Camp de La Guarda" subtitle="El nostre estadi" light />
        </div>
      </div>
      <section className="section">
        <div className="container campo__inner">
          <div className="campo__info">
            <h3>Camp Municipal de La Guarda</h3>
            <ul className="campo__details">
              <li><strong>Localitat:</strong> Begur, Baix Empordà</li>
              <li><strong>Capacitat:</strong> ~500 espectadors</li>
              <li><strong>Superfície:</strong> Gespa artificial</li>
              <li><strong>Adreça:</strong> Carrer de la Guarda, Begur</li>
            </ul>
          </div>
          <div className="campo__map">
            <iframe
              title="Camp de La Guarda"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11797.8!2d3.209!3d41.951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12bb1c000000001%3A0x0!2sBegur!5e0!3m2!1ses!2ses!4v1"
              width="100%" height="350" style={{border:0}} allowFullScreen loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
