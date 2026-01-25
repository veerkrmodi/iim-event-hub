import { useState, useEffect } from 'react';
import { 
  collection, onSnapshot, doc,
  updateDoc, arrayUnion, arrayRemove 
} from 'firebase/firestore';
import { db, appId } from '../firebase/config';

export const useFirestore = (user, collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const query = collection(db, 'artifacts', appId, 'public', 'data', collectionName);
    
    const unsubscribe = onSnapshot(query, (snapshot) => {
      const newData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
      setData(newData);
      setLoading(false);
    }, (error) => {
      console.error(`${collectionName} Sync Error:`, error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, collectionName]);

  return { data, loading };
};
