
import { Rating } from "@/types/marketplace";

// Mock ratings data (would be replaced with Firebase)
let mockRatings: Rating[] = [
  {
    id: "1",
    productId: "1",
    userId: "1",
    value: 5,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    productId: "1",
    userId: "2",
    value: 4,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    productId: "2",
    userId: "1",
    value: 3,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const getRatingsByProductId = async (productId: string): Promise<Rating[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ratings = mockRatings.filter(r => r.productId === productId);
      resolve(ratings);
    }, 300);
  });
};

export const getAverageRatingByProductId = async (productId: string): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const ratings = mockRatings.filter(r => r.productId === productId);
      if (ratings.length === 0) {
        resolve(0);
        return;
      }
      
      const sum = ratings.reduce((acc, r) => acc + r.value, 0);
      const average = sum / ratings.length;
      resolve(average);
    }, 300);
  });
};

export const getRatingByUserAndProductId = async (userId: string, productId: string): Promise<Rating | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rating = mockRatings.find(r => r.userId === userId && r.productId === productId) || null;
      resolve(rating);
    }, 300);
  });
};

export const createOrUpdateRating = async (rating: Omit<Rating, 'id' | 'createdAt'>): Promise<Rating> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingIndex = mockRatings.findIndex(
        r => r.userId === rating.userId && r.productId === rating.productId
      );
      
      if (existingIndex !== -1) {
        // Update existing rating
        const updatedRating = {
          ...mockRatings[existingIndex],
          value: rating.value,
          createdAt: new Date(),
        };
        
        mockRatings[existingIndex] = updatedRating;
        resolve(updatedRating);
      } else {
        // Create new rating
        const newRating: Rating = {
          ...rating,
          id: (mockRatings.length + 1).toString(),
          createdAt: new Date(),
        };
        
        mockRatings.push(newRating);
        resolve(newRating);
      }
    }, 500);
  });
};
