'use client';
import React, { useState } from 'react';

const RatingStars: React.FC = () => {
  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
          onClick={() => handleRating(star)}
        >
          ★
        </span>
      ))}
      <p>Nota: {rating}</p>
    </div>
  );
};

export default RatingStars;
