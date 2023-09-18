// OrderList.tsx
import React, { useState, useEffect } from "react";

interface Order {
  _id: number;
  customerName: string;
}

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Hämta alla ordrar när komponenten mountas
    fetch("/order/orders") // Du kan använda relativ sökväg här, Vite kommer att hantera det
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>{order.customerName}</li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
