import React, { createContext, useContext, ReactNode, useState } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getCartItemQuantity: (productId: number, sizeId: number) => number;
  increaseQuantity: (productId: number, sizeId: number) => void;
  decreaseQuantity: (productId: number, sizeId: number) => void;
  removeFromCart: (productId: number, sizeId: number) => void;
};

type CartItem = {
  productId: number;
  sizeId: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getCartItemQuantity(productId: number, sizeId: number) {
    return (
      cartItems.find((item) => item.productId === productId && item.sizeId === sizeId)?.quantity || 0
    );
  }

  function increaseQuantity(productId: number, sizeId: number) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId && item.sizeId === sizeId
      );

      if (!existingItem) {
        return [...currentItems, { productId, sizeId, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.productId === productId && item.sizeId === sizeId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseQuantity(productId: number, sizeId: number) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId && item.sizeId === sizeId
      );

      if (existingItem && existingItem.quantity === 1) {
        return currentItems.filter(
          (item) => !(item.productId === productId && item.sizeId === sizeId)
        );
      } else {
        return currentItems.map((item) => {
          if (item.productId === productId && item.sizeId === sizeId) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(productId: number, sizeId: number) {
    setCartItems((currentItems) => {
      return currentItems.filter(
        (item) => !(item.productId === productId && item.sizeId === sizeId)
      );
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{ getCartItemQuantity, increaseQuantity, decreaseQuantity, removeFromCart }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
