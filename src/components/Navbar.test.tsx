import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import { useCart } from '../context/CartProvider';

// Mock the useCart hook
vi.mock('../context/CartProvider', async () => {
  const actual = await vi.importActual('../context/CartProvider');
  return {
    ...actual,
    useCart: vi.fn(),
  };
});

describe('Navbar', () => {
  it('renders the brand name', () => {
    (useCart as jest.Mock).mockReturnValue({ cart: null });
    render(<Navbar />);
    const brandName = screen.getByText(/Fusion Manaba 🇪🇨/i);
    expect(brandName).toBeInTheDocument();
  });

  it('displays the total number of items in the cart', () => {
    const mockCart = {
      items: [
        { productId: 1, quantity: 2 },
        { productId: 2, quantity: 3 },
      ],
    };
    (useCart as jest.Mock).mockReturnValue({ cart: mockCart });
    render(<Navbar />);
    const cartText = screen.getByText(/Cart \(5\)/i);
    expect(cartText).toBeInTheDocument();
  });

  it('displays 0 when the cart is empty', () => {
    (useCart as jest.Mock).mockReturnValue({ cart: { items: [] } });
    render(<Navbar />);
    const cartText = screen.getByText(/Cart \(0\)/i);
    expect(cartText).toBeInTheDocument();
  });

  it('displays 0 when the cart is null', () => {
    (useCart as jest.Mock).mockReturnValue({ cart: null });
    render(<Navbar />);
    const cartText = screen.getByText(/Cart \(0\)/i);
    expect(cartText).toBeInTheDocument();
  });
});