// The new, correct version
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCart } from '../context/CartProvider';
import AddToCartButton from './AddToCartButton';

// Mock the useCart hook
vi.mock('../context/CartProvider');

describe('AddToCartButton', () => {
  // Let TypeScript infer the type from the mock itself.
  // This is more robust and less tied to a specific framework's types.
  const mockAddItem = vi.fn(); 

  beforeEach(() => {
    // Clear any previous mock calls before each test
    mockAddItem.mockClear(); 

    vi.mocked(useCart).mockReturnValue({
      cart: null,
      loading: false,
      addItem: mockAddItem,
      updateItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('calls addItem when clicked', () => {
    render(<AddToCartButton productId={1} />);
    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);
    expect(mockAddItem).toHaveBeenCalledWith(1, 1);
  });
});