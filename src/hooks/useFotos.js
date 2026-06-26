import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';

export function useFotos(partidoId) {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!partidoId) return;
    const q = query(
      collection(db, 'partidos', partidoId, 'fotos'),
      orderBy('createdAt', 'asc')
    );
    const unsub = onSnapshot(q, snap => {
      setFotos(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
      setLoading(false);
    });
    return unsub;
  }, [partidoId]);

  const upload = async (file) => {
    setUploading(true);
    setProgress(0);
    const storageRef = ref(storage, `partidos/${partidoId}/${Date.now()}_${file.name}`);
    const task = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      task.on('state_changed',
        snap => setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)),
        err => { setUploading(false); reject(err); },
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          await addDoc(collection(db, 'partidos', partidoId, 'fotos'), {
            url,
            path: storageRef.fullPath,
            createdAt: Date.now(),
          });
          setUploading(false);
          setProgress(0);
          resolve(url);
        }
      );
    });
  };

  const remove = async (foto) => {
    await deleteDoc(doc(db, 'partidos', partidoId, 'fotos', foto._id));
    try { await deleteObject(ref(storage, foto.path)); } catch {}
  };

  return { fotos, loading, uploading, progress, upload, remove };
}
