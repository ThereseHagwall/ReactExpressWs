import React, { useState } from "react";
import { useShoppingCart } from "./ShoppingCartContext";
import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography,
} from "@mui/material";
import CheckoutCart from "./CheckoutCart";

interface Order {
  _id: string;
  customerName: string;
}

export default function Checkout() {
  const { cartItems, totalPrice } = useShoppingCart();
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [mobile, setMobil] = useState("");
  const [adress, setAdress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bankkort");
  const [shipping, setShipping] = useState("dhl");
  const [bankDetails, setBankDetails] = useState("");
  const [swishNumber, setSwishNumber] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderData, setNewOrderData] = useState({});
  const [shippingCost, setShippingCost] = useState(100);

  const handleClearCart = () => {
    localStorage.removeItem('StarWars Shop Cart')
    localStorage.removeItem('tot sw pris')
  };

  const handelSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newOrderData = {
      name,
      mail,
      mobile,
      adress,
      paymentMethod,
      shipping,
      swishNumber,
      bankDetails,
      cartItems,
      updatedTotalPrice,
    };

    fetch("/order/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrderData),
    })
      .then((response) => response.json())
      .then((newOrder) => {
        setMessage(`Din order har lagts. Ditt order nummer är: ${newOrder._id}`);
        setOrders([...orders, newOrder]);
        setNewOrderData({
          name: "",
          mail: "",
          mobile: "",
          adress: "",
          paymentMethod: "",
          shipping: "",
          swishNumber: "",
          bankDetails: "",
          cartItems: [],
          updatedTotalPrice: 0,
        });

        setName("");
        setMail("");
        setMobil("");
        setAdress("");
        setPaymentMethod("");
        setShipping("");

        handleClearCart();
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
  };

  const handleShippingChange = (shippingMethod: string) => {
    const { shippingCost: cost } = getDeliveryDetails(shippingMethod);
    setShippingCost(cost);
  };


  const handelPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPaymentMethod(value);

    if (value !== "Bankkort") {
      setBankDetails("");
    }

    if (e.target.value === "Swish") {
      setSwishNumber(mobile);
    } else {
      setSwishNumber("");
    }
  };


  const getDeliveryDetails = (option: string) => {
    let deliveryTime = "";
    let shippingCost = 0;
    let estimatedDeliveryDate = "";

    if (option === "dhl") {
      deliveryTime = "1-2 dagar";
      shippingCost = 100;
      estimatedDeliveryDate = calculateEstimatedDeliveryDate(1);
    } else if (option === "postnord") {
      deliveryTime = "2-3 dagar";
      shippingCost = 50;
      estimatedDeliveryDate = calculateEstimatedDeliveryDate(2);
    } else if (option === "ups") {
      deliveryTime = "3-4 dagar";
      shippingCost = 150;
      estimatedDeliveryDate = calculateEstimatedDeliveryDate(3);
    }

    return { deliveryTime, shippingCost, estimatedDeliveryDate };
  };

  const calculateEstimatedDeliveryDate = (daysToAdd: number) => {
    const today = new Date();
    const estimatedDate = new Date(today);
    estimatedDate.setDate(estimatedDate.getDate() + daysToAdd);
    return estimatedDate.toLocaleDateString();
  };
  const [updatedTotalPrice, setUpdatedTotalPrice] = useState(totalPrice + shippingCost);

  return (
    <div>
      {message ? (
        <div>{message}</div>
      ) : (
        <div style={{
          backgroundColor: '#ffffff',
          color: '#000000',
          maxWidth: '300px'
        }}>
          <form onSubmit={handelSubmit} >
            <TextField
              required
              id="standard-basic1"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              variant="standard"
            />
            <br />
            <TextField
              required
              id="standard-basic2"
              label="Mail"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              variant="standard"
            />
            <br />
            <TextField
              required
              id="standard-basic3"
              label="Mobilnummer"
              value={mobile}
              onChange={(e) => setMobil(e.target.value)}
              variant="standard"
            />
            <br />
            <TextField
              required
              id="standard-basic4"
              label="Adress"
              value={adress}
              onChange={(e) => setAdress(e.target.value)}
              variant="standard"
            />
            <br />
            <FormControl>
              <FormLabel sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
              }} id="Payment">Betalsätt</FormLabel>
              <RadioGroup
                aria-labelledby="payment"
                defaultValue=""
                name="radio-buttons-group"
                value={paymentMethod}
                onChange={handelPayment}
              >
                <FormControlLabel value="Bankkort" control={<Radio />} label="Bank Kort" />
                <FormControlLabel value="Swish" control={<Radio />} label="Swish" />
              </RadioGroup>
            </FormControl><br />
            {paymentMethod === 'Swish' && (
              <TextField
                required
                id="swish-number"
                label="Swish number"
                value={swishNumber}
                onChange={(e) => setSwishNumber(e.target.value)}
                variant="standard"
              />
            )}
            {paymentMethod === 'Bankkort' && (
              <TextField
                required
                id="bank-details"
                label="XXXX-XXXX-XXXX-XXXX"
                value={bankDetails}
                onChange={(e) => setBankDetails(e.target.value)}
                variant="standard"
              />
            )}
            <br/>
            <FormLabel sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
              }} id="Shipping">Fraktsätt</FormLabel>
            <RadioGroup
              aria-labelledby="shipping"
              defaultValue=""
              name="radio-buttons-group"
              value={shipping}
              onChange={(e) => {
                setShipping(e.target.value);
                handleShippingChange(e.target.value);
                setUpdatedTotalPrice(totalPrice + getDeliveryDetails(e.target.value).shippingCost);
              }}
            ><br/>
              <FormControlLabel
                value="dhl"
                control={<Radio />}
                label={`DHL  ${getDeliveryDetails('dhl').shippingCost} kr, leveranstid: ${getDeliveryDetails('dhl').deliveryTime},  (preliminärt leveransdatum: ${getDeliveryDetails('dhl').estimatedDeliveryDate})`}
              /><br/>
              <FormControlLabel
                value="postnord"
                control={<Radio />}
                label={`Postnord ${getDeliveryDetails('postnord').shippingCost} kr, leveranstid: ${getDeliveryDetails('postnord').deliveryTime} (preliminärt leveransdatum: ${getDeliveryDetails('postnord').estimatedDeliveryDate})`}
              /><br/>
              <FormControlLabel
                value="ups"
                control={<Radio />}
                label={`Ups ${getDeliveryDetails('ups').shippingCost} kr, leveranstid: ${getDeliveryDetails('ups').deliveryTime},  (preliminärt leveransdatum: ${getDeliveryDetails('ups').estimatedDeliveryDate})`}
              />
            </RadioGroup>
            <br />
            <Typography variant="subtitle1" color="text.main" component="div">
              Total pris inkl. frakt och moms: {(updatedTotalPrice).toFixed(2)} kr
            </Typography>
            <Button variant="contained" type="submit">Skicka beställning</Button>
          </form>
        </div>
      )}
    </div>
  );
};

