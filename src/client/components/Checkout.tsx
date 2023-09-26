import React, { useState } from 'react'
import { TextField, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@mui/material'

export default function Checkout() {

    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [mobile, setMobil] = useState("");
    const [adress, setAdress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("")
    const [shiping, setShiping] = useState ("");
    const [bankDetails, setBankDetails] = useState("");
    const [swishNumber, setSwishNumber] = useState("");

    const handelSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log('användare', {name, mail, mobile, adress, paymentMethod, shiping, swishNumber, bankDetails });
        
        setName("");
        setMail("");
        setMobil("");
        setAdress("");
        setPaymentMethod("");
        setShiping("");
    }

    const handelPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPaymentMethod(value);

        if(value !== 'Bankkort') {
            setBankDetails("");
        }

        if(e.target.value === 'Swish') {
            setSwishNumber(mobile);
        }else {
            setSwishNumber("")
        }
    }

    const getDeliveryTime = (option: string) => {

        if(option === 'dhl') return '1-2 dagar';
        if(option === 'postnord') return '2-3 dagar';
        if(option === 'up') return '3-4 dagar';
        return '';
    }
   

  return (
        <form onSubmit={handelSubmit}>
        <TextField required id="standard-basic" label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="standard" /><br />
        <TextField required id="standard-basic" label="Mail" value={mail} onChange={(e) => setMail(e.target.value)} variant="standard" /><br />
        <TextField required id="standard-basic" label="Mobilnummer" value={mobile} onChange={(e) => setMobil(e.target.value)} variant="standard" /><br />
        <TextField required id="standard-basic" label="Adress" value={adress} onChange={(e) => setAdress(e.target.value)} variant="standard" /><br />
        <FormControl>
  <FormLabel id="Payment">Betalsätt</FormLabel>
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
    id='swish-number'
    label='Swish number'
    value={swishNumber}
    onChange={(e) => setSwishNumber(e.target.value)}
    variant='standard'
    /> 
)}
{paymentMethod === 'Bankkort' && (
    <TextField
    required
    id='bank-details'
    label='XXXX-XXXX-XXXX-XXXX'
    value={bankDetails}
    onChange={(e) => setBankDetails(e.target.value)}
    variant='standard'
    />
)} 

<FormControl>
  <FormLabel id="Shiping">Frakt</FormLabel>
  <RadioGroup
    aria-labelledby="shiping"
    defaultValue=""
    name="radio-buttons-group"
    value={shiping}
    onChange={(e) => setShiping(e.target.value)}
  >
    <FormControlLabel value="dhl" control={<Radio />} label={`DHL (leveranstid: ${getDeliveryTime('dhl')})`} />
    <FormControlLabel value="postnord" control={<Radio />} label={`Postnord (leveranstid: ${getDeliveryTime('postnord')})`} />
    <FormControlLabel value="up" control={<Radio />} label={`Up (leveranstid: ${getDeliveryTime('up')})`} />
  </RadioGroup>
</FormControl><br />
        <Button variant="contained" onClick={handelSubmit}>Skicka beställning</Button>
        </form>
  )
}
