import React, { createContext, useContext, ReactNode, useState } from 'react'

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number,
  increaseQuantity: (id: number) => void,
  decreaseQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
  cartItemCount: number;
}

type CartItem = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext )

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider( { children }: 
  ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseQuantity(id: number){
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id) == null){
        return [...currentItems, {id, quantity: 1}]
      } else {
        return currentItems.map(item => {
          if (item.id === id){
            return {...item, quantity: item.quantity + 1}
          } else {
            return item
          }
        })
          } 
    })
  }

  function decreaseQuantity(id: number){
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?.quantity === 1){
        return currentItems.filter(item => item.id !== id)
      } else {
        return currentItems.map(item => {
          if (item.id === id){
            return {...item, quantity: item.quantity - 1}
          } else {
            return item
          }
        })
          } 
    })
  }

  function removeFromCart(id: number){
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    }) 
  }

  return( 
  <ShoppingCartContext.Provider value={{ getItemQuantity, increaseQuantity, decreaseQuantity, removeFromCart, cartItemCount }} >
    {children}
  </ShoppingCartContext.Provider>)
}
