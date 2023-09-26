import React, { useState } from 'react';
import { Button } from '@mui/material';
import Checkout from './Checkout';

export default function CheckoutBtn() {
  const [showCheckout, setShowCheckout] = useState(false);

  const handleCheckoutClick = () => {
    setShowCheckout(true);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleCheckoutClick}>
        Gå till kassan
      </Button>

      {showCheckout && <Checkout />}
    </div>
  );
}