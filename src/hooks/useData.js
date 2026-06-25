import { useState, useEffect } from 'react';
import { jugadores as defaultJugadores, staff as defaultStaff } from '../data/jugadores';
import { partidos as defaultPartidos } from '../data/partidos';
import { noticias as defaultNoticias } from '../data/noticias';
import { clasificacion as defaultClasificacion } from '../data/clasificacion';

const KEYS = {
  jugadores: 'bcf_jugadores',
  staff: 'bcf_staff',
  partidos: 'bcf_partidos',
  noticias: 'bcf_noticias',
  clasificacion: 'bcf_clasificacion',
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function useJugadores() {
  const [jugadores, setJugadores] = useState(() => load(KEYS.jugadores, defaultJugadores));
  const set = (data) => { setJugadores(data); save(KEYS.jugadores, data); };
  const add = (j) => set([...jugadores, { ...j, id: Date.now() }]);
  const update = (id, j) => set(jugadores.map(x => x.id === id ? { ...x, ...j } : x));
  const remove = (id) => set(jugadores.filter(x => x.id !== id));
  return { jugadores, add, update, remove };
}

export function useStaff() {
  const [staff, setStaff] = useState(() => load(KEYS.staff, defaultStaff));
  const set = (data) => { setStaff(data); save(KEYS.staff, data); };
  const add = (j) => set([...staff, { ...j, id: Date.now() }]);
  const update = (id, j) => set(staff.map(x => x.id === id ? { ...x, ...j } : x));
  const remove = (id) => set(staff.filter(x => x.id !== id));
  return { staff, add, update, remove };
}

export function usePartidos() {
  const [partidos, setPartidos] = useState(() => load(KEYS.partidos, defaultPartidos));
  const set = (data) => { setPartidos(data); save(KEYS.partidos, data); };
  const add = (p) => set([...partidos, { ...p, id: Date.now() }]);
  const update = (id, p) => set(partidos.map(x => x.id === id ? { ...x, ...p } : x));
  const remove = (id) => set(partidos.filter(x => x.id !== id));
  return { partidos, add, update, remove };
}

export function useNoticias() {
  const [noticias, setNoticias] = useState(() => load(KEYS.noticias, defaultNoticias));
  const set = (data) => { setNoticias(data); save(KEYS.noticias, data); };
  const add = (n) => set([{ ...n, id: Date.now() }, ...noticias]);
  const update = (id, n) => set(noticias.map(x => x.id === id ? { ...x, ...n } : x));
  const remove = (id) => set(noticias.filter(x => x.id !== id));
  return { noticias, add, update, remove };
}

export function useClasificacion() {
  const [clasificacion, setClasificacion] = useState(() => load(KEYS.clasificacion, defaultClasificacion));
  const set = (data) => { setClasificacion(data); save(KEYS.clasificacion, data); };
  const update = (pos, data) => set(clasificacion.map(x => x.pos === pos ? { ...x, ...data } : x));
  return { clasificacion, update, set };
}
