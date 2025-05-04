'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase/clientApp';
import { useAuthContext } from '../context/AuthContext';

export const useAuth = () => {
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({ uid: firebaseUser.uid, email: firebaseUser.email || '' });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  return { user };
};
