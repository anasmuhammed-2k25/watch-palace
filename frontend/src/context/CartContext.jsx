import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from local storage on initial mount
  const [cart, setCart] = useState(() => {
    try {
      const localData = localStorage.getItem("cartItems");
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Failed to parse cart local storage", error);
      return [];
    }
  });

  // Keep local storage synced whenever cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  // Add Item
  const addToCart = (product) => {
    // Check if the exact product exists
    const existing = cart.find((item) => item._id === product._id);
    
    if (existing) {
      // increase qty
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // add new
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };


  // Calculate totals
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
