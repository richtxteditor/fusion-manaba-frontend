import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { CartProvider } from '../context/CartProvider';

// A dummy component to render inside the Outlet
const DummyChild = () => <div>Outlet Content</div>;

describe('Layout', () => {
  it('renders the Navbar, Footer, and the Outlet content', () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<DummyChild />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // Check for Navbar content (using the brand name from its own test)
    expect(screen.getByText(/Fusion Manaba 🇪🇨/i)).toBeInTheDocument();

    // Check for the content rendered by the Outlet
    expect(screen.getByText('Outlet Content')).toBeInTheDocument();

    // Check for Footer content (using the copyright from its own test)
    expect(
      screen.getByText(/© 2025 Fusion Manaba. All Rights Reserved./i)
    ).toBeInTheDocument();
  });
});
