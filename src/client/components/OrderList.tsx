// OrderList.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";

export interface Order {
  orderDate: string;
  _id: string;
  name: string;
  adress: string;
  mobile: string;
  mail: string;
  shipping: string;
  swishNumber: number;
  totalPrice: number;
  cartItems: Product[];
  bankDetails: string;
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
              {orders.map(
                (order) => (
                  console.log(order),
                  (
                    <li key={order._id}>
                      <Link key={order._id} to={`/order/${order._id}`}>
                        {order.name}'s
                      </Link>
                    </li>
                  )
                )
              )}
            </ul>
          </div>
        }
      />
    </>
  );
}

export default OrderList;
