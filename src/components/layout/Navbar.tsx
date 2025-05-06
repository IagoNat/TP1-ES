
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { getCurrentUser, isAuthenticated, signOut } from '@/services/auth';

const Navbar = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const currentUser = getCurrentUser();
  const authenticated = isAuthenticated();
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="marketplace-container py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-marketplace-purple">
              EcoMarket
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
              Products
            </Link>
            {authenticated ? (
              <>
                <Link to="/my-products" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
                  My Products
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
                    {currentUser?.name}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors">
                  Sign In
                </Link>
                <Link to="/sign-up" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-marketplace-gray-dark">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors py-2">
                Home
              </Link>
              <Link to="/products" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors py-2">
                Products
              </Link>
              {authenticated ? (
                <>
                  <Link to="/my-products" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors py-2">
                    My Products
                  </Link>
                  <Link to="/profile" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors py-2">
                    Profile
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-left text-marketplace-gray-dark hover:text-marketplace-purple transition-colors py-2"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/sign-in" className="text-marketplace-gray-dark hover:text-marketplace-purple transition-colors py-2">
                    Sign In
                  </Link>
                  <Link to="/sign-up" className="btn-primary inline-block w-full text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
