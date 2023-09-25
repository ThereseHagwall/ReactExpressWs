import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CheckoutBtn() {
  return (
    <div>
      <Link to="/checkout">
        <Button variant="contained">Go to checkout</Button>
      </Link>
    </div>
  )
}
