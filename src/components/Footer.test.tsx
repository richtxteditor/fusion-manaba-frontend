import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the copyright and made with love text', () => {
    render(<Footer />);

    // Check for the copyright notice
    expect(screen.getByText(/© 2025 Fusion Manaba. All Rights Reserved./i)).toBeInTheDocument();

    // Check for the "Made with love" text
    expect(screen.getByText(/Made with ❤️ in Ecuador/i)).toBeInTheDocument();
  });
});
