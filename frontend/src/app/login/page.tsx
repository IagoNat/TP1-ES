'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuthContext } from '../../context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [form, setForm] = useState({ email: '', senha: '' });

  function atualizaForm(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function efetuarLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      const result = await doSignInWithEmailAndPassword(form.email, form.senha);
      setUser({ uid: result.user.uid, email: result.user.email || '' });
      router.push('/');
    } catch (err: any) {
      alert(err?.message || 'Erro ao efetuar login.');
    }
  }

  async function loginGoogle() {
    try {
      const user = await doSignInWithGoogle();
      setUser({ uid: user.uid, email: user.email || '' });
      router.push('/');
    } catch (err: any) {
      alert(err?.message || 'Erro ao logar com Google.');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-10 px-4">
      <form onSubmit={efetuarLogin} className="mt-6 flex flex-col items-center space-y-4 w-full max-w-xs">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={atualizaForm}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={atualizaForm}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-40 py-2 rounded-md bg-blue-900 text-white hover:opacity-90 transition"
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={loginGoogle}
          className="w-40 py-2 rounded-md bg-red-600 text-white hover:opacity-90 transition"
        >
          Login com Google
        </button>
      </form>

      <Link href="/signup" className="mt-4 text-blue-900 underline">
        Não tem uma conta? Cadastre-se
      </Link>
    </div>
  );
}
