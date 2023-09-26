import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLoggedIn from "./AdminLoggedIn";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  isSent: boolean;
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarOpen = (message: React.SetStateAction<string>) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetch("/order/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleCheckboxChange = async (order: Order) => {
    const updatedOrder = { ...order, isSent: !order.isSent };

    try {
      const response = await fetch(`/order/orders/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedOrder),
      });

      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === order._id ? updatedOrder : o))
        );
        handleSnackbarOpen("Ordern är markerad som skickad.");
      } else {
        console.error("Failed to update order");
      }
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      <AdminLoggedIn
        loggedInContent={
          <div>
            <h2>Alla ordrar</h2>
            <FormControl>
              <label style={{ fontSize: '20px' }} className="order-sent-label">Skickad</label>
              <FormGroup>
                {orders.map((order) => (
                  <div key={order._id}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={order.isSent}
                          onChange={() => handleCheckboxChange(order)}
                        />
                      }
                      label={
                        <Link to={`/order/${order._id}`}>
                          Ordernummer: {order._id}
                        </Link>
                      }
                      style={{ marginLeft: "20px", marginRight: "20px" }}
                    />
                  </div>
                ))}
              </FormGroup>
            </FormControl>
          </div>
        }
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="medium"
            aria-label="close"
            color="inherit"
            onClick={() => setSnackbarOpen(false)}
          >
            <CloseIcon fontSize="medium" />
          </IconButton>
        }
      />
    </div>
  );
}

export default OrderList;
