'use client';
import React, { useState } from 'react';

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para salvar o produto
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome do Produto:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Descrição:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Preço:
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </label>
      <label>
        Categoria:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Imagem:
        <input type="file" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
      </label>
      <button type="submit">Salvar Produto</button>
    </form>
  );
};

export default ProductForm;
