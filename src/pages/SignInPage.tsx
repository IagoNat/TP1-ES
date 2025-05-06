
import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SignInForm from '@/components/auth/SignInForm';
import { isAuthenticated } from '@/services/auth';

const SignInPage = () => {
  const authenticated = isAuthenticated();
  
  if (authenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <MainLayout>
      <div className="marketplace-container py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm">
          <SignInForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default SignInPage;
