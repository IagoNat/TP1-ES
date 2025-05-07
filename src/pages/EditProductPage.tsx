
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductForm from '@/components/products/ProductForm';
import { getProductById } from '@/services/products';
import { Product } from '@/types/marketplace';
import { isAuthenticated, getCurrentUser } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  
  const authenticated = isAuthenticated();
  const currentUser = getCurrentUser();
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
        
        // Check if the current user is the product owner
        if (fetchedProduct && currentUser && fetchedProduct.userId !== currentUser.id) {
          setIsAuthorized(false);
          toast({
            title: "Unauthorized",
            description: "You can only edit your own products",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, currentUser]);
  
  if (!authenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  if (!isAuthorized) {
    return <Navigate to="/my-products" replace />;
  }
  
  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold text-marketplace-gray-dark mb-8">
          Edit Product
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="flex justify-end">
                <div className="h-10 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          ) : (
            <ProductForm product={product || undefined} isEdit={true} />
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default EditProductPage;
