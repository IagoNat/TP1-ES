'use client';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div>
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Preço: {product.price}</p>
      <p>Categoria: {product.category}</p>
    </div>
  );
};

export default ProductCard;
