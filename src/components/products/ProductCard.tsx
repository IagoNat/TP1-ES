
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/marketplace';
import StarRating from '../ratings/StarRating';
import { getAverageRatingByProductId } from '@/services/ratings';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [averageRating, setAverageRating] = React.useState(0);
  
  React.useEffect(() => {
    const fetchRating = async () => {
      try {
        const rating = await getAverageRatingByProductId(product.id);
        setAverageRating(rating);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };
    
    fetchRating();
  }, [product.id]);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);
  
  return (
    <div className="product-card h-full flex flex-col">
      <div className="relative pb-[56.25%] overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="absolute h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="mb-2">
          <span className="category-chip text-xs inline-block">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-medium text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-marketplace-gray text-sm line-clamp-2 mt-1 flex-grow">
          {product.description}
        </p>
        
        <div className="mt-2 flex items-center">
          <StarRating value={averageRating} readOnly size="sm" />
          <span className="text-xs text-marketplace-gray ml-1">
            ({averageRating.toFixed(1)})
          </span>
        </div>
        
        <div className="mt-3 flex justify-between items-center">
          <span className="text-lg font-semibold text-marketplace-gray-dark">
            {formattedPrice}
          </span>
          
          <Link to={`/products/${product.id}`} className="btn-primary text-sm py-1">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
