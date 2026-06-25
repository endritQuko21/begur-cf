import './SectionTitle.css';

export default function SectionTitle({ title, subtitle, light = false }) {
  return (
    <div className={`section-title ${light ? 'section-title--light' : ''}`}>
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__sub">{subtitle}</p>}
      <div className="section-title__bar" />
    </div>
  );
}
