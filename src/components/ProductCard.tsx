// src/components/ProductCard.tsx (Corrected Version)

import { type Product } from '../services/apiService';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-6 pb-20 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {product.name}
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {product.category.name}
      </p>
      <p className="mb-6 min-h-[72px] text-gray-700 dark:text-gray-300">
        {product.description || 'A delicious treat, crafted with care.'}
      </p>
      <div className="text-3xl font-bold text-right text-green-700 dark:text-green-500">
        ${product.price}
      </div>

      <AddToCartButton productId={product.id} aria-label={`Add ${product.name} to cart`} />
    </div>
  );
};

export default ProductCard;