import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './FetchProducts';

export interface ProductId {
    _id: string;
  }

interface Props {
  productId: string;
}

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
    <div>
      {singleProduct && (
        <div>
          <h2>{singleProduct.productName}</h2>
          <p>{singleProduct.productDescription}</p>
          <p>{singleProduct.size}</p>
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
