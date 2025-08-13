import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// --- Product Interfaces ---
export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: string;
  is_available: boolean;
  category: Category;
}

// --- NEW: Cart Interfaces ---
export interface CartItem {
  product: Product;
  quantity: number;
  total_price: string;
}

export interface Cart {
  cart_items: CartItem[];
  total_price: string;
}

// --- Product Functions ---
export const getProducts = async (signal: AbortSignal): Promise<Product[]> => {
  const response = await apiClient.get('/products/', { signal });
  return response.data;
};

// --- NEW: Cart API Functions ---

export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get('/cart/');
  return response.data;
};

export const addToCart = async (productId: number, quantity: number): Promise<Cart> => {
  const response = await apiClient.post('/cart/add/', {
    product_id: productId,
    quantity: quantity,
  });
  return response.data;
};

export const updateCartItem = async (productId: number, quantity: number): Promise<Cart> => {
  const response = await apiClient.post('/cart/update/', {
    product_id: productId,
    quantity: quantity,
  });
  return response.data;
};

export const removeFromCart = async (productId: number): Promise<Cart> => {
  const response = await apiClient.post('/cart/remove/', {
    product_id: productId,
  });
  return response.data;
};