
import React from 'react';
import { productCategories, ProductCategory } from '@/types/marketplace';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | null;
  onSelectCategory: (category: ProductCategory | null) => void;
}

const CategoryFilter = ({ selectedCategory, onSelectCategory }: CategoryFilterProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-marketplace-gray-dark mb-4">Categories</h3>
      
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`category-chip ${selectedCategory === null ? 'active' : ''}`}
        >
          All Categories
        </button>
        
        {productCategories.map(category => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`category-chip ${selectedCategory === category ? 'active' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
