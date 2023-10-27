import { Button } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const OrderConfirmation = () => {
    const { orderId } = useParams();

    return (
        <div>
            <h1>Beställningsbekräftelse</h1>
            <p>
                Tack för din beställning. Ditt beställningsnummer är: {orderId}
            </p>
            <Button variant="contained">Handla mer ?</Button>
        </div>
    );
};

export default OrderConfirmation;
