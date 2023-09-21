import React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from './AuthContext'; // Importera useAuth-hook
import { useShoppingCart  } from './ShoppingCartContext';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { cartItemCount } = useShoppingCart();

  return (
    <header style={{
              height: "6rem",
              backgroundColor: "black",
              color: "yellow",
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
            }}>
      <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h1>Star Wars Shop</h1>
        {isLoggedIn ? (
          <Button variant="contained" onClick={logout}>
            Logga ut
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="contained">ADMIN</Button>
          </Link>
        )}
        <IconButton color="warning" size="large" href="/CheckOutcart">
          <Badge badgeContent={cartItemCount} color="error">
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
        
      </div>
    </header>
  );
}
