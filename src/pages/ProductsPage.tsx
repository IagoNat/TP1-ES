
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductGrid from '@/components/products/ProductGrid';
import CategoryFilter from '@/components/products/CategoryFilter';
import { getAllProducts } from '@/services/products';
import { Product, ProductCategory } from '@/types/marketplace';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(
    (searchParams.get('category') as ProductCategory) || null
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        filterProducts(allProducts, selectedCategory, searchQuery);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (searchQuery) params.set('search', searchQuery);
    setSearchParams(params);
    
    // Apply filters
    filterProducts(products, selectedCategory, searchQuery);
  }, [selectedCategory, searchQuery]);
  
  const filterProducts = (
    products: Product[],
    category: ProductCategory | null,
    query: string
  ) => {
    let filtered = [...products];
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    // Apply search filter
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(
        product =>
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredProducts(filtered);
  };
  
  const handleCategorySelect = (category: ProductCategory | null) => {
    setSelectedCategory(category);
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The actual filtering is handled in the useEffect
  };
  
  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold text-marketplace-gray-dark mb-8">
          Browse Products
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar / Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form onSubmit={handleSearch} className="mb-6">
                <label htmlFor="search" className="block text-sm font-medium text-marketplace-gray-dark mb-1">
                  Search Products
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-marketplace-purple"
                    placeholder="Search by name..."
                  />
                  <button 
                    type="submit" 
                    className="bg-marketplace-purple text-white px-4 py-2 rounded-r-md hover:bg-marketplace-purple-dark transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                  </button>
                </div>
              </form>
              
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProductsPage;
