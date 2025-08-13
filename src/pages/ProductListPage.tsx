// src/pages/ProductListPage.tsx (The final, correct version for full-bleed error)

import { useState, useEffect } from 'react';
import { type Product, getProducts } from '../services/apiService';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const data = await getProducts(signal);
        setProducts(data);
      } catch (err) {
        if (signal.aborted) return; // Ignore abort errors
        setError('Failed to fetch products. Is the Django API server running?');
        console.error(err);
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  // --- THIS IS THE KEY CHANGE ---
  // We now handle loading and error states with full-page returns again,
  // but the error state is styled to fill the viewport.

  if (loading) {
    // The skeleton loader should exist within the main content structure
    // so we render the header first, then the skeletons.
    return (
      <>
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200">Fusion Manaba</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Home-Baked Goods with Love</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    // For the error, we return a completely different layout.
    // This div is designed to be a flex container that centers its content
    // both vertically and horizontally within the available space.
    // 'flex-grow' makes it take up all the space between the Navbar and Footer.
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-6 py-8 rounded-lg max-w-md">
          <h3 className="font-bold text-2xl">Something went wrong!</h3>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // --- SUCCESS STATE ---
  // The successful render is the same as before.
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