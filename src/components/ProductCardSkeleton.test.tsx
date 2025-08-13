import { render, screen } from '@testing-library/react';
import ProductCardSkeleton from './ProductCardSkeleton';

describe('ProductCardSkeleton', () => {
  it('renders without crashing and has correct accessibility attributes', () => {
    render(<ProductCardSkeleton />);

    // The component should have a role of "status" to indicate it's a loading region.
    const skeleton = screen.getByRole('status');
    expect(skeleton).toBeInTheDocument();

    // It should also have an aria-label to describe what is loading.
    expect(skeleton).toHaveAttribute('aria-label', 'Loading product');
  });
});
