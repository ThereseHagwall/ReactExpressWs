import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const OrderConfirmation = () => {
    const { orderId } = useParams();

    return (
        <div>
            <h1>Beställningsbekräftelse</h1>
            <p>
                Tack för din beställning. Ditt beställningsnummer är: {orderId}
            </p>
            <Link to="/"><Button variant="contained">Fortsätt handla</Button></Link>
        </div>
    );
};

export default OrderConfirmation;
