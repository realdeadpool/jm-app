import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'

// Create a Context for the cart data
const CartContext = createContext();

// CartProvider component that will wrap your app's component tree
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
  const localData = localStorage.getItem('cartItems');
  return localData ? JSON.parse(localData) : [];
});

useEffect(() => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Local Storage Error:', error);
  }
}, [cartItems]);


  // Wrapped with useCallback to prevent unnecessary re-renders
  const addToCart = useCallback((item) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((cartItem) => cartItem.id === item.id);
      return exists ? prevItems : [...prevItems, item];
    });
  }, []);

  // Wrapped with useCallback to prevent unnecessary re-renders
  const removeFromCart = useCallback((itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
  setCartItems([]);
}, []);


  // Providing cartItems, addToCart, and removeFromCart through context
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export default function useCart() {
  const context = useContext(CartContext);

  // Throw an error if useCart is used outside of CartProvider
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
