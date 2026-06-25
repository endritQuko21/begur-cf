import { useState, useEffect } from 'react';
import './Countdown.css';

function useCountdown(targetDate) {
  const calc = () => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, [targetDate]);
  return time;
}

export default function Countdown({ partido }) {
  const { d, h, m, s } = useCountdown(`${partido.fecha}T${partido.hora}:00`);
  const pad = n => String(n).padStart(2, '0');
  const fecha = new Date(partido.fecha).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  return (
    <div className="countdown">
      <div className="countdown__label">Próximo partido</div>
      <div className="countdown__match">
        <span className="countdown__team">Begur C.F. A</span>
        <span className="countdown__vs">VS</span>
        <span className="countdown__team">{partido.rival}</span>
      </div>
      <div className="countdown__meta">{fecha} · {partido.hora}h · {partido.lugar}</div>
      <div className="countdown__timer">
        {[{ v: d, l: 'días' }, { v: h, l: 'horas' }, { v: m, l: 'min' }, { v: s, l: 'seg' }].map(({ v, l }) => (
          <div key={l} className="countdown__unit">
            <span className="countdown__num">{pad(v)}</span>
            <span className="countdown__sub">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
