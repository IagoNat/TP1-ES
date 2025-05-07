
import React from 'react';
import { createOrUpdateRating, getRatingByUserAndProductId } from '@/services/ratings';
import { getCurrentUser } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

interface StarRatingProps {
  productId?: string;
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating = ({ 
  productId, 
  value, 
  onChange, 
  readOnly = false, 
  size = 'md' 
}: StarRatingProps) => {
  const { toast } = useToast();
  const [hoveredValue, setHoveredValue] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [userRating, setUserRating] = React.useState(0);
  
  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };
  
  const starSize = starSizes[size];
  
  React.useEffect(() => {
    if (productId && !readOnly) {
      const fetchUserRating = async () => {
        const currentUser = getCurrentUser();
        if (!currentUser) return;
        
        try {
          const rating = await getRatingByUserAndProductId(currentUser.id, productId);
          if (rating) {
            setUserRating(rating.value);
          }
        } catch (error) {
          console.error("Error fetching user rating:", error);
        }
      };
      
      fetchUserRating();
    }
  }, [productId, readOnly]);
  
  const handleStarClick = async (newValue: number) => {
    if (readOnly || !productId || !onChange) return;
    
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to rate products",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await createOrUpdateRating({
        productId,
        userId: currentUser.id,
        value: newValue,
      });
      
      setUserRating(newValue);
      onChange(newValue);
      
      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!",
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast({
        title: "Error",
        description: "Failed to submit rating",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const stars = [...Array(5)].map((_, index) => {
    const starValue = index + 1;
    let fill = 'none';
    
    if (!readOnly) {
      // Interactive mode
      if (hoveredValue >= starValue) {
        fill = 'currentColor';
      } else if (userRating >= starValue) {
        fill = 'currentColor';
      } else if (value >= starValue) {
        fill = 'currentColor';
        // Half star (only in non-interactive mode)
        if (value < starValue && value > index) {
          fill = 'url(#half-gradient)';
        }
      }
    } else {
      // Read-only mode
      if (value >= starValue) {
        fill = 'currentColor';
      } else if (value > index) {
        // Half star
        fill = 'url(#half-gradient)';
      }
    }
    
    return (
      <button
        key={index}
        type="button"
        className={`text-yellow-400 ${isSubmitting ? 'opacity-50' : 'hover:text-yellow-500'} focus:outline-none`}
        onClick={() => handleStarClick(starValue)}
        onMouseEnter={() => !readOnly && setHoveredValue(starValue)}
        onMouseLeave={() => !readOnly && setHoveredValue(0)}
        disabled={readOnly || isSubmitting}
        aria-label={`Rate ${starValue} out of 5 stars`}
      >
        <svg 
          className={starSize}
          fill={fill} 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="half-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="1.5" 
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          ></path>
        </svg>
      </button>
    );
  });
  
  return (
    <div className="flex">
      {stars}
    </div>
  );
};

export default StarRating;
