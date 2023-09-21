import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Product } from './FetchProducts';
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
};

const FetchSingleProduct: React.FC<Props> = ({ productId }) => {
  const { productId: routeProductId } = useParams<{ productId: string | undefined }>();
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [productSizes, setProductSizes] = useState<ProductSize[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const resolvedProductId = routeProductId || productId;

  useEffect(() => {
    // Fetch the single product from your Express backend using the resolvedProductId
    fetch(`http://localhost:3000/product/products/${resolvedProductId}`)
      .then((response) => response.json())
      .then((data) => setSingleProduct(data))
      .catch((error) => console.error('Error fetching Product:', error));

    // Fetch product sizes for the single product from your Express backend using the resolvedProductId
    fetch(`http://localhost:3000/product/${resolvedProductId}`)
      .then((response) => response.json())
      .then((data) => setProductSizes(data))
      .catch((error) => console.error('Error fetching Product Sizes:', error));
  }, [resolvedProductId]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  };

  // ...
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
        <label htmlFor="sizeDropdown">Storlek:</label>
        <select id="sizeDropdown" value={selectedSize || ''} onChange={handleSizeChange}>
          <option value="">Välj storlek</option>
          {productSizes.map((productSize, index) => (
            <option key={index} value={productSize.sizeName}>
              {productSize.sizeName} {productSize.quantity} st
            </option>
          ))}
        </select>
        <ChangeCartBtns product={singleProduct ? { _id: singleProduct._id, sizes: [selectedSize || ''], /* other properties */ } : null} />
        <p>{singleProduct.productMaterial}</p>
        <br />
      </Box>
    )}
  </Box>
);
// ...

};

export default FetchSingleProduct;