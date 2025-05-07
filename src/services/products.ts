
import { Product, ProductCategory } from "@/types/marketplace";

// Mock product data (would be replaced with Firebase)
let mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ",
    description: "The latest smartphone with amazing camera",
    price: 999.99,
    imageUrl: "https://imgs.casasbahia.com.br/55067264/1g.jpg?imwidth=96",
    category: "electronics",
    userId: "1",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Designer T-Shirt",
    description: "Comfortable cotton t-shirt with modern design",
    price: 29.99,
    imageUrl: "https://www.insiderstore.com.br/cdn/shop/files/Tech-Preta_-_Otimizada_d3894459-ef95-4b78-848a-3e653aa899a1.jpg?v=1744145587&width=1206",
    category: "clothing",
    userId: "1",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "Coffee Table",
    description: "Modern coffee table made from reclaimed wood",
    price: 199.99,
    imageUrl: "https://todosmoveis.vteximg.com.br/arquivos/ids/172568-1920-1920/Mesa-Jantar-Edge.jpg?v=637868341505470000",
    category: "home",
    userId: "1",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    name: "Programming Book",
    description: "Learn modern web development with this comprehensive guide",
    price: 39.99,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51E2055ZGUL._AC_UL232_SR232,232_.jpg",
    category: "books",
    userId: "1",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];

export const getAllProducts = async (): Promise<Product[]> => {
  // Simulate network request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockProducts]);
    }, 500);
  });
};

export const getProductById = async (id: string): Promise<Product | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id) || null;
      resolve(product);
    }, 300);
  });
};

export const getProductsByCategory = async (category: ProductCategory): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.category === category);
      resolve(products);
    }, 300);
  });
};

export const getProductsByUserId = async (userId: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.userId === userId);
      resolve(products);
    }, 300);
  });
};

export const createProduct = async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct: Product = {
        ...product,
        id: (mockProducts.length + 1).toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      mockProducts.push(newProduct);
      resolve(newProduct);
    }, 500);
  });
};

export const updateProduct = async (id: string, updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        reject(new Error("Product not found"));
        return;
      }
      
      const updatedProduct = {
        ...mockProducts[index],
        ...updates,
        updatedAt: new Date(),
      };
      
      mockProducts[index] = updatedProduct;
      resolve(updatedProduct);
    }, 500);
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProducts.findIndex(p => p.id === id);
      if (index === -1) {
        reject(new Error("Product not found"));
        return;
      }
      
      mockProducts = mockProducts.filter(p => p.id !== id);
      resolve();
    }, 500);
  });
};
