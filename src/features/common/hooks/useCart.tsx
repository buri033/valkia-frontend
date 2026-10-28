'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  priceFmt: string;
  image: string;
  qty: number;
}

interface CartContextType {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: { id: string; name: string; price: number; priceFmt?: string; image: string }) => void;
  updateQty: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  totalCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('valkia_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error cargando carrito:', e);
    }
  }, []);

  const saveCartToStorage = (newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem('valkia_cart', JSON.stringify(newCart));
    } catch (e) {
      console.error('Error guardando carrito:', e);
    }
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = useCallback((product: { id: string; name: string; price: number; priceFmt?: string; image: string }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        updated = [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            priceFmt: product.priceFmt || `$${product.price.toLocaleString('es-CO')}`,
            image: product.image.startsWith('/') ? product.image : `/${product.image}`,
            qty: 1,
          },
        ];
      }
      try {
        localStorage.setItem('valkia_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((productId: string, delta: number) => {
    setCart((prevCart) => {
      const updated = prevCart
        .map((item) => {
          if (item.id === productId) {
            const nextQty = item.qty + delta;
            return nextQty > 0 ? { ...item, qty: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      try {
        localStorage.setItem('valkia_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => item.id !== productId);
      try {
        localStorage.setItem('valkia_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  }, []);

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        updateQty,
        removeFromCart,
        totalCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de CartProvider');
  }
  return context;
};
