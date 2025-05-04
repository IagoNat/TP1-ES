'use client';
import CategoryFilter from './CategoryFilter';

const Navbar: React.FC = () => {
  return (
    <nav>
      <h1>Marketplace</h1>
      <CategoryFilter />
    </nav>
  );
};

export default Navbar;
