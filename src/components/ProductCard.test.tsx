import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { type Product } from '../services/apiService';
import { CartProvider } from '../context/CartProvider';

// 1. Mock Product Data
const mockProduct: Product = {
  id: 1,
  name: 'Empanada de Verde',
  slug: 'empanada-de-verde',
  description: 'A traditional Ecuadorian plantain empanada, filled with cheese.',
  price: '2.50',
  is_available: true,
  category: {
    id: 1,
    name: 'Appetizers',
    slug: 'appetizers',
  },
};

describe('ProductCard', () => {
  // Test 1: Ensures the component renders the basic product information correctly.
  it('renders product details correctly', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Empanada de Verde')).toBeInTheDocument();
    expect(screen.getByText('Appetizers')).toBeInTheDocument();
    expect(
      screen.getByText(
        'A traditional Ecuadorian plantain empanada, filled with cheese.'
      )
    ).toBeInTheDocument();
    // Prices are prefixed with ' in the component
    expect(screen.getByText('$2.50')).toBeInTheDocument();
  });

  // Test 2: Verifies the fallback description is used when none is provided.
  it('renders a fallback description when none is provided', () => {
    const productWithoutDescription = { ...mockProduct, description: '' };
    render(
      <CartProvider>
        <ProductCard product={productWithoutDescription} />
      </CartProvider>
    );

    expect(
      screen.getByText('A delicious treat, crafted with care.')
    ).toBeInTheDocument();
  });

  // Test 3: Security test to ensure HTML/script tags are not rendered.
  it('renders potentially malicious product names as plain text', () => {
    const maliciousProduct: Product = {
      ...mockProduct,
      name: 'Malicious <script>alert("XSS")</script> Product',
    };
    render(
      <CartProvider>
        <ProductCard product={maliciousProduct} />
      </CartProvider>
    );

    // The text, including the tags, should be present as a literal string.
    expect(
      screen.getByText('Malicious <script>alert("XSS")</script> Product')
    ).toBeInTheDocument();

    // Crucially, queryByRole should NOT find a 'script' element.
    // This confirms React is escaping the string and not rendering an actual script tag.
    expect(screen.queryByRole('script')).not.toBeInTheDocument();
  });
});
