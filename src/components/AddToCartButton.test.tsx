import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCart } from '../context/CartProvider';
import AddToCartButton from './AddToCartButton';

// Mock the useCart hook
vi.mock('../context/CartProvider');

describe('AddToCartButton', () => {
  const mockAddItem = vi.fn();

  beforeEach(() => {
    mockAddItem.mockClear();
    // Provide a complete context object to avoid potential type errors
    vi.mocked(useCart).mockReturnValue({
      cart: null,
      loading: false,
      addItem: mockAddItem,
      updateItem: vi.fn(),
      removeItem: vi.fn(),
    });
  });

  it('renders the button in its default state', () => {
    render(<AddToCartButton productId={1} />);
    // Check that the button is initially ready to be clicked
    expect(screen.getByRole('button', { name: /add item to cart/i })).toBeInTheDocument();
  });

  it('calls addItem and shows loading/success states when clicked', async () => {
    // 1. Make the test async
    render(<AddToCartButton productId={1} />);
    
    const button = screen.getByRole('button', { name: /add item to cart/i });

    // 2. Wrap the click event in a `waitFor` block.
    // This ensures the test waits for all state updates triggered by the click to finish.
    await waitFor(async () => {
      await fireEvent.click(button);
    });

    // 3. Assert the outcome
    expect(mockAddItem).toHaveBeenCalledWith(1, 1);
    
    // Optional: You can even test the success state
    expect(screen.getByRole('button', { name: /item added to cart/i })).toBeInTheDocument();
  });
});