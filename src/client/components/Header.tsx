import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


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
          <ShoppingCartIcon />
        </div>
      </header>
    );
  }