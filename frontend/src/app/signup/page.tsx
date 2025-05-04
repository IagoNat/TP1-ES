'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { useAuthContext } from '../../context/AuthContext';

export default function CadastroPage() {
  const router = useRouter();
  const { setUser } = useAuthContext();
  const [carregando, setCarregando] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    cpf: '',
    email: '',
    password: '',
  });

  function atualizaForm(event: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function efetuarCadastro(event: React.FormEvent) {
    event.preventDefault();
    setCarregando(true);

    try {
      const result = await doCreateUserWithEmailAndPassword(form.email, form.password);
      setUser({ uid: result.user.uid, email: result.user.email || '' });
      router.push('/');
    } catch (err: any) {
      alert(err?.message || 'Erro no cadastro.');
      setCarregando(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-10 px-4">
      <form onSubmit={efetuarCadastro} className="mt-6 flex flex-col items-center space-y-4 w-full max-w-xs">
        <input
          name="firstName"
          type="text"
          placeholder="Nome"
          value={form.firstName}
          onChange={atualizaForm}
          disabled={carregando}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="lastName"
          type="text"
          placeholder="Sobrenome"
          value={form.lastName}
          onChange={atualizaForm}
          disabled={carregando}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          name="cpf"
          type="text"
          placeholder="CPF"
          value={form.cpf}
          onChange={atualizaForm}
          disabled={carregando}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
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
          name="password"
          type="password"
          placeholder="Senha"
          value={form.password}
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
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
      <Link href="/login" className="mt-4 text-blue-900 underline">
        Já tem uma conta? Faça login!
      </Link>
    </div>
  );
}
