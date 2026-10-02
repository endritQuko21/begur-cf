import { useState, useEffect } from "react";

export function useFCFClasificacion() {
  const [clasificacion, setClasificacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/fcf-clasificacion")
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const rows = (json.data || []).map((e) => ({
          pos: parseInt(e.position),
          equipo: e.team.name,
          logo: e.team.logo
            ? `https://www.fcf.cat/img/equips/${e.team.logo}`
            : null,
          teamId: e.team.teamId,
          pj: e.played,
          g: e.won,
          e: e.drawn,
          p: e.lost,
          gf: parseInt(e.goalsFor),
          gc: parseInt(e.goalsAgainst),
          pts: parseFloat(e.points),
          forma: (e.form || []).map((f) => f.result), // 'G', 'E', 'P'
          esNosotros: e.team.name.toLowerCase().includes("begur"),
        }));
        setClasificacion(rows);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { clasificacion, loading, error };
}
