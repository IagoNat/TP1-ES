
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductForm from '@/components/products/ProductForm';
import { isAuthenticated } from '@/services/auth';

const CreateProductPage = () => {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return (
    <MainLayout>
      <div className="marketplace-container py-8">
        <h1 className="text-3xl font-bold text-marketplace-gray-dark mb-8">
          Create a New Product
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <ProductForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default CreateProductPage;