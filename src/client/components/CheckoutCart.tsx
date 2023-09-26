import React, { useState, useEffect } from 'react';
import { useShoppingCart } from './ShoppingCartContext';

interface Order {
  _id: string;
  customerName: string;
}

const CheckoutCart: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderData, setNewOrderData] = useState({
    productName: '',
    productPrice: 0,
    size: '',
    quantity: 0,
    customerName: '',
  });

  const {
    cartItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useShoppingCart();

  useEffect(() => {
    // Fetch orders when the component mounts
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

  const handlePurchaseClick = () => {
    // Create a new order using user input and send it to the server
    fetch("/order/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrderData),
    })
      .then((response) => response.json())
      .then((newOrder) => {
        // Handle the response from the server
        setMessage(`Order created with ID: ${newOrder._id}`);
        // Optionally, you can also update the list of orders displayed on the page
        setOrders([...orders, newOrder]);
        // Clear the input fields after creating the order
        setNewOrderData({
          productName: '',
          productPrice: 0,
          size: '',
          quantity: 0,
          customerName: '',
        });
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  return (
    <div>
      <h2>Cart Contents</h2>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={`${item.productId}-${item.sizeId}`}>
              <p>Product: {item.productName}</p>
              <p>Size: {item.sizeId}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: {item.productPrice}</p>
              <button onClick={() => increaseQuantity(item.productId, item.sizeId, item.productPrice, item.productName)}>Increase Quantity</button>
              <button onClick={() => decreaseQuantity(item.productId, item.sizeId)}>Decrease Quantity</button>
              <button onClick={() => removeFromCart(item.productId, item.sizeId)}>Remove From Cart</button>
            </div>
          ))}
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <h2>Order Form</h2>

      {/* The rest of your order form */}
    </div>
  );
};

export default CheckoutCart;

