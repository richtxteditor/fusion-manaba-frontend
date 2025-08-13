
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CartProvider, useCart } from './CartProvider';
import { getCart, addToCart, removeFromCart, updateCartItem } from '../services/apiService';
import { type ReactNode } from 'react';

// Mock the apiService
vi.mock('../services/apiService', () => ({
  getCart: vi.fn(),
  addToCart: vi.fn(),
  removeFromCart: vi.fn(),
  updateCartItem: vi.fn(),
}));

const mockCart = {
  id: 1,
  items: [{ product: { id: 1, name: 'Product 1', price: '10.00', description: '', image_url: '' }, quantity: 1 }],
  total_price: '10.00',
};

const TestComponent = () => {
  const { cart, addItem, updateItem, removeItem } = useCart();
  return (
    <div>
      <div data-testid="cart-items">{JSON.stringify(cart?.items)}</div>
      <button onClick={() => addItem(2, 1)}>Add Item</button>
      <button onClick={() => updateItem(1, 2)}>Update Item</button>
      <button onClick={() => removeItem(1)}>Remove Item</button>
    </div>
  );
};

describe('CartProvider', () => {
  it('fetches the cart on mount', async () => {
    // Arrange
    vi.mocked(getCart).mockResolvedValue(mockCart);

    // Act
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('cart-items')).toHaveTextContent(JSON.stringify(mockCart.items));
    });
  });

  it('adds an item to the cart', async () => {
    // Arrange
    vi.mocked(getCart).mockResolvedValue(mockCart);
    const updatedCart = { ...mockCart, items: [...mockCart.items, { product: { id: 2, name: 'Product 2', price: '20.00', description: '', image_url: '' }, quantity: 1 }] };
    vi.mocked(addToCart).mockResolvedValue(updatedCart);

    // Act
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await waitFor(() => screen.getByText('Add Item').click());

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('cart-items')).toHaveTextContent(JSON.stringify(updatedCart.items));
    });
  });

  it('updates an item in the cart', async () => {
    // Arrange
    vi.mocked(getCart).mockResolvedValue(mockCart);
    const updatedCart = { ...mockCart, items: [{ ...mockCart.items[0], quantity: 2 }] };
    vi.mocked(updateCartItem).mockResolvedValue(updatedCart);

    // Act
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await waitFor(() => screen.getByText('Update Item').click());

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('cart-items')).toHaveTextContent(JSON.stringify(updatedCart.items));
    });
  });

  it('removes an item from the cart', async () => {
    // Arrange
    vi.mocked(getCart).mockResolvedValue(mockCart);
    const updatedCart = { ...mockCart, items: [] };
    vi.mocked(removeFromCart).mockResolvedValue(updatedCart);

    // Act
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    await waitFor(() => screen.getByText('Remove Item').click());

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('cart-items')).toHaveTextContent(JSON.stringify(updatedCart.items));
    });
  });

  it('throws an error if useCart is used outside of a CartProvider', () => {
    // Arrange
    const spy = vi.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    // Act & Assert
    expect(() => render(<TestComponent />)).toThrow('useCart must be used within a CartProvider');

    spy.mockRestore();
  });
});
