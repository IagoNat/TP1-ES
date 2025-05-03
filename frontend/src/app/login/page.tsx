'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', senha: '' });
  const [carregando, setCarregando] = useState(false);

  function atualizaForm(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function efetuarLogin(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);
    try {
      // const res = await login(form.email, form.senha);
    } catch (err: any) {
      alert(err?.message || 'Erro ao efetuar login.');
      setCarregando(false);
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
          disabled={carregando}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={atualizaForm}
          disabled={carregando}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          disabled={carregando}
          className="w-40 py-2 rounded-md bg-blue-900 text-white hover:opacity-90 transition"
        >
          {carregando ? 'Carregando...' : 'Entrar'}
        </button>
      </form>
      <Link href="/cadastro-escolha" className="mt-4 text-blue-900 underline">
        Não tem uma conta? Cadastre-se
      </Link>
    </div>
  );
}
