import React from 'react'
import { Product } from './FetchProducts';
import { Box, Button } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext';

interface CartItem {
  product: Product;
  
}

const primary = {
    main: '#1B1B1E',
    contrastText: '#FFE81F',
    alert: '#951111',
    alertText: '#ffffff'
  };

export function ChangeCartBtns( {product}:CartItem ) {
    const {
        getItemQuantity, 
        increaseQuantity, 
        decreaseQuantity, 
        removeFromCart 
      } = useShoppingCart()

      const productId = typeof product._id === 'string' ? parseInt(product._id, 10) : product._id;

      const quantity = getItemQuantity(productId);
    
  return (
    <>
        <Box>
            <div>
                {quantity === 0 ? (
                    <Button 
                    sx={{
                        backgroundColor: primary.main,
                        color: primary.contrastText
                    }}
                    variant="contained" 
                    onClick={() => increaseQuantity(productId)} > Add to cart </Button>
                ) : <div>
                    <Box>
                        <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: primary.main,
                            color: primary.contrastText
                        }}
                        onClick={() => decreaseQuantity(productId)}>-</Button>
                        <p>{quantity} st</p>
                        <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: primary.main,
                            color: primary.contrastText
                        }}
                        onClick={() => increaseQuantity(productId)}>+</Button>
                        <Button 
                        variant="contained" 
                        sx={{
                            backgroundColor: primary.alert,
                            color: primary.alertText

                        }}
                        onClick={() => removeFromCart(productId)} >Remove</Button>
                    </Box>
                </div> }
            </div>
        </Box>
    </>
  )
}
