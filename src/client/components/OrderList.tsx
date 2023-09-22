// OrderList.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Order {
  _id: number;
  customerName: string;
}

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/order/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            <Link to={`/order/${order._id}`}>{order.customerName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
