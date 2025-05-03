import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const commentsRef = collection(db, 'comments');

export const createComment = (data: any) => {
  return addDoc(commentsRef, data);
};

export const updateComment = (id: string, data: any) => {
  const commentDoc = doc(db, 'comments', id);
  return updateDoc(commentDoc, data);
};

export const deleteComment = (id: string) => {
  const commentDoc = doc(db, 'comments', id);
  return deleteDoc(commentDoc);
};

export const listComments = () => {
  return getDocs(commentsRef);
};
