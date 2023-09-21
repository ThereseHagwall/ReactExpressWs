import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext';

interface CartItem {
  product: Product | null;
}

interface Product {
  _id: string | number;
  sizes: string[];
  // ... other product properties ...
}

const primary = {
  main: '#1B1B1E',
  contrastText: '#FFE81F',
  alert: '#951111',
  alertText: '#ffffff',
};

export function ChangeCartBtns({ product }: CartItem) {
    const {
      getCartItemQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
    } = useShoppingCart();
  
    const { _id, sizes } = product;
    const [selectedSize, setSelectedSize] = useState<string>('');
  
    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSize(event.target.value);
    };
  
    const addToCart = () => {
      if (selectedSize) {
        // Ensure that both productId and size are numbers
        const size: number = parseInt(selectedSize, 10);
        const productId: number = typeof _id === 'string' ? parseInt(_id, 10) : _id;
  
        // Add the product to the cart with the selected size
        increaseQuantity(productId, size);
      }
    };
  
    // Declare productId and sizeId here within the scope of the return statement
    const productId: number = typeof _id === 'string' ? parseInt(_id, 10) : _id;
    const sizeId: number = parseInt(selectedSize, 10);
  

  return (
    <>
      <label htmlFor="sizeDropdown">Storlek:</label>
      <select id="sizeDropdown" value={selectedSize} onChange={handleSizeChange}>
        <option value="">Välj storlek</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {getCartItemQuantity(productId, sizeId) === 0 ? (
        <Button
          sx={{
            backgroundColor: primary.main,
            color: primary.contrastText,
          }}
          variant="contained"
          onClick={addToCart}
        >
          Lägg till i kundvagnen
        </Button>
        ) : (
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: primary.main,
                  color: primary.contrastText,
                }}
                onClick={() => decreaseQuantity(productId, sizeId)}
              >
                -
              </Button>
              <p>{getCartItemQuantity(productId, sizeId)} st</p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: primary.main,
                  color: primary.contrastText,
                }}
                onClick={() => increaseQuantity(productId, sizeId)}
              >
                +
              </Button>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: primary.alert,
                color: primary.alertText,
              }}
              onClick={() => removeFromCart(productId, sizeId)}
            >
              Ta bort
            </Button>
          </div>
        )}
      </>
    );
  }
  