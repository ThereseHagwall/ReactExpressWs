import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";

interface Order {
  orderDate: string;
  paymentMethod: string;
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
  _id: number;
  productName: string;
  productPrice: number;
  sizeId: string;
  quantity: number;
}

function OrderDetails() {
  const { orderId: orderIdParam } = useParams<{ orderId: string }>();

  const orderId = orderIdParam || "";

  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/order/orders/${orderId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (status ${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        setOrder(data);
      })
      .catch((error) => {
        setError("Error fetching order details");
      });
  }, [orderId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <AdminLoggedIn
        loggedInContent={
          <div>
            <h1>Order Details</h1>
            {order ? (
              <>
                <p>Kund namn: {order.name}</p>
                <p>Valt Fraktsätt: {order.shipping}</p>
                <p>Valt Betalsätt: {order.paymentMethod}</p>
                <p>Adress: {order.adress}</p>
                <p>Mail: {order.mail}</p>
                <p>Telefon: {order.mobile}</p>
                <h3>Totalpris: {order.totalPrice} kr</h3>
                <h2>Product Details</h2>
                <ul>
                  {order.cartItems.map((product) => (
                    <li key={product._id}>
                      <p>Produkt Namn: {product.productName}</p>
                      <p>Pris: {product.productPrice} kr/st</p>
                      <p>Storlek: {product.sizeId}</p>
                      <p>Antal: {product.quantity}</p>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        }
      />
    </>
  );
}

export default OrderDetails;
