
import React, { useState, useEffect } from 'react';
import StarRating from './StarRating';
import { getAverageRatingByProductId } from '@/services/ratings';
import { useToast } from '@/hooks/use-toast';

interface ProductRatingProps {
  productId: string;
}

const ProductRating = ({ productId }: ProductRatingProps) => {
  const { toast } = useToast();
  const [averageRating, setAverageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchRating = async () => {
    try {
      const rating = await getAverageRatingByProductId(productId);
      setAverageRating(rating);
    } catch (error) {
      console.error("Error fetching rating:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchRating();
  }, [productId]);
  
  const handleRatingChange = (newValue: number) => {
    // This will update after API call succeeds
    fetchRating();
  };
  
  if (isLoading) {
    return (
      <div className="animate-pulse flex space-x-1 items-center">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-6 h-6 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-4 bg-gray-200 rounded w-12"></div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <StarRating 
          productId={productId} 
          value={averageRating} 
          onChange={handleRatingChange}
          size="lg"
        />
        <span className="text-marketplace-gray-dark text-sm">
          ({averageRating.toFixed(1)})
        </span>
      </div>
      <p className="text-sm text-marketplace-gray italic">
        Click to rate this product
      </p>
    </div>
  );
};

export default ProductRating;
