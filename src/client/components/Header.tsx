import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
          alignItems: "center",
        }}
      >
        <Link to="/"> {/* Länka till startsidan */}
          <h1>Star Wars Shop</h1>
        </Link>
        <ShoppingCartIcon />
        <LoginBtn />
      </div>
    </header>
  );
}
