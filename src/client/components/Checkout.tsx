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
} from "@mui/material";

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
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shipping, setShipping] = useState("");
  const [bankDetails, setBankDetails] = useState("");
  const [swishNumber, setSwishNumber] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrderData, setNewOrderData] = useState({});

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
      totalPrice,
    };

    setName("");
    setMail("");
    setMobil("");
    setAdress("");
    setPaymentMethod("");
    setShipping("");

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
          name: "",
          mail: "",
          mobile: "",
          adress: "",
          paymentMethod: "",
          shipping: "",
          swishNumber: "",
          bankDetails: "",
          cartItems: [],
          totalPrice: 0,
        });
      })
      .catch((error) => {
        console.error("Error creating order:", error);
      });
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

  const getDeliveryTime = (option: string) => {
    if (option === "dhl") return "1-2 dagar";
    if (option === "postnord") return "2-3 dagar";
    if (option === "ups") return "3-4 dagar";
    return "";
  };

  return (
    <form onSubmit={handelSubmit}>
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
        <FormLabel id="Payment">Betalsätt</FormLabel>
        <RadioGroup
          aria-labelledby="payment"
          defaultValue=""
          name="radio-buttons-group"
          value={paymentMethod}
          onChange={handlePayment}
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

      <FormControl>
        <FormLabel id="shipping">Frakt</FormLabel>
        <RadioGroup
          aria-labelledby="shipping"
          defaultValue=""
          name="radio-buttons-group"
          value={shipping}
          onChange={(e) => setShipping(e.target.value)}
        >
          <FormControlLabel value="dhl" control={<Radio />} label={`DHL (leveranstid: ${getDeliveryTime('dhl')})`} />
          <FormControlLabel value="postnord" control={<Radio />} label={`Postnord (leveranstid: ${getDeliveryTime('postnord')})`} />
          <FormControlLabel value="ups" control={<Radio />} label={`Ups (leveranstid: ${getDeliveryTime('ups')})`} />
        </RadioGroup>
      </FormControl><br />
      <Button variant="contained" onClick={handleSubmit}>Skicka beställning</Button>
    </form>
  );
};

export default Checkout;

