import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const CLOUD_NAME = 'dyxaprdqb';
const UPLOAD_PRESET = 'begur_cf_preset';

export function useFotos(partidoId) {
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!partidoId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const q = query(
      collection(db, 'partidos', partidoId, 'fotos'),
      orderBy('createdAt', 'asc')
    );

    const unsub = onSnapshot(
      q,
      snap => {
        setFotos(snap.docs.map(d => ({ ...d.data(), _id: d.id })));
        setLoading(false);
      },
      err => {
        console.error('Error cargando fotos:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return unsub;
  }, [partidoId]);

  const upload = (file) => {
    return new Promise((resolve, reject) => {
      if (!partidoId) return reject(new Error('Sin partidoId'));

      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('folder', `begur-cf/partidos/${partidoId}`);

      const xhr = new XMLHttpRequest();

      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
      };

      xhr.onload = async () => {
        try {
          const data = JSON.parse(xhr.responseText);
          if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
            await addDoc(collection(db, 'partidos', partidoId, 'fotos'), {
              url: data.secure_url,
              publicId: data.public_id || null,
              createdAt: Date.now(),
            });
            setUploading(false);
            setProgress(0);
            resolve(data.secure_url);
          } else {
            setUploading(false);
            setProgress(0);
            reject(new Error(data.error?.message || 'Error subiendo la imagen'));
          }
        } catch (err) {
          setUploading(false);
          setProgress(0);
          reject(err);
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        setProgress(0);
        reject(new Error('Error de red al subir la imagen'));
      };

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
      xhr.send(formData);
    });
  };

  const remove = async (foto) => {
    try {
      await deleteDoc(doc(db, 'partidos', partidoId, 'fotos', foto._id));
    } catch (err) {
      console.error('Error borrando foto:', err);
      throw err;
    }
  };

  return { fotos, loading, error, uploading, progress, upload, remove };
}
