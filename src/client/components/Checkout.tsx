import React, { useState } from 'react';
import { ShoppingCartProvider } from './ShoppingCartContext';
import { TextField, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material';

interface CheckoutProps {
  onHide: () => void; 
}

const Checkout: React.FC<CheckoutProps> = ({ onHide }) => {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shipping, setShipping] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [swishNumber, setSwishNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('User details', { name, mail, mobile, address, paymentMethod, shipping, swishNumber, bankDetails });

    setName('');
    setMail('');
    setMobile('');
    setAddress('');
    setPaymentMethod('');
    setShipping('');
    onHide();
  };

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPaymentMethod(value);

    if (value !== 'Bankkort') {
      setBankDetails('');
    }

    if (value === 'Swish') {
      setSwishNumber(mobile);
    } else {
      setSwishNumber('');
    }
  };

  const getDeliveryTime = (option: string) => {
    if (option === 'dhl') return '1-2 dagar';
    if (option === 'postnord') return '2-3 dagar';
    if (option === 'ups') return '3-4 dagar';
    return '';
  };



  return (
    <form onSubmit={handleSubmit}>
      <TextField required id="standard-basic" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="standard" /><br />
      <TextField required id="standard-basic" label="Mail" value={mail} onChange={(e) => setMail(e.target.value)} variant="standard" /><br />
      <TextField required id="standard-basic" label="Mobilnummer" value={mobile} onChange={(e) => setMobile(e.target.value)} variant="standard" /><br />
      <TextField required id="standard-basic" label="Adress" value={address} onChange={(e) => setAddress(e.target.value)} variant="standard" /><br />
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
