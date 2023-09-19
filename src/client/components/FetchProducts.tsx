import { useState, useEffect } from 'react';
import { ProductId } from './FetchSingleProduct';
import { useNavigate } from 'react-router-dom';

export interface Product {
  _id: string;
  productName: String,
  productPrice: String,
  size: String,
  productMaterial: String,
  productDescription: String
}

const FetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate(); // Get the navigate function
  const handleProductClick = (productId: ProductId | null) => {
    if (productId) {
      navigate(`/products/${productId._id}`); // Navigate to the single product page
    }
  }; 
  const handleCartClick = (productId: ProductId | null) => {
    if (productId) {
      navigate(`/products/${productId._id}`); // Navigate to the single product page
    }
  };

  useEffect(() => {
    // Fetch products from your Express backend
    fetch('http://localhost:3000/product/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching Products:', error));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product: Product) => (
          <li key={product._id}>
            <h2
              onClick={() => handleProductClick({ _id: product._id })}
              style={{ cursor: 'pointer' }}
            >
              {product.productName}
            </h2>
            <p>{product.productDescription}</p>
            <p>{product.size}</p>
            <p>{product.productMaterial}</p>
            <p>{product.productPrice} €</p> 
            <button onClick={() => handleProductClick({ _id: product._id })}
              style={{ cursor: 'pointer' }}>View Product</button> 
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchProducts;
