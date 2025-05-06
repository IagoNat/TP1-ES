
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductRating from '@/components/ratings/ProductRating';
import CommentList from '@/components/comments/CommentList';
import { getProductById, deleteProduct } from '@/services/products';
import { Product } from '@/types/marketplace';
import { getCurrentUser } from '@/services/auth';
import { useToast } from '@/hooks/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const currentUser = getCurrentUser();
  const isOwner = currentUser && product && currentUser.id === product.userId;
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
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
  }, [id]);
  
  const handleDelete = async () => {
    if (!product) return;
    
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    setIsDeleting(true);
    
    try {
      await deleteProduct(product.id);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      navigate('/my-products');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="marketplace-container py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 bg-gray-200 rounded aspect-video"></div>
              <div className="w-full md:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6 w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (!product) {
    return (
      <MainLayout>
        <div className="marketplace-container py-8">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-medium text-marketplace-gray-dark mb-4">
              Product Not Found
            </h2>
            <p className="text-marketplace-gray mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        {/* Breadcrumbs */}
        <nav className="mb-4">
          <ol className="flex text-sm">
            <li>
              <Link to="/" className="text-marketplace-gray hover:text-marketplace-purple transition-colors">
                Home
              </Link>
            </li>
            <li className="mx-2 text-marketplace-gray">/</li>
            <li>
              <Link to="/products" className="text-marketplace-gray hover:text-marketplace-purple transition-colors">
                Products
              </Link>
            </li>
            <li className="mx-2 text-marketplace-gray">/</li>
            <li className="text-marketplace-gray-dark font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-full h-auto object-contain aspect-video"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                }}
              />
            </div>
          </div>
          
          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-marketplace-gray-dark mb-2">
              {product.name}
            </h1>
            
            <div className="mb-4">
              <span className="category-chip">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </div>
            
            <div className="mb-6">
              <ProductRating productId={product.id} />
            </div>
            
            <p className="text-marketplace-gray-dark mb-6">
              {product.description}
            </p>
            
            <div className="text-3xl font-bold text-marketplace-gray-dark mb-6">
              {formatPrice(product.price)}
            </div>
            
            <div className="mb-6 text-sm text-marketplace-gray">
              Listed on {formatDate(product.createdAt)}
            </div>
            
            {isOwner ? (
              <div className="flex space-x-4">
                <Link to={`/edit-product/${product.id}`} className="btn-primary py-2 px-4">
                  Edit Product
                </Link>
                <button 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Product'}
                </button>
              </div>
            ) : (
              <button className="w-full btn-primary py-3">
                Buy Now
              </button>
            )}
          </div>
        </div>
        
        {/* Product Comments */}
        <div className="mt-12">
          <CommentList productId={product.id} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductDetailPage;
