import React, { createContext, useContext, ReactNode, useState } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  productId: number;
  sizeId: number;
  quantity: number;
};

type ShoppingCartContext = {
  getCartItemQuantity: (productId: number, sizeId: number) => number;
  increaseQuantity: (productId: number, sizeId: number) => void;
  decreaseQuantity: (productId: number, sizeId: number) => void;
  removeFromCart: (productId: number, sizeId: number) => void;
};

const DefaultShoppingCartContext: ShoppingCartContext = {
  getCartItemQuantity: () => 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
};

const ShoppingCartContext = createContext<ShoppingCartContext | undefined>(undefined);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
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

  const contextValue = {
    getCartItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
