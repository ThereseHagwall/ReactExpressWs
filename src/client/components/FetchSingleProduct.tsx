import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './FetchProducts';

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

  return (
    <div>
      {singleProduct && (
        <div>
          <h2>{singleProduct.productName}</h2>
          <p>{singleProduct.productDescription}</p>
          <label htmlFor="sizeDropdown">Storlek:</label>
          <select id="sizeDropdown" value={selectedSize || ''} onChange={handleSizeChange}>
            <option value="">Välj storlek</option>
            {productSizes.map((productSize, index) => (
              <option key={index} value={productSize.sizeName}>
                {productSize.sizeName} {productSize.quantity} st
              </option>
            ))}
          </select>
          <p>{singleProduct.productMaterial}</p>
          <p>{singleProduct.productPrice} €</p>
          <button>Add to cart</button>
          <br />
        </div>
      )}
    </div>
  );
};

export default FetchSingleProduct;