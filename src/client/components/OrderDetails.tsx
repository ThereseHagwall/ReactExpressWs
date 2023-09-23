import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Order {
    _id: number;
    customerName: string;
    products: Product[]; // Array of products within the order
  }
  
  interface Product {
    _id: number;
    productName: string;
    productPrice: number;
    size: string;
    quantity: number;
  }

function OrderDetails() {
  const { orderId, productId } = useParams(); // Get the orderId from the URL parameter
  console.log("orderId:", orderId);
  console.log("productId:", productId);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fetch the order details by orderId and productId
    fetch(`/orders/${orderId}/products/${productId}`)
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
      });
  }, [orderId, productId]);
  if (!order) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Order Details</h2>
      <p>Customer Name: {order.customerName}</p>
      <h3>Products: </h3>
      <ul>
        {order.products.map((product) => (
          <li key={product._id}>
            {product.productName} - {product.quantity}
          </li>
        ))}
      </ul>
      {/* Add the ability to edit products here */}
    </div>
  );
}

export default OrderDetails;
