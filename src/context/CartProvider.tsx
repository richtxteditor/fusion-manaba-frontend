import { createContext, useState, useEffect, useContext, type ReactNode } from 'react';
import { type Cart, getCart, addToCart, removeFromCart, updateCartItem } from '../services/apiService';

// Define the shape of the context's value
interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateItem: (productId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch initial cart state on mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const initialCart = await getCart();
        setCart(initialCart);
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Define functions to modify the cart
  const addItem = async (productId: number, quantity: number) => {
    const updatedCart = await addToCart(productId, quantity);
    setCart(updatedCart);
  };

  const updateItem = async (productId: number, quantity: number) => {
    const updatedCart = await updateCartItem(productId, quantity);
    setCart(updatedCart);
  };

  const removeItem = async (productId: number) => {
    const updatedCart = await removeFromCart(productId);
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, loading, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for easy access to the context
// FIX #3: Disable the ESLint warning for this line.
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};