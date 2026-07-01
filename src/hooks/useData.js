import { useState, useEffect } from 'react';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, setDoc, onSnapshot, orderBy, query
} from 'firebase/firestore';
import { db } from '../firebase';

import { jugadores as defaultJugadores, staff as defaultStaff } from '../data/jugadores';
import { partidos as defaultPartidos } from '../data/partidos';
import { noticias as defaultNoticias } from '../data/noticias';
import { clasificacion as defaultClasificacion } from '../data/clasificacion';

// ─── JUGADORES ───────────────────────────────────────────
export function useJugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'jugadores'), orderBy('dorsal'));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) {
        defaultJugadores.forEach(j => addDoc(collection(db, 'jugadores'), j));
      } else {
        const all = snap.docs.map(d => ({ ...d.data(), _id: d.id }));
        setJugadores(all.filter(j => !j.esStaff));
        setStaff(all.filter(j => j.esStaff));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const add = (j) => addDoc(collection(db, 'jugadores'), j);
  const update = (id, j) => updateDoc(doc(db, 'jugadores', id), j);
  const remove = (id) => deleteDoc(doc(db, 'jugadores', id));

  return { jugadores, staff, loading, add, update, remove };
}

// ─── STAFF ───────────────────────────────────────────
export function useStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'staff'));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) {
        // Primera vez: seed con datos por defecto
        defaultStaff.forEach(j => addDoc(collection(db, 'staff'), j));
      } else {
        setStaff(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const add = (j) => addDoc(collection(db, 'staff'), j);
  const update = (id, j) => updateDoc(doc(db, 'staff', id), j);
  const remove = (id) => deleteDoc(doc(db, 'staff', id));

  return { staff, loading, add, update, remove };
}

// ─── PARTIDOS ────────────────────────────────────────────
export function usePartidos() {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'partidos'), orderBy('fecha'));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) {
        defaultPartidos.forEach(p => addDoc(collection(db, 'partidos'), p));
      } else {
        setPartidos(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const add = (p) => addDoc(collection(db, 'partidos'), p);
  const update = (id, p) => updateDoc(doc(db, 'partidos', id), p);
  const remove = (id) => deleteDoc(doc(db, 'partidos', id));

  return { partidos, loading, add, update, remove };
}

// ─── NOTICIAS ────────────────────────────────────────────
export function useNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'noticias'), orderBy('fecha', 'desc'));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) {
        defaultNoticias.forEach(n => addDoc(collection(db, 'noticias'), n));
      } else {
        setNoticias(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const add = (n) => addDoc(collection(db, 'noticias'), n);
  const update = (id, n) => updateDoc(doc(db, 'noticias', id), n);
  const remove = (id) => deleteDoc(doc(db, 'noticias', id));

  return { noticias, loading, add, update, remove };
}

// ─── CLASIFICACION ───────────────────────────────────────
export function useClasificacion() {
  const [clasificacion, setClasificacion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'clasificacion'), snap => {
      if (snap.empty) {
        defaultClasificacion.forEach(c =>
          setDoc(doc(db, 'clasificacion', String(c.pos)), c)
        );
      } else {
        const rows = snap.docs.map(d => ({ ...d.data(), _id: d.id }));
        // Ordenar por puntos desc, y en caso de empate por diferencia de goles
        rows.sort((a, b) => {
          const ptsDiff = (b.pts || 0) - (a.pts || 0);
          if (ptsDiff !== 0) return ptsDiff;
          const dgA = (a.gf || 0) - (a.gc || 0);
          const dgB = (b.gf || 0) - (b.gc || 0);
          return dgB - dgA;
        });
        // Recalcular posiciones según el orden real
        rows.forEach((r, i) => { r.pos = i + 1; });
        setClasificacion(rows);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const add = async (equipo) => {
    const newDoc = {
      equipo: equipo.equipo,
      pj: Number(equipo.pj) || 0,
      g: Number(equipo.g) || 0,
      e: Number(equipo.e) || 0,
      p: Number(equipo.p) || 0,
      gf: Number(equipo.gf) || 0,
      gc: Number(equipo.gc) || 0,
      pts: Number(equipo.pts) || 0,
      esNosotros: equipo.esNosotros || false,
    };
    return addDoc(collection(db, 'clasificacion'), newDoc);
  };

  const update = (id, data) => {
    const clean = {
      equipo: data.equipo,
      pj: Number(data.pj) || 0,
      g: Number(data.g) || 0,
      e: Number(data.e) || 0,
      p: Number(data.p) || 0,
      gf: Number(data.gf) || 0,
      gc: Number(data.gc) || 0,
      pts: Number(data.pts) || 0,
      esNosotros: data.esNosotros || false,
    };
    return updateDoc(doc(db, 'clasificacion', id), clean);
  };

  const remove = (id) => deleteDoc(doc(db, 'clasificacion', id));

  return { clasificacion, loading, add, update, remove };
}
