import React, { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useAuth } from './AuthContext';
import { useShoppingCart, CartItem } from './ShoppingCartContext';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header() {
  const { isLoggedIn, logout } = useAuth();
  const { cartItemCount, cartItems } = useShoppingCart();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsDropdownOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false);
  };

  const handleCheckoutClick = () => {
    navigate('/CheckOutcart');
    handleMenuClose();
  };

  const handleMenuItemClick = (itemName: string) => {
    setSelectedMenuItem(itemName);
    // You can add additional logic here based on the selected item.
  };

  return (
    <header
      style={{
        height: '6rem',
        backgroundColor: 'black',
        color: 'yellow',
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'yellow' }}>
          <h1>Star Wars Shop</h1>
        </Link>
        {isLoggedIn ? (
          <Button variant="contained" onClick={logout}>
            Logga ut
          </Button>
        ) : (
          <Link to="/login">
            <Button variant="contained">ADMIN</Button>
          </Link>
        )}
        <div
          className="mouseOver"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onClick={handleMenuClick}
          role="button"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <IconButton
            color="warning"
            size="large"
            aria-controls="cart-menu"
            aria-haspopup="true"
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </IconButton>
          <Menu
            id="cart-menu"
            anchorEl={anchorEl}
            keepMounted
            open={isDropdownOpen}
            onClose={handleMenuClose}
          >
            {cartItems.map((item: CartItem) => (
              <MenuItem
                key={item.productId}
                selected={item.productName === selectedMenuItem}
                onClick={() => {
                  handleMenuItemClick(item.productName);
                  handleMenuClose();
                }}
              >
                {item.productName} - Quantity: {item.quantity}
              </MenuItem>
            ))}
            <MenuItem
              selected={'Checkout' === selectedMenuItem}
              onClick={() => {
                handleCheckoutClick();
                handleMenuItemClick('Checkout');
              }}
            >
              Checkout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}
