import { auth } from "./clientApp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("Usuário não está autenticado.");
  return updatePassword(currentUser, password);
};

export const doSendEmailVerification = () => {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error("Usuário não está autenticado.");
  return sendEmailVerification(currentUser, {
    url: `${window.location.origin}/home`,
  });
};