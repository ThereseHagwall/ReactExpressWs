import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Order {
  _id: number;
  customerName: string;
  products: Product[];
}

interface Product {
  _id: number;
  productName: string;
  productPrice: number;
  size: string;
  quantity: number;
}

function OrderDetails() {
  const { orderId: orderIdParam} = useParams<{ orderId: string; }>();

  // Ensure orderId is always defined and a string
  const orderId = orderIdParam || '';

  console.log("orderId:", orderId);

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the order details by orderId and productId
    fetch(`/order/orders/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok (status ${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received:", data); // Log the received data
        setOrder(data);
      })
      .catch((error) => {
        console.error("Error fetching order details:", error.message); // Log the error message
        setError("Error fetching order details"); // Set an error message
      });
  }, [orderId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Order Details</h1>
      {order ? (
        <>
          <p>Customer Name: {order.customerName}</p>
          <h2>Product Details</h2>
          <ul>
            {order.products.map((product) => (
              <li key={product._id}>
                <p>Product Name: {product.productName}</p>
                <p>Product Price: {product.productPrice}</p>
                <p>Size: {product.size}</p>
                <p>Quantity: {product.quantity}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default OrderDetails;
