import React, { useState, useEffect } from 'react';
import { useShoppingCart } from './ShoppingCartContext';
import CheckoutBtn from './CheckoutBtn';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Order {
  _id: string;
  customerName: string;
}


const CheckoutCart: React.FC = () => {
  const theme = useTheme();
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
        setMessage(`Order created with ID: ${newOrder._id}`);
        setOrders([...orders, newOrder]);
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
      <h1>Din kundvagn</h1>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={`${item.productId}-${item.sizeId}`}>
              <Card sx={{ display: 'flex', marginBottom: '1rem', maxWidth: 'sm' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={item.productImage}
                  alt={item.productName}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                    {item.productName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    Storlek: {item.sizeId}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    Antal: {item.quantity}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                    Pris per produkt: {item.productPrice} kr
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                    <IconButton 
                    onClick={() => decreaseQuantity(item.productId, item.sizeId)}
                    aria-label="previous">
                      {theme.direction === 'rtl' ? <AddIcon /> : <RemoveIcon />}
                    </IconButton>
                    <IconButton 
                    onClick={() => removeFromCart(item.productId, item.sizeId)}
                    aria-label="play/pause">
                      <DeleteForeverIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton 
                    onClick={() => increaseQuantity(item.productId, item.sizeId, item.productPrice, item.productName, item.productImage)}
                    aria-label="next">
                      {theme.direction === 'rtl' ? <RemoveIcon /> : <AddIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </div>
          ))}
          <Typography variant="subtitle1" color="text.main" component="div">
          Total pris: {totalPrice.toFixed(2)} kr
          </Typography>
          <button onClick={handlePurchaseClick}>Purchase</button>
          {message && <p>{message}</p>}
          <div>
            {CheckoutBtn()}
          </div>
        </div>
      ) : (
        <h2>Oj här var det tomt.</h2>
      )}
    </div>
  );
};

export default CheckoutCart;

