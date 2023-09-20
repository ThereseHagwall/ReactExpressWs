import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './FetchProducts';
import { Box, Button } from '@mui/material';

export interface ProductId {
    _id: string;
  }

interface Props {
  productId: string;
}

const primary = {
  main: '#1B1B1E',
  contrastText: '#FFE81F',
};


const FetchSingleProduct: React.FC<Props> = ({ productId }) => {
  const { productId: routeProductId } = useParams<{ productId: string | undefined }>();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const resolvedProductId = routeProductId || productId;

  useEffect(() => {
    // Fetch the single product from your Express backend using the resolvedProductId
    fetch(`http://localhost:3000/product/products/${resolvedProductId}`)
      .then((response) => response.json())
      .then((data) => setSingleProduct(data))
      .catch((error) => console.error('Error fetching Product:', error));
  }, [resolvedProductId]);

  return (
    <Box 
    sx={{ 
      width: '100%'
     }}>
      {singleProduct && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}>
          <h2>{singleProduct.productName}</h2>
          <p>{singleProduct.productDescription}</p>
          <Box 
          component="img"
          sx={{
            maxWidth: '90%',
            maxHeight: '50%',
            borderRadius: '10px',
            }}
          src={singleProduct.productImage}
          alt="product image" ></Box>
          <p>{singleProduct.productPrice} €</p>
          <Button 
              variant="contained"  
              sx={{
              backgroundColor: primary.main,
              color: primary.contrastText,
            }}>
            Add to cart
            </Button>
          <p>{singleProduct.productMaterial}</p>
          <br />
        </Box>
      )}
    </Box>
  );
};

export default FetchSingleProduct;
