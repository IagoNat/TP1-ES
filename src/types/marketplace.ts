
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Rating {
  id: string;
  productId: string;
  userId: string;
  value: number; // 1-5
  createdAt: Date;
}

export type ProductCategory = 
  | "electronics"
  | "clothing"
  | "home"
  | "books"
  | "toys"
  | "sports"
  | "beauty"
  | "other";

export const productCategories: ProductCategory[] = [
  "electronics",
  "clothing",
  "home",
  "books",
  "toys",
  "sports",
  "beauty",
  "other"
];
