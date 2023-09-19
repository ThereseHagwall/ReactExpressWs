import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import LoginBtn from "./LoginBtn";
import { Link } from "react-router-dom"; // Importera Link


export default function Header() {
  return (
    <header
      style={{
        height: "6rem",
        backgroundColor: "black",
        color: "yellow",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>Star Wars Shope</h1>
        <LoginBtn />
        <IconButton color='warning' size='large' href='/CheckOutcart'>
          <Badge badgeContent={4} color="error" >
            <ShoppingCartIcon fontSize="large" />
          </Badge>
        </IconButton>
      </div>
    </header>
  );
}
