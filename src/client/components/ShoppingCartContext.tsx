import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export type CartItem = {
  productImage: string;
  productId: number;
  sizeId: string;
  quantity: number;
  productPrice: number;
  productName: string;
};

type ShoppingCartContext = {
  increaseQuantity: (productId: number, selectedSize: string, productPrice: number, productName: string, productImage: string) => void;
  decreaseQuantity: (productId: number, selectedSize: string) => void;
  getCartItemQuantity: (productId: number, selectedSize: string) => number;
  removeFromCart: (productId: number, sizeId: string) => void;
  cartItems: CartItem[];
  totalPrice: number;
};

const DefaultShoppingCartContext: ShoppingCartContext = {
  getCartItemQuantity: () => 0,
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
  removeFromCart: () => {},
  cartItems: [],
  totalPrice: 0,
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const localStorageCart = localStorage.getItem('StarWars Shop Cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  });

  const [totalPrice, setTotalPrice] = useState(() => {
    const localStoragePrice = localStorage.getItem('tot sw pris');
    return localStoragePrice ? parseFloat(localStoragePrice) : 0;
  });

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity * item.productPrice, 0);
    setTotalPrice(total);
    localStorage.setItem('StarWars Shop Cart', JSON.stringify(cartItems));
    localStorage.setItem('tot sw pris', total.toString());
  }, [cartItems]);

  function getCartItemQuantity(productId: number, sizeId: string): number {
    const item = cartItems.find((item) => item.productId === productId && item.sizeId === sizeId);
    return item ? item.quantity : 0;
  }

  function increaseQuantity(productId: number, selectedSize: string, productPrice: number, productName: string, productImage: string) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === productId && item.sizeId === selectedSize
      );
  
      if (!existingItem) {
        return [
          ...currentItems,
          { productId, sizeId: selectedSize, quantity: 1, productPrice, productName, productImage }
        ];
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
    setCartItems((currentItems) =>
      currentItems.filter((item) => !(item.productId === productId && item.sizeId === sizeId))
    );
  }

  const contextValue = {
    getCartItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartItemCount,
    cartItems,
    totalPrice
  };

  return (
    <ShoppingCartContext.Provider value={contextValue}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
