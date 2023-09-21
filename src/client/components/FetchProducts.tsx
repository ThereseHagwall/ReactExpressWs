import { useState, useEffect } from 'react';
import { ProductId } from './FetchSingleProduct';
import { useNavigate } from 'react-router-dom';

export interface Product {
  _id: string,
  productName: string,
  productPrice: string,
  sizes: string[],
  productMaterial: string,
  productDescription: string,
  productImage: string
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
    <div style={{"display": "flex", "flexWrap": "wrap"}}>
        {products.map((product: Product) => (
          <ol key={product._id} style={{"border": "solid 2px white", "borderRadius": "12px", "margin": "10px", "padding": "10px", height: "400px", "minWidth": "300px"}}>
            <h2
              onClick={() => handleProductClick({ _id: product._id })}
              style={{ cursor: 'pointer' }}
            >
              {product.productName}
            </h2>
            <img src={product.productImage} alt={product.productName} height={"200px"} style={{width: "100%", objectFit: "cover"}} />
            <p>{product.productPrice} €</p> 
            <button onClick={() => handleProductClick({ _id: product._id })}
              style={{ cursor: 'pointer' }}>View Product</button> 
            <br/>
          </ol>
        ))}
    </div>
  );
};

export default FetchProducts;
