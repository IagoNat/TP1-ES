'use client';

import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Bem-vindo à Home</h1>
      {user ? (
        <p>Olá, {user.email}</p>
      ) : (
        <p>Usuário não logado.</p>
      )}
    </div>
  );
}
