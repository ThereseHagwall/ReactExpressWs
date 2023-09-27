import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Order, Product } from './OrderDetails'

interface EditOrderProps {}

const EditOrder: React.FC<EditOrderProps> = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatedOrder, setUpdatedOrder] = useState<Order | null>(null);
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/order/orders/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
        setUpdatedOrder(data);
        setLoading(false);
      } else {
        console.error("Error fetching order:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const handleUpdateOrder = async () => {
    try {
      if (updatedOrder) {
        const response = await fetch(`/order/orders/${orderId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedOrder),
        });

        if (response.ok) {
          console.log("Updated order:", updatedOrder);
          navigate("/orderlist/");
        } else {
          console.error("Error updating order:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (updatedOrder) {
      setUpdatedOrder((prevState) => ({
        ...prevState,
        [name]: value,
      }) as Order); // Explicitly specify the type as Order
    }
  };
  
  const handleProductChange = (
    index: number,
    field: string,
    value: string
  ) => {
    if (updatedOrder && updatedOrder.cartItems[index]) {
      const updatedProducts = updatedOrder.cartItems.map((product, i) => {
        if (i === index) {
          return {
            ...product,
            [field]: value,
          };
        }
        return product;
      });
  
      setUpdatedOrder((prevState) => ({
        ...prevState,
        cartItems: updatedProducts,
      }) as Order);
    }
  };

  const handleCheckboxChange = () => {
    if (updatedOrder) {
      setUpdatedOrder((prevState) => ({
        ...(prevState as Order), // Explicitly cast prevState to Order
        orderSent: !prevState!.orderSent, // Use ! to assert that prevState is not null
      }));
    }
  };

  return (
    <div>
      <h2>Edit Order</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updatedOrder?.name || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="mail">Email:</label>
          <input
            type="text"
            id="mail"
            name="mail"
            value={updatedOrder?.mail || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="adress">Adress:</label>
          <input
            type="text"
            id="adress"
            name="adress"
            value={updatedOrder?.adress || ""}
            onChange={handleInputChange}
          />
        </div>        
        <div>
          <label htmlFor="mobile">Mobil:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={updatedOrder?.mobile || ""}
            onChange={handleInputChange}
          />
        </div>
        <div>
  <label htmlFor="orderSent">Order Sent:</label>
  <input
  type="checkbox"
  id="orderSent"
  name="orderSent"
  checked={updatedOrder?.orderSent || false}
  onChange={handleCheckboxChange}
/>
</div>
        <div>
          <h3>Products:</h3>
          {updatedOrder?.cartItems.map((product: Product, index: number) => (
            <div key={index}>
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  value={product.productName}
                  onChange={(e) =>
                    handleProductChange(index, "productName", e.target.value)
                  }
                />
              </div>
              <div>
                <label>Product Price:</label>
                <input
                  type="number"
                  value={product.productPrice.toString()}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "productPrice",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={handleUpdateOrder}>
          Update Order
        </button>
      </form>
    </div>
  );
};

export default EditOrder;