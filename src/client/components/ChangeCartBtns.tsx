import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { useShoppingCart } from './ShoppingCartContext';

interface CartItem {
    product: Product | null;
    productName: string;
    productImage: string;
}

interface Product {
    _id: string;
    sizes: {sizeName: string; quantity: number}[],
    selectedSize?: string;
    productPrice: number;
    productName: string;
    productImage: string;
}

interface ProductSize {
    _id: string;
    sizeName: string;
    quantity: string;
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

    const { _id, selectedSize: initialSelectedSize, productPrice, productName, productImage } = product;
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
    const sizeId: string = selectedSize;
    const cartItemQuantity: number = getCartItemQuantity(productId, sizeId);
    const isSizeSelected = selectedSize !== '';

return (
    <>
        <label htmlFor="sizeDropdown">Storlek:</label>
        <select id="sizeDropdown" value={selectedSize} onChange={handleSizeChange}>
            <option value="">Välj storlek</option>
            {productSizes.map((productSize, index) => (
                <option key={index} value={productSize.sizeName}>
                    {productSize.sizeName} {'( '} {productSize.quantity} st {' )'}
                </option>
            ))}
        </select>
        {cartItemQuantity === 0 ? (
            <Button
                sx={{
                    backgroundColor: primary.main,
                    color: primary.contrastText,
                }}
                variant="contained"
                onClick={() => isSizeSelected && increaseQuantity(productId, sizeId, productPrice, productName, productImage)}
                disabled={!isSizeSelected}
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
                        onClick={() => isSizeSelected && increaseQuantity(productId, sizeId, productPrice, productName, productImage)}
                        disabled={
                            !isSizeSelected ||
                            cartItemQuantity ===
                                (parseInt(
                                    productSizes.find((ps) => ps.sizeName === selectedSize)?.quantity || '0',
                                    10
                                ))
                        }>
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

