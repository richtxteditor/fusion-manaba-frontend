// src/pages/ProductListPage.test.tsx (The final, warning-free version)

import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ProductListPage from './ProductListPage';
import { getProducts } from '../services/apiService';
import { CartProvider } from '../context/CartProvider';

// Mock the entire apiService module
vi.mock('../services/apiService', () => ({
  getProducts: vi.fn(),
  getCart: vi.fn().mockResolvedValue({ cart_items: [], total_price: '0.00' }),
}));

// A helper function to avoid repeating the render setup
const renderComponent = () => {
  render(
    <MemoryRouter>
      <CartProvider>
        <ProductListPage />
      </CartProvider>
    </MemoryRouter>
  );
};

describe('ProductListPage', () => {
  // --- THIS IS THE FIX ---
  // The test is now async and uses waitFor.
  it('renders the loading state initially', async () => {
    // Arrange: Mock getProducts to never resolve
    vi.mocked(getProducts).mockReturnValue(new Promise(() => {}));

    // Act
    renderComponent();

    // Assert: Use waitFor to ensure all initial effects (like getCart) have settled.
    // We can wait for the skeletons to appear, which is the expected initial state.
    await waitFor(() => {
      expect(screen.getAllByTestId('product-card-skeleton')).toHaveLength(6);
    });
    
    // You can add other assertions here to be extra sure
    expect(screen.queryByText('Flan')).not.toBeInTheDocument();
  });

  it('renders the product list when the API call is successful', async () => {
    // Arrange: Create mock data that perfectly matches the 'Product' interface.
    const mockProducts = [
      { id: 1, name: 'Flan', slug: 'flan', description: 'A delicious dessert', price: '60.00', is_available: true, category: { id: 1, name: 'Desserts', slug: 'desserts' } },
      { id: 2, name: 'Cheese Arepas', slug: 'cheese-arepas', description: 'A tasty snack', price: '12.00', is_available: true, category: { id: 2, name: 'Arepas', slug: 'arepas' } },
    ];
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    // Act
    renderComponent();

    // Assert: Wait for the product names to appear on the screen.
    await waitFor(() => {
      expect(screen.getByText('Flan')).toBeInTheDocument();
    });

    expect(screen.getByText('Cheese Arepas')).toBeInTheDocument();
    expect(screen.queryByTestId('product-card-skeleton')).not.toBeInTheDocument();
  });

  it('renders the error message when the API call fails', async () => {
    // Arrange: Mock a rejected promise.
    vi.mocked(getProducts).mockRejectedValue(new Error('API Error'));

    // Act
    renderComponent();

    // Assert: Wait for the error message to appear.
    await waitFor(() => {
      expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
    });
    
    expect(screen.getByText(/Failed to fetch products/i)).toBeInTheDocument();
  });
});