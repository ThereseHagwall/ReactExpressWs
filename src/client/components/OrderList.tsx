// OrderList.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";

interface Order {
  _id: string;
  customerName: string;
  products: Product[];
}

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  size: string;
  quantity: number;
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
    <>
    <AdminLoggedIn
    loggedInContent={ 
      <div>
      <h2>Order Lista</h2>
      <ul>
        {orders.map((order) => (
          //console.log(order),
          <li key={order._id}>
              <Link key={order._id} to={`/order/${order._id}`}>
                {order.customerName}'s
              </Link>
          </li>
        ))}
      </ul>
    </div>
    }
    /> 
    </>
  );
}

export default OrderList;