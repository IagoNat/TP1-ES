
import { Comment } from "@/types/marketplace";

// Mock comments data (would be replaced with Firebase)
let mockComments: Comment[] = [
  {
    id: "1",
    productId: "1",
    userId: "1",
    userName: "John Doe",
    text: "Great product, works as described!",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    productId: "1",
    userId: "2",
    userName: "Jane Smith",
    text: "Fast shipping, good quality.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];

export const getCommentsByProductId = async (productId: string): Promise<Comment[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comments = mockComments.filter(c => c.productId === productId);
      resolve(comments);
    }, 300);
  });
};

export const createComment = async (comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment: Comment = {
        ...comment,
        id: (mockComments.length + 1).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockComments.push(newComment);
      resolve(newComment);
    }, 500);
  });
};

export const updateComment = async (id: string, text: string): Promise<Comment> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockComments.findIndex(c => c.id === id);
      if (index === -1) {
        reject(new Error("Comment not found"));
        return;
      }
      
      const updatedComment = {
        ...mockComments[index],
        text,
        updatedAt: new Date(),
      };
      
      mockComments[index] = updatedComment;
      resolve(updatedComment);
    }, 500);
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockComments.findIndex(c => c.id === id);
      if (index === -1) {
        reject(new Error("Comment not found"));
        return;
      }
      
      mockComments = mockComments.filter(c => c.id !== id);
      resolve();
    }, 500);
  });
};
