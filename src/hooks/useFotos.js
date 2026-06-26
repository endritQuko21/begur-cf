import { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const CLOUD_NAME = 'dyxaprdqb';
const UPLOAD_PRESET = 'begur_cf_preset';

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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', `begur-cf/partidos/${partidoId}`);

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };

    return new Promise((resolve, reject) => {
      xhr.onload = async () => {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
          await addDoc(collection(db, 'partidos', partidoId, 'fotos'), {
            url: data.secure_url,
            publicId: data.public_id,
            createdAt: Date.now(),
          });
          setUploading(false);
          setProgress(0);
          resolve(data.secure_url);
        } else {
          setUploading(false);
          reject(new Error(data.error?.message));
        }
      };
      xhr.onerror = () => { setUploading(false); reject(new Error('Upload failed')); };
      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`);
      xhr.send(formData);
    });
  };

  const remove = async (foto) => {
    await deleteDoc(doc(db, 'partidos', partidoId, 'fotos', foto._id));
    // El archivo en Cloudinary queda huérfano (para borrarlo necesitarías backend)
    // Para este uso es aceptable
  };

  return { fotos, loading, uploading, progress, upload, remove };
}