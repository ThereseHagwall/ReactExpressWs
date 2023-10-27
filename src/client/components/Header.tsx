import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { useAuth } from "./AuthContext";
import { useShoppingCart, CartItem } from "./ShoppingCartContext";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";

export default function Header() {
    const { isLoggedIn, logout } = useAuth();
    const { cartItemCount, cartItems } = useShoppingCart();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(
        null
    );

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCheckoutClick = () => {
        navigate("/CheckOutcart");
        handleMenuClose();
    };

    const handleMenuItemClick = (itemName: string) => {
        setSelectedMenuItem(itemName);
        handleMenuClose();
    };

    return (
        <header
            style={{
                height: "6rem",
                backgroundColor: "black",
                color: "yellow",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
            }}
        >
            <div style={{ display: "flex", alignItems: "center" }}>
                <img
                    src="https://prod-printler-front-as.azurewebsites.net/media/photo/126208.jpg?mode=crop&width=727&height=1024&rnd=0.0.1"
                    alt=""
                    style={{
                        width: "100px",
                        objectFit: "cover",
                        height: "100px",
                        borderRadius: "200px",
                    }}
                />
                <div>
                    <Hidden smUp>
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "yellow" }}
                        >
                            <Typography variant="h1" sx={{ fontSize: "20px" }}>
                                The Force In Shirts
                            </Typography>
                        </Link>
                    </Hidden>
                    <Hidden smDown>
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "yellow" }}
                        >
                            <Typography variant="h1" sx={{ fontSize: "30px" }}>
                                The Force In Shirts
                            </Typography>
                        </Link>
                    </Hidden>
                </div>
            </div>

            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                {isLoggedIn ? (
                    <Button variant="contained" onClick={logout}>
                        Logga ut
                    </Button>
                ) : (
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button variant="contained">ADMIN</Button>
                    </Link>
                )}
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <div
                    onMouseEnter={handleMenuClick}
                    onMouseLeave={handleMenuClose}
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
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        {cartItems.map((item: CartItem) => (
                            <MenuItem
                                key={item.productId + item.sizeId}
                                selected={item.productName === selectedMenuItem}
                                onClick={() => {
                                    handleMenuItemClick(item.productName);
                                }}
                            >
                                {item.productName} - Antal: {item.quantity}
                            </MenuItem>
                        ))}
                        <MenuItem
                            onClick={() => {
                                handleCheckoutClick();
                            }}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button color="success" variant="contained">
                                Till varukorgen
                            </Button>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    );
}
