import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext';

interface CartItem {
  product: Product | null;
}

interface Product {
  _id: string | number;
  sizes?: string[]; // Make sizes property optional
  // ... other product properties ...
  selectedSize?: string; // Add selectedSize property
}

interface ProductSize {
  _id: string;
  sizeName: string;
  quantity: string;
}

const primary = {
    main: '#1B1B1E',
    contrastText: '#FFE81F',
    alert: '#FF0000',
    alertText: '#FFFFFF',
  };

export function ChangeCartBtns({ product }: CartItem) {
  const {
    getCartItemQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShoppingCart();

  if (!product) {
    // Handle the case where product is null (optional)
    return null; // Or render an appropriate component
  }

  const { _id, selectedSize: initialSelectedSize } = product; // Destructure selectedSize

  const [selectedSize, setSelectedSize] = useState<string>(initialSelectedSize || '');

  // Assuming you have productSizes available in this component
  const [productSizes, setProductSizes] = useState<ProductSize[]>([]);

  // Fetch product sizes for the single product from your Express backend
  useEffect(() => {
    // Fetch product sizes based on the productId
    fetch(`http://localhost:3000/product/${_id}`)
      .then((response) => response.json())
      .then((data) => setProductSizes(data))
      .catch((error) => console.error('Error fetching Product Sizes:', error));
  }, [_id]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
  };

  const addToCart = () => {
    try {
      if (selectedSize) {
        // Ensure that both productId and size are numbers
        const size: number = parseInt(selectedSize, 10);
        const productId: number = typeof _id === 'string' ? parseInt(_id, 10) : _id;
  
        // Add the product to the cart with the selected size
        increaseQuantity(productId, size);
      }
    } catch (error) {
      console.error('Error in addToCart:', error);
    }
  };

  const productId: number = typeof _id === 'string' ? parseInt(_id, 10) : _id;
  const sizeId: number = parseInt(selectedSize, 10);

  return (
    <>
      <label htmlFor="sizeDropdown">Storlek:</label>
      <select id="sizeDropdown" value={selectedSize} onChange={handleSizeChange}>
        <option value="">Välj storlek</option>
        {productSizes.map((productSize, index) => (
          <option key={index} value={productSize.sizeName}>
            {productSize.sizeName} {productSize.quantity} st
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
