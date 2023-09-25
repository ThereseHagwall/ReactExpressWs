import { Link } from "react-router-dom";
import { useState } from "react";
import { Button }   from "@mui/material";

interface AdminLoggedInProps {
    loggedInContent: React.ReactNode;
  }
  
  const AdminLoggedIn: React.FC<AdminLoggedInProps> = ({ loggedInContent }) => {
    const [isLoggedIn] = useState(!!localStorage.getItem('isLoggedIn'));
  
    return (
      <>
      {isLoggedIn ? (
        <div>{loggedInContent}</div>
      ) : (
        <div>
          <h2>Du måste logga in för att se denna sida. Vänligen logga in nu.</h2>
          <Link to="/login">
                <Button
                variant="contained"
                color="primary"> 
                Logga in </Button>
          </Link>
        </div>
      )}
    </>
    );
  }
  
  export default AdminLoggedIn;

{/* Använd detta i returnen du vill ska vara för enbart inloggad som admin importera även AdminLoggedIn
<>
    <AdminLoggedIn
    loggedInContent={ lägg allt innanför här! }
    />
</>
 */}
