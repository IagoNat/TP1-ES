
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import { getAllProducts } from '@/services/products';
import { Product } from '@/types/marketplace';
import { isAuthenticated } from '@/services/auth';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const authenticated = isAuthenticated();
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        // Get the latest 4 products
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-marketplace-purple-light py-16">
        <div className="marketplace-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-marketplace-gray-dark mb-4">
              Your Minimalist Marketplace
            </h1>
            <p className="text-lg text-marketplace-gray-dark mb-8">
              Buy and sell products with ease in our simple, efficient platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary py-3 px-8">
                Browse Products
              </Link>
              {authenticated ? (
                <Link to="/create-product" className="btn-secondary py-3 px-8">
                  Sell Something
                </Link>
              ) : (
                <Link to="/sign-up" className="btn-secondary py-3 px-8">
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="marketplace-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-marketplace-gray-dark">
              Featured Products
            </h2>
            <Link to="/products" className="text-marketplace-purple hover:text-marketplace-purple-dark transition-colors">
              View All →
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="marketplace-container">
          <h2 className="text-2xl font-semibold text-marketplace-gray-dark mb-12 text-center">
            Why Choose EcoMarket?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-marketplace-purple-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-marketplace-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-marketplace-gray-dark mb-2">Secure Transactions</h3>
              <p className="text-marketplace-gray">
                Our platform ensures your payments and personal information are always protected.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-marketplace-purple-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-marketplace-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-marketplace-gray-dark mb-2">Easy Shopping</h3>
              <p className="text-marketplace-gray">
                Find exactly what you're looking for with our intuitive search and filters.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-marketplace-purple-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-marketplace-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-marketplace-gray-dark mb-2">Quick Setup</h3>
              <p className="text-marketplace-gray">
                Start selling your products in minutes with our streamlined process.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-marketplace-purple py-16">
        <div className="marketplace-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to start buying or selling?
            </h2>
            <p className="text-white text-lg mb-8 opacity-90">
              Join our community of buyers and sellers today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {authenticated ? (
                <Link to="/create-product" className="bg-white text-marketplace-purple font-medium px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
                  Create Your Listing
                </Link>
              ) : (
                <Link to="/sign-up" className="bg-white text-marketplace-purple font-medium px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
                  Create an Account
                </Link>
              )}
              <Link to="/products" className="bg-transparent text-white border border-white px-8 py-3 rounded-md hover:bg-white/10 transition-colors">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
