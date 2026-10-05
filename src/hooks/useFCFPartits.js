import { useState, useEffect } from "react";

const GRUP_ACTUAL = "58161863"; // Segona Catalana 2026-27
const IMG_BASE = "https://www.fcf.cat/img/equips/";
const BEGUR_TEAM = "35522";

function mapPartit(m) {
  const esCasa = m.CODEQUIPO_CASA === BEGUR_TEAM;
  const rival = esCasa ? m.NOMBRE_FUERA : m.NOMBRE_CASA;
  const escudoRival = esCasa ? m.ESCUDO_FUERA : m.ESCUDO_CASA;
  const gCasa = m.GOLES_CASA !== null ? parseInt(m.GOLES_CASA) : null;
  const gFuera = m.GOLES_FUERA !== null ? parseInt(m.GOLES_FUERA) : null;
  const gBegur = esCasa ? gCasa : gFuera;
  const gRival = esCasa ? gFuera : gCasa;

  let resultat = null;
  let tipus = "proximo";
  if (gBegur !== null && gRival !== null) {
    resultat = esCasa ? `${gCasa}-${gFuera}` : `${gFuera}-${gCasa}`;
    tipus = "jugado";
  }

  let resultatBegur = null;
  if (gBegur !== null && gRival !== null) {
    if (gBegur > gRival) resultatBegur = "victoria";
    else if (gBegur < gRival) resultatBegur = "derrota";
    else resultatBegur = "empate";
  }

  const data = new Date(m.COMIENZO1);

  return {
    _id: m.CODACTA,
    codgrupo: m.CODGRUPO,
    jornada: m.JORNADA !== "0" ? parseInt(m.JORNADA) : null,
    rival: rival.replace(/["]/g, "").trim(),
    escudoRival: escudoRival ? `${IMG_BASE}${escudoRival}` : null,
    lugar: esCasa ? "Casa" : "Fuera",
    camp: m.CAMPO,
    fecha: data.toISOString().split("T")[0],
    hora: data.toTimeString().slice(0, 5),
    resultado: resultat,
    resultatBegur,
    golesBegur: gBegur,
    golesRival: gRival,
    tipus,
    competicio: m.NOMBRE_COMPETICION,
    esLliga: m.CODGRUPO === GRUP_ACTUAL,
    cerrada: m.CERRADA === "1",
  };
}

export function useFCFPartits() {
  const [partits, setPartits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/fcf-partits")
      .then((r) => {
        if (!r.ok) throw new Error(`Error ${r.status}`);
        return r.json();
      })
      .then((json) => {
        const tots = (json.data?.matches || [])
          .map(mapPartit)
          .sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        setPartits(tots);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtrats per competició actual
  const lliga = partits.filter((p) => p.esLliga);
  const amistosos = partits.filter((p) => !p.codgrupo || p.codgrupo === "0");
  const proxim = lliga.find((p) => p.tipus === "proximo");
  const jugats = lliga.filter((p) => p.tipus === "jugado");

  return { partits, lliga, amistosos, proxim, jugats, loading, error };
}
