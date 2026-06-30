import './FootballPitch.css';

// Coordenadas (x, y) en % sobre el campo (vista desde arriba, ataque hacia arriba)
const POSITION_COORDS = {
  POR:  { x: 50, y: 88, label: 'POR' },
  LD:  { x: 80, y: 72, label: 'LD' },
  DFC:  { x: 50, y: 72, label: 'DC' },
  LI:  { x: 20, y: 72, label: 'LI' },
  MCD: { x: 50, y: 57, label: 'MCD' },
  MD:  { x: 82, y: 45, label: 'MD' },
  MC:  { x: 50, y: 45, label: 'MC' },
  MI:  { x: 18, y: 45, label: 'MI' },
  MCO: { x: 50, y: 32, label: 'MCO' },
  ED:  { x: 80, y: 20, label: 'ED' },
  DC:  { x: 50, y: 16, label: 'DEL' },
  EI:  { x: 20, y: 20, label: 'EI' },
};

export default function FootballPitch({ posiciones = [], primaryPosition }) {
  return (
    <div className="pitch-wrap">
      <svg viewBox="0 0 200 280" className="pitch-svg" xmlns="http://www.w3.org/2000/svg">
        {/* Césped */}
        <rect width="200" height="280" rx="6" fill="#2d7a3a" />
        {/* Rayas de césped */}
        {[0,1,2,3,4,5,6].map(i => (
          <rect key={i} x="0" y={i*40} width="200" height="20" fill={i%2===0 ? '#2d7a3a' : '#357a44'} rx="0"/>
        ))}

        {/* Líneas del campo */}
        {/* Borde */}
        <rect x="8" y="8" width="184" height="264" rx="3" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Línea del medio */}
        <line x1="8" y1="140" x2="192" y2="140" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Círculo central */}
        <circle cx="100" cy="140" r="28" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        <circle cx="100" cy="140" r="1.5" fill="rgba(255,255,255,0.6)"/>

        {/* Área grande inferior */}
        <rect x="40" y="218" width="120" height="54" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Área pequeña inferior */}
        <rect x="68" y="246" width="64" height="26" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Portería inferior */}
        <rect x="82" y="270" width="36" height="6" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
        {/* Punto penal inferior */}
        <circle cx="100" cy="236" r="1.5" fill="rgba(255,255,255,0.6)"/>

        {/* Área grande superior */}
        <rect x="40" y="8" width="120" height="54" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Área pequeña superior */}
        <rect x="68" y="8" width="64" height="26" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"/>
        {/* Portería superior */}
        <rect x="82" y="2" width="36" height="6" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
        {/* Punto penal superior */}
        <circle cx="100" cy="44" r="1.5" fill="rgba(255,255,255,0.6)"/>

        {/* Posiciones */}
        {posiciones.map(pos => {
          const coord = POSITION_COORDS[pos];
          if (!coord) return null;
          const isPrimary = pos === primaryPosition;
          return (
            <g key={pos}>
              <circle
                cx={coord.x * 2}
                cy={coord.y * 2.8}
                r={isPrimary ? 11 : 9}
                fill={isPrimary ? '#C8102E' : 'rgba(0,48,135,0.85)'}
                stroke="white"
                strokeWidth={isPrimary ? 2 : 1.5}
              />
              <text
                x={coord.x * 2}
                y={coord.y * 2.8 + 4}
                textAnchor="middle"
                fontSize={isPrimary ? "7" : "6"}
                fontWeight="700"
                fill="white"
                fontFamily="Inter, sans-serif"
              >
                {coord.label}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="pitch-legend">
        <span className="pitch-legend__primary" /> Posición principal
        <span className="pitch-legend__secondary" /> Posición alternativa
      </p>
    </div>
  );
}
