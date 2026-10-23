import { useEffect, useState } from 'react';
import { firestore } from '../utils/firebase';
const useGuestbook = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Fetch guestbook entries from Firestore
  }, []);

  return { entries };
};
export default useGuestbook;