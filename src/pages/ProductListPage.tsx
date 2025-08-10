// src/pages/ProductListPage.tsx (The CORRECT, simplified version)

import { useState, useEffect } from 'react';
import { type Product, getProducts } from '../services/apiService';
import ProductCard from '../components/ProductCard';

// It's good practice to rename the function to match the file name.
function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products. Is the Django API server running?');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Conditional rendering for loading and error states.
  if (loading) {
    return <div className="text-center p-10 text-xl dark:text-gray-300">Loading delicious baked goods... 🧁</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-xl text-red-600">Error 🛑: {error}</div>;
  }

  // Render ONLY the grid. The Layout component provides the rest.
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">Fusion Manaba</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Home-Baked Goods with Love</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductListPage;