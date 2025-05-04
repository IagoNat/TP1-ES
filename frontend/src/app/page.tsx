'use client';

import { useAuth } from '../hooks/useAuth';
import { doSignOut } from '../../firebase/auth';
import { useAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user } = useAuth();
  const { setUser } = useAuthContext();
  const router = useRouter();

  async function handleLogout() {
    await doSignOut();
    setUser(null);
    router.push('/login');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Bem-vindo à Home</h1>
      {user ? (
        <>
          <p>Olá, {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:opacity-90"
          >
            Sair
          </button>
        </>
      ) : (
        <p>Usuário não logado.</p>
      )}
    </div>
  );
}
