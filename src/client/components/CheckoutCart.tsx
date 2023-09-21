import React, { useState, useEffect } from 'react';

interface Order {
  _id: string;
  customerName: string;
  // Other order fields
}

const CheckoutCart: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderData, setNewOrderData] = useState({
    productName: '',
    productPrice: 0,
    size: '',
    quantity: 0,
  });

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
        });
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  return (
    <div>
      <h2>Produkter</h2>
      
      <input
        type="text"
        name="customerName"
        placeholder="customer Name"
        value={newOrderData.customerName}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="productName"
        placeholder="Product Name"
        value={newOrderData.productName}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="productPrice"
        placeholder="Product Price"
        value={newOrderData.productPrice}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="size"
        placeholder="Size"
        value={newOrderData.size}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Quantity"
        value={newOrderData.quantity}
        onChange={handleInputChange}
      />
      <button onClick={handlePurchaseClick}>Purchase</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CheckoutCart;
