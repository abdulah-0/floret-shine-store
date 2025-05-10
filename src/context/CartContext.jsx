// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, qty = 1) => {
    setCartItems(items => {
      const idx = items.findIndex(i => i.id === product.id);
      if (idx > -1) {
        return items.map((i, j) =>
          j === idx ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...items, { ...product, quantity: qty }];
    });
  };

  const decreaseQuantity = productId => {
    setCartItems(items =>
      items.flatMap(item => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return [{ ...item, quantity: item.quantity - 1 }];
          }
          // if quantity === 1, remove the item entirely
          return [];
        }
        return [item];
      })
    );
  };

  const removeFromCart = productId => {
    setCartItems(items => items.filter(i => i.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
