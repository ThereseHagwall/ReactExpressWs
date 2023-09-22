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
  const { orderId } = useParams(); // Get the orderId from the URL parameter

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Fetch the order details by orderId
    fetch(`/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error("Error fetching order details:", error));
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2>Order Details</h2>
      <p>Customer Name: {order.customerName}</p>
      <h3>Products:</h3>
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
