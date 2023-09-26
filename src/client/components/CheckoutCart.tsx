import React, { useState, useEffect } from "react";
import { useShoppingCart } from "./ShoppingCartContext";
import CheckoutBtn from "./CheckoutBtn";

interface Order {
  _id: string;
  customerName: string;
}

const CheckoutCart: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderData, setNewOrderData] = useState({
    productName: "",
    productPrice: 0,
    size: "",
    quantity: 0,
    customerName: "",
  });

  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShoppingCart();

  useEffect(() => {
    fetch("/order/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewOrderData({
      ...newOrderData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Din kundvagn</h1>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={`${item.productId}-${item.sizeId}`}>
              <p>Produkt: {item.productName}</p>
              <img src={item.productImage} alt={item.productName} />
              <p>Storlek: {item.sizeId}</p>
              <p>Antal: {item.quantity}</p>
              <p>Pris per produkt: {item.productPrice} kr</p>
              <button
                onClick={() => decreaseQuantity(item.productId, item.sizeId)}
              >
                {" "}
                -{" "}
              </button>
              <button
                onClick={() =>
                  increaseQuantity(
                    item.productId,
                    item.sizeId,
                    item.productPrice,
                    item.productName,
                    item.productImage
                  )
                }
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.productId, item.sizeId)}
              >
                Ta bort från kundvagn
              </button>
            </div>
          ))}
          <p>Total pris: {totalPrice.toFixed(2)} kr</p>
          {message && <p>{message}</p>}
          <div>{CheckoutBtn()}</div>
        </div>
      ) : (
        <h2>Oj här var det tomt.</h2>
      )}
    </div>
  );
};

export default CheckoutCart;
