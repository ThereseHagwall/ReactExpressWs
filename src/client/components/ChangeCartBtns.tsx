import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext';

interface CartItem {
    product: Product | null;
}

interface Product {
    _id: string | number;
    sizes?: string[];
    selectedSize?: string;
}

interface ProductSize {
    _id: string;
    sizeName: string;
    quantity: string;  // assuming quantity is a string
}

const primary = {
    main: '#1B1B1E',
    contrastText: '#FFE81F',
    alert: '#FF0000',
    alertText: '#FFFFFF',
};

export function ChangeCartBtns({ product }: CartItem) {
    const {
        getCartItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
    } = useShoppingCart();

    if (!product) {
        return null;
    }

    const { _id, selectedSize: initialSelectedSize } = product;
    const [selectedSize, setSelectedSize] = useState<string>(initialSelectedSize || '');
    const [productSizes, setProductSizes] = useState<ProductSize[]>([]);

    useEffect(() => {
        fetch(`http://localhost:3000/product/${_id}`)
            .then((response) => response.json())
            .then((data) => setProductSizes(data))
            .catch((error) => console.error('Error fetching Product Sizes:', error));
    }, [_id]);

    const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = event.target.value;
        setSelectedSize(newSize);
    };

    const productId: number = typeof _id === 'string' ? parseInt(_id, 10) : _id;
    const sizeId: string = selectedSize;  // Adjusted to be a string

    const cartItemQuantity: number = getCartItemQuantity(productId, sizeId);

    return (
        <>
            <label htmlFor="sizeDropdown">Storlek:</label>
            <select id="sizeDropdown" value={selectedSize} onChange={handleSizeChange}>
                <option value="">Välj storlek</option>
                {productSizes.map((productSize, index) => (
                    <option key={index} value={productSize.sizeName}>
                        {productSize.sizeName} {productSize.quantity} st
                    </option>
                ))}
            </select>
            <p>Antal i kundvagn: {cartItemQuantity}</p>
            {cartItemQuantity === 0 ? (
                <Button
                    sx={{
                        backgroundColor: primary.main,
                        color: primary.contrastText,
                    }}
                    variant="contained"
                    onClick={() => increaseQuantity(productId, sizeId)}
                >
                    Lägg till i kundvagnen
                </Button>
            ) : (
                <div>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: primary.main,
                                color: primary.contrastText,
                            }}
                            onClick={() => decreaseQuantity(productId, sizeId)}
                        >
                            -
                        </Button>
                        <p>{cartItemQuantity} st</p>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: primary.main,
                                color: primary.contrastText,
                            }}
                            onClick={() => increaseQuantity(productId, sizeId)}
                        >
                            +
                        </Button>
                    </Box>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: primary.alert,
                            color: primary.alertText,
                        }}
                        onClick={() => removeFromCart(productId, sizeId)}
                    >
                        Ta bort
                    </Button>
                </div>
            )}
        </>
    );
}
