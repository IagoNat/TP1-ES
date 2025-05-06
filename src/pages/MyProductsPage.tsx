
import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { getProductsByUserId, deleteProduct } from '@/services/products';
import { Product } from '@/types/marketplace';
import { isAuthenticated, getCurrentUser } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const MyProductsPage = () => {
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();
  
  const fetchProducts = async () => {
    if (!currentUser) return;
    
    try {
      const userProducts = await getProductsByUserId(currentUser.id);
      setProducts(userProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "Failed to load your products",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleDelete = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    setDeletingProductId(productId);
    
    try {
      await deleteProduct(productId);
      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setDeletingProductId(null);
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  if (!authenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-marketplace-gray-dark">
            My Products
          </h1>
          <Link to="/create-product" className="btn-primary">
            Add New Product
          </Link>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 bg-gray-200 rounded"></div>
                    <div className="h-10 w-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <svg
              className="w-16 h-16 text-marketplace-gray mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              ></path>
            </svg>
            <h2 className="text-2xl font-medium text-marketplace-gray-dark mb-4">
              No Products Yet
            </h2>
            <p className="text-marketplace-gray mb-6">
              You haven't listed any products for sale. Get started by creating your first listing!
            </p>
            <Link to="/create-product" className="btn-primary">
              Create Your First Product
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm flex items-center">
                <Link to={`/products/${product.id}`} className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80?text=No+Image';
                    }}
                  />
                </Link>
                
                <div className="flex-1">
                  <Link to={`/products/${product.id}`} className="text-lg font-medium text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-marketplace-gray text-sm">
                    Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </p>
                  <p className="text-marketplace-gray-dark font-semibold">
                    {formatPrice(product.price)}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Link 
                    to={`/edit-product/${product.id}`}
                    className="text-marketplace-gray hover:text-marketplace-purple transition-colors p-2"
                    aria-label="Edit product"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingProductId === product.id}
                    className={`text-red-500 hover:text-red-600 transition-colors p-2 ${deletingProductId === product.id ? 'opacity-50' : ''}`}
                    aria-label="Delete product"
                  >
                    {deletingProductId === product.id ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default MyProductsPage;
