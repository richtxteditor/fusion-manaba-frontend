import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorPage from './pages/ErrorPage';  
import Layout from './components/Layout.tsx';
import ProductListPage from './pages/ProductListPage.tsx';
import { CartProvider } from './context/CartProvider.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      // --- Future Pages Will Be Added Here ---
      // {
      //   path: 'products/:slug',
      //   element: <ProductDetailPage />, 
      // },
      // {
      //   path: 'cart',
      //   element: <CartPage />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      {/* The RouteProvider component now controls what is displayed */}
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);