import { useState, useEffect } from 'react';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc,
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'jugadores'), orderBy('dorsal'));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) {
        // Primera vez: seed con datos por defecto
        defaultJugadores.forEach(j => addDoc(collection(db, 'jugadores'), j));
      } else {
        setJugadores(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const add = (j) => addDoc(collection(db, 'jugadores'), j);
  const update = (id, j) => updateDoc(doc(db, 'jugadores', id), j);
  const remove = (id) => deleteDoc(doc(db, 'jugadores', id));

  return { jugadores, loading, add, update, remove };
}

// ─── STAFF ───────────────────────────────────────────
export function useJugadores() {
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
    const q = query(collection(db, 'clasificacion'), orderBy('pos'));
    const unsub = onSnapshot(q, snap => {
      if (snap.empty) {
        defaultClasificacion.forEach(c => setDoc(doc(db, 'clasificacion', String(c.pos)), c));
      } else {
        setClasificacion(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const update = (id, data) => updateDoc(doc(db, 'clasificacion', id), data);
  const set = (data) => data.forEach(c => setDoc(doc(db, 'clasificacion', String(c.pos)), c));

  return { clasificacion, loading, update, set };
}
