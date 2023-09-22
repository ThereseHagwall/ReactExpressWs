import React, { createContext, useContext, ReactNode, useState } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  productId: number;
  sizeId: string;
  quantity: number;
};

type ShoppingCartContext = {
  increaseQuantity: (productId: number, selectedSize: string) => void;
  decreaseQuantity:(productId: number, selectedSize:string) => void;
  getCartItemQuantity:(productId: number, selectedSize: string) => number;
  removeFromCart: (productId: number, sizeId: string) => void;
};

const DefaultShoppingCartContext: ShoppingCartContext = {
  getCartItemQuantity: () => 0,
  increaseQuantity: () => { },
  decreaseQuantity: () => { },
  removeFromCart: () => { },
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
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);


  function getCartItemQuantity(productId: number, sizeId: string): number {
    const item = cartItems.find((item) => item.productId === productId && item.sizeId === sizeId);
    return item ? item.quantity : 0;
  }


  function increaseQuantity(productId: number, selectedSize: string) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId && item.sizeId === selectedSize
      );
  
      if (!existingItem) {
        return [...currentItems, { productId, sizeId: selectedSize, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.productId === productId && item.sizeId === selectedSize) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  
  function decreaseQuantity(productId: number, selectedSize: string) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId && item.sizeId === selectedSize
      );
  
      if (existingItem && existingItem.quantity === 1) {
        return currentItems.filter(
          (item) => !(item.productId === productId && item.sizeId === selectedSize)
        );
      } else {
        return currentItems.map((item) => {
          if (item.productId === productId && item.sizeId === selectedSize) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  


  function removeFromCart(productId: number, sizeId: string) {
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
    cartItemCount,
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
