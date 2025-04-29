import { db } from '../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const ratingsRef = collection(db, 'ratings');

export const saveRating = (data: any) => {
  return addDoc(ratingsRef, data);
};

export const listRatings = () => {
  return getDocs(ratingsRef);
};
