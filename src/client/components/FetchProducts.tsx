import React, { useState, useEffect } from 'react';

interface Product {
  _id: string;
  productName: String,
  productPrice: String,
  size: String,
  productMaterial: String,
  productDescription: String
}

const FetchProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch orders from your Express backend
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
            <p>{product.productName}</p>
            <p>{product.productDescription}</p>
            <p>{product.size}</p>
            <p>{product.productMaterial}</p>
            <p>{product.productPrice} €</p> 
            <button>Add to cart</button> 
            <br/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchProducts;
