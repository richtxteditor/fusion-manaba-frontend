import { type Product } from '../services/apiService';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
        {product.name}
      </h2>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {product.category.name}
      </p>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        {product.description || 'A delicious treat, crafted with care.'}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-3xl font-bold text-green-700 dark:text-green-500">
          ${product.price}
        </div>
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
};

export default ProductCard;