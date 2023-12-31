import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Product } from './AdminView';
import { ChangeCartBtns } from './ChangeCartBtns';

interface Props {
  productId: string;
}

export interface ProductId {
  _id: string;
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

const FetchSingleProduct: React.FC<Props> = ({ productId }) => {
  const { productId: routeProductId } = useParams<{ productId: string | undefined }>();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [productSizes, setProductSizes] = useState<ProductSize[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const resolvedProductId = routeProductId || productId;

  useEffect(() => {
    fetch(`http://localhost:3000/product/products/${resolvedProductId}`)
      .then((response) => response.json())
      .then((data) => setSingleProduct(data))
      .catch((error) => console.error('Error fetching Product:', error));

    fetch(`http://localhost:3000/product/${resolvedProductId}`)
      .then((response) => response.json())
      .then((data) => setProductSizes(data))
      .catch((error) => console.error('Error fetching Product Sizes:', error));
  }, [resolvedProductId]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

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
              maxWidth: '300px',
              maxHeight: '300px',
              borderRadius: '10px',
            }}
            src={singleProduct.productImage}
            alt="product image" ></Box>
          <p>{singleProduct.productPrice} kr</p>
          <ChangeCartBtns product={singleProduct ? { ...singleProduct, selectedSize: selectedSize || '' } : null} productName={singleProduct.productName} productImage={singleProduct.productImage} />
          <p>{singleProduct.productMaterial}</p>
          <br />
        </Box>
      )}
    </Box>
  );
};

export default FetchSingleProduct;