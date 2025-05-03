import { db } from '../lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

const productsRef = collection(db, 'products');

export const createProduct = (data: any) => {
  return addDoc(productsRef, data);
};

export const updateProduct = (id: string, data: any) => {
  const productDoc = doc(db, 'products', id);
  return updateDoc(productDoc, data);
};

export const deleteProduct = (id: string) => {
  const productDoc = doc(db, 'products', id);
  return deleteDoc(productDoc);
};

export const listProducts = () => {
  return getDocs(productsRef);
};
